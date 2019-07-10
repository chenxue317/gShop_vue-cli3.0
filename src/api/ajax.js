/* 发送ajax请求的函数 */
import axios from 'axios'
import qs from 'qs'
import { Toast } from 'mint-ui';


import store from '../vuex/store'
import router from '../router';
//设置请求拦截器头---进行token校验


// 进行请求拦截
axios.interceptors.request.use(config => {
  // 只进行post请求的拦截，主要目的是将post请求的参数体改变为urlencoaed
 if (config.method === 'post' && config.data && typeof config.data === 'object'){
  config.data = qs.stringify(config.data)
 }
 //对needToken进行判断
 const {needToken} = config.headers
 if(needToken){
  const token = store.state.user.token
  if(token){
    config.headers.Authorization = token
  }else{
    const error = new Error('无token，请重新登录')
    error.status = 401
    throw error//抛出异常，不需要发送请求
  }
 }

  
  
  return config
})

// 响应拦截，1、处理响应数据，只返回data中的响应2、集中处理请求错误
axios.interceptors.response.use(response => {
 return response.data
}, error => {
  if(!error.response){//说明不是发送ajax请求得到的错误，而是前台校验没token
    if(error.status===401){
      //跳转到登录界面
      if(router.currentRoute.path!=='/login'){
        Toast('无token，不需要发请求');
        router.replace('/login')
      }else{
        console.log('无token，不需要发请求')
      }
    }

  }else{
    if(error.response.status===401){//有token但是token过期
      if(router.currentRoute.path!=='/login'){
        Toast(error.response.data.message)
        router.replace('/login')
      }else{
        console.log(error.response.data.message)
      }
      
    }else if(error.response.status===404){
      Toast(error.response.data.message)
    }
    store.dispatch('logout')
    return new Promise(() => {})
  }

  
  
  
})


export default axios
