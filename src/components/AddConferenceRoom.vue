<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Ajouter Menu pour le restaurant :</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
					     <label for="lastname2">Décoration</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="dropdownValues"  placeholder="Select" v-model="room.decoration"></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Prix de résérvation :</label>
						<InputText id="num_etage" type="text"  v-model="room.prix"/>
					</div>
			        <div class="field col-6">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4"  v-model="room.description"/>
						</div>
					</div>
		 <div  class="p-fluid formgrid grid" v-for="i in pluss" :key="i">
					<div class="field col-12 md:col-4">
					  <label for="lastname2">Type :</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="dropdownValues" v-model="type.label"  ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-4">
						<label for="num-ch">Capacité :</label>
						<InputText id="num-ch" type="number"  v-model="type.capacite"/>
					</div>
					<div class="field col-12 md:col-4">
							<Button id="btn" icon="pi pi-plus" @click="clickPluss()" class="mr-2 mb-2" />

					</div>
		 </div>
		 <div class="p-fluid formgrid grid"  v-for="j in jpluss" :key="j" >
					<div class="field col-12 md:col-4">
						<label for="num_etage">Equipement :</label>
						<InputText id="num_etage" type="text"  v-model="equipement.label"/>
					</div>
					<div class="field col-12 md:col-4">
						<label for="num_etage">Prix pour un Equipement  :</label>
						<InputText id="num_etage" type="text" v-model="equipement.prix"/>
					</div>
					<div class="field col-12 md:col-4">
							<Button id="btn" icon="pi pi-plus" @click="clickjPluss()" class="mr-2 mb-2" />

					</div>
			 </div>
			 <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-12">
						<label for="prix4">Choisir des image :</label>
						<FileUpload name="file" url="" ref="file" @upload="onUpload" @change="selectFile" :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
					</div>
		
	      <div class="field col-12 md:col-3">
			<Button label="Ajouter" @click="addConferenceRoom()"></Button>
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
				switchValue: null,
				dropdownValue:null,
				user:null,
				pluss:1,
				jpluss:1,
				room:{
					prix:"",
					description:"",
					decoration:""
				},
				type:{
					label:"",
					capacite:"",
					disponibilite:""
				},
				equipement:{
					label:"",
					prix:""
				},
				dropdownValues: [
					'ENTREES',
				'PLATS PRINCIPAUX',
				     'DESSERT'
				]
		}
          
		
			},

			mounted(){
				this.user=JSON.parse(localStorage.getItem('user'));
			},

			methods:{
				addConferenceRoom(){
					let msg1=false;
					let msg2=false;
					axios.post('http://localhost:8000/api/addConferenceRoom',
					{
						decoration:this.room.decoration,
						description:this.room.description,
						prix:parseFloat(this.room.prix),
						user_id:this.user.id
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
					).then(res=>{
						if(res){
							axios.post('http://localhost:8000/api/addType',
							{
								label:this.type.label,
								capacite:this.type.capacite,
								disponibilite:true,
								conference_room_id:res.data.conference_room.id
							},
							{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
							).then(
								msg2=true
							);
							axios.post('http://localhost:8000/api/addEquipement',
							{
								label:this.equipement.label,
								prix:this.equipement.prix,
								conference_room_id:res.data.conference_room.id
							},
							{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
							).then(
								msg1=true
							);
							if(msg1 && msg2){
			            	this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});

							}
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});

						}
					})
				},
				clickPluss(){
					this.pluss++
				},
				clickjPluss(){
					this.jpluss++
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
