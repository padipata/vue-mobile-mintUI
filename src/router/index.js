import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/vuepage/HelloWorld'
// import Test from '../vuepage/common/tabar'
const Home = () => import('@/vuepage/Home')
const Tabar = () => import('../vuepage/common/tabar')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/tabar',
      component: Tabar
    }
  ]
})
