<template>
  <div class="mydata">
      <!--我的资料-->
    <div class="person">
      <div class="user_top">
        <div class="user_t_l_item">
          <div class="flex_b user_msg">
            <div class="user_msg_item">
              <span>{{person_t_l_title[0][0]}}</span>{{usermsg.username}}
            </div>
            <div class="user_msg_item">
              <span>{{person_t_l_title[0][1]}}</span>{{usermsg.userlevel}}
            </div>
             <div class="user_msg_item">
              <span>{{person_t_l_title[0][2]}}</span>{{usermsg.creditpoints}}
            </div>                      
          </div>
        </div>
         <div class="user_t_l_item">
          <div class="flex_b user_msg">
            <div class="user_msg_item">
              <span>{{person_t_l_title[1][0]}}</span>{{filterFun3(usermsg.userID)}}
            </div>
            <div class="user_msg_item">
              <span>{{person_t_l_title[1][1]}}</span>{{usermsg.usertyp}}
            </div>
             <div class="user_msg_item">
              <span>{{person_t_l_title[1][2]}}</span>{{usermsg.username}}
            </div>                      
          </div>
        </div>
        <div class="user_t_l_item">
          <div class="flex_b user_msg">
            <div class="user_msg_item">
              <span>{{person_t_l_title[2][0]}}</span>{{usermsg.loginIP}}
            </div>
            <div class="user_msg_item">
              <span>{{person_t_l_title[2][1]}}</span>{{usermsg.loginDration}}
            </div>
             <div class="user_msg_item">
              <span>{{person_t_l_title[2][2]}}</span>{{timestampToTime4(usermsg.loginTime)}}
            </div>                      
          </div>
        </div>               
      </div>
      <!--中部-->
      <div class="flex_s user_center">
            <div class="flex_b user_c_item">
                    <div class="flex_s_c">
                        <img src="../assets/img/myuserdatac1.png" alt="">
                        <span class="user_c_itemtext">账户余额</span>
                        <span class="color9 fontsize3">{{usermsg.userBalance||0}}</span>
                    </div>
                    <div class="flex_s_c">
                        <img src="../assets/img/myuserdatac2.png" alt="">
                        <span class="user_c_itemtext">累计收益</span>
                        <span class="color9 fontsize3">{{usermsg.accumulatedIncome||0}}</span>
                    </div>     
            </div>
      </div>
      <div class="user_bottom">
          <div class="flex_f user_bottom_list">
              <div class="user_bottom_list_l">本周任务总量</div>
              <div class="flex_f user_bottom_list_r"> <div class="progressitem progressitem1" ref="progressitem1"></div> <div>{{userdata.tasktotal||0}}</div></div>
          </div>
          <div class="flex_f user_bottom_list">
              <div class="user_bottom_list_l">本周任务完成总量</div>
              <div class="flex_f user_bottom_list_r"> <div class="progressitem progressitem2" ref="progressitem2"></div> <div>{{userdata.taskTotalComplete||0}}</div></div>
          </div>
          <div class="flex_f user_bottom_list">
              <div class="user_bottom_list_l">本周待完成数量</div>
              <div class="flex_f user_bottom_list_r"> <div class="progressitem progressitem3" ref="progressitem3"></div> <div>{{userdata.taskAwait||0}}</div></div>
          </div> 
          <div class="user_bottom_bg"><img src="../assets/img/user_btbg.png" alt=""></div>                   
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
      this.getdata()
    // let _that = this;
    // _that.$nextTick(() => {
    //   _that.drawLine();
    // });
    if(localStorage.getItem('userdata')){this.usermsg= localStorage.getItem('userdata')}
    this.usermsg=JSON.parse(this.usermsg)
    console.log( this.usermsg,1111);
    
  },
  data() {
    return {
      user_t_type: true,
      user_t_l_title: [
        ["用户名:", "当前用户等级:", "信用:"],
        ["用户ID:", "用户类型:", ""],
        ["最近登录:", "登录时间:", "登录时长:"]
      ],
      person_t_l_title: [
        ["用户名:", "当前用户等级:", "信用"],
        ["用户ID:", "用户类型:", ""],
        ["最近登录:", "登录时间:", "登录时长:"] 
      ],
      person_cll_data: [["链高", "链节点数"], ["链交易数", "智能合约数"]],
      person_clr_title: ["块号", "Hash", "打块时间"],
      person_clr_data: [
        ["总任务数", "已完成任务数"],
        ["待完成任务数", "累计渲染时长"]
      ],
      person_crr_title: ["任务", "帧数", "进度"],
      xAxisdata: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      yAxisdata: [0, 500, 1000, 1500],
      userdata:{
          username:'',
          userID:'',
         userlevel:'',
        usertype:'',
        lastLoginTime:'',
        loginTime:'',
        loginDration:'',
        userBalance:'',
        accumulatedIncome:'',
        tasktotal:'',
        taskTotalComplete:'',
        taskAwait:'',
      },
    usermsg:[[],[],[]]
    };
  },
  methods: {
      //获取数据
    getdata(){
        let _that=this
         this.$axios.post(this.$api.userlogin).then(rsp=>{   
           console.log(rsp.data,88888);
             _that.userdata=rsp.data
             console.log(_that.$refs.progressitem1);
             _that.$refs.progressitem1.style.width=(_that.userdata.tasktotal/150)*6+'rem'
              _that.$refs.progressitem2.style.width=(_that.userdata.taskTotalComplete/150)*6+'rem'
               _that.$refs.progressitem3.style.width=(_that.userdata.taskAwait/150)*6+'rem'
            //  _that.usermsg[0]=[_that.userdata.username,_that.userdata.userlevel,_that.userdata.username]
            //  _that.usermsg[1]=[_that.userdata.userID,_that.userdata.usertype,_that.userdata.username]
            //  _that.usermsg[2]=[_that.userdata.lastLoginTime,_that.userdata.loginTime,_that.userdata.loginDration]
        })  
    },    
  }}

