<template>
<h4 id="title">Réservation</h4>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Les Réservations des chambres</h5>
				<DataTable :value="table1" :paginator="true" class="p-datatable-gridlines" :rows="5" dataKey="id"  
						    responsiveLayout="scroll"
							>
					
					<template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText  placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        No customers found.
                    </template>
                    <Column  header="Client" style="min-width:12rem">
                        <template #body="{data}">
                            {{data.nom}} {{ data.prenom }}
                        </template>
                    </Column>
                    <Column header="Duré"  style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text"> Du  {{data.start }}  Au {{ data.ens }} </span>
                        </template>
                    </Column>
                    <Column header="Chambre"  :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">N°{{ data.numRoom }}  de l'etage N°{{ data.numEtage }} </span>
                        </template>
                    </Column>
						 <Column header="Prix  de réservation"  style="min-width:8rem">
                      <template #body="{data}">
						  {{ data.bookingprice }}
                      </template>
                   </Column>
					<Column  header="Confimation" >
						<template #body="{data}"> 
						  <i class="pi" :class="{'text-green-500 pi-check-circle': data.confirmation=='1' , 'text-pink-500 pi-times-circle': data.confirmation=='0'}"></i>
						</template>
						</Column>
					
                    <Column header="Téléphone du client "   style="min-width:10rem">
                        <template #body="{data}">
							{{ data.telephone }}
                        </template>,
                    </Column>
				</DataTable>
			</div>
		</div>
	</div>
</template>

<script>
	
	
import axios from 'axios';
	export default {
		data() {
			return {
        table1:[],
        reserv:[],
		
       
			}
		},
	
		mounted() {
     
      this.getAllRooms();
		},
		methods: {
     
      
      async getAllRooms(){
		await axios.get('http://localhost:8000/api/All-Bookings-rooms',
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }})
        .then(res=>{
          this.reserv=res.data.bookings;
          for(let i=0; i<this.reserv.length ; i++){
            this.table1.push(this.reserv[i]);
		  }
        })
      },
   
	
	

	 
		}
	}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
<style scoped>

#title{
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 25px;
  font-size: 40px;
}
</style>
