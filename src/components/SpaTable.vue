<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">SPA</h4>
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
                        Pas de SPA trouvé.
                    </template>
                    <Column  header="Titre" style="min-width:12rem">
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
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.capacite}}</span>
                        </template>
                    </Column>
                     <Column header="Disponibilité" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.avaibility}}</span>
                        </template>
                    </Column>
                      <Column  header="" bodyClass="text-center" style="min-width:8rem">
									<template #body="{data}" >
			               	<Button @click="Updatespa(data.id)"  label="Modifier" class="p-button-rounded p-button-info mr-2 mb-2" />
										
									</template>
								</Column>
                    <Column  header=""  bodyClass="text-center" style="min-width:8rem">
                        <template #body="{data}">
		                      		<Button :value="data.id"  @click="openConfirmation" label="Supprimer" style="width: auto" class="p-button-rounded p-button-danger mr-2 mb-2" />
                              <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Vous avez vraiment supprimer?</span>
                                  </div>
                                  <template #footer>
                                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                                    <Button label="Yes" icon="pi pi-check" @click="deletePool(data.id);closeConfirmation();" class="p-button-text" autofocus />
                                  </template>
                                </Dialog>
			                  
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
     
        table:[],
        displayConfirmation: false,
          search:""
			}
		},
   
		mounted() {
      this.getSpas();
   
		},
		methods: {

       
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
      })
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
       async deletePool(id){
     await axios.delete('http://localhost:8000/api/spa/'+id,
     { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
     )
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

