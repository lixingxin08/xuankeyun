const Ajax=function(type, url, data, success, failed){
    // 创建ajax对象
    var xhr = null;
        xhr = new XMLHttpRequest();

    // 用于清除缓存
    var random = Math.random();
 
    if(typeof data == 'object'){
        var str = '';
        for(var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    }
 
    if(type.toUpperCase() == 'GET'){
        if(data){
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send();
 
    } else if(type.toUpperCase() == 'POST'){
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
 
    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
        /*
        ** Http状态码
        ** 1xx ：信息展示
        ** 2xx ：成功
        ** 3xx ：重定向
        ** 4xx : 客户端错误
        ** 5xx ：服务器端错误
        */
            if(xhr.status == 200){
             return   success(xhr.responseText);
            } else {
                if(failed){
                    failed(xhr.status);
                }
            }
        }
    }
};
export default Ajax
