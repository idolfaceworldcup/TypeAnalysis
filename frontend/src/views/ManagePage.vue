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
        <h3> Name : {{manager.loginId}} 님</h3>
        <base-button type="Default" @click="logoutManager">LOGOUT</base-button>
      <div class="section">  
        <div class="row">
            <div class="col-md-6">
                <router-link to="/management/user" >
                    <base-button block type="secondary" >User Management</base-button>
                </router-link>
            </div>
            <div class="col-md-6">
                <router-link to="/management/analysis" >
                    <base-button block type="secondary" >Analysis Management</base-button>
                </router-link>
            </div>
        </div>
      </div>
      <section class="section section--demo-2">
        
      </section>
    </div>
  </section>
</template>

<script>
import { VueAgile } from 'vue-agile' 
import axios from 'axios'
import router from "../router"


  export default {
    name : 'management',
    data() {
      return {
        msg: '관리자 페이지입니다.',
        manager : {
          id : '',
          loginId : '',
          authority : ''
        }
      }
    },
    components: {
      agile: VueAgile
    },
    methods:{
      getUserData: function() {
        axios.get('http://localhost:3000/api/auth/exist')
        .then((response) => {
          if(response.data.id !== undefined && response.data.authority !== undefined) {
            this.manager.loginId = response.data.loginId
            this.manager.id = response.data.id
            this.manager.authority = response.data.authority
          }

          else {
            this.$router.push({
              name : "managerlogin"
            })
          }
        })
        .catch((error) => {
          this.$router.push({
            name : "managerlogin"
          })
        })
      },
      logoutManager: function(){
        axios.get('http://localhost:3000/api/auth/logout')
        .then((response) => {
            this.$router.push({
              name : "managerlogin"
            })
        })
        .catch((error) => {
          
        })
      }
    },
    created() {
      this.getUserData()
    }
  };

</script>