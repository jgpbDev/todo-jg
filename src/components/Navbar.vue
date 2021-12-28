<template>
  <nav>
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
      <v-btn text color="grey">
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
export default {
  data: () => ({
    drawer: false,
    links: [
      { icon: "mdi-view-dashboard", text: "Home", route: "/" },
      { icon: "mdi-folder", text: "My projects", route: "/projects" },
      { icon: "mdi-account-multiple", text: "Team", route: "/team" },
    ],
  }),
};
</script>

<style></style>
