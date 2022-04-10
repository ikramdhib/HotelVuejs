<template>
<div class="grid p-fluid">
  <div class="col-12 md:col-4">
  	<div  class="card ">
   <FileUpload @change="previewFiles" name="basic"  id="up" mode="basic" url="./upload.php" accept="image/*" :maxFileSize="1000000"  />
   <Button v-on:click="show()" label="hi"/>
  	</div>
  </div>
</div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
            methods:{
              show(){
                console.log("the img :" , document.getElementById("up").value)
              },
                previewFiles(event) {

      // process your files, read as DataUrl or upload...
                 console.log(event.target.files);


   }
            }
        
    }

</script>
<style >
</style>

