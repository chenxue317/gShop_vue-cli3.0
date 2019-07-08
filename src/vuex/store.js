/**
 * 该模块是vuex的核心模块，向外暴露一个store对象
 */
import Vue from 'vue'
import Vuex, {Store} from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Store({
 state,
 mutations,
 actions,
 getters
})