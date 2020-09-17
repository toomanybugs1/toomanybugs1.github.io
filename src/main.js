import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import ISSTracker from './components/ISSTracker.vue'
import POTD from './components/POTD.vue'
import MarsWeather from './components/MarsWeather.vue'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: ISSTracker
  },
  {
    path: "/potd",
    component: POTD
  },
  {
    path: "/mars",
    component: MarsWeather
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
