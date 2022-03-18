<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
		<div class="col-6">
			<div class="text-center mb-5">
                        <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
                        <span class="text-600 font-medium">S'inscrire maintenant</span>
                    </div>
			<div class="card">
		<h5>Sign Up</h5>
		<div class="field col-12 md:col-6">
						<label for="email"> Email</label>
						<InputText id="email" type="text"/>
					</div>
					<div class="field col-12 md:col-6">
					<label for="mdp"> Mot de Passe</label>
                        <Password id="password1" v-model="password"  :toggleMask="true" ></Password>
					</div>
                    <div class="field col-12 md:col-4">
					<Button label="Submit"></Button>
					</div>
				</div>
			</div>
	</div>
		</div>


</template>



