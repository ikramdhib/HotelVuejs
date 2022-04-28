<template>
     <div class="col-12">
	    <div class="card">
		
				<h5>Type</h5>
				<div class="p-fluid formgrid grid">
					
             <div class="field col-12 md:col-6">
						<label for="nom">nom_type</label>
					<InputText id="nom" type="text" v-model="type.nom_type"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="prix">prix_type</label>
						<InputText id="prix" type="text" v-model="type.price_Type"/>
					</div>
                     <div class="field col-12 md:col-3">
						<label for="desc">discription</label>
						<Textarea id="desc" rows="4" cols="60" v-model="type.intitule"/>
					</div>
					</div>
					
				<Button label="ajouter" @click="addType()" class="p-button-secondary mr-2 mb-2" />
                            
         
	
	
</div>
</div>
	
</template>
<script>
import axios from 'axios';
export default {
 data() {
            return {
                type: {
					nom_type:"",
					price_Type:0,
					intitule:"",
					
				}
            }
        },
		
        methods: {	
			 async addType() {
			 await axios
			    .post('http://localhost:8000/api/type',{nom_type:this.type.nom_type,
				price_Type:this.type.price_Type,
				intitule:this.type.intitule},
				{ headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					console.log(this.headers);
				     let response = res.data;
					 console.log(response)
			         this.$router.push("TableType")
					 
			})}}}
        </script>