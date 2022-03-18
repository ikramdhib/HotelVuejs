<template>
		<div class="col-4">
			<div class="card">
             <div class="py-4 px-2 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-6 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <img class="block mx-auto h-24  sm:mx-0 sm:shrink-0" src="layout/images/image.png" alt="Admin">
                <div class="pl-8 pt-8  "  >
                     <h4 > {{ user.firstname}}   {{ user.lastname }}   </h4>
                     <span> {{ user.role }} </span>
                </div>
                
             </div>
                
            </div>
			</div>
            <div class="card">
				<h5>TabView</h5>
				<TabView>
					<TabPanel header="Mes Informations ">
                        <div class="row">
                            <div class="col">
                            <h6 >Nom</h6>
                            </div>
                        </div>
                            </TabPanel>
					<TabPanel header="Paramétre">
						<p class="line-height-3 m-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque
							ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
							voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
							Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
					</TabPanel>
					
				</TabView>
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
