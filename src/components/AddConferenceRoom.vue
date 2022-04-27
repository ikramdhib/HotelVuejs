<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Ajouter Menu pour le restaurant :</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
					     <label for="lastname2">Décoration</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="dropdownValues" optionLabel="name"  placeholder="Select" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Prix de résérvation :</label>
						<InputText id="num_etage" type="text" />
					</div>
			        <div class="field col-6">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4"/>
						</div>
					</div>
		 <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-4">
					  <label for="lastname2">Type :</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="dropdownValues" optionLabel="name"  v-model="dropdownValue" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-4">
						<label for="num-ch">Capacité :</label>
						<InputText id="num-ch" type="number"/>
					</div>
					<div class="field col-12 md:col-4">
							<Button id="btn" icon="pi pi-plus" @click="expandAll" class="mr-2 mb-2" />

					</div>
		 </div>
		 <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-4">
						<label for="num_etage">Equipement :</label>
						<InputText id="num_etage" type="text" />
					</div>
					<div class="field col-12 md:col-4">
						<label for="num_etage">Prix pour un Equipement  :</label>
						<InputText id="num_etage" type="text" />
					</div>
					<div class="field col-12 md:col-4">
							<Button id="btn" icon="pi pi-plus" @click="expandAll" class="mr-2 mb-2" />

					</div>

					<div class="field col-12 md:col-12">
						<label for="prix4">Choisir des image :</label>
						<FileUpload name="file" url="" ref="file" @upload="onUpload" @change="selectFile" :multiple="true" accept="image/png, image/jpeg" :maxFileSize="1000000"/>
					</div>
		
	      <div class="field col-12 md:col-3">
			<Button label="Ajouter" ></Button>
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
				dropdownValue:null,
				dropdownValues: [
					{name: 'ENTREES'},
					{name: 'PLATS PRINCIPAUX',},
					{name: 'DESSERT'},
				]
		}
          
		
			},
		
			
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
#btn{
	background-color:transparent;
	color:grey;
	border-color: transparent;
	border-radius: 100%;
	margin-top: 20px;
	margin-left: 40px;
}
</style>
