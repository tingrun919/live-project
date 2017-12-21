/**
 * Created by Administrator on 2017/8/28 0028.
 */
var token=sessionStorage.getItem("key");
console.log(token);
if(token=="undefined"){
    alert("token失效，请重新登录");
    window.location.href='index.html';
}
teacher();
passTeacher();
notPass();
//查询并显示待审核的教师
function teacher(){
    $.ajax({
        dataType:'jsonp',
        url:'http://47.94.251.233:8080/saxophone/saxo/lqeeManager?token='+token+'&state='+1,
        success:function(data){
            console.log(data);
            var datas=data.data;
            if(datas==""||data==null){
                var tr="";
                var st="当前无任何待审核的讲师";
                tr+="<div style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#teacher-to").append(tr);
            }else {
                console.log(datas);
                for (var i = 0; i < datas.length; i++) {
                    var xh = i + 1;
                    var aNickname = datas[i].aNickname;
                    var aId = datas[i].aId;
                    var aDiscript = datas[i].aDiscript;
                    var aPortrait = datas[i].aPortrait;
                    var aPhone = datas[i].aPhone;
                    var aIfteacher = datas[i].aIfteacher;
                    if (aIfteacher == 1) {
                        aIfteacher = "是";
                    } else {
                        aIfteacher = "否";
                    }
                    var aReason = datas[i].aReason;
                    if (aReason == null || aReason == "") {
                        aReason = "无";
                    }

                    //var t_id=datas.t_id;
                    console.log(aNickname, aReason, aIfteacher, aPortrait, aPhone);
                    console.log(aId);
                    console.log(aDiscript);
                    //var url='aPortrait';
                    var trS = "";
                    trS += "<tr>";
                    trS += "<td class='am-hide-sm-only'>" + xh + "</td>";
                    trS += "<td class='am-hide-sm-only' style='text-align: left'>" + "<img src=\"" + aPortrait + "\" style='width:50px;height:50px'/>" + aNickname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aPhone + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aIfteacher + "</td>";
                    trS += "<td class='am-hide-sm-only'><button type='button' data-id='"+aId+"' onclick='search(this)'>查看讲师详细信息</button></td>";
                    trS += "<td class='am-hide-sm-only'>" + aReason + "</td>";
                    trS += "<td>" + "<input type='checkbox' value=\"" + aId + "\" name='t_id'>" + "</td>";
                    trS += "</tr>";
                    $("#teacher-to").append(trS);
                }
            }
        }
    })
}
//点击通过审核教师
$("#pass-audit").click(function(){
    var ob=document.getElementsByName("t_id");
    var s='';
    for(var i=0; i<ob.length; i++){
        if(ob[i].checked) s+=ob[i].value+','; //如果选中，将value添加到变量s中
    }
    //那么现在来检测s的值就知道选中的复选框的值了
    if(s==""||s==null){
        alert("你没有选择任何讲师所以无法进行通过操作");
    }else {
        console.log(s == '' ? '你还没有选择任何内容！' : s);
        var aId={"aid":s};
        console.log(aId);
        $.ajax({
            url:'http://47.94.251.233:8080/saxophone/saxo/lqsuccessManager?token='+token,
            type:'post',
            dataType:'jsonp',
            data:aId,
            success:upData_zuo
        });
        function upData_zuo(data){
            console.log(data);
            var msg=data.data;
            alert(msg);
            window.location.reload();
        }
    }
});
//点击不通过审核教师
$("#reject-submit").click(function(){
    var reason=document.getElementById("reject-reason").value;
    console.log(reason);
    var ob=document.getElementsByName("t_id");
    var s='';
    for(var i=0; i<ob.length; i++){
        if(ob[i].checked) s+=ob[i].value+','; //如果选中，将value添加到变量s中
    }
    //那么现在来检测s的值就知道选中的复选框的值了
    if(s==""||s==null){
        alert("你没有选择任何待审核的僵尸所以无法删除");
    }else {
        console.log(s == '' ? '你还没有选择任何内容！' : s);
        var aId={"aid":s,"reason":reason};
        console.log(aId);
        $.ajax({
            url:'http://47.94.251.233:8080/saxophone/saxo/lqfailManager?token='+token,
            type:'post',
            dataType:'jsonp',
            data:aId,
            success:function(data){
                console.log(data);
                var msg=data.data;
                alert(msg);
                window.location.reload();
            }
        });

    }
});

