/**
 * Created by chendong on 2018/2/3.
 */
module.exports = {

    getMainRouterInfoByMenuId:function (mid) {
        if(!window.MainRouterInfo || window.MainRouterInfo.length == 0)
            return null

        var mrouter = null
        for(var index in window.MainRouterInfo){
            var item = window.MainRouterInfo[index]
            if(item.MenuId == mid){
                mrouter = "/" + item.ApplicationName + item.Router
                break
            }
        }

        if(mrouter && mrouter.indexOf("mid=")==-1){
            mrouter = mrouter + "?mid="+mid
        }

        return mrouter
    },
    isFullScreen:function () {
        return $("body").hasClass("full-screen")
    },
    //TODO:经开公交临时对应
    jkTempHandle:function (that) {

        if(that.userData.userID != "bb775545-11ab-4634-82d6-a1902b4eeffa")return;
        if(window.document.title=="特来电")window.document.title = "经开互联"
        window.document.getElementById("frameIcon").href = window.ResourcePath + "/platform/teld/img/jkhl.ico"
        $(".gotoIndex").find("span").text("经开互联")
        if(window.SiderData)window.SiderData.saasInfo.DefaultPageIconAddr=""
        // that.saasInfo = {
        //     checkResult:"1",
        //     SYSName:"经开互联",
        //     DefaultPageNavName:"经开互联"
        // }

    }
}