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
    </div>
  </section>
</template>

<script>
import VueDisplacementSlideshow from "../vue-displacement-slideshow";

  export default {
    name: 'mainpage',
    data() {
      return {
        msg: '이상형 월드컵에 오신걸 환영합니다.',
      }
    },
    components: {
      VueDisplacementSlideshow,
    },
    computed: {
      images() {
        return [
          require("../../public/img/images/나탈리도메르.jpg")
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
