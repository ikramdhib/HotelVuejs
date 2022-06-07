<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">Roof-Top</h4>
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
                        Pas de Roof-Tops trouvé.
                    </template>
                    <Column  header="Intitule" field="intitule" style="min-width:12rem">
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
                  <Column header="Image"  style="min-width:8rem">
                      <template #body="{data}">
                       		<Button  @click="goImages(data.id)" icon="pi pi-image" class="p-button-rounded p-button-help p-button-outlined mr-2 mb-2"/>
                     
                      </template>
                   </Column>
                    <Column field="activity" header="" :showFilterMatchModes="false" style="min-width:8rem" >
                        <template #body="{data}">
                          <router-link :to="{ name: 'updaterooftop', params: {id:data.id}}">
			               	<Button   icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
                          </router-link>
                        </template>
                    </Column>

                    <Column  header=""  bodyClass="text-center" style="min-width:8rem">
                        <template #body="{data}">
		                      		<Button :value="data.id"  @click="openConfirmation"  icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
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
         data:[],
        displayConfirmation: false,
			}
		},
		mounted() {
      this.getRoofTops().then(res=> {
		this.table = res; });
		},
    created(){
			this.initFilters1();
		}
		,
		methods: {
      initFilters1() 	{	this.filters1 = {
					'global': {value: null}}
		},
    	clearFilter1() {
				this.initFilters1();
			},
			
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
      }).then(d => d.data)
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
       },
       goImages(id){
         this.$router.push({name:'images', params:{id:id , categorie:'rooftop'}})
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

