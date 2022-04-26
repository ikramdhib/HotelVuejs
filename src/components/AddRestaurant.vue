<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre"> Ajouter un Restaurant</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="num_etage">Non du restaurant :</label>
						<InputText id="num_etage" type="text" />
					</div>
						<div class="field col-12 md:col-3">
						<label for="num-ch">Capacité :</label>
						<InputText id="num-ch" type="number"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Nombres des tables :</label>
						<InputText id="num_etage" type="number" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Prix de la résérvation :</label>
						<InputText id="num_etage" type="text" />
					</div>
					<div class="field col-12 md:col-3">
                        
              <span class="text-black-700">Disponibilité :</span>           
                   <div class="mt-2 py-2 px-4">
				<InputSwitch  v-model="switchValue" />
				</div>
			</div>

			<div class="field col-9">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4" />
			</div>
					
					
					<div class="field col-12 md:col-12">
						<label for="prix4">Choisir des image :</label>
						<FileUpload name="file" url="" ref="file" @upload="onUpload" @change="selectFile" :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
					</div>
	               <div class="field col-12 md:col-3">
					<Button label="Ajouter"  @click="addroom();addPrice()" ></Button>
		</div>
		</div>
			</div>
		</div>
		</div>
</template>

<script>

	export default {
		data() {
			return {
				switchValue: null,
				}
		
				
			}
	}
	
	
</script>

<style scoped>
#titre{
margin-bottom: 30px;
margin-top: 15px;
}
#switcher{
	margin-top: 105px;
}
</style>
