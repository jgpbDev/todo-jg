<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="dark_green" dark elevation="0" v-bind="attrs" v-on="on">
        Upload an image
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        Upload your image!
      </v-card-title>
      <v-card-text>
        <v-form id="addFormId" class="px-3" ref="form">      <!-- Important to give a reference to the form to use it in the Vue instance -->
          <v-file-input
            label="Image file"
            @change="setImage"
            prepend-icon="mdi-file-image"
          ></v-file-input>
          
          <v-btn text class="success mx-0 mt-3" @click="submitImg" :loading="loading">Upload image</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    loading: false,
    imageData: null
  }),
  methods: {
    ...mapActions(["uploadImg"]),
    setImage(e){
      this.imageData = e
    },
    async submitImg() {
      if(this.$refs.form.validate()){
        console.warn("this is the imgData: ", this.imageData)
        this.loading = true;
        await this.uploadImg(this.imageData).then(() => {
          console.log('Added to DB');
          this.dialog = false;
          this.loading = false;
          this.$refs.form.reset();
          this.$emit('imgUploaded');
        });
      }
    }
  },
  computed: {
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
