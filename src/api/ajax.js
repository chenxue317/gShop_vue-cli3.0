/* 发送ajax请求的函数 */
import axios from 'axios'
import qs from 'qs'


import store from '../vuex/store'
import router from '../router'
import Cookies from 'js-cookie'

//设置请求拦截器头---进行token校验


// 进行请求拦截
axios.interceptors.request.use(config => {
  // 只进行post请求的拦截，主要目的是将post请求的参数体改变为urlencoaed
 if (config.method === 'post' && config.data && typeof config.data === 'object'){
  config.data = qs.stringify(config.data)
 }
  const token = localStorage.getItem('token_key')
  if(token){
    config.headers.Authorization = 'token '+ token
  } 
  return config
})

// 响应拦截，1、处理响应数据，只返回data中的响应2、集中处理请求错误
axios.interceptors.response.use(response => {
 return response.data
}, error => {
  if(error.response.status===401){
    alert(error.response.data.message)
  }else if(error.response.status===404){
    alert(error.response.data.message)
  }
  //1、跳转到登录页面
  router.replace('/login')
  //2、清除所有的用户缓存-将user置为空--将localstorage清除--将cookie清除
  store.state.user={}
  localStorage.removeItem('token_key')
  Cookies.remove('user_id')
 
 return new Promise(() => {})
})


export default axios
