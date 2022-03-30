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
				<div class="ml-3 relative">
  <div v-on:click="isActive = !isActive">
    <button
      class="flex bg-white text-sm border-2 p-link layout-topbar-button border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
      id="user-menu"
      aria-label="User menu"
      aria-haspopup="true"
    >
    <i class="pi pi-user"></i>
    </button>
  </div>
    <div v-show="isActive" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
    <div
      class="py-1 w-12 rounded-md bg-white shadow-xs"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <router-link
	  to="profile"
        href="#"
        class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        role="menuitem"
      > Profile</router-link>
      
      <a
        href="#"
        class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        role="menuitem"
		v-on:click="logout()"
      >Quiter</a>
    </div>
  </div>
</div>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios';
export default {
data: function () {
        return {
            isActive: false,
        }
    },
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