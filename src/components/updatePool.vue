<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Editer Pool:</h4>
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
                    	<div class="field col-12 md:col-4">
                        
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
					<Button label="Ajouter" @click="updatePool()"  ></Button>
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
        mounted(){
			 const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/pool/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
      this.pool.avaibility=res.data.pool.avaibility,
                this.pool.description=res.data.pool.description,
                this.pool.title=res.data.pool.title,
				this.pool.capacite=res.data.pool.capacite,
				this.pool.prix_reservation=res.data.pool.prix_reservation
			
     
   
       console.log(res.data);
         
       })},
	
		
			methods:{
	
			 async updatePool() {
			   this.user=JSON.parse(localStorage.getItem('user'));
                const id=this.$route.params.id;
			 await axios
			    .put('http://localhost:8000/api/pool/'+id,
				{avaibility:this.pool.avaibility,
                description:this.pool.description,
                title:this.pool.title,
				  capacite:this.pool.capacite,
				  prix_reservation:parseFloat(this.pool.prix_reservation),
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