import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Argon from './plugins/argon-kit';
import axios from 'axios'
import './registerServiceWorker'
import './vue-displacement-slideshow'

Vue.config.productionTip = false;
Vue.use(Argon);
Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");