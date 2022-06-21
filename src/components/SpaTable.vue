<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">SPA</h4>
   	<DataTable :value="table" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" 
						 responsiveLayout="scroll" :filters="filters1"   v-model:filters="filters1"
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
                        Pas de SPA trouvé.
                    </template>
                    <Column  header="Titre" field="title" style="min-width:12rem">
                        <template   #body="{data}">
         
                            {{data.title }}
         
                        </template>
                    </Column>
                    <Column header="Description" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.description}}</span>
                        </template>
                    </Column>
                      <Column header="Capacite" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.capacite}} Personne</span>
                        </template>
                    </Column>
                     <Column header="Disponibilité" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                          <i class="pi" :class="{'text-green-500 pi-check-circle': data.avaibility=='1' , 'text-pink-500 pi-times-circle': data.avaibility=='0'}"></i>
                        </template>
                    </Column>
                      <Column header="prix reservation" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.prix_reservation}}</span>
                        </template>
                    </Column>
                    <Column header="Image"  style="min-width:8rem">
                      <template #body="{data}">
                       		<Button  @click="goImages(data.id)" icon="pi pi-image" class="p-button-rounded p-button-help p-button-outlined mr-2 mb-2"/>
                     
                      </template>
                   </Column>
                      <Column  header="" bodyClass="text-center" style="min-width:8rem">
									<template #body="{data}" >
			               	<Button @click="Updatespa(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
							
               
								</Column>
                    <Column  header=""  bodyClass="text-center" style="min-width:8rem">
                        <template #body="{data}">
		                      		<ConfirmPopup></ConfirmPopup>
				<Button ref="popup" @click="confirm($event , data.id )" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"  ></Button>
			                  
                        </template>
                    </Column>
				</DataTable>
      </div>
</div>
</template>

<script>
  import axios from'axios';
	export default {
		data() {
			return {
				customer1: null,
				filters1: null,
        loading1: true,
        spas:[],
     	 data:[],
        table:[],
        displayConfirmation: false,
          search:""
			}
		},
   
		mounted() {
      this.getSpas().then(res=> {
		this.table = res; });
   
		},created(){
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
						this.deleteSpa(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
					}
				});
			},
	initFilters1() 	{	this.filters1 = {
					'global': {value: null}}
		},
			
       
      async getSpas(){
      await axios.get('http://localhost:8000/api/spa',
      
      )
      .then(res=>{
        if(res){
          this.spas=res.data.spa;
         

          for(let i=0 ;i<this.spas.length ;i++){
            this.table.push(this.spas[i]);
            
          }
          console.log(res.data);
        }
      }).then(d => d.data)
    },
    openConfirmation() {
				this.displayConfirmation = true;
			},
             Updatespa(id){
		  this.$router.push({name:'updateSpa' , params:{id:id}})
	  },
			
			closeConfirmation() {
        this.displayConfirmation = false;
      },
       async deleteSpa(id){
      
     await axios.delete('http://localhost:8000/api/spa/'+id,
     { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
     )
       },
        goImages(id){
         this.$router.push({name:'images', params:{id:id , categorie:'spa'}})
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

