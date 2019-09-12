//获取cookie、
// export function getCookie(name) {
//   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//   if (arr = document.cookie.match(reg))
//     return (arr[2]);
//   else
//     return null;
// }
export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end)).replace(/\"/g, "");
    }
  }
  return null;
}

//设置cookie,增加到vue实例方便全局调用
// export function setCookie (c_name, value, expiredays) {
//   var exdate = new Date();
//   exdate.setDate(exdate.getDate() + expiredays);
//   document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
// };
export function setCookie(name, value, seconds) {
  seconds = seconds || 0;   //seconds有值就直接赋值，没有为0
  var expires = "";
  if (seconds != 0) {      //设置cookie生存时间
    var date = new Date(0);
    date.setTime(date.getTime() + (seconds * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + escape(value) + expires + "; path=/";   //转码并赋值
}


//删除cookie
// export function delCookie (name) {
//   var exp = new Date();
//   exp.setTime(exp.getTime() - 1);
//   var cval = getCookie(name);
//   if (cval != null)
//     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
// }

export function deleteCookie(name) {
  setCookie(name, "", -1);
}
