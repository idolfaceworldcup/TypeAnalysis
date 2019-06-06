<template>
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
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div id="SingUp">
                                <form role="form">
                                    <base-input v-model="account.loginId"
                                                class="mb-3"
                                                placeholder="loginId"
                                                addon-left-icon="ni ni-hat-3">
                                    </base-input>
                                    <base-input v-model="account.password"
                                                type="password"
                                                placeholder="Password"
                                                addon-left-icon="ni ni-lock-circle-open">
                                    </base-input>
                                    <base-input v-model="account.passwordValid"
                                                type="password"
                                                placeholder="Password confirm"
                                                addon-left-icon="ni ni-lock-circle-open">
                                    </base-input>
                                    <div class="text-center">
                                        <base-button type="primary" class="my-4" v-on:click="signup">Create account</base-button>
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
            account :{
                loginId : '',
                password: '',
                passwordValid: ''
            }
        }
    },

    methods : {
        signup: function(event){
            axios.post('http://localhost:3000/api/auth/regist',{
                account: this.account
            })
            .then((response) => {
               if(response.data === '500') {
                    alert('500 error')

                    this.$router.push({
                        name : "register"
                    })
               }

               else {
                    alert('success')
                    this.$router.push({
                        name : "mainpage"
                    })
               }

            })
            .catch(function (error) {
                alert(error)
                this.$router.push({
                    name : "register"
                })
            })
        }
    }

};
</script>
<style>
</style>
