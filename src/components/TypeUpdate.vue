<template>
	<div id="card" class="grid">
		<div class="col-9">
			<div class="card">
				<ul style="list-style-type:none;">
                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                 </ul>
				<h4 id="titre">Modifier ce type : {{ type.label }} </h4>
			    
		 <div  class="p-fluid formgrid grid">
					<div class="field col-12 md:col-4">
					  <label for="lastname2">Type :</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="dropdownValues" :placeholder="type.label"  v-model="type.label"  ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-4">
						<label for="num-ch">Capacité :</label>
						<InputText id="num-ch" type="number"  v-model="type.capacite"/>
					</div>
				<div class="field col-12 md:col-3">
                        
              <span class="text-black-700">Disponibilité :</span>           
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="type.disponibilite" />
				</div>
			</div>
		
	      <div class="field col-12 md:col-3 py-4">
			   <Toast />
			<Button label="Modifier" @click="updateType()"></Button>
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
				type:{
					label:"",
					capacite:"",
					disponibilite:"",
				},
				dropdownValues: [
					'CAREES',
				     'OVAL',
				     'NORMALE'
				]
		}
          
		
			},

			mounted(){
				this.getType();
			},

			methods:{
				async updateType(){
					const id=this.$route.params.id;
					  if(this.type.label==""){
				this.errors.push("le label de type doit étre remplir")
	               }  if(this.type.capacite==""){
				this.errors.push("la capacité de type doit étre remplir")
	               }
					await axios.put('http://localhost:8000/api/update-Type/'+id,
					{
						label:this.type.label,
						capacite:this.type.capacite,
						disponibilite:this.type.disponibilite
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(res=>{
						if(res.data.updated){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					})
				},
				async getType(){
					const id=this.$route.params.id;
					await axios.get('http://localhost:8000/api/getType/'+id).then(res=>{
						this.type.label=res.data.type.label
						this.type.capacite=res.data.type.capacite
							if(res.data.type.disponibilite==1){
						this.type.disponibilite=true;
							}else{
								this.type.disponibilite=false;
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
