import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/Home.vue';
import Slider from '../components/home/Slider.vue';
import Mi from '../views/mi/Mi.vue';
import System from '../views/system/System.vue';
import Change from '../components/system/Change.vue';
import Changepassword from '../components/system/Change-password.vue';
import Login from '../components/system/Login.vue';
import Register from '../components/system/Register.vue';
import Vote from '../views/vote/Vote.vue';
import Introduce from '../components/home/Introduce.vue';
import Clock from '../components/home/Clock.vue';
import Learning from '../components/home/Learning.vue';
import Me from '../components/home/Me.vue';

// Vue.use(Element);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/home',
        redirect: '/slider',
      },
      {
        path: '/slider',
        name: 'slider',
        component: Slider,
      },
      {
        path: '/introduce',
        name: 'introduce',
        component: Introduce,
      },
      {
        path: '/clock',
        name: 'clock',
        component: Clock,
      },
      {
        path: '/learning',
        name: 'learning',
        component: Learning,
      },
      {
        path: '/me',
        name: 'me',
        component: Me,
      },
    ],
  },
  {
    path: '/mi',
    name: 'xiaomo',
    component: Mi,
  },
  {
    path: '/system',
    name: 'system',
    component: System,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/vote',
    name: 'vote',
    component: Vote,
    children: [
      {
        path: '/vote',
        redirect: '/welcome'
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../components/vote/Welcome.vue')
      },
      {
        path: '/create',
        name: 'create',
        component: () => import('../components/me/Create.vue')
      },
      {
        path: '/created',
        name: 'created',
        component: () => import('../components/me/Created.vue')
      },
      {
        path: '/tickets',
        name: 'ticket',
        component: () => import('../components/ticket/Ticket.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../components/vote/Admin.vue')
      },
      {
        path: '/voted',
        name: 'voted',
        component: () => import('../components/me/Voted.vue')
      },
    ]
  },
  {
    path: '/change',
    name: 'change',
    component: Change,
  },
  {
    path: '/change-password/:token',
    name: 'change-password',
    component: Changepassword,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
