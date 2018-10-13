import '@babel/polyfill'
import Vue from 'vue'
import Vuetify from 'vuetify';
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as vueMoment from 'vue-moment'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'vuetify/dist/vuetify.min.css'

import {
  lodashPlugin,
  momentPlugin,
  storePlugin
} from './plugins'

import configs from './configs';
import setupHttpInterceptors from './interceptors';
import clickOutsideDirective from './core/directives/clickOutside';


Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(momentPlugin)
Vue.use(lodashPlugin)
Vue.use(storePlugin)
Vue.use(vueMoment)

Vue.directive('click-outside', clickOutsideDirective)
setupHttpInterceptors(store)
Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = configs.apiUrl

Vue.config.productionTip = false

import TworkIndexedDBStore from '@/core/services/TworkIndexedDBStore';
import addToHomeScreen from '@/core/services/addToHomeScreen';

const afterVueAppCreated = async () => {
  addToHomeScreen.initBeforeInstallPromptListener();
  if ('indexedDB' in window) {
    await TworkIndexedDBStore.initStores();
  }
  return true
}

new Vue({
  router,
  store,
  render: h => h(App),
  created: afterVueAppCreated
}).$mount('#app')
