<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="secondary" elevation="0" v-bind="attrs" v-on="on">
        Add new project
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Add a new project
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder"></v-text-field>
          <v-textarea label="Information" v-model="content" prepend-icon="mdi-pencil-outline"></v-textarea>
          <v-btn text class="success mx-0 mt-3" @click="submit">Add project</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    title: "", 
    content: "",
  }),
  methods: {
    submit() {
      console.log(this.title, this.content)
    }
  }
};
</script>

<style></style>
