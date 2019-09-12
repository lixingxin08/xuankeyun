<template>
  <div class="mydata">
      <!--我的资料-->
    <div class="person" v-if="user_t_type">
      <div class="user_top">
                  <div class="user_t_l_item">
          <div class="flex_b user_msg">
            <div class="user_msg_item">
              <span>{{person_t_l_title[0][0]}}</span>{{usermsg.username}}
            </div>
            <div class="user_msg_item">
              <span>{{person_t_l_title[0][1]}}</span>{{filterFun3(usermsg.userID)}}
            </div>
             <div class="user_msg_item">
              <span>{{person_t_l_title[0][2]}}</span>
            </div>                      
          </div>
        </div>
                          <div class="user_t_l_item">
          <div class="flex_b user_msg">
            <div class="user_msg_item">
              <span>{{person_t_l_title[1][0]}}</span>{{usermsg.lastip}}
            </div>
            <div class="user_msg_item">
              <span>{{person_t_l_title[1][1]}}</span>{{usermsg.logintime}}
            </div>
             <div class="user_msg_item">
              <span>{{person_t_l_title[1][2]}}</span>{{timestampToTime4(usermsg.logintimetotal)}}
            </div>                      
          </div>
        </div>               
      </div>
      <!--中部-->
      <div class="flex_s user_center">
        <!--中部左边-->
        <div class="flex_s user_c_l">
          <!--链高-->
          <div class="lian_height">
            <div class="flex_b lian_item lian_item_t">
              <div class="flex_s lian_l_main">
                <img src="../assets/img/liangao1.png" alt />
                <div class="flex_f_f">
                     <span class="fontstyle1 color2">{{user_cldata.blockHeight}}</span>
                  <span class="fontstyle2 opacite1">{{person_cll_data[0][0]}}</span>
                 
                </div>
              </div>
              <div class="flex_s lian_l_main">
                <img src="../assets/img/liangao2.png" alt />
                <div class="flex_f_f">
                     <span class="fontstyle1 color2">{{user_cldata.blockNodeNumber}}</span>
                  <span class="fontstyle2 opacite1">{{person_cll_data[0][1]}}</span>
                 
                </div>
              </div>
            </div>
            <div class="flex_b lian_item">
              <div class="flex_s lian_l_main">
                <img src="../assets/img/liangao3.png" alt />
                <div class="flex_f_f">
                      <span class="fontstyle1 color2">{{user_cldata.blockTransactionNumber}}</span>
                  <span class="fontstyle2 opacite1">{{person_cll_data[1][0]}}</span>
                
                </div>
              </div>
              <div class="flex_s lian_l_main">
                <img src="../assets/img/liangao4.png" alt />
                <div class="flex_f_f">
                      <span class="fontstyle1 color2">{{user_cldata.smartcontractNumber}}</span>
                  <span class="fontstyle2 opacite1">{{person_cll_data[1][1]}}</span>
                
                </div>
              </div>
            </div>
          </div>
          <!--链高列表-->
          <div class="lian_height_r">
            <div class="flex_s lian_clr_itemhead">
              <div class="list_item opacite1">{{person_clr_title[0]}}</div>
               <div class="list_item opacite1">{{person_clr_title[1]}}</div>
                <div class="list_item list_item3 opacite1">{{person_clr_title[2]}}</div>
            </div>
            <div class="flex_s lian_clr_item" v-for="(item,index) in blockdata" :key="index">
             
              <div class="list_item list_item1" >{{blockdata[index].blocknumber}}</div>
               <div class="list_item list_item2 list_itemtip">{{filterFun2(blockdata[index].blockhash)}} <div class="list_itemtips">{{blockdata[index].blockhash}}</div></div>
                <div class="list_item list_item3" >{{blockdata[index].blocktime}}</div>
            </div>
          </div>
        </div>
        <!--中部右边-->
        <div class="flex_s user_c_r">
          <!--总任务数-->
          <div class="lian_height">
            <div class="flex_b lian_item lian_item_t">
              <div class="flex_s lian_l_main">
                <img src="../assets/img/all1.png" class="imgitem" alt />
                <div class="flex_f_f">
                  <span class="fontstyle1 color3">{{renderbasicdata.taskNumber}}</span>
                  <span class="fontstyle2 opacite1">{{person_clr_data[0][0]}}</span>
                </div>
              </div>
              <div class="flex_s lian_l_main">
                <img src="../assets/img/all2.png" class="imgitem" alt />
                <div class="flex_f_f">
                  <span class="fontstyle1 color3">{{renderbasicdata.taskCompleteNumber}}</span>
                  <span class="fontstyle2 opacite1">{{person_clr_data[0][1]}}</span>
                </div>
              </div>
            </div>
            <div class="flex_b lian_item">
              <div class="flex_s lian_l_main">
                <img src="../assets/img/all3.png" class="imgitem" alt />
                <div class="flex_f_f">
                  <span class="fontstyle1 color3">{{renderbasicdata.taskWaitNumber}}</span>
                  <span class="fontstyle2 opacite1">{{person_clr_data[1][0]}}</span>
                </div>
              </div>
              <div class="flex_s lian_l_main">
                <img src="../assets/img/all4.png" class="imgitem" alt />
                <div class="flex_f_f">
                  <span class="fontstyle1 color3">{{renderbasicdata.taskTime}}</span>
                  <span class="fontstyle2 opacite1">{{person_clr_data[1][1]}}</span>
                </div>
              </div>
            </div>
          </div>
          <!--总任务列表-->
          <div class="lian_height_r">
            <div class="flex_s lian_clr_itemhead">
                <div class="list_item opacite1">{{person_crr_title[0]}}</div>
               <div class="list_item opacite1">{{person_crr_title[1]}}</div>
                <div class="list_item list_item3 opacite1">{{person_crr_title[2]}}</div>
            </div>
            <div class="flex_s lian_clr_item" v-for="(item,index) in rendertaskdata" :key="index">
              <div class="list_item">{{rendertaskdata[index].taskframe}}</div>
              <div class="list_item list_item2 list_itemtip">{{filterFun2(rendertaskdata[index].taskid)}}<div class="list_itemtips">{{rendertaskdata[index].taskid}}</div></div>
              <div class="flex_b list_item list_item3">
                <div class="progress_item" ref="progress_item">   
                </div>
                <span> {{rendertaskdata[index].taskplan}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="user_bottom">
        <div class="flex_b user_bottom_t">
          <div class="user_bottom_tl">2周内渲染实况数据跟踪</div>
          <div class="flex_b user_bottom_tr">
            <div class="flex_f user_b_titem">
              <div class="box1"></div>
              <div>成功接收任务数</div>
            </div>
            <div class="flex_f user_b_titem">
              <div class="box2"></div>
              <div>任务接收失败</div>
            </div>
            <div class="flex_f user_b_titem">
              <div class="box3"></div>
              <div>渲染成功</div>
            </div>
            <div class="flex_f user_b_titem">
              <div class="box1"></div>
              <div>渲染失败</div>
            </div>
          </div>
        </div>
        <div class="charts">
          <div id="myChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
      this.getaministratormessage()
      this.getdata()
    this.getblockdata()
    this.getrenderbasicdata()
    this.getrendertaskdata()
    this.gettasktrace()  
    let _that = this;
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
        ["用户名:", "用户ID:", ""],
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
      AllKlinedata: {
        //总曲线数据
        xAxisdata: [],
        val: []
      },
      user_cldata:{
          blockHeight:'',
          blockNodeNumber:'',
          blockTransactionNumber:'',
          smartcontractNumber:''
      },
      blockdata:[{blocknumber:'',blockhash:'',blocktime:''}],
      renderbasicdata:'',
      rendertaskdata:[],
      tasktrace:'',
      tasktrace_date:[],
      tasktrace_list1:[],
      tasktrace_list2:[],
      tasktrace_list3:[],
      tasktrace_list4:[],
      aministratormessage:'',
      usermsg:''
    };
  },
  methods: {
      //获取管理员信息
    getaministratormessage(){
        let _that=this
         this.$axios.post(this.$api.aministratormessage).then(rsp=>{
              console.log(rsp.data);     
             _that.usermsg=rsp.data      
        })              
    },

      //获取区块链基本数据
    getdata(){
        let _that=this
         this.$axios.post(this.$api.blockHeight).then(rsp=>{
              console.log(rsp.data);     
             _that.user_cldata=rsp.data      
        })              
    },
    //区块链区块数据
    getblockdata(){
        let _that=this
         this.$axios.post(this.$api.blockdata).then(rsp=>{    
             _that.blockdata=rsp.data      
        })              
    },
    //渲染任务基本数据
        getrenderbasicdata(){
        let _that=this
         this.$axios.post(this.$api.renderbasicdata).then(rsp=>{    
             _that.renderbasicdata=rsp.data      
        })              
    }, 
    //渲染任务任务显示 
            getrendertaskdata(){
        let _that=this
         this.$axios.post(this.$api.rendertaskdata).then(rsp=>{    
             _that.rendertaskdata=rsp.data               
        })              
    },
    //2周内渲染实况数据跟踪
            gettasktrace(){
        let _that=this
         this.$axios.post(this.$api.tasktrace).then(rsp=>{  
             _that.tasktrace=rsp.data 

                     
             for (let i = 0; i <= _that.tasktrace.receivefailtask.length-1; i++) { 
                 _that.tasktrace_date[i]=_that.tasktrace.receivefailtask[i].taskdatatime
                             _that.$set(_that.tasktrace_date,i,_that.tasktrace.receivefailtask[i].taskdatatime)
                             _that.$set(_that.tasktrace_list1,i,_that.tasktrace.receivefailtask[i].tasknumber)
                             _that.$set(_that.tasktrace_list2,i,_that.tasktrace.receivesuccesstask[i].tasknumber)
                             _that.$set(_that.tasktrace_list3,i,_that.tasktrace.rendercomplete[i].tasknumber)
                            _that.$set(_that.tasktrace_list4,i,_that.tasktrace.renderfail[i].tasknumber) 
             }     
                     _that.$nextTick(() => {
           _that.drawLine();
    });
        })              
    },       
      //画图
     drawLine() {
      let _that = this;
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      let date=1       
      myChart.showLoading();
      myChart.setOption({
        title: { text: "" },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          show: false,
          data: ["成功接收任务数", "任务接收失败", "渲染成功", "渲染失败"]
        },
        xAxis: {
          type: "category",
          data:  _that.tasktrace_date,
          boundaryGap: false,
          min: _that.tasktrace_date[0],
          splitNumber:7,
          axisLine: {
            lineStyle: {
              color: "#babac0",
              width: 1,
              opacity: 0.6
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#babac0",
              fontSize: 14
            }
          }
        },
        yAxis: {
          show: true,
          type: "value",
          max: 100,
          min: 0,
          boundaryGap: false,
          splitNumber: 10,
          axisLine: {
            lineStyle: {
              color: "#babac0",
              width: 1,
              opacity: 0.6
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: function(value) {
              var texts = [];
              if (value == 0) {
                texts.push("0");
              } else if (value <= 10) {
                texts.push("10");
              } else if (value <= 20) {
                texts.push("20");
              } else if (value <= 30) {
                texts.push("30");
              } else if (value <= 40) {
                texts.push("40");
              } else if (value <= 50) {
                texts.push("50");
              } else if (value <= 60) {
                texts.push("60");
              } else if (value <= 70) {
                texts.push("70");
              } else if (value <= 80) {
                texts.push("80");
              } else if (value <= 90) {
                texts.push("90");
              } else if (value <= 100) {
                texts.push("100");
              }
              return texts;
            },
            textStyle: {
              color: "#babac0",
              fontSize: 14
            }
          }
        },
        series: [
          {
            name: "成功接收任务数",
            data:_that.tasktrace_list2,
            type: "line",
            smooth: true,
            showSymbol: false,
            hoverAnimation: false,
            // color: 'rgba(46, 115, 232, 1)',
            lineStyle: {
              color: "#3261f7",
              width: 3,
              opacity: 0.6
            }
          },
          {
            name: "任务接收失败",
            data:_that.tasktrace_list1,
            type: "line",
            smooth: true,
            showSymbol: false,
            hoverAnimation: false,
            // color: 'rgba(46, 115, 232, 1)',
            lineStyle: {
              color: "#df830c",
              width: 3,
              opacity: 0.6
            }
          },
          {
            name: "渲染成功",
            data:_that.tasktrace_list3,
            type: "line",
            smooth: true,
            showSymbol: false,
            hoverAnimation: false,
            // color: 'rgba(46, 115, 232, 1)',
            lineStyle: {
              color: "#3bf6ef",
              width: 3,
              opacity: 0.6
            }
          },
          {
            name: "渲染失败",
            data:_that.tasktrace_list4,
            type: "line",
            smooth: true,
            showSymbol: false,
            hoverAnimation: false,
            // color: 'rgba(46, 115, 232, 1)',
            lineStyle: {
              color: "#7b7b7b",
              width: 3,
              opacity: 0.6
            }
          }
        ]
      });
      myChart.hideLoading();
    },
    },    
  }

</script>
<style scoped>
.mydata {
  background-color: #060619;
}
.user_top {
  width: 100%; 
  padding: 0.4rem;
  margin-top: 0.2rem;
  height: 1.6rem;
  margin-bottom: 0.2rem;
  background-color: #11113f;
  border-radius: 4px;
  background: url("../assets/img/user_topbg.png") 100% 100% no-repeat;
  border-radius: 4px;
}
.user_center {
  background-color: #060619;
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
.list_itemtip{
    position: relative;
}
.list_itemtips{
    display: none;
 position: absolute;
 height: 0.2rem;
 border-radius: 0.1rem;
 padding: 0 0.1rem;
 line-height: 0.2rem;
 top: 0;
 right: 0.1rem;
 z-index: -10;
 transform: translate(50%,0%)
}
.list_itemtip:hover .list_itemtips{
    display: block;
    background-color: black;
    color: #fff;
    opacity: 1;
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
.list_item2{
    height: 100%;
}
.list_item3{
    flex: 2
}
.list_itemhead:nth-child(3){
    text-align: center;
}
.user_bottom {
  width: 100%;
  height: 4.7rem;
  background-color: #11113f;
  margin-top: 0.2rem;
  border-radius: 4px;
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