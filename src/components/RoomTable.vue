<template>
<div class="col-12">
      <div class="card">
        <h4 id="title"> Les Chambres</h4>
    	<DataTable :value="table" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" 
		 responsiveLayout="scroll" :filters="filters1"   v-model:filters="filters1"	>
	   <template #header>
         <div class="flex justify-content-between flex-column sm:flex-row">
             <span class="p-input-icon-left mb-2">
             <i class="pi pi-search" />
             <InputText  placeholder="Keyword Search" style="width: 100%" v-model="filters1['global'].value"/>
               </span>
                </div>
                    </template>
                    <template #empty>
                       Aucun chambre trouver
                    </template>
				
					<Column  header="Type" field="nom_type" >
                    
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
					<Column  header="Description"  style="min-width:18rem">
					<template #body="{data}">
							{{ data.description}} 
						</template></Column>
					<Column  header="Numero chambre" field="num_room">
						<template #body="{data}">
                   {{ data.num_room}} 
						</template>
					</Column>
					<Column  header="Numero d'etage" >
						<template #body="{data}">
              {{ data.numEtage}} 
						</template>
					</Column>
                    	<Column  header="Nombre d'adult" >
						<template #body="{data}">
              {{ data.nbAdult}} Adult
						</template>
					</Column>
                    	<Column  header="Nombre d'enfant" >
						<template #body="{data}">
              {{ data.nbEnfant}} Enfant
						</template>
					</Column>
                    <Column  header="Nombre de bebe" >
						<template #body="{data}">
              {{ data.nbbebe}} Bebe
						</template>
					</Column>
                    <Column  header="Disponibilité" >
						<template #body="{data}">
              
						  <i class="pi" :class="{'text-green-500 pi-check-circle': data.avaibility=='1' , 'text-pink-500 pi-times-circle': data.avaibility=='0'}"></i>
						
						</template>
					</Column>
					 <Column  header="Prix de réservation" >
						<template #body="{data}">
           
						{{ data.price_booking}}DT
                   
					
						</template>
					</Column>
				 <Column header="Image" >
                      <template #body="{data}">
                       		<Button  @click="goImages(data.id)" icon="pi pi-image" class="p-button-rounded p-button-help p-button-outlined mr-2 mb-2"/>
                     
                      </template>
                   </Column>
					  <Column  header="" >
									<template #body="{data}" >
			               	<Button @click="updateRoom(data.id)"  icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
					<Column  header="" >
						<template #body="{data}">
							<ConfirmPopup></ConfirmPopup>
				<Button ref="popup" @click="confirm($event , data.id )" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"  ></Button>
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
					<Column  header="Type" >
                    
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
					<Column  header="Description"  style="min-width:18rem" >
					<template #body="{data}">
							{{ data.description}} 
						</template></Column>
					<Column  header="Numero room" >
						<template #body="{data}">
                   {{ data.num_room}} 
						</template>
					</Column>
					<Column  header="Numero d'etage" >
						<template #body="{data}">
              {{ data.numEtage}} 
						</template>
					</Column>
                    	<Column  header="Nombre d'adult" >
						<template #body="{data}">
              {{ data.nbAdult}} Adult
						</template>
					</Column>
                    	<Column  header="Nombre d'enfant" >
						<template #body="{data}">
              {{ data.nbEnfant}} Enfant
						</template>
					</Column>
                    <Column  header="Nombre de bebe" >
						<template #body="{data}">
              {{ data.nbbebe}} Bébé
						</template>
					</Column>
                    <Column  header="Disponibilité" >
						<template #body="{data}">
        
						  <i class="pi" :class="{'text-green-500 pi-check-circle': data.avaibility=='1' , 'text-pink-500 pi-times-circle': data.avaibility=='0'}"></i>
						</template>
					
					</Column>
					 <Column  header="Prix chambre" >
						<template #body="{data}">
           
						{{ data.price_booking }} DT
                   
					
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
		                      		
									<ConfirmPopup></ConfirmPopup>
				<Button ref="popup" @click="confirmOp($event , data.id )" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"  ></Button>
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
	
	  filters1: null,
       prices:[],
        table:[],
        table2:[],
		
        options:[],
         rooms:[],
		 data:[],
     	expandedRows: [],
		   displayConfirmation: false,
			}
		},
		
			
		
		mounted() {
		// this.getRooms();
		this.getRooms().then(res=> {
		this.table = res; });
	 
      console.log("room",this.table);
      this.getOptions();
      console.log("options",this.table2);
        this.getType()
      

		},
		created(){
			
			this.initFilters1();
		}
		,
		methods: {
			 confirm(event , id) {
				this.$confirm.require({
					target: event.currentTarget,
					message: 'Voulez-vous vraiment le supprimer ?',
					icon: 'pi pi-exclamation-triangle',
					accept: () => {
						this.delete_room(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
					}
				});
			},
			 confirmOp(event , id) {
				this.$confirm.require({
					target: event.currentTarget,
					message: 'Voulez-vous vraiment le supprimer ?',
					icon: 'pi pi-exclamation-triangle',
					accept: () => {
						this.deleteOption(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
					}
				});
			},
			initFilters1() 	{	this.filters1 = {
					'global': {value: null}}
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
          for(let i=0 ; i<this.rooms.length; i++){
            this.table.push(this.rooms[i]);
          }
        }).then(d => d.data)
			
		
      },
	

      async getOptions(){
        await axios.get('http://localhost:8000/api/getAllRoom')
        .then(res=>{
          this.options=res.data.rooms;
          for(let i=0 ; i<this.options.length;i++){
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
      })
          
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
	   openConfirmation() {
				this.displayConfirmation = true;
			},
				closeConfirmation() {
        this.displayConfirmation = false;
      },
		async deleteOption(id){
			await axios.delete('http://localhost:8000/api/option/'+id,
			{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
			)
		},
		goImages(id){
         this.$router.push({name:'images', params:{id:id , categorie:'chambre'}})
	   },
	   
      
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

