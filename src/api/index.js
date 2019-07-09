/* 该模块是发送请求的函数模块，每个函数都返回一个promise对象 */
import ajax from './ajax'
// 1、根据经纬度获取位置详情
const BASE = '/api'

export const reqAddress = ({latitude, longitude}) => ajax.get(`${BASE}/position/${latitude},${longitude}`)
//  2、获取食品分类列表
export const reqCategorys = () => ajax(
 {
  url:BASE + '/index_category',
  headers:{needToken:true}
 }
)
// 3、根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax(
  {
   url:`${BASE}/shops`,
   params:{
    latitude, longitude
   },
   headers:{needToken:true}
  }
 )
//4、用户名密码登陆
export const reqLoginPwd = ({ name, pwd, captcha }) => ajax.post(BASE + '/login_pwd',{ name, pwd, captcha })
//5、短信验证码登录
export const reqLoginPhone = (phone, code) => ajax.post(BASE + '/login_sms',{ phone, code })
//6、发送短信验证码
export const reqCode = (phone) => ajax.get(BASE + '/sendcode',{ params:{ phone }})
//7、用户自动登录
export const reqAutoLogin = () => ajax(
  {
    url:BASE + '/auto_login',
    headers:{needToken:true} //需要携带token，所以要置为true
  }
)


