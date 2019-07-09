/* 该模块是包含多个间接更改数据的函数的对象
 主要是用来发送异步任务，来请求数据
*/
import {reqAddress, reqCategorys, reqShops} from '../api'
import {
 RECEIVE_ADDRESS, 
 RECEIVE_CATEGORYS, 
 RECEIVE_SHOPS, 
 RESET_USER, 
 RECIEVE_USER, 
 RECEIVE_TOKEN,
 RESET_TOKEN
} from './mutition-types'
import router from '../router'
export default {
 async getAddress({state, commit}){
  const {latitude, longitude} = state
  const result = await reqAddress({latitude, longitude})
  if (result.code === 0){
   const address = result.data
   commit(RECEIVE_ADDRESS, address)
  }
 },

 async getCategorys({state, commit}){
  const result = await reqCategorys()
  if (result.code === 0){
   const categorys = result.data
   commit(RECEIVE_CATEGORYS, categorys)
  }
 },

 async getShops({state, commit}){
  const {latitude, longitude} = state
  const result = await reqShops({latitude, longitude})
  if (result.code === 0){
   const shops = result.data
   commit(RECEIVE_SHOPS, shops)
  }
 },

 logout({commit}){
  //1、跳转到登录页面
  router.replace('/login')
  //2、清除所有的用户缓存-将user置为空--将localstorage清除--将cookie清除
  commit(RESET_USER)
  commit(RESET_TOKEN)
  localStorage.removeItem('token_key')
 },

 //用户登录保存用户
 recordUser({commit,state},user){

  const token = user.token
  // 将token永久保存到浏览器
  localStorage.setItem('token_key',token)
  // 将token保存到state中
  state.token = token
  commit(RECEIVE_TOKEN,token)
  //将user中的token删除
  delete user.token
  //将用户保存到state中
  commit(RECIEVE_USER,user)
  router.replace('/profile')
 }


}