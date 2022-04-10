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
				<Button label="modifier" @click="update()" class="p-button-secondary mr-2 mb-2" />
                            
         
	
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
					price_Type:0,
					intitule:"",
					
				}
            }
        },
			mounted(){
			 const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/user/type/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       
       this.type.nom_type=res.data.data.nom_type;
        this.type.price_Type=res.data.data.price_Type;
         this.type.intitule=res.data.data.intitule;
   
       console.log(res.data);
         
       })},
		
        methods: {	
			 async update() {
				  const id=this.$route.params.id;
			 await axios
			    .put('http://localhost:8000/api/user/type/'+id,{nom_type:this.type.nom_type,
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