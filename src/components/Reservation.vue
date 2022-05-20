<template>
<h4 id="title">RESERVATIONS</h4>
	<div class="grid">
		<div class="col-12">
      <div class="card">
			<div id="btn" class="field col-12 md:col-12  px-4 py-4">
		  <SelectButton v-model="option" :options="buttons"  />
		  </div>
		  <div v-if="option=='Pool'">
        <h4 class="px-4 py-4">LES RESERVATION POUR LES POOL</h4>
		
    		<DataTable :value="table3" :paginator="true" class="p-datatable-gridlines" :rows="5" dataKey="id"  
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
                    <Column header="Pool"  :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text"> {{ data.catname }} </span>
                        </template>
                    </Column>
						 <Column header="Prix  de réservation"  style="min-width:8rem">
                      <template #body="{data}">
						  {{ data.prix }}
                      </template>
                   </Column>
					<Column  header="des informations  Complimentaire" >
						<template #body="{data}"> 
						 {{ data.infoComplimentaire }}
						</template>
						</Column>
					
                    <Column header="Téléphone du client "   style="min-width:10rem">
                        <template #body="{data}">
							{{ data.phone }}
                        </template>,
                    </Column>
				</DataTable>
				</div>
				<div v-if="option=='Restaurant'">
        <h4 class="px-4 py-4">LES RESERVATIONS DES RESTAURANTS</h4>
		<DataTable :value="table2" :paginator="true" class="p-datatable-gridlines" :rows="5" dataKey="id"  
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
                    <Column header="Restaurant"  :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text"> {{ data.catname }} </span>
                        </template>
                    </Column>
						 <Column header="Prix  de réservation"  style="min-width:8rem">
                      <template #body="{data}">
						  {{ data.prix }}
                      </template>
                   </Column>
					<Column  header="des informations complimentaire" >
						<template #body="{data}"> 
						 {{ data.infoComplimentaire }}
						</template>
						</Column>
					
                    <Column header="Téléphone du client "   style="min-width:10rem">
                        <template #body="{data}">
							{{ data.phone }}
                        </template>,
                    </Column>
				</DataTable>
				</div>
				<div v-if="option=='Spa'">
        <h4 class="px-4 py-4">LES RESERVATION DES SPA</h4>
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
                    <Column header="Spa"  :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text"> {{ data.catname}} </span>
                        </template>
                    </Column>
						 <Column header="Prix  de réservation"  style="min-width:8rem">
                      <template #body="{data}">
						  {{ data.prix }}
                      </template>
                   </Column>
					<Column  header="les informations Complimentaire" >
						<template #body="{data}"> 
						 {{ data.infoComplimentaire }}
						</template>
						</Column>
					
                    <Column header="Téléphone du client "   style="min-width:10rem">
                        <template #body="{data}">
							{{ data.phone }}
                        </template>,
                    </Column>
				</DataTable>
				</div>
				<div v-if="option=='Roof-Top'">
        <h4 class="px-4 py-4">LES RESERVATIONS DES ROOF-TOP</h4>
       		<DataTable :value="table5" :paginator="true" class="p-datatable-gridlines" :rows="5" dataKey="id"  
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
                    
                    <Column header="Roof-Top"  :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text"> {{ data.catname }} </span>
                        </template>
                    </Column>
						 <Column header="Prix  de réservation"  style="min-width:8rem">
                      <template #body="{data}">
						  {{ data.prix }}
                      </template>
                   </Column>
					<Column  header="Les informations Complimentaire" >
						<template #body="{data}"> 
						  {{ data.infoComplimentaire }}
						</template>
						</Column>
					
                    <Column header="Téléphone du client "   style="min-width:10rem">
                        <template #body="{data}">
							{{ data.phone }}
                        </template>,
                    </Column>
				</DataTable>
				</div>
				<div v-if="option=='Salle de conference'">
        <h4 class="px-4 py-4">LES RESERVATION DES SALLE DE CONFERENCE</h4>
        		
          		<DataTable :value="table4" :paginator="true" class="p-datatable-gridlines" :rows="5" dataKey="id"  
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
                   
                    <Column header="Salle de Conference"  :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text"> {{ data.catname }} </span>
                        </template>
                    </Column>
						 <Column header="Prix  de réservation"  style="min-width:8rem">
                      <template #body="{data}">
						  {{ data.prix }}
                      </template>
                   </Column>
					<Column  header="Les informations complimentaire" >
						<template #body="{data}"> 
						  {{ data.infoComplimentaire }}
						</template>
						</Column>
					
                    <Column header="Téléphone du client "   style="min-width:10rem">
                        <template #body="{data}">
							{{ data.phone }}
                        </template>,
                    </Column>
				</DataTable>
				</div>
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
        table2:[],
		table3:[],
		table4:[],
		table5:[],
		table6:[],
      bookings:[],
		buttons : ['Salle de conference','Roof-Top',
						'Pool', 'Spa' , 'Restaurant' ],
		option:'Salle de conference',
			}
		},

		mounted() {
     
	  this.getAllRooms();
	  console.log(this.option);
		},
		methods: {
      
      
      async getAllRooms(){
		await axios.get('http://localhost:8000/api/book',
		{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }})
        .then(res=>{
          this.bookings=res.data.bookings;
          for(let i=0; i<this.bookings.length ; i++){
           if(this.bookings[i].bookingtable_type.substr(11)=='Spa'){
			   this.table1.push(this.bookings[i])
		   }else if(this.bookings[i].bookingtable_type.substr(11)=='Restaurant'){
			   this.table2.push(this.bookings[i])
		   }else if(this.bookings[i].bookingtable_type.substr(11)=='Pool'){
			   this.table3.push(this.bookings[i])
		   }else if(this.bookings[i].bookingtable_type.substr(11)=='ConferenceRoom'){
			   this.table4.push(this.bookings[i])
		   }else if(this.bookings[i].bookingtable_type.substr(11)=='RoofTop'){
			   this.table5.push(this.bookings[i])
		   }
		  }
		  console.log(this.table1);
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
#btn{
margin-left: 10%;
}
</style>
