<template>
		<div class="col-12">
			<div class="card">
<<<<<<< HEAD
				<h5>Type</h5>
				<div class="p-fluid formgrid grid">
		<div class="field col-12 md:col-6">
						<label for="city">nom_type</label>
						<InputText id="city" type="text" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="zip">prix_type</label>
						<InputText id="zip" type="text"/>
					</div>
          <div class="field col-12 md:col-3">
						<label for="address">intitulé</label>
						<Textarea id="address" rows="4" cols="60"/>
					</div>
      
        <div class="field col-12 md:col-6">
                        
       <span class="text-black-700">Disponibilité</span>           
       <div class="mt-2">
                     
    <label class="inline-flex items-center ml-4">
      <input type="radio" class="form-radio" name="accountType" value="OUI">
      <span class="ml-2">Oui</span>
    </label>
    <label class="inline-flex items-center ml-4">
      <input type="radio" class="form-radio" name="accountType" value="NON">
      <span class="ml-2">Non</span>
    </label>
    </div>
  </div>
        </div>
	<Button label="ajouter" class="p-button-secondary mr-2 mb-2" />
                            
	
</div>	
</div>	
</div>	
=======
				<h5>Advanced</h5>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="firstname2">Firstname</label>
						<InputText id="firstname2" type="text"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="lastname2">Lastname</label>
						<InputText id="lastname2" type="text"/>
					</div>
					<div class="field col-12">
						<label for="address">Address</label>
						<Textarea id="address" rows="4"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="city">City</label>
						<InputText id="city" type="text" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="state">State</label>
						<Dropdown id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Select One"></Dropdown>
					</div>
					<div class="field col-12 md:col-3">
						<label for="zip">Zip</label>
						<InputText id="zip" type="text"/>
					</div>
				</div>
			</div>
		</div>
>>>>>>> ba92950e81c413397aadb034be8f33b9a3b21fa7
</template>

<script>
export default {

}
</script>