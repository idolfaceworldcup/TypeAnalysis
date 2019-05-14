// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Argon from './plugins/argon-kit';
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.use(Argon);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");