//查询通过审核的教师并显示
function passTeacher(){
    $.ajax({
        dataType:'jsonp',
        async:false,
        url:'http://47.94.251.233:8080/saxophone/saxo/lqeeManager?token='+token+'&state='+2,
        success:function(data){
            console.log(data);
            var datas=data.data;
            if(datas==""||data==null){
                var tr="";
                var st="当前无任何审核通过的讲师";
                tr+="<div style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#teacher-pass").append(tr);
            }else {
                console.log(datas);
                for (var i = 0; i < datas.length; i++) {
                    var xh = i + 1;
                    var aNickname = datas[i].aNickname;
                    var aId = datas[i].aId;
                    var aDiscript = datas[i].aDiscript;
                    var aPortrait = datas[i].aPortrait;
                    var aPhone = datas[i].aPhone;
                    var aIfteacher = datas[i].aIfteacher;
                    if (aIfteacher == 1) {
                        aIfteacher = "是";
                    } else {
                        aIfteacher = "否";
                    }
                    var aReason = datas[i].aReason;
                    if (aReason == null || aReason == "") {
                        aReason = "无";
                    }
                    var aState = datas[i].aState;
                    if (aState == 2) {
                        aState = "审核通过";
                    }
                    var she = "点击设置";
                    //var t_id=datas.t_id;
                    console.log(aNickname, aReason, aIfteacher, aPortrait, aPhone);
                    console.log(aId);
                    console.log(aDiscript);
                    //var url='aPortrait';
                    var trS = "";
                    trS += "<tr>";
                    trS += "<td class='am-hide-sm-only'>" + xh + "</td>";
                    trS += "<td class='am-hide-sm-only' style='text-align: left'>" + "<img src=\"" + aPortrait + "\" style='width:50px;height:50px'/>" + aNickname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aPhone + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aIfteacher + "</td>";
                    trS += "<td class='am-hide-sm-only '><button type='button' data-id='"+aId+"' onclick='search(this)'>查看讲师详细信息</button></td>";
                    trS += "<td class='am-hide-sm-only'>" + aState + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + "<a class='am-btn-success' onclick='teaCode(\"" + aId + "\")' data-toggle='modal' data-target='#myDs' style='text-decoration:none;padding:5px;border-radius:3px'>" + she + "</a>" + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + "<input type='checkbox' value=\"" + aId + "\" name='aId'/>" + "</td>";
                    trS += "</tr>";
                    $("#teach-pass").append(trS);
                }
            }
        }
    })
}



//设置讲师的二维码
function teaCode(de){
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
    $("#confirm").click(function(){
        console.log(pic);
        dataCode={"aid":de,"code":pic};
        console.log(dataCode);
        $.ajax({
            url:'http://47.94.251.233:8080/saxophone/saxo/teaqrcode?token='+token,
            dataType:'jsonp',
            data:dataCode,
            type:'post',
            success:function(data){
                console.log(data);
                var msg=data.message;
                alert(msg);
                window.location.reload();
            }
        })
    });
}


//查询未通过审核的教师并显示
function notPass(){
    $.ajax({
        dataType:'jsonp',
        url:'http://47.94.251.233:8080/saxophone/saxo/lqeeManager?token='+token+'&state='+3,
        success:function(data){
            console.log(data);
            var datas=data.data;
            if(datas==""||data==null){
                var tr="";
                var st="当前无任何未通过审核的讲师";
                tr+="<div style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#teach-not-pass").append(tr);
            }else {
                console.log(datas);
                for (var i = 0; i < datas.length; i++) {
                    var xh = i + 1;
                    var aNickname = datas[i].aNickname;
                    var aId = datas[i].aId;
                    var aDiscript = datas[i].aDiscript;
                    var aPortrait = datas[i].aPortrait;
                    var aPhone = datas[i].aPhone;
                    var aIfteacher = datas[i].aIfteacher;
                    if (aIfteacher == 1) {
                        aIfteacher = "是";
                    } else {
                        aIfteacher = "否";
                    }
                    var aReason = datas[i].aReason;
                    if (aReason == null || aReason == "") {
                        aReason = "无";
                    }
                    var aAuditedmemo = datas[i].aAuditedmemo;
                    //var t_id=datas.t_id;
                    console.log(aNickname, aReason, aIfteacher, aPortrait, aPhone);
                    console.log(aId);
                    console.log(aDiscript);
                    //var url='aPortrait';
                    var trS = "";
                    trS += "<tr>";
                    trS += "<td class='am-hide-sm-only'>" + xh + "</td>";
                    trS += "<td class='am-hide-sm-only' style='text-align: left'>" + "<img src=\"" + aPortrait + "\" style='width:50px;height:50px'/>" + aNickname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aPhone + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aIfteacher + "</td>";
                    trS += "<td class='am-hide-sm-only'><button type='button' data-id='"+aId+"' onclick='search(this)'>查看讲师详细信息</button></td>";
                    trS += "<td class='am-hide-sm-only'>" + aAuditedmemo + "</td>";
                    //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aId+"\" name='aId'/>"+"</td>";
                    trS += "</tr>";
                    $("#teach-not-pass").append(trS);
                }
            }
        }
    })
}

//点击删除已通过讲师
$("#delete-submit").click(function(){
    var deReason=document.getElementById("delete-reason").value;
    console.log(deReason);
    var ob=document.getElementsByName("t_id");
    var s='';
    for(var i=0; i<ob.length; i++){
        if(ob[i].checked) s+=ob[i].value+','; //如果选中，将value添加到变量s中
    }
    //那么现在来检测s的值就知道选中的复选框的值了
    if(s==""||s==null){
        alert("你没有选择任何讲师，所以无法删除");
    }else {
        console.log(s == '' ? '你还没有选择任何内容！' : s);
        var aId={"aid":s,"reason":deReason};
        console.log(aId);
        $.ajax({
            url:'http://47.94.251.233:8080/saxophone/saxo/delsuccesstea?token='+token,
            type:'post',
            dataType:'jsonp',
            data:aId,
            success:function(data){
                console.log(data);
                var msg=data.data;
                alert(msg);
                window.location.reload();
            }
        });
    }
});


