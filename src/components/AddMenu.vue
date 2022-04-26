<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h4 id="titre">Ajouter Menu pour le restaurant :</h4>
			      <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="num_etage">Titre du menu:</label>
						<InputText id="num_etage" type="text" />
					</div>

			<div class="field col-9">
						<label for="desc">Description</label>
						<Textarea id="desc" rows="4"/>
			</div>
		</div>

		<h4 id="titre">Ajouter Les Plats pour ce menu :</h4>
		 <div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-4">
					     <label for="lastname2">Intitulé du Plat</label>
				     <span class="p-float-label" >
					<Dropdown id="dropdown"  :options="dropdownValues" optionLabel="name"  placeholder="Select" ></Dropdown>
					</span>
			        </div>
					<div class="field col-12 md:col-3">
						<label for="num_etage">Non :</label>
						<InputText id="num_etage" type="text" />
					</div>
					
					<div class="field col-12 md:col-3">
						<label for="num_etage">Prix :</label>
						<InputText id="num_etage" type="text" />
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
</style>
