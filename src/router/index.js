import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/usersViews/Login.vue';
import Register from '@/views/usersViews/Register.vue';
import UserProfile from '@/views/usersViews/UserProfile.vue';
import viewAllUsers from '@/views/usersViews/viewAllUsers.vue';
import Home from '@/views/Home.vue';
import Thread from '@/views/threadsViews/Thread.vue';
import MessagesList from '@/views/threadsViews/MessagesList.vue';
import ThreadsList from '@/views/threadsViews/ThreadsList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
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
    path: '/me',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      auth: true,
    },
  },
  {
    path: '/user',
    name: 'viewAllUsers',
    component: viewAllUsers,
    meta: {
      auth: true,
    },
  },
  {
    path: '/thread',
    name: 'Thread',
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: '/message',
    name: 'Message',
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
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
