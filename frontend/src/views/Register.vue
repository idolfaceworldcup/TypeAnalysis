<template>
    <section class="section section-shaped section-sm my-0">
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
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div id="signup">
                                <form role="form">
                                    <base-input v-model="user.name"
                                                class="mb-3"
                                                placeholder="Name"
                                                addon-left-icon="ni ni-hat-3">
                                    </base-input>
                                    <base-input v-model="user.email"
                                                class="mb-3"
                                                placeholder="Email"
                                                addon-left-icon="ni ni-email-83">
                                    </base-input>
                                    <base-input v-model="user.password"
                                                type="password"
                                                placeholder="Password"
                                                addon-left-icon="ni ni-lock-circle-open">
                                    </base-input>
                                    <div class="text-center">
                                        <base-button type="primary" class="my-4" v-on:click="singup">Create account</base-button>
                                    </div>
                                </form>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios'
export default {
    data : function() {
        return {
            user :{
                email : '',
                password: '',
                name : ''
            }
        }
    },

    created () {
        this.$http.get('http://localhost:3000/api/manager/test')
            .then((response) => {
                alert(response.data.loginId)
                alert('hi')
            })
    },

    mounted () {
         axios.get('http://localhost:3000/api/manager/test')
        .then((result) => {
            alert(result.data.loginId)
            alert('bye')
        })
    },
    methods : {
        signup: function(event){
            this.$http.get('http://localhost:3000/api/manager/test',{
            user: this.user
            })
            .then((response) => {
                alert(response.data)
                if(response.data.result === 0 ){
                    alert('Error, Please, try again')
                }
                if(response.data.result === 1){
                    alert(response.data)
                }
            })
            .catch(function (error) {
                alert('error')
            })
        }
    }
};
</script>
<style>
</style>
