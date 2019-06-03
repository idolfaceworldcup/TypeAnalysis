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
                        <div v-for="(man, index) in mans" :key="index" @click="onselectedImage(man[index])">
                            <img v-if="Number(man.id)%2 === 1" v-bind:src="man.href">   
                        </div>                    
                    </card>
                </div>
                <div class="col-md-5">
                    <card type="secondary" shadow
                        header-classes="bg-white pb-5"
                        body-classes="px-lg-5 py-lg-5"
                        class="border-0">
                        <div v-for="(man, index) in mans" :key="index" @click="onselectedImage(man[index])">
                            <img v-if="Number(man.id)%2 === 0" v-bind:src="man.href">   
                        </div>   
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {

    data: () => ({
        mans:[
            {  
                href:require('../../public/img/analysis/image/analysis_man/강동원.jpg'),
                id : 1
            },{  
                href:require('../../public/img/analysis/image/analysis_man/강하늘.jpg'),
                id : 2
            },{  
                href:require('../../public/img/analysis/image/analysis_man/고수.jpg'),
                id : 3
            },{  
                href:require('../../public/img/analysis/image/analysis_man/공유.jpg'),
                id : 4
            }
        ],
        selectedImage:[
            {
                href: '',
                id: ''
            }
        ]
    }),

    methods:{
        setImage(man) {
            this.man.splice(1);
            console.log(this.man);
        },

        onselectedImage(man) {
            this.selectedImage.push ({
                href : this.man.href,
                id : this.man.id               
            })
            console.log(selectedImage);
        }
    }
}
</script>

<style>
img {
    max-width: 100%; /* 이미지의 최대사이즈 */
    width /***/: auto; /* IE8 */
    height: auto;
    vertical-align: bottom;
}
</style>