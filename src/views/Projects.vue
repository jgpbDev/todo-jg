<template>
  <div class="projects mx-4 mb-4">
    <h1 class="subheading grey--text">Projects</h1>

    <v-container class="my-5">
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
import db from '@/fb'
import { collection, onSnapshot } from 'firebase/firestore';

export default {
  data: () => ({
    projects: []
  }),
  computed: {
    myProjects() {
      return this.projects.filter(elementInArray => {
        // Remember when we talked about the importance of having an array when using a v-for
        return elementInArray.person === 'jgpbDev';
      });
    }
  },
  async created() {
    await onSnapshot(collection(db, 'projects'), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.projects.push(doc.data());
      });
      console.log("Current projects in CA: ", this.projects);
    });
  }
};
</script>
