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
export default {
  data: () => ({
    projects: [
      { title: 'Design a new website', person: 'jgpbDev', due: '1st Jan 2019', status: 'ongoing', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      { title: 'Code up the homepage', person: 'Alansín', due: '10th Jan 2019', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      { title: 'Design video thumbnails', person: 'Kevinsillo', due: '20th Dec 2018', status: 'complete', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      { title: 'Create a community forum', person: 'El Pepe', due: '20th Oct 2018', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
      { title: 'Design this to-do app', person: 'jgpbDev', due: '5th Jan 2022', status: 'overdue', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!'},
    ]
  }),
  computed: {
    myProjects() {
      return this.projects.filter(elementInArray => {
        // Remember when we talked about the importance of having an array when using a v-for
        return elementInArray.person === 'jgpbDev';
      });
    }
  }
};
</script>
