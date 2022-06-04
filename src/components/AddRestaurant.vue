<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre"> Ajouter un Restaurant</h4>
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
						<InputText id="num-ch" type="number" min="1" v-model="restaurant.capacite"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Nombres des tables :</label>
						<InputText id="num_etage" type="number"  min="1" v-model="restaurant.nbtable"/>
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
			      </div>	
					 <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="prix4">Choisir des image :</label>
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText  type="file" multiple @change="changeFile"/>
						</span>
					</div>
			 </div>
			 <div class="p-fluid formgrid grid">
	               <div class="field col-12 md:col-3  py-4">
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
				id:null,
				user:null,
				restaurant:{
					nom:"",
					description:"",
					capacite:"",
					nbtable:"",
					disponibilite:"",
					prix_reservation:"",
				},
					image:[],
					errors:[],
                form: new FormData,
			}
		},
		mounted(){
			this.user=JSON.parse(localStorage.getItem('user'))
		},

		methods :{
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

			async addRestaurant(){
				console.log("rr",this.restaurant);
				if(this.restaurant.nom==""){
				this.errors.push("la nom de restaurant doit étre saisie")
	               }
				   	if(this.restaurant.description==""){
				this.errors.push("la description de restaurant  doit étre remplir")
	               }
				   	if(this.restaurant.capacite==""){
				this.errors.push("la capacité de restaurant  doit étre saisie")
	               }
				   if(this.restaurant.nbtable==""){
				this.errors.push("la nombre de table doit étre saisie")
	               }
				    if(this.restaurant.prix_reservation=="") {
				this.errors.push("le prix de reservation doit étre saisie")
	               }
				   else if(isNaN(this.restaurant.prix_reservation)){
					   this.errors.push("le prix de reservation doit étre nombre")
				   }
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
					for(let i=0 ;i<this.image.length;i++){
							this.form.append('path',this.image[i])
							this.form.append('restaurant_id',res.data.restaurant.id)

							const config= {headers:{'Content-Type':'multipart/form-data',
							Authorization: 'Bearer ' + localStorage.getItem('token') }};
							axios.post('http://localhost:8000/api/images',this.form,config)
							}
					if(res){
						this.id=res.data.restaurant.id
						this.$router.push({name:'addmenu' , params:{id:this.id}});
						this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
			          
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
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
