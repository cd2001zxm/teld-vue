<template>
        <div v-if="HasAuth" id="navbar" class="navbar navbar-fixed-top">
        <div v-if="HasAuth" style="display:none;" id="noNetwork" class="network fade in"><div><i class="fa fa-warning">重新连接中...</i></div></div>
        <div v-if="HasAuth" class="navbar-inner">
            <div class="navbar-container">
                <div id="wrpLeftNavbar" class="navbar-header " v-bind:style="isSaas?'padding-right:20px':''">
                    <span class="visible-lg" style="padding-left: 5px;display: inline-block;float: left;height: 50px;line-height: 50px;font-size: 24px;">
                        <template v-if="!isSaas">
                            <i class="icomoon teld_logo" style="font-size: 28px;color: white"></i>
                        </template>
                        <template v-else>
                            <img v-bind:src="saasInfo.DefaultPageNavLogo" style="max-height: 32px" crossorigin="anonymous">
                        </template>


                    </span>

                    <!--移动端展示-->
                    <template v-if="!isSaas">
                        <span  class="visible-xs visible-sm visible-md gotoIndex" style="padding-left: 15px;display: inline-block;float: left;height: 50px;line-height: 50px;font-size: 24px;">
                           <i class="fa fa-home" style="font-size: 28px;color: white"></i>
                        </span>
                    </template>
                    <template v-else>
                        <span  class="visible-xs visible-sm visible-md" style="padding-left: 15px;display: inline-block;float: left;height: 50px;line-height: 50px;font-size: 24px;">
                           <img v-bind:src="saasInfo.DefaultPageNavLogo" style="max-height: 32px" crossorigin="anonymous">
                        </span>
                    </template>

                    <span class="visible-xs visible-sm visible-md" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:80%;text-align:center;float: left;height: 50px;line-height: 50px;font-size: 16px;font-weight: bold;color:white">
                       {{pluginName}}
                    </span>
                    <a href="javascript:void(0);" class="navbar-brand visible-lg gotoIndex" >
                        <span style="font-size: 20px;font-weight: bold;font-style: italic">{{ApplicationName}}</span>
                    </a>
                    <template v-if="!isSaas">
                        <template v-if="!p_context.isPlatformIndex">
                            <div class="navbar-brand visible-lg" id="subSysContainer">
                                <span style="padding: 0 5px 0 12px;font-size: 18px"><label>|</label></span>
                                <span><label style="font-size: 18px;font-weight: bold;line-height: 50px;">{{SubApplicationName}}</label></span>
                                <template v-if="App && App.length>1">
                                    <span id="subSysDiv" class="" style="position: relative">

                                    <a id="subSysDivSel" type="button" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" style="font-size: 18px;font-weight: bold">
                                        <i class="collapse-icon glyphicon glyphicon-th"></i>
                                    </a>

                                    <div class="clearfix pull-left dropdown-menu subsystem-menu" style="overflow-y:auto;padding: 5px;">
                                                <template v-for="item in App">
                                                    <!--<template v-if="directWebsite.hasOwnProperty(item.ApplicationUrl.replace('http://','').replace('https://',''))">-->
                                                         <!--<template v-if='item.ApplicationUrl.replace("http://","").replace("https://","").split(".")[0] != p_context.SubApplication'>-->
                                                             <!--<a class="subsystem text-center" v-bind:href="item.ApplicationUrl" target="_blank" style="text-decoration: none">-->
                                                                <!--<span class="clearfix" style="width: 55px;height: 55px;color:white;display: block;padding: 0 20px;">-->
                                                                    <!--<template v-if="!item.ApplicationIcon"><img style="width:55px;height:55px;" /></template>-->
                                                                    <!--<template v-else>-->
                                                                        <!--&lt;!&ndash;<img v-bind:src="ResourcePath + item.ApplicationIcon" style="width:55px;height:55px;" />&ndash;&gt;-->
                                                                        <!--<i v-bind:class="'icomoon teld_' + getSysName(item.ApplicationUrl)" style="font-size:50px;line-height: 55px;width: 55px;height: 55px;"/>-->
                                                                    <!--</template>-->

                                                                <!--</span>-->
                                                                <!--<label style="display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;cursor: pointer;">{{item.ApplicationName}}</label>-->
                                                            <!--</a>-->
                                                        <!--</template>-->
                                                    <!--</template>-->
                                                    <!--<template v-else>-->
                                                         <template v-if='item.ApplicationUrl.replace("http://","").replace("https://","").split(".")[0] != p_context.SubApplication'>
                                                             <a class="subsystem text-center" style="text-decoration: none" v-on:click="jump(item.ApplicationUrl)">
                                                                <span class="clearfix" style="width: 55px;height: 55px;color:white;display: block;padding: 0 20px;">
                                                                    <!--<template v-if="!item.ApplicationIcon"><img style="width:55px;height:55px;" /></template>-->
                                                                    <!--<template v-else>-->
                                                                        <!--<img v-bind:src="ResourcePath + item.ApplicationIcon" style="width:55px;height:55px;" />-->
                                                                        <i v-bind:class="'icomoon teld_' + getSysName(item.ApplicationUrl)" style="font-size:50px;line-height: 55px;width: 55px;height: 55px;"/>
                                                                    <!--</template>-->

                                                                </span>
                                                                <label style="display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;cursor: pointer;">{{$t('app[\'APP'+item.ApplicationID+'\']')}}</label>
                                                            </a>
                                                        </template>
                                                        <template v-else>
                                                            <a class="subsystem text-center active" style="text-decoration: none" v-on:click="jump(item.ApplicationUrl)">
                                                                <span class="clearfix" style="width: 55px;height: 55px;color:white;display: block;padding: 0 20px;">
                                                                    <!--<template v-if="!item.ApplicationIcon"><img style="width:55px;height:55px;" /></template>-->
                                                                    <!--<template v-else>-->
                                                                    <!--<img v-bind:src="ResourcePath + item.ApplicationIcon" style="width:55px;height:55px;" />-->
                                                                        <i v-bind:class="'icomoon teld_' + getSysName(item.ApplicationUrl)" style="font-size:50px;line-height: 55px;width: 55px;height: 55px;"/>
                                                                    <!--</template>-->

                                                                </span>
                                                                <label style="display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;cursor: pointer;">{{$t('app[\'APP'+item.ApplicationID+'\']')}}</label>
                                                            </a>
                                                        </template>
                                                    <!--</template>-->


                                                </template>
                                            </div>

                                </span>
                                </template>
                                <template v-else>
                                    <span id="subSysDiv" class="" style="position: relative;display: none"></span>
                                </template>

                            </div>
                        </template>
                    </template>

                </div>
                <div class="navbar-header ">

                        <!--配置三级菜单-->
                        <template v-if="SiderData.SiderData.MenuGroup && SiderData.SiderData.MenuGroup.length>0">

                            <div class="visible-lg" id="bs-example-navbar-collapse-1">
                                <ul id="pcmenu" class="nav navbar-nav navbar-right">
                                    <template v-for="(mge,index) in canDisplayGroup">
                                        <li v-bind:class="index==0?'active':''">
                                            <a v-bind:id="mge.GroupId" class="menu-group" href="javascript:void(0);"  v-on:click="changeMenu(mge.GroupId)">{{$t(this.p_context.SubApplication+'[\'MG'+mge.GroupId+'\']',mge.GroupName)}}</a>
                                        </li>
                                    </template>
                                    <template v-if="hideDisplayGroup.length>0">
                                        <li class="more-group-li">
                                            <a href="javascript:void(0)" class="menu-dropdown menu-group top-menu" data-toggle="dropdown">{{$t("localeMsg.WRPMoreMenu")}}<i class="fa fa-caret-down" aria-hidden="true" style="padding-left: 5px;"></i></a>
                                            <ul class="submenu dropdown-menu top-sub-menu">
                                                <template v-for="mge in hideDisplayGroup">
                                                    <li>
                                                        <a v-bind:id="mge.GroupId" class="menu-group" href="javascript:void(0);"
                                                           style="width: 100%!important;line-height: 34px"
                                                           v-on:click="changeMenu(mge.GroupId)">{{$t(this.p_context.SubApplication+'[\'MG'+mge.GroupId+'\']',mge.GroupName)}}</a>
                                                    </li>
                                                </template>
                                            </ul>
                                        </li>
                                    </template>
                                </ul>
                            </div>

                        </template>

                        <!--未配置三级菜单-->
                        <template v-else>
                            <!--菜单配置为顶级显示-->
                            <template v-if="MenuType==1">
                                <ul  class="nav navbar-nav navbar-left visible-lg" >
                                    <template v-for="item in canDisplayMenu">
                                        <li class="menu-floor-1" v-bind:id="item.MenuId">
                                            <a href="javascript:void(0)" class="menu-dropdown menu-group top-menu" data-toggle="dropdown">
                                                <!--<i class="menu-icon fa fa-table"></i>-->
                                                {{$t(this.p_context.SubApplication+'[\'MG'+item.MenuId+'\']',item.FullName)}}<i class="fa fa-caret-down" aria-hidden="true" style="padding-left: 5px;"></i>
                                                <!--<i class="menu-expand"></i>-->
                                            </a>

                                            <ul class="submenu dropdown-menu top-sub-menu" style="">
                                                <template v-for="subitem in item.childList">
                                                    <li class="vue-menu" v-bind:id="subitem.MenuId">
                                                        <a href="javascript:void(0);" v-bind:data-url="(subitem.NavigateUrl ==null || subitem.NavigateUrl =='')?'':(SubApplication + subitem.NavigateUrl) + (subitem.NavigateUrl.indexOf('?')==-1?'?':'&') +'mid=' + subitem.MenuId"><span class="menu-text"> {{$t(this.p_context.SubApplication+'[\'M'+subitem.MenuId+'\']',subitem.FullName)}} </span></a>
                                                    </li>
                                                </template>
                                            </ul>
                                        </li>
                                    </template>
                                    <template v-if="hideDisplayMenu.length>0">
                                        <li class="menu-floor-1" id="moreMenu">
                                            <a href="javascript:void(0)" class="menu-dropdown menu-group top-menu" data-toggle="dropdown">
                                                {{$t("localeMsg.WRPMoreMenu")}}<i class="fa fa-caret-down" aria-hidden="true" style="padding-left: 5px;"></i>
                                            </a>
                                            <ul class="submenu dropdown-menu top-sub-menu more-menu" style="">
                                                <template v-for="item in hideDisplayMenu">
                                                    <li class="more-menu-floor" v-bind:id="item.MenuId">
                                                        <a href="javascript:void(0)" class="more-menu-item">

                                                            <span class="more-menu-item">{{$t(this.p_context.SubApplication+'[\'MG'+item.MenuId+'\']',item.FullName)}}<i class="fa fa-caret-right" aria-hidden="true" style="padding-left: 5px;"></i>

                                                                </span>
                                                        </a>

                                                        <ul class="" style="display:none;position: absolute;left: 170px;top: 0px;background: white;box-shadow: 0 6px 12px rgba(0,0,0,.175);padding-left: 15px;">
                                                            <template v-for="subitem in item.childList">
                                                                <li class="vue-menu vue-more-menu" v-bind:id="subitem.MenuId">
                                                                    <a href="javascript:void(0);" v-bind:data-url="(subitem.NavigateUrl ==null || subitem.NavigateUrl =='')?'':(SubApplication + subitem.NavigateUrl) + (subitem.NavigateUrl.indexOf('?')==-1?'?':'&') +'mid=' + subitem.MenuId"><span style="padding-right: 10px" class="menu-text"> {{$t(this.p_context.SubApplication+'[\'M'+subitem.MenuId+'\']',subitem.FullName)}} </span></a>
                                                                </li>
                                                            </template>
                                                        </ul>
                                                    </li>
                                                </template>
                                            </ul>
                                        </li>

                                    </template>
                                </ul>
                            </template>
                        </template>

                </div>

                <!-- /Navbar Barnd -->
                <!-- Account Area and Settings --->
                <Account v-bind:info="this" ></Account>
                <!-- /Account Area and Settings -->
            </div>
        </div></div>
