import Vue from 'vue'
import Vuex from 'vuex'
import timersMobile from './modules/timer-mobile/store'
import projects from './modules/projects/store'
import reports from './modules/reports/store/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timersMobile,
    projects,
    reports
  },
  strict: true
})
