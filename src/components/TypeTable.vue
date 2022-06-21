<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">Type-chambre</h4>
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
                        Pas de type trouvé.
                    </template>
                    <Column  header="Intitule" field="nom_type"  style="min-width:12rem">
                        <template #body="{data}">
                            {{ data.nom_type }}
                        </template>
                    </Column>
                    <Column header="Capacité" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.intitule}}</span>
                        </template>
                    </Column>
                     <Column  header=""  bodyClass="text-center" style="min-width:3rem" >
									<template #body="{data}" >
			               	<Button @click="Updatetype(data.id)"  icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" />
										
									</template>
								</Column>
                    <Column  header=""  bodyClass="text-center" style="min-width:3rem">
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
        types:[],
        table:[],
         data:[],
        displayConfirmation: false,
			}
		},
		mounted() {
      this.getTypes().then(res=> {
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
						this.deletetype(id)
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
      }).then(d => d.data)
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

