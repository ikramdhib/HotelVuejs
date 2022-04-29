<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">Roof-Top</h4>
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
                        Pas de Roof-Tops trouvé.
                    </template>
                    <Column  header="Intitule" style="min-width:12rem">
                        <template #body="{data}">
                            {{ data.intitule }}
                        </template>
                    </Column>
                    <Column header="Capacité" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.capacite}} personnes</span>
                        </template>
                    </Column>
                    <Column header="Déscription" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.description}}</span>
                        </template>
                    </Column>
                    <Column header="Prix de résérvation" filterField="date" dataType="date" style="min-width:10rem">
                        <template #body="{data}">
                            {{data.prix}} DT
                        </template>
                    </Column>
                    <Column header="Disponibilité" filterField="balance" dataType="numeric" style="min-width:10rem">
                        <template #body="{data}">
                          <i class="pi" :class="{'text-green-500 pi-check-circle': data.disponibilite=='1' , 'text-pink-500 pi-times-circle': data.disponibilite=='0'}"></i>
                        </template>
                    </Column>
                    <Column field="activity" header="" :showFilterMatchModes="false" style="min-width:12rem" >
                        <template #body="{data}">
                          <router-link :to="{ name: 'updaterooftop', params: {id:data.id}}">
			               	<Button   label="Modifier" class="p-button-rounded p-button-info mr-2 mb-2" />
                          </router-link>
                        </template>
                    </Column>
                    <Column  header=""  bodyClass="text-center" style="min-width:8rem">
                        <template #body="{data}">
		                      		<Button :value="data.id"  @click="openConfirmation" label="Supprimer" style="width: auto" class="p-button-rounded p-button-danger mr-2 mb-2" />
                              <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Are you sure you want to proceed?</span>
                                  </div>
                                  <template #footer>
                                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                                    <Button label="Yes" icon="pi pi-check" @click="deleteRoofTop(data.id);closeConfirmation();" class="p-button-text" autofocus />
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
        rooftops:[],
        table:[],
        displayConfirmation: false,
			}
		},
		mounted() {
      this.getRoofTops();
		},
		methods: {
      async getRoofTops(){
      await axios.get('http://localhost:8000/api/allRoofs-Tops',
      
      )
      .then(res=>{
        if(res){
          this.rooftops=res.data.rooftops;
          console.log("rr",this.rooftops);

          for(let i=0 ;i<this.rooftops.length ;i++){
            this.table.push(this.rooftops[i]);
            
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
       async deleteRoofTop(id){
     await axios.delete('http://localhost:8000/api/delete-Roof-Top/'+id,
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

