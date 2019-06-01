<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-success">
        <span></span>
        <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <card type="secondary" shadow
                        header-classes="bg-white pb-5"
                        body-classes="px-lg-5 py-lg-5"
                        class="border-0">
                        <template>
                            <vue-select-image :dataImages="dataImages"
                                @onselectimage="onSelectImage">
                            </vue-select-image>
                        </template>
                    </card>
                </div>
                <div class="col-md-5">
                    <card type="secondary" shadow
                        header-classes="bg-white pb-5"
                        body-classes="px-lg-5 py-lg-5"
                        class="border-0">
                        
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import VueSelectImage from 'vue-select-image'

export default {
    components: {
        VueSelectImage 
    },
    data() {
        return {
            dataImages: [{
                id: '1',
                src:'../../public/img/analysis/image/analysis_man/강동원.jpg'
            }]
        }
    },
    methods: {
        onSelectImage: function(data) {
            console.log('fire event onSelectImage: ', data)
            this.imageSelected = data
        }
    }
    

}
</script>
