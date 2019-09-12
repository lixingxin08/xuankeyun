<template>
    <div id="subjectlist">
        <!--项目发布列表头部-->
    <div class="subjectlist_t">
        <div class="userlist_t">
             用户总数: 120
        </div>
            <div class="flex_b userlist_main">
            <div class="userlist_item1">{{userlist_head[0]}}</div>
            <div class="userlist_item2">{{userlist_head[1]}}</div>
            <div class="userlist_item3">{{userlist_head[2]}}</div>
            <div class="userlist_item4">{{userlist_head[3]}}</div>
            <div class="userlist_item5">{{userlist_head[4]}}</div>
            <div class="userlist_item6">{{userlist_head[5]}}</div>
            <div class="userlist_item7">{{userlist_head[6]}}</div>
            <div class="userlist_item8">{{userlist_head[7]}}</div>
            <div class="userlist_item9">{{userlist_head[8]}}</div>
            <div class="userlist_item10">{{userlist_head[9]}}</div>
            <div class="userlist_item11">{{userlist_head[10]}}</div>
        </div>
        <div class="flex_b userlist_main" v-for="(item,index) in projectbasicdata" :key="index">
            <div class="userlist_item1">{{filterFun3(item.renderID)}}</div>
            <div class="userlist_item2">{{item.projectname}}</div>
            <div class="userlist_item3">{{filterFun(item.filepath)}}</div>
            <div class="userlist_item4">{{item.startframe}}</div>
            <div class="userlist_item5">{{item.endframe}}</div>
            <div class="userlist_item6">{{item.totalframe}}</div>
            <div class="userlist_item7">{{item.releasetime}}</div>
            <div class="userlist_item8">{{item.completetime}}</div>
            <div class="userlist_item9">{{item.award}}</div>
            <div class="userlist_item10">{{item.tasknumber}}</div>
            <div class="userlist_item11">{{item.taskstatus}}</div>
        </div>
        <!--分页-->
        <div class="page-box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10,20,30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
        </div>
    </div>
    <div class="flex_s subjectlist_b">
           <!--左边-->
          <div class="user_c_l">
              <div class="user_c_title">用户行业分布</div>
                <div class="user_cl_main">
                     <div id="userdistrb"></div>
                </div>
                <div class="flex_b user_c_l_b">
                    <div class="flex_b user_c_l_bitem">
                        <div class="color_box color_box1"></div>
                        <span>渲染成功数量</span>
                    </div>
                     <div class="flex_b user_c_l_bitem">
                        <div class="color_box color_box2"></div>
                        <span>渲染失败数量</span>
                    </div>
                </div>
          </div>
           <!--右边-->
          <div class="user_c_r">
                  <div class="user_c_title">渲染任务失败IOP5原因分析</div>
                  <div class="user_cr_main">
                     <div id="citydistrb"></div>
                </div>
          </div>      
    </div>
    </div>
