/* 该模块是包含多个间接更改数据的函数的对象
 主要是用来发送异步任务，来请求数据
*/
import {reqAddress, reqCategorys, reqShops} from '../api'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutition-types'

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
 }


}