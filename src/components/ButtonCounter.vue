<template>
  <v-tooltip top>
    <!-- Maybe we can customize the size and presentation of the tooltip -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        small
        text
        color="grey"
        @click="counterVuex()"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon small left> mdi-plus-circle </v-icon>
        <span class="caption text-capitalize"> Vuex counter test </span>
      </v-btn>
    </template>
    <span>Adds one with the Vuex counter</span>
  </v-tooltip>
</template>

<script>
import store from '@/store/store';

export default {
  methods: {
    counterVuex() {
      store.commit('increment');
      this.$emit('incrementInStore');
      console.log(store.state.count);
    }
  }
};
</script>

<style></style>
