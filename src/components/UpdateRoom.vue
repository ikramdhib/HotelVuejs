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
                   
            	      
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="room.avaibility"/>
				</div>    
         
			</div>
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
					      <Toast />
					<Button label="Modifier"  @click="updateprice();updateRoom()" ></Button>
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
             
              
				},
				

		};  
          
		
			},
		
			
	
		
			mounted(){
                this.gettype();
	const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/room/"+id)
      .then((res) => {
       
          this.room.nbBed=res.data.room.nbBed;
          this.room.description=res.data.room.description;
          this.room.num_room=res.data.room.num_room;
          this.room.numEtage=res.data.room.numEtage;
          this.room.nbAdult=res.data.room.nbAdult;
          this.room.nbEnfant=res.data.room.nbEnfant;
      	if(res.data.room.avaibility==1){
						this.room.avaibility=true;
					}else{
						this.room.avaibility=false;
					}
          this.room.nbbebe=res.data.room.nbbebe;

		 this.room.type_id=res.data.room.type_id;
           let pric=  this.room.price_id=res.data.room.price_id;
		  

      localStorage.setItem("r",pric);
               
	
       axios.get("http://127.0.0.1:8000/api/price/"+pric)
      .then((res) => {
       
          this.price.price_hotel=res.data.price.price_hotel;
          this.price.price_booking1=res.data.price.price_booking1;
          this.price.price_booking2=res.data.price.price_booking2;
          this.price.price_booking3=res.data.price.price_booking3;
       })
      
	  })
		 },
		 methods: {	
		 
			 async gettype(){
            await axios.get('http://localhost:8000/api/type'
           
        ).then(res=>{

           this.types = res.data.type;
		    this.types.nom_type=res.data.type.nom_type;
		   let type_id=sessionStorage.getItem(type_id);
		
		   console.log(res);

          
        })
			
		} ,  async updateprice() {
		 
		 
			 await axios
			  
			    .put('http://localhost:8000/api/price/'+localStorage.getItem('r'),
			{price_booking1:parseFloat(this.price.price_booking1),
                price_booking2:parseFloat(this.price.price_booking2),
                price_booking3:parseFloat(this.price.price_booking3),
				price_hotel:parseFloat(this.price.price_hotel),},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					 	
				     
					  
					 console.log(res)})
		},
			    async updateRoom(){
					  this.user=JSON.parse(localStorage.getItem('user'));
					 const id=this.$route.params.id;
			 await axios
			
			    .put('http://localhost:8000/api/room/'+id,
				{nbBed:this.room.nbBed,
                description:this.room.description,
				num_room:this.room.num_room,
				numEtage:this.room.numEtage,
				nbAdult:this.room.nbAdult,
                nbEnfant:this.room.nbEnfant,
                avaibility:this.room.avaibility,
				 nbbebe:this.room.nbbebe,
				type_id:this.types.type_id.id,
				price_id:(localStorage.getItem('r')),
				user_id:this.user.id,
			 
			 
				
				},{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					
					 
				     let response = res.data.data.id;
			
					 console.log(response);
                     
					 localStorage.setItem("room_id", id);
					 if(res){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été modifier avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					 this.$router.push('RoomTable');
			      
					 
				})
				},}
			
				
	}
	
	
</script>
