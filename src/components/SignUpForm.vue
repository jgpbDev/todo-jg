<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="slide-x-transition" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" class="mx-0 mt-16 rounded-xl px-15" v-bind="attrs" v-on="on">
        Sign up to this magic app
      </v-btn>
    </template>

    <v-container fill-height class="grey lighten-4">
        <v-row fill-height align="center" justify="center">
          <v-flex lg1>
            <v-btn
              class="mx-2"
              fab
              large
              color="primary"
              @click="dialog = false"
            >
              <v-icon color="white">
                mdi-arrow-left-circle
              </v-icon>
            </v-btn>
          </v-flex>
          <v-col justify="center" align="center">
            <v-flex xs11 sm11 md9 lg9>
              <v-card class="text-center rounded-lg">
                <v-row align="center" justify="center" class="py-10">
                  <v-flex xs10 sm10 md8 lg8>
                    <v-card flat>
                      <v-row no-gutters class="d-flex justify-end">
                        <v-flex xs6 sm6 md4 lg4>
                          <v-card
                            color="secondary"
                            flat
                            class="rounded-pill text-uppercase grey--text py-2"
                          >
                            <v-row no-gutters class="d-flex justify-center">
                              <div class="font-weight-light text-h5 white--text">Todo</div>
                              <div class="text-h5 white--text">JG</div>
                            </v-row>
                          </v-card>
                        </v-flex>
                      </v-row>
                      <v-card-title class="pa-0 primary--text">
                        Sign up to TODOJG
                      </v-card-title>
                      <v-form class="mt-6" ref="form">
                        <v-text-field
                          solo
                          flat
                          background-color="light_green"
                          color="primary"
                          label="Email"
                          class="rounded-lg"
                          height="2.5rem"
                          type="email"
                          v-model="register.email">
                          <template v-slot:prepend-inner>
                            <v-icon class="mr-4" color="primary">mdi-account-plus</v-icon>
                          </template>
                        </v-text-field>
                        <v-text-field
                          solo
                          flat
                          background-color="light_green"
                          color="primary"
                          label="Password"
                          class="rounded-lg"
                          height="2.5rem"
                          v-model="register.password"
                          :type="showPass ? 'text' : 'password'"
                          :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                          @click:append="showPass = !showPass">
                          <template v-slot:prepend-inner>
                            <v-icon class="mr-4" color="primary">mdi-key-chain-variant</v-icon>
                          </template>
                        </v-text-field>
                        <v-row justify="center">
                          <v-btn
                            color="secondary"
                            class="mx-0 mt-16 rounded-xl px-15"
                            @click="signUp"
                            >Sign up</v-btn
                          >
                        </v-row>
                      </v-form>
                    </v-card>
                  </v-flex>
                </v-row>
              </v-card>
            </v-flex>
          </v-col>
        </v-row>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    showPass: false,
    loading: false,
    register: {
      email: "",
      password: ""
    },
    inputRules: [
      v => (v || '').length >= 3 || `A minimum of 3 characters is required`
    ]
  }),
  methods: {
    ...mapActions(["registerNewUser"]),
    signUp() {
      this.loading = true;    //This could be listened in the state
      console.warn("signUp method in component running!!!!")
      this.registerNewUser(this.register);
      this.loading = false;
    }
  }
}
</script>

<style>
.v-input__icon--append .v-icon { 
    color: #219C3D !important;
}
.v-text-field input {
  color: #166929 !important;
}
</style>