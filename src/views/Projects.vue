<template>
  <div class="projects mx-4 mb-4">
    <h1 class="subheading grey--text">Projects</h1>

    <v-container v-if="apiStateLoaded === true" class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
          <v-expansion-panel-header>
            {{project.title}}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="grey--text">
            <div class="font-weight-bold">due by {{project.due}}</div>
            <div>{{project.content}}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import store from '@/store/store';
import ENUM from '@/store/enums';

import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  data: () => ({
    projects: store.state.projectsFromStore,
  }),
  methods: {
    ...mapActions(["gettingUpdatedDocs"]),
    assignProjects() {
      this.projects = store.state.projectsFromStore;
    }
  },
  computed: {
    myProjects() {
      return this.projects.filter(elementInArray => {
        // Remember when we talked about the importance of having an array when using a v-for
        return elementInArray.person === 'jgpbDev';
      });
    },
    ...mapState({
      apiState: state => state.apiState,
      projectsFromStore: state => state.projectsFromStore
    }),
    apiStateLoaded() {
      this.assignProjects();
      return this.apiState === ENUM.LOADED;
    }
  },
  async created() {
    this.gettingUpdatedDocs();
  }
};
</script>
