import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";
import {db} from '@/fb'
import { collection, doc, onSnapshot, deleteDoc, addDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import ENUM from '@/store/enums'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiState: ENUM.INIT,
    count: 0,
    tasksFromFirestore: [],
    updatedDocs: [],
    taskToDelete: "",
    session: null,
    list: [
      { color: "white", size: "XXL" },
      { color: "red", size: "XL" },
      { color: "black", size: "M" },
    ],
  },
  getters: {
    tasks: (state) => state.tasksFromFirestore,
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
      state.tasksFromFirestore = [];
      updatedDocs.forEach((doc) => {
        if (!state.tasksFromFirestore.includes(doc.data())) {
          taskData = doc.data();
          taskData.id = doc.id;
          state.tasksFromFirestore.push(taskData);
        }
      });
      state.apiState = ENUM.LOADED;
    },
    SIGN_OUT(state, currentView) {
      state.session = null;
      if (currentView !== "Login") {
        router.push({ path: "/" });
      }
    },
    SET_SESSION(state, userCredential) {
      state.session = userCredential;
    },
    SORT_TASKS(state, sortKey) {
      state.status = ENUM.LOADING;
      const tasks = state.tasksFromFirestore;
      tasks.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
      state.tasksFromFirestore = tasks;
      state.status = ENUM.LOADED;
    },
  },
  actions: {
    async gettingUpdatedDocs({ commit }) {
      await onSnapshot(collection(db, "tasks"), (updatedDocs) => {
        commit("UPDATE_DOCS", updatedDocs);
      });
    },
    async addDoc(_, taskToAdd) {
      if (taskToAdd) {
        console.warn("The taskToAdd passed and here it is: ", taskToAdd);
      } else {
        console.error("Without taskToAdd");
      }
      await addDoc(collection(db, "tasks"), taskToAdd);
    },
    uploadImg(_, imgToAdd) {
      const storage = getStorage();
      // const imgRef = ref(storage, imgToAdd.img.name);
      const imagesRef = ref(storage, "images/" + imgToAdd.name);
      // console.log("This are my refs, imgRef: "+ imgRef + ", imagesRef: "+imagesRef);

      uploadBytes(imagesRef, imgToAdd).then(() => {
        console.warn("Uploaded our file!");
      });
    },
    async deleteDoc(_, taskToDelete) {
      await deleteDoc(doc(db, "tasks", taskToDelete));
    },
    async signIn(_, { email, password }) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("userCredential from sign in", userCredential);
        })
        .catch((error) => {
          console.error(error.code);
          alert(error.message);
        });
    },
    async signOut() {
      const auth = getAuth();
      await signOut(auth)
        .then(() => {
          // alert("The user logged out");
          // commit('SIGN_OUT')
        })
        .catch((error) => {
          console.error(error.code);
          alert(error.message);
        });
    },
    async registerNewUser(_, { email, password }) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password).catch(
        (error) => {
          console.log(error.code);
          alert(error.message);
        }
      );
    },
    async checkAuth({ commit }) {
      const auth = getAuth();
      await onAuthStateChanged(auth, (user) => {
        // const currentUser = auth.currentUser;
        // console.log('CURRENT USER: ', currentUser);
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log("[CHECK_AUTH] User from firebase: ", user);
          commit("SET_SESSION", user);
          router.currentRoute.name === "Login"
            ? router.push({ path: "/home" })
            : console.log("You're already inside the app");
        } else {
          // alert('CHECKAUTH: The user changed its status to logged out');
          console.log("[CHECK_AUTH] Without user from firebase: ", user);
          commit("SIGN_OUT", router.currentRoute.name);
        }
      });
    },
  },
});
