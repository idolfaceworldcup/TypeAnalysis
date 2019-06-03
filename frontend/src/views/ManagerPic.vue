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
            <v-dialog v-model="dialog" max-width="500px" height="300px">
              <template v-slot:activator="{ on }">
                <base-button outline type='secondary' v-on="on">New Item</base-button >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.loginId" label="LoginID"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.createdDate" label="createdDate"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedItem.modifiedDate" label="modifiedDate"></v-text-field>
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
            :items="desserts"
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
              <td class="text-xs-left">{{ props.item.calories }}</td>
              <td class="text-xs-left">{{ props.item.fat }}</td>
              <td class="text-xs-left">{{ props.item.createdDate }}</td>
              <td class="text-xs-left">{{ props.item.modifiedDate }}</td>
              <td class="justify-center layout px-0">
                <base-button
                  outline type = "secondary"
                  @click="editItem(props.item)"
                >
                  edit
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
  </section>
</template>


<script>
import 'vuetify/dist/vuetify.min.css'

  export default {
    data: () => ({
      selected: [],
      dialog: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        modifiedDate: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
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
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            createdDate: 24,
            modifiedDate: 4.0
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            createdDate: 37,
            modifiedDate: 4.3
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            createdDate: 23,
            modifiedDate: 6.0
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            createdDate: 67,
            modifiedDate: 4.3
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            createdDate: 49,
            modifiedDate: 3.9
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            createdDate: 94,
            modifiedDate: 0.0
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            createdDate: 98,
            modifiedDate: 0
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carcreatedDatebs: 87,
            modifiedDate: 6.5
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>


