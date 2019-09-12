<template>
<!--发布任务详细进度-->
    <div id="mission">
        <div class="flex_b mission_t">
             <div class="flex_b_c mission_titem">
                    <img src="../assets/img/mission1.png" alt="">
                    <span class="colora">任务提交成功</span>
             </div>
             <div class="flex_b_c mission_titem">
                   <div class="missionshot"> <img src="../assets/img/missionshot1.png" alt=""></div>
             </div>
             <div class="flex_b_c mission_titem">
                    <img src="../assets/img/mission2.png" alt="">
                    <span class="colora">已领取</span>
             </div>
                          <div class="flex_b_c mission_titem">
                     <div class="missionshot"> <img src="../assets/img/missionshot1.png" alt="">
                        <div class="missionshot_text colora">还需{{timestampToTime4(receivetime[0])}}</div>
                     </div>         
             </div>
                          <div class="flex_b_c mission_titem">
                    <img src="../assets/img/mission3.png" alt="">
                    <span class="colorb">已下载</span>
             </div>
                          <div class="flex_b_c mission_titem">
                    <div class="missionshot"> <img src="../assets/img/missionshot2.png" alt="">
                      <div class="missionshot_text colorb">还需{{timestampToTime4(downloadtime[0])}}</div>
                    </div>
             </div>
                          <div class="flex_b_c mission_titem">
                    <img src="../assets/img/mission4.png" alt="">
                    <span class="colorb">渲染中</span>
             </div>
                          <div class="flex_b_c mission_titem">
                        <div class="missionshot"> <img src="../assets/img/missionshot2.png" alt="">
                          <div class="missionshot_text colorb">还需{{timestampToTime4(rendertime[0])}}</div>
                        </div>
             </div>
                          <div class="flex_b_c mission_titem">
                    <img src="../assets/img/mission5.png" alt="">
                    <span class="colorb">已完成</span>
             </div>
                          <div class="flex_b_c mission_titem">
                            <div class="missionshot"> <img src="../assets/img/missionshot2.png" alt="">
                              <div class="missionshot_text colorb">还需{{timestampToTime4(completetime[0])}}</div>
                            </div>
             </div>
                          <div class="flex_b_c mission_titem">
                    <img src="../assets/img/mission6.png" alt="">
                    <span class="colorb">已结算</span>
             </div>                          
        </div>
        <div class="mission_b">
        <div class="userlist_t">
            任务列表
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
        </div>
        <div class="flex_b userlist_main" v-for="(item,index) in renderprojectdetail" :key="index" @click="selectitem(index)">
            <div class="userlist_item1">{{index}}</div>
            <div class="userlist_item2">{{filterFun(item.taskID)}}</div>
            <div class="userlist_item3">{{item.startframe}}</div>
            <div class="userlist_item4">{{item.endframe}}</div>
            <div class="userlist_item5">{{item.totalframe}}</div>
            <div class="userlist_item6">{{item.award}}</div>
            <div class="userlist_item7">{{item.starttime}}</div>
            <div class="userlist_item8">{{item.taskstate}}</div>
        </div>
        <!--分页-->
     <div class="page-box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10,20,30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    created(){
      
        this.getrenderprojectdetail()
    },
    data(){
        return{
           userlist_head:['序号','任务ID','起始帧','结束帧','总帧数','报酬','开始时间','状态'],
           blockListObj:{
               page:1,
               pageSize:10,
           },
           totalSize:0,
           renderprojectdetail:'',
            receivetime:[],
            downloadtime:[],
            rendertime:[],
            completetime:[]
        }
    },
    methods:{
            //:发布任务详细进度数据
            getrenderprojectdetail(){
        let _that=this
         this.$axios.post(this.$api.renderprojectdetail,{page:this.blockListObj.page,rows:this.blockListObj.pageSize}).then(rsp=>{ 
             console.log(rsp.data,777);          
             _that.renderprojectdetail=rsp.data.pagedata
             _that.totalSize=rsp.data.total 
              console.log(_that.renderprojectdetail,777); 
              _that.selectitem(0)               
        }) 
        },
        selectitem(index){
                this.$set(this.receivetime,0,this.renderprojectdetail[index].receivetime)
                this.$set(this.downloadtime,0,this.renderprojectdetail[index].downloadtime)
                this.$set(this.rendertime,0,this.renderprojectdetail[index].rendertime)
                this.$set(this.completetime,0,this.renderprojectdetail[index].completetime)
                console.log(index);              
        },

          handleSizeChange(val) {

            this.blockListObj.pageSize = val;
        },

        handleCurrentChange(val) {
            this.blockListObj.page = val;
        },
    }
}
</script>
<style scoped>
.userlist_t{
    width: 100%;
    height: 0.2rem;
    border-left: 4px solid #3261f7;
    padding-left: 0.1rem;
    opacity: 0.6;
    margin-bottom: 0.2rem;
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
    width: 1.41rem;
    text-align: left;
}
.userlist_item2{
    width: 2.31rem;
    text-align: left;
}
.mission_titem{
    width: 0.91rem;
    height: 0.96rem;
}
.userlist_item3{
    width: 1.98rem;
    text-align: left;
}
.userlist_item4{
    width: 2.04rem;
    text-align: left;
}
.userlist_item5{
    width: 1.98rem;
    text-align: left;
}
.colora{
    color: #3063f7;
}
.colorb{
    color: #6e717f;
}
.missionshot{
    margin-top: 0.2rem;
    position: relative;
}
.missionshot_text{
    position: absolute;
    top: -0.1rem;
    left: 0.2rem;
}
.userlist_item6{
    width: 1.92rem;
    text-align: left;
}
.userlist_item7{
    width: 2.16rem;
    text-align: left;
}
.userlist_item8{
    width: 1.1rem;
    text-align: left;
}
.userlist_item9{
    width: 1.73rem;
    text-align: left;
}
.userlist_item10{
    width: 1.3rem;
    text-align: left;
}
.userlist_item11{
    width: 0.77rem;
    text-align: left;
}
.page-box{
   margin-top: 0.4rem; 
   text-align: right;
}
.mission_t{
    width: 100%;
    height: 2.85rem;
    padding-left: 1.1rem;
    padding-right: 1.6rem;
    background-color: #11113f;
    border-radius: 4px;
}
.mission_b{
    width: 100%;
    height: 6.42rem;
    margin-top: 0.2rem;
     background-color: #11113f;
    border-radius: 4px;
    padding: 0 0.2rem;
    padding-top: 0.2rem;
    border-radius: 4px;
}
</style>