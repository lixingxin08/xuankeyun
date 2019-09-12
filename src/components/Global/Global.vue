<script>
  const baseUrl = "http://192.168.104.100:3000/"; //矿池接口测试环境
  // const baseUrl = "https://api.kirinpool.com/"; //矿池接口线上环境
  const baseUrlTwo = "https://account.kirinpool.com:81/api/account/"; //用户系统接口测试环境
  // const baseUrlTwo = "https://user.waltymall.com:443/api/account/"; //用户系统接口正式环境
  const baseUrltree="120.77.241.114:7011/v2"
  const baseHerf = "https://account.kirinpool.com:81/#/account/login?platformName=wtcpool&lang="; //跳转登录测试环境
  // const baseHerf = "https://user.waltymall.com/#/account/login?platformName=minerpool&lang="; //跳转登录正式环境
  const baseHerf2="https://account.kirinpool.com:81/#/account/register?platformName=wtcpool"//测试注册
  // const baseHerf2="https://user.waltymall.com/#/account/register?platformName=minerpool&lang=zh"//正式注册
  // const baseHerf3="https://user.waltymall.com/#/account/setting" //正式个人中心
   const baseHerf3="https://account.kirinpool.com:81/#/account/setting" //测试个人中心

  export default {
    baseUrl,
    baseUrlTwo,
    baseUrltree,
    baseHerf,
    baseHerf2,
    baseHerf3
  }
</script>
