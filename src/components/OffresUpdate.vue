<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Modifier L' Offres :  {{ offre.titre }}</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-4">
						<label for="num_etage">Titre d'Offre :</label>
						<InputText id="num_etage" type="text" v-model="offre.titre"  />
					</div>
					<div class="field col-12 md:col-4">
						<label for="num-ch">Pourcentage :</label>
						<InputText id="num-ch" type="number" v-model="offre.pourcentage" />
					</div>
						<div class="field col-12 md:col-4">
                        
              <span class="text-black-700">Disponibilité :</span>           
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="offre.disponibilite" />
				</div>
			</div>
			        <div class="field col-6">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4" v-model="offre.description" />
						</div>
					</div>
			  <div class="p-fluid formgrid grid">
	      <div class="field col-12 md:col-3 py-4">
			   <Toast />
			<Button label="Modifier" @click="updateOffre()"></Button>
		</div>
			</div>
		</div>
		</div>
			</div>
</template>

<script>
import axios from 'axios'

	export default {
		data() {
			return {
				offre:{
					titre:"",
					pourcentage:"",
					disponibilite:true,
					description:"",
				},
				
				
		}
          
		
			},
			mounted(){
			this.getOffre();
			},

			methods :{
				getOffre(){
					const id=this.$route.params.id;
					axios.get('http://localhost:8000/api/getoffre/'+id).then(res=>{
						if(res){
							this.offre.titre=res.data.offre.titre
							this.offre.pourcentage=res.data.offre.pourcentage
								if(res.data.offre.disponibilite==1){
								this.offre.disponibilite=true;
								}else{
									this.offre.disponibilite=false;
								}
							this.offre.description=res.data.offre.description
						}
					})
				},
				updateOffre(){
					const id=this.$route.params.id;
					axios.put('http://localhost:8000/api/updateoffre/'+id,
					{
						titre:this.offre.titre,
						description:this.offre.description,
						disponibilite:this.offre.disponibilite,
						pourcentage:this.offre.pourcentage
					},
					{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
					).then(res=>{
						if(res.data.update){
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
									
						}
						
					})
				}
			}

	}
</script>

<style scoped>
#titre{
margin-bottom: 30px;
margin-top: 15px;
}
#switcher{
	margin-top: 105px;
}
#btn{
	background-color:transparent;
	color:grey;
	border-color: transparent;
	border-radius: 100%;
	margin-top: 20px;
	margin-left: 40px;
}
</style>
