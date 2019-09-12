<template>
  <div id="home">
    <!--用户-->
    <div class="flex_s home">
     <div class="flex_f_f home_l" :class="hometype==2&&this.bootstype==true?'lessen':''">
       <div class="logo"><img src="../assets/img/logo.png" alt=""></div>
        <div class="home_l_item" @click="select_type(1)" :class="hometype==1?'active':''">
          <img src="../assets/img/pcl1.png" alt="">
          <span>我的资料</span>
        </div>
        <div class="home_l_item" @click="select_type(5)" :class="hometype==5?'active':''">
            <img src="../assets/img/pcl5.png" alt="">
          <span>项目发布列表</span>
        </div>
                <div class="home_l_item" @click="select_type(6)" :class="hometype==6?'active':''">
                   <img src="../assets/img/pcl6.png" alt="">
          <span>发布任务详细进度</span>
        </div>
                <div class="home_l_item" @click="select_type(7)" :class="hometype==7?'active':''">
                   <img src="../assets/img/pcl7.png" alt="">
             <span>任务接收列表</span>
        </div>
        <div class="home_l_item" @click="select_type(8)" :class="hometype==8?'active':''">
                   <img src="../assets/img/pcl8.png" alt="">
             <span>接收任务详细进度</span>
        </div>      
                <div class="home_l_item" @click="select_type(2)" :class="hometype==2?'active':''">
                   <img src="../assets/img/pcl2.png" alt="">
                   <span>全球区块链节点分布</span>
            
        </div>



     </div>
     <div class="home_r" :class="hometype==2&&this.bootstype==true?'boots':''">
         <my-data v-if="hometype==1"></my-data>
         <all-world  v-if="hometype==2"></all-world>
          <subject-list v-if="hometype==5"></subject-list>
          <mission-list v-if="hometype==6"></mission-list>
          <pub-project v-if="hometype==7"></pub-project>
          <receive-tack v-if="hometype==8"></receive-tack>        
     </div>
     </div>
     <div class="boots_btn"  v-if="hometype==2" @click="toboots()" :class=" this.bootstype?'el-icon-zoom-out':'el-icon-zoom-in'"></div>
     <div class="share"></div>
  </div>
</template>
<script>
import { setCookie, getCookie, delCookie } from "../assets/cookie";
import bus from "../assets/eventBus"
import myData from './myuserdata'
import userDstb from './userDstb'
import pubProject from './pub_project'
import userList from './userlist'
import subjectList from './subjectlist'
import allWorld from './allworld'
import missionList from './mission'
import receiveTack from './receiveTack'
 export default {
   components:{
      myData,
      pubProject,
      userDstb,
      userList,
      subjectList,
      allWorld,
      missionList,
      receiveTack
   },
   data(){
      return{
        hometype:1,
        bootstype:false
      }
   },
   methods:{
     toboots(){
       this.bootstype=!this.bootstype
     },
     select_type(val){
       this.hometype=val
     }
   }
}
</script>
<style scoped>
.share{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color:#060619;
   z-index: -1;
}
.active{
  background-color: #556eb0;
  opacity: 0.5;
}
.logo{
  width: 1.54rem;
  height: 0.41rem;
  margin: 0 auto;
  margin-top: 0.35rem;
  margin-bottom: 0.34rem;
}
.logo img{
    width: 1.54rem;
  height: 0.41rem;
}
.home_l{
  position: absolute;
  width: 2.5rem;
  height: 100%;
  left: 0;
  background-color: #11113f;
  color: #fff;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.home_l_item{
  width: 100%;
height: 0.6rem;
line-height: 0.6rem;
font-size: 14px;
text-align: left;
padding-left: 0.43rem;
cursor: pointer;
}
.home_l_item img{
  width: 0.15rem;
  height: 0.15rem;
  margin-right: 0.1rem;
}
.home_r{
  position: absolute;
  left: 2.7rem;
  height: 100%;
  width:16.3rem;
  color: #fff;
     -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    overflow: auto;
    text-align: left;
   -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.home_r::-webkit-scrollbar {
    width:0px;
    height:0px;
}
.home_r .-o-scrollbar{
    -moz-appearance: none !important;   
    background: rgba(0,255,0,0) !important;  
}
.boots{
  width: 100%;
  left: 0;
}
.lessen{
  width: 0%;
  display: none;
}
.boots_btn{
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid #000;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  color: #fff;
  font-size: 0.3rem
}
</style>
