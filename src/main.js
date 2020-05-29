import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//配置全局样式
import './assets/css/global.css'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


import axios from 'axios'
axios.defaults.baseURL = '/api'
// 配置请求拦截器
axios.interceptors.request.use(config=>{
  if(store.state.token){
    config.headers.Authorization = localStorage.token;
  }
  return config//必须return
},err=>{
  return Promise.reject(err);
})

// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//       if (error.response) {
//           switch (error.response.status) {
//               case 401:
//                   // 这里写清除token的代码
//                   router.replace({
//                       path: 'home',
//                       query: {redirect: router.currentRoute.fullPath}   //登录成功后跳入浏览的当前页面
//                   })
//           }
//       }
//       return Promise.reject(error.response) 
//   });

// 配置时间过滤器
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 +'').padStart(2,'0')
  const d = (dt.getDate( )+'').padStart(2,'0')

  // const hh = (dt.getHours() + '').padStart(2,'0')
  // const mm = (dt.getMinutes() + '').padStart(2,'0')
  // const ss = (dt.getSeconds() + '').padStart(2,'0')

  return `${y}-${m}-${d}`
  // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.filter('musictime',function(originVal){
  const dt = new Date(originVal)
  // const y = dt.getFullYear()
  // const m = (dt.getMonth() + 1 +'').padStart(2,'0')
  // const d = (dt.getDate( )+'').padStart(2,'0')

  // const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')
  return `${mm}:${ss}`
})

// 使用$http请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
