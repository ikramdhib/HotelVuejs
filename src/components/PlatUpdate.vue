<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
			<h4 id="titre">Modifier le Plat : {{ plat.nom }} </h4>
			 <ul style="list-style-type:none;">
                                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                            </ul>
		 <div class="p-fluid formgrid grid" >
					<div class="field col-12 md:col-9">
		 <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-4">
					     <label for="lastname2">Intitulé du Plat</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  v-model="plat.intitule" :options="dropdownValues"   placeholder="Select" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Nom :</label>
						<InputText id="num_etage" type="text" v-model="plat.nom" />
					</div>
					
					<div class="field col-12 md:col-3">
						<label for="num_etage">Prix :</label>
						<InputText id="num_etage" type="text" v-model="plat.prix_plat" />
					</div>

				
		 </div>
		 </div>
		 <div class="field col-12 md:col-2">
							<Button id="btn" icon="pi pi-plus" @click="clickPluss()" class="mr-2 mb-2" />

					</div>
		 
	      <div class="field col-12 md:col-3 py-4">
			   <Toast />
			<Button label="Modifier"  @click="updatePlat()"></Button>
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
				dropdownValue:null,
				errors:[],
				plat:{
					nom:"",
					intitule:"",
					prix_plat:""
				},
				dropdownValues: [
					'ENTREES',
					 'PLATS PRINCIPAUX',
					'DESSERT',
				],
			}
		},

		mounted (){
			this.getPlat();
		},

		methods :{
			async getPlat(){
				const id=this.$route.params.id;
				await axios.get('http://localhost:8000/api/getPlat/'+id).then(res=>{
					this.plat.nom=res.data.plat.nom
					this.plat.intitule=res.data.plat.intitule
					this.plat.prix_plat=res.data.plat.prix_plat
				})
	},
	 async updatePlat(){
		 	if(this.plat.nom==""){
				this.errors.push("le nom de plat doit étre remplir")
	               }
				   if(this.plat.intitule==""){
				this.errors.push("la description de plat doit étre remplir")
	               }
				    if(isNaN(this.plat.prix_plat)){
				this.errors.push("le prix de plat doit étre nombre")
	               }else if(this.plat.prix_plat==""){
					   	this.errors.push("le prix de plat doit étre remplir")
				   }
		 const id=this.$route.params.id;
		 await axios.put('http://localhost:8000/api/update-Plat/'+id,
		 {
			 nom:this.plat.nom,
			 intitule:this.plat.intitule,
			 prix_plat:this.plat.prix_plat
		 },
		 { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
		 ).then(res=>{
			 if(res.data.updated){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
		 })
	 },
	 goBack(){
		 this.$router.push('restaurants')
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
#btn{
	background-color:transparent;
	color:grey;
	border-color: transparent;
	border-radius: 100%;
	margin-top: 20px;
	margin-left: 40px;
}
</style>
