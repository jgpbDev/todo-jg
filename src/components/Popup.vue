<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="secondary" elevation="0" v-bind="attrs" v-on="on">
        Add new project
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        Add a new project
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder"></v-text-field>
          <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil-outline"></v-textarea>
          
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field text label="Due date" prepend-icon="mdi-calendar-range" :value="formattedDate" v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>
          
          <v-btn text class="success mx-0 mt-3" @click="submit">Add project</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export default {
  data: () => ({
    dialog: false,
    title: "", 
    content: "",
    due: null   //To format the date we installed date-fns with npm
  }),
  methods: {
    submit() {
      typeof this.due == 'string' ? console.log('The date is a string: ', this.due) : console.log('The date is not a string: ', this.due);
    }
  },
  computed: {
    formattedDate() {
      // Here we have to notice that the library used changed and today doesn't have support for strings
      return this.due ? format(parseISO(this.due), 'do MMM yyyy') : '';
    }
  }
};
</script>

<style></style>
