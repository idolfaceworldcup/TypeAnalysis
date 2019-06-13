<template id="typeanalysis">
    <section class="section section-shaped section-xl my-0">       
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
            <div class="section">
                <div class="row">
                    <div class="col-md-6" v-for="(a, id) in analysis" :key="id">
                        <router-link :to="{ name: 'manageimage', params: { analysisId : a.id } }">
                            <base-button block type="secondary">
                                {{ a.name }}
                            </base-button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Modal from "@/components/Modal.vue";
import axios from 'axios'
let analysisId = 1
export default {
    components: {
        Modal
    },
    data () {
        return {
            modals :{
                modal1 : false
            },

            analysis : []
        
        }
    },

    created() {
        this.getUserData()
        this.getAnalysis()    
    },
    methods: {
        getUserData: function() {
            axios.get('http://localhost:3000/api/auth/exist')
            .then((response) => {
                if(response.data.id === undefined || response.data.authority === undefined) {
                    this.$router.push({
                        name : "managerlogin"
                    })
                }
            })
            .catch(function (error) {
                this.$router.push({
                    name : "managerlogin"
                })
            })
        },
        getAnalysis: function() {
            axios.get('http://localhost:3000/api/analysis/analysises')
            .then((response) => {
                this.analysis = response.data
            })
            .catch(function (error) {
                alert(error)
                this.$router.push({
                    name : "mainpage"
                })
            })
        }
    }
}
</script>

