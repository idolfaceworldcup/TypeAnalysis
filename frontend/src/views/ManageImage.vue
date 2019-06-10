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
            <base-button outline type='secondary' @click="createItem">New Data</base-button>
            </v-card-title>
          </v-card>


            <modal :show.sync="modals.form">
              <form role="form">
                <div>
                    <v-container grid-list-md>
                        <base-input v-model="editedItem.analysisId"
                                    type="hidden">
                        </base-input>
                        <base-input v-model="editedItem.attributes"
                                    type="hidden">
                        </base-input>
                        <div v-for="(attribute, id) in attributes" :key="id">
                          {{attribute.name}}<base-input class="mb-3" v-model="editedItem.values[id]"></base-input>
                        </div>
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
                    <!-- Plain mode
                    <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
                    <div class="mt-3">Selected file: {{ file2 ? file2.name : '' }}</div> -->
                  </div>
                </template>
                <template>
                  <base-button type="secondary" @click="closeFormModal"> Close </base-button>
                  <base-button type="secondary" @click="save"> Save </base-button>
                </template>
              </form>
            </modal>


          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="images"
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
              <td class="text-xs-left">{{ props.item.id }}</td>
              <td class="text-xs-center"></td>
              <td class="text-xs-center">{{ props.item.path }}</td>
              <td class="text-xs-right">
              <td class="justify-center layout px-0">
                <base-button outline type='secondary' @click="viewImage(props.item)">Image</base-button >
                <base-button
                  outline type = "danger"
                  @click="deleteItem(props.item)"
                >
                  DELETE
                </base-button>
              </td>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </div>


        <modal :show.sync="modals.image">
          <template>
            <div>
              <img :src="require(`../../public/img/analysis/image/${image[0].path}`)">
            </div>
          </template>
          <template>
            <div class="text-xs-right m-1">
              <div v-for="(i, id) in image" :key="id">
                <span>{{i.attributeName}} : {{i.attributeValue}}</span>
              </div>
              <base-button type="secondary" @click="closeImageModal">Close</base-button>
            </div>
          </template>
        </modal>


  </section>

</template>


<script>
import 'vuetify/dist/vuetify.min.css';
import Modal from "@/components/Modal.vue";
import ImageUploader from 'vue-image-upload-resize'
import axios from 'axios'

  export default {
    components: {
        Modal
    },
    data: () => ({
      analysisId : 0,
      file: null,
      file2: null,
      modals :{
                form : false,
                image : false
            },
      selected: [],
      headers: [
        {
          text: 'ID',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { sortable: false },
        { text: 'PATH', align: 'center', value: 'path', sortable: false },
        { sortable: false },
        { sortable: false }
      ],
      images : [
          {
            id : 1,
            path : 'analysis_man/강하늘.jpg'
          },
          {
            id : 2,
            path : 'analysis_man/강동원.jpg'
          }
      ],
      image : [
          {
            id : 1,
            path : 'analysis_man/공유.jpg',
            attributeName : '머리길이',
            attributeValue : '보통'
          },
          {
            id : 2,
            path : '',
            attributeName : '스타일',
            attributeValue : '카리스마'
          }
      ],
      editedIndex: -1,
      editedItem : {
        path : '',
        analysisId : '',
        attributes : [],
        values : []
      },
      defaultItem : {
        path : '',
        analysisId : '',
        attributes : [],
        values : []
      },
      attributes : [{
        id : 1,
        name : '머리길이'
      },
      {
        id : 2,
        name : '하이욤'
      }],
    }),

    created () {
      this.analysisId = this.$route.params.analysisId
      this.initialize()
      this.setAttribute()
    },

    methods: {
      initialize () {
        axios.get(`http://localhost:3000/api/analysis/management/image/` + this.analysisId)
        .then((response) => {
          this.images = response.data
        })
        .catch((error) => {

        })
      },
      setAttribute () {
        axios.get(`http://localhost:3000/api/analysis/management/image/attribute/` + this.analysisId)
        .then((response) => {
          this.attributes = response.data
        })
        .catch((error) => {

        })
      },
      viewImage (item) {
        this.modals.image = true
        axios.get(`http://localhost:3000/api/analysis/management/image/value/` + item.id)
        .then((response) => {
          this.image = response.data
        })
        .catch((error) => {

        })
      },

      createItem () {
        this.modals.form = true
        this.editedItem.analysisId = this.analysisId
        this.editedItem.attributes = this.attributes
      },

      deleteItem (item) {
        if(confirm('Are you sure you want to delete this item?')) {
          let index = this.images.indexOf(item)
          axios.delete(`http://localhost:3000/api/analysis/management/image/` + item.id)
          .then((response) => {
              alert('delete complete')
          })
          .catch((error) => {

          })
          this.images.splice(index, 1)
        }
      },

      closeFormModal () {
        this.modals.form = false
        this.editedItem = Object.assign({}, this.defaultItem)
      },

      closeImageModal () {
        this.modals.image = false
      },
      save () {
        if(confirm('Are you sure you want to create this item?')) {
          let formData = new FormData();
          let path
          let item = this.editedItem
          if(this.analysisId == 1) {
            formData.append('man', this.file);

            axios.post('http://localhost:3000/api/analysis/image/upload/man', formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
            .then((response) => {
              path = response.data
              alert('success')
            }).then((response) => {
              axios.post(`http://localhost:3000/api/analysis/management/image`, {
                image : item,
                path : path
              })
              .then((response) => {
                  this.images.push(response.data)
                  alert ('Success Create Image')
              })
              .catch(function (error) {
                  alert(error)
              })
            })
            .catch(function(error){
              alert('fail')
            })
          }

          else if(this.analysisId == 2) {
            formData.append('woman', this.file);

            axios.post('http://localhost:3000/api/analysis/image/upload/woman', formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
            .then((response) => {
              path = response.data
              alert('success')
            }).then((response) => {
              axios.post(`http://localhost:3000/api/analysis/management/image`, {
                image : item,
                path : path
              })
              .then((response) => {
                  this.images.push(response.data)
                  alert ('Success Create Image')
              })
              .catch(function (error) {
                  alert(error)
              })
            })
            .catch(function(error){
              alert('fail')
            })
          }
          this.closeFormModal()
          }
      },

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