</template>
<script>
export default {
  created() {
      this.getprojectbasicdata()
      this.getrendersuccessrate()
      this.getrenderfaildata()
    let _that = this;
  },
    data(){
        return{
           userlist_head:['ID','项目名称','文件路径','起始帧','结束帧','总帧数','发布时间','完成时间','奖励','任务数','状态'],
         blockListObj:{
               page:1,
               pageSize:10,
           },
           totalSize:0,
            person_t_l_title: [
                         ["用户总注册数:", "WORKER活跃数”:", ""],
                        ["用户月增长率:", "USE活跃数:", ""]
                  ],
            userbtrdata:[
                {value:335, name:'渲染成功数量'},
                {value:310, name:'渲染失败数量'},
            ],
            projectbasicdata:'',
            rendersuccessrate:'',
            renderfaildata:'',
            renderfaildataaxis:[],
            renderfaildataserves:[]
        }
    },
    methods:{
            //:项目发布基本数据 
            getprojectbasicdata(){
        let _that=this
         this.$axios.post(this.$api.projectbasicdata,{page:this.blockListObj.page,rows:this.blockListObj.pageSize}).then(rsp=>{  
             _that.projectbasicdata=rsp.data.pagedata
             _that.totalSize=rsp.data.total               
        }) 
        },

            //渲染任务任务显示 
            getrendersuccessrate(){
             let _that=this
               this.$axios.post(this.$api.rendersuccessrate).then(rsp=>{  
                _that.rendersuccessrate=rsp.data 
               for(let i=0;i<_that.rendersuccessrate.length;i++){
                   _that.rendersuccessrate[i].causenumber=_that.rendersuccessrate[i].causenumber.replace(/(^%)|(%$)/g,'')
                   _that.userbtrdata[i].value=_that.rendersuccessrate[i].causenumber
                   _that.userbtrdata[i].name=_that.rendersuccessrate[i].cause+_that.rendersuccessrate[i].causenumber+'%'
              }  
                  _that.$nextTick(() => {
                 _that.drawLine();
              });              
                }) 
            },
         //渲染任务失败数据
            getrenderfaildata(){
        let _that=this
         this.$axios.post(this.$api.renderfaildata).then(rsp=>{
              console.log(rsp.data,222);     
             _that.renderfaildata=rsp.data 
                              for(let i=0;i<_that.renderfaildata.length;i++){
                            _that.renderfaildataaxis[i]= _that.renderfaildata[i].cause
                            _that.renderfaildataserves[i]= _that.renderfaildata[i].causenumber                
              } 
                                _that.$nextTick(() => {
                 _that.drawLine2();
              });               
        }) 
        },

          handleSizeChange(val) {

            this.blockListObj.pageSize = val;
        },

        handleCurrentChange(val) {
            this.blockListObj.page = val;
        },
drawLine() {
      let _that = this;
      let myChart = this.$echarts.init(document.getElementById("userdistrb"));
      // 绘制图表
      myChart.showLoading();
      myChart.setOption({
        legend: {
        show:false,
        orient: 'vertical',
        left: 'left',
        data: ['渲染成功数量','渲染失败数量']
        },
     series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:_that.userbtrdata,
             color:['#3162f7', '#7b7b7b'],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
      });
      myChart.hideLoading();
    },
    //右边图表
drawLine2() {
      let _that = this;
      let myChart2 = this.$echarts.init(document.getElementById("citydistrb"));
      myChart2.showLoading();
      myChart2.setOption({
      color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data :_that.renderfaildataaxis,
            axisLine: {
            lineStyle: {
              color: "#babac0",
              width: 1,
              opacity: 0.6,
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
               rotate:45,
            textStyle: {
              color: "#babac0",
              fontSize: 14,
              fontStyle:"oblique", 
            }
          }
        }
    ],
    yAxis : [
        {
            type : 'value',
            max:12,
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
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:_that.renderfaildataserves
        }
    ]
      });
      myChart2.hideLoading();
    },        
    }
}
</script>
<style scoped>
.subjectlist_t{
    width: 100%;
    height: 6.66rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    padding-top: 0.2rem;
   background-color: #11113f;
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
}
.userlist_t{
    width: 100%;
    height: 0.2rem;
    border-left: 4px solid #3261f7;
    padding-left: 0.1rem;
    opacity: 0.6;
    margin-bottom: 0.2rem;
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
}
.userlist_t::-webkit-scrollbar {
    width:0px;
    height:0px;
}
.userlist_t .-o-scrollbar{
    -moz-appearance: none !important;   
    background: rgba(0,255,0,0) !important;  
}
.userlist_main{
    height: 0.4rem;
    padding: 0 0.3rem;
    line-height: 0.4rem;
  box-sizing: border-box;
  opacity: 0.7;
}
.userlist_main:nth-child(2n) {
  background-color: #2a2a66;
  opacity: 0.7;
}
.userlist_main:nth-child(2n-1) {
  opacity: 0.7;
}
.userlist_item1{
    width: 1.12rem;
    text-align: left;
}
.userlist_item2{
    width: 1.85rem;
    text-align: left;
}

.userlist_item3{
    width: 2.09rem;
    text-align: left;
}
.userlist_item4{
    width: 0.89rem;
    text-align: left;
}
.userlist_item5{
    width: 1rem;
    text-align: left;
}

.userlist_item6{
    width: 1.01rem;
    text-align: left;
}
.userlist_item7{
    width: 1.86rem;
    text-align: left;
}
.userlist_item8{
    width: 1.96rem;
    text-align: left;
}
.userlist_item9{
    width: 1.17rem;
    text-align: left;
}
.userlist_item10{
    width: 1.16rem;
    text-align: left;
}
.userlist_item11{
    width: 1.1rem;
    text-align: left;
}
.page-box{
   margin-top: 0.4rem; 
   text-align: right;
}
.subjectlist_b{
    height: 5.55rem;
    margin-top: 0.2rem;
}




















.user_top {
  padding: 0.4rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  background-color: #11113f;
  border-radius: 4px;
  background: url("../assets/img/usertop_bg.png") 100% 100% no-repeat;
}
.user_msg {
  width: 6.75rem;
  height: 0.4rem;
  text-align: left;
    opacity: 0.6;
}
.user_msg_item {
  flex: 1;
}
.user_c_l{
    margin-right: 0.2rem;
}
.user_c_l,.user_c_r{
    width: 8.04rem;
    height: 7.2rem;
     background-color: #11113f;
     padding: 0 0.2rem;
     padding-top: 0.2rem
}
.user_c_title{
    width: 100%;
    height: 0.2rem;
    line-height: 0.2rem;
    padding-left: 0.1rem;
    border-left: 4px solid #3261f7;
    opacity: 0.6;
    margin-bottom: 0.2rem;
}
.user_cl_main{
    height: 5rem;
}
#userdistrb{
    width: 6rem;
    height: 5rem;
    margin: 0 auto;
}
.user_c_l_b{
    width: 3.9rem;
    height: 0.16rem;
    color: #fff;
    margin: 0 auto;
    font-size: 16px;
}
.user_c_l_b span{
    opacity: 0.6;
}
.color_box{
    width: 0.16rem;
    height: 0.16rem;
    margin-right: 0.1rem;
    opacity: 1;
}
.color_box1{
     background-color: #3162f7
}
.color_box2{
     background-color: #7b7b7b
}
.user_cr_main{
 height:6.2rem;
}
#citydistrb{
     width: 7.7rem;
    height: 6.2rem;
    margin: 0 auto;   
}
</style>