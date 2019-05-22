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
                            <div id ="login">
                            <form role="form">
                                <base-input v-model="user.id"
                                            class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input v-model="user.password"
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-checkbox>
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" v-on:click="login" class="my-4">LOGIN</base-button>
                                </div>
                            </form>
                            </div>

                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="#" class="text-light">
                                <small>Create new account</small>
                            </a>
                        </div>
                    </div>
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
            user : {
                id:'',
                password:''
            }
        }
    },
    
    methods: {
        login: function(event) {
            axios.get('http://localhost:3000/api/account', {
                id : this.id,
                password: this.password 
            }).then((response) => {
                alert('success login')
            },
            (error) => {
                alert(error.resopnse.data.error)
            }).catch(error => {
                alert(error)
            })
        }
    }
};
</script>
