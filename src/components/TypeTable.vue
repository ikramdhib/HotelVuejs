<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">Type-chambre</h4>
   	<DataTable :value="table" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" 
						 responsiveLayout="scroll"
							 >
					
					<template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText  placeholder="Chercher" style="width: 100%"/>
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        Pas de type trouvé.
                    </template>
                    <Column  header="Intitule" style="min-width:12rem">
                        <template #body="{data}">
                            {{ data.nom_type }}
                        </template>
                    </Column>
                    <Column header="Capacité" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.intitule}}</span>
                        </template>
                    </Column>
                     <Column  header=""  bodyClass="text-center" style="min-width:8rem" >
									<template #body="{data}" >
			               	<Button @click="Updatetype(data.id)"  label="Modifier" class="p-button-rounded p-button-info mr-2 mb-2" />
										
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
                                    <Button label="Yes" icon="pi pi-check" @click="deletetype(data.id);closeConfirmation();" class="p-button-text" autofocus />
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
        types:[],
        table:[],
        displayConfirmation: false,
			}
		},
		mounted() {
      this.getTypes();
		},
		methods: {
      async getTypes(){
      await axios.get('http://localhost:8000/api/type',
      
      )
      .then(res=>{
        if(res){
          this.types=res.data.type;
         

          for(let i=0 ;i<this.types.length ;i++){
            this.table.push(this.types[i]);
            
          }
          console.log(res.data);
        }
      })
    },
    openConfirmation() {
				this.displayConfirmation = true;
			},
			
			closeConfirmation() {
        this.displayConfirmation = false;
      },
       Updatetype(id){
		  this.$router.push({name:'UpdateType' , params:{id:id}})
	  },
       async deletetype(id){
     await axios.delete('http://localhost:8000/api/type/'+id,
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

