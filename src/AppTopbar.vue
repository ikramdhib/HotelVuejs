<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<span>DELUXE</span>
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
    <Button  class="p-button-text p-button-plain p-button-rounded " >
    <i class="pi pi-bell"  id="icon" >  <Badge v-if=" unreadnotifications.length >0" :value="unreadnotifications.length" severity="danger" class="mr-2"></Badge></i>
	</Button>
   
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
                <a  class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <p class="text-gray-600 text-sm mx-2">
                          <span class="font-bold text-blue-500" href=""  @click="markAsRead">Tout marquer comme lu !</span> 
						
                    </p>
                </a>
            </div>
            <div id="border" class="py-2" v-if="unreadnotificationsRoom!=null">
                <a v-for="(unread , index) in unreadnotificationsRoom" :key="index" href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <p class="text-gray-600 text-sm mx-2">
                        <span class="font-bold" href="#">{{ unread.data.room.nom}} {{ unread.data.prenom }}</span> fait une résérvation sur la chambre <span class="text-900 line-height-3"> {{ unread.data.booking_status.num_room }} </span> l'Etage  <span class="text-900 line-height-3">{{ unread.data.booking_status.numEtage }}</span> de <span class="text-blue-500"> {{ unread.data.room.start}} </span>  à <span class="text-blue-500"> {{ unread.data.room.end}}</span>
						<br/>
						{{ $moment(unread.created_at).locale('fr').fromNow() }}
                    </p>
                </a>
            </div>
			    <div id="border" class="py-2" v-if="unreadnotificationsBook!=null">
                <a v-for="(unread , index) in unreadnotificationsBook" :key="index" href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <p class="text-gray-600 text-sm mx-2">
                        <span class="font-bold" href="#">{{ unread.data.booking.nom}} {{ unread.data.booking.prenom }}</span> fait une résérvation sur {{ unread.data.categorieBooking }} 
						<span class="text-900 line-height-3"> pour  {{ unread.data.booking.nombre}} <span v-if="unread.data.categorieBooking=='Pool' || unread.data.categorieBooking=='Spa'">Personnes</span > <span v-if="unread.data.categorieBooking== 'Salle de conference'"> salle</span> <span v-if="unread.data.categorieBooking=='Roof-Top' || unread.data.categorieBooking=='Restaurant'"> tables </span> </span>
						<br/>
						{{ $moment(unread.created_at).locale('fr').fromNow() }}
                    </p>
                </a>
            </div>
			 <div id="border" class="py-2" v-if="unreadnotificationsRating!=null">
                <a v-for="(unread , index) in unreadnotificationsRating" :key="index" href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <p class="text-gray-600 text-sm mx-2">
                        <span class="font-bold" href="#">{{ unread.data.user.firstname}} {{ unread.data.user.lastname }}</span> a reagie à votre {{ unread.data.rating.ratingable_type.substr(11 )}} 
						<span class="text-900 line-height-3"> de  {{ unread.data.rating.rate}} ETOILE </span>
						<br/>
						{{ $moment(unread.created_at).locale('fr').fromNow() }}
                    </p>
                </a>
            </div>
			 <div id="border" class="py-2" v-if="unreadnotificationsContact!=null">
                <a v-for="(unread , index) in unreadnotificationsContact" :key="index" href="#" class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                    <p class="text-gray-600 text-sm mx-2">
                        <span class="font-bold" href="#">{{ unread.data.contact.name}}</span>  a vous envoyez un message sous l'objet
						<span class="text-900 line-height-3">  " {{ unread.data.contact.objet}} "</span>
						<br/>
						{{ $moment(unread.created_at).locale('fr').fromNow() }}
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
            <router-link id="border" to="notifications"  class="block bg-gray-800 text-white text-center font-bold py-2">Voir tous les notifications</router-link>
        </div>
        </div>
</div>
			</li>
			
			<li>
				<button @click="goCalender()" class="p-link layout-topbar-button">
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
			unreadnotificationsRoom:{},
			unreadnotificationsBook:{},
			unreadnotificationsRating:{},
			unreadnotificationsContact:{},
        }
	},
	mounted(){
		//this.interval= setInterval(function(){
			this.getNotification()
		//}.bind(this), 500);
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
				this.unreadnotificationsRoom=res.data.notifRoom
				this.unreadnotificationsBook=res.data.notifBooking
				this.unreadnotificationsRating=res.data.notifRating,
				this.unreadnotificationsContact=res.data.notifContact
			})
		},

		async markAsRead(){
			await axios.get('http://localhost:8000/api/markasread',{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
			.then((res)=>{
				console.log(res);
				location.reload();
			})
		},
		goCalender(){
			this.$router.push('calendrier')
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
#btn{
	background-color:transparent;
	color:grey;
	border-color: transparent;
	border-radius: 100%;
	margin-left: 40px;
}
#icon{
	font-size: 23px;
}
</style>