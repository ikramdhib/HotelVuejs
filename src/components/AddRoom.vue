<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5> Ajouter Chambre :</h5>
				  
                            <ul style="list-style-type:none;">
                                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                            </ul>
                     
			      <div class="p-fluid formgrid grid">
					   <div class="field col-12 md:col-4">
					     <label for="lastname2">Type de chambre</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="types" optionLabel="nom_type" v-model="types.type_id" placeholder="Selectionner type" ></Dropdown>
					</span>
			        </div>
					
					<div class="field col-12 md:col-4">
						<label for="num_etage">Numero Etage </label>
						<InputText id="num_etage" type="number" v-model="room.numEtage" />
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
						<label for="num-ch">Numero chambre</label>
						<InputText id="num-ch" type="number"  min="1" v-model="room.num_room"/>
					</div>
					
						<div class="field col-12 md:col-3">
						<label for="nb-bed">Nombre de lit</label>
						<InputText id="nb-bed" type="number"  min="0" v-model="room.nbBed"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="nb-a">Nombre adult </label>
						<InputText id="nb-a" type="number" min="1" v-model="room.nbAdult" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="nb-E">Nombre enfant</label>
						<InputText id="nb-E" type="number" min="0" v-model="room.nbEnfant"/>
					</div>
						<div class="field col-12 md:col-3">
						<label for="nb-B">Nombre de bébé</label>
						<InputText id="nb-B" type="number" min="0" v-model="room.nbbebe"/>
					</div>
					 <div class="field col-12 md:col-3">
						<label for="prix1">Prix de Reservation</label>
						<InputText id="prix1" type="text" v-model="room.price_booking" />
					</div>
						
					<div class="field col-12 md:col-6">
						<label for="prix4">Choisir des image :</label>
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText  type="file" multiple @change="changeFile"/>
						</span>
					</div>
				
				</div>
					
					 <div class="p-fluid formgrid grid">
	               <div class="ield col-12 md:col-3  py-4">
					   <Toast/>
					<Button label="Ajouter"  @click="addroom()" ></Button>
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
			
				
				
			errors:[],
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
				price_booking:0,
				nbbebe:0},
					image:[],
                form: new FormData,	};
          	},mounted(){
				this.gettype();},
		 methods: {	
			 	changeFile(e){
              let selectedFiles=e.target.files
              if(!selectedFiles.length){
                  return false}
           for(let i=0 ;i<selectedFiles.length ;i++ ){
                  this.image.push(selectedFiles[i])} },
		async gettype(){
            await axios.get('http://localhost:8000/api/type',
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(res=>{
        this.types = res.data.type;
		   let type_id=sessionStorage.getItem(type_id);
	      console.log(res); })} ,  
					 
			   async addroom(){
				     this.user=JSON.parse(localStorage.getItem('user'));
			if(this.room.nbBed==0){
				this.errors.push("le nombre de lit doit étre saisie")
	}
     if(this.room.num_room==0){
				this.errors.push("le numero de chambre doit étre saisie et unique")
	}
	if(this.room.nbAdult==0){
				this.errors.push("le nombre d'adult doit étre saisie")

	}if(this.room.numEtage==0){
				this.errors.push("le numero d'etage  doit étre saisie")
	}
	if(this.room.description==''){
				this.errors.push("la description de lit doit étre remplir")
	}
	if(this.room.nbbebe==''){
				this.errors.push("le nombre de bebe doit étre saisie")
	}if(this.room.nbEnfant==''){
				this.errors.push("le nombre d'enfant doit étre saisie")
	}
	if(isNaN(this.room.price_booking)){
				this.errors.push("la prix de reservation doit étre nombre")
	}else if (this.room.price_booking==""){
			this.errors.push("la prix de reservation doit étre saisie")
	}
	
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
				 price_booking:this.room.price_booking,
				type_id:this.types.type_id.id,
				
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
