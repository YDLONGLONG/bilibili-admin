import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: () => import('../views/login')
  },
  {
    path: '/admin',
    component: () => import('../views/admin'),
    redirect: '/admin/user',
    children: [
      {
        path: '/admin/user',
        component: () => import('../views/admin/children/user')
      },
      {
        path: '/admin/video',
        component: () => import('../views/admin/children/videos')
      },
      {
        path: '/admin/live',
        component: () => import('../views/admin/children/live')
      },
      {
        path: '/admin/notice',
        component: () => import('../views/admin/children/notice')
      },
      {
        path: '/admin/verify',
        component: () => import('../views/admin/children/verify')
      },
      {
        path: '/admin/trend',
        component: () => import('../views/admin/children/trend')
      },
      {
        path: '/admin/ban',
        component: () => import('../views/admin/children/ban')
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/') {
    let login = sessionStorage.login
    if (login) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})
export default router
