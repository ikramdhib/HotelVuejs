<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre"> Ajouter un Restaurant</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="num_etage">Non du restaurant :</label>
						<InputText id="num_etage" type="text" />
					</div>
						<div class="field col-12 md:col-3">
						<label for="num-ch">Capacité :</label>
						<InputText id="num-ch" type="number"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Nombres des tables :</label>
						<InputText id="num_etage" type="number" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Prix de la résérvation :</label>
						<InputText id="num_etage" type="text" />
					</div>
					<div class="field col-12 md:col-3">
                        
              <span class="text-black-700">Disponibilité :</span>           
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="switchValue" />
				</div>
			</div>

			<div class="field col-9">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4" v-model="room.description"/>
			</div>
					
					
					<div class="field col-12 md:col-12">
						<label for="prix4">Choisir des image :</label>
						<FileUpload name="file" url="" ref="file" @upload="onUpload" @change="selectFile" :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
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
				switchValue: null,
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
	
		
		
			},
		
     
		 methods: {	
		
			 async gettype(){
            await axios.get('http://localhost:8000/api/user/type',
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(res=>{

           this.types = res.data.data;
		   let type_id=sessionStorage.getItem(type_id);
		
		   console.log(res);

          
        })
			
		} ,  async addPrice() {
		 
			 await axios
			 
			    .post('http://localhost:8000/api/user/price',
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
					 
			   async addroom(){
			 await axios
			
			    .post('http://localhost:8000/api/user/room',
				{nbBed:this.room.nbBed,
                description:this.room.description,
				num_room:this.room.num_room,
				numEtage:this.room.numEtage,
				nbAdult:this.room.nbAdult,
                nbEnfant:this.room.nbEnfant,
                avaibility:this.room.avaibility,
				type_id:this.types.type_id.id,
				price_id:(localStorage.getItem('price_id')),
				
			 
				
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

<style scoped>
#titre{
margin-bottom: 30px;
margin-top: 15px;
}
#switcher{
	margin-top: 105px;
}
</style>
