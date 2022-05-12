<template>
	

	<div class="card">
			<div class="flex align-items-center justify-content-between mb-4">
				<h5>Notifications</h5>
				<div>
					<Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu1.toggle($event)"></Button>
					<Menu ref="menu1" :popup="true" :model="items"></Menu>
				</div>
			</div>
			
			<span class="block text-600 font-medium mb-3">notifications non lues</span>
			<ul class="p-0 mx-0 mt-0 mb-4 list-none">
				<li class="flex align-items-center py-2 border-bottom-1 surface-border" v-for="n in unreadNotification" :key="n.id">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-user text-xl text-blue-500"></i>
					</div>
					<span class="text-900 line-height-3">{{ n.data.user_firstname }} {{ n.data.user_lastname }}
						<span class="text-700">fait une reservation sur la chambre <span class="text-900 line-height-3"> {{ n.data.booking_status.num_room }} </span> l'Etage  <span class="text-900 line-height-3">{{ n.data.booking_status.numEtage }}</span> de <span class="text-blue-500"> {{ n.data.room.start}} </span>  à <span class="text-blue-500"> {{ n.data.room.end}}</span></span>
					</span>
				</li>
			</ul>

			<span class="block text-600 font-medium mb-3">Lues notifications </span>
			<ul class="p-0 m-0 list-none">
				<li class="flex align-items-center py-2 border-bottom-1 surface-border" v-for="m in readNotification" :key="m.id">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-user text-xl text-pink-500"></i>
					</div>
					<span class="text-900 line-height-3">{{ m.data.user_firstname }} {{ m.data.user_lastname }}
						<span class="text-700">fait une reservation sur la chambre <span class="text-900 line-height-3"> {{ m.data.booking_status.num_room }} </span> l'Etage  <span class="text-900 line-height-3">{{ m.data.booking_status.numEtage }}</span> de <span class="text-blue-500"> {{ m.data.room.start}} </span>  à <span class="text-blue-500"> {{ m.data.room.end}}</span></span>
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
			unreadNotification:[],
			readNotification:[],
		}
	},

	mounted (){
		this.getNotification();
	},

	methods :{

		async getNotification(){
			await axios.get('http://localhost:8000/api/notifications',
			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
			).then(res=>{
				if(res){ 
					this.unreadNotification=res.data.unreadNOtification;
					this.readNotification=res.data.readedNotifications;
				}
			})
		}
		
	}
}
</script>