<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">Restaurant</h4>
        <DataTable :value="table" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="mb-2" />
						</div>
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
					<template #expansion="{data}">
						<div class="p-3">
							<h5>Menu : {{data.menu.titre}}</h5>
							<DataTable :value="data.menu.plat" responsiveLayout="scroll" >
								
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
								<Column field="Prix" header="Date" >
									<template #body="{data}"> 
										{{ data.prix_plat}} DT
									</template>
								</Column>
								<Column  header="" >
									<template #body="{data}" >
			               	<Button :value="data.id"  label="Modifier" class="p-button-rounded p-button-info mr-2 mb-2" />
										
									</template>
								</Column>
								
								<Column headerStyle="width:4rem">
									<template #body>
		                      		<Button :value="data.id" label="Supprimer" class="p-button-rounded p-button-danger mr-2 mb-2" />
									
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
        table2:[],
        plats:[],
     	expandedRows: [],
			}
		},
		mounted() {
      this.getRestaurants();
      console.log("rest",this.table);
      this.getPlats();
      console.log("plats",this.table2);
		},
		methods: {
			initFilters1() {
			
			},
			clearFilter1() {
				this.initFilters1();
			},
			expandAll() {
				this.expandedRows = this.table.filter(p => p.id);
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

      async getPlats(){
        await axios.get('http://localhost:8000/api/getPlats')
        .then(res=>{
          this.plats=res.data.plats;
          for(let i=0 ; i<this.plats.length ; i++){
            this.table2.push(this.plats[i]);
          }
        })
      }
      
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

