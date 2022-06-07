<template>
<h4 id="title">Salle de Conference</h4>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Les salles de conference</h5>
				<DataTable :value="table1" :paginator="true" class="p-datatable-gridlines" :rows="3" dataKey="id"  
						    responsiveLayout="scroll"  :filters="filters1"   v-model:filters="filters1"
							>
					
					<template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                              <InputText  placeholder="Keyword Search" style="width: 100%" v-model="filters1['global'].value"/>
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        No customers found.
                    </template>
                    <Column  header="Déscription"  style="min-width:12rem">
                        <template #body="{data}" >
                            {{data.description}}
                        </template>
                    </Column>
                    <Column header="Décoration" field="decoration"  style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.decoration}}</span>
                        </template>
                    </Column>
                    <Column header="Prix de réséevation"  :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.prix}} DT</span>
                        </template>
                    </Column>
					<Column  header="Disponibilité" >
						<template #body="{data}"> 
						  <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
						</template>
						</Column>
						 <Column header="Image"  style="min-width:8rem">
                      <template #body="{data}">
                       		<Button  @click="goImages(data.id)" icon="pi pi-image" class="p-button-rounded p-button-help p-button-outlined mr-2 mb-2"/>
                     
                      </template>
                   </Column>
                    <Column header=""   style="min-width:10rem">
                        <template #body="{data}">
                       	<Button @click="goUpdateRoom(data.id)" icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2"/>

                        </template>,
                    </Column>
                    <Column header="" style="min-width:8rem">
                        <template #body="{data}">
                     		<Button @click="openConfirmationRoom()" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"  />
							 <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Êtes-vous sûr de vouloir le supprimer</span>
                                  </div>
                                  <template #footer>
                                    <Button label="NON" icon="pi pi-times" @click="closeConfirmationRoom" class="p-button-text"/>
                                    <Button label="OUI" icon="pi pi-check" @click="deleteConferenceRoom(data.id);closeConfirmationRoom();" class="p-button-text" autofocus />
                                  </template>
                                </Dialog>
                        </template>
                    </Column>
				</DataTable>
			</div>
		</div>
<div class="col-12">
      <div class="card">
        <h4>Les type des salles de conferences</h4>
        <DataTable :value="table2" v-model:expandedRows="expandedRows1" dataKey="id" responsiveLayout="scroll">
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
						<div class="p-3" v-if="data.types">
							<h5> Les Types pour cette Salle</h5>
							<DataTable :value="data.types" responsiveLayout="scroll" >
								
								<Column  header="Le type"  >
								
									<template #body="{data}">
										{{data.label}}
									</template>
								</Column>
								<Column  header="Capacité" >
									<template #body="{data}">
										{{data.capacite}}
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
		                      		<Button @click="openConfirmationType" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
									<Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Êtes-vous sûr de vouloir le supprimer</span>
                                  </div>
                                  <template #footer>
                                    <Button label="NON" icon="pi pi-times" @click="closeConfirmationRoom" class="p-button-text"/>
                                    <Button label="OUI" icon="pi pi-check" @click="deleteType(data.id);closeConfirmationType();" class="p-button-text" autofocus />
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
<div class="col-12">
      <div class="card">
        <h4 >Les equipements disponibles pour chaque salle</h4>
        <DataTable :value="table3" v-model:expandedRows="expandedRows2" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll2" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll2" class="mb-2" />
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
						<div class="p-3" v-if="data.equipements">
							<h5> Les Equipements pour cette Salle</h5>
							<DataTable :value="data.equipements" responsiveLayout="scroll" >
								
								<Column  header="L'equipement"  >
								
									<template #body="{data}">
										{{data.label}}
									</template>
								</Column>
								<Column  header="Prix" >
									<template #body="{data}">
										{{data.prix}} DT
									</template>
								</Column>
									<Column  header="Disponibilité" >
									<template #body="{data}"> 
										  <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
									</template>
								</Column>
								<Column  header="" >
									<template #body="{data}" >
			               	<Button @click="goUpdateEquipement(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
								
								<Column headerStyle="width:4rem">
									<template #body={data}>
		                      		<Button @click="openConfirmationOption" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"/>
									<Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Êtes-vous sûr de vouloir le supprimer</span>
                                  </div>
                                  <template #footer>
                                    <Button label="NON" icon="pi pi-times" @click="closeConfirmationOption" class="p-button-text"/>
                                    <Button label="OUI" icon="pi pi-check" @click="deleteEquipement(data.id);closeConfirmationOption();" class="p-button-text" autofocus />
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
</template>

