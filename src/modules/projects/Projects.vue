<template>
  <v-layout>
    <v-flex xs12>
      <ProjectsHeader />
      <ProjectsList />
    </v-flex>
  </v-layout>
</template>

<script>
  import ProjectsHeader from './ProjectsHeader'
  import ProjectsList from './projects-list/ProjectsList'
  import { mapActions } from 'vuex'

  export default {
    name: 'Projects',
    components: {
      ProjectsHeader,
      ProjectsList
    },
    methods: {
      ...mapActions({
        fetchProjects: 'projects/fetchProjects'
      })
    },
    created() {
      this.fetchProjects()
    }
  }
</script>

<style lang="postcss">
  .projects-wrapper {
    padding: 25px 20px;
  }
</style>