</template>
<style>

    @media all and (max-width: 1024px) {
        .navbar-header:first-child {
            float: none!important;
        }
    }

    .navar-search{
        //left:5px !important;
    }

   .network {
        width: 100%;
        position: fixed;
        z-index: 999;
        text-align: center;
        color: #4f4f4f;
    }
   .network div{
        width: 300px;
        background: antiquewhite;
        margin: 0 auto
    }

   .top-menu {
       color: white !important;
       font-size: 16px;
       max-width: 160px;
        display: inline-block;
       vertical-align: bottom;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
   }

    .top-sub-menu {
        list-style: none;
        background: white;
        padding: 0;
        //padding-left: 10px;
        //padding-right: 10px;
        box-shadow: 0 2px 2px rgba(0,0,0,.4);
    }

   .top-sub-menu li{
       //height: 40px;
       line-height: 40px;
       display: block;
       position: relative;
   }
   .top-sub-menu a {
       color: black!important;
       height: 40px;
       line-height: 40px;
   }
   .top-sub-menu span{
       line-height: 34px;
   }

   .top-sub-menu > li:before {
       display: none;
       content: "";
       position: absolute;
       top: 0;
       bottom: 0;
       left: -4px;
       width: 4px;
       max-width: 4px;
       overflow: hidden;
   }
   .top-sub-menu > li:hover:before{
       display:block;
   }



   .nav .open>a, .nav .open>a:hover, .nav .open>a:focus {

   }

   .top-sub-menu li.open a{
       box-shadow: 0 0 10px rgba(0,0,0,.2);
   }



   #subSysContainer{padding: 0;}
   #subSysContainer span{
        display: inline-block;
        height: 50px;

    }
   #subSysDiv > a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
       font-size: 16px;
       display: inline-block;
       height: 50px;
       line-height: 50px;
       padding-left: 10px;
       padding-right: 15px;
    }
   #subSysDiv > a:hover,
   #subSysDiv.open > a {
       box-shadow: 0 0 10px rgba(0,0,0,.2);
   }


    #subSysDiv ul{
        left:186px;
        //top:41px !important;
        border: 0 !important;
        background-color: white;
        font-size: 16px;
        color: #4f4f4f;
        max-height: 500px;
        overflow-y: auto;
        margin-top: 0;
    }
   /*#subSysDiv ul li{*/
       /*height: 40px;*/
       /*line-height: 40px;*/
   /*}*/
   #subSysDiv ul li a{
       height: 90px;

   }

    /*ul.more-menu li.actived a span{*/
        /*font-color:#00a7cb!important;*/
    /*}*/
    .vue-more-menu > a:hover,.vue-more-menu:hover{
        background: rgb(235, 235, 235) !important;
    }
    .vue-more-menu > a{
        background:white!important;
    }
    li.vue-more-menu.actived a{
        color:#00a7cb!important
    }
    .more-menu-floor.actived ul{
        display: block;
    }

    #pcmenu .more-group-li .top-sub-menu li > a {
        color:black!important;
    }

    #pcmenu .more-group-li .top-sub-menu li.active > a {
        color:white!important;
    }

