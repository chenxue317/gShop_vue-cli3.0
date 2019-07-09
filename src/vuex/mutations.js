/* 该模块是包含多个直接更改数据的函数的对象 */
import {
 RECEIVE_ADDRESS, 
 RECEIVE_CATEGORYS, 
 RECEIVE_SHOPS, 
 RECIEVE_USER, 
 RESET_USER, 
 RECEIVE_TOKEN,
 RESET_TOKEN
} from './mutition-types'
export default {
 [RECEIVE_ADDRESS](state, address){
  state.address = address
 },
 [RECEIVE_CATEGORYS](state, categorys){
  state.categorys = categorys
 },
 [RECEIVE_SHOPS](state, shops){
  state.shops = shops
 },
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
 }
 
}