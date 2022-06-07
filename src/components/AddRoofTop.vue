<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre"> Ajouter Roof-Top</h4>
				 <ul style="list-style-type:none;">
                                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                            </ul>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="num_etage">Intitulé :</label>
						<InputText id="num_etage" type="text" v-model="rooftop.intitule" maxlength="25" />
					</div>
						<div class="field col-12 md:col-3">
						<label for="num-ch">Capacité :</label>
						<InputText id="num-ch" type="number" min="1" v-model="rooftop.capacite" />
					</div>
					
			<div class="field col-12 md:col-3">
						<label for="num_etage">Prix de la résérvation :</label>
						<InputText id="num_etage" type="text"  v-model="rooftop.prix"/>
					</div>
					<div class="field col-12 md:col-3">
                        
              <span class="text-black-700">Disponibilité :</span>           
                   <div class="mt-2 py-2 px-4">
				<InputSwitch v-model="rooftop.disponibilite" maxlength="225"/>
				</div>
			</div>

			<div class="field col-6">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4"  v-model="rooftop.description"/>
			</div>
					<div class="field col-12 md:col-6">
						<label for="prix4">Choisir des image :</label>
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText  type="file" multiple @change="changeFile"/>
						</span>
					</div>
	               <div class="field col-12 md:col-3">
					   <Toast />
					<Button label="Ajouter"  @click="addRooftop()" ></Button>
		</div>
		</div>
			</div>
		</div>
		</div>
</template>

<script>
import axios from 'axios'

	export default {
		data() {
			return {
				switchValue: null,
				user:null,
				rooftop:{
					prix:"",
					description:"",
					intitule:"",
					capacite:"",
					disponibilite:"",
				},
				image:[],
				errors:[],
                form: new FormData,
			}
			},
			mounted (){
				this.user= JSON.parse(localStorage.getItem('user'));
			},
			methods :{
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
				async addRooftop(){
					if(this.rooftop.intitule==""){
				this.errors.push("la nom de rooftop doit étre saisie")
	               }
				   if(this.rooftop.description==""){
				this.errors.push("la description de rooftop doit étre remplir")
	               }
				    if(this.rooftop.capacite==""){
				this.errors.push("la capacité de rooftop doit étre saisie")
	               }
				    if(this.rooftop.prix=="") {
				this.errors.push("le prix de rooftop doit étre saisie")
	               }else if(isNaN(this.rooftop.prix)){
					   this.errors.push("le prix de rooftop doit étre nombre")
				   }if(this.image.length==0){
				this.errors.push("les images doit etre saisie")
            	}
				 
					console.log("ggg",this.rooftop);
					await axios.post('http://localhost:8000/api/addRoof-Top',
					{
						intitule:this.rooftop.intitule,
						prix:parseFloat(this.rooftop.prix),
						description:this.rooftop.description,
						capacite:parseInt(this.rooftop.capacite),
						disponibilite:this.rooftop.disponibilite,
						user_id:this.user.id
					},
					 { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
					).then(res=>{
							for(let i=0 ;i<this.image.length;i++){
							this.form.append('path',this.image[i])
							this.form.append('rooftop_id',res.data.RoofTop.id)

							const config= {headers:{'Content-Type':'multipart/form-data',
							Authorization: 'Bearer ' + localStorage.getItem('token') }};
							axios.post('http://localhost:8000/api/images',this.form,config)
							}
						if(res){
			            	this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
			          
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					});
				}
			}
	}
	
	
</script>

<style scoped>
#titre{
margin-bottom: 30px;
margin-top: 15px;
}
#switcher{
	margin-top: 105px;
}
</style>
