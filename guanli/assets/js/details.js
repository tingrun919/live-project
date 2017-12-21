/**
 * Created by Administrator on 2017/9/4 0004.
 */
var token=sessionStorage.getItem("key");
console.log(token);
if(token=="undefined"){
    alert("token失效，请重新登录");
    window.location.href='index.html';
}
function GetArgsFromHref(sHref, sArgName){
    var args    = sHref.split("?");
    var retval = "";

    if(args[0] == sHref) /*参数为空*/
    {
        return retval; /*无需做任何处理*/
    }
    var str = args[1];
    args = str.split("&");
    for(var i = 0; i < args.length; i ++)
    {
        str = args[i];
        var arg = str.split("=");
        if(arg.length <= 1) continue;
        if(arg[0] == sArgName) retval = arg[1];
    }
    return retval;
}
console.log(window.location.href);
//var token =GetArgsFromHref(window.location.href, 'token');
var aId =GetArgsFromHref(window.location.href, 'aId');
console.log(aId);
//console.log(token);
passCourses();
passCourses2();
//签到量未统计的课程
function passCourses(){
    $.ajax({
        dataType:'jsonp',
        url:'http://47.104.18.202:8080/saxophone/saxo/getsignclass?token='+token+'&astate='+0,
        data:{"aid":aId},
        success:function(data){
            console.log(data);
            var datas=data.data;
            if(datas==""||data==null){
                var tr="";
                var st="当前讲师无任何可统计的课程";
                tr+="<div style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#courses-details").append(tr);
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
                    var signnumber = datas[i].signnumber;
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
                    trS += "<td class='am-hide-sm-only'>" + aClassname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClbetime + zhi + aClendtime + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aBegintime + zhi + aEndtime + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClassdiscript + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aWeek + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + signnumber + "</td>";
                    //trS+="<td class='am-hide-sm-only'>"+aReason+"</td>";
                    trS += "<td>" + "<input type='checkbox' value=\"" + aId + "\" name='t_id'>" + "</td>";
                    trS += "</tr>";
                    $("#courses-details").append(trS);
                }
            }
        }
    })
}

//签到量统计完成的课程
function passCourses2(){
    $.ajax({
        dataType:'jsonp',
        url:'http://47.104.18.202:8080/saxophone/saxo/getsignclass?token='+token+'&astate='+1,
        data:{"aid":aId},
        success:function(data){
            console.log(data);
            var datas=data.data;
            if(datas==""||data==null){
                var tr="";
                var st="当前讲师无任何统计完成的课程";
                tr+="<div style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#courses-details2").append(tr);
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
                    var signnumber = datas[i].signnumber;
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
                    var bt = "完成统计";
                    //console.log(aNickname,aReason,aIfteacher,aPortrait,aPhone);
                    console.log(aId);
                    console.log(aDiscript);
                    //var url='aPortrait';
                    var trS = "";
                    trS += "<tr>";
                    trS += "<td class='am-hide-sm-only'>" + xh + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClassname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClbetime + zhi + aClendtime + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aBegintime + zhi + aEndtime + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aClassdiscript + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aWeek + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + signnumber + "</td>";
                    //trS+="<td class='am-hide-sm-only'>"+aReason+"</td>";
                    //trS+="<td>"+"<button  value=\""+aId+"\" name='t_id'>"+bt+"</button>"+"</td>";
                    trS += "</tr>";
                    $("#courses-details2").append(trS);
                }
            }
        }
    })
}


//签到量统计
$("#sign-courses-to").click(function(){
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
        var aId={"aid":s};
        console.log(aId);
        $.ajax({
            url:'http://47.104.18.202:8080/saxophone/saxo/addallsign?token='+token,
            type:'post',
            dataType:'jsonp',
            data:aId,
            success:function(data){
                console.log(data);
                var msg=data.data;
                alert(msg);
                var ms="";
                ms+="<span>"+msg+"</span>";
                $().append(ms);
                $("#courses-details2").html("");
                $("#courses-details").html("");
                passCourses();
                passCourses2();
            }
        });
    }
});