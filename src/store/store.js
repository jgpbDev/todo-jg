import Vue from "vue";
import Vuex from "vuex";

import db from '@/fb'
import { collection, doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import ENUM from '@/store/enums'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiState: ENUM.INIT,
    count: 0,
    projectsFromStore: [
      {content: 'Proyecto de base en store 1', due: '1st February 2022', person: 'Amigo', status: 'complete', title: 'Titulo de proyecto 1'},
      {content: 'Proyecto de base en store 2', due: '2st March 2022', person: 'Amigo2', status: 'ongoing', title: 'Titulo de proyecto 2'},
    ],
    updatedDocs: [],
    projectToDelete: ''
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    UPDATE_DOCS(state, updatedDocs) {
      let projectData;
      state.projectsFromStore = [];
      updatedDocs.forEach((doc) => {
        if (!state.projectsFromStore.includes(doc.data())) {
          projectData = doc.data();
          projectData.id = doc.id;
          state.projectsFromStore.push(projectData);
        }
      });
      state.apiState = ENUM.LOADED;
    },
  },
  actions: {
    async gettingUpdatedDocs({commit}) {
      await onSnapshot(collection(db, 'projects'), (updatedDocs) => {
        commit('UPDATE_DOCS', updatedDocs);
      });
    },
    async deleteDoc(_, projectToDelete) {
      await deleteDoc(doc(db, 'projects', projectToDelete));
    },
  }
});
