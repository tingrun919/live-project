/**
 * Created by Administrator on 2017/8/24 0024.
 */
$("#login-btn").click(function(){
    var userName=document.getElementById("username").value;
    var passWord=document.getElementById("password").value;
    console.log(userName);
    console.log(passWord);
    $.ajax({
        url:'http://47.94.251.233:8080/saxophone/saxo/loginManager?usercode='+userName+'&password='+passWord,
        dataType:'jsonp',
        success:function(data){
            var status=data.code;
            var msg=data.message;
            console.log(data);
            console.log(status);
            if(status==100000){
                var datas=data.data;
                console.log(datas);
                var token=datas[0].aToken;
                console.log(token);
                sessionStorage.setItem("key",token);
                window.location.href='shouye.html?backurl='+window.location.href;
            }else{
                alert(msg);
            }
        }
    })
});
//console.log(sessionStorage.getItem(key));