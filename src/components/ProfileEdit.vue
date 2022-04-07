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
						<InputText id="nom" type="text" :value="user.firstname"  />
					</div>
					<div class="field col-12 md:col-6">
						<label for="prenom">Prenom</label>
						<InputText id="prenom" type="text" :value="user.lastname" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="telephone">Téléphone</label>
						<InputText id="telephone" type="text" :value="user.phone"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="cin">CIN</label>
						<InputText id=cin  type="text" :value="user.cin"  disabled />
					</div>
					<div class="field col-12 md:col-6">
						<label for="adresse">Adresse</label>
						<InputText id="adresse" type="text" :value="user.country"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="code postal">Code Postal</label>
						<InputText id="code postal" type="text" :value="user.zipcode"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="email"> Email</label>
						<InputText id="email" type="text" :value="user.email" disabled />
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
					<Button label="Modifer"></Button>
					</div>
          <div class="field col-12 md:col-4">
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
export default {
    data(){
        return{
          passIsToModify:false,
           user:{},
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
              }
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

