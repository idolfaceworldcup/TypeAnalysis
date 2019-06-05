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
            <v-toolbar-title>Image Data</v-toolbar-title>
            <v-divider
              class="mx-2"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <base-button outline type='secondary' @click="modals.modal1 = true">New Data</base-button>
            <modal :show.sync="modals.modal1">
              <template slot="header">
                <h5 class="modal-title">Input Image Data</h5>
              </template>
              <div>
                <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.loginId" label="LoginID"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.hairstyle" label="eyes"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.eyes" label="colors"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.colors" label="colors"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.humanRace" label="colors"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.style" label="colors"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
              </div>
              <template>
                <base-button type="secondary" @click="modals.modal1 = false"> Close </base-button>
                <base-button type="secondary" @click="save"> Save </base-button>
              </template>
            </modal>
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{on}">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{formTitle}}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.loginId" label="LoginID"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.hairstyle" label="eyes"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.eyes" label="colors"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.colors" label="colors"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.humanRace" label="colors"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.style" label="colors"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>

          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="ImageData"
            item-key="name"
            select-all
            class="elevation-1"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            sort-icon="mdi-menu-down"
          >
            <template v-slot:items="props">
              <td>
                <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td>{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.hairlength }}</td>
              <td class="text-xs-left">{{ props.item.hairstyle }}</td>
              <td class="text-xs-left">{{ props.item.eyes }}</td>
              <td class="text-xs-left">{{ props.item.colors }}</td>
              <td class="text-xs-left">{{ props.item.humanRace }}</td>
              <td class="text-xs-left">{{ props.item.style }}</td>
              <td class="justify-center layout px-0">
                <base-button outline type='secondary' @click="modals.modal2 = true">Image</base-button >
                <modal :show.sync="modals.modal2">
                  <img src="../../public/img/analysis/image/analysis_man/강동원.jpg">
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
          </v-data-table>
        </div>
  </section>
</template>


<script>
import 'vuetify/dist/vuetify.min.css';
import Modal from "@/components/Modal.vue";
import ImageUploader from 'vue-image-upload-resize'

  export default {
    components: {
        Modal
    },
    data: () => ({
      modals :{
                modal1 : false,
                modal2 : false
            },
      selected: [],
      dialog: false,
      headers: [
        {
          text: '이미지 이름',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '머리길이', value: 'hairlength' },
        { text: '앞머리', value: 'hairstyle' },
        { text: '눈 종류', value: 'eyes' },
        { text: '피부색', value: 'colors' },
        { text: '인종', value: 'humanRace', sortable: false },
        { text: '스타일', value: 'style', sortable: false }
      ],
      ImageData: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        hairlength: 0,
        hairstyle: 0,
        eyes: 0,
        colors: 0,
        humanRace: 0,
        style: 0
      },
      defaultItem: {
        name: '',
        hairlength: 0,
        hairstyle: 0,
        caeyesrbs: 0,
        colors: 0,
        humanRace: 0,
        style: 0
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
        this.ImageData = [
          {
            name: 'Frozen Yogurt',
            hairlength: 159,
            hairstyle: 6.0,
            eyes: 24,
            colors: 4.0,
            humanRace: 0,
            style: 0
          },
          {
            name: 'Ice cream sandwich',
            hairlength: 237,
            hairstyle: 9.0,
            eyes: 37,
            colors: 4.3,
            humanRace: 0,
            style: 0
          },
          {
            name: 'Eclair',
            hairlength: 262,
            hairstyle: 16.0,
            eyes: 23,
            colors: 6.0,
            humanRace: 0,
            style: 0
          },
          {
            name: 'Cupcake',
            hairlength: 305,
            hairstyle: 3.7,
            eyes: 67,
            colors: 4.3,
            humanRace: 0,
            style: 0
          },
          {
            name: 'Gingerbread',
            hairlength: 356,
            hairstyle: 16.0,
            eyes: 49,
            colors: 3.9,
            humanRace: 0,
            style: 0
          },
          {
            name: 'Jelly bean',
            hairlength: 375,
            hairstyle: 0.0,
            eyes: 94,
            colors: 0.0,
            humanRace: 0,
            style: 0
          },
          {
            name: 'Lollipop',
            hairlength: 392,
            hairstyle: 0.2,
            eyes: 98,
            colors: 0,
            humanRace: 0,
            style: 0
          },
          {
            name: 'Honeycomb',
            hairlength: 408,
            hairstyle: 3.2,
            careyesbs: 87,
            colors: 6.5,
            humanRace: 0,
            style: 0
          }
        ]
      },
      setImage: function(output) {
        this.hasImage = true;
        this.image = output;
        console.log(this.image);
      },

      editItem (item) {
        this.editedIndex = this.ImageData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
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
          Object.assign(this.ImageData[this.editedIndex], this.editedItem)
        } else {
          this.ImageData.push(this.editedItem)
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