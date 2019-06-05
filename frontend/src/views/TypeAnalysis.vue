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
                    <base-button block type="secondary" @click="modals.modal1 = true">
                        테스트 설명 방법
                    </base-button>
                    <modal :show.sync="modals.modal1">
                        <h6 slot="header" class="modal-title" id="modal-title-default">Type your modal title</h6>

                        <p>Far far away, behind the word mountains, far from the countries Vokalia and
                            Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                            right at the coast of the Semantics, a large language ocean.</p>
                        <p>A small river named Duden flows by their place and supplies it with the necessary
                            regelialia. It is a paradisematic country, in which roasted parts of sentences
                            fly into your mouth.</p>

                        <template slot="footer">
                            <base-button type="link" class="ml-auto" @click="modals.modal1 = false">Close
                            </base-button>
                        </template>
                    </modal>
            
            <div class="section">
                
                <div class="row">
                    <div class="col-md-6" v-for="(a, id) in analysis" :key="id">
                        <router-link :to="{ name: 'analyzer', params: { analysisId : a.id } }">
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

            analysis : [{ id : 1, name : 'hi'}, { id : 2, name : 'bye'}]
        
        }
    },

    created() {
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
</script>

