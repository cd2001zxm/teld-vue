<template>
    <div>

       <div id="TeldIndex" class="tabbable tabs-left m-menu-tab visible-mobile">


            <ul class="nav nav-tabs" id="myTab3">
                <!--<li class="active">-->
                    <!--<a data-toggle="tab" href="#home3">-->
                        <!--常用功能-->
                    <!--</a>-->
                <!--</li>-->

                <!--配置三级菜单-->
                <template v-if="sd.SiderData.MenuGroup!=null && sd.SiderData.MenuGroup.length>0">
                    <template v-for="(mge,index) in sd.SiderData.MenuGroup">
                        <li v-bind:class="index==0?'active':''">
                            <a data-toggle="tab" v-bind:id="mge.GroupId" class="menu-group" v-bind:href="'#profile'+index" v-on:click="changeMenu(mge.GroupId)">
                                {{$t(this.p_context.SubApplication+'[\'MG'+mge.GroupId+'\']',mge.GroupName)}}
                            </a>
                        </li>
                    </template>
                </template>
                <!--未配置三级菜单-->
                <template v-else>
                    <template v-for="(item,index) in sd.SiderData.Menu">
                        <li v-bind:class="index==0?'active':''">
                            <a data-toggle="tab" v-bind:href="'#profile'+index" v-bind:id="item.MenuId" class="m-menu"
                            v-on:click="rememberMobileMenu(item.MenuId)">
                                {{$t(this.p_context.SubApplication+'[\'MG'+item.MenuId+'\']',item.FullName)}}
                            </a>
                        </li>
                    </template>

                </template>

            </ul>
            <div class="tab-content">


                <!--配置三级菜单-->
                <template v-if="sd.SiderData.MenuGroup!=null && sd.SiderData.MenuGroup.length > 0">
                    <template v-for="(itemGroup,index) in sd.SiderData.MenuGroup">
                        <div v-bind:id="'profile'+index" v-bind:class="index==0? 'tab-pane active':'tab-pane'">
                            <template v-for="item in sd.SiderData.Menu">
                                <div class="m-group-item">
                                    <span>{{$t(this.p_context.SubApplication+'[\'MG'+item.MenuId+'\']')}}</span>
                                    <ul class="m-sub-menu clearfix" style="background-color: white;margin:5px">

                                        <template v-for="subitem in item.childList">
                                            <li class="vue-menu" v-bind:id="subitem.MenuId">
                                                <a v-bind:href="(subitem.NavigateUrl ==null || subitem.NavigateUrl =='')?'':('/#/'+p_context.SubApplication + subitem.NavigateUrl) + (subitem.NavigateUrl.indexOf('?')==-1?'?':'&') +'mid=' + subitem.MenuId">
                                                <span class="m-sub-item clearfix" v-bind:style="'background-color:'+randomColor()">
                                                    <i class="fa fa-table"></i>
                                                </span>
                                                    <label class="m-sub-text"> {{$t(this.p_context.SubApplication+'[\'M'+subitem.MenuId+'\']',subitem.FullName)}} </label>
                                                </a>
                                            </li>
                                        </template>
                                    </ul>
                                </div>

                            </template>

                        </div>
                    </template>
                </template>
                <!--未配置三级菜单-->
                <template v-else>

                        <template v-for="(item,index) in sd.SiderData.Menu">
                            <div v-bind:id="'profile'+index" v-bind:class="index==0? 'tab-pane active':'tab-pane'">
                                <ul class="m-sub-menu">
                                    <template v-for="subitem in item.childList">
                                        <li class="vue-menu" v-bind:id="subitem.MenuId">
                                            <a v-bind:href="(subitem.NavigateUrl ==null || subitem.NavigateUrl =='')?'':('/#/'+p_context.SubApplication + subitem.NavigateUrl) + (subitem.NavigateUrl.indexOf('?')==-1?'?':'&') +'mid=' + subitem.MenuId">
                                                <span class="m-sub-item clearfix" v-bind:style="'background-color:'+randomColor()">
                                                    <i class="fa fa-table"></i>
                                                </span>
                                                <label class="m-sub-text"> {{$t(this.p_context.SubApplication+'[\'M'+subitem.MenuId+'\']',subitem.FullName)}} </label>
                                            </a>
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </template>


                </template>



            </div>
        </div>

        <div class="row visible-pc" id="TeldIndex">
            <div class="col-lg-12 col-sm-12 col-xs-12" id="wyqcd" style="height:100%">
                <div id="wyqimg" class="row" style=" text-align: center;vertical-align: middle;">

                    <!--style="display: inline-block;height: auto;max-width: 100%;"-->
                    <template v-if="sd.saasInfo">

                        <img id="img" src="" style="display: inline-block;height: auto;max-width: 100%;"/>
                    </template>
                    <template v-else>
                        <img id="img" src="" />
                    </template>
                </div>
            </div>
        </div>


    </div>
