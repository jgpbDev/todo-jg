// This commit is only to know that I changed the git config file

<template>
  <div class="team mx-4 mb-4">
    <h1 class="subheading grey--text">Team</h1>

    <v-container class="my-5">

      <v-row>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card flat class="text-center ma-3">                    <!-- Text utility class inside Vuetify -->
            <v-responsive class="pt-4">
              image goes here
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
      { name: 'jgpbDev', role: 'Web developer' },
      { name: 'Alansín', role: 'Graphic designer' },
      { name: 'Kenvinsillo', role: 'Web developer' },
      { name: 'El Pepe', role: 'Social media maverick' },
      { name: 'Diegol', role: 'Sales guru'}
    ]
  })
};
</script>
