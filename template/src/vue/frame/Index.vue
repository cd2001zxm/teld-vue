<template>
        <div class="" id="wyqcd" style="padding-left: 0px;padding-right: 0px">
            <!--<div class="col-lg-12 col-sm-12 col-xs-12 visible-lg">-->
                <!--<button class="btn btn-default" type="button">首页</button>-->
                <!--<button class="btn btn-default" type="button">功能地图</button>-->
            <!--</div>-->
            <div id="indexTabDiv" class="col-lg-12 col-sm-12 col-xs-12 visible-lg tabbable">
                <ul class="nav nav-tabs tabs-flat">
                    <li class="active">
                        <a data-toggle="tab" id="tab-1" href="#inner-tab-1" style="margin-left: 10px" class="map-tab">
                            {{$t("localeMsg.WrpTab1","首页")}}
                        </a>
                    </li>

                    <li class="">
                        <a data-toggle="tab" id="tab-2" href="#inner-tab-2" class="map-tab">
                            {{$t("localeMsg.WrpTab2","功能地图")}}
                        </a>
                    </li>

                </ul>
                <div class="tab-content">
                    <div id="inner-tab-1" class="tab-pane active">
                        <div class="col-lg-9 col-sm-9 col-xs-9 application-container visible-lg">
                            <div class="application-header">
                                <label>{{$t("localeMsg.WrpAppTitle")}}</label>
                                <hr style="margin: 0!important;">
                            </div>

                            <div class="application-body">
                                <template v-for="item in navarData.App">

                                    <template v-if="directWebsite.hasOwnProperty(item.ApplicationUrl.replace('http://','').replace('https://',''))">
                                        <a class="application text-center" v-bind:href="item.ApplicationUrl" target="_blank" rel="noopener">
                                    <span class="clearfix">
                                         <i v-bind:class="'icomoon teld_' + getSysName(item.ApplicationUrl)" />
                                    </span>
                                            <label class="application-title" v-bind:title="$t('app[\'APP'+item.ApplicationID+'\']')">{{$t('app[\'APP'+item.ApplicationID+'\']')}}</label>
                                        </a>
                                    </template>
                                    <template v-else>
                                        <a class="application text-center" href="javascript:void(0)" v-on:click="jump(item.ApplicationUrl)">
                                    <span class="clearfix">
                                         <i v-bind:class="'icomoon teld_' + getSysName(item.ApplicationUrl)" />
                                    </span>
                                            <label class="application-title" v-bind:title="$t('app[\'APP'+item.ApplicationID+'\']')">{{$t('app[\'APP'+item.ApplicationID+'\']')}}</label>
                                        </a>
                                    </template>

                                </template>
                            </div>

                        </div>
                        <div class="col-lg-2 col-sm-2 col-xs-2 application-container visible-lg"  style="margin-left:20px;width:20%">
                            <div class="application-header">
                                <label>{{$t("localeMsg.WrpFavorateTitle")}}</label>
                                <hr style="margin: 0!important;">

                            </div>
                            <div id="favorDropDown" class="favoritor-body">
                                <template v-if="!favoriteData || favoriteData.length==0"><div class="text-center"></div></template>
                                <template v-else>
                                    <ul class="">

                                        <template v-for="busInfo in favoriteData">
                                            <li v-bind:name="busInfo.ID " v-bind:id="'F_' + busInfo.MENUID" >

                                                <span class="favoritor-span"><a href="javascript:void(0);"  v-on:click="jumpFromFavorite(busInfo)" v-bind:title="$t(busInfo.APPLICATION+'[\'M'+busInfo.MENUID+'\']')">{{$t(busInfo.APPLICATION+'[\'M'+busInfo.MENUID+'\']')}}</a></span>
                                                <span class="pull-right f-remove hide">
                                   <a class="icon-only" href="javascript:void(0);" v-on:click="fadelete(busInfo.ID)" v-bind:title='$t("localeMsg.Delete")'><i class="glyphicon glyphicon-remove "></i></a>
                               </span>

                                            </li>
                                        </template>
                                    </ul>
                                </template>



                            </div>

                        </div>
                    </div>
                    <div id="inner-tab-2" class="tab-pane">
                        <div class="" style="float: left">
                            <ul style="list-style: none;padding-left:15px" id="funMapUl">
                                <template v-for="item in navarData.App">

                                    <template>
                                        <li v-bind:title="$t('app[\'APP'+item.ApplicationID+'\']')">
                                            <a class="text-center" v-bind:id="item.ApplicationID" href="javascript:void(0)" v-on:click="loadFuncMap(item)">
                                                <i v-bind:class="'icomoon teld_' + getSysName(item.ApplicationUrl)" />{{$t('app[\'APP'+item.ApplicationID+'\']')}}
                                            </a>
                                        </li>

                                    </template>

                                </template>
                            </ul>
                        </div>
                        <div class="cate_pop" style="float: left;">
                            <template v-if="funcMapData.hasOwnProperty('MenuGroup')">
                                <template v-for="group in funcMapData.MenuGroup">
                                    <span class="cate_channel_lk">{{group.GroupName}}</span>
                                    <template v-for="item in group.Items">
                                        <dl class="cate_detail_item">
                                            <dt class="cate_detail_tit" v-bind:title="item.MenuName">
                                                {{item.MenuName}}
                                                <i style="margin-left: 5px" class="fa fa-angle-right"></i></dt>
                                            <dd class="cate_detail_con">
                                                <template v-for="sub in item.childList">
                                                    <a rel="noopener" v-bind:title="sub.FullName" v-bind:id="sub.MenuId" class="cate_detail_con_lk" href="javascript:void(0)" v-on:click="jumpFromMap(sub)">
                                                        {{sub.FullName}}
                                                    </a>
                                                </template>
                                            </dd>
                                        </dl>
                                    </template>
                                </template>

                            </template>
                            <template v-else>
                                <span class="cate_channel_lk">{{$t('app[\'APP'+curApplicationID+'\']')}}</span>
                                <template v-for="item in funcMapData.Menu">

                                    <dl class="cate_detail_item">
                                        <dt class="cate_detail_tit" v-bind:title="item.FullName">
                                            {{item.FullName}}
                                            <i style="margin-left: 5px" class="fa fa-angle-right"></i></dt>
                                        <dd class="cate_detail_con">
                                            <template v-for="sub in item.childList">
                                                <a rel="noopener" v-bind:title="sub.FullName" v-bind:id="sub.MenuId" class="cate_detail_con_lk" href="javascript:void(0)" v-on:click="jumpFromMap(sub)">
                                                    {{sub.FullName}}
                                                </a>
                                            </template>
                                        </dd>
                                    </dl>
                                </template>
                            </template>
                        </div>

                    </div>
                </div>
            </div>

            <div class="col-xs-12 visible-xs visible-sm visible-md" style="padding: 0;background-color: white;">
                <div class="m-header" style="position: fixed;width: 100%">
                    <a class="m-tab active" id="m-key-app">{{$t("localeMsg.WrpAppTitle")}}</a>
                    <a class="m-tab " id="m-favor">{{$t("localeMsg.WrpFavorateTitle")}}</a>
                </div>
                <div class="m-body" style="margin-top: 50px;">
                    <div id="m-key-div" class="active" style="margin: 5px">
                        <template v-for="item in navarData.App">
                            <template v-if="directWebsite.hasOwnProperty(item.ApplicationUrl.replace('http://','').replace('https://',''))">
                                <a class="m-application text-center" v-bind:href="item.ApplicationUrl" v-bind:target="_self" >
                                    <span class="clearfix">
                                            <i v-bind:class="'icomoon teld_' + getSysName(item.ApplicationUrl)" v-bind:style="'background-color:'+randomColor()"/>

                                    </span>
                                    <label class="" v-bind:title="$t('app[\'APP'+item.ApplicationID+'\']')">{{$t('app[\'APP'+item.ApplicationID+'\']')}}</label>
                                </a>
                            </template>
                            <template v-else>
                                <a class="m-application text-center" href="javascript:void(0)" target="_self" v-on:click="jump(item.ApplicationUrl)">
                                    <span class="clearfix">
                                            <i v-bind:class="'icomoon teld_' + getSysName(item.ApplicationUrl)" v-bind:style="'background-color:'+randomColor()"/>

                                    </span>
                                    <label class="" v-bind:title="$t('app[\'APP'+item.ApplicationID+'\']')">{{$t('app[\'APP'+item.ApplicationID+'\']')}}</label>
                                </a>
                            </template>

                        </template>
                    </div>
                    <div id="m-favor-div" class="">
                        <template v-if="!favoriteData || favoriteData.length==0"><div class="text-center"><i class="fa fa-spinner fa-spin"></i></div></template>
                        <template v-else>
                            <ul class="">

                                <template v-for="busInfo in favoriteData">
                                    <li v-bind:name="busInfo.ID " v-bind:id="'F_' + busInfo.MENUID" >

                                        <span class=""><a href="javascript:void(0);" style="padding:1px 2px"  v-on:click="jumpFromFavorite(busInfo)">{{$t(busInfo.APPLICATION+'[\'M'+busInfo.MENUID+'\']')}}</a></span>
                                        <span class="pull-right f-remove">
                                           <a class="icon-only" href="javascript:void(0);" v-on:click="fadelete(busInfo.ID)" title="删除"><i class="glyphicon glyphicon-trash"></i></a>
                                       </span>

                                    </li>
                                </template>
                            </ul>
                        </template>
                    </div>
                </div>
            </div>
        </div>
