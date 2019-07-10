/**
 * 该模块是vuex的核心模块，向外暴露一个store对象
 */
import Vue from 'vue'
import Vuex, {Store} from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//引入模块
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'


Vue.use(Vuex)

export default new Store({
 mutations,
 actions,
 getters,
 modules:{
  msite,
  shop,
  user
 }
})