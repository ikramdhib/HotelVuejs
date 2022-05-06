<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4> Editer Option</h4>
				<div class="p-fluid formgrid grid">
		<div class="field col-12 md:col-4">
						<label for="nomop">nom_Option</label>
						<InputText id="nomop" type="text" v-model="option.nom_option" />
					</div>
					<div class="field col-12 md:col-4">
						<label for="prixop">prix_Option</label>
						<InputText id="prixop" type="text" v-model="option.price_option"/>
					</div>
         
      
        <div class="field col-12 md:col-4">
                        
       <span class="text-black-700">Disponibilité</span>           
       <div class="mt-2">
                      <label class="inline-flex items-center ml-4">
		
            	 <input type="radio"  value="oui"  v-model="option.avaibility">
                <span class="ml-2">Oui</span>
                 </label>
               <label class="inline-flex items-center ml-4">
                        	 <input type="radio"  value="non"  v-model="option.avaibility">
                <span class="ml-2">Non</span>
              </label>
  
        </div>  </div></div>
		
	<Button label="modifier" @click="updateOption()" />
    <router-link :to="{ path: 'RoomTable'}"> <Button label="Annuler" class="p-button-secondary "  />
	</router-link>
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
		mounted(){
			 const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/option/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       
       this.option.nom_option=res.data.option.nom_option;
        this.option.price_option=res.data.option.price_option;
         this.option.avaibility=res.data.option.avaibility;
        let room=  this.option.room_id=res.data.option.room_id
      localStorage.setItem("ro",room);
       console.log(res.data);
         
       })},
		
		
			methods:{
	
			 async updateOption() {
				 const id=this.$route.params.id;
			await axios
			    .put('http://localhost:8000/api/option/'+id,
				{avaibility:this.option.avaibility,
                price_option:this.option.price_option,
                nom_option:this.option.nom_option,
	           room_id:(localStorage.getItem('ro')),
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
		
					if(res.data.data){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
			         
					 
			})}}}

</script>