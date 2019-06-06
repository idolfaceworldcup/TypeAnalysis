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
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div id ="login">
                            <form role="form">
                                <base-input v-model="account.loginId"
                                            class="mb-3"
                                            placeholder="LoginID"
                                            addon-left-icon="ni ni-hat-3">
                                </base-input>
                                <base-input v-model="account.password"
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" v-on:click="login">LOGIN</base-button>
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
    data: function() {
        return {
            account : {
                loginId:'',
                password:'',
            }
        }
    },
    methods: {
        login: function(event){
            axios.post('http://localhost:3000/api/auth/user', this.account)
            .then((response) => {
                alert('success login')
                this.$router.push({
                    name : "mainpage"
                })
            }).catch(error => {
                alert(error)
                this.$router.push({
                    name : "login"
                })
            })
        }
    }    
};
</script>

