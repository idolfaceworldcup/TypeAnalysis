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
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div id="modify">
                <form role="form">
                  <base-input
                    v-model="account.password"
                    type="password"
                    placeholder="Present Password"
                    addon-left-icon="ni ni-lock-circle-open"
                  ></base-input>
                  <base-input
                    v-model="account.newpassword"
                    type="password"
                    placeholder="New Password"
                    addon-left-icon="ni ni-lock-circle-open"
                  ></base-input>
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
import axios from "axios";

let id;

export default {
  data: function() {
    return {
      account: {
        password: "",
        newpassword: ""
      }
    };
  },
  methods: {
    getUserData: function() {
      axios
        .get("http://localhost:3000/api/auth/exist")
        .then(response => {
          if (
            response.data.id === undefined ||
            response.data.authority !== undefined
          ) {
            this.$router.push({
              name: "mainpage"
            });
          }
        })
        .catch(function(error) {
          this.$router.push({
            name: "mainpage"
          });
        });
    },
    modify: function(event) {
      axios
        .put(`http://localhost:3000/api/user/setting`, {
          account: this.account
        })
        .then(response => {
          alert("Success Modify Account");
          this.$router.push({
            name: "mainpage"
          });
        })
        .catch(function(error) {
          alert(error);
        });
    }
  },

  created() {
    this.getUserData();
  }
};
</script>

<style>
</style>
