
import {
 RECEIVE_ADDRESS, 
 RECEIVE_CATEGORYS, 
 RECEIVE_SHOPS, 
} from '../mutition-types'
import { reqAddress, reqCategorys, reqShops } from '../../api'

export default {
 state:{
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 维度 
  address:{},
  categorys:[],
  shops:[],
 },
 mutations:{

  [RECEIVE_ADDRESS](state, address){
   state.address = address
  },

  [RECEIVE_CATEGORYS](state, categorys){
   state.categorys = categorys
  },

  [RECEIVE_SHOPS](state, shops){
   state.shops = shops
  },

 },
 actions:{
  async getAddress({state, commit}){
   const {latitude, longitude} = state
   const result = await reqAddress({latitude, longitude})
   if (result.code === 0){
    const address = result.data
    commit(RECEIVE_ADDRESS, address)
   }
  },
 
  async getCategorys({commit}){
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
 },
 getters:{}
}