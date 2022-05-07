<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Editer Spa:</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="title">Titre :</label>
						<InputText id="title" type="text" v-model="spa.title" />
					</div>
                      <div class="field col-12 md:col-3">
						<label for="prix">Prix :</label>
						<InputText id="prix" type="text" v-model="spa.prix_reservation"/>
					</div>
					   <div class="field col-12 md:col-3">
						<label for="num_etage">capacité:</label>
						<InputText id="num_etage" type="number"  min="1" v-model="spa.capacite"/>
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
						<Textarea id="desc" rows="4" v-model="spa.description"/>
			</div>
		</div>
					<div class="field col-12 md:col-6">
						<label for="prix4">Choisir des image :</label>
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText  type="file" multiple @change="changeFile"/>
						</span>
					</div>
		
	      <div class="field col-12 md:col-3">
					<Button label="Ajouter" @click="updateSpa()"  ></Button>
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
        mounted(){
			 const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/spa/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
      this.spa.avaibility=res.data.spa.avaibility,
                this.spa.description=res.data.spa.description,
                this.spa.title=res.data.spa.title,
				this.spa.capacite=res.data.spa.capacite,
				this.spa.prix_reservation=res.data.spa.prix_reservation
			localStorage.set("id",res.data.spa.id);
     
   
       console.log(res.data);
         
       })},
	     
        
        
	
	
		
			methods:{
	
			 async updateSpa() {
			   this.user=JSON.parse(localStorage.getItem('user'));
                const id=this.$route.params.id;
			 await axios
			    .put('http://localhost:8000/api/spa/'+id,
				{avaibility:this.spa.avaibility,
                description:this.spa.description,
                title:this.spa.title,
				  capacite:this.spa.capacite,
				  prix_reservation:parseFloat(this.spa.prix_reservation),
				user_id:this.user.id,
	          
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
					if(res){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					 
					 
			         
					 
			})}}}

</script>