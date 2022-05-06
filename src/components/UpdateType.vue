<template>
     <div class="col-12">
	    <div class="card">
		
				<h4> Editer Type</h4>
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
					<Button label="Modifier"  @click="update()" ></Button>
		
	</div>
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
				
					intitule:"",
					
				}
            }
        },
			mounted(){
			 const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/type/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       
       this.type.nom_type=res.data.type.nom_type;
        
         this.type.intitule=res.data.type.intitule;
   
       console.log(res.data);
         
       })},
		
        methods: {	
			 async update() {
				  const id=this.$route.params.id;
			 await axios
			    .put('http://localhost:8000/api/type/'+id,{nom_type:this.type.nom_type,
				
				intitule:this.type.intitule},
				{ headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{

					if(res){
						 this.$router.push('TypeTable');
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						}
			})}}}
        </script>