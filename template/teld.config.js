//自动分析域名后缀
var domain = function (domain) {
    var ares = domain.split(':')[0].split('.')
    ares.shift()
    ares.unshift('')
    return ares.join('.')
}(document.domain);

//运行框架后台服务地址
window.FrameHost = "//frame"+domain;

//资源服务地址
window.ResourcePath = "//resource" + domain;

//业务系统后台服务地址
window.ServiceHost = "//sysapi" + domain;

//当前域名的首格名称
window.Application = "newsys";

//用户中心
window.UserCenterUrl = "//user" + domain;

//系统的应用ID
window.ApplicationID = "de26342d-08b1-457a-b76f-4b34d5a3b340";

//token刷新地址
window.TokenRefreshUrl = "//userapi"+domain+"/api/v1/token/uirefresh";

//测试的时候可以设置为false，可以不检查token
window.TokenEnabled=true;