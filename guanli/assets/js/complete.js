/**
 * Created by Administrator on 2017/9/1 0001.
 */
var token=sessionStorage.getItem("key");
console.log(token);
if(token=="undefined"){
    alert("token失效，请重新登录");
    window.location.href='index.html';
}
var pg=0; var pa=1;
completePay();
//查询已完成付费的订单
function completePay(){
    var start_time=document.getElementById("complete-start-time").value;
    var end_time=document.getElementById("complete-end-time").value;
    var complete_order=document.getElementById("complete-order").value;
    console.log(start_time,end_time,complete_order);
    $.ajax({
        dataType:'jsonp',
        url:'http://47.104.18.202:8080/saxophone/saxo/ordermanager?token='+token+'&state='+1,
        data:{"begintime":start_time,"endtime":end_time,"ordercode":complete_order},
        success:function(data){
            console.log(data);
            var datas=data.data;
            if(datas==""||datas==null){
                var tr="";
                var st="当前无任何订单";
                tr+="<div class='am-hide-sm-only' style='color: #e4393c;font-size: 20px;text-align: center'>"+st+"</div>";
                //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                $("#complete-pay").append(tr);
            }else{
                console.log(datas);
                for(var i=0;i<datas.length;i++){
                    var xh=i+1;
                    var aPhone = datas[i].aPhone;
                    var aid = datas[i].aId;
                    var begintime = datas[i].begintime;
                    var endtime = datas[i].endtime;
                    var aTime=datas[i].aTime;
                    var money = datas[i].aBillmoney;
                    var nickname = datas[i].aNickname;
                    var page=datas[i].page;
                    console.log(page);
                    var pageX=page/10;
                    document.getElementById("spanTotalPage").innerHTML=( Math.ceil(pageX));
                    document.getElementById("spanPageNum").innerHTML=pa;
                    pg=( Math.ceil(pageX));
                    //if(aIfteacher==1){
                    //    aIfteacher="是";
                    //}else{
                    //    aIfteacher="否";
                    //}
                    var ordercode = datas[i].aOrdercode;
                    //if(aReason==null||aReason==""){
                    //    aReason="无";
                    //}
                    var payment = datas[i].aPayment;
                    if (payment == 1) {
                        payment = "微信";
                    } else {
                        payment = "支付宝";
                    }
                    var state = datas[i].aState;
                    if (state == 0) {
                        state = "未支付";
                    } else {
                        state = "已支付";
                    }
                    //var t_id=datas.t_id;
                    //console.log(aNickname,aReason,aIfteacher,aPortrait,aPhone);
                    //console.log(aId);
                    //console.log(aDiscript);
                    //var url='aPortrait';
                    var trS="";
                    trS+="<tr>";
                    trS+="<td class='am-hide-sm-only'>"+xh+"</td>";
                    trS+="<td class='am-hide-sm-only' style='text-align: left'>"+nickname+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+aPhone+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+ordercode+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+money+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+aTime+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+payment+"</td>";
                    trS+="<td class='am-hide-sm-only'>"+state+"</td>";
                    //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
                    trS+="</tr>";
                    $("#complete-pay").append(trS);
                }
            }
        }
    })
}

//点击查询按钮进行已付款客户查询
$("#query-complete-pay").click(function(){
    $("#complete-pay").html("");
    completePay();
});

//分页
$("#spanNext").click(function(){
    console.log(pg);
    if(pg !=0 && (pa+1) <= pg){ //如果当前页数+1 小于等于 总页数
        $("#complete-pay").html("");
        pa+=1;
        completePay();
        console.log(pa);
    }
});
$("#spanPre").click(function(){
    if((pa-1) >= 1){
        $("#complete-pay").html("");
        pa-=1;
        completePay();
    }
});