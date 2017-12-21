/**
 * Created by Administrator on 2017/8/31 0028.
 */
var token=sessionStorage.getItem("key");
console.log(token);
if(token=="undefined"){
    alert("token失效，请重新登录");
    window.location.href='index.html';
}
courses();
passCourses();
notCourses();
//查询并显示待审核的课程
function courses(){
    $.ajax({
        dataType:'jsonp',
        url:'http://47.104.18.202:8080/saxophone/saxo/backgetclass?token='+token+'&astate='+0,
        success:function(data){
            console.log(data);
            if(data==null||data==""){
                var tr="";
                var st="当前无任何待审核课程";
                tr+="<div class='am-hide-sm-only' style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#courses-to").append(tr);
            }else{
                var datas=data.data;
                console.log(datas);
                for(var i=0;i<datas.length;i++){
                    var xh=i+1;
                    var aNickname=datas[i].aNickname;
                    var aPortrait=datas[i].aPortrait;
                    var aId=datas[i].aId;
                    var aClassdiscript=datas[i].aClassdiscript;
                    var aClassname=datas[i].aClassname;
                    var aDiscript=datas[i].aDiscript;
                    var aClbetime=datas[i].aClbetime;
                    var aClendtime=datas[i].aClendtime;
                    var aPhone=datas[i].aPhone;
                    var aWeek=datas[i].aWeek;
                    var aBegintime=datas[i].aBegintime;
                    var aEndtime=datas[i].aEndtime;
                    var aWeekcount=datas[i].aWeekcount;
                    //if(aIfteacher==1){
                    //    aIfteacher="是";
                    //}else{
                    //    aIfteacher="否";
                    //}
                    var aReason=datas[i].aReason;
                    if(aReason==null||aReason==""){
                        aReason="无";
                    }

                    var zhi="-";
                    //console.log(aNickname,aReason,aIfteacher,aPortrait,aPhone);
                    console.log(aId);
                    console.log(aDiscript);
                    //var url='aPortrait';
                    var trS="";
                    trS+="<tr>";
                    trS+="<td class='am-hide-sm-only'>"+xh+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+"<img src=\""+aPortrait+"\" style='width:50px;height:50px'/>"+aNickname+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+aPhone+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+aClassname+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+aClbetime+zhi+aClendtime+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+aBegintime+zhi+aEndtime+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+aClassdiscript+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+aWeek+"</td>";
                    //trS+="<td class='am-hide-sm-only'>"+aReason+"</td>";
                    trS+="<td>"+"<input type='checkbox' value=\""+aId+"\" name='t_id'>"+"</td>";
                    trS+="</tr>";
                    $("#courses-to").append(trS);
                }
            }
        }
    })
}
//点击通过课程审核
$("#pass-audit-courses").click(function(){
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
            url:'http://47.104.18.202:8080/saxophone/saxo/clsuccess?token='+token,
            type:'post',
            dataType:'jsonp',
            data:aId,
            success:upData_zuo
        });
        function upData_zuo(status){
            var msg=status.data;
            alert(msg);
            window.location.reload();
        }
    }
});
//点击不通过课程审核
$("#reject-submit-courses").click(function(){
    var reason=document.getElementById("reject-reason-courses").value;
    console.log(reason);
    var ob=document.getElementsByName("t_id");
    var s='';
    for(var i=0; i<ob.length; i++){
        if(ob[i].checked) s+=ob[i].value+','; //如果选中，将value添加到变量s中
    }
    //那么现在来检测s的值就知道选中的复选框的值了
    if(s==""||s==null){
        alert("你没有选择任何坐席所以无法添加");
    }else {
        console.log(s == '' ? '你还没有选择任何内容！' : s);
        var aId={"aid":s,"reason":reason};
        console.log(aId);
        $.ajax({
            url:'http://47.104.18.202:8080/saxophone/saxo/classfail?token='+token,
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

//查询通过审核的课程并显示
function passCourses(){
    $.ajax({
        dataType:'jsonp',
        url:'http://47.104.18.202:8080/saxophone/saxo/backgetclass?token='+token+'&astate='+1,
        success:function(data){
            console.log(data);
            var datas=data.data;
            if(datas==""||data==null){
                var tr="";
                var st="当前无任何审核通过课程";
                tr+="<div style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#courses-pass").append(tr);
            }else {
                console.log(datas);
                for (var i = 0; i < datas.length; i++) {
                    var xh = i + 1;
                    var aNickname = datas[i].aNickname;
                    var aPortrait = datas[i].aPortrait;
                    var aId = datas[i].aId;
                    var aClassdiscript = datas[i].aClassdiscript;
                    var aClassname = datas[i].aClassname;
                    var aDiscript = datas[i].aDiscript;
                    var aClbetime = datas[i].aClbetime;
                    var aClendtime = datas[i].aClendtime;
                    var aPhone = datas[i].aPhone;
                    var aWeek = datas[i].aWeek;
                    var aBegintime = datas[i].aBegintime;
                    var aEndtime = datas[i].aEndtime;
                    var aWeekcount = datas[i].aWeekcount;
                    //if(aIfteacher==1){
                    //    aIfteacher="是";
                    //}else{
                    //    aIfteacher="否";
                    //}
                    var aReason = datas[i].aReason;
                    if (aReason == null || aReason == "") {
                        aReason = "无";
                    }

                    var zhi = "-";
                    //console.log(aNickname,aReason,aIfteacher,aPortrait,aPhone);
                    console.log(aId);
                    console.log(aDiscript);
                    //var url='aPortrait';
                    var trS = "";
                    trS += "<tr>";
                    trS += "<td class='am-hide-sm-only'>" + xh + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + "<img src=\"" + aPortrait + "\" style='width:50px;height:50px'/>" + aNickname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aPhone + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClassname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClbetime + zhi + aClendtime + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aBegintime + zhi + aEndtime + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClassdiscript + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aWeek + "</td>";
                    //trS+="<td class='am-hide-sm-only'>"+aReason+"</td>";
                    trS += "<td>" + "<input type='checkbox' value=\"" + aId + "\" name='t_id'>" + "</td>";
                    trS += "</tr>";
                    $("#courses-pass").append(trS);
                }
            }
        }
    })
}

//查询未通过审核的课程并显示
function notCourses(){
    $.ajax({
        dataType:'jsonp',
        url:'http://47.104.18.202:8080/saxophone/saxo/backgetclass?token='+token+'&astate='+2,
        success:function(data){
            console.log(data);
            var datas = data.data;
            if(datas==""||data==null){
                var tr="";
                var st="当前无任何审核未通过课程";
                tr+="<div style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#courses-not").append(tr);
            }else {
                console.log(datas);
                for (var i = 0; i < datas.length; i++) {
                    var xh = i + 1;
                    var aNickname = datas[i].aNickname;
                    var aPortrait = datas[i].aPortrait;
                    var aId = datas[i].aId;
                    var aClassdiscript = datas[i].aClassdiscript;
                    var aClassname = datas[i].aClassname;
                    var aDiscript = datas[i].aDiscript;
                    var aClbetime = datas[i].aClbetime;
                    var aClendtime = datas[i].aClendtime;
                    var aPhone = datas[i].aPhone;
                    var aWeek = datas[i].aWeek;
                    var aBegintime = datas[i].aBegintime;
                    var aEndtime = datas[i].aEndtime;
                    var aWeekcount = datas[i].aWeekcount;
                    //if(aIfteacher==1){
                    //    aIfteacher="是";
                    //}else{
                    //    aIfteacher="否";
                    //}
                    var aReason = datas[i].aReason;
                    if (aReason == null || aReason == "") {
                        aReason = "无";
                    }

                    var zhi = "-";
                    //console.log(aNickname,aReason,aIfteacher,aPortrait,aPhone);
                    console.log(aId);
                    console.log(aDiscript);
                    //var url='aPortrait';
                    var trS = "";
                    trS += "<tr>";
                    trS += "<td class='am-hide-sm-only'>" + xh + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + "<img src=\"" + aPortrait + "\" style='width:50px;height:50px'/>" + aNickname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aPhone + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClassname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClbetime + zhi + aClendtime + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aBegintime + zhi + aEndtime + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClassdiscript + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aWeek + "</td>";
                    //trS+="<td class='am-hide-sm-only'>"+aReason+"</td>";
                    //trS+="<td>"+"<input type='checkbox' value=\""+aId+"\" name='t_id'>"+"</td>";
                    trS += "</tr>";
                    $("#courses-not").append(trS);
                }
            }
        }
    })
}

//点击删除已通过课程
$("#courses-delete-submit").click(function(){
    var deReason=document.getElementById("delete-courses").value;
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
            url:'http://47.104.18.202:8080/saxophone/saxo/delsuccessclass?token='+token,
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

