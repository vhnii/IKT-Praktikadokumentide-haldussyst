import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.role === 'student') {
          next({name: 'opilane'})
        } else {
          next({name: 'koordinaator'})
        }
      } else {
        next();
      }
    }
  },
  {
    path: '/opilane',
    name: 'opilane',
    component: () => import(/* webpackChunkName: "student" */ '../views/Student.vue'),
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.role === 'student') {
          next()
        } else {
          next(from)
        }
      } else {
        next({name: 'login'})
      }
    }
  },
  {
    path: '/koordinaator',
    name: 'koordinaator',
    component: () => import(/* webpackChunkName: "teacher" */ '../views/Teacher.vue'),
    beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          if (store.getters.role === 'admin') {
            next()
          } else {
            next(from)
          }
        } else {
          next({name: 'login'})
        }
    }
  },
  {
    path: '/praktikataotlus',
    name: 'praktikataotlus',
    component: () => import(/* webpackChunkName: "praktikataotlus" */ '../views/InternshipApplication.vue'),
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.role === 'student') {
          next()
        } else {
          next(from)
        }
      } else {
        next({name: 'login'})
      }
    }
  },
  {
    path: '/taotlus/:id',
    name: 'taotlus',
    component: () => import(/* webpackChunkName: "ettevõttetaotlus" */ '../views/CompanyApplication.vue')
  },
  {
    path: '/pdf/:id',
    name: 'pdf',
    component: () => import(/* webpackChunkName: "pdf" */ '../views/Pdf.vue'),
    meta: { hideHeader: true, hideFooter: true}
  },
  {
    path: '/privaatsustingimused',
    name: 'privaatsustingimused',
    component: () => import(/* webpackChunkName: "PrivacyPolicy" */ '../views/PrivacyPolicy.vue')

  },
  {
    path: '/*',
    name: '404',
      component: () => import(/* webpackChunkName: "notFound" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
})

export default router
