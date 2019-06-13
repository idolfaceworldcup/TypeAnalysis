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
            <v-card>
                <v-card-title>
                    Result History
                <v-spacer></v-spacer>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="results"
                    class="elevation-1"
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                    sort-icon="mdi-menu-down"
                >
                <template v-slot:items="props">
                  <td class="text-xs-left">{{ props.item.date }}</td>
                  <td class="justify-center layout px-0">
                    <base-button
                    outline type = "secondary"
                    @click='getResult(props.item.id)'
                    >
                    View Result
                    </base-button>
                  </td>
                </template>
                </v-data-table>
            </v-card>
        </div>
      <modal :show.sync="modal">
        <h6 slot="header" class="modal-title" id="modal-title-default">{{date}} Result</h6>
        <p v-html="content"></p>
        <div>
          <img :src="path">
        </div>

        <template slot="footer">
          <base-button type="link" class="ml-auto" @click='modal = false'>Close
          </base-button>
        </template>
      </modal>
    </section>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import Modal from "@/components/Modal.vue";

  export default {
    components: {
        Modal
    },

    data: function() {
      return {
        modal : false,
        headers: [
          { text: 'Date', align: 'left', value: 'date', sortable: false },
          { text: 'My Result', align: 'center', value: 'resultId', sortable: false }
        ],
        results: [],
        content : '',
        path : require(`../../public/img/analysis/image/pleasewait.jpg`),
        date : ''
      }
    },

    created () {
      this.getUserData()
      this.initialize()
    },

    methods: {
      getUserData: function() {
        axios.get('http://localhost:3000/api/auth/exist')
        .then((response) => {
            if(response.data.id === undefined || response.data.authority !== undefined) {
                this.$router.push({
                    name : "mainpage"
                })
            }
        })
        .catch(function (error) {
            this.$router.push({
                name : "mainpage"
            })
        })
      },
      initialize () {
        axios.get(`http://localhost:3000/api/user/result`)
        .then((response) => {
          this.results = response.data
        })
        .catch((error) => {

        })
      },

      getResult(id) {
          this.modal = true
          axios.get(`http://localhost:3000/api/user/result/${id}`)
          .then((response) => {
            this.content = response.data.content
            this.path = `/analysis/image/` + response.data.imagePath
            this.date = response.data.date
          })
          .catch((error) => {

          })
      }
    }
  }
</script>

<style>
img {
    max-width: 100%; /* 이미지의 최대사이즈 */
    width /***/: auto; /* IE8 */
    height: auto;
    vertical-align: bottom;
}
</style>