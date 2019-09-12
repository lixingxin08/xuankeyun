<template>
  <div id="login">
    <div class="login">
      <div class="login_title color1"><img src="../assets/img/logo.png" alt=""></div>
      <div class="flex_s login_head">
        <span @click="changge(true)" class="login_head_l" :class="logintype?'login_head_bg':''">用户</span>
        <span @click="changge(false)" :class="logintype?'':'login_head_bg'">管理员</span>
      </div>
      <div class="login_email" v-if="logintype">
        <div class="flex_b login_item">
          <!-- <div class="logo"><img src="../assets/img/touxiangxiao.png" alt=""></div> -->
          <input type="email" v-model="logindata.username" placeholder="请输入用户名" @blur="verify(logindata.username)" />
        </div>
            <!-- <div v-if="login_tipstype">{{login_tips}}</div> -->
        <div class="flex_b login_item">
           <!-- <div class="logo"><img src="../assets/img/touxiangxiao.png" alt=""></div> -->
          <input type="password" v-model="logindata.password" placeholder="请输入密码" />
        </div>
      </div>
      <div class="login_tel" v-if="!logintype">
        <div class="flex_b login_item">
           <!-- <div class="logo"><img src="../assets/img/touxiangxiao.png" alt=""></div> -->
          <input type="tel" v-model="logindata.username" placeholder="请输入管理员用户名" @blur="verify(logindata.username)"/>       
        </div>
        <!-- <div v-if="login_tipstype">{{login_tips}}</div> -->
        <div class="flex_b login_item">
           <!-- <div class="logo"><img src="../assets/img/touxiangxiao.png" alt=""></div> -->
          <input type="password" v-model="logindata.password" placeholder="请输入密码" />
        </div>
      </div>
      <div class="submit" @click="login()">登录</div>
    </div>
  </div>
</template>
<script>
import { setCookie, getCookie, delCookie } from "../assets/cookie";
import bus from "../assets/eventBus"
import { type } from 'os';
export default {
  data() {
    return {
           baseUrl: this.GLOBAL.baseUrl,
            baseUrlTwo: this.GLOBAL.baseUrlTwo,
            baseUrltree: this.GLOBAL.baseUrltree,
            baseHerf: this.GLOBAL.baseHerf,
      login_tips:'',
      login_tipstype:false,
      logintype: true,
      logindata: {
        username: "",
        password: "",
        email:'',
        phone:'',
        mode:''
      }
    };
  },
  methods: {
    changge(val) {
      this.logintype = val;
      this.logindata.email = "";
       this.logindata.phone = "";
      this.logindata.password = "";
      this.login_tips=""
    },
    //登录
    login(){
      let _that=this
      console.log(this.logindata)
      if(this.login_tipstype==false&&this.logindata.password!==""){
        this.$axios.post(this.$api.userlogin,{username:this.logindata.username,password:this.logindata.password}).then(rsp=>{ 
          console.log(rsp,9999);
            localStorage.setItem('userdata',JSON.stringify(rsp.data))
            //               if(_that.logintype){
            //     _that.$router.push({name:'home'})
            // }else{
            //    _that.$router.push({name:'homeitem'})
            // }
        })
      }else{
        console.log(3333)
          if(this.logintype==true&&this.logindata.password==""){
               this.logindata.email = "";
               this.logindata.phone = "";
              alert(this.login_tips)
          }else{
            console.log(this.logintype,this.logindata.password,'aaaaa')
            alert(this.login_tips)
          }
      }

    },
    //验证
    verify(val){
        if(this.logintype){
          if(val){
             this.login_tipstype=false
          }else{
            this.login_tipstype=true;
              this.logindata.username=''
            alert("请输入正确用户名")
          }
        }else{
          if(val){
              this.login_tipstype=false
          }else{
             this.login_tipstype=true
             this.logindata.username=''
             alert("请输入正确管理员用户名")
          }
        }
    }
  }
};
</script>
<style scoped>
#login {
  min-height: 3rem;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../assets/img/login_bg.jpg') 100% 100% no-repeat
}
.login {
  width:4.72rem;
  height:5.06rem;
  background-color:rgba(16,16,59,1);
  margin: 0 auto;
  margin-top: 1.71rem;
  padding: 0 0.4rem;
  padding-top: 0.54rem;
  text-align: left;
  color: #fff;
}
.login_title {
  width: 1.54rem;
  height: 0.41rem;
  margin: 0 auto;
}
.login_title img{
    width: 1.54rem;
  height: 0.41rem;
}
.color1 {
  color: #2e73e8;
}
.login_head {
  font-size: 18px;
  cursor: pointer;
  margin-top: 0.67rem;
  margin-bottom: 0.36rem;
  opacity: 0.8;
}
.login_head_l {
  margin-right: 0.59rem;
}
.login_head_bg {
  border-bottom: 1px solid #2e73e8;
  color: #2e73e8;
}
.flex_a {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.flex_b {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex_f {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.submit {
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 0.26rem;
  background-color: #2e73e8;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  	font-weight: normal;
	font-stretch: normal;
}
.login_item {
  width: 100%;
  margin-top: 0.26rem;
  border: 1px solid #626262;
  color: #888888;
}
.login_item input {
  width: 100%;
  height: 0.5rem;
  padding-left:0.1rem;
  line-height: 0.3rem;
  border: none;
  background-color: rgba(16,16,59,1);
}
.logo{
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
}
.logo img{
  width: 0.2rem;
  height: 0.2rem;
}
</style>