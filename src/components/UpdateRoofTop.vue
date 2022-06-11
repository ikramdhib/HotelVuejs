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

			<div class="field col-12">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4"  v-model="rooftop.description"/>
			</div>
					
					
					
	               <div class="field col-12 md:col-3">
					   <Toast />
					<Button label="Ajouter"  @click="updateRoofTop()" ></Button>
		</div>
		<div class="field col-12 md:col-3">
					   <Toast />
					<Button label="Annuler" class="p-button-secondary mr-2 mb-2" @click="goBack()" ></Button>
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
				errors:[],
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
				this.getRoofTop();
			},
			methods :{
				async getRoofTop(){
					const id=this.$route.params.id;
					await axios.get('http://localhost:8000/api/Roof-Top/'+id,
					).then(res=>{
						this.rooftop.prix=res.data.RoofTop.prix;
						this.rooftop.description=res.data.RoofTop.description;
						this.rooftop.intitule=res.data.RoofTop.intitule;
						this.rooftop.capacite=res.data.RoofTop.capacite;
						if(res.data.RoofTop.disponibilite==1){
						this.rooftop.disponibilite=true;
					}else{
						this.rooftop.disponibilite=false;
					}
						console.log(res.data.RoofTop);
					}
					)
				},
				async updateRoofTop(){
					const id=this.$route.params.id;
					if(this.rooftop.intitule==""){
				this.errors.push("la nom de rooftop doit étre saisie")
	               }
				   if(this.rooftop.description==""){
				this.errors.push("la description de rooftop doit étre remplir")
	               }
				    if(this.rooftop.capacite==""){
				this.errors.push("la capacité de rooftop doit étre saisie")
	               }
				    if((this.rooftop.prix=="")){
				this.errors.push("le prix de rooftop doit étre saisie")
	               }  else if (isNaN(this.rooftop.prix)){
					   this.errors.push("le prix de rooftop doit étre un nombre")
				   }
					await axios.put('http://localhost:8000/api/update-Roof-Top/'+id,
					{
						prix:this.rooftop.prix,
						description:this.rooftop.description,
						intitule:this.rooftop.intitule,
						capacite:this.rooftop.capacite,
						disponibilite:this.rooftop.disponibilite
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
					).then(res=>{
						if(res){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					})
				},
				goBack(){
					this.$router.push("rooftop")
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
