<template id="typeanalysis">
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
      <base-button block type="secondary" @click="modals.modal1 = true">RULE</base-button>
      <modal :show.sync="modals.modal1">
        <p>테스트는 이미지 두 장 중에 선호하는 이미지를 선택(클릭)하시면 됩니다.</p>
        <p>이미지를 선택하실 때는 가능한 당신이 가지고 있던 이미지에 대한 생각과 인상을 배제하고 이미지로만 평가하는 편이 정확한 분석에 도움이 됩니다.</p>
        <p>테스트는 20회 이상의 선택으로 이루어지며 테스트가 종료되면 분석을 통해 당신에게 결과를 보여줍니다.</p>
        <p>당신이 계정에 로그인 한 상태에서 테스트를 한다면 테스트의 결과 값을 저장하여 my page를 통해 당신의 결과들을 다시 볼 수 있지만 Guest 상태에서는 다시 결과를 볼 수는 없습니다.</p>
        <p>테스트는 횟수에 제한이 없으며 테스트의 목적이 정확성보다 흥미이기 때문에 결과가 어느정도 변할 수 있습니다.</p>

        <template slot="footer">
          <base-button type="link" class="ml-auto" @click="modals.modal1 = false">Close</base-button>
        </template>
      </modal>

      <div class="section">
        <div class="row">
          <div class="col-md-6" v-for="(a, id) in analysis" :key="id">
            <router-link :to="{ name: 'analyzer', params: { analysisId : a.id } }">
              <base-button block type="secondary">{{ a.name }}</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";
let analysisId = 1;
export default {
  components: {
    Modal
  },
  data() {
    return {
      modals: {
        modal1: false
      },

      analysis: []
    };
  },

  created() {
    axios
      .get("http://localhost:3000/api/analysis/analysises")
      .then(response => {
        this.analysis = response.data;
      })
      .catch(function(error) {
        alert(error);
        this.$router.push({
          name: "mainpage"
        });
      });
  }
};
</script>

