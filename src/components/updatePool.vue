'<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Editer Pool:</h4>
				<ul style="list-style-type:none;">
                                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                            </ul>
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
                   
            	      
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="pool.avaibility"/>
				</div>    
         
			</div>
			<div class="field col-10">
						<label for="desc">Description :</label>
						<Textarea id="desc" rows="4" v-model="pool.description"/>
			  </div>
		
    <div class="field col-12 md:col-3 py-4">
			     <Toast />
					<Button label="Ajouter" @click="updatePool()"  ></Button>
		</div>
		<div class="field col-12 md:col-3 py-4">
			<Button label="Annuler" @click="goBack()" class="p-button-secondary mr-2 mb-2" ></Button>
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
				user:0,
				errors:[],
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
     	if(res.data.pool.avaibility==1){
						this.pool.avaibility=true;
					}else{
						this.pool.avaibility=false;
					}
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
				 	if(this.pool.description==""){
				this.errors.push("la description de pool doit étre saisie")
	               }if(this.pool.title==""){
				this.errors.push("le titre de pool doit étre saisie")
	               }if(this.pool.capacite==""){
				this.errors.push("la capacité de pool doit étre saisie")
	               }
				   if(this.pool.prix_reservation==""){
				this.errors.push("le prix de reservation de pool doit étre saisie")
	               }else if(isNaN(this.pool.prix_reservation)){
					 this.errors.push("le prix de reservation de pool doit étre nombre")  
				   }
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
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été modifier avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
					 
					 
			         
					 
			})},
			goBack(){
					this.$router.push('poolTable')
				}}}

</script>