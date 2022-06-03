<template>
     <div class="col-12">
	    <div class="card">
		
				<h4> Ajouter Type</h4>
				<div class="p-fluid formgrid grid">
					
             <div class="field col-12 md:col-3">
						<label for="nom">nom_type</label>
					<InputText id="nom" type="text" v-model="type.nom_type"/>
					</div>
				
                     <div class="field col-9">
						<label for="desc">description</label>
						<Textarea id="desc" rows="4" cols="60" v-model="type.intitule"/>
					</div>
					</div>
					 <div class="field col-12 md:col-3">
						 <Toast/>
					<Button label="Ajouter"  @click="addType()" ></Button>
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
			
                type: {
					nom_type:"",
					
					intitule:"",
					
				}
            }
        },
		
        methods: {	
			 async addType() {
				  this.user=JSON.parse(localStorage.getItem('user'));
			 await axios
			    .post('http://localhost:8000/api/type',{nom_type:this.type.nom_type,
				intitule:this.type.intitule,
				user_id:this.user.id,},
				{ headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
				
						if(res){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}	this.$router.push('TypeTable');
			       
					 
			})}}}
        </script>