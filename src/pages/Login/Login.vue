<template>
  <section class="loginContainer">
   <div class="loginInner">
     <div class="login_header">
       <h2 class="login_logo">硅谷外卖</h2>
       <div class="login_header_title">
         <a href="javascript:;" :class="{on:isShowPhone}" @click="isShowPhone=true">短信登录</a>
         <a href="javascript:;" :class="{on:!isShowPhone}" @click="isShowPhone=false">密码登录</a>
       </div>
     </div>
     <div class="login_content">
       <form>
         <div :class="{on:isShowPhone}" >
           <section class="login_message">
             <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
             <button :disabled="!isRightPhone" class="get_verification" 
              :class="{right_phone_number:isRightPhone}"
              @click.prevent="sendCode"
              >{{countDown>0?`已发送(${countDown})s`:'获取验证码'}}</button>
              <p v-if="isShowMsg" class="msg">{{phone.length===0?'手机号是必须的':'手机号应为11位'}}</p>
           </section>
           <section class="login_verification">
             <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
           </section>
           <section class="login_hint">
             温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
             <a href="javascript:;">《用户服务协议》</a>
           </section>
         </div>
         <div :class="{on:!isShowPhone}">
           <section>
             <section class="login_message">
              <input type="tel" maxlength="11" placeholder="用户名" v-model="name">
             </section>
             <section class="login_verification">
               <input :type="isShowPwd?'text':'password'"  placeholder="密码" v-model="pwd">
               <div class="switch_button" @click="isShowPwd=!isShowPwd" :class="isShowPwd?'on':'off'">
                 <div class="switch_circle" :class="{right:isShowPwd}"></div>
                 <span class="switch_text">{{isShowPwd?'abc':''}}</span>
               </div>
             </section>
             <section class="login_message">
               <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
               <img class="get_verification" :src="captchaImg" alt="captcha" @click="captchaImg=`http://localhost:5000/captcha?time=`+Date.now()">
             </section>
           </section>
         </div>
         <button class="login_submit" @click.prevent="login">登录</button>
       </form>
       <a href="javascript:;" class="about_us">关于我们</a>
     </div>
     <a href="javascript:" class="go_back" @click="$router.back()">
       <i class="iconfont icon-jiantou2"></i>
     </a>
   </div>
 </section>
</template>

<script type="text/ecmascript-6">
  import { reqCode, reqLoginPhone, reqLoginPwd } from '../../api'
  import {RECIEVE_USER} from '../../vuex/mutition-types'
  export default {
    data() {
      return {
        isShowPhone: false, // true为显示短信登录界面，false为密码登录界面
        phone:'',//进行表单验证
        code:'',
        countDown:0,//开启倒计时的时间
        isShowMsg:false,//表单验证信息显示与否
        isShowPwd:false,//false不显示密码 true显示密码
        captchaImg:'http://localhost:5000/captcha',
        captcha:'',
        name:'',
        pwd:''
      }
    },
    computed:{
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    watch:{
      phone(){
        this.isShowMsg=!this.isRightPhone
      }
    },

    methods:{

      async sendCode(){
        this.countDown = 10
        //发送请求验证码
        const result = await reqCode(this.phone)
        if(result.code===0){
          alert('验证码发送成功')
          //开启定时器
          const intervalId = setInterval(()=>{
            this.countDown--
            if(this.countDown===0){
              clearInterval(intervalId)
            }
          },1000)
        }else{
          alert('验证码发送失败')
          this.countDown = 0
        }
        
      },

      async login(){//点击登录按钮，进行表单验证，并发送ajax请求
        const { phone, code, name, pwd, captcha } = this
        let result
        //进行表单验证--先不做
        //发送ajax请求
       
        if(this.isShowPhone){//1、短信验证码登录
          
          result = await reqLoginPhone(phone, code)
          //为了读取方便，其余的组件也可以访问到user，用vuex来管理user
          
        }else{//2、用户名密码登录
          result = await reqLoginPwd({name, pwd, captcha})
        }
        if(result.code===0){
          const user = result.data
          this.$store.commit(RECIEVE_USER,user)
          //保存用户1、在state中保存2、将token永久保存到浏览器
          localStorage.setItem('token_key',user.token)
          this.$router.replace('/profile') 
        }else if(result.code===1){
          alert(result.msg)
        }
          
       
       
      
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .msg
              color red
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone_number
                color black
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition background-color .3s,border-color .3s
              padding 0 6px
              width 30px
              height 16px
              line-height 16px
              color #fff
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch_circle
                //transform translateX(27px)
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
                &.right
                  transform translateX(27px)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
 
</style>
