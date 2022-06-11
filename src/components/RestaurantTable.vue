<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">Les Restaurants</h4>
        <DataTable :value="table" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="mb-2" />
						</div>
					</template>
					 <template #empty>
                        Pas de restaurant.
                    </template>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column  header="Restaurant" >
						<template #body="{data}">
							{{data.nom}}
						</template>
					</Column>
					
					<Column  header="Description" >
						<template #body="{data}">
							{{data.description}}
						</template>
					</Column>
					<Column  header="Capacite" >
					<template #body="{data}">
							{{ data.capacite}} Personnes
						</template></Column>
					<Column  header="Nombre des Tables" >
						<template #body="{data}">
                   {{ data.nbtable}} Table
						</template>
					</Column>
					<Column  header="Prix de résérvation" >
						<template #body="{data}">
              {{ data.prix_reservation}} DT
						</template>
					</Column>
					<Column header="Disponibilite" >
							<template #body="{data}">
							<i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
								</template>
						</Column>
								<Column header="Image"  style="min-width:8rem">
                      <template #body="{data}">
                       		<Button  @click="goImages(data.id)" icon="pi pi-image" class="p-button-rounded p-button-help p-button-outlined mr-2 mb-2"/>
                     
                      </template>
                   </Column>
					<Column  header="" >
						<template #body="{data}">
							<Button  @click="goUpdateRestaurant(data.id)" icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2"/>
						</template>
					</Column>
					<Column  header="" >
						<template #body="{data}">
							
							<ConfirmPopup></ConfirmPopup>
				<Button ref="popup" @click="confirmRes($event , data.id )" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"  ></Button>
						</template>
					</Column>
					<template #expansion="{data}">
						<div class="p-3" v-if="data.menu">
							<h5>Menu : {{data.menu.titre}}</h5>
							<DataTable :value="data.menu.plat"   responsiveLayout="scroll" >
								
								<Column  header="Intitulé"  >
								
									<template #body="{data}">
										{{data.intitule}} 
									</template>
								</Column>
								<Column  header="Le plat" >
									<template #body="{data}">
										{{data.nom}}
									</template>
								</Column>
								<Column  header="Prix" >
									<template #body="{data}"> 
										{{ data.prix_plat}} DT
									</template>
								</Column>
									<Column header="Image"  style="min-width:8rem">
                   		   <template #body="{data}">
                     	  		<Button  @click="goImagess(data.id)" icon="pi pi-image" class="p-button-rounded p-button-help p-button-outlined mr-2 mb-2"/>
                     
                    			  </template>
                 			  </Column>
								<Column  header="" >
									<template #body="{data}" >
			               	<Button @click="goUpdatePlat(data.id)"  icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
								
								<Column headerStyle="width:4rem">
									<template #body="{data}">
		                      		
									 <ConfirmPopup></ConfirmPopup>
				<Button ref="popup" @click="confirmPlat($event , data.id )" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"  ></Button>
									</template>
								</Column>
							</DataTable>
              </div>
					</template>
				</DataTable>
      </div>
</div>
</template>
<script>
    import axios from 'axios';
	export default {
		data() {
			return {
        table:[],
        restaurants:[],
		 expandedRows: [],
		 displayConfirmation: false,
			}
		},
		mounted() {
      this.getRestaurants();
		},
		methods: {
			confirmRes(event , id) {
				this.$confirm.require({
					target: event.currentTarget,
					message: 'Voulez-vous vraiment le supprimer ?',
					icon: 'pi pi-exclamation-triangle',
					accept: () => {
						this.deleteRestaurant(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
					}
				});
			},
			confirmPlat(event , id) {
				this.$confirm.require({
					target: event.currentTarget,
					message: 'Voulez-vous vraiment le supprimer ?',
					icon: 'pi pi-exclamation-triangle',
					accept: () => {
						this.deletePlat(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
					}
				});
			},
			initFilters1() {
			
			},
			clearFilter1() {
				this.initFilters1();
			},
			expandAll() {
				this.expandedRows = this.table
			},
			collapseAll() {
				this.expandedRows = null;
			},

      async getRestaurants(){
        await axios.get('http://localhost:8000/api/getrestaurants')
        .then(res=>{
          this.restaurants=res.data.restaurants;
          for(let i=0 ; i<this.restaurants.length ; i++){
            this.table.push(this.restaurants[i]);
          }
        })
      },

      
	  	async deleteRestaurant(id){
			await axios.delete('http://localhost:8000/api/delete-Restaurant/'+id,
			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
			)
		},
		async deletePlat(id){
			await axios.delete('http://localhost:8000/api/delete-Plat/'+id,
			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
			)
		},
		goUpdateRestaurant(id){
			this.$router.push({name:'restaurantupdate', params:{id:id}});
		},

		goUpdatePlat(id){
			this.$router.push({name:'platupdate', params:{id:id}});
		},
		goImages(id){
         this.$router.push({name:'images', params:{id:id , categorie:'restaurant'}})
	   },
	   goImagess(id){
         this.$router.push({name:'images', params:{id:id , categorie:'plat'}})
	   },
	     openConfirmation() {
				this.displayConfirmation = true;
			},
			
			closeConfirmation() {
        this.displayConfirmation = false;
	  },
	  openConfirmationPlat() {
				this.displayConfirmation = true;
			},
			
			closeConfirmationPlat() {
        this.displayConfirmation = false;
      },
      
		}
		
		
	
	}
</script>
<style scoped>

#title{
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 25px;
  font-size: 40px;
}
</style>

