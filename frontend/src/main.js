import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Argon from './plugins/argon-kit';
import axios from 'axios'
import {store} from './store/index'
import BootstrapVue from 'bootstrap-vue'
import './registerServiceWorker'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify, {
  iconfont: 'mdi'
});
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(Argon);
Vue.prototype.$Axios = axios;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
  
}).$mount("#app");