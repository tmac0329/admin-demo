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

Vue.use(Router)

export default new Router({
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
        }
      ]
    }
  ]
})
