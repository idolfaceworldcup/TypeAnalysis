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
      <h3> Name : {{user.name}} 님</h3>
      <h1>{{ msg }}</h1>      
      <section class="section section--demo-2">
      <div class="container-fluid">
        <div row>
          <div col-xs-12>
            <agile :initial-slide="2" :autoplay-speed="5000" :speed="2500" fade pause-on-hover pause-on-dots-hover autoplay >
              <img class="slide" src='../../public/img/images/메간폭스.jpg'> 
              <img class="slide" src='../../public/img/images/김영광.jpg'> 
              <img class="slide" src='../../public/img/images/드류베이모어.jpg'>
              <img class="slide" src='../../public/img/images/로버트_다우니_주니어.jpg'>  
              <img class="slide" src='../../public/img/images/니콜키드먼.jpg'>
              <img class="slide" src='../../public/img/images/박보검.jpg'>  
              <img class="slide" src='../../public/img/images/미란다커.jpg'>
              <img class="slide" src='../../public/img/images/라이언_레이놀즈.jpg'>
              <template slot="prevButton">
                <i class="ni ni-bold-left"></i>
              </template>
              <template slot="nextButton">
                <i class="ni ni-bold-right"></i>
              </template>
            </agile>
          </div>
        </div>
      </div>
      </section>
      <base-button block type="secondary" >
        <router-link to="/typeanalysis" >테스트 시작하기</router-link>
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
        msg: '이상형 월드컵에 오신걸 환영합니다.',
        user : {
          name :"Guest"
        }
      }
    },
    components: {
      agile: VueAgile
    },
    methods:{
      getUserData: function() {
        let self = this
        axios.get("${this.$store.state.host/api/login/account")
        .then((response) => {
          self.$set(this, "user", response.data.user)
        })
        .catch((error) => {

          router.push("/")
        })
      }
    },
    mounted() {
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