</template>
<style>


    /*@media all and (max-width: 1024px){*/
        /*.visible-mobile {*/
            /*display: block;*/
        /*}*/
        /*.visible-pc {*/
            /*display: none;*/
        /*}*/
    /*}*/

    /*@media all and (min-width: 1024px){*/
        /*.visible-mobile {*/
            /*display: none;*/
        /*}*/
        /*.visible-pc {*/
            /*display: block;*/
        /*}*/
    /*}*/


    @media all and (max-width: 1024px) {
        .nav-tabs{
            background-color: white;
        }
        .tab-content{
            background-color: #F3F3F3;
            padding: 0;
        }
        .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover{
            background-color: #F3F3F3;
        }
        .m-menu-tab li{
            height: 60px;
            max-width: 115px;
        }
        .m-menu-tab li a{
            height: 60px;
            padding-top: 20px;
            padding-bottom: 20px;
            font-size: 14px;
            color:black;
        }


        .vue-menu a{
            text-decoration: none;
        }
        #TeldIndex .nav-tabs>li{
            width :100% !important;
        }

        .m-sub-menu {
            list-style: none;
            padding: 0;
        }
        .m-sub-menu li {
            height: 104px;
            width:85px;
            float:left;
            margin-top: 20px;
        }
        .m-sub-menu li a{
            height: 104px;
            width:85px;
            display: inline-block;
            text-align: center;
        }
        .m-sub-menu li a span i{
            color: white;
            width: 37px;
            height: 37px;
            font-size: 28px;
            line-height: 37px;
            display: inline-block;
        }

        .m-sub-item{
            font-size: 12px;
            color: #383838;
            height: 37px;
            line-height: 37px;
            display: inline-block;
            border-radius: 11px;
            background: red;
        }
        .m-sub-text{
            font-size: 12px;
            margin-top: 15px;
            height: 30px;
            color:#383838;
            max-width: 80px;
            min-width: 60px;
        }

        .m-sub-menu li.active .m-sub-text{
            color: #00a7cb!important;
            font-weight: bold;
        }

        .m-group-item{
            margin: 10px 0;
            float:left;
            width: 100%;

        }
        .m-group-item > span{
            display: block;
            font-size: 12px;
            font-weight: bold;
            color:#212121;
            margin-left: 12px;
        }


    }



