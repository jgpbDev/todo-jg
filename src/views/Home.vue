<template>
  <div class="home">
    <h1>Homepage</h1>
    <v-btn class="pink white--text">Click me</v-btn>
    <v-btn depressed color="pink">Click me again</v-btn>
    <v-btn text color="pink">Click me one more time</v-btn>
    
    <v-btn depressed small class="pink white--text">
      <v-icon left small>mdi-account-box</v-icon>
      <span>Click me one more time</span>
    </v-btn>

    <v-btn depressed class="pink white--text">
      <v-icon left>mdi-email-box</v-icon>
      <span>Click me bigger</span>
    </v-btn>

    <v-btn depressed large class="pink white--text">
      <span>Another big button</span>
      <v-icon right>mdi-email</v-icon>
    </v-btn>

    <v-btn fab depressed small dark color class="purple">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn large color="blue-grey" dark>
      Upload
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </div>
</template>

<script>

export default {
  
}
</script>
