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
          <v-toolbar flat color="dark">
            <h4>User Data</h4>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-toolbar>

          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="accounts"
            :search="search"
            item-key="loginId"
            class="elevation-1"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            sort-icon="mdi-menu-down"
          >
            <template v-slot:items="props">
              <td>{{ props.item.loginId }}</td>
              <td class="text-xs-left">{{ props.item.modifiedDate }}</td>
              <td class="justify-center layout px-0">
                <base-button
                  outline type = "secondary"
                  @click="modal = true"
                >
                  Analyzer result
                </base-button>
                <modal :show.sync="modal">
                  <h6 slot="header" class="modal-title" id="modal-title-default">{{loginId}}님의 테스트 결과</h6>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and
                        Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                        right at the coast of the Semantics, a large language ocean.</p>
                    <p>A small river named Duden flows by their place and supplies it with the necessary
                        regelialia. It is a paradisematic country, in which roasted parts of sentences
                        fly into your mouth.</p>
                        
                      <div>
                          <img :src="require('../../public/img/analysis/image/analysis_man/강동원.jpg')">
                      </div>

                    <template slot="footer">
                        <base-button type="link" class="ml-auto" @click="modals.modal1 = false">Close
                        </base-button>
                    </template>
                </modal>
                <base-button
                  outline type = "danger"
                  @click="deleteItem(props.item)"
                >
                  delete
                </base-button>
              </td>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
            <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
                </v-alert>
            </template>
          </v-data-table>
        </div>
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

    data: () => ({
      modal : false,
      selected: [],
      dialog: false,
      headers: [
        {
          text: 'LoginId',
          align: 'left',
          sortable: false,
          value: 'loginId'
        },
        { text: 'createdDate', value: 'date', sortable: false },
        { text: 'modifiedDate', value: 'date',sortable: false }
      ],
      accounts: [],
      editedIndex: -1,
      editedItem: {
        loginId: '',
        createdDate: 0,
        modifiedDate: 0
      },
      defaultItem: {
        loginId: '',
        createdDate: 0,
        modifiedDate: 0
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.accounts = [
          {
            loginId: 'Frozen Yogurt',
            createdDate: 24,
            modifiedDate: 4.0
          },
          {
            loginId: 'Ice cream sandwich',
            createdDate: 37,
            modifiedDate: 4.3
          },
          {
            loginId: 'Eclair',
            createdDate: 23,
            modifiedDate: 6.0
          },
          {
            loginId: 'Cupcake',
            createdDate: 67,
            modifiedDate: 4.3
          },
          {
            loginId: 'Gingerbread',
            createdDate: 49,
            modifiedDate: 3.9
          },
          {
            loginId: 'Jelly bean',
            createdDate: 94,
            modifiedDate: 0.0
          },
          {
            loginId: 'Lollipop',
            createdDate: 98,
            modifiedDate: 0
          },
          {
            loginId: 'Honeycomb',
            carcreatedDatebs: 87,
            modifiedDate: 6.5
          }
        ]
      },

      resultData() {

      },

      editItem (item) {
        this.editedIndex = this.accounts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.accounts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.accounts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.accounts[this.editedIndex], this.editedItem)
        } else {
          this.accounts.push(this.editedItem)
        }
        this.close()
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