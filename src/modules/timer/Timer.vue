<template>
  <v-layout row wrap>
    <v-flex lg12 pa-1> <TrackingBar/></v-flex>
    <v-flex lg12 pa-1> <TimerList/></v-flex>
  </v-layout>
</template>

<script>
  import TimerList from "./timer-list/TimerList"
  import TrackingBar from "./tracking-bar/TrackingBar";
  import { mapActions } from "vuex";

  export default {
    name: 'Timer',
    components: {
      TimerList,
      TrackingBar
    },
    methods: {
      ...mapActions({
        fetchTimeEntries: 'timers/fetchTimeEntries',
        fetchProjects: 'projects/fetchProjects'
      })
    },
    created() {
      this.fetchTimeEntries();
      this.fetchProjects();
    },
  }
</script>
