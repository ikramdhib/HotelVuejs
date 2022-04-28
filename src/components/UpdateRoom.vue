<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5> Editer Chambre</h5>
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
         
			</div></div>
			<div class="field col-12">
						<label for="desc">description</label>
						<Textarea id="desc" rows="4" v-model="room.description"/>
			</div>
			<div class="field col-12 md:col-3">
						<label for="num-ch">numero_chambre</label>
						<InputText id="num-ch" type="number" v-model="room.num_room"/>
					</div>
					
						<div class="field col-12 md:col-3">
						<label for="nb-bed">Nombre de lit</label>
						<InputText id="nb-bed" type="number" v-model="room.nbBed"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="nb-a">nombre-p-Adult </label>
						<InputText id="nb-a" type="number" v-model="room.nbAdult" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="nb-E">Nombre-p-enfant</label>
						<InputText id="nb-E" type="number" v-model="room.nbEnfant"/>
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
					<Button label="Ajouter"  @click="updateroom();updatePrice()" ></Button>
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
				
			price:{
				price_hotel:0,
				price_booking1:0,
				price_booking2:0,
                price_booking3:0,
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
               
              
				},
				

		};
          
		
			},
		
			
	
		
			mounted(){
                this.gettype();
	const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/room/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       
          this.room.nbBed=res.data.data.nbBed;
          this.room.description=res.data.data.description;
          this.room.num_room=res.data.data.num_room;
          this.room.numEtage=res.data.data.numEtage;
          this.room.nbAdult=res.data.data.nbAdult;
          this.room.nbEnfant=res.data.data.nbEnfant;
          this.room.avaibility=res.data.data.avaibility;
           let pric=  this.room.price_id=res.data.data.price_id
      localStorage.setItem("r",pric);
               
				
      
       console.log(res.data);
         
       })
       axios.get("http://127.0.0.1:8000/api/price/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       
          this.price.price_hotel=res.data.data.price_hotel;
          this.price.price_booking1=res.data.data.price_booking1;
          this.price.price_booking2=res.data.data.price_booking2;
          this.price.price_booking3=res.data.data.price_booking3;
       })
        axios.get("http://127.0.0.1:8000/api/type/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       
          this.type.nom_type=res.data.data.nom_type;
          
       })
		
		 },
		 methods: {	
		 
			 async gettype(){
            await axios.get('http://localhost:8000/api/user/type/',
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(res=>{

           this.types = res.data.data;
		   let type_id=sessionStorage.getItem(type_id);
		
		   console.log(res);

          
        })
			
		} ,  async updatePrice() {
		
			 await axios
			 
			    .put('http://localhost:8000/api/user/price/'+id,
				{price_booking1:this.price.price_booking1,
                price_booking2:this.price.price_booking2,
                price_booking3:this.price.price_booking3,
				price_hotel:this.price.price_hotel,
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					 	
				     let response = res.data.data.id
					localStorage.setItem('price_id', response);
					  
					 console.log(response)})},
					 
			   async updateroom(){
                   const id1=this.$route.params.id;
			 await axios
			
			    .put('http://localhost:8000/api/user/room/'+id1,
				{nbBed:this.room.nbBed,
                description:this.room.description,
				num_room:this.room.num_room,
				numEtage:this.room.numEtage,
				nbAdult:this.room.nbAdult,
                nbEnfant:this.room.nbEnfant,
                avaibility:this.room.avaibility,
				type_id:this.types.type_id.id,
				price_id:(localStorage.getItem('r')),
				
			 
				
				},{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					
					 //localStorage.setItem("room_id", id);
				     let response = res.data.data.id;
			
					 console.log(response);
                        id =response
					 localStorage.setItem("room_id", id);
					 this.$router.push('TableRoom');
			      
					 
				})
				.catch(function (error) {
              console.log(error);
                      });},}
			
				
			};
	
	
</script>
