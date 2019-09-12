// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

import router from './router'
import Vue from 'vue'
import App from './App'
import { setCookie, getCookie, delCookie } from "./assets/cookie";
import i18n from "./i18n/i18n"
import axios from "./js/axios_config"
import api from "./js/api_config"
import global from "./components/Global/Global"
import Qs from "qs"
import babelpolyfill from "babel-polyfill"
import md5 from "js-md5"
import './components/common/rem.js'
import echarts from 'echarts'
import ajax from './components/common/mixin.js'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(babelpolyfill);
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.config.productionTip = true;
Vue.prototype.GLOBAL = global;
Vue.prototype.md5 = md5;
Vue.prototype.$ajax = ajax;
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import Blob from './vendor/Blob'
import Export2Excel from './vendor/Export2Excel.js'

Vue.use(HappyScroll)
// axios.defaults.headers.common['Authorization'] = "Bearer " + getCookie("userToken");
axios.defaults.withCredentials = false;//让ajax携带cookie
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//进入路由前校验是否需要登录
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (getCookie("isLogin")) {
      next()
    } else {
      // next(
      //   // alert(window.vm.$t("m.main.key4")),
      //   // window.location.href = global.baseHerf + vm.$i18n.locale
      // );
      // next({
      //   path:"/"
      // })
      window.location.href = global.baseHerf + vm.$i18n.locale
    }
  } else {
    next()
  }
});

// axios.interceptors.request.use(
//   config => {
//     let token = getCookie("userToken");
//     if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = "Bearer " + `${token}`;
//     }

//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );

// axios.interceptors.response.use(
//   response => {
//     if (response.data.msg === "账户未登录") {
//       sessionStorage.removeItem("newBlock");
//       sessionStorage.removeItem("userMsg");
//       setCookie("isLogin", "", -1);
//       if (response.data.code !== 1068) {
//         // router.replace({
//         //   path:"login",
//         //   // query:{redirect:router.currentRoute.fullPath}
//         // });
//         alert(window.vm.$t("m.main.key3"));
//         // window.history.go(0);
//         window.location.href = global.baseHerf + vm.$i18n.locale;
//         return false;
//       } else if (response.data.code === 1068) {
//         router.replace({
//           path: "/",
//           // query:{redirect:router.currentRoute.fullPath}
//         });
//         // window.history.go(0);
//         return false;
//       }

//     }
//     if (response.status === 200) {
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(response);
//     }
//   }, error => {
//     if (error.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
//       // alert(window.vm.$t("m.key4"));
//       return Promise.reject(error);          // reject这个错误信息
//     } else {
//       // alert(window.vm.$t("m.key"));
//     }
//     return Promise.reject(error);
//   }
// );

//校验手机号
Vue.prototype.IsPhone = function (phone) {
  var myreg = /^[1][1-9]\d{9}$/;
  if (myreg.test(phone) !== true) {
    return false;
  } else {
    return true;
  }
  return true;
};
//验证邮箱格式
Vue.prototype.vmf = function (str) {
  if (this.verEmail(str) !== true) {
    return false;
  } else {
    return true;
  }
},
  //验证密码
  Vue.prototype.isNumberOr_Letter = function (s) {
    var regu = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/;
    if (regu.test(s)) {
      return true;
    } else {
      return false;
    }
  };

//校验用户名
Vue.prototype.verifyUsername = function (str) {
  var re = /^[a-z][a-z0-9]{7,15}$/;
  if (re.test(str) !== true) {
    return false;
  } else {
    return true
  }
},
//校验只能数字或字母
Vue.prototype.verifyUsername2 = function (str) {
  var re = /^[0-9a-zA-Z]*$/g;
  if (re.test(str) !== true) {
    return false;
  } else {
    return true
  }
},
Vue.prototype.verifyUsernam3 = function (str) {
  var re = /^[a-z][a-z0-9]{1,15}$/;
  if (re.test(str) !== true) {
    return false;
  } else {
    return true
  }
},
  //限制输入特殊字符
  Vue.prototype.btKeyUp = function (e) {
    e.target.value = e.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "");
    return e.target.value
  },
  //千位分隔符
  Vue.prototype.format = function (num, index) {
    num = Number(num)
    if (num == 0 || num == '0') {
      return num
    }
    if (typeof (num) == 'undefined') {
      return num
    }
    if (num) {
      if (typeof num === "string") {
        num = parseFloat(num)
      }
      var b = num.toFixed(index).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      // var reg = /\d{1,3}(?=(\d{3})+$)/g;
      // return (num + '').replace(reg, '$&,');
      return b;
    }
  },
  Vue.prototype.comdify = function (num) {
    num = Number(num)
    if (num == 0) {
      return num
    }
    if (typeof (num) == 'undefined') {
      return num
    }
    if (num) {
      //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
      num = num.toString().replace(/\$|\,/g, '');
      //如果num不是数字，则将num置0，并返回
      if ('' == num || isNaN(num)) { return 'Not a Number ! '; }
      //如果num是负数，则获取她的符号
      var sign = num.indexOf("-") > 0 ? '-' : '';
      //如果存在小数点，则获取数字的小数部分
      var cents = num.indexOf(".") > 0 ? num.substr(num.indexOf(".")) : '';
      cents = cents.length > 1 ? cents : '';//注意：这里如果是使用change方法不断的调用，小数是输入不了的
      //获取数字的整数数部分
      num = num.indexOf(".") > 0 ? num.substring(0, (num.indexOf("."))) : num;
      //如果没有小数点，整数部分不能以0开头
      if ('' == cents) { if (num.length > 1 && '0' == num.substr(0, 1)) { return 'Not a Number ! '; } }
      else { if (num.length > 1 && '0' == num.substr(0, 1)) { return 'Not a Number ! '; } }
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
      }
      return (sign + num + cents);
    }
  }
