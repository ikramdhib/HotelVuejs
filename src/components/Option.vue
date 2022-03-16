<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Option</h5>
				<div class="p-fluid formgrid grid">
		<div class="field col-12 md:col-6">
						<label for="city">nom_Option</label>
						<InputText id="city" type="text" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="zip">prix_Option</label>
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
</template>

<script>
export default {

}
</script>