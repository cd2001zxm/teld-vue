/**
 * Created by chendong on 2016/10/20.
 */

//自动分析域名后缀
var domain = function (domain) {
    var ares = domain.split(':')[0].split('.')
    ares.shift()
    ares.unshift('')
    return ares.join('.')
}(document.domain);

window.systems ={base:1,oldboss:1,newsys:1}
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

//系统缺省名称（无身份认证时访问使用）
window.SysDefaultName = "权限系统";

//token刷新地址
window.TokenRefreshUrl = "//userapi"+domain+"/api/v1/token/uirefresh";

//发布管理系统地址(获取版本信息)
window.CmsUrl = "//mall"+domain+"/api/SysRelease?SysID="+window.ApplicationID;

//测试的时候可以设置为false，可以不检查token
window.TokenEnabled=true;




