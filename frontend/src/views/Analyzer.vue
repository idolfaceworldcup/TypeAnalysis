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
                <div class="col-md-6" v-for="(man, index) in mans" :key="index">
                    <card type="secondary" shadow
                        header-classes="bg-white pb-5"
                        body-classes="px-lg-5 py-lg-5"
                        class="border-0"
                        style="height:100%; width:100%;"
                        >
                            <v-img v-bind:src="man.href" v-on:click='analyzer(man.id)' width="100%" height="100%"></v-img>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
let selectAttribute
let analysisId
let selectImageId
let useImageId
let status
let count
let folder

export default {
    data: () => ({
        mans:[
            {  
                href : require(`../../public/img/analysis/image/pleasewait.jpg`),
                id : 1
            },{  
                href : require(`../../public/img/analysis/image/pleasewait.jpg`),
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
        analyzer(id) {
            selectImageId = id
            axios.post(`http://localhost:3000/api/analysis/start/${analysisId}`,{
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
                        name : "result",
                        params : {
                            analysisId : analysisId,
                            analysisData : res.selectAttribute,
                            useImageId : res.useImageId
                        }
                    })
                }

                else {
                    this.mans[0].id = res.image[0].id
                    this.mans[0].href = require(`../../public/img/analysis/image/${res.image[0].path}`)
                    this.mans[1].id = res.image[1].id
                    this.mans[1].href = require(`../../public/img/analysis/image/${res.image[1].path}`)

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
        analysisId = this.$route.params.analysisId
        selectAttribute = {}
        useImageId = []
        selectImageId = 0
        status = 0
        count = 0

        axios.post(`http://localhost:3000/api/analysis/start/${analysisId}`,{
            count : count,
            status : status,
            selectAttribute : selectAttribute,
            useImageId : useImageId,
            selectImageId : selectImageId
        })
        .then((response) => {
            let res = response.data
            folder = res.folder
            this.mans[0].href = require(`../../public/img/analysis/image/${res.image[0].path}`)
            this.mans[0].id = res.image[0].id
            this.mans[1].id = res.image[1].id
            this.mans[1].href = require(`../../public/img/analysis/image/${res.image[1].path}`)

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