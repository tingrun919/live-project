(function() {
    // 配置
    var envir = 'online';
    var addr=sessionStorage.getItem("addr");
    console.log(addr);
    var configMap = {
        test: {
            appkey: '864b4841152bbf74f16f917aa6301eb8',
            url:addr
        },
        pre:{
            appkey: '864b4841152bbf74f16f917aa6301eb8',
            url:addr
        },
        online: {
            appkey: '864b4841152bbf74f16f917aa6301eb8',
            url:addr
        }
    };
    window.CONFIG = configMap[envir];
    // 是否开启订阅服务
    window.CONFIG.openSubscription = true
}())