//只显示20个字段
Vue.prototype.filterFun = function (value) {
  if (value && value.length > 20) {
    value = value.substring(0, 20) + '...';
  }
  return value;
}
//只显示5个字段
Vue.prototype.filterFun2 = function (value) {
  if (value && value.length > 5) {
    value = value.substring(0, 5);
  }
  return value;
}
//只显示10个字段
Vue.prototype.filterFun3 = function (value) {
  if (value && value.length > 10) {
    value = value.substring(0, 9) + '...';;
  }
  return value;
}
//对象转数组
Vue.prototype.getValueByKey=function(data, val1, val2) {
  var i = 0
  for (var key in data) {
      val1[i] = key
      val2[i] = data[key]
      i++
  }
},
//转化M,G,T
Vue.prototype.changpow = function (val) {

  val = Number(val)
  let val1 = new Number()
  var num = 1024.00;
  if (val < Math.pow(num, 3)) {
    val1 = val / Math.pow(num, 2)
    val1 = val1.toFixed(2)
    return val1 + "M";
  } else if (val < Math.pow(num, 4)) {
    val1 = val / Math.pow(num, 3)
    val1 = val1.toFixed(2)
    return val1 + "G"
  } else if (val > Math.pow(num, 4)) {
    val1 = val / Math.pow(num, 4)
    val1 = val1.toFixed(2)
    return val1 + "T";
  }
}
Vue.prototype.changpow2 = function (val) {
  val = Number(val)
  let val1 = new Number()
  var num = 1024.00;
  val1 = val / Math.pow(num, 2)
  val1 = val1.toFixed(2)
  return val1;
}
//设置cookie
Vue.prototype.setCookie = function (key, val, time) {
  var date = new Date(); //获取当前时间
  var expiresDays = time;  //将date设置为n天以后的时间
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
  document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie
};
//获取cookie
Vue.prototype.getCookie = function (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) !== -1) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//验证邮箱格式
Vue.prototype.verEmail = function (str) {
  var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (re.test(str) !== true) {
    return false;
  } else {
    return true;
  }
};
//中国标准时间转化时间格式
Vue.prototype.Formatdate = function (time, format) {
  var t = new Date(time);
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}
//时间戳转化时间格式
Vue.prototype.timestampToTime = function (value) {
  let date = new Date(value * 1000);
  var Y = date.getFullYear();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return Y + "-" + M + "-" + D + " " + h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
};
//时间戳转化时间格式
Vue.prototype.timestampToTime2 = function (value) {
  let date = new Date(value * 1000);
  var Y = date.getFullYear();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return Y + "-" + M + "-" + D + " " + h + ":" + (m < 10 ? "0" + m : m) ;
};
//时间戳转化时间格式
Vue.prototype.timestampToTime3 = function (value) {
  let date = new Date(value * 1000);
  var Y = date.getFullYear();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return Y + "-" + M + "-" + D ;
};
//时间戳转化时间格式
Vue.prototype.timestampToTime4 = function (value) {
  let date = new Date(value * 1000);
  var Y = date.getFullYear();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return   h + "小时" + (m < 10 ? "0" + m : m) +"分钟"
};
//倒计时
Vue.prototype.countDown = function (btn) {
  let seft = this;
  clearInterval(seft.interval);
  seft.interval = window.setInterval(function () {
    seft.time--;
    btn.text(seft.$t("m.main.key2") + " (" + seft.time + ")");
    if (seft.time <= 0) {
      btn.text(seft.$t("m.main.key1"));
      seft.time = 60;
      btn.removeAttr("disabled").css("cursor", "pointer");
      window.clearInterval(seft.interval)
    }
  }, 1000)
};
var axios_instance = axios.create({
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data
  }],
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
Vue.prototype.sessionStorage = sessionStorage;
/* eslint-disable no-new */
window.vm = new Vue({
  // el:"#app",
  i18n,
  // router,
  // components: { App },
  // template: '<App/>'
});

new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>',

})

