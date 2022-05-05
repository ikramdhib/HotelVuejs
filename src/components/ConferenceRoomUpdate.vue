<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Modifier la salle de conference :</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-4">
					     <label for="lastname2">Décoration</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="dropdownValues"  :placeholder="room.decoration"  v-model="room.decoration"></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-4">
						<label for="num_etage">Prix de résérvation :</label>
						<InputText id="num_etage" type="text"  v-model="room.prix"/>
					</div>
					
					<div class="field col-12 md:col-4">
                        
              <span class="text-black-700">Disponibilité :</span>           
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="room.disponibilite" />
				</div>
			</div>
			        <div class="field col-9">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4"  v-model="room.description"/>
						</div>
					<div class="field col-12 md:col-12">
						<label for="prix4">Choisir des image :</label>
						<FileUpload name="file" url="" ref="file" @upload="onUpload" @change="selectFile" :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
					</div>
		
	      <div class="field col-12 md:col-3 py-4">
			   <Toast />
			<Button label="Modifier"  @click="updateRoom()"></Button>
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
import axios from 'axios'

	export default {
		data() {
			return {
				
				
				room:{
					prix:"",
					description:"",
					decoration:"",
					disponibilite:""
				},
				dropdownValues: [
					'CAREES',
				'OVAL',
				     'NORMALE'
				]
		}
          
		
			},

			mounted(){
				this.getRoom();
			},

			methods:{
				async getRoom(){
					const id=this.$route.params.id;
					await axios.get('http://localhost:8000/api/getConferenceRoom/'+id).then(res=>{
						this.room.prix=res.data.conference_room.prix
						this.room.description=res.data.conference_room.description
						this.room.decoration=res.data.conference_room.decoration
						if(res.data.conference_room.disponibilite==1){
						this.conference_room.disponibilite=true;
						}else{
							this.conference_room.disponibilite=false;
						}
					});
				},
				async updateRoom(){
					const id=this.$route.params.id;
					await axios.put('http://localhost:8000/api/update-conference-room/'+id,
					{
						prix:this.room.prix,
						description:this.room.description,
						decoration:this.room.decoration,
						disponibilite:this.room.disponibilite
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
					this.$router.push('conferencerooms')
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
