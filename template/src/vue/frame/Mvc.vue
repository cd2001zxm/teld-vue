<template>
    <div id="mvcFrameDiv"  >
        <iframe id="mvcFrame" frameborder="0" style="padding:0;margin:0;width: 100%;" v-bind:src="address" scrolling="auto" onerror="iframeError">
        </iframe>
    </div>

</template>

<style>
    .pbmargintop0{
        margin-top:0!important
    }
    .pbmargintop42{
        margin-top:42px!important
    }
</style>

<script>
    import WRPCommon from '../../js/WRPCommon'
    export default{
        data(){

            return {
                address:this.getRedirectUrl(),
                domain:domain
            }
        },
        watch:{
            "$route":function (to,from) {
                this.address = this.getRedirectUrl()//dm + this.$route.meta.mvcUrl+crossstr
            }
        },
        mounted(){
            if(!isPC()) $("#innerLoading").css("display","block")

            var that = this;
            var iframe = document.getElementById("mvcFrame");
            $(document).on("teld:fullscreenchange", function () {
                if(WRPCommon.isFullScreen()){
                    $("#page-body").eq(0).addClass("pbmargintop0").removeClass("pbmargintop42")
                }else{
                    $("#page-body").eq(0).addClass("pbmargintop42").removeClass("pbmargintop0")
                }

                that.resetFrameWH(iframe)
            });

            var clientWidth = document.documentElement.clientWidth;


            //window.setTimeout(function () {

            iframe.onload = function () {

                that.resetFrameWH(iframe)

                var pageName = isPC()?$.trim($("#breadcrumbs").find("small").text()):$.trim($("#mobilePageName").text())
                var module = p_context.SubApplication?p_context.SubApplication:"platform"
                var domain = document.domain;
                var pageAccessParam = {
                    "filter": JSON.stringify({
                        "PageName": pageName,
                        "ModuleName": module,
                        "WebSite": domain,
                        "FuncId":window.patchNo || "",
                        "WebUrl" : window.location.hash,
                        "ResponseTime_MVC": getPerformanceNow() - window.t0
                    })
                };

                window.PVCount(pageAccessParam,function () {
                    window.setTimeout(function () {
                        window.PerformanceInfo = {}
                    },1000)
                })
                if(!isPC())$("#innerLoading").css("display","none");

            }



           // },100)
        },
        methods:{
            resetFrameWH:function (iframe) {

                var h;
                if(isPC()){

                    if(WRPCommon.isFullScreen()){

                        h = document.documentElement.clientHeight-4;

                    }else{
                        h = document.documentElement.clientHeight - $(".navbar").height() - $(".page-header").height() - 8;
                    }

                }
                else{
                    h = document.documentElement.clientHeight
                }

                iframe.height=h;

                if(isPC()){
//                    $("#page-body").css("padding",0)
//                    $("#page-body").css("margin",0)
                    //window.frames[0].postMessage(clientWidth,"*")

                }
            },
            getAppUrl:function(key){

                if(!window.AllPluginSetting)return null;
                for(let i in window.AllPluginSetting){
                    let item = window.AllPluginSetting[i]
                    if(key.toLowerCase() == item.ApplicationName.toLowerCase()){
                        return item.AppUrl
                    }
                }
                return null
            },
            getRedirectUrl:function () {
                var domain = function (domain) {
                    var ares = domain.split(':')[0].split('.')
                    ares.shift()
                    ares.unshift('')
                    return ares.join('.')
                }(window.document.domain);


                var param = this.$route.query
                var otherParam = []
                for(var key in param){
                    if(this.$route.meta.mvcUrl.indexOf(key+"=")==-1)
                        otherParam.push(key+"="+window.encodeURIComponent(param[key]))
                }

                var dm = "//"+this.$route.meta.system + domain
                if(window.p_context.SubApplication.toLowerCase() == this.$route.meta.system.toLowerCase()){
                    dm = window.AppUrl?window.AppUrl:"//"+this.$route.meta.system + domain
                }else{
                    var mvcurl = this.getAppUrl(this.$route.meta.system)
                    if(mvcurl)dm = mvcurl
                }

                var crossstr = this.$route.meta.mvcUrl.indexOf("?")==-1?"?XCROSS=true":"&XCROSS=true"
                var url = dm + this.$route.meta.mvcUrl+ crossstr + (otherParam.length>0?("&"+otherParam.join("&")):"")
// && window.navigator.userAgent.indexOf("DingTalk")
                if(!isPC()){
                    var clientWidth = document.documentElement.clientWidth;
                    if(url.indexOf("?")!=-1)url= url + "&xme="+clientWidth
                    else{url= url + "?xme="+clientWidth}
                }

                return url
            }
        }

    }


</script>