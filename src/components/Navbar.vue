<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! Task added successfully:)</span>
      <v-btn text class="ml-3" color="white" @click="snackbar = false">Okay</v-btn>
    </v-snackbar>


    <v-app-bar flat app class="grey lighten-4">
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>JG</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- Dropdown menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="grey" v-bind="attrs" v-on="on">
            <v-icon>
              mdi-chevron-down
            </v-icon>  
            Menu 
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey" :loading="loading" @click="logout">
        <span>Sign out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/dori-avatar.png">
          </v-avatar>
        </v-flex>
        <p class="white--text subheading mt-3">jgpbDev</p>
        <v-flex class="mt-4 mb-3">
          <Popup @taskAdded="snackbar = true"/>
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from './Popup.vue'
import store from '@/store/store';

import { mapActions } from "vuex";

export default {
  components: {
    Popup,
  },
  data: () => ({
    drawer: false,
    snackbar: false,
    loading: false,
    store : store,
    links: [
      { icon: "mdi-view-dashboard", text: "Home", route: "/home" },
      { icon: "mdi-folder", text: "My tasks", route: "/tasks" },
      { icon: "mdi-account-multiple", text: "Team", route: "/team" },
    ],
  }),
  methods: {
    ...mapActions(["signOut"]),
    logout() {
      this.loading = true;    //This could be listened in the state
      this.signOut();
      this.loading = false;
    }
  },
  computed: {
  },
  created() {
  }
};
</script>

<style></style>
