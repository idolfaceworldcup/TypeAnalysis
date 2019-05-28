import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import MainPage from "./views/MainPage.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Modify from "./views/Modify";
import TypeAnalysis from "./views/TypeAnalysis";
import TypeMan from "./views/TypeMan";
import TypeWoman from "./views/TypeWoman";
import User from "./views/User";

Vue.use(Router);

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
      path: "/user",
      name: "user",
      components: {
        header: AppHeader,
        default: User,
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
      children : [
        {
          path : "typeman",
          name : "typeman",
          components: {
            header: AppHeader,
            default : TypeMan,
            footer: AppFooter
          }
        },
        {
          path : "typewoman",
          name : "typewoman",
          components: {
            header: AppHeader,
            default : TypeWoman,
            footer: AppFooter
          }
        }
      ]
    },
    {
      path: "/",
      redirect: {
          name : "typeman"
      }
    },
    {
      path: "/",
      redirect: {
          name : "typewoman"
      }
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
