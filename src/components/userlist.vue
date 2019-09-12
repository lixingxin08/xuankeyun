<template>
    <div id="userlist">
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
        <div class="flex_b userlist_main" v-for="(item,index) in userdetailed" :key="index">
            <div class="userlist_item1">{{item.username}}</div>
            <div class="userlist_item2">{{filterFun3(item.userid)}}</div>
            <div class="userlist_item3">{{item.usertype}}</div>
            <div class="userlist_item4">{{item.uservip}}</div>
            <div class="userlist_item5">{{item.userlevel}}</div>
            <div class="userlist_item6">{{item.usertime}}</div>
            <div class="userlist_item7">{{item.userip}}</div>
            <div class="userlist_item8">{{item.userlogintime}}</div>
            <div class="userlist_item9">{{item.userdurationtime}}</div>
            <div class="userlist_item10">{{item.userblance}}</div>
            <div class="userlist_item11">{{item.usercredit}}</div>
        </div>
        <!--分页-->
     <div class="page-box">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10,20,30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
                    </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    created(){
        this.getprojectbasicdata()
    },
    data(){
        return{
           userlist_head:['用户名','ID','用户类型','VIP','级别','注册时间','最近登录','最近登录','登录时长','账户余额','信用分'],
           blockListObj:{
               page:1,
               pageSize:10,
           },
           totalSize:0,
           userdetailed:''

        }
    },
    methods:{
            getprojectbasicdata(){
        let _that=this
         this.$axios.post(this.$api.userdetailed,{page:this.blockListObj.page,rows:this.blockListObj.pageSize}).then(rsp=>{
              console.log(rsp.data,777);     
             _that.userdetailed=rsp.data.pagedata  
             _that.totalSize=rsp.data.total
             console.log( _that.totalSize,66);
                         
        }) 
        },

          handleSizeChange(val) {
                console.log(val);
                
            this.blockListObj.pageSize = val;
            this.getprojectbasicdata()
        },

        handleCurrentChange(val) {
                  console.log(val);
            this.blockListObj.page = val;
            this.getprojectbasicdata()
        },
    }
}
</script>
<style scoped>
#userlist{
    width: 100%;
    height: 9.35rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    padding-top: 0.2rem;
   background-color: #11113f;
}
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
    width: 1.07rem;
    text-align: left;
}
.userlist_item2{
    width: 1.52rem;
    text-align: left;
}

.userlist_item3{
    width: 1.52rem;
    text-align: left;
}
.userlist_item4{
    width: 1.18rem;
    text-align: left;
}
.userlist_item5{
    width: 1.2rem;
    text-align: left;
}

.userlist_item6{
    width: 1.52rem;
    text-align: left;
}
.userlist_item7{
    width: 1.76rem;
    text-align: left;
}
.userlist_item8{
    width: 1.64rem;
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
</style>