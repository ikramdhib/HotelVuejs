<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
                        <span class="text-600 font-medium">Connectez-vous pour continuer</span>
                        <div v-if="errors.length > 0">
                            <ul style="list-style-type:none;">
                                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                            </ul>
                        </div>
                         <div class="li" v-if="auth">
                             <InlineMessage>{{ auth }}</InlineMessage> 
                        </div>
                    </div>
                <form>
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="user.email"  type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Mot de passe</label>
                        <Password id="password1" v-model="user.password" placeholder="Mot de passe" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-center mb-5">
                           
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)" ><router-link to="forgetpassword"> Mots de passe oublié?</router-link></a>
                        </div>
                        <Button label="Connecter" class="w-full p-3 text-xl" v-on:click="login()"></button>
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
           user:{
               email:"",
               password:""
           },
           errors:[],
           auth:"",
       }
    },
    methods:{
        async login(){
            if(this.user.email && this.user.password){
          await axios.post('http://localhost:8000/api/user/login',{
             email:this.user.email,
             password:this.user.password
         } ).then(response=>{
             let res = response.data.error;
             if(res=="UnAuthorised Access"){
                 this.auth="Email ou Mot de Passe est incorrect, Ressez! "
             }else{
            localStorage.setItem('token', response.data.token);
			this.profile()
             }
		})
        }
        if(!this.user.password){
            this.errors.push("Les champs Mot de Passe est vide !")
        }
        if(!this.user.email){
            this.errors.push("Le champs Email est vide !")
        }
        },
          async profile(){
            await axios.get('http://localhost:8000/api/user/user-profile',
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        }).then(res=>{
            let response = res.data;
            if(response.role=='admin'){
            localStorage.setItem("user",JSON.stringify(response));
                this.$router.push("/")
                console.log(response)
            }else{
                this.$router.push("notfound")
            }
        })        
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