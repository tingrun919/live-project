/**
 * Created by Administrator on 2017/9/4 0004.
 */
var token=sessionStorage.getItem("key");
console.log(token);
if(token=="undefined"){
    alert("token失效，请重新登录");
    window.location.href='index.html';
}
queryExcellence();
//queryRecommeded();
//查询当前首页显示的推荐视频的介绍和封面
function queryExcellence(){
    $.ajax({
        url:'http://47.104.18.202:8080/saxophone/saxo/selectmain?token='+token,
        dataType:"jsonp",
        success:function(data){
            console.log(data);
            var datas=data.data;
            //if(datas==""||data==null){
            //    var tr="";
            //    var st="当前没有设置任何视频";
            //    tr+="<div style='color: #e4393c;font-size: 20px;text-align: center;width: 300px'>"+st+"</div>";
            //    //trS+="<td class='am-hide-sm-only'>"+"<input type='checkbox' value=\""+aid+"\" name='aId'/>"+"</td>";
            //    $("#courses-details2").append(tr);
            //}else {
            for(var i=0;i<datas.length;i++){
                //console.log(datas);
                //var url=datas.url;
                var aCover=datas[i].aCover;
                var aDiscript=datas[i].aDiscript;
                var aName=datas[i].aName;
                var aType=datas[i].aType;
                var aId=datas[i].aId;
                var aVid=datas[i].aVid;
                console.log(aId);
                var xiu="修改";
                var shan="删除";
                var sName="视频名称：";
                var sD="视频描述：";
                if(aType==1){
                    //aType="视频类型：推荐视频";
                    var li="";
                    li+="<li>"+
                    "<div class='am-u-lg-1 am-u-md-2'>" +
                    "<img src=\""+aCover+"\" style='width: 145px;height:80px' class='img-responsive'/>" +
                    "</div>" +
                    "<div class='am-u-lg-9 am-u-md-8 video-introduce' style='margin-left: 10px'>" +
                    "<span class='label label-sm ' style='color: grey'>" +sName+ aName + "</span>" +"<br/>"+
                    //"<span class='label label-sm label-success'>" + aType + "</span>" +
                    "<span class='label label-sm ' style='color: grey;white-space: normal'>" +sD+ aDiscript + "</span>" +
                    "</div>" +
                    "<div class='am-u-lg-2 am-u-md-2 video-op'>" +
                    "<a class='am-btn-success' onclick='xiugai(\""+aId+"\",\""+aType+"\",\""+aCover+"\",\""+aName+"\" ,\""+aDiscript+"\")' data-toggle='modal' data-target='#myDs1' style='text-decoration:none'>" +xiu+ "</a>" +
                    "<a class='am-btn-danger' onclick='del(\"" + aId+ "\")' style='text-decoration:none'>" +shan+ "</a>" +
                    "</div>" +
                    "</li>";
                    $("#excellence").append(li);
                }else{
                    //aType="视频类型：优秀视频";
                    var li2 = "";
                    li2 += "<li>" +
                    "<div class='am-u-lg-1 am-u-md-2'>" +
                    "<img src=\""+aCover+"\" style='width: 145px;height:80px' class='img-responsive'/>" +
                    "</div>" +
                    "<div class='am-u-lg-9 am-u-md-8 video-introduce' style='margin-left: 10px'>" +
                    "<span class='label label-sm' style='color: grey'>" +sName+ aName+ "</span>" +"<br/>"+
                    //"<span class='label label-sm label-success'>" + aType+ "</span>" +
                    "<span class='label label-sm' style='color: grey;white-space: normal'>"  +sD+ aDiscript + "</span>" +
                    "</div>" +
                    "<div class='am-u-lg-2 am-u-md-2 video-op'>" +
                    "<a class='am-btn-success' onclick='xiugai(\""+aId+"\",\""+aType+"\",\""+aCover+"\",\""+aName+"\" ,\""+aDiscript+"\")' data-toggle='modal' data-target='#myDs1' style='text-decoration:none'>" +xiu+ "</a>" +
                    "&nbsp;"+"<a class='am-btn-danger' onclick='del(\"" + aId+ "\")' style='text-decoration:none'>" +shan+ "</a>" +
                    "</div>" +
                    "</li>";
                    $("#recommended").append(li2);
                }
            }
        }
    })
}
//查询当前首页显示的优秀视频并显示
//function queryRecommeded(){
//    $.ajax({
//        url:'http://192.168.10.141:8080/saxophone/saxo/selectmain?token='+token+'&type='+2,
//        dataType:"jsonp",
//        success:function(data){
//            console.log(data);
//            var datas=data.data;
//            console.log(datas);
//            for(var i=0;i<datas.length;i++) {
//                var vid=datas[i].vid;
//                var aCover=datas[i].aCover;
//                var aDiscript=datas[i].aDiscript;
//                var aName=datas[i].aName;
//                var aType=datas[i].aType;
//                var teacher=datas[i].teacher;
//                var aVid=datas[i].aVid;
//                if(aType==1){
//                    aType="视频类型：推荐视频";
//                }else{
//                    aType="视频类型：优秀视频";
//                }
//
//                var xiu="修改";
//                var shan="删除";
//
//            }
//        }
//    })
//}