<script>
	
	
import axios from 'axios';
	export default {
		data() {
			return {
        table1:[],
        table2:[],
        table3:[],
        rooms:[],
        types:[],
		 data:[],
		equipements:[],
		  filters1: null,
        displayConfirmation: false,
				expandedRows1: [],
				expandedRows2: [],
			}
		},
	created(){
			this.initFilters1();
		}
		,
		mounted() {
     
      this.getAllRooms().then(res=> {
		this.table1= res; });
      this.getAllRoomsTypes();
      this.getAllRommsEquipement();
		},
		methods: {
      	initFilters1() 	{	this.filters1 = {
					'global': {value: null}}
		},
		expandAll2() {
				this.expandedRows2 = this.table3;
			},
			
			expandAll() {
				this.expandedRows1 = this.table2;
			},
			collapseAll() {
				this.expandedRows1 = null;
			},
			collapseAll2() {
				this.expandedRows2 = null;
			},
      
      async getAllRooms(){
        await axios.get('http://localhost:8000/api/getAllConferenceRooms')
        .then(res=>{
          this.rooms=res.data.conference_rooms;
          for(let i=0; i<this.rooms.length ; i++){
            this.table1.push(this.rooms[i]);
          }
        }).then(d => d.data)
      },
      async getAllRoomsTypes(){
        await axios.get('http://localhost:8000/api/conferencerooms')
        .then(res=>{
          this.types=res.data.rooms;

          for(let i=0 ; i<this.types.length ; i++){
            this.table2.push(this.types[i]);
          }
        })
      },

      async getAllRommsEquipement(){
        await axios.get('http://localhost:8000/api/conferenceroomseq')
        .then(res=>{
          this.equipements=res.data.rooms;
          for(let i=0 ;i<this.equipements.length ; i++){
            this.table3.push(this.equipements[i]);
          }
        })
	  },
	  async deleteConferenceRoom(id){
		  await axios.delete('http://localhost:8000/api/delete-conference-room/'+id,
		  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
		  )
	  },
	  async deleteType(id){
		  await axios.delete('http://localhost:8000/api/delete-Type/'+id,
		  { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
		  )
	  },
	  async deleteEquipement(id){
		  await axios.delete('http://localhost:8000/api/delete-equipement/'+id,
		   { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
		  )
	  },
	  goUpdateEquipement(id){
		  this.$router.push({name:'equipementupdate' , params:{id:id}})
	  },
	  goUpdateType(id){
		  this.$router.push({name:'typeupdate' , params:{id:id}})
	  },
	  goUpdateRoom(id){
		   this.$router.push({name:'conferenceroomupdate' , params:{id:id}})
	  },
	  goImages(id){
         this.$router.push({name:'images', params:{id:id , categorie:'conferenceroom'}})
	   },
	    openConfirmationRoom() {
				this.displayConfirmation = true;
			},
			
			closeConfirmationRoom() {
        this.displayConfirmation = false;
	  },
	   openConfirmationType() {
				this.displayConfirmation = true;
			},
			
			closeConfirmationType() {
        this.displayConfirmation = false;
	  },
	   openConfirmationOption() {
				this.displayConfirmation = true;
			},
			
			closeConfirmationOption() {
        this.displayConfirmation = false;
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
