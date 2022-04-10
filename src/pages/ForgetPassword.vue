<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Retrouvez votre compte</div>
                        <span class="text-600 font-medium">Veuillez entrer votre adresse e-mail ou votre numéro de mobile pour rechercher votre compte.</span>
                         <div class="li" v-if="eroor">
                             <InlineMessage>{{ eroor }}</InlineMessage> 
                        </div>
                        <div class="li" v-if="mailerr">
                             <InlineMessage>{{ mailerr }}</InlineMessage> 
                        </div>
                    </div>
                <form>
                    <div class="w-full md:w-10 mx-auto">
                        <InputText id="email1" v-model="email"  type="text" class="w-full mb-3" placeholder="Adresse E-mail" style="padding:1rem;" />
                
                        
                        <div class="flex align-items-lef justify-content-left">
                            <div class="mx-2 w-4 p-2 ">
                           <Button label="Rechercher" class="mr-2 mb-2" v-on:click="forgetpass()"></button></div>
                           <div class="mx-2 w-4 p-2">
                           <Button label="Annuler" class="p-button-secondary mr-2 mb-2" to="login" v-on:click="backLogin()"></button></div>
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
          eroor:"",
          mailerr:"",
       }
    },
    methods:{
        async forgetpass(){
            if(this.email){
          await axios.post('http://localhost:8000/api/user/forget-password',{
             email:this.email
         } ).then(response=>{
             let res = response.data;
             console.log(res);
             localStorage.setItem('email', this.email)
             this.$router.push("done");
             
		}).catch(error=>{
            if(error.response.status){
                this.eroor="Le compte est introuvable"
            }
           
        })}
        if(!this.email){
            this.mailerr="Qelque chose s'est mal passé"
        }
        },
         backLogin(){
        this.$router.push("login")
    }
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
.li{
 margin-top: 15px;
}
</style>
