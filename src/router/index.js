import Vue from 'vue';
import VueRouter from 'vue-router';
import User from '../views/usersViews/User.vue';
import Login from '../views/usersViews/Login.vue';
import Register from '../views/usersViews/Register.vue';
import Home from '../views/Home.vue';
import Thread from '../views/threadsViews/Thread.vue';
import MessagesList from '../views/threadsViews/MessagesList.vue';
import ThreadsList from '../views/threadsViews/ThreadsList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/api/user/login',
    component: User,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login,
      },
      {
        path: '/api/user/register',
        name: 'Register',
        component: Register,
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/thread/:threadId',
    component: Thread,
    children: [
      {
        path: '',
        component: ThreadsList,
        name: 'ThreadsList',
      },
      {
        path: 'message/:messageId',
        component: MessagesList,
        name: 'MessagesList',
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
