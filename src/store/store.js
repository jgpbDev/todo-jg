import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";
import db from '@/fb'
import { collection, doc, onSnapshot, deleteDoc} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";

import ENUM from '@/store/enums'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiState: ENUM.INIT,
    count: 0,
    tasksFromStore: [
      {content: 'Proyecto de base en store 1', due: '1st February 2022', person: 'Amigo', status: 'complete', title: 'Titulo de proyecto 1'},
      {content: 'Proyecto de base en store 2', due: '2st March 2022', person: 'Amigo2', status: 'ongoing', title: 'Titulo de proyecto 2'},
    ],
    updatedDocs: [],
    taskToDelete: '',
    userLoggedIn: false,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    UPDATE_DOCS(state, updatedDocs) {
      let taskData;
      state.tasksFromStore = [];
      updatedDocs.forEach((doc) => {
        if (!state.tasksFromStore.includes(doc.data())) {
          taskData = doc.data();
          taskData.id = doc.id;
          state.tasksFromStore.push(taskData);
        }
      });
      state.apiState = ENUM.LOADED;
    },
    SIGN_IN(state, userCredential) {
      state.loggedIn = userCredential.user
      router.push({path: '/home'});
    },
    SIGN_UP(state, userCredential) {
      state.loggedIn = userCredential.user
      router.push({
        path: '/home'
      });
    }
  },
  actions: {
    async gettingUpdatedDocs({commit}) {
      await onSnapshot(collection(db, 'tasks'), (updatedDocs) => {
        commit('UPDATE_DOCS', updatedDocs);
      });
    },
    async deleteDoc(_, taskToDelete) {
      await deleteDoc(doc(db, 'tasks', taskToDelete));
    },
    async signIn({commit}, {email, password}) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          commit('SIGN_IN', userCredential);
          alert("You are logged in as: " + userCredential.user);
        },
        err => {
          console.log(err.code);
          alert(err.message);
        }
      );
    },
    async registerNewUser({commit}, {email, password}) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          commit('SIGN_UP', userCredential.user);
          alert("You've been registered and logged in as: " + userCredential.user);
        },
        err => {
          console.log(err.code);
          alert(err.message);
        }
      );
    }
  }
});
