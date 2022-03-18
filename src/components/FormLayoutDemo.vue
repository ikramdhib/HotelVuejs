<template>
	<div class="grid">
		

		<div class="col-12">
			<div class="card">
				<h5>Chambre</h5>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="firstname2">prix</label>
						<InputText id="firstname2" type="number "/>
					</div>
					
					
					<div class="field col-12 md:col-3">
						<label for="state">Disponibilité</label>
						<Dropdown id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Select One"></Dropdown>
					</div>
					<div class="field col-12 md:col-6">
						<label for="lastname2">Type_chambre</label>
					<Dropdown id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Select One"></Dropdown>
					</div>
					
					<div class="field col-12">
						<label for="address">description</label>
						<Textarea id="address" rows="4"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="city">nombre-p-Adult </label>
						<InputText id="city" type="number" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="zip">Nombre-p-enfant</label>
						<InputText id="zip" type="number"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="zip">option</label>
				<span class="p-float-label">
					<MultiSelect id="multiselect" :options="cities" v-model="value9" optionLabel="name" :filter="false"></MultiSelect>
					<label for="multiselect"></label>
				</span>
			</div>
						<div class="field col-12 md:col-3">
						<label for="zip">Prix-hotel</label>
						<InputText id="zip" type="text"/>
					</div>
						<div class="field col-12 md:col-3">
						<label for="zip">Prix-booking1</label>
						<InputText id="zip" type="text"/>
					</div>
						<div class="field col-12 md:col-3">
						<label for="zip">Prix-booking2</label>
						<InputText id="zip" type="text"/>
					</div>
					<div class="field col-12 md:col-3">
						<label for="zip">Prix-booking3</label>
						<InputText id="zip" type="text"/>
					</div>

			
			<div class="col-12 ">
				
			<div class="card">
				<h5>Image</h5>
				<FileUpload name="demo[]" url="./upload.php" @upload="onUpload" :multiple="true" accept="image/*" :maxFileSize="1000000"/>

				
			</div>
		</div>
	
					<Button label="Submit"></Button>
				</div>
			</div>
		
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dropdownItems: [
					{name: 'Option 1', code: 'Option 1'},
					{name: 'Option 2', code: 'Option 2'},
					{name: 'Option 3', code: 'Option 3'}
				],
				dropdownItem: null
			};},
		
			};
	
	
</script>
