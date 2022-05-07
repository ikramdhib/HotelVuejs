<template>
<div class="col-12">
      <div class="card">
        <h4 id="title"> les chambre</h4>
    	<DataTable :value="table" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" 
						 responsiveLayout="scroll"
							 >
					
					<template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText  placeholder="Chercher" style="width: 100%" v-model=" search"/>
                            </span>
                        </div>
                    </template>
                    <template #empty>
                       Aucun chambre trouver
                    </template>
				
					<Column  header="type chambre" >
                    
						<template #body="{data}">
                  
               <div v-for="type in types" :key="type.id">
                    <div v-if="type.id == data.type_id">
						{{ type.nom_type }}
                   
					</div></div>
                        </template>
					</Column>
					
					<Column  header="Nombre de lit" >
						<template #body="{data}">
							{{data.nbBed}}
						</template>
					</Column>
					<Column  header="description" >
					<template #body="{data}">
							{{ data.description}} 
						</template></Column>
					<Column  header="numero room" >
						<template #body="{data}">
                   {{ data.num_room}} 
						</template>
					</Column>
					<Column  header="numero etage" >
						<template #body="{data}">
              {{ data.numEtage}} 
						</template>
					</Column>
                    	<Column  header="nombre d'adult" >
						<template #body="{data}">
              {{ data.nbAdult}} Adult
						</template>
					</Column>
                    	<Column  header="nombre enfant" >
						<template #body="{data}">
              {{ data.nbEnfant}} Enfant
						</template>
					</Column>
                    <Column  header="nombre bebe" >
						<template #body="{data}">
              {{ data.nbbebe}} Bebe
						</template>
					</Column>
                    <Column  header="disponibilité" >
						<template #body="{data}">
              {{ data.avaibility}} 
						</template>
					</Column>
					 <Column  header="prix chambre" >
						<template #body="{data}">
            <div v-for="price in prices" :key="price.id">
                    <div v-if="price.id == data.price_id">
						{{ price.price_hotel }}DT
                   
					</div></div>
						</template>
					</Column>
					  <Column  header="" >
									<template #body="{data}" >
			               	<Button @click="updateRoom(data.id)"  icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
					<Column  header="" >
						<template #body="{data}">
							<Button  @click="delete_room(data.id)" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"  />
						</template>
					</Column>
		</DataTable>
	  </div></div>
<div class="col-12">
      <div class="card">
        <h4 id="title">Les option des chambre</h4>
        <DataTable :value="table" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="mb-2" />
						</div>
					</template>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column  header="Type du chambre" >
                    
						<template #body="{data}">
                  
               <div v-for="type in types" :key="type.id">
                    <div v-if="type.id == data.type_id">
						{{ type.nom_type }}
                   
					</div></div>
                        </template>
					</Column>
					
					<Column  header="Nombre de lit" >
						<template #body="{data}">
							{{data.nbBed}}
						</template>
					</Column>
					<Column  header="Description" >
					<template #body="{data}">
							{{ data.description}} 
						</template></Column>
					<Column  header="Numero room" >
						<template #body="{data}">
                   {{ data.num_room}} 
						</template>
					</Column>
					<Column  header="Numero etage" >
						<template #body="{data}">
              {{ data.numEtage}} 
						</template>
					</Column>
                    	<Column  header="Nombre d'adult" >
						<template #body="{data}">
              {{ data.nbAdult}} Adult
						</template>
					</Column>
                    	<Column  header="Nombre enfant" >
						<template #body="{data}">
              {{ data.nbEnfant}} Enfant
						</template>
					</Column>
                    <Column  header="Nombre bebe" >
						<template #body="{data}">
              {{ data.nbbebe}} Bébé
						</template>
					</Column>
                    <Column  header="Disponibilité" >
						<template #body="{data}">
              {{ data.avaibility}} 
						</template>
					</Column>
					 <Column  header="Prix chambre" >
						<template #body="{data}">
            <div v-for="price in prices" :key="price.id">
                    <div v-if="price.id == data.price_id">
						{{ price.price_hotel }} DT
                   
					</div></div>
						</template>
					</Column>
				 <Column header="Image"  style="min-width:8rem">
                      <template #body="{data}">
                       		<Button  @click="goImages(data.id)" icon="pi pi-image" class="p-button-rounded p-button-help p-button-outlined mr-2 mb-2"/>
                     
                      </template>
                   </Column>
					  <Column  header="" >
									<template #body="{data}" >
			               	<Button @click="updateRoom(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
					<Column  header="" >
						<template #body="{data}">
							<Button  @click="delete_room(data.id)" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
						</template>
					</Column>
					<template #expansion="{data}">
						<div class="p-3">
							<h5>Option</h5>
							<DataTable :value="data.options" responsiveLayout="scroll" >
								
							
								<Column  header="option">
								
									<template #body="{data}">
									{{ data.nom_option}}
									</template>
								</Column>
								<Column  header="Prix option " >
									<template #body="{data}">
										{{data.price_option}} DT 
									</template>
								</Column>
								<Column header="disponiblité" >
									<template #body="{data}"> 
										{{ data.avaibility}} 
									</template>
								</Column>
								  <Column  header="" >
									<template #body="{data}" >
			               	<Button @click="updateOption(data.id)"  icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2"  />
										
									</template>
								</Column>
								<Column headerStyle="width:4rem">
									<template #body="{data}">
		                      		<Button   @click="deleteOption(data.id)"  icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
									
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
        types:[],
       prices:[],
        table:[],
        table2:[],
        options:[],
         rooms:[],
     	expandedRows: [],
			}
		},
		mounted() {
      this.getRooms();
      console.log("room",this.table);
      this.getOptions();
      console.log("options",this.table2);
        this.getType();
       this.getPrice();
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

      async getRooms(){
        await axios.get('http://localhost:8000/api/getAllRoom')
        .then(res=>{
          this.rooms=res.data.rooms;
          for(let i=0 ; i<this.rooms.length ; i++){
            this.table.push(this.rooms[i]);
          }
        })
      },

      async getOptions(){
        await axios.get('http://localhost:8000/api/getAllRoom')
        .then(res=>{
          this.options=res.data.rooms;
          for(let i=0 ; i<this.options.length ; i++){
            this.table2.push(this.options[i]);
          }
        })
	  },
       async getType(){
       await axios
     
       
      .get("http://127.0.0.1:8000/api/type")
      
      
      .then((res) => {
        this.types=res.data.type;
        console.log("types",this.types);
      }
           )
     },
              async getPrice(){
       await axios
     
       
      .get("http://127.0.0.1:8000/api/price")
      
      
      .then((res) => {
        this.prices=res.data.price;
        console.log("prices",this.prices);
      }
           )
     },
           
      
	  updateOption(id){
		  this.$router.push({name:'OptionUpdate' , params:{id:id}})
	  },
	   updateRoom(id){
		  this.$router.push({name:'UpdateRoom' , params:{id:id}})
	  },
	  async delete_room(id){
      await axios
      .delete('http://127.0.0.1:8000/api/room/'+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {

           console.log(res.data);

      })},
		async deleteOption(id){
			await axios.delete('http://localhost:8000/api/option/'+id,
			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
			)
		},
		goImages(id){
         this.$router.push({name:'images', params:{id:id , categorie:'chambre'}})
       }
      
		},
		
		
	
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

