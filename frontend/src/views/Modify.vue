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
                            <div id = "modify">
                                <form role="form">
                                    <base-input v-model="email"
                                                class="mb-3"
                                                placeholder="Email"
                                                addon-left-icon="ni ni-email-83">
                                    </base-input>
                                    <base-input v-model="password"
                                                type="password"
                                                placeholder="Present Password"
                                                addon-left-icon="ni ni-lock-circle-open">
                                    </base-input>
                                    <base-input v-model="newpassword"
                                                type="password"
                                                placeholder="New Password"
                                                addon-left-icon="ni ni-lock-circle-open">
                                    </base-input>
                                    <div class="text-center">
                                        <base-button type="primary" class="my-4" v-on:click="modify">Modify account</base-button>
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
export default {
    data : function() {
        return {
            user : {
                email : '',
                password: '',
                newpassword: ''
            }
        }
    },
    methods:{
        modify: function(event){
            this.$http.post('', {
                user: this.user
            })
            .then(
                (response) => {
                    alert ('Success Modify Account')
                },
                (error) => {
                    alert(error.response.data.error)
                }
            )
            .catch(error => {
                alert(error)
            })
        }
    }
}
</script>

<style>

</style>
