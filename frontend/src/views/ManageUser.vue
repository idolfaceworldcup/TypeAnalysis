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
              <div>
                <h3 class="headline mb-0">User Data</h3>
              </div>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            </v-card-title>
          </v-card>
            
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="accounts"
            item-key="loginId"
            class="elevation-1"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            sort-icon="mdi-menu-down"
          >
            <template v-slot:items="props">
              <td class="text-xs-left"></td>
              <td class="text-xs-left">{{ props.item.id }}</td>
              <td class="text-xs-center"></td>
              <td class="text-xs-center">{{ props.item.loginId }}</td>
              <td class="text-xs-right">
                <base-button
                  outline type = "secondary"
                  @click="editItem(props.item.id)"
                >
                  Edit
                </base-button>
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
          </v-data-table>
        </div>
        <modal :show.sync="modal">
          <template slot="header">
            <h5 class="modal-title">Input Password</h5>
          </template>
          <form role="form">
            <div>
                <v-container grid-list-md>
                  <base-input v-model="editedItem.id"
                                    type="hidden">
                  </base-input>
                  <base-input v-model="editedItem.password"
                              type="password"
                              placeholder="Password"
                              addon-left-icon="ni ni-lock-circle-open">
                  </base-input>
                  <base-input v-model="editedItem.passwordValid"
                              type="password"
                              placeholder="Password confirm"
                              addon-left-icon="ni ni-lock-circle-open">
                  </base-input>
                </v-container>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </form>
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

    data: () => ({
      modal : false,
      selected: [],
      headers: [
        { sortable: false },
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { sortable: false },
        { text: 'ACCOUNT', align: 'center', value: 'loginId', sortable: false },
        { sortable: false }
      ],
      accounts: [{ id : 1, loginId : 'test123'},{ id :2, loginId : 'test321'}],
      editedIndex: -1,
      editedItem: {
        id : 0,
        password: '',
        passwordValid: '',
      },
      defaultItem: {
        id : 0,
        password: '',
        passwordValid: '',
      }
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        axios.get(`http://localhost:3000/api/user/management/account`)
        .then((response) => {
          this.accounts = response.data
        })
        .catch((error) => {

        })
      },

      editItem (id) {
        this.modal = true
        this.editedItem.id = id
      },

      deleteItem (item) {
        if(confirm('Are you sure you want to delete this item?')) {
          let index = this.accounts.indexOf(item)
          axios.delete(`http://localhost:3000/api/user/management/account/`+ item.id)
          .then((response) => {
              alert('delete complete')
          })
          .catch((error) => {

          })
          this.accounts.splice(index, 1)
        }
      },

      close () {
        this.modal = false
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      },

      save () {
        if(confirm('Are you sure you want to edit this item?')) {
          axios.put(`http://localhost:3000/api/user/management/setting`, {
            account: this.editedItem
          })
          .then((response) => {
              alert ('Success Modify Account')
          })
          .catch(function (error) {
              alert(error)
          })
          this.close()
        }
        
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