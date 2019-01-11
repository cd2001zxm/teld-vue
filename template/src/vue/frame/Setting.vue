<template>
  <div>
    <div class="tabbable hidden-xs">
        <ul class="nav nav-tabs">
            <li class="">
                <a data-toggle="tab" id="passwordmenu" href="#inner-menu-content1" v-on:click="">
                    密码设置
                </a>
            </li>

            <!--<li class="">-->
                <!--<a data-toggle="tab" id="commonsetmenu" href="#inner-menu-content2" onclick="$.pjax({ url: '/Frame/UserCommonSettingMgr', container: '#inner-menu-content2', push: false, showLoading: false }); createCookie('settingtabindex', 'commonsetmenu', 10);">-->
                    <!--常用设置-->
                <!--</a>-->
            <!--</li>-->

            <li class="">
                <a data-toggle="tab" id="usermenu" href="#inner-menu-content3" v-on:click="userInfoMgr">
                    用户信息
                </a>
            </li>
        </ul>

        <div class="tab-content">
            <div id="inner-menu-content1" class="tab-pane">
                <SetPassword></SetPassword>
            </div>

            <div id="inner-menu-content2" class="tab-pane">

            </div>

            <div id="inner-menu-content3" class="tab-pane">
                <UserInfo></UserInfo>
            </div>
        </div>
    </div>

    <div class="tabbable tabs-left hidden-lg hidden-md hidden-sm">
        <ul id="mobileSettingUl" class="nav nav-tabs" style="width:100%!important">
            <li class="" style="width: 100% !important; box-shadow: 0 0 2px rgba(0,0,0,.3); line-height: 42px;">
                <a data-toggle="tab" id="passwordmenu" href="#inner-menu-content1-Mobile" v-on:click="updatePasswordMobile" style="font-size: 16px; ">
                    密码设置
                    <i class="fa  fa-angle-right" style="position: absolute;right:12px"></i>
                </a>

            </li>

            <!--<li class="" style="width:100% ! important; box-shadow: 0 0 2x  rba(0,0,0,.3); line-height: 42px;">-->
                <!--<a data-toggle="tab" id="commonsetmenu" href="#inner-menu-content2" onclick="$.pjax({ url: '/Frame/UserCommonSettingMgr?', container: '#inner-menu-content2', push: false }); createCookie('settingtabindex', 'commonsetmenu', 10);" style="font-size: 16px;">-->
                    <!--常用设置-->
                    <!--<i class="fa  fa-angle-right" style="position: absolute;right:12px"></i>-->
                <!--</a>-->
            <!--</li>-->

            <li class="" style="width: 100% !important; box-shadow: 0 0 2px rgba(0,0,0,.3); line-height: 42px;">
                <a data-toggle="tab" id="usermenu" href="#inner-menu-content3-Mobile" v-on:click="userInfoMgrMobile" style="font-size: 16px;">
                    用户信息
                    <i class="fa  fa-angle-right" style="position: absolute;right:12px"></i>
                </a>
            </li>
        </ul>

        <div class="tab-content">
            <div id="inner-menu-content1-Mobile" class="tab-pane">
                <SetPassword></SetPassword>
            </div>

            <!--<div id="inner-menu-content2" class="tab-pane">-->

            <!--</div>-->

            <div id="inner-menu-content3-Mobile" class="tab-pane">
                <UserInfo></UserInfo>
            </div>
        </div>
    </div>

  </div>
</template>
<style>
     .inner-menu {
        bottom: 0;
        /*width: 224px;*/
        display: block;
        margin-right: -15px;
        display: inline-block;

    }

    .inner-menu li a {
        border-top: 1px solid #f3f3f3;
        border-left: 1px solid #f3f3f3;
        border-right: 1px solid #f3f3f3;
        /*background: white;*/
        color: #262626;
    }

    .inner-menu .menu-expand {
        display: inline-block;
        position: absolute;
        font-size: 13px;
        line-height: 10px;
        height: 10px;
        width: 10px;
        right: 12px;
        top: 15px;
        margin: 0;
        text-align: center;
        padding: 0;
        -webkit-text-shadow: none;
        text-shadow: none;
        color: #666;
        -webkit-transition: all 300ms ease-in-out;
        -moz-transition: all 300ms ease-in-out;
        -o-transition: all 300ms ease-in-out;
        transition: all 300ms ease-in-out;
        font-family: FontAwesome;
        font-style: normal;
        font-weight: 400;
    }

    .inner-menu-content {
        border: 1px solid #f3f3f3;
        display: block;
        min-height: 100%;
        padding: 0;
        background: white;
        border-left:none;
    }
</style>
<script>
    import SetPassword from './SetPassword.vue'
    import UserInfo from './UserInfo.vue'

    var cookieKey = location.host.split(".")[0]+"_settingtabindex";

    export default{
        data(){
            setPageName("设置");
            return{
            }
        },
        mounted(){
            $("#page-header").addClass("hide")
            $("#page-body").css("margin-top",0)
            if (isPC()) {

                var showEvent = $.Event('click.bs.tab.data-api');
                setTimeout(function () {
                    var index = readCookie(cookieKey);
                    if (!index || index == "") { index = "passwordmenu"; }
                    $("#" + index).trigger(showEvent);
                    createCookie(cookieKey, index, 10);
                }, 200);
            }
        },
        methods:{
            updatePasswordMobile:function(){
                $("#mobileSettingUl").css("display","none");
                $("#breadcrumbsForMobie").css("display", "none");
                $("#breadcrumbsForSetting").css("display", "inline-block");
            },
            userInfoMgrMobile:function(){
                $("#mobileSettingUl").css("display","none");
                $("#breadcrumbsForMobie").css("display", "none");
                $("#breadcrumbsForSetting").css("display", "inline-block");
                createCookie(cookieKey, 'usermenu', 10);
            },
            userInfoMgr:function(){
                createCookie(cookieKey, 'usermenu', 10);
            }
        },
        components:{
            'SetPassword':SetPassword,
            'UserInfo':UserInfo
        }
    }
</script>
