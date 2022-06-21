<template>
    <div class="grid p-fluid">
        <div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>DataView</h5>
				<DataView :value="images" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField" >
					<template #header>
						<div class="grid grid-nogutter">
							<div class="col-6 text-right">
								<DataViewLayoutOptions v-model="layout" />
							</div>
						</div>
					</template>
					<template #list="slotProps">
						<div class="col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full">
								<img :src="'http://localhost:8000/storage' + slotProps.data.name" :alt="slotProps.data.name" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
								<div class="flex-1 text-center md:text-left">

								</div>
								<div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">

									<Button label="Modifier" icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" @click="clickupdate(slotProps.data.id)"></Button>
                                    <Toast/>
									<ConfirmPopup></ConfirmPopup>
				<Button label="Supprimer" ref="popup" @click="confirm($event , slotProps.data.id )" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"  ></Button>
								</div>
							</div>
						</div>
					</template>
                    <template #grid="slotProps">
						<div class="col-12 md:col-4">
							<div class="card m-3 border-1 surface-border">
								<div class="flex align-items-center justify-content-between">
								</div>
								<div class="text-center">
									<img :src="'http://localhost:8000/storage' + slotProps.data.name" :alt="slotProps.data.name" class="w-9 shadow-2 my-3 mx-0"/>
								</div>
								<div class="flex align-items-center justify-content-between">
									<Button  icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-outlined mr-2 mb-2" @click="clickupdate(slotProps.data.id)"></Button>
                                    <Toast/>
									<ConfirmPopup></ConfirmPopup>
				<Button ref="popup" @click="confirm($event , slotProps.data.id )" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined mr-2 mb-2"  ></Button>
								</div>
							</div>
						</div>
					</template>
				</DataView>
			</div>
		</div>
        </div>
    </div>
    <div class="grid p-fluid" v-if="update">
		<div class="col-12">
			<div class="card">
                 <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<h5 class="px-4 py-4">Modifier l'image pour le Categorie {{ this.$route.params.categorie}}:</h5>
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText type="file" multiple @change="changeFile" accept=".png, .jpg, .jpeg" />
						</span>
			 </div>
			</div>
             <div class="p-fluid formgrid grid" >
			<div class="field col-12 md:col-3 py-4">
			   <Toast />
			<Button label="Modifier" @click="updateImg()"></Button>
		</div>
        <div class="field col-12 md:col-3 py-4">
			<Button label="Annuler" @click="goBack()" class="p-button-secondary mr-2 mb-2" ></Button>
			</div>
             </div>
			 </div>
			</div>
        </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
          
            images: [],
            displayConfirmation:false,
            id:null ,
            image:[],
            layout:'grid',
           update:false,
           form : new FormData,
        };
    },
    mounted() {
        this.getImages();
    },

    methods:{
         confirm(event , id) {
				this.$confirm.require({
					target: event.currentTarget,
					message: 'Voulez-vous vraiment le supprimer ?',
					icon: 'pi pi-exclamation-triangle',
					accept: () => {
						this.deleteImage(id)
					},
					reject: () => {
						this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
					}
				});
			},
        	changeFile(e){

              let selectedFiles=e.target.files
              if(!selectedFiles.length){
                  return false
              }

              for(let i=0 ;i<selectedFiles.length ;i++ ){
                  this.image.push(selectedFiles[i])
              }
              console.log("tt",this.image);
              
           },

        updateImg(){
            if(this.image.length==0){
				this.errors.push("les images doit etre saisie")
            	}
           for(let i=0 ;i<this.image.length;i++){
					this.form.append('path',this.image[i])
                    this.form.append('id',this.id)
           }
			const config= {headers:{'Content-Type':'multipart/form-data',
			Authorization: 'Bearer ' + localStorage.getItem('token') }};
                  axios.post('http://localhost:8000/api/image' ,
                  this.form, config
           
            ).then(res=>{
                if(res.data.update==true){
                    this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
							
					}else{
							this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
					}
            })
            
  
          
        },
        getImages(){
            const id = this.$route.params.id
            const categorie =this.$route.params.categorie
            if(categorie=="rooftop"){
            axios.get('http://localhost:8000/api/allroofs/'+id).then(res=>{
                this.images=res.data.roofs.images
           
              
            
            })
            }
            if(categorie=="conferenceroom"){
                axios.get('http://localhost:8000/api/allimages/'+id).then(res=>{
                this.images=res.data.room.images
              
               
            
            })
            }
            if(categorie=="pool"){
                axios.get('http://localhost:8000/api/allpool/'+id).then(res=>{
                this.images=res.data.pool.images
          
            
            })
            }
            if(categorie=="restaurant"){
                axios.get('http://localhost:8000/api/getallrestaurantimg/'+id).then(res=>{
                this.images=res.data.restaurant.images
         
            })
            }
            if(categorie=="spa"){
                axios.get('http://localhost:8000/api/allimagesofspa/'+id).then(res=>{
                this.images=res.data.spa.images
             
            
            })
            }
            if(categorie=="plat"){
                axios.get('http://localhost:8000/api/allplat/'+id).then(res=>{
                this.images=res.data.plat.images
            
            
            })
            }
            if(categorie=="chambre"){
                axios.get('http://localhost:8000/api/allrooms/'+id).then(res=>{
                this.images=res.data.room.images
            
            
            })
            }
        },
        clickupdate(id){
            this.id=id
            this.update=true
        },
        deleteImage(id){
            axios.delete('http://localhost:8000/api/image/'+id,
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }}
            ).then(res=>{
                if(res.data.success==true
                
                ){
                this.$toast.add({severity:'success', summary: 'Excellent', detail:'les information a été soumise avec succès', life: 3000});
			}else{
				this.$toast.add({severity:'error', summary: "Message d'erreur", detail:'quelque chose est mal passé', life: 3000});
						
			  }
            })
        },
         openConfirmation() {
				this.displayConfirmation = true;
			},
			
			closeConfirmation() {
        this.displayConfirmation = false;
      },
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/demo/badges.scss';
@import '../assets/demo/items.scss';
</style> 