</style>
<script>

    import Account from './Account.vue'
    import WRPCommon from '../../js/WRPCommon'
    export default {
        data () {

            var that = this
            if(!this.HasAuth)
                return {
                    AppFullName:'',
                    App:"",
                    isPlatformIndex:false
                }
            var ret;

            getDataAsync(FrameSGHost+"WRPFrame-GetNavBar", "get", { }, function (result) {

                if (result.state == "1") {
                        ret = result.data;
                        that.$store.dispatch("updateNavarData",ret)
                        that.App = ret.App
                        var subsysname = ""
                        var curApp;
                        for(var index in ret.App){
                            var app = ret.App[index]

                            var url = app.ApplicationUrl
                            var appName = url.replace("http://","").replace("https://","").split(".")[0]
                            if(appName == that.p_context.SubApplication){
                                //subsysname =  app.ApplicationName
                                curApp=app;
                                break
                            }
                        }
                        if(curApp){
                            subsysname = that.$i18n.messages[window.locale][that.p_context.SubApplication]["APP"+curApp.ApplicationID]
                            window.subSysName = subsysname;
                            that.SubApplicationName = subsysname;
                            that.pluginName = isSaas?this.saasInfo.SYSName:subsysname
                        }


                }

            },null,function (result) {
                ret = "[]";
            });
            //this.$store.commit("updateNavarData",[])
            var retJson =  {
                App:[]
            };

            window.subSysName=""

            //if(retJson && retJson.hasOwnProperty("AppFullName") == false){
                //window.location.href=window.ResourcePath+"/Content/html/Error401.html";
            //}

            retJson.ResourcePath = window.ResourcePath;


            //设置二级系统是否可见以及值
            retJson.isPlatformIndex = this.p_context.isPlatformIndex



            var isSaas = this.saasInfo && this.saasInfo.hasOwnProperty("SYSName")

            retJson.MenuType = window.MenuType
            retJson.SubApplication = "/#/" + this.p_context.SubApplication
            retJson.SubApplicationName = ""
            retJson.pluginName = ""//isSaas?this.saasInfo.SYSName:window.ApplilcationNames[this.p_context.SubApplication]
            retJson.ApplicationName = isSaas?this.saasInfo.DefaultPageNavName:this.$i18n.messages[window.locale].localeMsg.WrpTitle
            retJson.isSaas = isSaas
            retJson.canDisplayGroup= this.SiderData.SiderData.MenuGroup
            retJson.canDisplayMenu = this.SiderData.SiderData.Menu
            retJson.hideDisplayGroup=[]
            retJson.hideDisplayMenu=[]
            return retJson;
        },
        mounted(){

            if(!this.HasAuth)return;

            //优先从url中获取菜单id
            var menuId = getMenuId()?getMenuId():readCookie(getMenuCookieKey());

            //根据菜单id检查是否有菜单组id
            if(menuId)
                getDataSync(FrameSGHost+"WRPFrame-GetMenuGroupId", "get", { "applicationId": window.getApplicationId(window.p_context.SubApplication ),"menuId":menuId}, function (result) {
                    if (result.state == "1") {
                        window.groupId = result.GroupId
                    }
                });

            //设置上次访问的groupId
            //let mid = readCookie(getMenuGroupCookieKey())

            if(window.groupId){
                this.changeMenu(groupId,true)
            }
            var that = this;
            if(!this.isSaas){
                //if(!isPC()){
                    $(".gotoIndex").click(function () {
                        window.location.hash="#/"

                        //that.$router.push({ path: '/', query: { wrpback: 'true' }})
                        window.location.reload()
                    });
               // }

            }

        },
        watch:{
            "$store.state.SiderData":function (newData,oldData) {

                var that = this;
                that.canDisplayGroup = newData.SiderData.MenuGroup
                that.canDisplayMenu = newData.SiderData.Menu

                if(!window.isPC())return;

                var increase = window.locale=="en"?300:160
                var menuWith = window.locale=="en"?134:109

                this.$nextTick(function () {
                    var leftNavarWidth = $("#wrpLeftNavbar").outerWidth();
                    var accountareaWidth = 477//$("ul.account-area ").outerWidth()
                    var clientWidth = document.documentElement.clientWidth || document.body.clientWidth

                    var surplusWidth = clientWidth - leftNavarWidth - accountareaWidth - menuWith;

                    var tempWidth=0
                    var canDisplayNum=0;
                    var toltal = $("ul.navbar-nav > li").length;
                    $("ul.navbar-nav > li").each(function (index) {
                        tempWidth+=$(this).outerWidth()
                        if(tempWidth > surplusWidth && index < toltal){
                            canDisplayNum = index
                            return false
                        }

                    })

                    if(canDisplayNum != 0){
                        canDisplayNum = canDisplayNum-1
                        if(that.MenuType==1){

                            that.canDisplayMenu =that.SiderData.SiderData.Menu.slice(0,canDisplayNum)
                            that.hideDisplayMenu = that.SiderData.SiderData.Menu.slice(canDisplayNum)
                            that.$nextTick(function () {

                                $(".more-menu-item").off("mouseenter").on("mouseenter",function () {

                                    $(".more-menu > li").removeClass("actived")
                                    $(".more-menu > li > ul").css("display","none")
                                    $(this).closest("li").addClass('actived');
                                    $(this).closest("li").find('ul').css('display','block')
                                })
                            })
                        }else{
                            that.canDisplayGroup =that.SiderData.SiderData.MenuGroup.slice(0,canDisplayNum)
                            that.hideDisplayGroup = that.SiderData.SiderData.MenuGroup.slice(canDisplayNum)
                        }


                    }

                    that.$nextTick(function () {
                        $('.vue-menu').off("click").on("click",function(event){
                            //event.stopPropagation()
                            var mid = $(this).attr("id")

                            //if(!isPC())return;
                            var $a = $(this).find('a');



                            //顶部菜单
                            if(window.MenuType==1){



                                $(this).closest("ul.navbar-nav").find("li").each(function () {
                                    $(this).removeClass("active");
                                });
                                $(this).closest(".menu-floor-1").addClass("active")

                                var $li = $(event.target).closest("li");

                                if($li.hasClass("vue-more-menu")){
                                    $a = $li.find("a")
                                    $(".vue-more-menu").removeClass("actived");
                                    $li.addClass("actived")
                                }else{

                                    $("#moreMenu").find("li").removeClass("actived")
                                    $(".more-menu-floor").find("ul").css("display","none")
                                }

                            }else{
                                $(".sidebar-menu").find(".submenu > li").each(function () {
                                    $(this).removeClass("active");
                                });
                            }


                            $(this).addClass("active");

                            var url = $a.attr("data-url").replace("/#","");

                            var menuText = $a.find("span").eq(0).text();
                            var appendHtml = '<small><i class="fa fa-angle-right"></i>' + menuText + '</small>';
                            $("#breadcrumbs").find("small").remove();
                            $("#breadcrumbs").append(appendHtml);

                            window.document.title = menuText
                            rememberMid(url);

                            saveCondition(that,null);
                            window.sessionStorage.clear()
                            window.operatorList=[];
                            //loadShareJs();
                            var mainurl = WRPCommon.getMainRouterInfoByMenuId(mid)
                            that.$router.push(mainurl?mainurl:url);
                            window.favorateBtnStatusSet()
                            window.onlineBtnStatusSet()

                        });
                        window.resetSelectedMenu()
                        window.onlineBtnStatusSet()
                    })





                })
            }
        },
        props: ['HasAuth','SiderData','saasInfo'],
        components:{
            "Account":Account
        },
        methods:{
            getSysName:function (url) {
                var appName = url.replace("http://","").replace("https://","").split(".")[0]
                return appName;
            },
            jump:function (url) {
                var appName = this.getSysName(url)

                //系统切换时，清除记录的菜单
                //window.removeMid()
                window.eraseCookie(getMenuCookieKey());
                window.eraseCookie(getMenuGroupCookieKey())
                if(isPC()){
                    var url = "//"+ window.location.host +"/#/"+appName
                    var opener = window.open(url,"_blank")
                    opener = null
                }else{
                    window.location.href="//"+ window.location.host +"/#/"+appName
                    window.location.reload()
                }
            },

            changeMenu:function (groupid,notClick) {
                this.$nextTick(function () {
                    $("#pcmenu").find("li").each(function () {
                        $(this).removeClass("active");
                    });
                    var menuName = $("#"+groupid).text();
                    $("#mobileMenu").find(".user-name").text(menuName)


                    $("#"+groupid).closest("li").addClass("active")

                    if($("#"+groupid).closest(".more-group-li").length > 0){
                        $("#"+groupid).closest(".more-group-li").addClass("active")
                    }
                });

                this.$emit("subMenuChange",groupid,notClick);
            }

        }
    }
</script>

<style>

</style>
