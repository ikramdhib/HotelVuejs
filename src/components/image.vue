<template>

    <div class="grid">
		<div class="col-12">
			<div class="card">
<form @submit="sendfile">
 	<FileUpload name="demo[]" url="" ref="file" @upload="onUpload" @change="selectFile" :multiple="true" accept="image/*" :maxFileSize="1000000"/>
</form>    
   
    </div>
</div>

  </div>
 
</template>
<script>
import axios from 'axios';

export default {
 data() {
            return {
				
           image:{
             url:"",
			room_id:0,
           },	
				
            }
        },
		methods:{ 
              
	      selectFile(){
           this.url=this.$refs.file.files[0];
          },
           
            async sendFile(){
                const formData =new FormData();
                formData.append('file',this.url)
              await axios
			    .post('http://localhost:8000/api/user/image',
                {formData,
                room_id:localStorage.getItem('room_id'),
				},
				{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token')}}
				).then(res=>{
		          let response = res.data.data;
					 console.log(response);
					  this.$router.push('TableRoom');
			         
					 
			})}}}

</script>