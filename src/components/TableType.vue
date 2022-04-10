<template>
  <div>
    <div class="col-12">
     
      <div class="card">
         <div class="col-12 mb-2 lg:col-4 lg:mb-0">
						<span class="p-input-icon-right">
							<InputText type="text" placeholder="Search" />
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
                <th scope="col" class="px-6 py-3">nom type</th>
                <th scope="col" class="px-6 py-3">prix type</th>
                <th scope="col" class="px-6 py-3">description</th>
                <th scope="col" class="px-6 py-3">supprimer</th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">modifier</span>
                </th>
              </tr>
            </thead>
            <tbody>
             
              <template v-for="type in types" :key="type.id">
                <tr
                  class="
                    bg-white
                    border-b
                    dark:bg-gray-800 dark:border-gray-700
                  "
                >
                  <th
                    scope="row"
                    class="
                      px-6
                      py-4
                      font-medium
                      text-gray-900
                      dark:text-white
                      whitespace-nowrap
                    "
                  >
                    {{ type.nom_type }}
                  </th>
                  <td class="px-6 py-4">{{ type.price_Type }}</td>
                  <td class="px-6 py-4">{{ type.intitule}}</td>
                  <td class="px-6 py-4">
                       <Button
                      label="Delete"
                      icon="pi pi-trash"
                      class="p-button-danger"
                      style="width: auto"
                      @click="openConfirmation" 
                    />
                    <Dialog
                      header="Confirmation"
                      v-model:visible="displayConfirmation"
                      :style="{ width: '350px' }"
                      :modal="true"
                    >
                      <div
                        class="flex align-items-center justify-content-center"
                      >
                        <i
                          class="pi pi-exclamation-triangle mr-3"
                          style="font-size: 2rem"
                        />
                        <span>vous avez vraiment supprimer?</span>
                        <Button
                          label="No"
                          icon="pi pi-times"
                          @click="closeConfirmation"
                          class="p-button-text"
                        />
                             
                        <Button
                          label="Yes"
                          icon="pi pi-check"
                         @click="delete_type(type.id);closeConfirmation()"
                          class="p-button-text"
                          autofocus
                        />
                      </div>
                    </Dialog>
                  </td> 
                      <td>   
           <router-link  tag="button"  :to="{ name: 'UpdateType', params: {id:type.id}}">
		            <Button label="Modifier"  icon="pi pi-refresh"   style="width: auto" class="p-button-success " />
          </router-link>
                  </td>
                </tr>
              </template>
            
            </tbody>
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
   
      types: [],
   
    };
  },
     
  mounted() {
   this.getType();
   
  },
  created(){
  const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/user/type/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       
       this.type=res.data.data;
        
      
       console.log(res.data);
           this.getType();
       })},

 
  
  
  methods: {
  async getType(){
 await axios
      .get("http://127.0.0.1:8000/api/user/type", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
          
        this.types = res.data.data;
        console.log(res.data);
      })
      .catch((error) =>{ console.log(error)
      });},

      async delete_type(id){
      await axios
      .delete("http://127.0.0.1:8000/api/user/type/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {

           console.log(res.data);
           this.getType();
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