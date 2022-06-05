<template>
  <div class="grid">
		<div class="col-12">
			<div class="card">
				<h5> Editer Image :</h5>
    <div class="field col-12 md:col-6">
						<label for="prix4">Choisir des image :</label>
						<span class="p-input-icon-left">
							<i class="pi pi-folder-open" />
							<InputText  type="file" multiple @change="changeFile"/>
						</span>
					</div>
	               <div class="field col-12 md:col-3">
					<Button label="Modifier"  @click="updateimage(id)" ></Button>
		</div>
        </div>
        </div></div>
</template>

<script>
import axios from 'axios';
  
export default {
    data(){
    return{
        	image:[],
         
                form: new FormData,
    }
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
                 },
              
            async  updateimage(){
                if(this.image.length==0){
				this.errors.push("les images doit etre saisie")
            	}
                  const id=this.$route.params.id;
			for(let i=0 ;i<this.image.length;i++){
							this.form.append('path',this.image[i])
							this.form.append('room_id',localStorage.getItem("id"));
                            this.form.append('name',this.image[i])

							const config= {headers:{'Content-Type':'multipart/form-data',
							Authorization: 'Bearer ' + localStorage.getItem('token') }};
							axios.put('http://localhost:8000/api/image/'+id,this.form,config)
                          
                            }
					
			            	
				}}

}
</script>

<style>

</style>-->