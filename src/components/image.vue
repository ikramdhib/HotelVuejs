<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                   
                    <form @submit="formSubmit"   method="post"   enctype="multipart/form-data">
        	<input type="file" name="path" url="http://localhost:8000/api/image" id="path" class="form-control" v-on:change="onChange">
                            <button class="btn btn-primary btn-block">Upload</button>
                        </form>
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
              
                path: '',
              room_id:0,
            };
        },
      
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
        }
    }
    </script>