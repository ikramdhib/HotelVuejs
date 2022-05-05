<template>
  <div>
    <div class="col-12">
      <div class="card">
        <h5>list option</h5>
         <div class="col-12 mb-2 lg:col-4 lg:mb-0">
						<span class="p-input-icon-right">
							<InputText type="search" class="search" placeholder="Search" v-model=" search" />
							<i class="pi pi-search" />
						</span>
					</div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700uppercasebg-gray-50dark:bg-gray-700 dark:text-gray-400
  "
            >
              <tr>
                    <DataTable :value="customer3" rowGroupMode="subheader" groupRowsBy="representative.name"
                    sortMode="single" sortField="representative.name" :sortOrder="1" scrollable scrollHeight="400px">
                  
                    <Column field="Nom option" header="Nom option" style="min-width:200px"></Column>
                     <Column field="prix option " header="prix option" style="min-width:200px"></Column>
                      <Column field="disponibilite" header="disponibilite" style="min-width:200px"></Column>
                       <Column field="supprimer" header="supprimer" style="min-width:200px"></Column>
                        <Column field="modifier" header="Modifier" style="min-width:200px"></Column>
                  </DataTable>
               
              </tr>
            </thead>
         
                 
                  
                  
                 
                 		
	
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";


export default {
  data() {
    return {
      displayConfirmation: false,
      display: false,
      options: [],
      search:""
     
    };
  },
  computed: {
    FilteredList() {
      return this.options.filter((option) => {
        return this.search.toLowerCase().split(' ').every(v => option.nom_option.toLowerCase().includes(v));
      });
    }
  },
    

 
  mounted() {
   this.getOption();
  
  },
  


  methods: {
  async getOption(){
 await axios
      .get("http://127.0.0.1:8000/api/option", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
          
        this.options = res.data.data;
        
        console.log(res.data);
      })
      .catch((error) =>{ console.log(error)
      });},

      async delete_option(id){
      await axios
      .delete("http://127.0.0.1:8000/api/option/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {

           console.log(res.data);
           this.getOption();
      })},
   
     
      
    open() {
      this.display = true;
    },
    close() {
      this.display = false;
    },
    openConfirmation() {
        
      this.displayConfirmation = true;
     
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
    
		
			
    
  }}
</script>