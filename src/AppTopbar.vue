<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<span>SAKAI</span>
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-calendar"></i>
					<span>Events</span>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button" v-on:click="logout()">
					<i class="pi pi-fw pi-sign-out"></i>
					<span>Quitter</span>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-user"></i>
					<span>Profile</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios';
export default {

    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		topbarImage() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		},
		logg(){
			if(localStorage.getItem('token')){
				localStorage.removeItem('token');
				this.$router.push("login");
				console.log("hh",localStorage.getItem('token'))
			}
		},

	    async logout(){
			if(localStorage.getItem('token')){
			await axios.get('http://localhost:8000/api/user/logout',
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
				.then(Response=>{
					localStorage.removeItem('token')
					localStorage.removeItem('user')
					this.$router.push("login")
					
					console.log(Response) 
				}).catch(e=>{
					console.warn(e)
				})
			}
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>