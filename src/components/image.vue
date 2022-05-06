<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <FileUpload name="demo[]" url="http://127.0.0.1:8000/public/files" @change="changeFile"  :multiple="true" accept="image/*" :maxFileSize="1000000"/>
                    <div class="col-12 mb-2 lg:col-4 lg:mb-0">
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText id="inp" type="file" placeholder="Username" />
						</span>
					</div>
                    <div class="field">
					<label for="name1">Name</label>
					<InputText id="name1" type="file"  multiple @change="changeFile"  />
				</div>
                     <from enctype="multipart/form-data">
                   	<div class="field col-12 md:col-12">
						<label for="prix4">Choisir des image :</label>

<button id="btn" class="p-button-secondary mr-2 mb-2">
					<input id="inp" type="file" multiple @change="changeFile"  />
</button>
					</div>
                   
	      <div class="field col-12 md:col-3">
			   <Toast />
			<Button label="Ajouter" @click="addimage()"></Button>
		</div>

                                {{ image }}
                        <img :src="'http://localhost:8000/storage'+image"  class="shadow-2" width="100" />
                    </from>
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
                images:'QqF8Ho9cvEtSebMmaeL4DQXQUTou4X5cfIkEdU7M.jpg',
              form: new FormData,
               image:"",

            };
        },
        mounted(){
             this.getImage();
        },
        methods: {
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

           addimage(){
               for(let i=0 ;i<this.image.length;i++){
              this.form.append('path',this.image[i])
              this.form.append('plat_id',1)

              const config= {headers:{'Content-Type':'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('token') }};
               axios.post('http://localhost:8000/api/images',this.form,config).then();
        }
           },
            getImage(){
         axios.get('http://localhost:8000/api/image/13').then(res=>{
           this.image=res.data.str
           console.log(this.image);
         })
       }
    }
    }
    </script>

    <style scoped>
    
    #inp{
        color: gray;
    }
    #btn{
        background-color: moccasin;
        padding: 20px;
        border-color:transparent ;
        border-radius: 44%;
        width: 260px;
    }
    </style>