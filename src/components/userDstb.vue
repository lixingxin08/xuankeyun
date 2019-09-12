<template>
    <div id="userdstb">
        <!--用户分布-->
     <div class="user_top">
        <div class="user_t_l_item">
          <div class="flex_b user_msg">
            <div class="user_msg_item">
              <span class="user_msg_itemtext">{{person_t_l_title[0][0]}}</span><span>{{userdasic.userTotalNumber}}</span>
            </div>
            <div class="user_msg_item">
              <span class="user_msg_itemtext">{{person_t_l_title[0][1]}}</span><span>{{userdasic.renderWorkLiveNumber}}</span>
            </div>
          </div>
          <div class="flex_b user_msg">
            <div class="user_msg_item">
              <span class="user_msg_itemtext">{{person_t_l_title[1][0]}}</span><span>{{userdasic.userIncrease}}</span>
            </div>
            <div class="user_msg_item">
              <span class="user_msg_itemtext">{{person_t_l_title[1][1]}}</span><span>{{userdasic.userLivelyNumber}}</span>
            </div>
          </div>          
        </div>
      </div>
      <div class="flex_s user_center">
          <!--左边-->
          <div class="user_c_l">
              <div class="user_c_title">用户行业分布</div>
                <div class="user_cl_main">
                     <div id="userdistrb"></div>
                </div>
                <div class="flex_b user_c_l_b">
                    <div class="flex_b user_c_l_bitem">
                        <div class="color_box color_box1"></div>
                        <span>动画</span>
                    </div>
                     <div class="flex_b user_c_l_bitem">
                        <div class="color_box color_box2"></div>
                        <span>影视</span>
                    </div>
                     <div class="flex_b user_c_l_bitem">
                        <div class="color_box color_box3"></div>
                        <span>效果图</span>
                    </div>
                     <div class="flex_b user_c_l_bitem">
                        <div class="color_box color_box4"></div>
                        <span>工业建筑</span>
                    </div>
                </div>
          </div>
           <!--右边-->
          <div class="user_c_r">
                  <div class="user_c_title">用户行业分布</div>
                  <div class="user_cr_main">
                     <div id="citydistrb"></div>
                </div>
          </div>
      </div>
    </div>
</template>
<script>
import { log } from 'util';
export default {
  created() {
      this.getuserdasic()
      this.getuserIndustry()
      this.getuserCity()
    let _that = this;
  },
    data(){
        return{
           person_t_l_title: [
                         ["用户总注册数:", "WORKER活跃数:", ""],
                        ["用户月增长率:", "USER活跃数:", ""]
                  ],
            userdasic:[[],[]],
            userIndustry:'',
            userCity:'',
            userbtrdata:[
                {value: 11, name:'动画'},
                {value:21, name:'动画'},
                {value: 33, name:'动画'},
                {value: 44, name:'动画'},
            ],
            citylist:'',
            city:[],
            citynumber:[],
        }
    },
    methods:{
       //获取:用户分布基本数据
    getuserdasic(){
        let _that=this
         this.$axios.post(this.$api.userdasic).then(rsp=>{
              _that.userdasic=  rsp.data   
        })              
    },
       //:用户行业分布数据 
    getuserIndustry(){
        let _that=this
         this.$axios.post(this.$api.userIndustry).then(rsp=>{
              _that.userIndustry=  rsp.data  
              for(let i=0;i<_that.userIndustry.length;i++){
                   _that.userIndustry[i].percentage=_that.userIndustry[i].percentage.replace(/(^%)|(%$)/g,'')
                   _that.userbtrdata[i].value=_that.userIndustry[i].percentage
                   _that.userbtrdata[i].name=_that.userIndustry[i].insdustry+_that.userbtrdata[i].value+'%'
              }            
                 _that.$nextTick(() => {
                  _that.drawLine();
          });
                   
        })              
    },
       //国内客户top10城市数据  
    getuserCity(){
        let _that=this
         this.$axios.post(this.$api.userCity).then(rsp=>{
              _that.citylist=rsp.data  
                        for(let i=0;i<_that.citylist.length;i++){
                            _that.city[i]= _that.citylist[i].city
                            _that.citynumber[i]= _that.citylist[i].citynumber                
              }                         
                _that.$nextTick(() => {
                _that.drawLine2();
            });                
        })              
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
        data: ['动画','影视','效果图','工业建筑']
        },
     series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:_that.userbtrdata,
             color:['#3af7ee', '#3162f7','#d59939','#4a49d8'],
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
            data :_that.city,
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
            name:'',
            type:'bar',
            barWidth: '60%',
            data: _that.citynumber}
    ]
      });
      myChart2.hideLoading();
    },
    }
}
</script>
<style scoped>
.user_top {
  padding: 0.4rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  background-color: #11113f;
  border-radius: 4px;
  background: url("../assets/img/userstrb_top.png") 100% 100% no-repeat;
}
.user_msg {
  width: 6.75rem;
  height: 0.4rem;
  text-align: left;
}
.user_msg_item {
  flex: 1;
  color: #fff;
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
.user_msg_itemtext{
    margin-right: 0.1rem;
    opacity: 0.6;
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
     background-color: #3af7ee
}
.color_box2{
     background-color: #3162f7
}
.color_box3{
     background-color: #d59939
}
.color_box4{
    background-color: #4a49d8
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