</script>
<style scoped>
.mydata {
  background-color: #060619;
}
.user_top {
  padding: 0.4rem;
  margin-top: 0.2rem;
  height: 2.44rem;
  margin-bottom: 0.2rem;
  background-color: #11113f;
  border-radius: 4px;
  background: url("../assets/img/user_topbg.png") 100% 100% no-repeat;
  background-size: 100% 100%;
  border-radius: 4px;
}
.user_c_itemtext{
    opacity: 0.6;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    font-size: 0.18rem;
}
.user_center {
    height: 1.6rem;
  background-color: #11113f;
  padding-left: 0.7rem;
  border-radius: 4px;
}
.user_c_item{
    width: 6.14rem;
}
.user_msg {
  width: 6.75rem;
  height: 0.4rem;
  text-align: left;
}
.user_msg_item {
  flex: 1;
}
.user_msg_item span{
  margin-right: 0.1rem;
}
.user_c_l {
  flex: 1;
  height: 2.5rem;
  background-color: #11113f;
  margin-right: 0.2rem;
  border-radius: 4px;
  min-width: 593px;
}
.user_c_r {
  flex: 1;
  height: 2.5rem;
  background-color: #11113f;
  border-radius: 4px;
  min-width: 593px;
}
.lian_height {
  flex: 1;
}
.lian_height_r {
  flex: 1;
  padding: 0.14rem;
}
.lian_item {
  flex: 1;
  height: 50%;
}
.lian_item_t {
  border-bottom: solid 1px #2a2a66;
  box-sizing: border-box;
}
.lian_l_main {
  flex: 1;
  align-items: center;
  padding-left: 0.25rem;
}
.lian_l_main img {
  margin-right: 0.14rem;
  margin-bottom: 0.14rem;
}
.imgitem {
  /* width: 0.28rem;
    height: 0.25rem; */
  margin-bottom: 0.22rem;
}
.lian_clr_itemhead {
  background-color: #2a2a66;
  height: 0.4rem;
  line-height: 0.4rem;
  opacity: 0.9;
}
.lian_clr_item {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  border: solid 1px #2a2a66;
  box-sizing: border-box;
  opacity: 0.7;
}
.lian_clr_item:nth-child(2n) {
  opacity: 0.7;
}
.lian_clr_item:nth-child(2n-1) {
  background-color: #2a2a66;
  border: solid 1px #2a2a66;
  opacity: 0.7;
}
.list_item {
  flex: 1;
  text-align: left;
  padding-left: 0.17rem;
}
.user_bottom {
  width: 100%;
  height: 4.9rem;
  background-color: #11113f;
  margin-top: 0.2rem;
  border-radius: 4px;
  padding-left: 0.45rem;
  position: relative;
}
.user_bottom_bg{
    position: absolute;
    right: 0.4rem;
    bottom: 0.36rem;
}
.user_bottom_list{
    width: 100%;
    height: 0.72rem;
}
.user_bottom_list_l{
    width: 1.62rem;
    text-align: left;
    opacity: 0.6;
}
.user_bottom_list_r{
    width: 100%;
}
.progressitem{
     height: 10px;
    background-color: #fff;
    border-radius: 5px;   
    margin-right: 0.2rem
}
.progressitem1{
  background: linear-gradient(to right, #4949ff, #3f87e9 ,#35c4d3,#3bf6ef);
}
.progressitem2{
  background: linear-gradient(to right, #49a7ff, #3fb6e9 ,#35c4d3,#3bf6ef);
}
.progressitem3{
  background: linear-gradient(to right, #ff6d00, #e57813 ,#c68528);
}
.user_bottom_t {
  width: 100%;
  height: 0.75rem;
  padding: 0 0.2rem;
}
.user_bottom_tl {
  border-left: 4px solid #3261f7;
  padding-left: 0.2rem;
  opacity: 0.6;
}
.user_bottom_tr {
  width: 6rem;
  opacity: 0.6;
}
.charts {
  width: 100%;
  height: 3.95rem;
  box-sizing: border-box;
  border-radius: 4px;
  opacity: 1 !important;
}

#myChart {
  width: 100%;
  height: 3.95rem;
  opacity: 1;
  color: #fff;
  opacity: 1 !important;
}
.progress_item {
    width: 80%;
    height: 6px;
    background: linear-gradient(to right,#35c4d3,#3f87e9,#4949ff);
}

.box1 {
  width: 0.14rem;
  height: 0.14rem;
  background-color: #3261f7;
  margin-right: 0.1rem;
}
.box2 {
  width: 0.14rem;
  height: 0.14rem;
  background-color: #df830c;
  margin-right: 0.1rem;
}
.box3 {
  width: 0.14rem;
  height: 0.14rem;
  background-color: #3bf6ef;
  margin-right: 0.1rem;
}
.box4 {
  width: 0.14rem;
  height: 0.14rem;
  background-color: #7b7b7b;
  margin-right: 0.1rem;
}
.user_b_titem {
  height: 0.75rem;
  line-height: 0.75rem;
}
</style>