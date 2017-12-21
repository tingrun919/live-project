/**
 * Created by Administrator on 2017/8/28 0028.
 */
function convert(x){   //也可以用数组存储表示
    switch(x){
        case 0: return "0";
        case 1:return "1";
        case 2:return "2";
        case 3:return "3";
        case 4:return "4";
        case 5:return "5";
        case 6:return "6";
        case 7:return "7";
        case 8:return "8";
        case 9:return "9";
        default:break
    }
}

function getDate(){

    var date=new Date();

    var year=date.getFullYear();  //年
    var syear=convert(Math.floor(year/1000))+convert(Math.floor((year%1000)/100))+convert(Math.floor(((year%1000)%100)/10))+convert(Math.floor(((year%1000)%100)%10))+"年";

    var month=date.getMonth()+1;  //月
    if(month<9){
        var smonth=convert(Math.floor(month%10))+"月";
    } else if(Math.floor(month%10)==0){
        var smonth="10月";
    } else{
        smonth=convert(Math.floor(month/10))+convert(Math.floor(month%10))+"月";
    }

    var da=date.getDate(); //日
    if(da<9){
        var sda=convert(Math.floor(da%10))+"日";
    } else if(Math.floor(da%10)==0){
        if(da==10){
            var sda="10日";
        } else{
            var sda=convert(Math.floor(da/10))+"日";
        }
    } else{
        var sda=convert(Math.floor(da/10))+ convert(Math.floor(da%10))+"日";
    }

    var hour=date.getHours(); //时间
    if(hour<9){
        var sh=convert(Math.floor(hour%10))+"点";
    } else if(Math.floor(hour%10)==0){
        if(hour==10){
            var sh="10点";
        } else{
            var sh=convert(Math.floor(hour/10))+"点";
        }
    } else{
        var sh=convert(Math.floor(hour/10))+convert(Math.floor(hour%10))+"点";
    }

    var minutes=date.getMinutes(); //分钟
    if(minutes<9){
        var sm=convert(Math.floor(minutes%10))+"分";
    } else if(Math.floor(minutes%10)==0){
        if(minutes==10){
            var sm="10分";
        } else{
            var sm=convert(Math.floor(minutes/10))+"分";
        }
    } else{
        var sm=convert(Math.floor(minutes/10))+convert(Math.floor(minutes%10))+"分";
    }

    var second=date.getSeconds(); //秒
    if(second<9){
        var ss=convert(Math.floor(second%10))+"秒";
    } else if(Math.floor(second%10)==0){
        if(second==10){
            var ss="10秒";
        } else{
            var ss=convert(Math.floor(second/10))+"秒";
        }
    } else{
        var ss=convert(Math.floor(second/10))+convert(Math.floor(second%10))+"秒";
    }

    var str=syear+smonth+sda+sh+sm+ss;

    var div=document.getElementById("box");   //在网页中显示
    if(typeof div.textContent=="string"){
        div.textContent=str;
    } else{
        div.innerText=str;
    }
}
window.setInterval(getDate,1000);  //每隔一秒显示时间