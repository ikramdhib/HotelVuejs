<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre"> Ajouter un Restaurant</h4>
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
						<InputText id="num_etage" type="number" v-model="restaurant.nbtable"/>
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
					
					
					<div class="field col-12 md:col-12">
						<label for="prix4">Choisir des image :</label>
						<FileUpload name="file" url="" ref="file" @upload="onUpload" @change="selectFile" :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
					</div>
	               <div class="field col-12 md:col-3">
					<Button label="Ajouter"  @click="addRestaurant()" ></Button>
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
				user:null,
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
			this.user=JSON.parse(localStorage.getItem('user'))
		},

		methods :{

			async addRestaurant(){
				console.log("rr",this.restaurant);
				axios.post('http://localhost:8000/api/addRestaurant',
				{
					nom:this.restaurant.nom,
					description:this.restaurant.description,
					capacite:parseInt(this.restaurant.capacite),
					nbtable:parseInt(this.restaurant.nbtable),
					disponibilite:this.restaurant.disponibilite,
					prix_reservation:parseFloat(this.restaurant.prix_reservation),
					user_id:this.user.id
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
				).then(res=>{
					if(res){
						this.$router.push("addmenu");
						localStorage.setItem('restaurant_id',res.data.restaurant.id)
					}
				}

				)
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
