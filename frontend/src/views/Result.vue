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
            <div>
              <base-button block type="secondary" @click="modals.modal1 = true">테스트 결과 보기</base-button>
              <modal :show.sync="modals.modal1">
                <h6 slot="header" class="modal-title" id="modal-title-default">{{loginId}}님의 테스트 결과</h6>
                <p v-html="content"></p>
                <div>
                  <img :src="path">
                </div>
                <template slot="footer">
                  <base-button type="link" class="ml-auto" @click="modals.modal1 = false">Close</base-button>
                </template>
              </modal>
            </div>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Modal from "@/components/Modal.vue";

let analysisData;
let analysisId;
let useImageId;

export default {
  components: {
    Modal
  },

  data: function() {
    return {
      modals: {
        modal1: false
      },
      content: "",
      loginId: "Guest",
      path: require(`../../public/img/analysis/image/pleasewait.jpg`)
    };
  },
  methods: {
    result: function() {
      axios
        .post(`http://localhost:3000/api/analysis/result/${analysisId}`, {
          analysisData: analysisData,
          useImageId: useImageId
        })
        .then(response => {
          this.content = response.data.content;
          this.path = `/analysis/image/` + response.data.imagePath;
        })
        .catch(error => {});
    },
    getUserData: function() {
      axios
        .get("http://localhost:3000/api/auth/exist")
        .then(response => {
          if (
            response.data.id !== undefined &&
            responsed.data.authority === undefined
          ) {
            this.loginId = response.data.loginId;
          }
        })
        .catch(error => {});
    }
  },

  mounted() {
    analysisData = this.$route.params.analysisData;
    analysisId = this.$route.params.analysisId;
    useImageId = this.$route.params.useImageId;
    this.getUserData();
    this.result();
  }
};
</script>

<style>
img {
  max-width: 100%; /* 이미지의 최대사이즈 */
  width/***/: auto; /* IE8 */
  height: auto;
  vertical-align: bottom;
}
</style>