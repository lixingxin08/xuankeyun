export const domain = 'http:///manage.rendershare.com:80';
export default {

    aministratormessage:`user/aministratormessage`,//获取管理员信息

    blockHeight:`block/basicdata`,//区块链基本数据
    blockdata:`block/blockdata`, //:区块链区块数据
    renderbasicdata:`render/renderbasicdata`,//渲染任务基本数据
    rendertaskdata:`render/rendertaskdata`, //渲染任务任务显示

    nodesdistribution:`block/nodesdistribution`,//全球区块链节点分布数据
    blockaddress:`block/blockaddress`, //全球区块链节点地址分布

    tasktrace:`render/tasktrace`,//      2周内渲染实况数据跟踪 

    userdasic:`user/userdasic`,//:用户分布基本数据
    userIndustry:`user/userIndustry`,  //:用户行业分布数据 
    userCity :`user/userCity`,// 国内客户top10城市数据                      
   
    projectbasicdata:`renderproject/projectbasicdata`,//:项目发布基本数据
    renderfaildata:`renderproject/renderfaildata`,        //渲染任务失败数据
    rendersuccessrate:`renderproject/rendersuccessrate`, //渲染成功率数据

    renderprojectdetail:`renderproject/renderprojectdetail`,//发布任务详细进度数据

    taskbasicdata:`rendertask/taskbasicdata`,//项目接收基本数据

    taskdeail:`rendertask/taskdeail`,//接收任务详细进度数据

    userdetailed:`user/userdetailed`,//获得用户数据

    userlogin:`user/userlogin`, //:用户资登录接口
}