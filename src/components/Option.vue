<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Option</h5>
				<div class="p-fluid formgrid grid">
		<div class="field col-12 md:col-6">
						<label for="nomop">nom_Option</label>
						<InputText id="nomop" type="text" v-model="option.nom_option" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="prixop">prix_Option</label>
						<InputText id="prixop" type="text" v-model="option.price_option"/>
					</div>
         
      
        <div class="field col-12 md:col-6">
                        
       <span class="text-black-700">Disponibilité</span>           
       <div class="mt-2">
                     
                   
    <label class="inline-flex items-center ml-4">
		
      <input type="radio" class="form-radio"  value="oui" v-model="option.avaibility"/>
      <span class="ml-2">Oui</span>
    </label>
    <label class="inline-flex items-center ml-4">
      <input type="radio" class="form-radio"   value="non" v-model="option.avaibility"/>
      <span class="ml-2">Non</span>
    </label>
    </div>
  
        </div>  </div>
	<Button label="ajouter"   @click="addOption()" class="p-button-secondary mr-2 mb-2"  />
                            
	
</div>	
</div>	
</div>	
</template>
<script>
import axios from 'axios';

export default {
 data() {
            return {
				
            option:  {
             avaibility:"",
			 price_option:0,
             nom_option:"",
			 room_id:0,
					
				}
            }
        },
		
		
			methods:{
	
			 async addOption() {
			
			 await axios
			    .post('http://localhost:8000/api/user/option',
				{avaibility:this.option.avaibility,
                price_option:this.option.price_option,
                nom_option:this.option.nom_option,
	           room_id:localStorage.getItem('room_id'),
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
		
					console.log(this.headers);
				     let response = res.data.data;
					 console.log(response);
					  this.$router.push('image');
			         
					 
			})}}}

</script>