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
                <th scope="col" class="px-6 py-3">nombre de lits</th>
                <th scope="col" class="px-6 py-3">description</th>
                <th scope="col" class="px-6 py-3">numero room</th>
                  <th scope="col" class="px-6 py-3">numero etage</th>
                    <th scope="col" class="px-6 py-3">nombre d'adult</th>
                      <th scope="col" class="px-6 py-3">nombre enfant</th>
                        <th scope="col" class="px-6 py-3">disponibilité</th>
                         <th scope="col" class="px-6 py-3">supprimer</th>
                <th scope="col" class="px-6 py-3">
                 
                  <span class="sr-only">modifier</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="room in rooms" :key="room.id">
               
            
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
                    {{ room.type_id }}
                  </th> 
                  <td class="px-6 py-4">{{ room.nbBed }}</td>
                  <td class="px-6 py-4">{{ room.description }}</td>
                  <td class="px-6 py-4">{{ room.num_room}}</td>
                  <td class="px-6 py-4">{{ room.numEtage }}</td>
                  <td class="px-6 py-4">{{ room.nbAdult}}</td>
                    <td class="px-6 py-4">{{ room.nbEnfant}}</td>
                      <td class="px-6 py-4">{{ room.avaibility}}</td>
                      
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
                         @click="delete_room(room.id);closeConfirmation()"
                          class="p-button-text"
                          autofocus
                        />
                      </div>
                    </Dialog>
                  </td> 
                      <td>   
                 			 <router-link :to="{ name: 'UpdateRoom', params: {id:room.id}}">
         <Button label="Modifier"  icon="pi pi-refresh"   style="width: auto" class="p-button-success " /></router-link> 
       
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
 let id =0;
 let idt=0;
export default {
  data() {
    return {
      displayConfirmation: false,
      display: false,
      rooms: [],
     
     
    };
  },
  mounted() {
   this.getRoom();
   this.getType();
    
  },
   created(){
    const id=this.$route.params.id;
     axios.get("http://127.0.0.1:8000/api/user/room/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       
       this.room=res.data.data;
        
     
       console.log(res.data);
           this.getRoom();
       })},
  methods: {
  async getRoom(){
 await axios
      .get("http://127.0.0.1:8000/api/user/room", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
          
        this.rooms = res.data.data;
      
      id=res.data.data.type_id
  console.log(id);
        console.log(res.data);
      })
      .catch((error) =>{ console.log(error)
      });},
 async getType(){
 await axios
      .get("http://127.0.0.1:8000/api/user/type", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
       idt =res.data.data.type_id
       
     if(id==idt)
 this.type = res.data.data.nom_type;
        console.log(res.data);
      })
      .catch((error) =>{ console.log(error)
      });},
      async delete_room(id){
      await axios
      .delete("http://127.0.0.1:8000/api/user/room/"+id, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {

           console.log(res.data);
           this.getRoom();
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