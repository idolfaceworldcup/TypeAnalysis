<template>
  <section class="section section-shaped section-lg my-0">
    <div class="container pt-lg-md"> 
      <h1>{{ msg }}</h1>
      <vue-displacement-slideshow
            :images="images"
            displacement=""
            :intensity="0.2"
            :speedIn="1.4"
            :speedOut="1.4"
            ease="Expo.easeInOut"
            ref="slideshow">
      </vue-displacement-slideshow>
      
      <base-button block type="secondary" >
        <router-link to="/TypeAnalsis" >테스트 시작하기</router-link>
      </base-button>
      
      
    </div>
    
  </section>
</template>

<script>
import VueDisplacementSlideshow from "vue-displacement-slideshow";
import VueTinySlider from 'vue-tiny-slider';
  export default {
    name: 'mainpage',
    data() {
      return {
        msg: '이상형 월드컵에 오신걸 환영합니다.',
      }
    },
    components: {
      'vue-displacement-slideshow' : VueDisplacementSlideshow,
      'tiny-slider' : VueTinySlider
    },
    computed: {
      images() {
        return [
          require("../../public/img/images/나탈리도메르.jpg"),
          require("../../public/img/images/니콜키드먼.jpg"),
          require("../../public/img/images/드류베이모어.jpg"),
          require("../../public/img/images/메간폭스.jpg")
        ];
      }
    },
    methods: {
      init() {
      //We loop through all our images by calling the 'next' method of our component every 2 seconds
        setInterval(() => {
          this.$refs.slideshow.next();
        }, 2000);      
      }
    },
    mounted() {
      this.init();
    }
  };

</script>
