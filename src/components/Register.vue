<template>
<from>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
		<div class="col-6">
			<div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
                        <span class="text-600 font-medium">S'inscrire maintenant</span>
                    </div>
			<div class="card">
		<h5>S'inscrire</h5>
		<div class="text-center mb-5">
                        <div v-if="errors.length > 0">
                            <ul style="list-style-type:none;">
                                <li class="li" style="color:red" v-for="error in errors" :key="error"><InlineMessage>{{ error }}</InlineMessage> </li>
                            </ul>
                        </div>
                    </div>
			<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="nom">Nom</label>
						<InputText id="nom" type="text" v-model="users.firstname" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="prenom">Prenom</label>
						<InputText id="prenom" type="text" v-model="users.lastname"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="telephone">Téléphone</label>
						<InputText id="telephone" type="text" v-model="users.phone" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="cin">CIN</label>
						<InputText id=cin type="text"  v-model="users.cin" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="adresse">Adresse</label>
						<InputText id="adresse" type="text" v-model="users.country"/>
					</div>
					<div class="field col-12 md:col-6">
<<<<<<< HEAD

						<label for="code postal">Code Postal</label>
						<InputText id="code postal" type="text" v-model="users.zipcode"/>

						

=======
						<label for="code postal">Code Postal</label>
						<InputText id="code postal" type="text" v-model="users.zipcode"/>
>>>>>>> f95760132f8b49e31385963c2e26ad0b8bd4de2e
					</div>
					<div class="field col-12 md:col-6">
						<label for="email"> Email</label>
						<InputText id="email" type="text" v-model="users.email"/>
					</div>
					<div class="field col-12 md:col-6">
					<label for="mdp"> Mot de Passe</label>
                        <Password id="password1" v-model="users.password" :toggleMask="true" ></Password>
					</div>
                    <div class="field col-12 md:col-4">
					<Button label="Submit" v-on:click="addUser()"></Button>
					</div>
				</div>
			</div>
	</div>
		</div>
</div>
</from>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return {
			users:{
				firstname:"",
				lastname:"",
				phone:"",
				country:"",
				zipcode:"",
				role:"",
				cin:"",
				img:"",
				email:"",
				password:""
			},
			errors:[],
		}
	},
	methods:{
	async  addUser(){
		if(this.users.firstname && this.users.lastname && this.users.phone && this.users.country &&
		this.users.zipcode && this.users.cin && this.users.password && this.users.email){
		 await axios.post("http://localhost:8000/api/user/register",{
				firstname:this.users.firstname,
				lastname:this.users.lastname,
				phone:this.users.phone,
				country:this.users.country,
				zipcode:this.users.zipcode,
				role:"admin",
				img:"layout/images/image.png",
				cin:this.users.cin,
				email:this.users.email,
				password:this.users.password
		}).then((response)=>{
			let res = response.data;
				this.$router.push("login")
				console.log(res)
		})
		}
	if(!this.users.lastname){
		this.errors.push("Le Nom est requis")
	}if(!this.users.firstname){
		this.errors.push("Le Prénom est requis")
	}if(!this.users.password){
		this.errors.push("Le Mot de passe est requis")
	}if(!this.users.phone){
		this.errors.push("Le Téléphone est requis")
	}if(!this.users.country){
		this.errors.push("L'Adresse est requis")
	}if(!this.users.zipcode){
		this.errors.push("Le Code Postal est requis")
	}if(!this.users.email){
		this.errors.push("L'Email est requis")
	}
	if(!this.users.cin){
		this.errors.push("La Carte d'Identité  est requis")
	}
	}
	}
}
</script>
<style scoped>
.li{
 margin-top: 15px;
}
</style>