<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Ajouter Menu pour le restaurant :</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="num_etage">Titre du menu:</label>
						<InputText id="num_etage" type="text" v-model="menu.titre" />
					</div>

			<div class="field col-9">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4" v-model="menu.description"/>
			</div>
		</div>

		<h4 id="titre">Ajouter Les Plats pour ce menu :</h4>
		 <div class="p-fluid formgrid grid" v-for="i in pluss" :key="i">
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

					<div class="field col-12 md:col-12">
						<label for="prix4">Choisir des image :</label>
						<FileUpload name="file" url="" ref="file" @upload="onUpload" @change="selectFile" :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
					</div>
		 </div>
		 </div>
		 <div class="field col-12 md:col-2">
							<Button id="btn" icon="pi pi-plus" @click="clickPluss()" class="mr-2 mb-2" />

					</div>
		 </div>
	      <div class="field col-12 md:col-3">
			   <Toast />
			<Button label="Ajouter"  @click="addMenu()"></Button>
		
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
				pluss:1,
				menu_id:"",
				restaurant_id:"",
				menu:{
					titre:"",
					description:""
				},
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
			this.restaurant_id=parseInt(localStorage.getItem('restaurant_id'));
			console.log(localStorage.getItem('restaurant_id'));
		},

		methods :{
			 addMenu(){
				console.log("menu",this.menu);
				 axios.post('http://localhost:8000/api/addMenu',
				{
					titre:this.menu.titre,
					description:this.menu.description,
					restaurant_id:this.restaurant_id
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
				).then(res=>{

					console.log("plat",this.plat);
				console.log("zzz",this.menu_id);
				 axios.post('http://localhost:8000/api/addPlat',
				{
					nom:this.plat.nom,
					intitule:this.plat.intitule,
					prix_plat:parseFloat(this.plat.prix_plat),
					menu_restaurant_id:res.data.Menu.id,
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
				).then(res=>{
					if(res){
			            	this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
			          
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
				})
					
				})
			},
			clickPluss(){
				this.pluss++;
			
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
