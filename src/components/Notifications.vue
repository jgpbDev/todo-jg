<template>
  <div>
    <v-snackbar :value="logInSnackbar"  top color="success">
      <p class="mb-0">You're logged as <span class="font-weight-black">{{this.session.email}}</span></p> 
      <p class="mb-0">with uid <span class="font-weight-black">{{this.session.uid}}</span></p>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name:"Notifications",
  data: () => ({
    
  }),
  computed: {
    ...mapState({
      session: state => state.session,
    }),
    logInSnackbar() {
      return this.session !== null ? true : false;
    },
  }
}

</script>

<style>

</style>