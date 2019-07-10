import {
 RECIEVE_USER, 
 RESET_USER, 
 RECEIVE_TOKEN,
 RESET_TOKEN,
} from '../mutition-types'
import router from '../../router'

export default {
 state:{
  user:{},
  token:localStorage.getItem('token_key'),
 },
 mutations:{
  [RECIEVE_USER](state,user){
   state.user = user
  },
  [RECEIVE_TOKEN](state,token){
   state.token = token
  },
  [RESET_USER](state){
   state.user = {}
  },
  [RESET_TOKEN](state){
   state.token = ''
  },
 },
 actions:{
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
  },
 
 },
 getters:{}
}