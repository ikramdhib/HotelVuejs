<template>
  <div class="container ">

<div style='background-color:	rgb(255,255,255)'>
<div class="space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0" style="cursor: auto;">
 
    
  <div class="sm:col-span-2" style="cursor: auto;">
    <div class="mt-2" style="cursor: auto;">
        
      <div class="mt-3 flex items-center font-sans" style="cursor: auto;">
                
        <div class="shrink-0">          
            <img class="h-10 w-10 rounded-full" src="layout/images/image.png" alt="Admin" style="cursor: auto;">
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
            }
        
    }

</script>
<style >
.container {
  margin-top:5rem;
  max-width:50%;
}

.space-y-4 {
    padding:35px;
}
</style>

