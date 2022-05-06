<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Ajouter un Offres :</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
					     <label for="lastname2">Catégorie :</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="dropdownValues" @change="categorieClick"  placeholder="Selectionner" v-model="categorie"></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3"  v-if="isRooftop">
					     <label for="lastname2">Offre pour : </label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="rooftops" v-model="idRooftop"  optionLabel="intitule" placeholder="Select" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3"  v-if="isRestaurant">
					     <label for="lastname2">Offre pour : </label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="restaurants" v-model="idRestaurant"  optionLabel="nom" placeholder="Select" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3"  v-if="isConferenceRoom">
						<label for="lastname2">Offre pour : </label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="confrenceroom" v-model="idConferenceroom" optionLabel="decoration"   placeholder="Select" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3"  v-if="isPool">
						<label for="lastname2">Offre pour : </label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="pools"  optionLabel="title" v-model="idPool"  placeholder="Select" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3"  v-if="isSpa">
						<label for="lastname2">Offre pour : </label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="spas" v-model="idSpa" optionLabel="title"   placeholder="Select" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3"  v-if="isRoom">
						<label for="lastname2">Offre pour : </label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="rooms" v-model="idRoom" optionLabel="num_room"   placeholder="Select" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-4">
						<label for="num_etage">Titre d'Offre :</label>
						<InputText id="num_etage" type="text" v-model="offre.titre"  />
					</div>
					<div class="field col-12 md:col-4">
						<label for="num-ch">Pourcentage :</label>
						<InputText id="num-ch" type="number" v-model="offre.pourcentage" />
					</div>
			        <div class="field col-6">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4" v-model="offre.description" />
						</div>
					</div>
			  <div class="p-fluid formgrid grid">
	      <div class="field col-12 md:col-3 py-4">
			   <Toast />
			<Button label="Ajouter" @click="addOffre()"></Button>
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
				dropdownValues: [
					'CHAMBRES',
				'ROOF-TOP',
					 'SALLE DE CONFERENCE',
					 'POOL',
					 'RESTAURANT',
					 'SPA'
				],
				categorie:null,
				isRoom:false,
				isRooftop:false,
				isConferenceRoom:false,
				isPool:false,
				isSpa:false,
				isRestaurant:false,

				rooftops:[],
				restaurants:[],
				confrenceroom:[],
				pools:[],
				spas:[],
				rooms:[],

				offre:{
					titre:"",
					pourcentage:"",
					disponibilite:true,
					description:"",
				},
				idPool:null,
				idRoom:null,
				idRestaurant:null,
				idRooftop:null,
				idSpa:null,
				idConferenceroom:null,
				
		}
          
		
			},
			mounted(){
				this.getRooftof();
				this.getRestaurant();
				this.getConferenceRoom();
				this.getPool();
				this.getRooms();
				this.getSpa();
			},

			methods :{

				categorieClick(){
					if(this.categorie=="CHAMBRES"){
						this.isRoom=true
					}else if(this.categorie=="POOL"){
						this.isPool=true
					}
					else if(this.categorie=="RESTAURANT"){
						this.isRestaurant=true
					}
					else if(this.categorie=="SALLE DE CONFERENCE"){
						this.isConferenceRoom=true
					}
					else if (this.categorie=="SPA"){
						this.isSpa=true
					}
					else if(this.categorie=="ROOF-TOP"){
						this.isRooftop=true
					}
				},
				getRooftof(){
					axios.get('http://localhost:8000/api/allRoofs-Tops').then(res=>{
						if(res){
							this.rooftops=res.data.rooftops
						}
					})
				},
				getRestaurant(){
					axios.get('http://localhost:8000/api/getallrestaurants').then(res=>{
						if(res){
						this.restaurants=res.data.restaurants
						}
					})

				},

				getConferenceRoom(){
					axios.get('http://localhost:8000/api/getAllConferenceRooms').then(res=>{
						if(res){
							this.confrenceroom=res.data.conference_rooms
						}
					})
				},
				getPool(){
					axios.get('http://localhost:8000/api/pool').then(res=>{
						if(res){
						this.pools=res.data.pool
						}
					})
				},
				getSpa(){
					axios.get('http://localhost:8000/api/spa').then(res=>{
						if(res){
							this.spas=res.data.spa;
						}
					})
				},
				getRooms(){
					axios.get('http://localhost:8000/api/room').then(res=>{
						if(res){
							this.rooms=res.data.room
						}
					})
				}, 
				async addOffre(){
					if(this.idRooftop!=null){
					await axios.post('http://localhost:8000/api/addoffres',{
						titre:this.offre.titre,
						disponibilite:this.offre.disponibilite,
						description:this.offre.description,
						pourcentage:this.offre.pourcentage,
						rooftop_id:this.idRooftop.id
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(res=>{
						if(res){
						this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
					}else{
						this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
					}
					}
					)
				}
				else if(this.idPool!=null){
					await axios.post('http://localhost:8000/api/addoffres',{
						titre:this.offre.titre,
						disponibilite:this.offre.disponibilite,
						description:this.offre.description,
						pourcentage:this.offre.pourcentage,
						pool_id:this.idPool.id
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(res=>{
						if(res){
						this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
					}else{
						this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
					}
					})
				}
				else if(this.idRoom!=null){
					await axios.post('http://localhost:8000/api/addoffres',{
						titre:this.offre.titre,
						disponibilite:this.offre.disponibilite,
						description:this.offre.description,
						pourcentage:this.offre.pourcentage,
						room_id:this.idRoom.id
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(res=>{
						if(res){
						this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
					}else{
						this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
					}
					})
				}
				else if(this.idRestaurant!=null){
					await axios.post('http://localhost:8000/api/addoffres',{
						titre:this.offre.titre,
						disponibilite:this.offre.disponibilite,
						description:this.offre.description,
						pourcentage:this.offre.pourcentage,
						restaurant_id:this.idConferenceroom.id
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(res=>{
						if(res){
						this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
					}else{
						this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
					}
					})
				}
				else if(this.idConferenceroom!=null){
					await axios.post('http://localhost:8000/api/addoffres',{
						titre:this.offre.titre,
						disponibilite:this.offre.disponibilite,
						description:this.offre.description,
						pourcentage:this.offre.pourcentage,
						conference_room_id:this.idConferenceroom.id
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(res=>{
						if(res){
						this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
					}else{
						this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
					}
					})
				}
				else if (this.idSpa!=null){
					await axios.post('http://localhost:8000/api/addoffres',{
						titre:this.offre.titre,
						disponibilite:this.offre.disponibilite,
						description:this.offre.description,
						pourcentage:this.offre.pourcentage,
						spa_id:this.idSpa.id
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(res=>{
						if(res){
						this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
					}else{
						this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
					}
					})
				}
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
