<template>
	

	<div class="card">
			<div class="flex align-items-center justify-content-between mb-4">
				<h5>Notifications</h5>
				
			</div>
			
			<span class="block text-600 font-medium mb-3">notifications non lues</span>
			<ul class="p-0 mx-0 mt-0 mb-4 list-none" v-if="unreadNotificationRoom.length>0">
				<li class="flex align-items-center py-2 border-bottom-1 surface-border" v-for="n in unreadNotificationRoom" :key="n.id">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-user text-xl text-blue-500"></i>
					</div>
					<span class="text-900 line-height-3">{{ n.data.user_firstname }} {{ n.data.user_lastname }}
						<span class="text-700">fait une reservation sur la chambre <span class="text-900 line-height-3"> {{ n.data.booking_status.num_room }} </span> l'Etage  <span class="text-900 line-height-3">{{ n.data.booking_status.numEtage }}</span> de <span class="text-blue-500"> {{ n.data.room.start}} </span>  à <span class="text-blue-500"> {{ n.data.room.end}}</span><Button icon="pi pi-eye" @click="clickN(n.id) ; markAsRead()" class="p-button-rounded p-button-text mr-2 mb-2" /></span>
					</span>
				</li>
			</ul>
			<ul class="p-0 mx-0 mt-0 mb-4 list-none" v-if="unreadNotificationTag.length >0">
				<li class="flex align-items-center py-2 border-bottom-1 surface-border" v-for="o in unreadNotificationTag" :key="o.id">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-user text-xl text-blue-500"></i>
					</div>
					<span class="text-900 line-height-3">{{ o.data.booking.nom }} {{ o.data.booking.prenom }}
						<span class="text-700">fait une reservation sur {{ o.data.categorieBooking }} pour <span class="text-900 line-height-3" >  {{ o.data.booking.nbPersonne}}  </span><Button icon="pi pi-eye" @click="clickN(o.id) " class="p-button-rounded p-button-text mr-2 mb-2" /></span>
					</span>
				</li>
			</ul>

			<span class="block text-600 font-medium mb-3">Lues notifications </span>
			<ul class="p-0 m-0 list-none" v-if="readNotificationRoom.length >0">
				<li class="flex align-items-center py-2 border-bottom-1 surface-border" v-for="m in readNotificationRoom" :key="m.id">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-user text-xl text-pink-500"></i>
					</div>
					<span class="text-900 line-height-3">{{ m.data.user_firstname }} {{ m.data.user_lastname }}
						<span class="text-700">fait une reservation sur la chambre <span class="text-900 line-height-3"> {{ m.data.booking_status.num_room }} </span> l'Etage  <span class="text-900 line-height-3">{{ m.data.booking_status.numEtage }}</span> de <span class="text-blue-500"> {{ m.data.room.start}} </span>  à <span class="text-blue-500"> {{ m.data.room.end}}</span><Button icon="pi pi-eye" @click="clickN(m.id)" class="p-button-rounded p-button-text mr-2 mb-2" /></span>

					</span>
				</li>
				

			</ul>
			<ul class="p-0 mx-0 mt-0 mb-4 list-none" v-if="readNotificationTag.length > 0">
				<li class="flex align-items-center py-2 border-bottom-1 surface-border" v-for="p in readNotificationTag" :key="p.id">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-user text-xl text-pink-500"></i>
					</div>
					<span class="text-900 line-height-3">{{ p.data.booking.nom }} {{ p.data.booking.prenom }}
						<span class="text-700">fait une reservation sur {{p.data.categorieBooking }} <span class="text-900 line-height-3">pour  {{ p.data.booking.nbPersonne}} <span v-if="p.data.categorieBooking=='Pool' || p.data.categorieBooking=='Spa'">Personnes</span > <span v-if="p.data.categorieBooking== 'Salle de conference'"> salle</span> <span v-if="p.data.categorieBooking=='Roof-Top' || p.data.categorieBooking=='Restaurant'"> tables </span> </span><Button icon="pi pi-eye" @click="clickN(p.id) ; markAsRead()" class="p-button-rounded p-button-text mr-2 mb-2" /></span>
					</span>
				</li>
			</ul>
			
		</div>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return{
			unreadNotificationRoom:[],
			unreadNotificationTag:[],
			readNotificationRoom:[],
			readNotificationTag:[],
		}
	},

	mounted (){
		this.getNotification();
		console.log("1",this.unreadNotificationTag);
		console.log("2",this.unreadNotificationRoom);
		console.log("3",this.readNotificationTag);
		console.log("4",this.readNotificationRoom);

	},

	methods :{

		async getNotification(){
		axios.get('http://localhost:8000/api/Notifications',
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
		).then(response=>{
			for(let i=0 ; i< response.data.readedNotifications1.length ; i++){
				this.readNotificationRoom.push(response.data.readedNotifications1[i])
			}
			for(let i=0 ; i< response.data.readedNotifications2.length ; i++){
				this.readNotificationTag.push(response.data.readedNotifications2[i])
			}
			for(let i=0 ; i< response.data.unreadNOtification2.length ; i++){
				this.unreadNotificationRoom.push(response.data.unreadNOtification2[i])
			}
			for(let i=0 ; i< response.data.unreadNOtification1.length ; i++){
				this.unreadNotificationTag.push(response.data.unreadNOtification1[i])
			}
		})
		},
		clickN(id){
			this.$router.push({name:'notification' , params:{id:id}})
		},
			async markAsRead(){
			await axios.get('http://localhost:8000/api/markasread',{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}})
			.then((res)=>{
				console.log(res);
				location.reload();
			})
		},
	}
}
</script>