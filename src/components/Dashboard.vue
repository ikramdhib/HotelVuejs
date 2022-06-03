<template>
	<div class="grid">
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Réservations</span>
						<div class="text-900 font-medium text-xl"> {{ bookings }} </div>
					</div>
					<div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
						<i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
					</div>
				</div>
				<span class="text-500">Somme</span>
			</div>
		</div>
	
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Clients</span>
						<div class="text-900 font-medium text-xl"> {{ users }} </div>
					</div>
					<div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem">
						<i class="pi pi-inbox text-cyan-500 text-xl"></i>
					</div>
				</div>
				<span class="text-500">Somme</span>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-3">
			<div class="card mb-0">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3"> Message de contact </span>
						<div class="text-900 font-medium text-xl"> {{ contacts }} </div>
					</div>
					<div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem">
						<i class="pi pi-comment text-purple-500 text-xl"></i>
					</div>
				</div>
				<span class="text-500">Somme</span>
			</div>
		</div>

	<div class="col-12 xl:col-6">
		<div class="card">
				<h5>SPA &  POOL</h5>
				<Chart type="bar" :data="barData" :options="barOptions" />
		</div>
		<div class="card">
			
				<h5>ROOF-TOP & RESTAURANT</h5>
			<Chart type="line" :data="lineData1" :options="lineOptions" />
		</div>
		<div class="card flex flex-column align-items-center">
				<h5 class="align-self-start">L'Evaluation pour : </h5>
				<Chart type="doughnut" :data="pieData" :options="pieOptions" style="width: 50%" />
			</div>
			<div class="card flex flex-column align-items-center">
				<h5 class="align-self-start">Pie Chart</h5>
				<Chart type="pie" :data="pieDatass" :options="pieOptions" style="width: 50%" />
			</div>
	</div>
	<div class="col-12 xl:col-6">
		<div class="card">
			<h5>CHAMBRE & SALLA DE CONFERENCE</h5>
			<Chart type="line" :data="lineData" :options="lineOptions" />
		</div>
		<div class="card  flex flex-column align-items-center">
			<h5 class="align-self-start">HOTEL </h5>
				<Chart type="polarArea" :data="polarData" :options="polarOptions" style="width: 50%" />
		</div>
		
			<div class="card flex flex-column align-items-center">
				<h5 class="align-self-start">L'Evaluation pour :</h5>
				<Chart type="doughnut" :data="pieDatas" :options="pieOptions" style="width: 50%" />
			</div>
					<div class="card">
			<div class="flex align-items-center justify-content-between mb-4">
				<h5>Récentes Commentaire</h5>
				
			</div>
			
			<ul class="p-0 mx-0 mt-0 mb-4 list-none">
				<li class="flex align-items-center py-2 border-bottom-1 surface-border" v-for="rec in recent" :key="rec">
					<div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
						<i class="pi pi-user text-xl text-blue-500"></i>
					</div>
					<span class="text-900 line-height-3">
						<span class="text-700"> {{ rec.commentaire }} <span class="text-blue-500"> {{ rec.rate }} Etoiles </span></span>
					</span>
				</li>
			</ul>
		
		</div>
		
	</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			products: null,
				pieDatass: {
				labels: ['Réservation ','Réservation des chambres'],
				datasets: [
					{
						data:"",
						backgroundColor: [
							"#5F6A6A",
							"#2E4053 ",
						],
						hoverBackgroundColor: [
							"#5F6A6A",
							"#2E4053 ",
						]
					}
				]
			},
			pieDatas: {
				labels: ['Roof-Top', 'Pool', 'SPA'],
				datasets: [
					{
						data:"",
						backgroundColor: [
							"#A04000",
							"#229954",
							"#884EA0"
						],
						hoverBackgroundColor: [
							"#A04000",
							"#229954",
							"#884EA0"
						]
					}
				]
			},
			pieData: {
				labels: ['Chambres', 'Restaurants', 'Salle de conference'],
				datasets: [
					{
						data:"",
						backgroundColor: [
							"#FF6384",
							"#36A2EB",
							"#FFCE56"
						],
						hoverBackgroundColor: [
							"#FF6384",
							"#36A2EB",
							"#FFCE56"
						]
					}
				]
			},
				polarData: {
				datasets: [{
					data: [],
					backgroundColor: [
						"#FF6384",
						"#4BC0C0",
						"#FFCE56",
						"#E7E9ED",
						"#36A2EB",
						"#FF1AA4"
					],
					label: 'My dataset'
				}],
				labels: [
					"Chambres",
					"Pools",
					"Roof-Tops",
					"Spa",
					"Salle de conference",
					"Restaurants"
				]
			},
			barData: {
				labels: ['Janvier', 'Fervrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Aout' , 'Septembre' , 'Octobre' , 'Novembre' , 'Décembre'],
				datasets: [
					{
						label: 'Réservation des SPA',
						backgroundColor: '#2f4860',
						data: ""
					},
					{
						label: 'Réservation des Pools',
						backgroundColor: '#00bb7e',
						data: ""
					},
					
				]
			},
			
			lineData: {
				labels: ['Janvier', 'Fervrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Aout' , 'Septembre' , 'Octobre' , 'Novembre' , 'Décembre'],
				datasets: [
					{
						label: 'Reservation des chambres',
						data:"",
						fill: false,
						backgroundColor: '#2f4860',
						borderColor: '#2f4860',
						tension: 0.4
					},
					
				
					{
						label: 'Réservation des Salle de conference',
						data:"",
						fill: false,
						backgroundColor: '#00bb7e',
						borderColor: '#00bb7e',
						tension: 0.4
					}
				]
			},
			lineData1: {
				labels: ['Janvier', 'Fervrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Aout' , 'Septembre' , 'Octobre' , 'Novembre' , 'Décembre'],
				datasets: [
					{
						label: 'Reservation des Roof-Top',
						data:"",
						fill: false,
						backgroundColor: '#2f4860',
						borderColor: '#2f4860',
						tension: 0.4
					},
				
					{
						label: 'Réservation des  Restaurants',
						data:"",
						fill: false,
						backgroundColor: '#00bb7e',
						borderColor: '#00bb7e',
						tension: 0.4
					}
				]
			},
			items: [
                {label: 'Add New', icon: 'pi pi-fw pi-plus'},
                {label: 'Remove', icon: 'pi pi-fw pi-minus'}
            ],
			lineOptions: null,
			data:null,
			datas:null,
			datass:null,
			datasss:null,
			datassss:null,
			datasssss:null,
			datac:null,
			users:null,
			contacts:null,
			bookings:null,
			rate1:null,
			rate2:null,
			rate3:null,
			recent:[],
		}
	},
	themeChangeListener: null,

	mounted() {
		this.getall();
		this.getcount();
	this.getbookRoom()
	this.getbookSalle();
	this.getbookspa();
	this.getbookpool();
	this.getbookres();
	this.getbookroof();
	this.getRate1();
	this.getRecent();
		
	},
	methods: {
		getall(){
			axios.get('http://localhost:8000/api/counts').then(res=>{
				this.users=res.data.user
				this.contacts=res.data.contact
				this.bookings=res.data.booking
			})
		},

		getcount(){
			axios.get('http://localhost:8000/api/count').then(res=>{
				this.datac=res.data.data
				this.polarData.datasets[0].data=this.datac
				
			})
		},
			getbookRoom(){
			axios.get('http://localhost:8000/api/charts').then(res=>{
				this.data=res.data.data;
					this.lineData.datasets[0].data=this.data
			})
		},
		getbookSalle(){
			axios.get('http://localhost:8000/api/chartsalle').then(res=>{
				this.datas=res.data.data;
				this.lineData.datasets[1].data=this.datas
			})
		},
			getbookspa(){
			axios.get('http://localhost:8000/api/chartspa').then(res=>{
				this.datass=res.data.data;
				this.barData.datasets[0].data=this.datass
			})
		},
			getbookpool(){
			axios.get('http://localhost:8000/api/chartspool').then(res=>{
				this.datasss=res.data.data;
				this.barData.datasets[1].data=this.datasss
			})
		},
		getbookroof(){
			axios.get('http://localhost:8000/api/chartsroof').then(res=>{
				this.datassss=res.data.data;
				this.lineData1.datasets[0].data=this.datassss
			})
		},
		getbookres(){
			axios.get('http://localhost:8000/api/chartsres').then(res=>{
				this.datasssss=res.data.data;
				this.lineData1.datasets[1].data=this.datasssss
			})
		},
		getRate1(){
			axios.get('http://localhost:8000/api/rate').then(res=>{
				this.rate1=res.data.data1;
				this.rate2=res.data.data2;
				this.rate3=res.data.data3;
				console.log(this.rate1);
				this.pieData.datasets[0].data=this.rate1;
				this.pieDatas.datasets[0].data=this.rate2;
				this.pieDatass.datasets[0].data=this.rate3;
			})
		},
		getRecent(){
			axios.get('http://localhost:8000/api/recent').then(res=>{
				this.recent=res.data.data
				console.log(this.recent);
			})
		}
	}
}
</script>