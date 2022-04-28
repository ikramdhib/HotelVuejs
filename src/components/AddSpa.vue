<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Ajouter Spa:</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="titre">Titre :</label>
						<InputText id="titre" type="text" v-model="spa.title"/>
					</div>
                         <div class="field col-12 md:col-3">
						<label for="prix">Prix :</label>
						<InputText id="prix" type="text" v-model="spa.prix_reservation"/>
					</div>
					   <div class="field col-12 md:col-3">
						<label for="capacite">Capacité :</label>
						<InputText id="capacite" type="number"  min="1"  v-model="spa.capacite"/>
					</div>
                    	<div class="field col-12 md:col-3">
                        
                       <span class="text-black-700">Disponibilité</span>           
                   <div class="mt-2">
						  <label class="inline-flex items-center ml-4">
		
            	 <input type="radio"  value="oui"  v-model="spa.avaibility">
                <span class="ml-2">Oui</span>
                 </label>
               <label class="inline-flex items-center ml-4">
                        	 <input type="radio"  value="non"  v-model="spa.avaibility">
                <span class="ml-2">Non</span>
              </label>
				 
				</div></div>
			                <div class="field col-10">
						<label for="desc">Description :</label>
						<Textarea id="desc" rows="4"  v-model="spa.description"/>
			           </div>
		                </div>
					<div class="field col-12 md:col-12">
					
						<FileUpload name="file" url="" ref="file" @upload="onUpload"  :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
					</div>
		
	      <div class="field col-12 md:col-3">
					<Button label="Ajouter" @click="addSpa()" ></Button>
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
				user:0,
            spa:  {
             avaibility:"",
			 description:"",
             prix_reservation:"",
			title:"",
			capacite:0
					
				}
            }
        },
		
			methods:{
	
			 async addSpa() {
			   this.user=JSON.parse(localStorage.getItem('user'));
			 await axios
			    .post('http://localhost:8000/api/spa',
				{avaibility:this.spa.avaibility,
                description:this.spa.description,
                title:this.spa.title,
				capacite:this.spa.capacite,
				prix_reservation:parseFloat(this.spa.prix_reservation),
				user_id:this.user.id,
	          
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
		
					console.log(this.headers);
				     let response = res.data.data;
					 console.log(response);
				
			            
					 
			         
					 
			})}}}

</script>