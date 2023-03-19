import * as VueRouter from 'vue-router';
import admin from './admin'
import frontend from './frontend';

const routes = admin.concat(frontend);

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: routes,
  base: process.env.BASE_URL,
});

router.beforeEach((to, from, next) => {
  var admin = localStorage.getItem('admin')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (admin == null || admin == undefined) {
      return next({ name: 'admin.login' })
    }
  }
  if (to.matched.some(record => record.meta.redirectIfLoggedIn)) {
    if (admin != null) {
      return next({ name: 'admin.books' })
    }
  }
  next()
})

export default router
