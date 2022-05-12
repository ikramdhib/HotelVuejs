<template>
<div class="col-12">
      <div class="card">
        <h4 id="title">Contact</h4>
   	<DataTable :value="table" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" 
						 responsiveLayout="scroll"
							 >
					
					
                    <template #empty>
                        Pas de contact trouvé.
                    </template>
                    <Column  header="Name" style="min-width:12rem">
                        <template   #body="{data}">
         
                            {{data.name }}
         
                        </template>
                    </Column>
                    <Column header="Email" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.email}}</span>
                        </template>
                    </Column>
                      <Column header="Objet" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.objet}}</span>
                        </template>
                    </Column>
                     
                      <Column header="Message" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.message}}</span>
                        </template>
                    </Column>
                  
                     
                    <Column  header=""  bodyClass="text-center" style="min-width:8rem">
                        <template #body="{data}">
		                      		<Button :value="data.id"  @click="openConfirmation" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2" />
                              <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{width: '350px'}" :modal="true">
                                  <div class="flex align-items-center justify-content-center">
                                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                                    <span>Vous avez vraiment supprimer?</span>
                                  </div>
                                  <template #footer>
                                    <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text"/>
                                    <Button label="Yes" icon="pi pi-check" @click=" deleteContact(data.id);closeConfirmation();" class="p-button-text" autofocus />
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
        contacts:[],
     
        table:[],
        displayConfirmation: false,
          
			}
		},
   
		mounted() {
      this.getcontact();
   
		},
		methods: {

       
      async getcontact(){
      await axios.get('http://localhost:8000/api/AllContact',
      
      )
      .then(res=>{
        if(res){
          this.contacts=res.data.contact;
         

          for(let i=0 ;i<this.contacts.length ;i++){
            this.table.push(this.contacts[i]);
            
          }
          console.log(this.contacts);
        }
      })
    },
    openConfirmation() {
				this.displayConfirmation = true;
			},
           
			closeConfirmation() {
        this.displayConfirmation = false;
      },
       async deleteContact(id){
       await axios.delete('http://localhost:8000/api/contact/'+id,)
     
      
	
    
      },
       
        
		
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

