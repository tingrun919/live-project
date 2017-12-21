/**
 * Created by Administrator on 2017/9/4 0004.
 */
var token=sessionStorage.getItem("key");
console.log(token);
if(token=="undefined"){
    alert("token失效，请重新登录");
    window.location.href='index.html';
}
passTeacher();
//查询通过审核的讲师并显示
function passTeacher(){
    $.ajax({
        dataType:'jsonp',
        url:'http://47.104.18.202:8080/saxophone/saxo/lqeeManager?token='+token+'&state='+2,
        success:function(data){
            console.log(data);
            var datas=data.data;
            if(datas==""||data==null){
                var tr="";
                var st="当前讲师无任何讲师";
                tr+="<div style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#manage-courses").append(tr);
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
                    //var t_id=datas.t_id;
                    console.log(aNickname, aReason, aIfteacher, aPortrait, aPhone);
                    console.log(aId);
                    console.log(aDiscript);
                    url = 'courses-details.html?aId=' + datas[i].aId + '&token=' + token;
                    var cao = "课程签到统计";
                    //var url='aPortrait';
                    var trS = "";
                    trS += "<tr>";
                    trS += "<td class='am-hide-sm-only'>" + xh + "</td>";
                    trS += "<td class='am-hide-sm-only' style='text-align: left'>" + "<img src=\"" + aPortrait + "\" style='width:50px;height:50px'/>" + aNickname + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aPhone + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + aIfteacher + "</td>";
                    trS += "<td class='am-hide-sm-only'>" + "<a href='" + url + "' style='background-color:#5eb95e;padding:7px;border-radius:3px;color:#fff'>" + cao + "<a/>" + "</td>";
                    trS += "</tr>";
                    $("#manage-courses").append(trS);
                }
            }
        }
    })
}