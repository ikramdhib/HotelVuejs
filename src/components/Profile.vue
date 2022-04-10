<template>
<div class="grid p-fluid">
  <div class="col-12 md:col-4">
  	<div  class="card ">
			<div class="space-y-4 lg:grid lg:grid-cols-6 lg:items-start lg:gap- lg:space-y-0" style="cursor: auto;">
 
    
  <div class="sm:col-span-4" style="cursor: auto;">
    <div class="mt-2" style="cursor: auto;">
        
      <div class="mt-3 flex items-center font-sans" style="cursor: auto;">
                
        <div class="shrink-0">          
            <img id="img" class="h-10 w-10 rounded-full" v-bind:src="user.img" alt="Admin" style="cursor: auto;">
        </div>
        <div class="ml-3">
                    
          <div class="text-sm font-medium text-skin-inverted">
                        
            <h5 class="hover:underline" style="cursor: auto;">
               {{ user.firstname }} {{ user.lastname }}
            </h5>
                    
          </div>
                    
          <div class="flex space-x-1 text-sm text-skin-muted" style="cursor: auto;">
                        
                        
            <span aria-hidden="true"> <i class='pi pi-tags'></i></span>
                        
            <span style="cursor: auto;"> {{ user.role }} </span>
          </div>
        </div> 
        </div> 
				<Button id="btn" label="Changer" class="p-button-rounded mr-2 mb-2" />
      </div>
      </div>
			</div>
</div>
  </div>
	<div id="space" class="card">
    <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <tbody>
            <tr class="border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <i class="pi pi-user"/> <span id="td"> Nom & Prénom </span></td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ user.firstname }} {{ user.lastname }}
              </td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><i class="pi pi-phone"/> <span id="td" >Téléphone </span></td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               {{ user.phone }}
              </td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><i class="pi pi-map-marker" /> <span id="td"> Adresse </span></td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               {{ user.country }}
              </td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <i class="pi pi-fw pi-envelope" /> <span id="td"> Code Postal </span></td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               {{ user.zipcode }}
              </td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">   <i class="pi pi-id-card" /> <span id="td"> Carte d'Identité</span></td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               {{ user.cin }}
              </td>
            </tr>
            <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> <i class="pi pi-fw pi-envelope" /> <span id="td"> Email </span></td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               {{ user.email }}
              </td>
            </tr>
             <tr class="bg-white border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
				      <Button label="Editer" @click="goEdit()" class="mr-2 mb-2"/></td>
            </tr>
          </tbody>
        </table>
            </div>
          </div>       
        </div>
            
      </div>
	</div>
</div>
</template>
<script>
export default {
    data(){
        return{
           user:{},
        }
    },
            mounted () {
                if(localStorage.getItem('user')){
                    try{
                        this.user = JSON.parse(localStorage.getItem('user'));
                    }catch(e){
                        localStorage.removeItem('user');
                    }
                }
            },
            methods:{
              goEdit(){
                this.$router.push("profileEdit");
              }
            }
        
    }

</script>
<style >
.container {
  margin-top:5rem;
  max-width:30%;
}
#btn{
 margin-top: 10px;
 max-width: 40%;
 padding: 10px;
}

.space-y-4 {
    padding:35px;
}

#img {
border-radius: 50%;
}
#space{
  margin-left: 10px;
  max-width: 70%;
}
#td{
  padding-left: 15px;
}
</style>

