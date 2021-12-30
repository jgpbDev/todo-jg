<template>
  <div class="home mx-4 mb-4">
    <h1 class="subheading grey--text">Homepage</h1>

    <v-container class="my-5">

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
          <v-layout align-end justify-end>
            <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
          </v-layout>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>

  </div>
</template>

<script>
import db from '@/fb'
import { collection, getDocs } from 'firebase/firestore';

export default {
  data: () => ({
    projects: []
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    },
  },
  async created() {
    console.log(this)
    const allDocs = await getDocs(collection(db, "projects"));
    allDocs.forEach((doc) => {      
      this.projects.push({
        ...doc.data(),
        id: doc.id
      });
    });
  }
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