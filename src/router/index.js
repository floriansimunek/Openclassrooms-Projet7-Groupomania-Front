import Vue from 'vue';
import VueRouter from 'vue-router';
import User from '@/views/usersViews/User.vue';
import Login from '@/views/usersViews/Login.vue';
import Register from '@/views/usersViews/Register.vue';
import Home from '@/views/Home.vue';
import Thread from '@/views/threadsViews/Thread.vue';
import MessagesList from '@/views/threadsViews/MessagesList.vue';
import ThreadsList from '@/views/threadsViews/ThreadsList.vue';

Vue.use(VueRouter);

const routes = [
  {
    // TODO: delete children
    path: '/login',
    component: User,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    // TODO: add /thread route
    path: '/thread/:threadId',
    component: Thread,
    meta: {
      auth: true,
    },
    children: [
      {
        path: '',
        component: ThreadsList,
        name: 'ThreadsList',
        meta: {
          auth: true,
        },
      },
      {
        // TODO: add /message route
        path: 'message/:messageId',
        component: MessagesList,
        name: 'MessagesList',
        meta: {
          auth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!localStorage.getItem('Token')) {
      return router.push({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (!to.meta.auth) {
    return next();
  }
  if (!localStorage.getItem('Token')) {
    return router.push({ name: 'Login' });
  }
  next();
});

export default router;
