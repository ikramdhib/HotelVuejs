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
                   
<<<<<<< HEAD
                    <form @submit="formSubmit"   method="post"   enctype="multipart/form-data">
        	<input type="file" name="path" url="http://localhost:8000/api/image" id="path" class="form-control" v-on:change="onChange">
                            <button class="btn btn-primary btn-block">Upload</button>
                        </form>
=======
	      <div class="field col-12 md:col-3">
			   <Toast />
			<Button label="Ajouter" @click="addimage()"></Button>
		</div>
                    </from>
>>>>>>> b4c2fdc1ad6bd5835a9fe222ac540177a9f95057
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
                image:[],
              form: new FormData,

            };
        },
<<<<<<< HEAD
      
    methods: {
            onChange(e) {
              this.path = e.target.files[0];
                console.log('<<data<<',this.path)
            },
            formSubmit() {
                
                const config = {
                    headers: {
                        'content-type':`multipart/form-data`
                    }
                }
                this.room_id=parseInt(localStorage.getItem('room_id'));
                let data = new FormData();
                
        
             data.append("room_id", this.room_id);
           data.append('path',this.path);


             
                axios.post('http://localhost:8000/api/image', data,
                 config)
                   .then(res=>{
                      let response = res.data.file.path;
                      console.log(response);
                    })
                   
            }
=======
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
>>>>>>> b4c2fdc1ad6bd5835a9fe222ac540177a9f95057
        }
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