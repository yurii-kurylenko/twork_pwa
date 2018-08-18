import Vue from 'vue'
import Vuex from 'vuex'
import timers from './modules/timer/store'
import projects from './modules/projects/store'
import reports from './modules/reports/store/store'

import auth from '@/core/stores/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timers,
    projects,
    reports,
    auth
  },
  strict: true
})
