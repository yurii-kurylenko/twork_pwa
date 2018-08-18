<template>
  <div class="projects-header">
    <div class="projects-header__box">
      <div class="projects-header__title">Projects</div>
      <button
        v-on:click="toggleCreateProjectModal"
        class="projects-header__btn"
        type="button">
        Create project
      </button>
    </div>

    <ProjectModal
      v-on:visibilityChanged="toggleCreateProjectModal"
      :is-visible="showModal"
      clear-after-submit
    />
  </div>
</template>

<script>
  import ProjectModal from './shared/ProjectModal'

  export default {
    name: 'ProjectsHeader',
    components: {
      ProjectModal
    },
    data() {
      return {
        showModal: false
      }
    },
    methods: {
      toggleCreateProjectModal() {
        this.showModal = !this.showModal;
      }
    }
  }
</script>

<style lang="postcss" scoped>
  .projects-header {
    display: block;
    margin-bottom: 50px;
  }
  
  .projects-header__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .projects-header__title {
    font-size: 32px;
    line-height: 34px;
    color: #333;
  }
  
  .projects-header__btn {
    position: relative;
    display: inline-block;
    padding: 10px;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
    border: 2px solid #2ec783;
    background-color: #2ec783;
    white-space: nowrap;
    cursor: pointer;
    outline: 0;
    transition: color .3s ease-in-out,background .3s ease-in-out;
    box-sizing: border-box;
    -webkit-appearance: none;
    user-select: none;
  
    &:hover {
      color: #2ec783;
      background-color: transparent;
    }
  }
</style>
