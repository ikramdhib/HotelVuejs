<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Ajouter Spa:</h4>
				 <ul style="list-style-type:none;">
                                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                            </ul>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="titre">Titre :</label>
						<InputText id="titre" type="text" v-model="spa.title"/>
					</div>
                         <div class="field col-12 md:col-3">
						<label for="prix">Prix :</label>
						<InputText id="prix" type="text" v-model="spa.prix_reservation"/>
					</div>
					   <div class="field col-12 md:col-3">
						<label for="capacite">Capacité :</label>
						<InputText id="capacite" type="number"  min="1"  v-model="spa.capacite"/>
					</div>
                    	<div class="field col-12 md:col-3">
                        
                        <span class="text-black-700">Disponibilité :</span>           
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="spa.avaibility"/>
				</div>
				 
				</div>
			                <div class="field col-6">
						<label for="desc">Description :</label>
						<Textarea id="desc" rows="4"  v-model="spa.description"/>
			           </div>
					   <div class="field col-12 md:col-6">
						<label for="prix4">Choisir des image :</label>
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText  type="file" multiple @change="changeFile" accept=".png, .jpg, .jpeg" />
						</span>
					</div>
					
	      <div class="field col-12 md:col-3">
			   <Toast />
					<Button label="Ajouter" @click="addSpa()" ></Button>
		
		</div>
		                </div>
					
		    </div>
			</div>
		</div>
		
</template>
<script>
import axios from 'axios';

export default {
 data() {
            return {
				user:0,
            spa:  {
             avaibility:"",
			 description:"",
             prix_reservation:"",
			title:"",
			capacite:0
					
				},image:[],
				errors:[],
                form: new FormData,
            }
        },
		
			methods:{
					changeFile(e){

              let selectedFiles=e.target.files
              if(!selectedFiles.length){
                  return false
              }

              for(let i=0 ;i<selectedFiles.length ;i++ ){
                  this.image.push(selectedFiles[i])
              }
              console.log("tt",this.image);
              
           },
	
			 async addSpa() {
			   this.user=JSON.parse(localStorage.getItem('user'));
			   if(this.spa.description==""){
				this.errors.push("la description de spa doit étre remplir")
	               }
				    if(this.spa.title==""){
				this.errors.push("le titre de spa doit étre saisie")
	               }
				    if(this.spa.capacite==""){
				this.errors.push("la capacité de spa doit étre saisie")
	               }
				    if(this.spa.prix_reservation==""){
				this.errors.push("le prix de reservation de spa doit étre saisie")
	               }
				   else if(isNaN(this.spa.prix_reservation)){
					   	this.errors.push("le prix de reservation de spa doit étre nombre")
				   } if(this.image.length==0){
				this.errors.push("les images doit etre saisie")
            	}
				  
			 await axios
			    .post('http://localhost:8000/api/spa',
				{avaibility:this.spa.avaibility,
                description:this.spa.description,
                title:this.spa.title,
				capacite:this.spa.capacite,
				prix_reservation:parseFloat(this.spa.prix_reservation),
				user_id:this.user.id,
	          
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{  
					  
					for(let i=0 ;i<this.image.length;i++){
							this.form.append('path',this.image[i])
							this.form.append('spa_id',res.data.data.id)

							const config= {headers:{'Content-Type':'multipart/form-data',
							Authorization: 'Bearer ' + localStorage.getItem('token') }};
							axios.post('http://localhost:8000/api/images',this.form,config)
							}
						if(res){
			            	this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
			          
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
		
					
			            
					 
			         
					 
			})}}}

</script>