<template>
  <div class="team mx-4 mb-4">
    <h1 class="subheading grey--text">Team</h1>

    <v-container class="my-5">

      <v-row>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-center ma-3">                    <!-- Text utility class inside Vuetify -->
            <v-responsive class="pt-4">
              <v-avatar size="100" class="green lighten-2">
                <img :src="person.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{person.name}}</div>
              <div class="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>mdi-message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-row>

    </v-container>

  </div>
</template>

<script>
export default {
  data: () => ({
    team: [
      { name: 'jgpbDev', role: 'Web developer', avatar:'/dori-avatar.png' },
      { name: 'Alansín', role: 'Graphic designer', avatar:'/avatar-1.png' },
      { name: 'Kenvinsillo', role: 'Web developer', avatar:'/avatar-4.png' },
      { name: 'El Pepe', role: 'Social media maverick', avatar:'/avatar-2.png' },
      { name: 'Diegol', role: 'Sales guru', avatar:'/avatar-5.png'}
    ]
  })
};
</script>
