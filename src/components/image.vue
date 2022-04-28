<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                   
                    <form @submit="formSubmit" enctype="multipart/form-data">
                            <input type="file" name="path" id="path" class="form-control" v-on:change="onChange">
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
            formSubmit(e) {
                e.preventDefault();
                let existingObj = this;
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                
                let data = new FormData();
                data.append('path', this.path);
                data.append(localStorage.getItem('room_id'),this.room_id);
                axios.post('http://localhost:8000/api/image', data, config)
                   .then(res=>{
                        existingObj.success = res.data.file.path;
                    })
                   
            }
        }
    }
    </script>