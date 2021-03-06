<template>
  <v-container fill-height>
    <v-snackbar id="logOutNotificationId" top content-class="d-flex justify-center" :value="logOutSnackbar" color="success">
      <span>You're logged out</span> 
    </v-snackbar>
    <v-row fill-height align="center" justify="center">
      <v-col justify="center" align="center">
        <v-flex xs11 sm11 md6 lg6>
          <v-card color="secondary" class="text-center rounded-lg">
            <v-row align="center" justify="center" class="py-10">
              <v-flex xs10 sm10 md8 lg8>
                <v-card flat color="transparent">
                  <v-row no-gutters class="d-flex justify-end">
                    <v-flex xs6 sm6 md4 lg4>
                      <v-card
                        flat
                        class="rounded-pill text-uppercase grey--text py-2"
                      >
                        <v-row no-gutters class="d-flex justify-center">
                          <div class="font-weight-light text-h5">Todo</div>
                          <div class="text-h5">JG</div>
                        </v-row>
                      </v-card>
                    </v-flex>
                  </v-row>
                  <v-form id="loginFormId" class="mt-6" ref="form">
                    <!-- Important to give a reference to the form to use it in the Vue instance -->
                    <v-text-field
                      solo
                      flat
                      label="Email"
                      class="rounded-lg custom-label-color"
                      height="2.5rem"
                      v-model="credentials.email"
                      type="email">
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-4">mdi-account</v-icon>
                      </template>
                    </v-text-field>
                    <v-text-field
                      solo
                      flat
                      label="Password"
                      class="rounded-lg custom-label-color"
                      height="2.5rem"
                      v-model="credentials.password"
                      :rules="passRules"
                      :type="showPass ? 'text' : 'password'"
                      :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                      @click:append="showPass = !showPass">
                      <template v-slot:prepend-inner>
                        <v-icon class="mr-4">mdi-lock</v-icon>
                      </template>
                    </v-text-field>
                    <v-row class="pl-3">
                      <v-btn text class="text-none px-0" color="white"
                        >Forgot your password?</v-btn
                      >
                    </v-row>
                    <v-row justify="center">
                      <v-btn
                        color="primary"
                        class="mx-0 mt-16 rounded-xl px-15"
                        :loading="loading"
                        @click="login"
                        >Login</v-btn
                      >
                    </v-row>
                  </v-form>
                </v-card>
              </v-flex>
            </v-row>
          </v-card>
          <SignUpForm />
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignUpForm from '@/components/SignUpForm.vue'
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  components: {
    SignUpForm
  },
  data: () => ({
    showPass: false,
    credentials: {
      email: "admin@todojg.com",
      password: "adminPassword",
    },
    loading: false,
    passRules: [
      (value) => !!value || "This is an obligatory field.",
    ]
  }),
  computed: {
    ...mapState({
      session: state => state.session,
    }),
    logOutSnackbar() {
      return this.session === null ? true : false;
    }
  },
  methods: {
    ...mapActions(["signIn"]),
    login() {
      this.loading = true;    //This could be listened in the state
      this.signIn(this.credentials);
      this.loading = false;
    },
  }, 
  created() {
    console.log('SESSION IN STORE: ', this.session);
}
};
</script>

<style>
.v-text-field .v-input__control .v-input__slot {
  min-height: auto;
  display: flex;
  align-items: center;
}
/* This works fine */
.custom-label-color .v-label {
  color: #219C3D;
}

#loginFormId .v-text-field input {
  color:#166929;
}

#loginFormId .v-icon {
  color: #219C3D;
}
#logOutNotificationId .v-snack__wrapper {
  min-width: 0px;
}
</style>
