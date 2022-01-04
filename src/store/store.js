import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    projectsFromStore: []
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    gettingUpdatedDocs(){
      this.projectsFromStore = [
        {name: 'Proyecto1', status:'Finished'},
        {name: 'Proyecto2', status:'In Process'}
      ]
    }
  },
});
