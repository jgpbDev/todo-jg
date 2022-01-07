<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="secondary" elevation="0" v-bind="attrs" v-on="on">
        Add new task
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        Add a new task
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">      <!-- Important to give a reference to the form to use it in the Vue instance -->
          <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
          <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil-outline" :rules="inputRules"></v-textarea>
          
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field text label="Due date" prepend-icon="mdi-calendar-range" :value="formattedDate" v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="due"></v-date-picker>
          </v-menu>
          
          <v-btn text class="success mx-0 mt-3" @click="submit" :loading="loading">Add task</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import db from '@/fb'
import { collection, addDoc } from 'firebase/firestore';

export default {
  data: () => ({
    dialog: false,
    loading: false,
    title: "", 
    content: "",
    due: null,   //To format the date we installed date-fns with npm
    inputRules: [
      v => (v || '').length >= 3 || `A minimum of 3 characters is required`
    ]
  }),
  methods: {
    // This was problematic because in the end we import the addDoc and the collection functions in this 
    // document instead of in the fb.js file, also we declared as an async function this submit method
    async submit() {
      if(this.$refs.form.validate()){
        this.loading = true;

        await addDoc(collection(db, "tasks"), {
          title: this.title,
          content: this.content,
          due: format(parseISO(this.due), 'do MMM yyyy'),
          person: 'jgpbDev',
          status: 'ongoing'
        }).then(() => {
          console.log('Added to DB');
          this.dialog = false;
          this.loading = false;
          this.$emit('taskAdded');
        });
      }
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
