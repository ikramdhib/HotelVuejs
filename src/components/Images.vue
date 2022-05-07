<template>
    <div class="grid p-fluid">
        

        <div class="col-12">
            <div class="card">
                <h5>Galleria</h5>
                <Galleria :value="images" :responsiveOptions="galleriaResponsiveOptions" :numVisible="images.length" :circular="true" containerStyle="max-width: 800px; margin: auto">
                    <template #item="slotProps">
                        <img :src="'http://localhost:8000/storage'+slotProps.item.name" :alt="slotProps.item.alt" style="width: 100%; display: block" />
                    </template>
                    <template #thumbnail="slotProps">
                        <img :src="'http://localhost:8000/storage'+slotProps.item.name" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
                    </template>
                </Galleria>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            images: [],
            galleriaResponsiveOptions: [
                {
                    breakpoint: "1024px",
                    numVisible: 5,
                },
                {
                    breakpoint: "960px",
                    numVisible: 4,
                },
                {
                    breakpoint: "768px",
                    numVisible: 3,
                },
                {
                    breakpoint: "560px",
                    numVisible: 1,
                },
            ],
           
        };
    },
    mounted() {
        this.getImages();
    },

    methods:{
        getImages(){
            const id = this.$route.params.id
            const categorie =this.$route.params.categorie
            if(categorie=="rooftop"){
            axios.get('http://localhost:8000/api/allroofs/'+id).then(res=>{
                this.images=res.data.roofs.images
            
            })
            }
            if(categorie=="conferenceroom"){
                axios.get('http://localhost:8000/api/allimages/'+id).then(res=>{
                this.images=res.data.room.images
                console.log(this.images);
            
            })
            }
            if(categorie=="pool"){
                axios.get('http://localhost:8000/api/allpool/'+id).then(res=>{
                this.images=res.data.pool.images
            
            })
            }
            if(categorie=="restaurant"){
                axios.get('http://localhost:8000/api/getallrestaurantimg/'+id).then(res=>{
                this.images=res.data.restaurant.images
            
            })
            }
            if(categorie=="spa"){
                axios.get('http://localhost:8000/api/allimagesofspa/'+id).then(res=>{
                this.images=res.data.spa.images
            
            })
            }
            if(categorie=="plat"){
                axios.get('http://localhost:8000/api/allplat/'+id).then(res=>{
                this.images=res.data.plat.images
            
            })
            }
            if(categorie=="chambre"){
                axios.get('http://localhost:8000/api/allrooms/'+id).then(res=>{
                this.images=res.data.room.images
            
            })
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/demo/badges.scss';
@import '../assets/demo/items.scss';
</style> 
