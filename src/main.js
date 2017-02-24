// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import Axios from 'axios'

Vue.use(ElementUI);
Vue.use(VueRouter);

import Login from './components/Login'
import TodoList from './components/TodoList'

Vue.prototype.$http = Axios;

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/todolist',
      component: TodoList
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
  if(to.path == '/'){
    if(token != null){
      next('/todolist')
    }
    next();
  }else{
    if(token != null){
      next()
    }else{
      next('/');
    }
  }
})

/* eslint-disable no-new */
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
