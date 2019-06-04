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
                <div class="col-md-5" v-for="(man, index) in mans" :key="index">
                    <card type="secondary" shadow
                        header-classes="bg-white pb-5"
                        body-classes="px-lg-5 py-lg-5"
                        class="border-0">
                        <div >
                            <img v-bind:src="man.href" v-on:click='test(man.id)'>   
                        </div>                    
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
let selectAttribute
let analysisId = 1
let selectImageId
let useImageId
let status
let count

export default {
    data: () => ({
        mans:[
            {  
                href : require(`C:/Users/user/Desktop/study/Tool/nodejs/TypeAnalysis/frontend/public/img/analysis/image/analysis_man/강동원.jpg`),
                id : 1
            },{  
                href : require(`C:/Users/user/Desktop/study/Tool/nodejs/TypeAnalysis/frontend/public/img/analysis/image/analysis_man/강동원.jpg`),
                id : 2
            }
        ],
        selectedImage:
            {
                href: '',
                id: ''
            }
        
    }),

     methods : {
        test(id) {
            selectImageId = id

            axios.post('http://localhost:3000/api/analysis/start/1',{
                analysisId : analysisId,
                count : count,
                status : status,
                selectAttribute : selectAttribute,
                useImageId : useImageId,
                selectImageId : selectImageId
            })
            .then((response) => {
                let res = response.data

                if(res.status === -1) {
                    this.$router.push({
                        name : "mainpage"
                    })
                }

                else {
                    this.mans[0].href = require(`C:/Users/user/Desktop/study/Tool/nodejs/TypeAnalysis/frontend/public/img/analysis/image/analysis_man/${res.image[0].path}`)
                    this.mans[0].id = res.image[0].id
                    this.mans[1].id = res.image[1].id
                    this.mans[1].href = require(`C:/Users/user/Desktop/study/Tool/nodejs/TypeAnalysis/frontend/public/img/analysis/image/analysis_man/${res.image[1].path}`)

                    selectAttribute = res.selectAttribute
                    useImageId = res.useImageId
                    status = res.status
                    count = res.count
                }
            })
            .catch(function (error) {
                alert(error)
                this.$router.push({
                    name : "mainpage"
                })
            })
            }
    },

    created() {
        selectAttribute = {}
        useImageId = []
        selectImageId = 0
        status = 0
        count = 0

        axios.post('http://localhost:3000/api/analysis/start/1',{
            analysisId : analysisId,
            count : count,
            status : status,
            selectAttribute : selectAttribute,
            useImageId : useImageId,
            selectImageId : selectImageId
        })
        .then((response) => {
            let res = response.data
            this.mans[0].href = require(`C:/Users/user/Desktop/study/Tool/nodejs/TypeAnalysis/frontend/public/img/analysis/image/analysis_man/${res.image[0].path}`)
            this.mans[0].id = res.image[0].id
            this.mans[1].id = res.image[1].id
            this.mans[1].href = require(`C:/Users/user/Desktop/study/Tool/nodejs/TypeAnalysis/frontend/public/img/analysis/image/analysis_man/${res.image[1].path}`)

            selectAttribute = res.selectAttribute
            useImageId = res.useImageId
            status = res.status
            count = res.count
        })
        .catch(function (error) {
            alert(error)
            this.$router.push({
                name : "mainpage"
            })
        })
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