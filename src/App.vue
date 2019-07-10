<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-if="$route.meta.isShowFooter"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide  from './components/FooterGuide/FooterGuide'
  import { reqAutoLogin } from './api'
  import { RECIEVE_USER } from './vuex/mutition-types'
  export default {
    async mounted(){
      const result = await reqAutoLogin()
      if(result){
        if(result.code===0){//请求正确才会存储user
          const user = result.data
          this.$store.commit(RECIEVE_USER,user)
        }else{
          this.$router.replace('/login')
        }
      }
      
      
    },
    components:{
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


 
</style>
