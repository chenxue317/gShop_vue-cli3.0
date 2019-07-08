/* 发送ajax请求的函数 */
import axios from 'axios'
import qs from 'qs'

// 进行请求拦截
axios.interceptors.request.use(config => {
  // 只进行post请求的拦截，主要目的是将post请求的参数体改变为urlencoaed
 if (config.method === 'post' && config.data && typeof config.data === 'object'){
  config.data = qs.stringify(config.data)
 }
  return config
})

// 响应拦截，1、处理响应数据，只返回data中的响应2、集中处理请求错误
axios.interceptors.response.use(response => {
 return response.data
}, function (error) {
 alert(error.message)
 return new Promise(() => {})
})


export default axios
