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
				<div v-on:click="isActiv = !isActiv">
    <button
      class="flex bg-white text-sm border-2 p-link layout-topbar-button border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 "
      id="user-menu"
      aria-label="User menu"
      aria-haspopup="true"
	  
    >
    <i class="pi pi-bell"   >  <Badge :value="2" class="mr-2" id="badge"></Badge></i>
	<span>  {{ unreadnotifications.length }} </span>
    </button>
  </div>
    <div v-show="isActiv" class="origin-top-left absolute  mt-2 w-1 rounded-md shadow-lg">
    <div
      class="py-1 w-12 rounded-md bg-white shadow-xs"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
	

        <div id="border" x-show="dropdownOpen" class="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20" style="width:20rem;">
			<div v-show="unreadnotifications.length > 0" class="py-2">
                <a v-for="(unread , index) in unreadnotifications" :key="index" href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <p class="text-gray-600 text-sm mx-2">
                          <span class="font-bold text-blue-500" href="#"  @click="markAsRead">Tout marquer comme lu !</span> 
						
                    </p>
                </a>
            </div>
            <div id="border" class="py-2">
                <a v-for="(unread , index) in unreadnotifications" :key="index" href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <p class="text-gray-600 text-sm mx-2">
                        <span class="font-bold" href="#">{{ unread.data.user_firstname }} {{ unread.data.user_lastname }}</span> fait une {{ unread.data.room }} <span class="font-bold text-blue-500" href="#">Upload Image</span> 
						{{ $moment(unread.created_at).fromNow() }}
                    </p>
                </a>
            </div>
			 <div id="border" v-show="unreadnotifications.length == 0" class="py-2">
                <a href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <p class="text-gray-600 text-sm mx-2">
                        <span class="font-bold" href="#">Pas de nouvelles notifications</span> 
						
                    </p>
                </a>
            </div>
            <a id="border" href="#" class="block bg-gray-800 text-white text-center font-bold py-2">See all notifications</a>
        </div>
        </div>
</div>
			</li>
			
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
    <div id="border" v-show="isActive" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
    <div
	id="border"
      class="py-1 w-12 rounded-md bg-white shadow-xs"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <router-link
	  to="profile"
        href="#"
		id="border"
        class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        role="menuitem"
      > Profile</router-link>
      
      <a
        href="#"
		id="border"
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
			isActiv: false,
			unreadnotifications:{},
        }
	},
	mounted(){
		/*this.interval= setInterval(function(){
			this.getNotification()
		}.bind(this), 500);*/
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
				})
			}
		},

		async getNotification(){
			await axios.get('http://localhost:8000/api/unreadnotifications',{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
			.then(res=>{
				this.unreadnotifications=res.data.notifs
			})
		},

		async markAsRead(){
			await axios.get('http://localhost:8000/api/markasread',{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
			.then((res)=>{
				console.log(res);
				location.reload();
			})
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>
<style scoped>
#badge{
	visibility: initial;
	position: fixed;
	
}
#border{
	border-radius: 0.5rem;
	filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
}
</style>