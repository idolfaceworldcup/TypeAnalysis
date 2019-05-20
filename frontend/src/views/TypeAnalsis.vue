<template>

    <section class="section section-shaped my-0">
        <div class ="container pt-lg-md">
            <base-button v-b-modal.modal-1>Launch demo modal</base-button>

            <modal id="modal-1" title="BootstrapVue">
                <p class="my-4">Hello from modal!</p>
            </modal>
        </div>
        <div class ="container pt-lg-md">
            <base-alert id ="test" show variant="success">
                <h4 class="alert-heading">Well done!</h4>
                <p>
                Aww yeah, you successfully read this important alert message. This example text is going to
                run a bit longer so that you can see how spacing within an alert works with this kind of
                content.
                </p>
                <hr>
                <p class="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                </p>
            </base-alert>
            <base-button v-on:click="test">테스트 시작하기</base-button>
        </div>
            <div class="container pt-lg-md">
                <div class = "col-lg-5">
                    <card type="secondary" shadow
                        header-classes="bg-white pb-5"
                        body-classes="px-lg-5 py-lg-5"
                        class="border-0">
                        <template>
                            <div id ="men">
                                
                            </div>
                            <div id = "women">
                            </div>
                        </template>
                    </card>
                </div>
            </div>
    </section>

    
</template>

<script>
export default {
    data() {
      return {
        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false
      }
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>