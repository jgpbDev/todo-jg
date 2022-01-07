<template>

  <div class="home mx-4 mb-4">
    <h1 class="subheading grey--text">Homepage</h1>

    <v-container v-if="apiStateLoaded === true" class="my-5">
      <v-snackbar v-model="vuexCounter" :timeout="4000" top color="success">
        <span>The counter in the store is: {{store.state.count}} </span>
        <v-btn text class="ml-3" color="white" @click="vuexCounter = false">Okay</v-btn>
      </v-snackbar>
      <v-row class="my-3">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
              <v-icon small left>
                mdi-folder
              </v-icon>
              <span class="caption text-capitalize">
                By project/name
              </span>
            </v-btn>
          </template>
          <span>Sort projects by project name</span>
        </v-tooltip>
        
        <v-tooltip top>     <!-- Maybe we can customize the size and presentation of the tooltip -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('person')" v-bind="attrs" v-on="on">
              <v-icon small left>
                mdi-account
              </v-icon>
              <span class="caption text-capitalize">
                By person
              </span>
            </v-btn>
          </template>
          <span>Sort projects by person</span>
        </v-tooltip>

        <ButtonCounter @incrementInStore="vuexCounter = true"/>
      </v-row>

      <v-card flat v-for="project in projects" :key="project.title">
        <v-row dense no-gutters :class="`pa-6 project ${project.status}`"> <!-- Notice the importance of the dense & no-gutters props -->
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <div>{{project.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-flex>
          <v-layout align-end justify-end align-center>
            <v-chip small :class="`${project.status} white--text caption ma-2`">{{project.status}}</v-chip>
            <v-btn text class="ma-2" color="delete" fab x-small dark @click="logDeleting(`${project.id}`)">
              <v-icon small>mdi-trash-can</v-icon>
            </v-btn>
          </v-layout>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>

  </div>
</template>

<script>
import ButtonCounter from '@/components/ButtonCounter.vue';
import store from '@/store/store';
import ENUM from '@/store/enums';

import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  components: {
    ButtonCounter
  },
  data: () => ({
    projects: store.state.projectsFromStore,
    vuexCounter: false,
    store: store
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    ...mapActions(["gettingUpdatedDocs", "deleteDoc"]),
    assignProjects() {
      this.projects = store.state.projectsFromStore;
    },
    logDeleting(projectId) {
      this.deleteDoc(projectId);
    }
  },
  computed: {
    ...mapState({
      apiState: state => state.apiState,
      projectsFromStore: state => state.projectsFromStore
    }),
    apiStateLoaded() {
      this.assignProjects();
      return this.apiState === ENUM.LOADED;
    }
  },
  created() {
    this.gettingUpdatedDocs();
  },
  // beforeRouteEnter: async function(to, from, next) {
  //   try {
  //     await this.gettingUpdatedDocs();
  //     next();
  //   } catch(exception) {
  //     next(exception);
  //   }
  // }
};
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.complete {
  background: #3cd1c2 !important; 
}
.v-chip.ongoing {
  background: orange !important;
}
.v-chip.overdue {
  background: tomato !important;
}
</style>