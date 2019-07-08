/* 该模块是包含多个直接更改数据的函数的对象 */
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS} from './mutition-types'
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
}