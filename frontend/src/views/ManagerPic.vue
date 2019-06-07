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
                <h3 class="headline mb-0">Image Data</h3>
              </div>
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
                        <v-flex xs4 md4>
                          <v-text-field v-model="editedItem.name" label="name"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.hairlength" label="hairlength"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.hairstyle" label="hairstyle"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.eyes" label="eyes"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.colors" label="colors"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.humanRace" label="humanRace"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                          <v-text-field v-model="editedItem.style" label="style"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
              </div>
              <template>
                <div>
                  <!-- Styled -->
                  <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    placeholder="Choose a file..."
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                  <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

                  <!-- Plain mode -->
                  <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
                  <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div>
                </div>
              </template>
              <template>
                <base-button type="secondary" @click="modals.modal1 = false"> Close </base-button>
                <base-button type="secondary" @click="save"> Save </base-button>
              </template>
            </modal>
            </v-card-title>
          </v-card>
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
      file: null,
      file2: null,
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
          value: 'name'
        },
        { text: '머리길이', value: 'hairlength',sortable: false },
        { text: '앞머리', value: 'hairstyle',sortable: false },
        { text: '눈 종류', value: 'eyes',sortable: false },
        { text: '피부색', value: 'colors',sortable: false },
        { text: '인종', value: 'humanRace', sortable: false },
        { text: '스타일', value: 'style', sortable: false }
      ],
      ImageData: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        hairlength: '',
        hairstyle: '',
        eyes: '',
        colors: '',
        humanRace: '',
        style: ''
      },
      defaultItem: {
        name: '',
        hairlength: '',
        hairstyle: '',
        eyes: '',
        colors: '',
        humanRace: '',
        style: ''
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
            hairlength: '장발',
            hairstyle: '내림',
            eyes: '고양이',
            colors: '흰 피부',
            humanRace: '백인',
            style: '훈훈'
          },
          {
            name: 'Ice cream sandwich',
            hairlength: '장발',
            hairstyle: '내림',
            eyes: '고양이',
            colors: '흰 피부',
            humanRace: '백인',
            style: '훈훈'
          },
          {
            name: 'Eclair',
            hairlength: '장발',
            hairstyle: '내림',
            eyes: '고양이',
            colors: '흰 피부',
            humanRace: '백인',
            style: '훈훈'
          },
          {
            name: 'Cupcake',
            hairlength: '장발',
            hairstyle: '내림',
            eyes: '고양이',
            colors: '흰 피부',
            humanRace: '백인',
            style: '훈훈'
          },
          {
            name: 'Gingerbread',
            hairlength: '장발',
            hairstyle: '내림',
            eyes: '고양이',
            colors: '흰 피부',
            humanRace: '백인',
            style: '훈훈'
          },
          {
            name: 'Jelly bean',
            hairlength: '장발',
            hairstyle: '내림',
            eyes: '고양이',
            colors: '흰 피부',
            humanRace: '백인',
            style: '훈훈'
          },
          {
            name: 'Lollipop',
            hairlength: '장발',
            hairstyle: '내림',
            eyes: '고양이',
            colors: '흰 피부',
            humanRace: '백인',
            style: '훈훈'
          },
          {
            name: 'Honeycomb',
            hairlength: '장발',
            hairstyle: '내림',
            eyes: '고양이',
            colors: '흰 피부',
            humanRace: '백인',
            style: '훈훈'
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