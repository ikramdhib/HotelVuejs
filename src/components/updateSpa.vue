<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Editer Spa:</h4>
				 <ul style="list-style-type:none;">
                                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                            </ul>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="title">Titre :</label>
						<InputText id="title" type="text" v-model="spa.title" />
					</div>
                      <div class="field col-12 md:col-3">
						<label for="prix">Prix :</label>
						<InputText id="prix" type="text" v-model="spa.prix_reservation"/>
					</div>
					   <div class="field col-12 md:col-3">
						<label for="num_etage">capacité:</label>
						<InputText id="num_etage" type="number"  min="1" v-model="spa.capacite"/>
					</div>
						<div class="field col-12 md:col-3">
                        
         <span class="text-black-700">Disponibilité</span>           
                   
            	      
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="spa.avaibility"/>
				</div>    
         
			</div>
                    
			<div class="field col-10">
						<label for="desc">Description :</label>
						<Textarea id="desc" rows="4" v-model="spa.description"/>
			</div>
		
					
		
	      <div class="field col-12 md:col-3 py-4">
			     <Toast />
					<Button label="Ajouter" @click="updateSpa()"  ></Button>
		</div>
		<div class="field col-12 md:col-3 py-4">
			<Button label="Annuler" @click="goBack()" class="p-button-secondary mr-2 mb-2" ></Button>
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
				errors:[],
            spa:  {
             avaibility:"",
			 description:"",
             prix_reservation:"",
			title:"",
			capacite:0
					
				}
            }
        },
        mounted(){
			 const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/spa/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
     	if(res.data.spa.avaibility==1){
						this.spa.avaibility=true;
					}else{
						this.spa.avaibility=false;
					}
                this.spa.description=res.data.spa.description,
                this.spa.title=res.data.spa.title,
				this.spa.capacite=res.data.spa.capacite,
				this.spa.prix_reservation=res.data.spa.prix_reservation
			localStorage.set("id",res.data.spa.id);
     
   
       console.log(res.data);
         
       })},
	     
        
        
	
	
		
			methods:{
	
			 async updateSpa() {
			   this.user=JSON.parse(localStorage.getItem('user'));
                const id=this.$route.params.id;
				 if(this.spa.description==""){
				this.errors.push("la description de spa doit étre remplir")
	               }
				    if(this.spa.title==""){
				this.errors.push("le titre de spa doit étre saisie")
	               }
				    if(this.spa.capacite==""){
				this.errors.push("la capacité de spa doit étre saisie")
	               }
				    if(this.spa.prix_reservation=="")
					{
				this.errors.push("le prix de reservation de spa doit étre saisie")
	               }else if(isNaN(this.spa.prix_reservation)){
	            this.errors.push("le prix de reservation de spa doit étre nombre")
				   }
				  
			 await axios
			    .put('http://localhost:8000/api/spa/'+id,
				{avaibility:this.spa.avaibility,
                description:this.spa.description,
                title:this.spa.title,
				  capacite:this.spa.capacite,
				  prix_reservation:parseFloat(this.spa.prix_reservation),
				user_id:this.user.id,
	          
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					if(res){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été modifier avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					 
					 
			         
					 
			})},goBack(){
					this.$router.push('SpaTable')
				}
			}}

</script>