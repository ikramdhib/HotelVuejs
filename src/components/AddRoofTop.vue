<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre"> Ajouter Roof-Top</h4>
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

			<div class="field col-12">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4"  v-model="rooftop.description"/>
			</div>
					
					
					<div class="field col-12 md:col-12">
						<label for="prix4">Choisir des images :</label>
						<FileUpload name="file" url="" ref="file" @upload="onUpload" @change="selectFile" :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
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
				}
			}
			},
			mounted (){
				this.user= JSON.parse(localStorage.getItem('user'));
				console.log(this.user);
				console.log(localStorage.getItem('token'))
			},
			methods :{
				async addRooftop(){
					console.log("ggg",this.rooftop);
					await axios.post('http://localhost:8000/api/addRoof-Top',
					{
						intitule:this.rooftop.intitule,
						prix:parseInt(this.rooftop.prix),
						description:this.rooftop.description,
						capacite:parseInt(this.rooftop.capacite),
						disponibilite:this.rooftop.disponibilite,
						user_id:this.user.id
					},
					 { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
					).then(res=>{
						if(res){
			            	this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
			          
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					})
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
