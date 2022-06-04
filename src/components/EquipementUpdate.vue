<template>
	<div id="card" class="grid">
		<div class="col-9">
			<div class="card ">
				<ul style="list-style-type:none;">
                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                 </ul>
				<h4 id="titre">Modifier L'equipement de la salle : </h4>
			 
			
		 <div class="p-fluid formgrid grid"  >
					<div class="field col-12 md:col-4">
						<label for="num_etage">Equipement :</label>
						<InputText id="num_etage" type="text"  v-model="equipement.label"/>
					</div>
					<div class="field col-12 md:col-4">
						<label for="num_etage">Prix pour un Equipement  :</label>
						<InputText id="num_etage" type="text" v-model="equipement.prix"/>
					</div>
					<div class="field col-12 md:col-3">
                        
              <span class="text-black-700">Disponibilité :</span>           
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="equipement.disponibilite" />
				</div>
			</div>
					
		
	      <div class="field col-12 md:col-3 py-4 ">
			   <Toast />
			<Button label="Modifier" @click="updateEquipement" ></Button>
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
			errors:[],
				equipement:{
					label:"",
					prix:"",
					disponibilite:"",
				},
		}
          
		
			},

			mounted(){
				this.user=JSON.parse(localStorage.getItem('user'));
				this.getEquipement();
			},

			methods:{
				async getEquipement(){
					const id=this.$route.params.id;
					await axios.get('http://localhost:8000/api/getEquipement/'+id).then(
						res=>{
							this.equipement.prix=res.data.equipement.prix
							this.equipement.label=res.data.equipement.label
							if(res.data.equipement.disponibilite==1){
						this.equipement.disponibilite=true;
					}else{
						this.equipement.disponibilite=false;
					}
						}
					)
				},
				async updateEquipement(){
					const id=this.$route.params.id;
					if(this.equipement.label==""){
				this.errors.push("le label de type doit étre remplir")
	               }	if(isNaN(this.equipement.prix)){
				this.errors.push("le label de type doit étre nombre")
	               }	else if(this.equipement.prix==""){
				this.errors.push("le label de type doit étre remplir")
	               }
					await axios.put('http://localhost:8000/api/update-equipement/'+id,
					{
						prix:this.equipement.prix,
						label:this.equipement.label,
						disponibilite:this.equipement.disponibilite,
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
#card{
	margin-top: 50px;
	margin-left: 50px;
}
</style>
