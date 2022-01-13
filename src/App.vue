<template>
  <v-app v-if="userLoggedIn === true || currentView === 'Login'">
    <v-container v-if="currentView !== 'Login'">
      <Navbar />
    </v-container>
    <v-main class="grey lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>


<script>
import Navbar from "@/components/Navbar";

import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
  }),
  methods: {
    ...mapActions(["checkAuth"])
  },
  computed: {
    ...mapState({
      session: state => state.session,
    }),
    currentView() {
      return this.$route.name;
    },
    userLoggedIn() {
      console.log('SESSION VALUE: ', this.session)
      return this.session !== false;
    }
  },
  created() {
    console.log(this.userLoggedIn);
    this.checkAuth();
  }
};
</script>
