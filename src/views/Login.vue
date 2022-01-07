<template>
  <div class="login mx-4 mb-4">
    <v-row align="center" justify="center" class="mt-16">
      <v-flex xs11 sm11 md6 lg6>
        <v-card class="text-center ma-3">
          <v-responsive class="pt-4">
            <v-avatar size="100" class="green lighten-2">
              <img src="/dori-avatar.png">
            </v-avatar>
          </v-responsive>
          <v-card-text>
            <div class="subheading">Nombre de usuario</div>
            <div class="grey--text">Rol de usuario</div>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-layout align-end>    <!-- Me quedé intentando mandar hasta la derecha este botón de acceso -->
                <v-btn text color="grey">
                  <span>Go</span>
                  <v-icon small left>mdi-login</v-icon>
                </v-btn>
              </v-layout>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
