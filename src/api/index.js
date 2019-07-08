/* 该模块是发送请求的函数模块，每个函数都返回一个promise对象 */
import ajax from './ajax'
// 1、根据经纬度获取位置详情
const BASE = '/api'

export const reqAddress = ({latitude, longitude}) => ajax.get(`${BASE}/position/${latitude},${longitude}`)
//  2、获取食品分类列表
export const reqCategorys = () => ajax.get(BASE + '/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax.get(`${BASE}/shops`, {params:{latitude, longitude}})

