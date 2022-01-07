<template>
  <div class="tasks mx-4 mb-4">
    <h1 class="subheading grey--text">Tasks</h1>

    <v-container v-if="apiStateLoaded === true" class="my-5">
      <v-expansion-panels>
        <v-expansion-panel v-for="task in myTasks" :key="task.title">
          <v-expansion-panel-header>
            {{task.title}}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="grey--text">
            <div class="font-weight-bold">due by {{task.due}}</div>
            <div>{{task.content}}</div>
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
    tasks: store.state.tasksFromStore,
  }),
  methods: {
    ...mapActions(["gettingUpdatedDocs"]),
    setTasks() {
      this.tasks = store.state.tasksFromStore;
    }
  },
  computed: {
    myTasks() {
      return this.tasks.filter(elementInArray => {
        // Remember when we talked about the importance of having an array when using a v-for
        return elementInArray.person === 'jgpbDev';
      });
    },
    ...mapState({
      apiState: state => state.apiState,
      tasksFromStore: state => state.tasksFromStore
    }),
    apiStateLoaded() {
      this.setTasks();
      return this.apiState === ENUM.LOADED;
    }
  },
  async created() {
    this.gettingUpdatedDocs();
  }
};
</script>
