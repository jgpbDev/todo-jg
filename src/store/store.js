import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";
import db from '@/fb'
import { collection, doc, onSnapshot, deleteDoc} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import ENUM from '@/store/enums'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiState: ENUM.INIT,
    count: 0,
    tasksFromStore: [],
    updatedDocs: [],
    taskToDelete: '',
    session: null,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    allState(state) {
      console.log(state);
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
    SIGN_OUT(state, currentView) {
      state.session = null;
      if (currentView !== 'Login') {
        router.push({path: '/'});
      }
    },
    SET_SESSION(state, userCredential) {
      state.session = userCredential;
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
    async signIn(_, {email, password}) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('userCredential from sign in', userCredential)
      }).catch((error) => {
        console.error(error.code);
        alert(error.message);
      });
    },
    async signOut(){
      const auth = getAuth();
      await signOut(auth).then(() => {
        // alert("The user logged out");
        // commit('SIGN_OUT')
      }).catch((error) => {
        console.error(error.code);
        alert(error.message);
      });
    },
    async registerNewUser({commit}, {email, password}) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("You've been registered and logged in as: " + userCredential.user);
          commit('SIGN_IN', userCredential)
        }).catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    },
    async checkAuth({commit}) {
      const auth = getAuth();
      await onAuthStateChanged(auth, (user) => {
        // const currentUser = auth.currentUser;
        // console.log('CURRENT USER: ', currentUser);
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log('[CHECK_AUTH] User from firebase: ', user);
          commit('SET_SESSION', user);
          router.currentRoute.name === 'Login' ? router.push({path: '/home'}) : console.log("You're already inside the app");
        } else {
          // alert('CHECKAUTH: The user changed its status to logged out');
          console.log('[CHECK_AUTH] Without user from firebase: ', user);
          commit('SIGN_OUT', router.currentRoute.name);
        }
      });
    }
  }
});
