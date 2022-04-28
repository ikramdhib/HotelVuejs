<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5> Ajouter Chambre :</h5>
			      <div class="p-fluid formgrid grid">
					   <div class="field col-12 md:col-4">
					     <label for="lastname2">Type_chambre</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="types" optionLabel="nom_type" v-model="types.type_id" placeholder="Select" ></Dropdown>
					</span>
			        </div>
					
					<div class="field col-12 md:col-4">
						<label for="num_etage">Numero-Etage </label>
						<InputText id="num_etage" type="number" v-model="room.numEtage" />
					</div>
					
					<div class="field col-12 md:col-4">
                        
              <span class="text-black-700">Disponibilité</span>           
                   <div class="mt-2">
						  <label class="inline-flex items-center ml-4">
		
            	 <input type="radio"  value="oui"  v-model="room.avaibility">
                <span class="ml-2">Oui</span>
                 </label>
               <label class="inline-flex items-center ml-4">
                        	 <input type="radio"  value="non"  v-model="room.avaibility">
                <span class="ml-2">Non</span>
              </label>
				 
				</div>
			</div>
			<div class="field col-9">
						<label for="desc">description</label>
						<Textarea id="desc" rows="4" v-model="room.description"/>
			</div>
			<div class="field col-12 md:col-3">
						<label for="num-ch">numero_chambre</label>
						<InputText id="num-ch" type="number"  min="0" v-model="room.num_room"/>
					</div>
					
						<div class="field col-12 md:col-3">
						<label for="nb-bed">Nombre de lit</label>
						<InputText id="nb-bed" type="number"  min="0" v-model="room.nbBed"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="nb-a">nombre-p-Adult </label>
						<InputText id="nb-a" type="number" min="0" v-model="room.nbAdult" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="nb-E">Nombre-p-enfant</label>
						<InputText id="nb-E" type="number" min="0" v-model="room.nbEnfant"/>
					</div>
						<div class="field col-12 md:col-3">
						<label for="nb-B">Nombre bebe</label>
						<InputText id="nb-B" type="number" min="0" v-model="room.nbbebe"/>
					</div>
					 <div class="field col-12 md:col-3">
						<label for="prix1">prix_hotel</label>
						<InputText id="prix1" type="text" v-model="price.price_hotel" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="prix2">prix_booking1</label>
						<InputText id="prix2" type="text" v-model="price.price_booking1"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="prix3">prix_booking2</label>
						<InputText id="prix3" type="text" v-model="price.price_booking2"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="prix4">prix_booking3</label>
						<InputText id="prix4" type="text" v-model="price.price_booking3"/>
					</div>
	               <div class="field col-12 md:col-3">
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
				

		};
          
		
			},
		
			
	
		
			mounted(){
				
	
         
		this.gettype();
	
		
		
			},
		
     
		 methods: {	
		
			 async gettype(){
            await axios.get('http://localhost:8000/api/type',
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(res=>{

           this.types = res.data.data;
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
			
					 console.log(response);
                        id =response
					 localStorage.setItem("room_id", id);
					 this.$router.push('option');
			      
					 
				})
				.catch(function (error) {
              console.log(error);
                      });},}
			
				
			};
	
	
</script>
