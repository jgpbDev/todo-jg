<template>
  <div class="home mx-4 mb-4">
    <h1 class="subheading grey--text">Homepage</h1>

    <v-container v-if="apiStateLoaded === true" class="my-5">
      <v-snackbar v-model="vuexCounter" :timeout="4000" top color="success">
        <span>The counter in the store is: {{store.state.count}} </span>
        <v-btn text class="ml-3" color="white" @click="vuexCounter = false">Okay</v-btn>
      </v-snackbar>
      <v-row class="my-3">    <!-- Options buttons bar -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('title')" v-bind="attrs" v-on="on">
              <v-icon small left>
                mdi-folder
              </v-icon>
              <span class="caption text-capitalize">
                By task/name
              </span>
            </v-btn>
          </template>
          <span>Sort tasks by task name</span>
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
          <span>Sort tasks by person</span>
        </v-tooltip>
        <v-tooltip top>     <!-- Maybe we can customize the size and presentation of the tooltip -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('createdAt')" v-bind="attrs" v-on="on">
              <v-icon small left>
                mdi-sort-calendar-ascending
              </v-icon>
              <span class="caption text-capitalize">
                By creation date
              </span>
            </v-btn>
          </template>
          <span>Sort tasks by creation date</span>
        </v-tooltip>
        <v-tooltip top>     <!-- Maybe we can customize the size and presentation of the tooltip -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="grey" @click="sortBy('due')" v-bind="attrs" v-on="on">
              <v-icon small left>
                mdi-sort-calendar-ascending
              </v-icon>
              <span class="caption text-capitalize">
                By due date
              </span>
            </v-btn>
          </template>
          <span>Sort tasks by due date</span>
        </v-tooltip>
        <ButtonCounter @incrementInStore="vuexCounter = true"/>
      </v-row>

      <v-card flat v-for="task in tasks" :key="task.title">
        <v-row dense no-gutters :class="`pa-6 task ${task.status}`"> <!-- Notice the importance of the dense & no-gutters props -->
          <v-flex xs12 md5>
            <div class="caption grey--text">Task Title</div>
            <div>{{task.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md1 class="mx-6">
            <div class="caption grey--text">Person</div>
            <div>{{task.person}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Created at</div>
            <div>{{task.createdAt}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{task.due}}</div>
          </v-flex>
          <v-layout align-end align-center justify-end>
            <v-chip small :class="`${task.status} white--text caption ma-2`">{{task.status}}</v-chip>
            <v-btn text class="ma-2" color="delete" fab x-small dark @click="logDeleting(`${task.id}`)">
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
    tasks: store.state.tasksFromStore,
    vuexCounter: false,
    store: store
  }),
  methods: {
    sortBy(prop) {
      this.tasks.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
    ...mapActions(["gettingUpdatedDocs", "deleteDoc"]),
    setTasks() {
      this.tasks = store.state.tasksFromStore;
    },
    logDeleting(taskId) {
      this.deleteDoc(taskId);
    }
  },
  computed: {
    ...mapState({
      apiState: state => state.apiState,
      tasksFromStore: state => state.tasksFromStore
    }),
    apiStateLoaded() {
      this.setTasks();
      return this.apiState === ENUM.LOADED;
    },
  },
  created() {
    this.gettingUpdatedDocs();
  },
};
</script>

<style>
.task.complete {
  border-left: 4px solid #3cd1c2;
}
.task.ongoing {
  border-left: 4px solid orange;
}
.task.overdue {
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