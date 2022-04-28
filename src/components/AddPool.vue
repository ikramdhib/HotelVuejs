<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Ajouter Pool:</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="title">Titre :</label>
						<InputText id="title" type="text" v-model="pool.title" />
					</div>
                      <div class="field col-12 md:col-3">
						<label for="prix">Prix :</label>
					
					<InputText id="prix" type="text" v-model="pool.prix_reservation"/>
					</div>
					   <div class="field col-12 md:col-3">
						<label for="num_etage">capacité:</label>
						<InputText id="num_etage" type="number"  min="1" v-model="pool.capacite"/>
					</div>
                    	<div class="field col-12 md:col-3">
                        
                 <span class="text-black-700">Disponibilité</span>           
                   <div class="mt-2">
						  <label class="inline-flex items-center ml-4">
		
            	 <input type="radio"  value="oui"  v-model="pool.avaibility">
                <span class="ml-2">Oui</span>
                 </label>
               <label class="inline-flex items-center ml-4">
                        	 <input type="radio"  value="non"  v-model="pool.avaibility">
                <span class="ml-2">Non</span>
              </label>
				 
				</div>
			</div>
			<div class="field col-10">
						<label for="desc">Description :</label>
						<Textarea id="desc" rows="4" v-model="pool.description"/>
			</div>
		</div>

					
					
					

					<div class="field col-12 md:col-12">
					
						<FileUpload name="file" url="" ref="file" @upload="onUpload"  :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
					</div>
		
	      <div class="field col-12 md:col-3">
					<Button label="Ajouter" @click="addPool()"  ></Button>
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
            pool:  {
             avaibility:"",
			 description:"",
             prix_reservation:"",
			title:"",
			capacite:0
					
				}
            }
        },
	
		
			methods:{
	
			 async addPool() {
			   this.user=JSON.parse(localStorage.getItem('user'));
			 await axios
			    .post('http://localhost:8000/api/pool',
				{avaibility:this.pool.avaibility,
                description:this.pool.description,
                title:this.pool.title,
				  capacite:this.pool.capacite,
				  prix_reservation:parseFloat(this.pool.prix_reservation),
				user_id:this.user.id,
	          
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					
					
				     let response = res.data.data.id;
			
					 console.log(response);
					 
					 
			         
					 
			})}}}

</script>