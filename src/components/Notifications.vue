<template>
  <v-snackbar :value="logInSnackbar" :timeout="4000" top color="success">
    <span>You're logged as {{this.session.email}} with uid {{this.session.uid}}</span>
    <v-btn text class="ml-3" color="white" @click="logInSnackbar = false">Okay</v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name:"Notifications",
  computed: {
    ...mapState({
      session: state => state.session,
    }),
    logInSnackbar() {
      return this.session !== false ? true : false;
    }
  }
}
</script>

<style>

</style>