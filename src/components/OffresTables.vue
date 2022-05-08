<template>
<h4 id="title">OFFRES</h4>
	<div class="grid">
		<div class="col-12">
      <div class="card">
			<div id="btn" class="field col-12 md:col-12  px-4 py-4">
		  <SelectButton v-model="option" :options="buttons"  />
		  </div>
		  <div v-if="option=='Salle de conference'">
        <h4 class="px-4 py-4">LES OFFRES POUR LES SALLES DE CONFERENCE</h4>
		
        <DataTable :value="table1" v-model:expandedRows="expandedRows1" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="mb-2" />
						</div>
					</template>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column  header="Description" >
						<template #body="{data}">
							{{data.description}}
						</template>
					</Column>
					
					<Column  header="Décoration" >
						<template #body="{data}">
							{{data.decoration}}
						</template>
					</Column>
					<Column  header="Prix de résérvation" >
						<template #body="{data}">
 							{{ data.prix}} DT
						</template>
					</Column>
					<template  #expansion="{data}">
						<div class="p-3">
							<h5> Les Offres</h5>
							<DataTable :value="data.offres" responsiveLayout="scroll" >
								
								<Column  header="Titre"  >
								
									<template #body="{data}">
										{{data.titre}}
									</template>
								</Column>
								<Column  header="Description" headerStyle="width: 14rem">
									<template #body="{data}">
										{{data.description}}
									</template>
								</Column>
								<Column  header="Pourcentage" >
									<template #body="{data}">
										{{data.pourcentage}}%
									</template>
								</Column>
								<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
									</template>
								</Column>
								<Column  header="" >
									<template #body="{data}" >
			               	<Button @click="goUpdateType(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
								
								<Column headerStyle="width:4rem">
									<template #body="{data}">
										<Toast/>
									<Button :value="data.id"  @click="openConfirmation"  icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
                              <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Are you sure you want to proceed?</span>
                                  </div>
                                  <template #footer>
                                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                                    <Button label="Yes" icon="pi pi-check" @click="deleted(data.id);closeConfirmation();" class="p-button-text" autofocus />
                                  </template>
                                </Dialog>
									</template>
								</Column>
							</DataTable>
              </div>
					</template>
				</DataTable>
				</div>
				<div v-if="option=='Restaurant'">
        <h4 class="px-4 py-4">LES OFFRES POUR LES RESTAURANTS</h4>
        <DataTable :value="table2" v-model:expandedRows="expandedRows2" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll2" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll2" class="mb-2" />
						</div>
					</template>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column  header="Nom" >
						<template #body="{data}">
							{{data.nom}}
						</template>
					</Column>
					<Column  header="Description" >
						<template #body="{data}">
							{{data.description}}
						</template>
					</Column>
					
					<Column  header="Capacité" >
						<template #body="{data}">
							{{data.capacite}} Personne
						</template>
					</Column>
					<Column  header="Nombre des tables" >
						<template #body="{data}">
 						{{ data.nbtable}} Tables
						</template>
					</Column>
					<Column  header="Prix de résérvation" >
						<template #body="{data}">
 						{{ data.prix_reservation}} DT
						</template>
					</Column>
					<Column  header="" >
						<template #body="{data}">
 						{{ data.prix_reservation}} DT
						</template>
					</Column>
					<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
									</template>
								</Column>
					<template  #expansion="{data}">
						<div class="p-3">
							<h5> Les Offres</h5>
					<DataTable :value="data.offres" responsiveLayout="scroll" >
								
								<Column  header="Titre"  >
								
									<template #body="{data}">
										{{data.titre}}
									</template>
								</Column>
								<Column  header="Description" headerStyle="width: 14rem">
									<template #body="{data}">
										{{data.description}}
									</template>
								</Column>
								<Column  header="Pourcentage" >
									<template #body="{data}">
										{{data.pourcentage}}%
									</template>
								</Column>
								<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
									</template>
								</Column>
								<Column  header="" >
									<template #body="{data}" >
			               	<Button @click="goUpdateOffres(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
								
								<Column headerStyle="width:4rem">
									<template #body="{data}">
		                      			<Toast/>
									<Button :value="data.id"  @click="openConfirmation"  icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
                              <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Are you sure you want to proceed?</span>
                                  </div>
                                  <template #footer>
                                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                                    <Button label="Yes" icon="pi pi-check" @click="deleted(data.id);closeConfirmation();" class="p-button-text" autofocus />
                                  </template>
                                </Dialog>
									
									</template>
								</Column>
							</DataTable>
              </div>
					</template>
				</DataTable>
				</div>
				<div v-if="option=='Chambre'">
        <h4 class="px-4 py-4">LES OFFRES POUR LES CHAMBRES</h4>
        <DataTable :value="table3" v-model:expandedRows="expandedRows3" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll3" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll3" class="mb-2" />
						</div>
					</template>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column  header="Description" >
						<template #body="{data}">
							{{data.description}}
						</template>
					</Column>
					<Column  header="Nombre adult" >
						<template #body="{data}">
							{{data.nbAdult}} Adult
						</template>
					</Column>
					
					<Column  header="Nombre d'enfants" >
						<template #body="{data}">
							{{data.nbEnfant}} Enfant
						</template>
					</Column>
					<Column  header="Nombre de Bébé" >
						<template #body="{data}">
 						{{ data.nbbebe}} Tables
						</template>
					</Column>
					<Column  header="" >
						<template #body="{data}">
 						{{ data.prix_reservation}} DT
						</template>
					</Column>
					<Column  header="Numro du chambre" >
						<template #body="{data}">
 						{{ data.num_room}} DT
						</template>
					</Column>
					<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.avaibility=='1' , 'text-pink-500 pi-times-circle': data.avaibility=='0'}"></i>
									</template>
								</Column>
					<template  #expansion="{data}">
						<div class="p-3">
							<h5> Les Offres</h5>
					<DataTable :value="data.offres" responsiveLayout="scroll" >
								
								<Column  header="Titre"  >
								
									<template #body="{data}">
										{{data.titre}}
									</template>
								</Column>
								<Column  header="Description" headerStyle="width: 14rem">
									<template #body="{data}">
										{{data.description}}
									</template>
								</Column>
								<Column  header="Pourcentage" >
									<template #body="{data}">
										{{data.pourcentage}}%
									</template>
								</Column>
								<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
									</template>
								</Column>
								<Column  header="" >
									<template #body="{data}" >
			               	<Button @click="goUpdateOffres(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
								
								<Column headerStyle="width:4rem">
									<template #body="{data}">
		                      			<Toast/>
									<Button :value="data.id"  @click="openConfirmation"  icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
                              <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Are you sure you want to proceed?</span>
                                  </div>
                                  <template #footer>
                                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                                    <Button label="Yes" icon="pi pi-check" @click="deleted(data.id);closeConfirmation();" class="p-button-text" autofocus />
                                  </template>
                                </Dialog>
									
									</template>
								</Column>
							</DataTable>
              </div>
					</template>
				</DataTable>
				</div>
				<div v-if="option=='Pool'">
        <h4 class="px-4 py-4">LES OFFRES POUR LES POOL</h4>
        <DataTable :value="table4" v-model:expandedRows="expandedRows4" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll4" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll4" class="mb-2" />
						</div>
					</template>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column  header="Nom" >
						<template #body="{data}">
							{{data.title}}
						</template>
					</Column>
					<Column  header="Description" >
						<template #body="{data}">
							{{data.description}}
						</template>
					</Column>
					
					<Column  header="Capacité" >
						<template #body="{data}">
							{{data.capacite}} Personne
						</template>
					</Column>
					<Column  header="Prix de résérvation" >
						<template #body="{data}">
 						{{ data.prix_reservation}} DT
						</template>
					</Column>
					<Column  header="" >
						<template #body="{data}">
 						{{ data.prix_reservation}} DT
						</template>
					</Column>
					<Column  header="Disponibilité" >
					<template #body="{data}"> 
						  <i class="pi" :class="{'text-green-500 pi-check-circle': data.avaibility=='1' , 'text-pink-500 pi-times-circle': data.avaibility=='0'}"></i>
						</template>
					</Column>
					<template  #expansion="{data}">
						<div class="p-3">
							<h5> Les Offres</h5>
					<DataTable :value="data.offres" responsiveLayout="scroll" >
								
								<Column  header="Titre"  >
								
									<template #body="{data}">
										{{data.titre}}
									</template>
								</Column>
								<Column  header="Description" headerStyle="width: 14rem">
									<template #body="{data}">
										{{data.description}}
									</template>
								</Column>
								<Column  header="Pourcentage" >
									<template #body="{data}">
										{{data.pourcentage}}%
									</template>
								</Column>
								<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.avaibility=='1' , 'text-pink-500 pi-times-circle': data.avaibility=='0'}"></i>
									</template>
								</Column>
								<Column  header="" >
									<template #body="{data}" >
			               	<Button @click="goUpdateOffres(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
								
								<Column headerStyle="width:4rem">
									<template #body="{data}">
		                      			<Toast/>
									<Button :value="data.id"  @click="openConfirmation"  icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
                              <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Are you sure you want to proceed?</span>
                                  </div>
                                  <template #footer>
                                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                                    <Button label="Yes" icon="pi pi-check" @click="deleted(data.id);closeConfirmation();" class="p-button-text" autofocus />
                                  </template>
                                </Dialog>
									
									</template>
								</Column>
							</DataTable>
              </div>
					</template>
				</DataTable>
				</div>
				<div v-if="option=='Spa'">
        <h4 class="px-4 py-4">LES OFFRES POUR LES SPA</h4>
        <DataTable :value="table5" v-model:expandedRows="expandedRows5" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll5" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll5" class="mb-2" />
						</div>
					</template>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column  header="Nom" >
						<template #body="{data}">
							{{data.title}}
						</template>
					</Column>
					<Column  header="Description" >
						<template #body="{data}">
							{{data.description}}
						</template>
					</Column>
					
					<Column  header="Capacité" >
						<template #body="{data}">
							{{data.capacite}} Personne
						</template>
					</Column>
					<Column  header="Prix de résérvation" >
						<template #body="{data}">
 						{{ data.prix_reservation}} DT
						</template>
					</Column>
					<Column  header="" >
						<template #body="{data}">
 						{{ data.prix_reservation}} DT
						</template>
					</Column>
					<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.avaibility=='1' , 'text-pink-500 pi-times-circle': data.avaibility=='0'}"></i>
									</template>
								</Column>
					<template  #expansion="{data}">
						<div class="p-3">
							<h5> Les Offres</h5>
					<DataTable :value="data.offres" responsiveLayout="scroll" >
								
								<Column  header="Titre"  >
								
									<template #body="{data}">
										{{data.titre}}
									</template>
								</Column>
								<Column  header="Description" headerStyle="width: 14rem">
									<template #body="{data}">
										{{data.description}}
									</template>
								</Column>
								<Column  header="Pourcentage" >
									<template #body="{data}">
										{{data.pourcentage}}%
									</template>
								</Column>
								<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
									</template>
								</Column>
								<Column  header="" >
									<template #body="{data}" >
			               	<Button @click="goUpdateOffres(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
								
								<Column headerStyle="width:4rem">
									<template #body="{data}">
		                      		<Toast/>
									<Button :value="data.id"  @click="openConfirmation"  icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
                              <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Are you sure you want to proceed?</span>
                                  </div>
                                  <template #footer>
                                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                                    <Button label="Yes" icon="pi pi-check" @click="deleted(data.id);closeConfirmation();" class="p-button-text" autofocus />
                                  </template>
                                </Dialog>
									
									</template>
								</Column>
							</DataTable>
              </div>
					</template>
				</DataTable>
				</div>
				<div v-if="option=='Roof-Top'">
        <h4 class="px-4 py-4">LES OFFRES POUR LES ROOF-TOP</h4>
        <DataTable :value="table6" v-model:expandedRows="expandedRows6" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll6" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll6" class="mb-2" />
						</div>
					</template>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column  header="Nom" >
						<template #body="{data}">
							{{data.intitule}}
						</template>
					</Column>
					<Column  header="Description" >
						<template #body="{data}">
							{{data.description}}
						</template>
					</Column>
					
					<Column  header="Capacité" >
						<template #body="{data}">
							{{data.capacite}} Personne
						</template>
					</Column>
					<Column  header="Prix de résérvation" >
						<template #body="{data}">
 						{{ data.prix}} DT
						</template>
					</Column>
					<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
									</template>
								</Column>
					<template  #expansion="{data}">
						<div class="p-3">
							<h5> Les Offres</h5>
					<DataTable :value="data.offres" responsiveLayout="scroll" >
								
								<Column  header="Titre"  >
								
									<template #body="{data}">
										{{data.titre}}
									</template>
								</Column>
								<Column  header="Description" headerStyle="width: 14rem">
									<template #body="{data}">
										{{data.description}}
									</template>
								</Column>
								<Column  header="Pourcentage" >
									<template #body="{data}">
										{{data.pourcentage}}%
									</template>
								</Column>
								<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
									</template>
								</Column>
								<Column  header="" >
									<template #body="{data}" >
			               	<Button @click="goUpdateOffres(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
								
								<Column headerStyle="width:4rem">
									<template #body="{data}">
		                      			<Toast/>
									<Button :value="data.id"  @click="openConfirmation"  icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
                              <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Are you sure you want to proceed?</span>
                                  </div>
                                  <template #footer>
                                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                                    <Button label="Yes" icon="pi pi-check" @click="deleted(data.id);closeConfirmation();" class="p-button-text" autofocus />
                                  </template>
                                </Dialog>
									
									</template>
								</Column>
							</DataTable>
              </div>
					</template>
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
        rooms:[],
        types:[],
		roomsc:[],
		rooftop:[],
		pool:[],
		spa:[],
		displayConfirmation:false,
		expandedRows1: [],
		expandedRows2: [],
		expandedRows3: [],
		expandedRows4: [],
		expandedRows5: [],
		expandedRows6: [],
		buttons : [ 'Chambre' , 'Salle de conference','Roof-Top',
						'Pool', 'Spa' , 'Restaurant' ],
		option:'Chambre',
			}
		},

		mounted() {
     
	  this.getAllRooms();
	  this.getAllRestaurant();
	  this.getAllrooms();
	  this.getAllPool();
	  this.getAllSpa();
	  this.getallrooftop();
	  console.log(this.option);
		},
		methods: {
      
		expandAll2() {
				this.expandedRows2 = this.table2;
			},
			expandAll3() {
				this.expandedRows3 = this.table3;
			},expandAll4() {
				this.expandedRows4 = this.table4;
			},expandAll5() {
				this.expandedRows5 = this.table5;
			},expandAll6() {
				this.expandedRows6 = this.table6;
			},
			
			expandAll() {
				this.expandedRows1 = this.table1;
			},
			collapseAll() {
				this.expandedRows1 = null;
			},
			collapseAll2() {
				this.expandedRows2 = null;
			},
			collapseAll3() {
				this.expandedRows3= null;
			},
			collapseAll4() {
				this.expandedRows4 = null;
			},
			collapseAll5() {
				this.expandedRows5 = null;
			},
			collapseAll6() {
				this.expandedRows6 = null;
			},
      
      async getAllRooms(){
        await axios.get('http://localhost:8000/api/alloffres')
        .then(res=>{
          this.rooms=res.data.rooms;
          for(let i=0; i<this.rooms.length ; i++){
            this.table1.push(this.rooms[i]);
          }
        })
      },
      async getAllRestaurant(){
        await axios.get('http://localhost:8000/api/alloffresRes')
        .then(res=>{
          this.types=res.data.restaurants;

          for(let i=0 ; i<this.types.length ; i++){
            this.table2.push(this.types[i]);
          }
        })
      },

      async getAllrooms(){
        await axios.get('http://localhost:8000/api/alloffresroom')
        .then(res=>{
          this.roomsc=res.data.rooms;
          for(let i=0 ;i<this.roomsc.length ; i++){
            this.table3.push(this.roomsc[i]);
          }
        })
	  },
	  getAllPool(){
	 axios.get('http://localhost:8000/api/allpooloffres')
        .then(res=>{
          this.pool=res.data.pools;
          for(let i=0 ;i<this.pool.length ; i++){
            this.table4.push(this.pool[i]);
          }
        })  
	  },

	  getAllSpa(){
		  axios.get('http://localhost:8000/api/allspaoffres')
        .then(res=>{
          this.spa=res.data.spas;
          for(let i=0 ;i<this.spa.length ; i++){
            this.table5.push(this.spa[i]);
          }
        })  
	  },

	  getallrooftop(){
      axios.get('http://localhost:8000/api/allrooftopoffres')
        .then(res=>{
          this.rooftop=res.data.rooftops;
          for(let i=0 ;i<this.rooftop.length ; i++){
            this.table6.push(this.rooftop[i]);
          }
        }) 
	  },
	  goUpdateOffres(id){
		  this.$router.push({name:'offresupdate' , params:{id:id}})
	  },
	   openConfirmation() {
				this.displayConfirmation = true;
			},
			closeConfirmation() {
        this.displayConfirmation = false;
	  },
	  deleted(id){
		  axios.delete('http://localhost:8000/api/deleteoffre/'+id ,
		  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
		  ).then(res=>
		  {
			  if(res.data.delete){
		    	this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
			}else{
				this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						
			  }
		  })
	  }
		},

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
