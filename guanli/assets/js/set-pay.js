/**
 * Created by Administrator on 2017/9/1 0001.
 */
var token=sessionStorage.getItem("key");
console.log(token);
if(token=="undefined"){
    alert("token失效，请重新登录");
    window.location.href='index.html';
}
queryPay();
//查询当前的付费价格和付费介绍
function queryPay(){
    $.ajax({
        url:'http://47.94.251.233:8080/saxophone/saxo/selrecharge?token='+token,
        dataType:'jsonp',
        success:function(data){
            console.log(data);
            var datas=data.data;
            console.log(datas);
            for(var i=0;i<datas.length;i++){
                var aDiscript=datas[i].aDiscript;
                var aId=datas[i].aId;
                var aMoney=datas[i].aMoney;
                var aTime=datas[i].aTime;
                var aCover=datas[i].aCover;
                //var dan="当前的付费价格为";
                if(aCover==""||aCover==null){
                    var av="";
                    av+="<img src='' id='src' class='src' style='width: 861px;height: 300px'>";
                    $("#img").append(av);
                }else{
                    var av2="";
                    av2+="<img src=\""+aCover+"\" id='src' class='src' style='width: 861px;height: 300px'>";
                    $("#img").append(av2);
                }

                var inP="";
                inP+="<input type='number' pattern='[0-9]*' id='price' placeholder=\""+aMoney+"\" onkeyup='if(isNaN(value))execCommand('undo')' onafterpaste='if(isNaN(value))execCommand('undo')' name=\""+aId+"\">";
                $("#set-price").append(inP);

                var inP2="";
                inP2+="<textarea  rows='6' id='price-introduce2' placeholder=\""+aDiscript+"\">"+"</textarea>";
                inP2+="<small>写出年费会员能够享受的特权...</small>";
                $("#set-text").append(inP2);
            }
        }
    })
}
//获取banner图片地址
var pic=0;
$("#file").change(function() {
    //alert
    var url = 'http://47.94.251.233:8080/saxophone/saxo/picUpload?token='+token;
    var formdata = new FormData();
    formdata.append("file", $("#file")[0].files[0]);
    $.ajax({
        type: 'POST',
        url: url,
        data: formdata,
        cache: false,
        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType: false, // 不设置Content-type请求头
        success: function (res) {
            console.log(res);
            var json = eval('(' + res + ')');
            var picUrl=json.data;
            console.log(picUrl);
            pic=picUrl;
            if (json.code == 100000) {
                $(".img")[0].style.display = "block";
                $("#src")[0].src = json.data;
            } else {
                alert(json.message);
            }
        }
    })
});
//设置付费价格和付费介绍
$("#set-pay").click(function(){
    var price=document.getElementById("price").value;
    var aid=document.getElementById("price").getAttribute("name");
    //var intro1=document.getElementById("price-introduce").value;
    var intro2=document.getElementById("price-introduce2").value;
    //var cover=document.getElementById("price-introduce").value;
    console.log(price);
    console.log(intro2);
    //var intro=[intro1,intro2];
    var pData={"discript":intro2,"money":price,"cover":pic,"aid":aid};
    console.log(pData);
    $.ajax({
        dataType:'jsonp',
        url:'http://47.94.251.233:8080/saxophone/saxo/uprecharge?token='+token,
        type:'post',
        data:pData,
        success:function(data){
            console.log(data);
            var msg=data.data;
            alert(msg);
            window.location.reload();
        }
    })
});
