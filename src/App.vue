<template>
	<div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <AppFooter />
        </div>

        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
	</div>
</template>

<script>

import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppFooter from './AppFooter.vue';

export default {
    emits: ['change-theme'],
    data() {
        return {
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu : [
                {
                    label: 'Accueil',
                    items: [{
                        label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
                    }]
                },
                {
                    label: 'Hôtellerie', icon: 'pi pi-fw pi-search',
                    items: [
                        
                        {
                            label: 'Chambres',
                            items: [
                                {
                                    label: 'Ajouter un chambre', icon: 'pi pi-plus',
                                    to:'AddRoom'
                                },
                                {
                                    label: 'Les chambres', icon: 'pi pi-list', 
                                    to:'RoomTable'
                                },
                                 {
                                    label: 'Ajouter type chambre', icon: 'pi pi-plus',
                                    to:'type'
                                },
                                {
                                    label: 'Les types', icon: 'pi pi-list', 
                                    to:'TypeTable'
                                }
                            ]
                        },
                         {
                            label: 'Salle de Conference',
                            items: [
                                {
                                    label: 'Ajouter une Salle', icon: 'pi pi-plus',
                                    to:'addconferenceroom'
                                },
                                {
                                    label: 'Les salles de cenference', icon: 'pi pi-list',
                                    to:'conferencerooms'
                                },
                            ]
                        },
                         {
                            label: 'Resataurants', 
                            items: [
                                {
                                    label: 'Ajouter un restaurant ', icon: 'pi pi-plus',
                                    to:'/addrestaurant'
                                },
                                {
                                    label: 'Les Restaurants', icon: 'pi pi-list',
                                    to:'restaurants'
                                }
                            ]
                        },
                        {
                            label: 'SPAs', 
                            items: [
                                {
                                    label: 'Ajouter une SPA ', icon: 'pi pi-plus',
                                    to:'spa'
                                },
                                {
                                    label: 'Les SPAs', icon: 'pi pi-list',
                                    to:'SpaTable'
                                }
                            ]
                        },
                        {
                            label: 'Pools', 
                            items: [
                                {
                                    label: 'Ajouter un Pool ', icon: 'pi pi-plus',
                                    to:'pool'
                                },
                                {
                                    label: 'Les Pools', icon: 'pi pi-list',
                                    to:'poolTable'
                                }
                            ]
                        },
                        {
                            label: 'Roof-Top', 
                            items: [
                                {
                                    label: 'Ajouter un Roof-Top ', icon: 'pi pi-plus',
                                    to:'/addrooftop'
                                },
                                {
                                    label: 'Les Roof-Top', icon: 'pi pi-list',
                                    to:'rooftop'
                                }
                            ]
                        },
                         {
                            label: 'Offres', 
                            items: [
                                {
                                    label: 'Ajouter un Offre ', icon: 'pi pi-plus',
                                    to:'addoffres'
                                },
                                {
                                    label: 'Les Offres', icon: 'pi pi-list',
                                    to:'offres'
                                }
                            ]
                        },
                        {
                            label: 'Réservations', 
                            items: [
                                {
                                    label: 'Réservation des chambre ', icon: 'pi pi-plus',
                                    to:'addoffres'
                                },
                                {
                                    label: 'Réservations', icon: 'pi pi-list',
                                    to:'offres'
                                }
                            ]
                        },
                         {
                            label: 'Message Contacts', 
                           
                        }
                    ]
                },
                
               
            ]
        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
            }

            return true;
        },
        changeTheme(event) {
            this.$emit('change-theme', event);
        }
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$primevue.config.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        logo() {
            return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppMenu': AppMenu,
        'AppFooter': AppFooter,
    }
}
</script>

<style lang="scss">
@import './App.scss'; 
@import url("https://cdn.jsdelivr.net/npm/@tailwindcss/custom-forms@0.2.1/dist/custom-forms.css");

</style>
