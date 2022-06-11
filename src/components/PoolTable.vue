<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">Pool_lounge</h4>
   	<DataTable :value="table" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" 
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
                        Pas de Pool-lounge trouvé.
                    </template>
                    <Column  header="Titre" field="title" style="min-width:12rem">
                        <template #body="{data}">
                            {{ data.title }}
                        </template>
                    </Column>
                    <Column header="Description"  style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.description}}</span>
                        </template>
                    </Column>
                      <Column header="Capacite"  style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.capacite}} Personne</span>
                        </template>
                    </Column>
                     <Column header="Disponibilité" f style="min-width:12rem">
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
                        <Column  header="" bodyClass="text-center" style="min-width:8rem" >
									<template #body="{data}" >
			               	<Button @click="Updatepool(data.id)"   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
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
        pools:[],
        table:[],
        data:[],
        displayConfirmation: false,
			}
		},
		mounted() {
      this.getPools().then(res=> {
		this.table = res; });
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
						this.deletePool(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
					}
				});
			},
      initFilters1() 	{	this.filters1 = {
					'global': {value: null}}
		},
      async getPools(){
      await axios.get('http://localhost:8000/api/pool',
      
      )
      .then(res=>{
        if(res){
          this.pools=res.data.pool;
         

          for(let i=0 ;i<this.pools.length ;i++){
            this.table.push(this.pools[i]);
            
          }
          console.log(res.data);
        }
      }).then(d => d.data)
    },
      Updatepool(id){
		  this.$router.push({name:'updatePool' , params:{id:id}})
	  },
    openConfirmation() {
				this.displayConfirmation = true;
			},

			
			closeConfirmation() {
        this.displayConfirmation = false;
      },
       async deletePool(id){
     await axios.delete('http://localhost:8000/api/pool/'+id,
     { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
     )
       },
       goImages(id){
         this.$router.push({name:'images', params:{id:id , categorie:'pool'}})
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

