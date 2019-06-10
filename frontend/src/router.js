import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import ManagerHeader from "./layout/ManagerHeader";
import AppFooter from "./layout/AppFooter";
import MainPage from "./views/MainPage.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Modify from "./views/Modify";
import TypeAnalysis from "./views/TypeAnalysis";
import Analyzer from "./views/Analyzer";
import Result from "./views/Result";
import MyPage from "./views/MyPage"
import ManagerLogin from "./views/ManagerLogin";
import ManageAnalysis from "./views/ManageAnalysis";
import ManageImage from "./views/ManageImage";
import ManageUser from "./views/ManageUser";
import ManagePage from "./views/ManagePage";
import Process from "./views/Process";


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
    },
    {
      path : "/mypage",
      name : "mypage",
      components: {
        header: AppHeader,
        default: MyPage,
        footer: AppFooter
      },
    },
    {
      path : "/management/login",
      name : "managerlogin",
      components: {
        default: ManagerLogin
      },
    },
    {
      path : "/management",
      name : "management",
      components: {
        header: ManagerHeader,
        default: ManagePage,
        footer: AppFooter
      },
    },
    {
      path : "/management/analysis",
      name : "manageanalysis",
      components: {
        header: ManagerHeader,
        default: ManageAnalysis,
        footer: AppFooter
      },
    },
    {
      path : "/management/image/:analysisId",
      name : "manageimage",
      components: {
        header: ManagerHeader,
        default: ManageImage,
        footer: AppFooter
      },
    },
    {
      path: "/management/user",
      name: "manageuser",
      components: {
        header: ManagerHeader,
        default: ManageUser,
        footer: AppFooter
      }
    },
    {
      path: "/wait/process",
      name: "process",
      components: {
        default: Process
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
