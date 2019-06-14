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
      <h3> Name : {{user.name}} 님</h3>
      <base-button type="Default" @click="gotoMyPage" v-if="user.id !== 0">MYPAGE</base-button>
      <base-button type="Default" @click="logoutUser" v-if="user.id !== 0">LOGOUT</base-button>
      <section class="section section--demo-2">
            <agile :initial-slide="2" :autoplay-speed="5000" :speed="2500" fade pause-on-hover pause-on-dots-hover autoplay >
              <div class="container pt-lg-md" v-for="(i, index) in images" :key="index">
                <div class="row justify-content-center">
                  <div class="col-md-6">
                    <card type="secondary" shadow>
                      <v-img :src="i.path" class="slide"></v-img>
                    </card>
                  </div>
                </div>
              </div>
              <template slot="prevButton">
                <i class="ni ni-bold-left"></i>
              </template>
              <template slot="nextButton">
                <i class="ni ni-bold-right"></i>
              </template>
            </agile>
      </section>
      <router-link to="/typeanalysis" >
        <base-button block type="secondary" >
          테스트 시작하기
        </base-button>
      </router-link>
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
        msg: '이상형 월드컵에 오신걸 환영합니다.',
        user : {
          id : 0,
          name :"Guest"
        },
        images : [
          {
            path : require(`../../public/img/analysis/image/pleasewait.jpg`),
          },
          {
            path : require(`../../public/img/analysis/image/pleasewait.jpg`),
          },
          {
            path : require(`../../public/img/analysis/image/pleasewait.jpg`),
          },
          {
            path : require(`../../public/img/analysis/image/pleasewait.jpg`),
          },
          {
            path : require(`../../public/img/analysis/image/pleasewait.jpg`),
          },
          {
            path : require(`../../public/img/analysis/image/pleasewait.jpg`),
          }
        ]
      }
    },
    components: {
      agile: VueAgile
    },

    methods:{
      gotoMyPage: function() {
        this.$router.push({
            name : "mypage",
        })
      },
      logoutUser: function(){
        axios.get('http://localhost:3000/api/auth/logout')
        .then((response) => {
            this.$router.push({
              name : "process"
            })
        })
        .catch((error) => {

        })
      },
      getSlideImage: function() {
        axios.get('http://localhost:3000/api/image/slide')
        .then((response) => {
          this.images = []
          this.images = response.data
        })
        .catch((error) => {
          
        })
      },
      getUserData: function() {
        axios.get('http://localhost:3000/api/auth/exist')
        .then((response) => {
          if(response.data.id !== undefined && response.data.authority === undefined) {
            this.user.name = response.data.loginId
            this.user.id = response.data.id
          }
        })
        .catch((error) => {
          
        })
      }
    },
    mounted () {
      this.getSlideImage()
      this.getUserData()
    }
  };

</script>

<style lang="sass">

	.section--demo-2
		.agile
			&__nav-button
				background: transparent
				border: none
				color: #fff
				cursor: pointer
				font-size: 24px
				height: 100%
				position: absolute
				top: 0
				transition-duration: .3s
				width: 80px

				&:hover
					background-color: rgba(#000, .5)
					opacity: 1

				&--prev
					left: 0

				&--next
					right: 0

			&__dots
				bottom: 10px
				left: 50%
				position: absolute
				transform: translateX(-50%)

			&__dot
				margin: 0 10px

				button
					background-color: transparent
					border: 1px solid #fff
					border-radius: 50%
					cursor: pointer
					display: block
					height: 10px
					font-size: 0
					line-height: 0
					margin: 0
					padding: 0
					transition-duration: .3s
					width: 10px

				&--current,
				&:hover
					button
						background-color: #fff

			// Slides styles
			.slide
				display: block
				object-fit: cover
				width: 100%
</style>