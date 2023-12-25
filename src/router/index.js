import VueRouter from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import ContactsPage from '@/pages/ContactsPage.vue';

import state from '@/store'

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginPage,
    },
    {
      path: '/contacts',
      name: 'contacts',
      meta: {
        requireAuth: true,
      },
      component: ContactsPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthorized = state.getters['user/isAuthorized']

  if (to.matched.some((route) => route.meta?.requireAuth)) {
    if (isAuthorized) {
      next();
    } else {
      next('/');
    }
  } else if (to.name === 'home' && isAuthorized) {
    next('/contacts');
  } else {
    next();
  }
});

export default router;