</template>
<style>
    #funMapUl li {
        height: 26px;
        line-height: 26px;
        padding-top: 14px;
        padding-bottom: 14px;
    }

    #funMapUl a:hover{
        color:#00a7cb;
    }
    a.cate_detail_con_lk:hover{
        color:#00a7cb;
    }

    #funMapUl a ,.cate_pop a{
        color:#626262;
        text-decoration: none;
        font-size: 15px;
    }

    .map-active{
        color:#00a7cb!important;
    }

    .cate_channel_lk {
        margin-right: 10px;
        padding: 0 10px;
        height: 24px;
        background-color: #00a7cb;
        line-height: 24px;
        color: #fff;
        width: 120px;
        display: block;
        font-size: 15px;
    }

    .cate_pop {
        position: absolute;
        left: 191px;
        top: 0;
        width: 90%;
        min-height: 478px;
        border-left: 1px solid #e4dcdc;
        background-color: #fff;
        overflow-x: hidden;
        overflow-y: auto;
        height:100%;

    }

    .cate_detail_con {
        overflow: hidden;
        padding: 5px 0;
    }

    .cate_detail_con_lk {
        float: left;
        margin: 3px 0;
        padding: 0 10px;
        height: 16px;
        border-left: 1px solid #e0e0e0;
        line-height: 16px;
        white-space: nowrap;
        font-size: 15px;
    }
    .cate_detail_item {
        position: relative;
        padding-left: 160px;
        //height: 30px;
        margin-top: 10px!important;
    }

    .cate_detail_tit {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 6px;
        width: 150px;
        text-align: right;
        font-weight: 700;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 15px;
    }

    @media only screen and (max-width: 1024px){

        .page-header +.page-body {
            margin-top: 0!important;
        }

    }

    .tabbable div::after {
        content:"";
        clear:both;/*清除浮动*/
        display:block;/*确保该元素是一个块级元素*/
    }

    .m-header{
        height: 44px;
        font-size:15px;
        background-color: white;
        display: flex;
    }
    .m-header a{
        flex:1;
        color:#707070;
        height: 44px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 44px;
        text-decoration:none;
        border-bottom: 3px solid #b2b2b2;
    }

    .m-header a:first-child:after{
        content: '\20';
        position: absolute;
        right: 50%;
        top: 13px;
        bottom: 13px;
        border-right: 1px solid #e5e5e5;
        height: 15px;
    }

    .m-application {
        //width:80px;
        width: 22%;
        height:80px;
        margin: 4px;
        color:#8a8a8a;
        //border:1px solid #cccccc;
        float:left;
    }
    .m-application i {
        width:45px;
        height: 45px;
        font-size: 45px;
        line-height: 45px;
        display: inline-block;
        margin-top: 9px;
        border-radius: 11px;
        color:white;

    }
    .m-application label{
        font-size:12px;
        color:inherit;
        margin-top: 8px;
    }
    .m-body div{display: none;}
    .m-body div.active{display: block;}
    .m-body ul {list-style:none!important;padding: 0;}
    .m-body ul li{
        height: 36px;
        font-size: 12px;
        color:#383838;
        padding: 12px 12px 12px 21px;
        border-bottom: 1px solid #b2b2b2;
        color:#383838;
    }
    .m-body ul li a{
        color:inherit;
    }

    .application-container{
        border: 1px solid #cccccc;
        padding:0;
        background:#ffffff;
    }
    .application{
        width:120px;
        height:120px;
        margin: 28px;
        color:#707070;
        border:1px solid #cccccc;
        float:left;
    }

    .application i {
        width:70px;
        height: 70px;
        font-size: 68px;
        line-height: 70px;
        display: inline-block;
        margin-top: 9px;

    }
    .application-header {
        margin-left: 28px;
        //margin-top: 32px;
        margin-top: 10px;
        margin-right:32px;
    }
    .application-body {
        margin-left: 28px;
        overflow: hidden;
        //overflow-y: auto;
    }
    .application-header label{
        font-size:18px;
        font-weight: bold;
        color:#212121;

    }
    .application .application-title {

        font-size:16px;
        margin-top:9px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor:pointer;
    }
    .favoritor-body{
        font-size:16px;
        color:black;
    }
    .favoritor-body ul{
        padding-left: 0px;
        margin-bottom: 0px;
        list-style-position:inside;
    }

    .favoritor-body ul li {
        //padding:16px 56px ;
        padding: 4% 15%;
    }
    .favoritor-body ul li a{
        color:inherit;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 210px;
        display: inline-block;
        vertical-align: bottom;
    }
    .favoritor-body ul li a:hover{
        text-decoration:none;
        cursor:pointer;
    }

    .favoritor-span a {
        padding:1px 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media only screen and (max-width: 1440px){
        .favoritor-span a {
            max-width:120px!important;
        }
    }


</style>
<script>

    export default{
        data(){

            var ret = {
                navarData:[],
                favoriteData:[],
                directWebsite:window.directWebsite,
                funcMapData:{},
                funcMapCache:{},
                curMapApp:null,
                curApplicationID:null
            };
            //console.dir(this)
            return ret;

        },
        watch: {
            "$store.state.navarData":function() {
                this.navarData = this.$store.state.navarData;
            }
        },
        mounted(){
            var that = this;
            $("#page-header").addClass("hide")

            $("#page-content").css("margin-left",0);

            if (isPC()) {
                var resizeMain = function (init) {

                    var chromeHeight = document.documentElement.clientHeight || document.body.clientHeight
                    var h = chromeHeight - $(".navbar").height() - 18 - 36 - 35;
//                    if (!init) {
//                        h = h + 100;
//                    }
//                    var th = h / 2 - 22.5;
                    //$("#wyqcd").height(h);
                    $("#inner-tab-2").height(h - 10);
                    $("#indexTabDiv").height(h + 72);
                }

                $(function () {
                    resizeMain(true);
                    $("#main-container").css("margin-top",0)
                    $("#page-body").css("padding-left",0)
                    $("#page-body").css("padding-right",0)

                })
            }else{
                $("#page-body").css("padding",0)
                window.document.getElementById("page-body").style.marginTop = "0!important"
                $("#wyqcd").css("padding",0)
                $("#main-container").css("margin-top",50)
                $("#page-body").css("margin-top",0)
            }

            this.faload();
            $("#m-key-app").click(function () {
                if($(this).hasClass("active"))return false;
                $(this).addClass("active");
                $("#m-favor").removeClass("active")
                $("#m-key-div").addClass("active");
                $("#m-favor-div").removeClass("active");
            });
            $("#m-favor").click(function () {
                if($(this).hasClass("active"))return false;
                $(this).addClass("active");
                $("#m-key-app").removeClass("active")
                $("#m-favor-div").addClass("active");
                $("#m-key-div").removeClass("active");
            });

            $('.map-tab').on('shown.bs.tab', function (e) {
                for(var i=0;i<that.navarData.App.length;i++){
                    var item = that.navarData.App[i]
                    var app = that.getSysName(item.ApplicationUrl)
                    if(!window.localeMessage.hasOwnProperty(app)){
                        loadAndRusScript("/i18n/"+window.locale+"/"+ app +".js");
                    }
                }
                if(e.target.id == "tab-2"){
                    var item = that.navarData.App[0]
                    if(!that.curMapApp)
                    that.loadFuncMap(item)
                }

            })
        },
        methods:{
            randomColor: function () {

                var colorList = ['#19ABF6',
                    '#F81F90',
                    '#2AC663',
                    '#E82020',
                    '#F9B607',
                    '#8954C9',
                    '#17D1BA'];
                var r = this.getRandomIntInclusive(0,6)
                if(this.lastRandom==-1)
                    this.lastRandom = r;
                else
                    while (r == this.lastRandom){
                        r = this.getRandomIntInclusive(0,6)
                    }

                return colorList[r]
            },
            getRandomIntInclusive:function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            jumpFromFavorite:function (info) {


                var APPLICATION = info.APPLICATION;
                var NAVIGATEURL = info.NAVIGATEURL
                var GroupId = info.GroupId
                window.p_context.SubApplication = APPLICATION.split(".")[0]
                //window.removeMid()

                window.createCookie(window.getMenuCookieKey(),info.MENUID);
                if(GroupId!="")
                window.createCookie(window.getMenuGroupCookieKey(),info.GroupId);

                var sign = NAVIGATEURL.indexOf("?")==-1?"?":"&"
                window.location.href = "//"+ window.location.host +"/#/"+APPLICATION.split(".")[0] + NAVIGATEURL+sign+"mid="+info.MENUID
                window.location.reload()
            },
            getSysName:function (url) {
                var appName = url.replace("http://","").replace("https://","").split(".")[0]
                return appName;
            },
            jump:function (url) {
                window.removeMid()
                var appName = this.getSysName(url)
                if(isPC()){
                    var url = "//"+ window.location.host +"/#/"+appName
                    var opener = window.open(url,"_blank")
                    opener = null
                }else{
                    window.location.href="//"+ window.location.host +"/#/"+appName
                    window.location.reload()
                }

            },
            loadFuncMap:function (item) {
                var url = item.ApplicationUrl;
                var elemId= item.ApplicationID;
                var that = this;
                $(".cate_pop").scrollTop(0)
                //window.removeMid()
                $("#funMapUl a").removeClass("map-active")
                $(".cate_pop a").removeClass("map-active")
                $("#"+elemId).addClass("map-active")
                var appName = this.getSysName(url)
                this.curMapApp = appName
                this.curApplicationID = elemId
                var appid = window.getApplicationId(appName)
                if(that.funcMapCache.hasOwnProperty(appName)==false){
                    //this.$i18n.messages[window.locale].base[‘base-charging-0001’]
                    var message = this.$i18n.messages[window.locale][appName]
                    getDataAsync(FrameSGHost+"WRPFrame-GetMenuForMap", "get", { applicationId:appid}, function (result) {
                        var ret;
                        if (result.state == "1") {
                            ret = result.data.data;
                            if(ret.hasOwnProperty("MenuGroup")){

                                for(var i=0;i<ret.MenuGroup.length;i++){
                                    var group = ret.MenuGroup[i]
                                    if(message && message.hasOwnProperty("MG"+group.GroupId)){
                                        group.GroupName = message["MG"+group.GroupId]
                                    }
                                    for(var j=0;j<group.Items.length;j++){
                                        var item = group.Items[j]

                                        if(message && message.hasOwnProperty("M"+item.MenuId)){
                                            item.MenuName = message["M"+item.MenuId]
                                        }

                                        for(var k=0;k<ret.Menu.length;k++){
                                            var menu = ret.Menu[k]

                                            if(message && message.hasOwnProperty("M"+menu.MenuId)){
                                                menu.MenuName = message["M"+menu.MenuId]
                                            }

                                            if(menu.MenuId == item.MenuId){
                                                item.childList = menu.childList
                                                for(var m=0;m<item.childList.length;m++){
                                                    var child = item.childList[m]
                                                    if(message && message.hasOwnProperty("M"+child.MenuId)){
                                                        child.FullName = message["M"+child.MenuId]
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }

                            } else if(ret.hasOwnProperty("Menu")){
                                for(var k=0;k<ret.Menu.length;k++){
                                    var menu = ret.Menu[k]
                                    if(message && message.hasOwnProperty("M"+menu.MenuId)){
                                        menu.FullName = message["M"+menu.MenuId]
                                    }
                                    for(var m=0;m<menu.childList.length;m++){
                                        var child = menu.childList[m]
                                        if(message && message.hasOwnProperty("M"+child.MenuId)){
                                            child.FullName = message["M"+child.MenuId]
                                        }
                                    }

                                }
                            }

                        } else {
                            ret = {};
                        }
                        that.funcMapData = ret
                        that.funcMapCache[appName] = that.funcMapData
                    });
                } else {
                    that.funcMapData = that.funcMapCache[appName]
                }

            },
            jumpFromMap:function (item) {
                $(".cate_pop a").removeClass("map-active")
                $("#"+item.MenuId).addClass("map-active")
                var url = "//"+ window.location.host +"/#/"+this.curMapApp + item.NavigateUrl + "?mid=" + item.MenuId
                var opener = window.open(url,"_blank")
                opener = null
            },
            fadelete:function (id) {
                var that = this;
                getDataAsync(FrameSGHost+"WRPFrame-delFavoriteInfo", "get", { "favoriteId": id }, function (result) {
                    if (result.state == "1") {
                        that.favoriteData = JSON.parse(result.rows);
                        that.$nextTick(function () {
                            $(".favoritor-body").find("li").each(function () {
                                $(this).hover(function () {
                                    $(this).find(".f-remove").removeClass("hide")
                                },function () {
                                    $(this).find(".f-remove").addClass("hide")
                                });
                            })
                        })

                        NotifySuccess(that.$i18n.messages[window.locale].localeMsg["wrp-errmsg-0009"]);

                    } else {
                        NotifyError(result.errmsg);
                        return;
                    }
                });
            },
            faload:function () {
                var that = this;

                var od = window.webFrameFavorate
                this.favoriteData = od;
                this.$nextTick(function () {
                    $(".favoritor-body").find("li").each(function () {
                        $(this).hover(function () {
                            $(this).find(".f-remove").removeClass("hide")
                        },function () {
                            $(this).find(".f-remove").addClass("hide")
                        });
                    })
                })
            }
        }
    }
</script>
