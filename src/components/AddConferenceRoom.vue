<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Ajouter Un salle de conference :</h4>
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
		 <div  class="p-fluid formgrid grid">
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
							<Button id="btn" icon="pi pi-plus" @click="addWithPluss()" class="mr-2 mb-2" />

					</div>
		 </div>
		 <div class="p-fluid formgrid grid"  >
					<div class="field col-12 md:col-4">
						<label for="num_etage">Equipement :</label>
						<InputText id="num_etage" type="text"  v-model="equipement.label"/>
					</div>
					<div class="field col-12 md:col-4">
						<label for="num_etage">Prix pour un Equipement  :</label>
						<InputText id="num_etage" type="text" v-model="equipement.prix"/>
					</div>
					<div class="field col-12 md:col-4">
							<Button id="btn" icon="pi pi-plus" @click="addWithPlussEq()" class="mr-2 mb-2" />

					</div>
			 </div>
			 <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="prix4">Choisir des image :</label>
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText type="file" multiple @change="changeFile"/>
						</span>
					</div>
			 </div>
			  <div class="p-fluid formgrid grid">
	      <div class="field col-12 md:col-3 py-4">
			   <Toast />
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
				isRegistred:false,
				idc:null,
				roomRegistred:false,
				typeRegistred:false,
				equipementRegistred:false,
				idT:null,
				idE:null,
				room:{
					prix:"",
					description:"",
					decoration:"",
					disponibilite:true
				},
				type:{
					label:"",
					capacite:"",
					disponibilite:true,
				},
				equipement:{
					label:"",
					prix:"",
					disponibilite:true,
				},
				dropdownValues: [
					'CAREES',
				'OVAL',
				     'NORMALE'
				],
				 image:[],
                form: new FormData,
		}
          
		
			},

			mounted(){
				this.user=JSON.parse(localStorage.getItem('user'));
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
				addConferenceRoom(){
					if(this.isRegistred){

						if(this.idc!=null && this.idT!=null){
						axios.get('http://localhost:8000/api/getConferenceRoom/'+this.idc).then(res=>{
							if(res.data.message==true){
								this.roomRegistred=true
							}
						}
						);
						axios.get('http://localhost:8000/api/getType/'+this.idT).then(res=>{
							if(res.data.message==true){
								this.typeRegistred=true
							}
						});
						axios.post('http://localhost:8000/api/addEquipement',
							{
								label:this.equipement.label,
								prix:this.equipement.prix,
								disponibilite:this.equipement.disponibilite,
								conference_room_id:this.idc
							},
							{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
							).then(res=>{
								this.idE=res.data.equipement
							});
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						}
					  if(this.idE!=null && this.idc !=null){

						axios.post('http://localhost:8000/api/addType',
							{
								label:this.type.label,
								capacite:this.type.capacite,
								disponibilite:this.type.disponibilite,
								conference_room_id:this.idc
							},
							{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
							).then(resp=>{
								this.idT=resp.data.type.id
							});
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						
						}
					if(this.idc!=null && this.idT!=null && this.idE!=null){
						axios.get('http://localhost:8000/api/getEquipement/'+this.idE).then(res=>{
							if(res.data.message==true){
								this.equipementRegistred=true
							}
						});
						axios.get('http://localhost:8000/api/getConferenceRoom/'+this.idc).then(res=>{
							if(res.data.message==true){
								this.roomRegistred=true
							}
						});
						axios.get('http://localhost:8000/api/getType/'+this.idT).then(res=>{
							if(res.data.message==true){
								this.typeRegistred=true
							}
						});
						this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
					}
					
					}
					
					if(this.isRegistred==false){
						let msg1=false;
					    let msg2=false;
					axios.post('http://localhost:8000/api/addConferenceRoom',
					{
						decoration:this.room.decoration,
						description:this.room.description,
						prix:parseFloat(this.room.prix),
						user_id:this.user.id,
						disponibilite:this.room.disponibilite
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
								disponibilite:this.equipement.disponibilite,
								conference_room_id:res.data.conference_room.id
							},
							{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
							).then(
								msg1=true
							);
							for(let i=0 ;i<this.image.length;i++){
							this.form.append('path',this.image[i])
							this.form.append('conference_room_id',res.data.conference_room.id)

							const config= {headers:{'Content-Type':'multipart/form-data',
							Authorization: 'Bearer ' + localStorage.getItem('token') }};
							axios.post('http://localhost:8000/api/images',this.form,config)
							}
							if(msg1 && msg2){
			            	this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
							}
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					});
					}
					
				},
				addWithPluss(){
					
					if(this.isRegistred==false){

						axios.post('http://localhost:8000/api/addConferenceRoom',
					{
						decoration:this.room.decoration,
						description:this.room.description,
						prix:parseFloat(this.room.prix),
						disponibilite:this.room.disponibilite,
						user_id:this.user.id
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
					).then(res=>{
						this.idc=res.data.conference_room.id
						if(res){
							axios.post('http://localhost:8000/api/addType',
							{
								label:this.type.label,
								capacite:this.type.capacite,
								disponibilite:this.type.disponibilite,
								conference_room_id:this.idc
							},
							{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
							).then(resp=>{
								this.idT=resp.data.type.id
							});
							for(let i=0 ;i<this.image.length;i++){
							this.form.append('path',this.image[i])
							this.form.append('conference_room_id',res.data.conference_room.id)

							const config= {headers:{'Content-Type':'multipart/form-data',
							Authorization: 'Bearer ' + localStorage.getItem('token') }};
							axios.post('http://localhost:8000/api/images',this.form,config)
							}
						}
						});

					}
					
					if(this.isRegistred){
						axios.post('http://localhost:8000/api/addType',
							{
								label:this.type.label,
								capacite:this.type.capacite,
								disponibilite:this.type.disponibilite,
								conference_room_id:this.idc
							},
							{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
							).then(res=>{
								this.idT=res.data.type.id
							}

							);
							
					}
					this.isRegistred=true
				},
				addWithPlussEq(){
					if(this.isRegistred==false){
						
						axios.post('http://localhost:8000/api/addConferenceRoom',
					{
						decoration:this.room.decoration,
						description:this.room.description,
						prix:parseFloat(this.room.prix),
						user_id:this.user.id,
						disponibilite:this.room.disponibilite
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
					).then(res=>{
						this.idc=res.data.conference_room.id
						if(res){
							axios.post('http://localhost:8000/api/addEquipement',
							{
								label:this.equipement.label,
								prix:this.equipement.prix,
								disponibilite:this.equipement.disponibilite,
								conference_room_id:this.idc
							},
							{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
							).then(res=>{
								this.idE=res.data.equipement
							}
							);
							for(let i=0 ;i<this.image.length;i++){
							this.form.append('path',this.image[i])
							this.form.append('conference_room_id',res.data.conference_room.id)

							const config= {headers:{'Content-Type':'multipart/form-data',
							Authorization: 'Bearer ' + localStorage.getItem('token') }};
							axios.post('http://localhost:8000/api/images',this.form,config)
							}
						}
					});

					}
					if(this.isRegistred){
						axios.post('http://localhost:8000/api/addEquipement',
							{
								label:this.equipement.label,
								prix:this.equipement.prix,
								disponibilite:this.equipement.disponibilite,
								conference_room_id:this.idc
							},
							{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
							).then(res=>{
								this.idE=res.data.equipement
							}
							);
					}
					this.isRegistred=true
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
