import {
 RECEIVE_GOODS,
 RECEIVE_RATINGS,
 RECEIVE_INFO
} from '../mutition-types'
import { reqInfo, reqRatings, reqGoods } from '../../api'

export default {
 state:{
  goods:[],
  ratings:[],
  info:{}
 },
 mutations:{
  [RECEIVE_GOODS](state,goods){
   state.goods = goods
  },
  [RECEIVE_RATINGS](state,ratings){
   state.ratings = ratings
  },
  [RECEIVE_INFO](state,info){
   state.info = info
  }
 },
 actions:{
  //异步请求
 async getGoods({commit}){
  const result = await reqGoods()
  if (result.code === 0){
   const goods = result.data
   commit(RECEIVE_GOODS, goods)
  }
 },
 async getRatings({commit}){
  const result = await reqRatings()
  if (result.code === 0){
   const ratings = result.data
   commit(RECEIVE_RATINGS, ratings)
  }
 },
 async getInfo({commit}){
  const result = await reqInfo()
  if (result.code === 0){
   const info = result.data
   commit(RECEIVE_INFO, info)
  }
 },
 },
 getters:{}
}