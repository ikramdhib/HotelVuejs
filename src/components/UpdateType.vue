<template>
    <div id="card" class="grid">
		<div class="col-9">
	    <div class="card">
		
				
				<ul style="list-style-type:none;">
                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                 </ul><h4> Editer Type</h4>
				<div class="p-fluid formgrid grid">
					
             <div class="field col-12 md:col-3">
						<label for="nom">nom_type</label>
						   <span class="p-float-label" >
					<InputText id="nom" type="text" v-model="type.nom_type"/>
						   </span></div>
				
                     <div class="field col-9">
						<label for="desc">description</label>
						<Textarea id="desc" rows="4" cols="60" v-model="type.intitule"/>
					</div>
					
					 <div class="field col-12 md:col-3 py-4">
						 <Toast/>
					<Button label="Modifier"  @click="update()" ></Button>
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
				user_id:0,
				errors:[],
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
				      this.user=JSON.parse(localStorage.getItem('user'));
				  const id=this.$route.params.id;
				     if(this.type.nom_type==""){
				this.errors.push("le nom de type doit étre remplir")
	               }
				    if(this.type.intitule==""){
				this.errors.push("la description de type doit étre remplir")
	               }
			 await axios
			    .put('http://localhost:8000/api/type/'+id,{nom_type:this.type.nom_type,
				
				intitule:this.type.intitule,user_id:this.user.id,
				},
				{ headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{

					if(res){
						 this.$router.push('TypeTable');
							this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été modifier avec succès', life: 3000});
						     this.$router.push('TypeTable'); 
						}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						} 
			})},
			goBack(){
					this.$router.push('TypeTable')
				}
			}}
        </script>