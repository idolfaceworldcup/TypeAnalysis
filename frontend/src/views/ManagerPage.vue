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
        <h1>{{ msg }}</h1>  
        <h3> Name : {{user.loginId}} 님</h3>
          
      <section class="section section--demo-2">
      
      </section>
      <base-button block type="secondary" >
        <router-link to="/manageruser" >유저 관리 페이지로 이동</router-link>
      </base-button>
      <base-button block type="secondary" >
        <router-link to="/managerpic" >사진 관리 페이지로 이동</router-link>
      </base-button>
    </div>
  </section>
</template>

<script>
import { VueAgile } from 'vue-agile' 
import axios from 'axios'
import router from "../router"


  export default {
    name : 'mainpage',
    data() {
      return {
        msg: '관리자 페이지입니다.',
        user : {
          loginId :"Guest"
        }
      }
    },
    components: {
      agile: VueAgile
    },
    methods:{
      getUserData: function() {
        let self = this
        axios.get("localhost:3000/api/login/account")
        .then((response) => {
          self.$set(this, "user", response.data.user.loginId)
        })
        .catch((error) => {

          router.push("")
        })
      }
    },
    mounted() {
      this.getUserData()
    }
  };

</script>