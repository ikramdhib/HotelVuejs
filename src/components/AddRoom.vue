<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5> Ajouter Chambre :</h5>
			      <div class="p-fluid formgrid grid">
					   <div class="field col-12 md:col-4">
					     <label for="lastname2">Type de chambre</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="types" optionLabel="nom_type" v-model="types.type_id" placeholder="Selectionner type" ></Dropdown>
					</span>
			        </div>
					
					<div class="field col-12 md:col-4">
						<label for="num_etage">Numero d'etage </label>
						<InputText min="1" id="num_etage" type="number" v-model="room.numEtage" />
					</div>
					
					<div class="field col-12 md:col-4">
                        
              <span class="text-black-700">Disponibilité</span>           
                  
                        
                            
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="room.avaibility"/>
				</div>
				 
				</div>
				 
				
			<div class="field col-9">
						<label for="desc">Description</label>
						<Textarea id="desc" placeholder="Ecrivez un paragraphe décrite la chambre" rows="4" v-model="room.description"/>
			</div>
			<div class="field col-12 md:col-3">
						<label for="num-ch">numero de chambre</label>
						<InputText  id="num-ch" type="number"  min="1" v-model="room.num_room"/>
					</div>
					
						<div class="field col-12 md:col-3">
						<label for="nb-bed">Nombre de lit</label>
						<InputText id="nb-bed" type="number"  min="1" v-model="room.nbBed"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="nb-a">Nombre d'adult </label>
						<InputText id="nb-a" type="number" min="1" v-model="room.nbAdult" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="nb-E">Nombre d'enfant</label>
						<InputText id="nb-E" type="number" min="1" v-model="room.nbEnfant"/>
					</div>
						<div class="field col-12 md:col-3">
						<label for="nb-B">Nombre de bébé</label>
						<InputText id="nb-B" type="number" min="1" v-model="room.nbbebe"/>
					</div>
					 <div class="field col-12 md:col-3">
						<label for="prix1">Prix d'hotel</label>
						<InputText id="prix1" type="text" placeholder="prix specifier pour l'hotel" v-model="price.price_hotel" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="prix2">Prix réservation(1)</label>
						<InputText id="prix2" type="text" placeholder="prix de sponsor (1)" v-model="price.price_booking1"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="prix3">Prix réservation (2)</label>
						<InputText id="prix3" type="text" placeholder="prix de sponsor (2)" v-model="price.price_booking2"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="prix4">Prix reservation (3)</label>
						<InputText id="prix4" type="text" placeholder="prix de sponsor (3)" v-model="price.price_booking3"/>
					</div></div>
						 <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="prix4">Choisir des image :</label>
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText  type="file" multiple @change="changeFile"/>
						</span>
					</div></div>
					 <div class="p-fluid formgrid grid">
	               <div class="ield col-12 md:col-3  py-4">
					   <Toast/>
					<Button label="Ajouter"  @click="addroom();addPrice()" ></Button>
					</div>
		</div>
		</div>
		
		</div>
		</div>
</template>

<script>
import axios from 'axios';
  let id =0;

	export default {
		data() {
			return {
				 user_id:0,
			price:{
				price_hotel:"",
				price_booking1:"",
				price_booking2:"",
                price_booking3:"",
			},
				types:[],
				type:{type_id:0},
				room:{ 
					nbBed:0,
			    avaibility:"",
				description:"",
				num_room:0,
				numEtage:0,
				nbAdult:0,
                nbEnfant: 0,
				type_id:0,
				price_id:0,
				nbbebe:0
              
              
				},
					image:[],
                form: new FormData,

		};
          
		
			},
		
			
	
		
			mounted(){
				
	
         
		this.gettype();
	
		
		
			},
		
     
		 methods: {	
			 	changeFile(e){

              let selectedFiles=e.target.files
              if(!selectedFiles.length){
                  return false
              }

              for(let i=0 ;i<selectedFiles.length ;i++ ){
                  this.image.push(selectedFiles[i])
              }
            
              
           },
		
			 async gettype(){
            await axios.get('http://localhost:8000/api/type',
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(res=>{

           this.types = res.data.type;
		   let type_id=sessionStorage.getItem(type_id);
		
		   console.log(res);

          
        })
			
		} ,  async addPrice() {
		 
			 await axios
			 
			    .post('http://localhost:8000/api/price',
				{price_booking1:parseFloat(this.price.price_booking1),
                price_booking2:parseFloat(this.price.price_booking2),
                price_booking3:parseFloat(this.price.price_booking3),
				price_hotel:parseFloat(this.price.price_hotel),
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					 	
				     let response = res.data.data.id
					localStorage.setItem('price_id', response);
					  
					 console.log(response)})},
					 
			   async addroom(){
				     this.user=JSON.parse(localStorage.getItem('user'));
		
			 await axios
			
			    .post('http://localhost:8000/api/room',
				{nbBed:this.room.nbBed,
                description:this.room.description,
				num_room:this.room.num_room,
				numEtage:this.room.numEtage,
				nbAdult:this.room.nbAdult,
                nbEnfant:this.room.nbEnfant,
                avaibility:this.room.avaibility,
				 nbbebe:this.room.nbbebe,
				type_id:this.types.type_id.id,
				price_id:(localStorage.getItem('price_id')),
				user_id:this.user.id,
			 
				
				},{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					
					 //localStorage.setItem("room_id", id);
				     let response = res.data.data.id;
		                         id =response
					 localStorage.setItem("room_id", id);

					
			      	for(let i=0 ;i<this.image.length;i++){
							this.form.append('path',this.image[i])
							this.form.append('room_id',res.data.data.id)

							const config= {headers:{'Content-Type':'multipart/form-data',
							Authorization: 'Bearer ' + localStorage.getItem('token') }};
							axios.post('http://localhost:8000/api/images',this.form,config)
							}
						if(res){
			            	this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
			          
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					  this.$router.push('option');
				})
				}
		 }
				
			};
	
	
</script>
