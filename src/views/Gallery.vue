<template>
  <div class="team mx-4 mb-4">
    <h1 class="subheading grey--text">Gallery</h1>

    <v-container class="my-5">

      <v-row>
        <v-flex xs12 sm6 md4 lg3 v-for="pic in pics" :key="pic.name">
          <v-card flat class="text-center ma-3">                    <!-- Text utility class inside Vuetify -->
            <v-responsive class="pt-4">
              <v-avatar size="100" class="green lighten-2">
                <img :src="pic.img">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{pic.name}}</div>
              <div class="grey--text">{{pic.name}}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-row>

    </v-container>

  </div>
</template>

<script>
export default {
  data: () => ({
    pics: [
      { name: 'img1', img:'/dori-avatar.png' },
      { name: 'img2', img:'/avatar-1.png' },
      { name: 'img3', img:'/avatar-4.png' },
      { name: 'img4', img:'/avatar-2.png' },
      { name: 'img5', img:'/avatar-5.png'}
    ]
  })
};
</script>
