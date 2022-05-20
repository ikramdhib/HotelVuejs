<template>
	<div class="card">
			<div class="flex align-items-center justify-content-between mb-4">
				<h5>Notifications   </h5>
			</div>
			<div class="p-fluid formgrid grid" v-for="n in notife" :key="n">
				<table v-if="(n.type.substr(18,23))=='BookingRoomNotification'">
					<tr>
						<td :style="{width: '150px'}">
						<span class="flex align-items-center py-2surface-border" >
						 <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-user text-xl text-pink-500"></i>
					 </div>
					 <span class="text-900 line-height-3">{{ n.data.room.nom }} {{ n.data.room.prenom }} </span>
						</span>
					 </td>
					
					<td>
						<span class="text-700">fait une reservation sur la chambre <span class="text-900 line-height-3"> {{ n.data.booking_status.num_room }} </span> l'Etage  <span class="text-900 line-height-3">{{ n.data.booking_status.numEtage }}</span> de <span class="text-blue-500"> {{ n.data.room.start}} </span>  à <span class="text-blue-500"> {{ n.data.room.end}}</span></span>
					 </td>
					</tr>
					<tr>
						<td> LE CHAMBRE DE VOTRE HOTEL :</td>
						<td>
							<table>
								<tr>
						<td>
						<span> Nombre d'adult </span>
						</td>
						<td>
						<span>{{ n.data.booking_status.nbAdult }} Adults </span>
						</td>
					</tr>
						<tr>
						<td> 
							<span>Nombre d'enfant</span>
							</td>
						<td> 
							  <span class="text-900 line-height-3">{{ n.data.booking_status.nbEnfant }} enfants</span>
					  </td>
					  </tr>
					  <tr>
						<td> 
						<span>Nombre de Bébé</span>
							</td>
						<td> 
						  <span class="text-900 line-height-3">{{ n.data.booking_status.nbbebe }} Bébé</span>
					  </td>
					  </tr>
					  <tr>
						<td> 
						<span>c'est un </span>
							</td>
						<td> 
						  <span class="text-900 line-height-3">{{ n.data.booking_status.type}}</span>
					  </td>
					  </tr>
					   <tr>
						<td> 
						<span>Le prix de la chambre  </span>
							</td>
						<td> 
						  <span class="text-900 line-height-3">{{ n.data.booking_status.price }}</span>
					  </td>
					  </tr>
					   <tr>
						<td> 
						<span>Le prix de booking :  </span>
							</td>
						<td> 
						  <span class="text-900 line-height-3">{{ n.data.room.bookingprice}} DT</span>
					  </td>
					  </tr>
					  <tr v-if="n.data.offre_pourcentage!=null">
						<td > 
						<span> L'Offre :  </span>
							</td>
						<td> 
						  <span class="text-900 line-height-3">{{ n.data.booking_status.offre_nom}} de {{ n.data.booking_status.offre_pourcentage}} % </span>
					  </td>
					  </tr>
						</table>
			</td>
			</tr>
			<tr>
				<td>************</td><td>*****************</td>
			</tr>

			<tr>
				<td>
					VOTRE CLIENT :
				</td>
				<td>
					<table>
						<tr>
							<td>{{ n.data.room.nom }} {{ n.data.room.prenom }} </td>
						</tr>
						<tr>
							<td>{{ n.data.room.email }}</td>
						</tr>
						<tr>
							<td> DE :</td>
							<td>{{ n.data.room.pay_residence }}</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td></td><td></td><td>
					<Toast/>
					<Button label="Confirmer" @click="updateConfirmation(n.data.booking_id)" class="mr-2 mb-2"/></td>
			</tr>
				</table>
				<table v-if="(n.type.substr(18,19))=='BookingNotification'">
					<tr>
						<td :style="{width: '150px'}">
						<span class="flex align-items-center py-2surface-border" >
						 <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-user text-xl text-pink-500"></i>
					 </div>
					 <span class="text-900 line-height-3">{{ n.data.booking.nom }} {{ n.data.booking.prenom }} </span>
						</span>
					 </td>
					
					<td>
						<span class="text-700">fait une reservation sur {{ n.data.categorieBooking }} <span class="text-900 line-height-3"> pour {{ n.data.booking.nombre }}_  </span>      
						<span v-if="n.data.categorieBooking=='Pool' || n.data.categorieBooking=='Spa'">Personnes</span > <span v-if="n.data.categorieBooking== 'Salle de conference'"> salle</span> <span v-if="n.data.categorieBooking=='Roof-Top' || n.data.categorieBooking=='Restaurant'"> tables </span> </span>
					 </td>
					</tr>
					<tr>
						<td> LE {{ n.data.categorieBooking }} :</td>
						<td>
							<table>
								<tr>
						<td>
						<span> Capacité </span>
						</td>
						<td>
						<span>{{ n.data.objet.capacite }} Adults </span>
						</td>
					</tr>
					   <tr>
						<td> 
						<span>Le prix   </span>
							</td>
						<td> 
						  <span class="text-900 line-height-3">{{ n.data.objet.prix }}</span>
					  </td>
					  </tr>
					   <tr>
						<td> 
						<span>Le prix de booking :  </span>
							</td>
						<td> 
						  <span class="text-900 line-height-3">{{ n.data.booking.prix}}DT</span>
					  </td>
					  </tr>
					  <tr v-if="n.data.objet.offres!=null">
						<td > 
						<span> L'Offre :  </span>
							</td>
						<td > 
							<div v-for="offre in n.data.objet.offres" :key="offre">
						  <span class="text-900 line-height-3">{{ offre.titre}} de {{ offre.pourcentage}} % </span>
							</div>
					  </td>
					  </tr>
						</table>
			</td>
			</tr>
			<tr>
				<td>************</td><td>*****************</td>
			</tr>

			<tr>
				<td>
					VOTRE CLIENT :
				</td>
				<td>
					<table>
						<tr>
							<td>{{ n.data.booking.nom }} {{ n.data.booking.prenom }} </td>
						</tr>
						<tr>
							<td>{{ n.data.booking.email }}</td>
						</tr>
						<tr>
							<td>{{ n.data.booking.phone }}</td>
						</tr>
					</table>
				</td>
			</tr>
			
				</table>
			</div>
	

			
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return{
		notife:[],	
		}
	},

	mounted (){
		this.getNotification();
		console.log("nnn",this.notife);
	},

	methods :{
	async getNotification(){
			const id=this.$route.params.id;
		await	axios.get('http://localhost:8000/api/get/'+id,
			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
			).then(res=>{
					for(let i=0 ; i <res.data.notif.length ; i++){
						this.notife.push(res.data.notif[i]);
					}

			})
		},

		async updateConfirmation(id){
			axios.put('http://localhost:8000/api/updatebooking/'+id,
			{
				confirmation:true
			},
			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
			).then(res=>{
				if(res.data.updated==true){
					this.$toast.add({severity:'success', summary: 'Excellent', detail:'Cette reservation est confirmé', life: 3000});
					}else{
					this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
					}
			})
		}
	}
}
</script>