<template>
<div class="grid p-fluid">
  <div class="col-12 md:col-12">
	<div id="space" class="card">
		<h5>Information Personnelles</h5>
		<div class="text-center mb-5">
                    </div>
			<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="nom">Nom</label>
						<InputText id="nom" type="text" :placeholder="user.firstname" v-model="userInfo.firstname" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="prenom">Prenom</label>
						<InputText id="prenom" type="text" :placeholder="user.lastname"  v-model="userInfo.lastname"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="telephone">Téléphone</label>
						<InputText id="telephone" type="text" :placeholder="user.phone" v-model="userInfo.phone"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="cin">CIN</label>
						<InputText id=cin  type="text" :placeholder="user.cin" v-model="userInfo.cin" disabled />
					</div>
					<div class="field col-12 md:col-6">
						<label for="adresse">Adresse</label>
						<InputText id="adresse" type="text" :placeholder="user.country" v-model="userInfo.country"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="code postal">Code Postal</label>
						<InputText id="code postal" type="text" :placeholder="user.zipcode" v-model="userInfo.zipcode"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="email"> Email</label>
						<InputText id="email" type="text" :placeholder="user.email" v-model="userInfo.email" disabled />
					</div>
					<div class="field col-12 md:col-6">
				<div id="mdp" class="font-medium no-underline ml-2 cursor-pointer" style="color: var(--primary-color)" v-on:click="passModify()" > <a >Vous devez modifier votre mot de passe ?</a></div>
					</div>
          	<div  class="field col-12 md:col-6">
              	<FileUpload mode="basic" id="img" name="demo[]"  :maxFileSize="1000000"  />
					</div>
          	<div class="field col-12 md:col-6">
					</div>
           <div class="field col-12 md:col-4">
					<Button @click="updateProfile()" label="Modifer"></Button>
					</div>
          <div class="field col-12 md:col-4">
            <Toast />
					 <Button id="btn" label="Annuler" class="p-button-secondary mr-2 mb-2" @click="backProfile()"></button>
					</div>
				</div>
			</div>
	</div>
  <div class="col-12 md:col-12">

  <div id="space" class="card" v-if="passIsToModify">
    	<h5 id="title">Changer votre Mot de Passe</h5>
         <form>
                    <div class="w-full md:w-10 mx-auto">
                       <label for="password1" class="block  mb-2">Nouveau Mot de passe</label>
                        <Password id="password1" v-model="password" placeholder="Mot de passe" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <label for="password1" class="block  mb-2">Confirmer votre Mot de Passe</label>
                        <Password id="password1" v-model="password_confirmation" placeholder="récréer votre mot de passe" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                
                        <div class="flex align-items-lef justify-content-left">
                            <div class="mx-2 w-4 p-2 ">
                           <Button label="Rechercher"  v-on:click="updatepass()"></button></div>
                           <div   class=" w-4 p-2">
                           <Button label="Annuler" class="p-button-secondary mr-2 mb-2" @click="backForgetPassword()"></button></div>
                        </div>
                    </div>
                </form>
            </div>
          </div> 
  </div>   
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
          email:"",
           password:"",
           password_confirmation:"",
           token:"",
          passIsToModify:false,
           user:{},
           userInfo:{},
        }
    },
            mounted () {
                if(localStorage.getItem('user')){
                    try{
                        this.user = JSON.parse(localStorage.getItem('user'));
                    }catch(e){
                        localStorage.removeItem('user');
                    }
                }
            },
            methods:{
              passModify(){
                this.passIsToModify=true;
              },
              backProfile(){
                this.$router.push("profile")
              },
                async updateProfile(){
                  console.log("user to update",this.userInfo);
                  if(this.userInfo.firstname){
               await axios.post('http://localhost:8000/api/user/update-profile',{
                  firstname:this.userInfo.firstname,
                  email:this.user.email,
               },
               { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
               }).then((response)=>{
                let res = response.data;
                 localStorage.setItem("user",JSON.stringify(res));
                  this.$router.push("profile")
                  console.log(res)
              })
                  }

                   if(this.userInfo.lastname){
               await axios.post('http://localhost:8000/api/user/update-profile',{
                  lastname:this.userInfo.lastname,
                  email:this.user.email,
               },
               { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
               }).then((response)=>{
                let res = response.data;
                 localStorage.setItem("user",JSON.stringify(res));
                  this.$router.push("profile")
                  console.log(res)
              })
              }

               if(this.userInfo.phone){
               await axios.post('http://localhost:8000/api/user/update-profile',{
                  phone:this.userInfo.phone,
                  email:this.user.email,
               },
               { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
               }).then((response)=>{
                let res = response.data;
                 localStorage.setItem("user",JSON.stringify(res));
                  this.$router.push("profile")
                  console.log(res)
              })
               }
                if(this.userInfo.country){
               await axios.post('http://localhost:8000/api/user/update-profile',{
                  country:this.userInfo.country,
                  email:this.user.email,
               },
               { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
               }).then((response)=>{
                let res = response.data;
                 localStorage.setItem("user",JSON.stringify(res));
                  this.$router.push("profile")
                  console.log(res)
              })
                }
                 if(this.userInfo.zipcode){
               await axios.post('http://localhost:8000/api/user/update-profile',{
                  zipcode:this.userInfo.zipcode,
                  email:this.user.email,
               },
               { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
               }).then((response)=>{
                let res = response.data;
                 localStorage.setItem("user",JSON.stringify(res));
                  this.$router.push("profile")
                  console.log(res)
              })
                 }
                  if(this.userInfo.firstname && this.userInfo.lastname && this.user.phone &&
                  this.userInfo.country && this.userInfo.zipcode){
               await axios.post('http://localhost:8000/api/user/update-profile',{
                  firstname:this.userInfo.firstname,
                  lastname:this.userInfo.lastname,
                  phone:this.userInfo.phone,
                  country:this.userInfo.country,
                  zipcode:this.userInfo.zipcode,
                  email:this.user.email,
               },
               { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
               }).then((response)=>{
                let res = response.data;
                  this.$router.push("profile")
                  console.log(res)
              })
                  }
                   if (!this.userInfo.firstname ){
                    console.log("hi");
			           	this.$toast.add({severity:'error', summary: 'Erreur', detail:'Tous les champs sont vides !', life: 3000});
			
                 }
                },
                 async updatepass(){
            if(this.password_confirmation && this.password){
          await axios.post('http://localhost:8000/api/user/update-password',
         {
             email:this.user.email,
             password:this.password,
             password_confirmation:this.password_confirmation,
             token:localStorage.getItem('token'),
              
         } ).then(response=>{
             let res = response.data;
            console.log(res)
            this.$router.push("login")
	       	}).catch(error=>{
            if(error.response.status==422){
            this.errors="Les deux Mot de Passe ne sont compatible"
            }
        })
        }
        },
            }
            
        
    }

</script>
<style >
.container {
  margin-top:5rem;
  max-width:30%;
}
#btn{
margin-left: 80px;
}

.space-y-4 {
    padding:35px;
}

#img {
  margin:15px ;
}
#space{
  margin-left: 10px;
  max-width: 70%;
}
#mdp{
  margin-top: 35px;
}
#title{
  margin-bottom: 40px;
}
</style>

