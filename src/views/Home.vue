<template>
  <div class="home mx-4 mb-4">
    <h1 class="subheading grey--text">Homepage</h1>

    <v-container class="my-5">

      <v-row class="mb-3">
        <v-btn small text color="grey" @click="sortBy('title')">
          <v-icon small left>
            mdi-folder
          </v-icon>
          <span class="caption text-capitalize">
            By project/name
          </span>
        </v-btn>
        <v-btn small text color="grey" @click="sortBy('person')">
          <v-icon small left>
            mdi-account
          </v-icon>
          <span class="caption text-capitalize">
            By person
          </span>
        </v-btn>
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
export default {
  data: () => ({
    projects: [
      { title: 'Design a new website', person: 'jgpbDev', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      { title: 'Code up the homepage', person: 'Alansín', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      { title: 'Design video thumbnails', person: 'Kevinsillo', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      { title: 'Create a community forum', person: 'El Pepe', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
    ]
  }),
  methods: {
    sortBy(prop) {
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    }
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