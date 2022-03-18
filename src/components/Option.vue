<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Option</h5>
				<div class="p-fluid formgrid grid">
		<div class="field col-12 md:col-6">
						<label for="nomop">nom_Option</label>
						<InputText id="nomop" type="text" v-model="option.nom_option" />
					</div>
					<div class="field col-12 md:col-6">
						<label for="prixop">prix_Option</label>
						<InputText id="prixop" type="text" v/>
					</div>
          <div class="field col-12 md:col-3">
						<label for="disc">intitulé</label>
						<Textarea id="disc" rows="4" cols="60"/>
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

import axios from 'axios';
    export default {
        data() {
            return {
                option: {
					nom_type:"",
					price_type:0,
					intitule:""
				}
            }
        },
        methods: {
           async addType() {
               await axios
                .post('http://localhost:8000/api/option', this.type).then((res) => {
                console.log(res.status)
                this.$router.push({name:'option'})
            })

                    
                   
            }
        }
    }

</script>