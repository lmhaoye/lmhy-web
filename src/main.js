// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import StorePlugin from '@/plugins/store'
import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.productionTip = false


import Element from 'element-ui'
Vue.use(Element)

import qs from 'qs'
import axios from 'axios'

axios.defaults.transformRequest = [
  function(data){
    return qs.stringify(data)
  }
]
Vue.prototype.$http = axios

/* eslint-disable no-new */

// console.log(SupplyStore);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