</style>
<script>
    import WRPCommon from '../../js/WRPCommon'
    export default{
        data:function () {

            var ret = {
                navarData:Object.assign({},this.$store.state.navarData),
                favoriteData:[],
                sd:Object.assign({},this.$store.state.SiderData),
                lastRandom:-1
            };

            return ret;
        },
        watch: {
            "$store.state.SiderData":function(newData,oldData) {
                this.sd = Object.assign({},this.$store.state.SiderData);
            }
        },
        mounted:function(){
            var that = this;


            if (isPC()) {
                $(".visible-mobile").hide();
                $(".visible-pc").show();

                var resizeMain = function (init) {

                    if (window.SiderData.saasInfo && window.SiderData.saasInfo.hasOwnProperty("DefaultPageIconAddr")){
                        $('#img').attr('src', window.SiderData.saasInfo.DefaultPageIconAddr);
                    }else{
                        var chromeHeight = document.documentElement.clientHeight || document.body.clientHeight
                        var h = chromeHeight - $(".navbar").height() - $(".page-header").height() - 22;
                        if (!init) {
                            h = h + 100;
                        }
                        var th = h / 2 - 251.5;
                        $("#wyqcd").height(h);
                        if(window.domain != ".teld.org") $("#wyqimg").css("margin-top", th);
                        else $("#img").css("width", "98%");
                        $('#img').attr('src',window.ResourcePath + '/platform/teld/img/teld.png');
                    }

                }
                resizeMain(true);
                $(".page-body").css("background-color","white");

                //如果默认菜单存在
                if(window.defaultRouter){
                    $("a[href='"+window.defaultRouter+"']").eq(0).click();
                }


            }else{

                $(".visible-mobile").show();
                $(".visible-pc").hide();

                if(this.$route.query && this.$route.query.hasOwnProperty("_b")){
                    $('.vue-menu').click(function(event){
                        event.preventDefault();
                        //if(!isPC())return;
                        var $a = $(this).find('a');
                        $(".sidebar-menu").find(".submenu > li").each(function () {
                            $(this).removeClass("active");
                        });
                        $(this).addClass("active");

                        var url = $a.attr("href").replace("/#","");

                        var menuText = $a.find("span").eq(0).text();
                        var appendHtml = '<small><i class="fa fa-angle-right"></i>' + menuText + '</small>';
                        $("#breadcrumbs").find("small").remove();
                        $("#breadcrumbs").append(appendHtml);

                        rememberMid(url);
                        saveCondition(that,null);
                        that.$router.push(url);

                    });
                    window.resetSelectedMenu()
                }

                $(".navbar").show();
                $("#sidebar").hide();
                $("#page-header").addClass("hide")


                $(".page-header-fixed").removeClass("top0");
                $("#page-body").removeClass("margintop0");

                $(".tab-content").height(window.screen.availHeight-50);
                $("#main-container").css("margin-top",0)
                $(".page-body").css("padding",0)

                if (!isPC()) {
                    if($("#page-body").css("margin-top") == "0px" || $(".page-body").css("margin-top") == 0)
                        $("#TeldIndex").css("margin-top",42)
                    else
                        $("#TeldIndex").css("margin-top",0)
                }


                var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
                $(window).on(resizeEvt,function () {
                    if (!isPC()) {
                        if($(".page-body").css("margin-top") == "0px" || $(".page-body").css("margin-top") == 0)
                            $("#TeldIndex").css("margin-top",42)
                        else
                            $("#TeldIndex").css("margin-top",0)
                    }
                })

            }

            //设置记忆菜单
            var menuId = readCookie(getMobileMenuCookieKey());
            var groupId = readCookie(getMenuGroupCookieKey());

            if(!menuId && !groupId){

                //if(window.isMenuGroup)
                $("#TeldIndex .menu-group").eq(0).click()
                //else
                $("#TeldIndex .m-menu").eq(0).click()
                return
            }
            if(window.isMenuGroup && groupId){
                $("#TeldIndex #"+groupId).click()
            }

            if(!window.isMenuGroup && menuId){
                $("#TeldIndex #"+menuId).click()
            }


        },
        methods:{
            rememberMobileMenu:function (menuid) {
                createCookie(getMobileMenuCookieKey(),menuid)
            },
            getSysName:function (url) {
                var appName = url.replace("http://","").replace("https://","").split(".")[0]
                return appName;
            },
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
            fadelete:function (id) {
                var that = this;
                getDataAsync(window.FrameHost+"/Spa/delFavoriteInfo", "get", { "id": id }, function (result) {
                    if (result.state == "1") {
                        that.favoriteData = result.data.rows;
                        that.$nextTick(function () {
                            $(".favoritor-body").find("li").each(function () {
                                $(this).hover(function () {
                                    $(this).find(".f-remove").removeClass("hide")
                                },function () {
                                    $(this).find(".f-remove").addClass("hide")
                                });
                            })
                        })

                        NotifySuccess("取消收藏成功！");

                    } else {
                        NotifyError(result.errmsg);
                        return;
                    }
                });
            },
            faload:function () {
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

                        NotifySuccess("取消收藏成功！");

                    } else {
                        NotifyError(result.errmsg);
                        return;
                    }
                });
            },
            jump:function (url) {
                var appName = this.getSysName(url)
                window.location.href="//"+ window.location.host +"/#/"+appName
                window.location.reload()
            },
            changeMenu:function (groupid) {

                var that = this;

                //saas系统时，默认的key为saas
                var appkey = this.p_context.SubApplication
                if(window.saasInfo && window.getApplicationId(appkey) == -1){
                    appkey = "saas"
                }

                var appid = this.p_context.isPlatformIndex?window.ApplicationID:window.getApplicationId(appkey)

                eraseCookie(getMobileMenuCookieKey())
                createCookie(getMenuGroupCookieKey(), groupid);
                //var ret;


                getDataSync(FrameSGHost+"WRPFrame-GetPageSidebarPartial&applicationId="+appid+"&groupId="+groupid, "get", {}, function (psp) {
                    if (psp.hasOwnProperty("ErrorInfo")==false) {
                        //that.sd.Menu = psp.data.Menu;
                        window.SiderData.SiderData.Menu = psp.data.Menu
                        var thizz = Object.assign({},window.SiderData)
                        //thizz.Menu = psp.data.Menu;
                        that.$store.dispatch("updateSiderData",thizz)

                    } else {
                        NotifyError(psp.ErrorInfo);

                    }
                });


                this.$nextTick(function () {
                    $('.vue-menu').click(function(event){
                        event.preventDefault();
                        //if(!isPC())return;
                        var $a = $(this).find('a');
                        $(".sidebar-menu").find(".submenu > li").each(function () {
                            $(this).removeClass("active");
                        });
                        $(this).addClass("active");

                        var url = $a.attr("href");

                        var menuText = $a.find("span").eq(0).text();
                        var appendHtml = '<small><i class="fa fa-angle-right"></i>' + menuText + '</small>';
                        $("#breadcrumbs").find("small").remove();
                        $("#breadcrumbs").append(appendHtml);
                        rememberMid(url);

                        saveCondition(that,null);
                        //loadShareJs();
                        that.$router.push(url);

                    });
//                    $(".sidebar-menu").find("li").removeClass("active")
//                    $(".sidebar-menu").find("li").eq(0).addClass("open")
//                    if(isPC())
//                        $(".sidebar-menu").find(".vue-menu").eq(0).click()
                });
            }
        }
    }
</script>