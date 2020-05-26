import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import OrderList from '@/components/order/List'
import OrderDetail from '@/components/order/Detail'
import OrderDynamic from '@/components/order/Dynamic';
import OrderCommon from '@/components/order/Common';
import OrderMultiView from '@/components/order/multiView/MultiView';
import OrderMultiSideBar from '@/components/order/multiView/Sidebar';
import OrderMultiMain from '@/components/order/multiView/Main';
import OrderAlias from '@/components/order/Alias';
import OrderParam from '@/components/order/Params';
import OrderBeforeEnter from '@/components/order/BeforeEnter';
import OrderComponentGuard from '@/components/order/ComponentGuard';
import VuexStudyPage from '@/components/study/VuexStudyPage';

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/order/list',
          name: 'OrderList',
          component: OrderList,
          children:[
            {
              path: '/order/child-detail',
              name: 'ChildDetail',
              component: OrderDetail
            }
          ]
        },
        {
          path: '/order/detail',
          name: 'OrderDetail',
          component: OrderDetail
        },
        {
          name: 'OrderDynamic',
          path: '/order/dynamic/:id',
          component: OrderDynamic
        },
        {
          path: '/order/order-*',
          component: OrderCommon
        },
        {
          path: '/order/multi',
          component:OrderMultiView,
          children:[
            {
              path:'/order/multi/view',
              components:{
                a:OrderMultiSideBar,
                b:OrderMultiMain
              }
            }
          ]
        },
        {
          path:'/order/redirect',
          redirect:'/order/detail'
        },
        {
          path:'/order/alias',
          alias:'/isAlias',
          component:OrderAlias
        },
        {
          path:'/order/params',
          name:'OrderParam',
          component:OrderParam,
          props:true
        },
        {
          path:'/order/before-enter',
          component:OrderBeforeEnter,
          beforeEnter(to,from,next){
            console.log('触发路由独享守卫');
            next();
          }
        },
        {
          path:'/order/component-guard',
          component:OrderComponentGuard
        },
        {
          path:'/order/example-page',
          component:() => import('@/components/order/ExamplePage')
        },
        {
          name:'VuexStudyPage',
          path:'/vuex/study',
          component:VuexStudyPage
        },
        {
          path:'/router/param-persist',
          component: () => import('@/components/order/Persist')
        },
        {
          path:'/study/base',
          component: () => import('@/components/study/VueBase')
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  console.log('触发全局导航首位');
  next();
});

export default router;
