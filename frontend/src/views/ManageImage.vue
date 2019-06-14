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
            <base-button outline type='danger' @click="deleteSelectedItem(selected)">Checked Delete</base-button>
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
              <img :src="image[0].path">
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
      ],
      image : [
          {
            id : 1,
            path : require('../../public/img/analysis/image/pleasewait.jpg'),
            attributeName : '머리길이',
            attributeValue : '보통'
          }
      ],
      editedIndex: -1,
      editedItem : {
        analysisId : '',
        attributes : [],
        values : []
      },
      attributes : [],
    }),

    created () {
      this.getUserData()
      this.analysisId = this.$route.params.analysisId
      this.initialize()
      this.setAttribute()
    },

    methods: {
      getUserData: function() {
        axios.get('http://localhost:3000/api/auth/exist')
        .then((response) => {
            if(response.data.id === undefined || response.data.authority === undefined) {
                this.$router.push({
                    name : "managerlogin"
                })
            }
        })
        .catch(function (error) {
            this.$router.push({
                name : "managerlogin"
            })
        })
      },
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
          this.image[0].path = `/analysis/image/${this.image[0].path}`
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
        if(confirm('Are you sure you want to delete?')) {
          axios.delete(`http://localhost:3000/api/analysis/management/image/` + item.id, {data : { path : item.path }})
          .then((response) => {
              let index = this.images.indexOf(item)
              this.images.splice(index, 1)
              alert('delete complete')
              
          })
          .catch((error) => {

          })
        }
      },
      deleteSelectedItem (item) {
        if(confirm('Are you sure you want to delete?')) {
          axios.delete(`http://localhost:3000/api/analysis/management/image`, {data : { images : item }})
          .then((response) => {
              for(let i of item) {
                let index = this.images.indexOf(i)
                this.images.splice(index, 1)
              }
              alert('delete complete')
              
          })
          .catch((error) => {

          })
        }
      },

      closeFormModal () {
        this.modals.form = false
        this.editedItem = {
          analysisId : '',
          attributes : [],
          values : []
        }
        this.file = null
      },

      closeImageModal () {
        this.modals.image = false
      },
      save () {
        if(confirm('Are you sure you want to create this item?')) {
          let formData = new FormData();
          let fileName
          let item = this.editedItem

          formData.append('imageFile', this.file);
          formData.append('analysisId', item.analysisId);

          axios.post('http://localhost:3000/api/analysis/image/upload/', formData,
              {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }})
          .then((response) => {
            fileName = response.data
          }).then((response) => {
            axios.post(`http://localhost:3000/api/analysis/management/image`, {
              image : item,
              fileName : fileName
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