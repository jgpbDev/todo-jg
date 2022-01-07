<template>
  <v-app>
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

export default {
  name: "App",
  components: {
    Navbar,
  },
  computed: {
    currentView() {
      return this.$route.name;
    }
  },
  data: () => ({
    //
  }),
};
</script>
