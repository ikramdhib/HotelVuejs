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
		<h5>Sign Up</h5>
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
						<InputText id=cin type="text"  v-model="users.role" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="adresse">Adresse</label>
						<InputText id="adresse" type="text" v-model="users.country"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="code postal">Code Postal</label>
						<InputText id="code postal" type="text" v-model="users.zipcode"/>
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
				email:"",
				password:""
			}
		}
	},
	methods:{
	async  addUser(){
		 await axios.post("http://localhost:8000/api/user/register",{
				firstname:this.users.firstname,
				lastname:this.users.lastname,
				phone:this.users.phone,
				country:this.users.country,
				zipcode:this.users.zipcode,
				role:this.users.role,
				email:this.users.email,
				password:this.users.password
		}).then((response)=>{
			let res = response.data;
				this.$router.push("login")
				console.log(res)
		})
	}}
}
</script>