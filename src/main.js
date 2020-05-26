// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.directive('focus',{
  inserted:function(el){
    el.focus();
  }
})

Vue.directive('autocomplete',{
  bind:()=>{
    console.log('bind');
  },
  inserted:(el,binding)=>{
    console.log('inserted');
    el.value = '1111';
    console.log(el.dataset.pro);
    console.log(binding);
  },
  update:()=>{
    console.log('update');
  },
  componentUpdated:()=>{
    console.log('componentUpdated');
  },
  unbind:()=>{
    console.log('unbind')
  }
})

Vue.filter('formateName',function(value){
  if(!value){return ''}
  return value.toUpperCase()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
