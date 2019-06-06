import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import MainPage from "./views/MainPage.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Modify from "./views/Modify";
import TypeAnalysis from "./views/TypeAnalysis";
import Analyzer from "./views/Analyzer";
import ManagerUser from "./views/ManagerUser";
import Result from "./views/Result";


Vue.use(Router);

const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false
  if(isAuthenticated) return next()
  next('/login?returnPath=loginme')
}


export default new Router({
  linkExactActiveClass: "active",
  mode: 'history',

  routes: [
    {
      path: "/",
      name: "mainpage",
      components: {
        header: AppHeader,
        default: MainPage,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/manageruser",
      name: "manageruser",
      components: {
        header: AppHeader,
        default: ManagerUser,
        footer: AppFooter
      }
    },
    {
      path: "/modify",
      name: "modify",
      components: {
        header: AppHeader,
        default: Modify,
        footer: AppFooter
      }
    },
    {
      path: "/typeanalysis",
      name: "typeanalysis",
      components: {
        header: AppHeader,
        default: TypeAnalysis,
        footer: AppFooter
      },
    },
      
    {
      path : "/analyzer/:analysisId",
      name : "analyzer",
      components: {
        header: AppHeader,
        default: Analyzer,
        footer: AppFooter
      },
    },
    {
      path : "/result",
      name : "result",
      components: {
        header: AppHeader,
        default: Result,
        footer: AppFooter
      },
    }
  ],

  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
