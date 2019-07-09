
## day 04
 ###1、 语法检查：
   在package.json中配置，就是关闭相关的语法检查的配置
 ###2、在node中如何启动js文件
   node 文件名
 ###3、token问题
 1、token保存
    a、登录之后，将token保存到state中，为了之后发送请求方便，直接在state中读取
    b、将token保存到localstorage中，持久化保存
 2、区别对待ajax请求（有些请求后台不校验token）
    a、在请求配置信息中加上一个属性：needToken
    b、在请求拦截器中读取needToken，若是有值且为true，则需要携带token
        i。首先读取state中的token
        ii  判断token是否有值，
            1、有值，则在config中加入config.headers.Authorization = token
            2、无值，跳转到登录界面，说明没有登录过，此时只要一个请求就可以证明没有token，此时就不需要再向后台发送请求，直接拦截请求，即throw error
            提示没有token，后续的就不再做提示，（实现这一步骤，是再响应拦截器
            错误响应中处理通过判断是否已经跳转到登录界面）
    c、没有needToken，就不用做任何处理，直接发送请求即可   
