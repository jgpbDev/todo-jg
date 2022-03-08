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
        <v-form id="addFormId" class="px-3" ref="form">      <!-- Important to give a reference to the form to use it in the Vue instance -->
          <v-text-field label="Title" v-model="taskData.title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
          <v-textarea label="Information" v-model="taskData.content" prepend-icon="mdi-pencil-outline"></v-textarea>
          <v-row dense no-gutters>
            <v-flex sm11>
              <v-text-field label="Tag" v-model="tag" prepend-icon="mdi-tag-text"></v-text-field>
            </v-flex>
            <v-flex sm1 class="d-flex align-center justify-center">
              <v-btn text class="ma-0" color="primary" fab x-small dark @click="addTag(tag)">
                <v-icon small>mdi-plus-circle</v-icon>
              </v-btn>
            </v-flex>
          </v-row>
          <v-row dense no-gutters class="mx-4">
            <v-chip v-for="(tag,index) in taskData.tags" :key="index" small class="secondary white--text caption mr-1 mb-1">{{tag}}</v-chip>
          </v-row>
          
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field class="mt-6" text label="Due date (click to set)" prepend-icon="mdi-calendar-range" :value="formattedDate" v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="calendarPickerDate"></v-date-picker>
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
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    loading: false,
    tag: '',
    calendarPickerDate: '',
    taskData: {
      title: "",
      tags: [], 
      content: "",
      person: 'jgpbDev',
      status: 'ongoing',
      due: '',   //To format the date we installed date-fns with npm
    },
    inputRules: [
      v => (v || '').length >= 3 || `A minimum of 3 characters is required`
    ]
  }),
  methods: {
    addTag(tag){
      this.taskData.tags.push(tag);
      this.tag = ''
      console.warn('addTag() called');
    },
    ...mapActions(["addDoc"]),
    // This was problematic because in the end we import the addDoc and the collection functions in this 
    // document instead of in the fb.js file, also we declared as an async function this submit method
    async submit() {
      if(this.$refs.form.validate()){
        this.loading = true;
        this.taskData.createdAt = this.currentFormattedDate;
        this.taskData.due = this.formattedDate;

        await this.addDoc(this.taskData).then(() => {
          console.log('Added to DB');
          this.dialog = false;
          this.loading = false;
          this.taskData.tags = [];
          this.$refs.form.reset();
          this.$emit('taskAdded');
        });
      }
    }
  },
  computed: {
    formattedDate() {
      // Here we have to notice that the library used changed and today doesn't have support for strings
      return this.calendarPickerDate ? format(parseISO(this.calendarPickerDate), 'do MMM yyyy') : '';
    },
    currentFormattedDate() {
      const y = new Date().getFullYear();
      const m = ("0" + (new Date().getMonth() + 1)).slice(-2);
      const d = ("0" + new Date().getDate()).slice(-2);
      const currentDate = y + '-' + m + '-' + d;

      return format(parseISO(currentDate), 'do MMM yyyy')
    },
  },
  created() {
  }
};
</script>

<style>
#addFormId .v-icon { 
    color: #219C3D;
}
</style>
