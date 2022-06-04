<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre"> Modifier  le Restaurant : {{ restaurant.nom }}  </h4>
				<ul style="list-style-type:none;">
                                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                            </ul>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="num_etage">Non du restaurant :</label>
						<InputText id="num_etage" type="text" v-model="restaurant.nom"/>
					</div>
						<div class="field col-12 md:col-3">
						<label for="num-ch">Capacité :</label>
						<InputText id="num-ch" type="number"  v-model="restaurant.capacite"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Nombres des tables :</label>
						<InputText id="num_etage" type="number" min="1" v-model="restaurant.nbtable"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Prix de la résérvation :</label>
						<InputText id="num_etage" type="text" v-model="restaurant.prix_reservation"/>
					</div>
					<div class="field col-12 md:col-3">
                        
              <span class="text-black-700">Disponibilité :</span>           
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="restaurant.disponibilite"/>
				</div>
			</div>

			<div class="field col-9">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4" v-model="restaurant.description" />
			</div>
					
					
					
	               <div class="field col-12 md:col-3 py-4">
					   <Toast />
					<Button label="Modifier"  @click="updateRestaurant()" ></Button>
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
				errors:[],
				restaurant:{
					nom:"",
					description:"",
					capacite:"",
					nbtable:"",
					disponibilite:"",
					prix_reservation:"",
				}
			}
		},
		mounted(){
			this.getRestaurant();
		},

		methods :{

			async getRestaurant(){
				const id=this.$route.params.id;
				await axios.get('http://localhost:8000/api/getrestaurant/'+id).then(res=>{
					this.restaurant.nom=res.data.restaurant.nom
					this.restaurant.description=res.data.restaurant.description
					this.restaurant.capacite=res.data.restaurant.capacite
					this.restaurant.nbtable=res.data.restaurant.nbtable
					this.restaurant.prix_reservation=res.data.restaurant.prix_reservation
						if(res.data.restaurant.disponibilite==1){
						this.restaurant.disponibilite=true;
					}else{
						this.restaurant.disponibilite=false;
					}
				})
			},

			async updateRestaurant(){
				const id=this.$route.params.id;
					if(this.restaurant.nom==""){
				this.errors.push("le nom de restaurant doit étre remplir")
	               }if(this.restaurant.description==""){
				this.errors.push("la description de restaurant doit étre remplir")
	               }
				   if(this.restaurant.nbtable==""){
				this.errors.push("le nombre de table de restaurant  doit étre remplir")
	               }
				   if(isNaN(this.restaurant.prix_reservation)){
				this.errors.push("le prix de reservation de restaurant doit étre nombre")
	               }else if (this.restaurant.prix_reservation==""){
					   	this.errors.push("le prix de reservation de restaurant doit étre remplir")
				   }
				await axios.put('http://localhost:8000/api/update-Restaurant/'+id,
				{
					nom:this.restaurant.nom,
					description:this.restaurant.description,
					capacite:this.restaurant.capacite,
					nbtable:this.restaurant.nbtable,
					prix_reservation:this.restaurant.prix_reservation,
					disponibilite:this.restaurant.disponibilite,
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}).then(
					res=>{
						if(res.data.updated){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					}
				)
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
</style>
