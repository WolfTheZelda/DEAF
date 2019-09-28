import Vue from "vue";
import Router from "vue-router";

import Maintenance from "./views/Maintenance.vue";

Vue.use(Router);

const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
}

export default new Router({
  mode: process.env.CORDOVA_PLATFORM ? "hash" : "history",

  linkExactActiveClass: "link-active",

  routes: [{
      path: "/",
      name: "home",
      component: () => import("./views/Home"),
      meta: {
        title: "DEAF - Início"
      }
    },
    {
      path: "/timer",
      name: "timer",
      component: () => import("./views/Timer"),
      meta: {
        title: "DEAF - Timer"
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login"),
      meta: {
        title: "DEAF - Login"
      }
    },
    {
      path: "/dashboard",
      component: () => import("./views/Dashboard"),
      children: [{
          path: "/",
          components: {
            dashboard: () => import("./views/Dashboard/Menu")
          },
          meta: {
            title: "DEAF - Dashboard > Menu"
          }
        },
        {
          path: "/dashboard/students",
          components: {
            dashboard: () => import("./views/Dashboard/Students")
          },
          meta: {
            title: "DEAF - Dashboard > Alunos"
          }
        },
        {
          path: "/dashboard/students/edit/:id",
          components: {
            dashboard: () => import("./views/Dashboard/StudentsEdit")
          },
          meta: {
            title: "DEAF - Dashboard > Alunos > Editar"
          }
        },
        {
          path: "/dashboard/managers",
          components: {
            dashboard: () => import("./views/Dashboard/Managers")
          },
          meta: {
            title: "DEAF - Dashboard > Administradores"
          }
        },
        {
          path: "/dashboard/managers/edit/:id",
          components: {
            dashboard: () => import("./views/Dashboard/ManagersEdit")
          },
          meta: {
            title: "DEAF - Dashboard > Administradores > Editar"
          }
        },
        {
          path: "/dashboard/records",
          components: {
            dashboard: () => import("./views/Dashboard/Records")
          },
          meta: {
            title: "DEAF - Dashboard > Registros"
          }
        },
        {
          path: "/dashboard/timer",
          components: {
            dashboard: () => import("./views/Dashboard/Timer")
          },
          meta: {
            title: "DEAF - Dashboard > Timer"
          }
        }
      ]
    },
    {
      path: "*",
      name: "nothing",
      component: () => import("./views/Home")
    }
  ]
});