//查询讲师(按照签到量排序)并显示
$.ajax({
    dataType:'jsonp',
    url:'http://47.104.18.202:8080/saxophone/saxo/lqeeManager?token='+token+'&state='+2,
    success:function(data){
        console.log(data);
        var datas=data.data;
        for(var i=0;i<datas.length;i++){
            var aNickname=datas[i].aNickname;
            var aid=datas[i].aId;
            var op2="";
            op2+="<option value=\""+aid+"\">"+aNickname+"</option>";
            $("#select").append(op2);
        }
    }
});
//当选择了讲师时，根据选择的讲师显示讲师下的视频
$("#select").change(function(){
    //$("#select1").change(function(){
        $("#select1").html("");
    //});
    queryVideo();
});
//获取讲师历史视频
function queryVideo(){
    //var videoName="会分开洛杉矶是";
    //var op="";
    //op+="<option value='3'>"+videoName+"</option>";
    //$("#select1").append(op);
    var mySelect=document.getElementById("select");
    var index=mySelect.selectedIndex;
    var op1=mySelect.options[index].value;
    console.log(op1);
    $.ajax({
        async:false,
        url:'http://47.104.18.202:8080/saxophone/saxo/backgetvideo?token='+token,
        data:{"aid":op1},
        dataType:'jsonp',
        success:function(data){
            console.log(data);
            var datas=data.data;
            for(var i=0;i<datas.length;i++){
                //var aNickname=datas[i].aNickname;
                var vid=datas[i].vid;
                var url=datas[i].downloadOrigUrl;
                var videoName=datas[i].videoName;

                var op="";
                op+="<option value=\""+url+"\" name=\""+vid+"\">"+videoName+"</option>";
                $("#select1").append(op);
            }
        }
    });
}
//预览讲师视频
$("#turn-on").click(function(){
    var mySelect5=document.getElementById("select1");
    var index=mySelect5.selectedIndex;
    var op2=mySelect5.options[index].value;
    window.open(op2);
});

//添加推荐和优秀视频
function addVideo(t){
    console.log(t);
    var pic=0;
    $("#file").change(function() {
        //alert
        var url = 'http://47.104.18.202:8080/saxophone/saxo/picUpload?token='+token;
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
    $("#submit-video2").click(function(){
        var mySelect=document.getElementById("select");
        var index=mySelect.selectedIndex;
        var op1=mySelect.options[index].value;
        var mySelect2=document.getElementById("select1");
        var index2=mySelect2.selectedIndex;
        var op2=mySelect2.options[index2].value;
        var op3=mySelect2.options[index2].getAttribute("name");
        var name=document.getElementById("video-name").value;
        var introduce=document.getElementById("video-describe").value;
        var dataIdex={"name":name,"teacher":op1,"discript":introduce,"type":t,"cover":pic,"vid":op3};
        $.ajax({
            url:'http://47.104.18.202:8080/saxophone/saxo/addmain?token='+token,
            dataType:'jsonp',
            data:dataIdex,
            success:function(data){
                console.log(data);
                var msg=data.message;
                alert(msg);
                window.location.reload();
            }
        })
    });
}


//修改视频的名称、封面和描述
function xiugai(a,b,cover,na,des){
    console.log(a,b,cover,na,des);
    var pic2=0;
    $("#img1").html("");
    document.getElementById("mo-name").placeholder=na;
    document.getElementById("mo-describe").placeholder=des;
    var im="";
    im+="<img src=\""+cover+"\" id='src1' class='src' style='width: 500px;height: 200px'>";
    $("#img1").append(im);
    $("#file1").change(function() {
        //alert
        var url = 'http://47.104.18.202:8080/saxophone/saxo/picUpload?token='+token;
        var formdata = new FormData();
        formdata.append("file", $("#file1")[0].files[0]);
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
                var picUrl2=json.data;
                console.log(picUrl2);
                pic2=picUrl2;
                if (json.code == 100000) {
                    $(".img1")[0].style.display = "block";
                    $("#src1")[0].src = json.data;
                } else {
                    alert(json.message);
                }
            }
        })
    });
    $("#submit-video").click(function(){
        var discript=document.getElementById("mo-describe").value;
        var name=document.getElementById("mo-name").value;
        var xData={"aid":a,"cover":pic2,"discript":discript,"name":name,"type":b};
        console.log(xData);
        $.ajax({
            url:'http://47.104.18.202:8080/saxophone/saxo/updatemain?token='+token,
            dataType:'jsonp',
            data:xData,
            success:function(data){
                var msg=data.message;
                alert(msg);
                window.location.reload();
            }
        })
    });
}

//删除推荐或者优秀视频视频
function del(d){
    console.log(d);
    var delData={"aid":d};
    $.ajax({
        url:'http://47.104.18.202:8080/saxophone/saxo/deletemain?token='+token,
        dataType:'jsonp',
        data:delData,
        success:function(data){
            var msg=data.message;
            alert(msg);
            window.location.reload();
        }
    });
}

