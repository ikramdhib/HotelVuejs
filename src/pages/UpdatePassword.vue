<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Accéder a votre compte</div>
                        <span class="text-600 font-medium">Réinitialiser votre mot de passe</span>
                    </div>
                <form>
                    <div class="w-full md:w-10 mx-auto">
                       <label for="password1" class="block text-900 font-medium text-lg mb-2">Nouveau Mot de passe</label>
                        <Password id="password1" v-model="password" placeholder="Mot de passe" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <label for="password1" class="block text-900 font-medium text-lg mb-2">Confirmer votre Mot de Passe</label>
                        <Password id="password1" v-model="password_confirmation" placeholder="récréer votre mot de passe" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                
                        <div class="flex align-items-lef justify-content-left">
                            <div class="mx-2 w-4 p-2 ">
                           <Button label="Rechercher"  v-on:click="updatepass()"></button></div>
                           <div class=" w-2 p-2">
                           <Button label="Annuler" class="p-button-secondary mr-2 mb-2" to="login"></button></div>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
       return{
           email:"",
           password:"",
           password_confirmation:"",
           token:"",
       }
    },
    methods:{
        async updatepass(){
            console.log(localStorage.getItem('email'))
            console.log("gog",this.$route.query.token)
            console.log("gog",this.password)
            console.log("gog",this.password_confirmation)
          await axios.post('http://localhost:8000/api/user/update-password',
         {
             email:(localStorage.getItem("email")),
             password:this.password,
             password_confirmation:this.password_confirmation,
             token:this.$route.query.token,
              
         } ).then(response=>{
             let res = response.data;
            console.log(res)
            this.$router.push("login")
		})
        },
        
    }
}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>