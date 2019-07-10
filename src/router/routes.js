import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo.vue'
export default [
 {
  path: '/msite',
  component: MSite,
  meta:{
   isShowFooter:true
  }
 },
 {
  path: '/search',
  component:Search,
  meta:{
   isShowFooter:true
  }
 },
 {
  path:'/order',
  component:Order,
  meta:{
   isShowFooter:true
  }
 },
 {
  path:'/profile',
  component:Profile,
  meta:{
   isShowFooter:true
  }
 },
 {
  path:'/login',
  component:Login,
  meta:{
   isShowFooter:false
  }
 },
 {
  path:'/shop',
  component:Shop,
  children:[
   {path:'/shop/goods',component:ShopGoods},
   {path:'/shop/ratings',component:ShopRatings},
   {path:'/shop/info',component:ShopInfo},
   {path:'/shop',redirect:'/shop/goods'}
  ]
 },
 {
  path:'/',
  redirect:'/msite'
 }

]