import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BasePage from '@/components/BasePage'
import home from '@/pages/home/home'
import user from '@/pages/user/user'
import note from '@/pages/note'
import file from '@/pages/file'
import system from '@/pages/system'
import opinion from '@/pages/opinion'
import login from '@/pages/login'
import eidt from '@/pages/user/eidt'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: login
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path:'/user',
      name:'user',
      component:user,
    },
    {
      path:'/note/eidt',
      name:'eidt',
      component:eidt,
    },
    {
      path:'/note',
      name:'note',
      component:note
    },
    {
      path:'/file',
      name:'file',
      component:file
    },
    {
      path:'/system',
      name:'system',
      component:system
    },
    {
      path:'/opinion',
      name:'opinion',
      component:opinion
    },
    {
      path:'/login',
      name:'login',
      component:login
    }

  ]
})
