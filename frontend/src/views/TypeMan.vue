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
        <div class="contianer">
            <vue-select-image :dataImages="dataImages"
                @onselectimage="onSelectImage">
            </vue-select-image>
 
        </div>
    </section>
</template>

<script>
import VueSelectImage from 'vue-select-image'

    export default {

        components: { 
            VueSelectImage 
        }
    }
</script>