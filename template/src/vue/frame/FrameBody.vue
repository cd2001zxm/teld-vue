<template>
    <div>
        <Navbar v-bind:HasAuth="HasAuth" v-on:subMenuChange="subMenuChange" v-bind:SiderData="this" v-bind:saasInfo="saasInfo"></Navbar>
        <div class="main-container container-fluid" id="main-container">
            <div class="page-container" id="page-container">
                <template v-if="HasAuth && MenuType==0">
                    <div class="page-sidebar sidebar-fixed" id="sidebar">
                        <ul class="nav sidebar-menu">
                            <template v-if="(SiderData.MenuGroupList==null || SiderData.MenuGroupList.length==0)">
                                <template v-for="item in SiderData.Menu">
                                    <li class="" v-bind:id="item.MenuId" v-bind:title="item.Description">
                                    <a href="javascript:void(0)" class="menu-dropdown ">
                                        <i class="menu-icon fa fa-table"></i>
                                        <span class="menu-text"> {{$t(this.p_context.SubApplication+'[\'MG'+item.MenuId+'\']',item.FullName)}} </span>
                                        <i class="menu-expand"></i>
                                    </a>

                                    <ul class="submenu">
                                        <template v-for="subitem in item.childList">
                                            <li class="vue-menu" v-bind:id="subitem.MenuId" v-bind:title="subitem.Description">
                                                <a href="javascript:void(0);" v-bind:data-url="(subitem.NavigateUrl ==null || subitem.NavigateUrl =='')?'':(SubApplication + subitem.NavigateUrl) + (subitem.NavigateUrl.indexOf('?')==-1?'?':'&') +'mid=' + subitem.MenuId">
                                                    <span class="menu-text"> {{$t(this.p_context.SubApplication+'[\'M'+subitem.MenuId+'\']',subitem.FullName)}} </span>
                                                    <!--{{subitem.FullName}}-->
                                                </a>
                                            </li>
                                        </template>

                                    </ul>
                                </li>
                                </template>
                            </template>
                            <template v-else>
                                <template v-for="item in SiderData.MenuGroup">
                                    <li class="" v-bind:id="item.MenuId" v-bind:title="item.Description">
                                        <a href="javascript:void(0)" class="menu-dropdown ">
                                            <i class="menu-icon fa fa-table"></i>
                                            <span class="menu-text"> {{$t(this.p_context.SubApplication+'[\'MG'+item.MenuId+'\']',item.FullName)}} </span>
                                            <i class="menu-expand"></i>
                                        </a>

                                        <ul class="submenu">
                                            <template v-for="subitem in item.childList">
                                                <li class="vue-menu" v-bind:id="subitem.MenuId" v-bind:title="subitem.Description">
                                                    <a href="javascript:void(0);" v-bind:data-url="(subitem.NavigateUrl ==null || subitem.NavigateUrl =='')?'': (SubApplication+subitem.NavigateUrl) + (subitem.NavigateUrl.indexOf('?')==-1?'?':'&') +'mid=' + subitem.MenuId">
                                                        <span class="menu-text"> {{$t(this.p_context.SubApplication+'[\'M'+subitem.MenuId+'\']',subitem.FullName)}} </span>
                                                    </a>
                                                </li>
                                            </template>

                                        </ul>
                                    </li>
                                </template>
                            </template>


                        </ul>
                    </div>
                </template>
                <div id="page-content" class="page-content" v-bind:style="pageContentClass">
                    <template v-if="HasAuth && ShowPageHeader==1">
                        <div id="page-header" v-bind:style="pageHeaderClass" class="page-header position-relative page-header-fixed" >
                            <!--@contextmenu="showMenu">-->
                            <!-- 面包屑导航 -->
                            <div id="page-breadcrumbs" class="page-breadcrumbs">
                                <!-- 面包屑导航 -->
                                <div class="header-title visible-lg">
                                    <h1 style="margin-left:12px" id="breadcrumbs">
                                        <a class="hidden-xs" href="javascript:void(0)" v-bind:title="$t('localeMsg.WRPHomePageTitle')" style="color: #737373;" v-on:click="toIndexPage">
                                            <i class="fa fa-home" style="font-size:20px"></i>{{$t("localeMsg.WRPHomePage")}}
                                        </a>


                                    </h1>
                                </div>
                                <div class="header-title visible-xs visible-sm visible-md" style="width:100%;padding-left:5px;padding-right:5px;z-index:2">
                                    <h1 style="width:33%;" id="breadcrumbsForMobie">
                                        <a href="javascript:void(0)" v-bind:title="$t('localeMsg.WRPHomePageTitle')" style="color: #737373;text-decoration:none;" v-on:click="backOnMobile">
                                            <i class="fa fa-angle-left" style="font-size:32px;vertical-align:middle;line-height:42px;">
                                                <!--<span style="font-size: 12px">返回</span>-->
                                            </i>
                                            <span style="vertical-align:middle;line-height:42px;font-size:16px;padding-left:1px;"></span>
                                        </a>


                                    </h1>
                                    <h1 style="width:33%;display:none" id="breadcrumbsForSetting">
                                        <a href="javascript:void(0)" v-bind:title="$t('localeMsg.WRPHomePageTitle')" style="color: #737373;text-decoration:none;" v-on:click="backSetting">
                                            <i class="fa fa-angle-left" style="font-size:32px;vertical-align:middle;line-height:42px;"></i>
                                            <span style="vertical-align:middle;line-height:42px;font-size:16px;padding-left:1px;"></span>
                                        </a>


                                    </h1>

                                </div>
                                <h1 id="mobilePageName" class="visible-xs visible-sm visible-md" style="line-height: 42px;vertical-align:middle;width:100%;text-align:center;margin:0;
                                position: absolute;top:0;left:0;font-size:15px;height:50px;">
                                    {{this.$route.name}}
                                </h1>
                            </div>
                            <!-- /面包屑导航 -->
                            <div class="header-buttons">

                                <a class="sidebar-toggler hidden-xs" href="javascript:void(0)" v-bind:title="$t('localeMsg.HiddenLeftBar')" v-if="MenuType==0">
                                    <i class="glyphicon glyphicon-resize-horizontal"></i>
                                </a>
                                <a class="refresh hidden-xs " id="refresh-toggler" href="javascript:void(0)" v-on:click="refresh" v-bind:title="$t('localeMsg.Refresh')">
                                    <i class="glyphicon glyphicon-refresh"></i>
                                </a>
                                <a class="refresh hidden-lg hidden-md hidden-sm" id="refresh-toggler" href="javascript:void(0)" onclick="window.location.reload();" v-bind:title="$t('localeMsg.Refresh')">
                                    <i class="glyphicon glyphicon-refresh"></i>
                                </a>
                                <a class="fullscreen hidden-xs" id="fullscreen-toggler" href="javascript:void(0)" v-bind:title="$t('localeMsg.FullScreen')">
                                    <i class="glyphicon glyphicon-fullscreen"></i>
                                </a>
                                <a id="favorite-toggler" href="javascript:void(0)" v-bind:title="$t('localeMsg.WrpFavorateTitle')">
                                    <i class="glyphicon glyphicon-star-empty"></i>
                                </a>
                                <a id="recording" class="hidden-xs hide" href="javascript:void(0)">
                                    <div class="recording"></div>
                                    <i class="fa fa-video-camera"></i>
                                </a>
                                <a class="hidden-xs active" id="online-helper" href="javascript:void(0)" v-bind:title="$t('localeMsg.WRPOnlineHelper')" >
                                    <i class="fa fa-question-circle-o"></i>
                                </a>
                            </div>
                            <!--<vue-context-menu :contextMenuData="contextMenuData"-->
                                              <!--@traceJump="traceJump">-->
                            <!--</vue-context-menu>-->
                        </div>
                    </template>
                    <template v-else>
                        <div class="page-header hide"></div>
                    </template>
                    <div class="page-body margintop0" v-bind:style="pageBodyClass" id="page-body" >
                        <router-view></router-view>

                    </div>


                </div>
            </div>
        </div>
        <div class="modal fade in" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="false" id="frame_settiong">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h6 class="modal-title">{{$t("localeMsg.WrpLinkSetting")}}</h6>
                    </div>
                    <div class="modal-body">
                        <div class="tabbable">
                            <ul class="nav nav-tabs">
                                <li class="active">
                                    <a data-toggle="tab" id="usermenu" href="#inner-menu-content3">
                                        {{$t("localeMsg.WrpProfile")}}
                                    </a>
                                </li>

                                <li class="">
                                    <a data-toggle="tab" id="passwordmenu" href="#inner-menu-content1">
                                        {{$t("localeMsg.WrpPassword")}}
                                    </a>
                                </li>

                                <li class="">
                                    <a data-toggle="tab" id="avatarmenu" href="#inner-menu-content2">
                                        {{$t("localeMsg.WrpAvatarSetting")}}
                                    </a>
                                </li>
                                <li class="">
                                    <a data-toggle="tab" id="accoutBind" href="#inner-menu-content5">
                                        {{$t("localeMsg.WRPAccoutBind")}}
                                    </a>
                                </li>
                                <li class="">
                                    <a data-toggle="tab" id="LanguageSetting" href="#inner-menu-content4">
                                        {{$t("localeMsg.WRPSystemSetting")}}
                                    </a>
                                </li>
                                <li class="">
                                    <a id="WRPAccessLog" data-toggle="tab" href="#inner-menu-content6">
                                        {{$t("localeMsg.WRPAccessLog")}}
                                    </a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div id="inner-menu-content3" class="tab-pane active">
                                    <div class="row">
                                        <div class="col-lg-12 col-sm-12 col-xs-12">
                                            <form class="form-horizontal frame-form" id="profileForm">
                                                <div class="tabbable tabs-top">
                                                    <div>

                                                        <div id="sta1" class="tab-pane in active">

                                                            <div class="well widget-body">
                                                                <!--<div class="row" id="SingleCardTitle1">-->
                                                                    <!--<div class="col-lg-12 col-sm-12 col-xs-12" style="padding-left:2px;" id="AccountView1">-->
                                                                        <!--<h5 class="row-title before-color" style="padding-left:2px;"><i class="fa fa-file-text iconcolor"></i>{{$t("localeMsg.WrpProfile")}}</h5>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                                <div id="baseInfo1" class="row">
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.Avatar")}}</label>
                                                                                <div class="col-sm-8 avatar-v">
                                                                                    <img v-bind:src="userData.Avatar" width="150px" height="150px" crossorigin="anonymous"/>
                                                                                    <!--<span class="user-img-title"><strong>点击修改头像</strong></span>-->
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.DisplayName")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="text" maxlength="36"
                                                                                           class="form-control v-change" id="Alias" name="Alias" v-model="userData.Alias"/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label for="" class="col-sm-4 control-label ">{{$t("localeMsg.Name")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="text" maxlength="36"
                                                                                           class="form-control" id="RealName" name="RealName" readonly='readonly' v-model="userData.RealName" />
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.Sex")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="text" maxlength="36"
                                                                                           class="form-control" id="Gender" name="Gender" readonly='readonly' v-model="userData.Gender" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">

                                                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                                                            <div class="form-group">

                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.Birthday")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <div class="input-group input-append date datapick" id="wrpUserBirthday">
                                                                                        <input class="form-control v-change" id="Birthday" name="Birthday" type="text" data-date-format="yyyy-mm-dd"
                                                                                               data-bv-regexp="true"
                                                                                               data-bv-regexp-regexp="^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$"
                                                                                               data-bv-regexp-message="请输入有效出生日期,例：1999-09-09" v-model="userData.Birthday"/>
                                                                                        <span class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </span>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.Mobile")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="text" maxlength="36"
                                                                                           class="form-control" id="Mobile" name="Mobile" readonly='readonly' v-model="userData.Mobile" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.Email")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="text" maxlength="36"
                                                                                           class="form-control" id="Email" name="Email" readonly='readonly' v-model="userData.Email" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.Company")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="text" maxlength="36"
                                                                                           class="form-control" id="CompanyName" name="CompanyName" readonly='readonly' v-bind:value="userData.CompanyName" />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.Department")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="text" maxlength="36"
                                                                                           class="form-control" id="DepartmentName" name="DepartmentName" readonly='readonly' v-bind:value="userData.DepartmentName" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.Title")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="text" maxlength="36"
                                                                                           class="form-control" id="TitleName" name="TitleName" readonly='readonly' v-bind:value="userData.TitleName" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <!--<div class="row col-lg-12 col-sm-12 col-xs-12">-->
                                                                        <!--<div class="col-lg-4 col-sm-4 col-xs-12">-->
                                                                            <!--<div class="form-group">-->
                                                                                <!--<label class="col-sm-4 control-label ">固话</label>-->
                                                                                <!--<div class="col-sm-8">-->
                                                                                    <!--<input type="text" maxlength="36"-->
                                                                                           <!--class="form-control" id="Telephone" name="Telephone" readonly='readonly' v-bind:value="userData.Telephone" />-->
                                                                                <!--</div>-->
                                                                            <!--</div>-->
                                                                        <!--</div>-->

                                                                        <!--<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">-->
                                                                            <!--<div class="form-group">-->
                                                                                <!--<label class="col-sm-4 control-label ">QQ</label>-->
                                                                                <!--<div class="col-sm-8">-->
                                                                                    <!--<input type="text" maxlength="36"-->
                                                                                           <!--class="form-control v-change" id="OICQ" name="OICQ"  v-model="userData.OICQ" />-->
                                                                                <!--</div>-->
                                                                            <!--</div>-->
                                                                        <!--</div>-->
                                                                        <!--<div class="col-lg-4 col-sm-4 col-xs-12">-->
                                                                            <!--<div class="form-group">-->
                                                                                <!--<label class="col-sm-4 control-label ">微信</label>-->
                                                                                <!--<div class="col-sm-8">-->
                                                                                    <!--<input type="text" maxlength="36"-->
                                                                                           <!--class="form-control v-change" id="OpenId" name="OpenId" v-model="userData.OpenId" />-->
                                                                                <!--</div>-->
                                                                            <!--</div>-->
                                                                        <!--</div>-->
                                                                    <!--</div>-->
                                                                </div>
                                                            </div>

                                                            <div class="well widget-body text-right" name="ButtonGroup">
                                                                <button type="button" class="btn btn-primary " name="btnSave1" v-on:click="save" data-loading-text="正在保存..." click-text="正在保存..."><i class="fa fa-save "></i>{{$t("localeMsg.SaveBtn")}}</button>
                                                                <!--<button type="button" class="btn" name="undoAvatar" v-on:click.stop="undoAvatar" ><i class="fa fa-undo "></i>撤销头像</button>-->
                                                                <button type="submit" class="btn btn-default " data-dismiss="modal"><i class="glyphicon glyphicon-remove"></i>{{$t("localeMsg.CancelBtn")}}</button>
                                                            </div>
                                                        </div>
                                                        <!-- /Page Station Info  -->
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div id="inner-menu-content1" class="tab-pane ">
                                    <div class="row" style="margin-right:0;">
                                        <div class="col-lg-12 col-sm-12 col-xs-12">
                                            <form class="form-horizontal frame-form" id="frame_pwd_form">
                                                <input type="hidden" id="encryption" value="">
                                                <input type="hidden" id="modulus" value="">
                                                <input type="hidden" id="ReqID" value="">
                                                <div class="tabbable tabs-top">
                                                    <div>
                                                        <div id="sta" class="tab-pane in active">

                                                            <!-- 账户总览  -->
                                                            <div class="well widget-body">
                                                                <!--<div class="row" id="SingleCardTitle">-->
                                                                    <!--<div class="col-lg-12 col-sm-12 col-xs-12" style="padding-left:2px;" id="AccountView">-->
                                                                        <!--<h5 class="row-title before-color" style="padding-left:2px;"><i class="fa fa-file-text iconcolor"></i>{{$t("localeMsg.WrpPassword")}}</h5>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                                <div id="baseInfo" class="row">
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                        <div class="col-lg-2 col-sm-2 col-xs-12">
                                                                        </div>
                                                                        <div class="col-lg-10 col-sm-10 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="control-label " style="color: #999">{{$t("localeMsg.PasswordStrongMessage")}}</label>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                        <div class="col-lg-2 col-sm-2 col-xs-12">
                                                                        </div>
                                                                        <div class="col-lg-6 col-sm-6 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.OldPassword")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="password" data-bv-notempty="true" maxlength="20"
                                                                                           class="form-control" id="oldPass" name="oldPass" data-bv-notempty-message-id="wrp-errmsg-0001"
                                                                                           data-bv-notempty-message="请输入当前密码" autocomplete="off" value=""/>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                        <div class="col-lg-2 col-sm-2 col-xs-12">
                                                                        </div>
                                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.NewPassword")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <div class="pw-strength">
                                                                                        <div class="pw-strength__bar pw-strength__bar" id="J-pw-strength__bar"></div>
                                                                                        <div class="pw-strength__letter">
                                                                                            <span class="pw-strength__label">{{$t("localeMsg.Weak")}}</span>
                                                                                            <span class="pw-strength__label">{{$t("localeMsg.Normal")}}</span>
                                                                                            <span class="pw-strength__label pw-strength__label--noborder">{{$t("localeMsg.Strong")}}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <input type="password" data-bv-notempty="true" maxlength="20" autocomplete="off"
                                                                                           class="form-control" id="newPassOne" name="newPassOne"
                                                                                           data-bv-notempty-message="请输入新密码"
                                                                                           data-bv-notempty-message-id="wrp-errmsg-0002"
                                                                                           data-bv-stringlength="true"
                                                                                           data-bv-stringlength-min="8"
                                                                                           data-bv-stringlength-max="20"
                                                                                           data-bv-stringlength-message="密码长度最少为8位,最多20位" value="" data-bv-stringlength-message-id="wrp-errmsg-0004"/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12" style="top:25px">
                                                                        <div class="col-lg-2 col-sm-2 col-xs-12">
                                                                        </div>
                                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.ConfirmNewPassword")}}</label>
                                                                                <div class="col-sm-8">
                                                                                    <input type="password" data-bv-notempty="true" maxlength="20"
                                                                                           class="form-control" id="newPassTwo" name="newPassTwo"
                                                                                           data-bv-notempty-message="请输入确认密码"
                                                                                           data-bv-notempty-message-id="wrp-errmsg-0003"
                                                                                           data-bv-stringlength="true"
                                                                                           data-bv-stringlength-min="8"
                                                                                           data-bv-stringlength-max="20"
                                                                                           data-bv-stringlength-message="密码长度最少为8位，最多20位"
                                                                                           data-bv-stringlength-message-id="wrp-errmsg-0004"
                                                                                           autocomplete="off" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                        <div class="col-lg-2 col-sm-2 col-xs-12">
                                                                        </div>
                                                                        <div class="col-lg-10 col-sm-10 col-xs-12">
                                                                            <div class="form-group text-right">
                                                                                <a class="control-label " style="color: #999;cursor: pointer" onclick="var opener = window.open(window.UserCenterUrl+'/newgetpass','_blank');opener=null">{{$t("localeMsg.ForgotPasswordLink")}}</a>
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div class="well widget-body text-right" name="ButtonGroup">
                                                                <button type="button" class="btn btn-primary " name="btnSave2" v-on:click="check" data-loading-text="正在保存..." click-text="正在保存..."><i class="fa fa-save "></i>{{$t("localeMsg.SaveBtn")}}</button>
                                                                <button type="submit" class="btn btn-default " data-dismiss="modal"><i class="glyphicon glyphicon-remove"></i>{{$t("localeMsg.CancelBtn")}}</button>
                                                            </div>
                                                        </div>
                                                        <!-- /Page Station Info  -->
                                                    </div>
                                                </div>
                                            </form>

                                        </div>

                                    </div>
                                </div>
                                <div id="inner-menu-content2" class="tab-pane">
                                    <div class="row">
                                        <div class="col-lg-12 col-sm-12 col-xs-12" id="crop-avatar">
                                            <form class="form-horizontal avatar-form frame-form" enctype="multipart/form-data" method="post" v-bind:action="action">
                                                <div class="tabbable tabs-top">
                                                    <div>
                                                        <div id="sta" class="tab-pane in active">
                                                            <input type="hidden" id="oldAvatar" value="" />
                                                            <div class="well widget-body">

                                                                <div id="baseInfo" class="row">
                                                                    <div class="avatar-body">
                                                                        <!--<div class="row">-->
                                                                            <!--<div class="col-lg-12 col-sm-12 col-xs-12">-->
                                                                                <!--<label style="font-weight:600">请选择本地的图片，支持JPG、GIF、PNG、BMP格式，文件小于2M。</label>-->
                                                                            <!--</div>-->
                                                                        <!--</div>-->
                                                                        <!--&lt;!&ndash; Upload image and data &ndash;&gt;-->
                                                                        <!--<div class="avatar-upload row" style="padding-top:10px;">-->
                                                                            <!--<div class="col-lg-12 col-sm-12 col-xs-12">-->
                                                                                <!--<input type="hidden" class="avatar-src" name="avatar_src">-->
                                                                                <!--<input type="hidden" class="avatar-data" name="avatar_data">-->
                                                                                <!--<input type="file" class="avatar-input " id="avatarInput" name="avatar_file">-->
                                                                            <!--</div>-->
                                                                        <!--</div>-->
                                                                        <input type="hidden" class="avatar-src" name="avatar_src">
                                                                        <input type="hidden" class="avatar-data" name="avatar_data">

                                                                        <!-- Crop and preview -->
                                                                        <div class="row">
                                                                            <div class="col-md-9">
                                                                                <div class="">{{$t("localeMsg.LocalUpload")}}</div>
                                                                                <div class="avatar-wrapper-temp uploadDiv" style="display: block">
                                                                                    <a class="btn btn-primary" href="javascript:void(0);" id="avatarUploadBtn" style="position: relative;overflow: hidden;margin-top: 140px;margin-bottom: 10px;">
                                                                                        <em class="fa fa-plus"></em>{{$t("localeMsg.UploadNewPicture")}}

                                                                                        <input type="file" class="avatar-input " id="avatarInput" name="avatar_file"
                                                                                               style="position:absolute;bottom:0;right:0;filter:alpha(opacity=0);-moz-opacity:0;cursor:pointer;width:1000px;height:1000px;font-size:100px;">
                                                                                    </a>
                                                                                    <p style="color:#808080">{{$t("localeMsg.UploadNotifiyMessage")}}</p>

                                                                                </div>
                                                                                <div class="avatar-wrapper" style="display: none"></div>
                                                                                <div class="row uploadDiv" id="avatarSettingBtnGroup" style="display: none;margin: 10px 0;">
                                                                                    <div class="btn-group" style="display:block;">
                                                                                        <!--<button type="button" class="btn btn-primary">重新上传</button>-->
                                                                                        <a class="btn btn-default" href="javascript:void(0);" style="position: relative;overflow: hidden;">
                                                                                            {{$t("localeMsg.Reupload")}}

                                                                                            <input type="file" class="avatar-input " name="avatar_file"
                                                                                                   style="position:absolute;bottom:0;right:0;filter:alpha(opacity=0);-moz-opacity:0;cursor:pointer;width:1000px;height:1000px;font-size:100px;">
                                                                                        </a>

                                                                                    </div>
                                                                                    <div class="btn-group avatar-btns" style="display:block;margin: 0">
                                                                                        <button type="button" id="RotateBtn" class="btn btn-default pull-right" data-method="rotate" data-option="-90" title="Rotate -90 degrees">
                                                                                            <i class="fa fa-rotate-left"></i>{{$t("localeMsg.Rotate")}}</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <div class="">{{$t("localeMsg.Preview")}}</div>
                                                                                <div class="avatar-preview preview-lg"></div>
                                                                                <p style="color:#808080;text-align:left">184px x 184px</p>
                                                                                <div class="avatar-preview preview-md"></div>
                                                                                <p style="color:#808080;text-align:left">100px x 100px</p>
                                                                                <div class="avatar-preview preview-sm"></div>
                                                                                <p style="color:#808080;text-align:left">50px x 50px</p>
                                                                            </div>
                                                                        </div>

                                                                        <!--<div class="row avatar-btns" style="margin: 0">-->


                                                                                <!--<button type="submit" class="btn btn-primary avatar-save"><i class="fa fa-save "></i>{{$t("localeMsg.SaveBtn")}}</button>-->
                                                                                <!--<button type="submit" class="btn btn-default " data-dismiss="modal"><i class="glyphicon glyphicon-remove"></i>{{$t("localeMsg.CancelBtn")}}</button>-->


                                                                        <!--</div>-->
                                                                        <div class="well widget-body text-right" name="ButtonGroup">
                                                                            <button type="submit" class="btn btn-primary avatar-save"><i class="fa fa-save "></i>{{$t("localeMsg.SaveBtn")}}</button>
                                                                            <button type="submit" class="btn btn-default " data-dismiss="modal"><i class="glyphicon glyphicon-remove"></i>{{$t("localeMsg.CancelBtn")}}</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div id="inner-menu-content5" class="tab-pane">
                                    <div class="row" style="margin-right:0;">
                                        <div class="col-lg-12 col-sm-12 col-xs-12">

                                            <div class="tabbable tabs-top">
                                                <div>
                                                    <div class="tab-pane in active">


                                                        <div class="well widget-body">
                                                            <!--<div class="row">-->
                                                                <!--<div class="col-lg-12 col-sm-12 col-xs-12" style="padding-left:2px;">-->
                                                                    <!--<h5 class="row-title before-color" style="padding-left:2px;"><i class="fa fa-file-text iconcolor"></i>{{$t("localeMsg.WRPAccoutBind")}}</h5>-->
                                                                <!--</div>-->
                                                            <!--</div>-->
                                                            <div class="row">

                                                                <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                    <div class="col-lg-1 col-sm-1 col-xs-12">
                                                                    </div>
                                                                    <div class="col-lg-11 col-sm-11 col-xs-12">
                                                                        <div class="form-group" style="line-height: 28px;overflow: hidden;background:  #eee;padding: 0 10px">
                                                                            <div style="float: left">
                                                                                <i class="icomoon teld_zfb"></i><i>支付宝</i>
                                                                                <template v-if="zfbBindData">
                                                                                    <i style="padding-left: 10px;">已绑定:{{zfbName}}</i>
                                                                                </template>
                                                                            </div>
                                                                            <div style="float:right">
                                                                                <template v-if="zfbBindData">
                                                                                    <a style="text-decoration: none;cursor: pointer" v-on:click="unbindAccout(zfbBindData,7)">解除绑定</a>
                                                                                </template>
                                                                                <template v-else>
                                                                                    <span>未绑定</span>
                                                                                </template>

                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                    <div class="col-lg-1 col-sm-1 col-xs-12">
                                                                    </div>
                                                                    <div class="col-lg-11 col-sm-11 col-xs-12">
                                                                        <div class="form-group" style="line-height: 28px;overflow: hidden;background:  #eee;padding: 0 10px">
                                                                            <div style="float: left">
                                                                                <i class="icomoon teld_wx"></i><i>微信</i>
                                                                                <template v-if="wxBindData">
                                                                                    <i style="padding-left: 10px;">已绑定:{{wxName}}</i>
                                                                                </template>
                                                                            </div>
                                                                            <div style="float:right">
                                                                                <template v-if="wxBindData">
                                                                                    <a style="text-decoration: none;cursor: pointer" v-on:click="unbindAccout(wxBindData,8)">解除绑定</a>
                                                                                </template>
                                                                                <template v-else="">
                                                                                    <span>未绑定</span>
                                                                                </template>
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>


                                                    </div>
                                                    <!-- /Page Station Info  -->
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                                <div id="inner-menu-content4" class="tab-pane ">
                                    <div class="row" style="margin-right:0;">
                                        <div class="col-lg-12 col-sm-12 col-xs-12">
                                            <form class="form-horizontal frame-form" id="frame_language_form">

                                                <div class="tabbable tabs-top">
                                                    <div>
                                                        <div id="sta" class="tab-pane in active">

                                                            <!-- 账户总览  -->
                                                            <div class="well widget-body">
                                                                <!--<div class="row">-->
                                                                    <!--<div class="col-lg-12 col-sm-12 col-xs-12" style="padding-left:2px;">-->
                                                                        <!--<h5 class="row-title before-color" style="padding-left:2px;"><i class="fa fa-file-text iconcolor"></i>{{$t("localeMsg.WRPSystemSetting")}}</h5>-->
                                                                    <!--</div>-->
                                                                <!--</div>-->
                                                                <div class="row">

                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                        <div class="col-lg-1 col-sm-1 col-xs-12">
                                                                        </div>
                                                                        <div class="col-lg-8 col-sm-8 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label ">{{$t("localeMsg.WRPLanguageSetting")}}</label>
                                                                                <div class="col-sm-4">
                                                                                    <div class="radio">
                                                                                        <label>
                                                                                            <input id="langzh" name="form-field-radio" data-lang="zh" class="iconcolor" type="radio" >
                                                                                            <span class="text">中文 </span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-4">
                                                                                    <div class="radio">
                                                                                        <label>
                                                                                            <input id="langen" name="form-field-radio" data-lang="en" class="iconcolor" type="radio" >
                                                                                            <span class="text">EngLish </span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                                                        <div class="col-lg-1 col-sm-1 col-xs-12">
                                                                        </div>
                                                                        <div class="col-lg-8 col-sm-8 col-xs-12">
                                                                            <div class="form-group">
                                                                                <label class="col-sm-4 control-label "><div id="TraceSettingHelp" style="display:  inline-block;padding: 0 5px;"></div>{{$t("localeMsg.WRPTraceSetting")}}</label>
                                                                                <div class="col-sm-4">
                                                                                    <div class="radio">
                                                                                        <label>
                                                                                            <input id="traceYes" name="trace-field-radio" data-trace="yes" class="iconcolor" type="radio" >
                                                                                            <span class="text">{{$t("localeMsg.WRPYES")}} </span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="col-sm-4">
                                                                                    <div class="radio">
                                                                                        <label>
                                                                                            <input id="traceNo" name="trace-field-radio" data-trace="no" class="iconcolor" type="radio">
                                                                                            <span class="text">{{$t("localeMsg.WRPNO")}} </span>
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div class="well widget-body text-right" name="ButtonGroup">
                                                                <button type="button" class="btn btn-primary " v-on:click="changeSystemSetting" data-loading-text="正在保存..." click-text="正在保存..."><i class="fa fa-save "></i>{{$t("localeMsg.SaveBtn")}}</button>
                                                                <button type="submit" class="btn btn-default " data-dismiss="modal"><i class="glyphicon glyphicon-remove"></i>{{$t("localeMsg.CancelBtn")}}</button>
                                                            </div>
                                                        </div>
                                                        <!-- /Page Station Info  -->
                                                    </div>
                                                </div>
                                            </form>

                                        </div>

                                    </div>
                                </div>
                                <div id="inner-menu-content6" class="tab-pane ">
                                    <div style="font-weight: bold">*显示最近7天的访问记录</div>
                                    <br>
                                    <div class="table-responsive" style="overflow-x: auto">
                                        <table class="table table-striped table-hover table-bordered  max-width-table" id="wrpAccecssLogTb" style="table-layout:fixed !important">
                                            <thead>
                                            <tr role="row">
                                                <th style="width:40px" class="text-center"></th>
                                                <th class="text-center" style="width: 100px" data-field="field:CreateTimeStr,cssClass:text-left,hasTitle:true">
                                                    <label for="">访问时间</label>
                                                </th>
                                                <th class="text-center" style="width: 100px" data-field="field:Action,cssClass:text-left,hasTitle:true">
                                                    <label for="">页面名称</label>
                                                </th>
                                                <th class="text-center" style="width: 100px" data-field="field:ModuleCode,cssClass:text-left,hasTitle:true">
                                                    <label for="">关键应用</label>
                                                </th>
                                                <th class="text-center" style="width: 100px" data-field="field:Invoker,cssClass:text-left,hasTitle:true">
                                                    <label for="">访问地址</label>
                                                </th>
                                                <th class="text-center" style="width: 90px" data-field="field:Ext4,cssClass:text-left,hasTitle:true,enum:{undefined=}">
                                                    <label for="">操作</label>
                                                </th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="tcsMobileDiv" style="cursor:move;width: 350px;height: 120px;position: fixed;z-index: 9999;background: #2dc3e8;top: 95px;right: 10px;padding: 5px;opacity:  0.8;display: none;">
            <div class="col-lg-12 col-sm-12 col-xs-12">
                <div class="col-lg-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <!--<label class="col-sm-3 control-label ">接入号码</label>-->
                        <div class="col-sm-10">
                            <input type="text" maxlength="36"
                                   class="form-control" id="wsMobile" name="wsMobile" placeholder="接入电话号码" />

                        </div>


                    </div>
                </div>
                <div class="col-lg-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <div class="col-sm-10">
                            <div class="input-group helper-group" id="HJStaHelp">
                                <input type="hidden" id="wsStaID" value="">
                                <input type="hidden" id="wsStaCode" value="">
                                <input type="text" maxlength="36"
                                       class="form-control" id="wsStaName" name="wsStaName" placeholder="电站名称" disabled />
                                <span class="input-group-btn">
                                            <button class="btn btn-default shiny" data-toggle="modal" data-helper="wsStationHelp" type="button" data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                        </span>
                            </div>
                        </div>
                        <div class="widget-buttons col-sm-2">
                            <button class="btn btn-default" type="button" id="wsSearch">查询</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                        <div class="col-sm-10">
                            <div class="input-group helper-group" id="HJPileHelp">
                                <input type="hidden" id="wsPileID" value="">
                                <input type="hidden" id="wsPileCode" value="">
                                <input type="text" maxlength="36"class="form-control" id="wsPileName" name="wsPileName" placeholder="终端名称"  disabled/>
                                <span class="input-group-btn">
                                           <button class="btn btn-default shiny" data-toggle="modal" data-helper="wsPileHelp" type="button" data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                        </span>
                            </div>
                        </div>
                        <div class="widget-buttons col-sm-2">
                            <button class="btn btn-default" type="button" id="wsreset" @click="wsbtnReset">重置</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" id="abortModal">

            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-body" id="frame_abortContent">
                        <div class="row">
                            <div id="aboutList" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">{{$t("localeMsg.Confirm")}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade in" tabindex="-1" role="dialog" id="wrpOnlineHelperDiv" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h6 class="modal-title">在线帮助列表</h6>
                    </div>
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="table-responsive" style="overflow-x: auto">
                                    <table class="table table-striped table-hover table-bordered  max-width-table" style="table-layout:fixed !important">
                                        <thead>
                                            <tr role="row">
                                                <th style="width: 40px;" class="text-center">
                                                    <label>序号</label>
                                                </th>
                                                <th style="width: 80px; " class="text-center Code_col">
                                                    <label>类型</label>
                                                </th>
                                                <th style="width: 200px; " class="text-center Name_col">
                                                    <label>名称</label>
                                                </th>
                                                <th style="width: 100px; " class="text-center Name_col text-center">
                                                    <label>操作</label>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="selected">
                                                <td>1</td>
                                                <td>需求文档</td>
                                                <td>需求文档</td>
                                                <td class="text-center"><button type="button" onclick="openRequirementUrlForClick()">查看</button></td>
                                            </tr>
                                            <!--<tr>-->
                                                <!--<td>2</td>-->
                                                <!--<td>在线数据库</td>-->
                                                <!--<td>表1</td>-->
                                                <!--<td class="text-center"><button type="button">查看</button></td>-->
                                            <!--</tr>-->
                                            <!--<tr>-->
                                                <!--<td>2</td>-->
                                                <!--<td>在线数据库</td>-->
                                                <!--<td>表2</td>-->
                                                <!--<td class="text-center"><button type="button">查看</button></td>-->
                                            <!--</tr>-->
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<style>

    @keyframes twinkling{
        0%{
            opacity: 0.1;
        }
        100%{
            opacity: 1;
        }
    }

    .recording {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: red;
        float: left;
        margin-left: 3px;
        margin-top: 9px;
        position: absolute;
        animation: twinkling 1s infinite ease-in-out
    }


    #recording .recording{
        display: none;
    }

    #recording.active .recording{
        display: block;
    }

    .datepicker-orient-top{
        z-index: 9999!important;
    }
    .menu-text{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 150px;
        display: inline-block;
        vertical-align: bottom;
    }

    #frame_settiong modal-lg {
        width: 70% !important;
    }
    @media all and (max-width: 1024px) {
        #frame_settiong modal-lg {
            width: 100% !important;
        }
    }

    .pbmargintop0{
        margin-top:0!important
    }
    .pbmargintop42{
        margin-top:42px!important
    }

    /**
    密码强度
     */
    .pw-strength {
        position: absolute;
        width: 240px;
        top: 40px;
        //left: 110px;
        background: #eee;
        height: 20px;
    }


    .pw-strength .pw-strength__bar {
        background: #d3ebee;
        height: 20px;
        width: 0;
        overflow: hidden;
        transition: all .4s linear;
        -webkit-transition: all .4s linear;
        -moz-transition: all .4s linear;
        -o-transition: all .4s linear;
    }

    .pw-strength .pw-strength__bar--normal {
        width: 160px;
        background: #ff8900;
        color: white;
    }
    .pw-strength .pw-strength__bar--weak {
        width: 80px;
        background: #f76120;
        color: white;
    }

    .pw-strength .pw-strength__bar--strong {
        width: 240px;
        background: #5bab3c;
        color: white;
    }


    .pw-strength .pw-strength__letter {
        position: absolute;
        top: 0;
        left: 0;
    }
    .pw-strength .pw-strength__letter .pw-strength__label {
        display: block;
        float: left;
        text-align: center;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        width: 80px;
        border-right: 2px solid #fff;
        //color: #fff;
    }
    .pw-strength .pw-strength__letter .pw-strength__label--noborder {
        border-right: 0;
    }

    #frame_settiong input[type=checkbox]:checked+.text:before,
    #frame_settiong input[type=radio]:checked+.text:before {
        border-color: #00a7cb!important;
        color: #00a7cb!important;
    }
</style>
<style src="teld-vue-frame/thirdpart/css/bootstrap-datepicker3.min.css"></style>

<script>
    import Navbar from './Navbar.vue'
    import 'teld-vue-frame/thirdpart/js/teld-datepicker.min'
    import 'teld-vue-frame/thirdpart/js/teld-datetimepicker.min'
    import WRPCommon from '../../js/WRPCommon'
    export default{
        data(){
            var that = this
            var userInitData = {
                Avatar:'',Alias:'',
                RealName:'',Gender:'',Birthday:'',Mobile:'',Email:'',
                CompanyName:'',DepartmentName:'',TitleName:'',
                Telephone:'',OICQ:'',OpenId:''
            }

            var pageContentClass = "";
            var pageHeaderClass = ""
            var hasAuth = window.location.href.indexOf("NoAuth")==-1;
            if(!hasAuth){
                return {
                    pageBodyClass:"width: 100%;height: 100%;overflow-y: auto;margin-top:0 !important",
                    pageContentClass:"margin-left:0 !important",
                    pageHeaderClass:"",
                    userData:userInitData,
                    action:window.FrameSGHost+"WRPFrame-AvatarUpload"
                };
            }


            var ret = [];
            var saasInfo=null;

            var SaasKey = this.p_context.SubApplication && this.p_context.SubApplication!= ""?
                (window.location.protocol+"//" + this.p_context.SubApplication+window.domain):
                (window.location.protocol+"//"+window.location.hostname)

            var scheme = window.location.protocol.replace(":","");
            //var urlPram = window.location.protocol+"//"+SaasKey+window.domain
            //获取Saas化相关信息
            getDataSync(FrameSGHost+"WRPFrame-GetSaasInfo&scheme="+scheme+"&urlPram="+SaasKey, "get", {}, function (result) {

                if (result.state == "1") {
                    saasInfo = result.data;
                }
            });

            //检查是否是正确的路径
            //既不是子系统，也不是saas化
            if(saasInfo == null && window.getApplicationId(this.p_context.SubApplication) == -1 && !this.p_context.isPlatformIndex
                && this.p_context.SubApplication.indexOf("RService")==-1
            ){
                window.location.href = "/Error404.html"
                return;
            }
            //window.SaasKey = SaasKey

            //如果是定制的独立域名，跳转到对应的子程序
            //if(saasInfo.CustomizedDomainName && saasInfo.CustomizedDomainName.indexOf(".")!=-1){
               // this.$router.push("/saas");
            //}


            //运行框架首页隐藏左边栏
            if(this.p_context.isPlatformIndex){

                return{
                    SiderData:ret,
                    HasAuth:hasAuth,
                    MenuType:window.MenuType,
                    pageContentClass:pageContentClass,
                    saasInfo:saasInfo,
                    ShowPageHeader:window.ShowPageHeader,
                    userData:userInitData,
                    action:window.FrameSGHost+"WRPFrame-AvatarUpload",
                    pageBodyClass:"width: 100%;height: 100%;overflow-y: auto;",
                    wxBindData:null,
                    zfbBindData:null
                }
            }

            if(window.MenuType==1){
                pageContentClass = "margin-left:0 !important"
                pageHeaderClass = "left:0 !important"
            }

            //saas系统时，默认的key为saas
            var appkey = this.p_context.SubApplication
            if(saasInfo && saasInfo.hasOwnProperty("SYSName") && window.getApplicationId(appkey) == -1){
                appkey = "saas"
                window.saasInfo= saasInfo
            }



            window.SiderData = {
                SiderData:ret,
                HasAuth:hasAuth,
                SubApplication :"/#/"+this.p_context.SubApplication,
                MenuType:window.MenuType,
                pageContentClass:pageContentClass,
                pageHeaderClass:pageHeaderClass,
                saasInfo:saasInfo,
                ShowPageHeader:window.ShowPageHeader,
                userData:userInitData,
                action:window.FrameSGHost+"WRPFrame-AvatarUpload",
                pageBodyClass:"width: 100%;height: 100%;overflow-y: auto;",
                contextMenuData: {
                    menuName: 'demo',
                    axios: {
                        x: null,
                        y: null
                    },
                    menulists: [
                        {
                            fnHandler: 'traceJump',
                            icoName: 'fa fa-search',
                            btnName: '   链路查询'
                        },
//                        {
//                            fnHandler: 'newdata',
//                            icoName: 'fa fa-home fa-fw',
//                            btnName: 'New'
//                        }
                    ]
                },
                wxBindData:null,
                wxName:"",
                zfbBindData:null,
                zfbName:"",
            }

            this.$store.dispatch("updateSiderData",window.SiderData)

            var appid = this.p_context.isPlatformIndex?window.ApplicationID:window.getApplicationId(appkey)
            getDataAsync(FrameSGHost+"WRPFrame-GetPageSideBar", "get", { applicationName:appid}, function (result) {
                if (result.state == "1") {
                    ret = result.data;
                    if(ret.MenuGroup && ret.MenuGroup.length>0){
                        window.isMenuGroup = true
                    }else window.isMenuGroup = false
                } else {
                    NotifyError(result.errmsg);
                    ret = "[]";
                }

                //that.SiderData = ret
                window.SiderData.SiderData = ret
                var tempData = Object.assign({},window.SiderData)
                //window.SiderData.SiderData = ret
                that.$store.dispatch("updateSiderData",tempData)

            });


            return window.SiderData
        },
        mounted(){

            
            var that = this
            $(function () {
                $(document).off("teld:fullscreenchange").on("teld:fullscreenchange", function () {
                    if(WRPCommon.isFullScreen()){
                        $("#page-body").eq(0).addClass("pbmargintop0").removeClass("pbmargintop42")
                    }else{
                        $("#page-body").eq(0).addClass("pbmargintop42").removeClass("pbmargintop0")
                    }

                });
                $('#newPassOne').on("input",function () {

                    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
                    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
                    var enoughRegex = new RegExp("(?=.{6,}).*", "g");

                    if (false == enoughRegex.test($(this).val())) {
                        $('#J-pw-strength__bar').removeClass('.pw-strength__bar--normal');
                        $('#J-pw-strength__bar').removeClass('pw-strength__bar--weak');
                        $('#J-pw-strength__bar').removeClass('pw-strength__bar--strong');
                        $('#J-pw-strength__bar').addClass('pw-strength__bar--weak');
                        //密码小于六位的时候，密码强度图片都为灰色
                    }
                    else if (strongRegex.test($(this).val())) {
                        $('#J-pw-strength__bar').removeClass('.pw-strength__bar--normal');
                        $('#J-pw-strength__bar').removeClass('pw-strength__bar--weak');
                        $('#J-pw-strength__bar').removeClass('pw-strength__bar--strong');
                        $('#J-pw-strength__bar').addClass('pw-strength__bar--strong');
                        //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强
                    }
                    else if (mediumRegex.test($(this).val())) {
                        $('#J-pw-strength__bar').removeClass('.pw-strength__bar--normal');
                        $('#J-pw-strength__bar').removeClass('pw-strength__bar--weak');
                        $('#J-pw-strength__bar').removeClass('pw-strength__bar--strong');
                        $('#J-pw-strength__bar').addClass('pw-strength__bar--normal');
                        //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
                    }
                    else {
                        $('#J-pw-strength__bar').removeClass('.pw-strength__bar--normal');
                        $('#J-pw-strength__bar').removeClass('pw-strength__bar--weak');
                        $('#J-pw-strength__bar').removeClass('pw-strength__bar--strong');
                        $('#J-pw-strength__bar').addClass('pw-strength__bar--weak');
                        //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的
                    }
                    return true;
                });


                if(window.p_context.SubApplication=="tcs" && window.isPC()){
                    $("#tcsMobileDiv").css("display","block")
                    $("#wsSearch").click(function () {
                        var wsMobile = $("#wsMobile").val();
                        var wsPileID = $("#wsPileID").val();
                        var wsPileName = $("#wsPileName").val();
                        var wsPileCode = $("#wsPileCode").val();
                        var wsStaID = $("#wsStaID").val();
                        var wsStaName = $("#wsStaName").val();
                        var wsStaCode = $("#wsStaCode").val();
                        var info= {
                            wsMobile:wsMobile,
                            wsPileID:wsPileID,
                            wsPileName:wsPileName,
                            wsPileCode:wsPileCode,
                            wsStaID:wsStaID,
                            wsStaName:wsStaName,
                            wsStaCode:wsStaCode
                        }
                        window.SaveGlobelData("openms_wsinfo",JSON.stringify(info));

                        var CallInEvent = $.Event('teld:CallIn');
                        $("#page-body").find("div").eq(0).trigger(CallInEvent,[info]);
                        window.location.hash = "/tcs/CustomerInformation/CustomerInformationSearch?mid=9589D002-0F12-4F78-8F30-17F1279FB8DB"
                    })


                    var dragdiv = window.document.getElementById('tcsMobileDiv');

                    var draggingObj=null;
                    var diffX=0;
                    var diffY=0;
                    var ol = parseInt(dragdiv.style.right.replace("px",""))
                    var ot = parseInt(dragdiv.style.top.replace("px",""))
                    var timer,flag=false;

                    function tcsdown(e){
                        //dragdiv = window.document.getElementById('tcsMobileDiv');
                        //if(e.target.id && e.target.id=="tcsMobileDiv"){
                         ol = parseInt(dragdiv.style.right.replace("px",""))
                         ot = parseInt(dragdiv.style.top.replace("px",""))
                            draggingObj=e.target.offsetParent;
                            diffX=event.clientX//-draggingObj.offsetLeft;
                            diffY=event.clientY//-draggingObj.offsetTop;
                        //}
                        timer=window.setInterval(function () {
                            flag = true;
                        },5)
                    }

                    function tcsmove(e){
                        var dialog= window.document.getElementById('tcsMobileDiv');
                        if(draggingObj && flag){
                            flag=false;
                            dialog.style.right =(ol + diffX - e.clientX)+'px';
                            dialog.style.top =(ot + e.clientY-diffY)+'px';
                        }
                    }

                    function tcsup(e){
                        draggingObj=null;
                        diffX=0;
                        diffY=0;
                        ol = parseInt(dragdiv.style.right.replace("px",""))
                        ot = parseInt(dragdiv.style.top.replace("px",""))
                        window.clearInterval(timer)
                    }

                    dragdiv.onmousedown = tcsdown;
                    //dragdiv.addEventListener('mousedown',tcsdown,true);
                    window.document.addEventListener('mousemove',tcsmove);
                    dragdiv.addEventListener('mouseup',tcsup,true);



                    $("#HJStaHelp").helper17({
                        hiddenInps: [
                            { inpNm: "id", inpValue: "ID" },
                            { inpNm: "code", inpValue: "Code" },
                            { inpNm: "name", inpValue: "Name" },
                            { inpNm: "StaAddr", inpValue: "StaAddr" },

                        ],
                        theadHtml: function () {
                            var html = '<th style="text-align:center; width:20px;">序号</th>'
                                + '<th style="text-align:center; width:40px;" data-field="field:Code,cssClass:text-center">电站编号</th>'
                                + '<th style="text-align:center; width:100px;" data-field="field:Name,isTree:true,cssClass:text-left">电站名称</th>'
                                + '<th style="text-align:center; width:160px;" data-field="field:StaAddr,isTree:true,cssClass:text-left">电站地址</th>'
                            return html;
                        },
                        confirmCallback:function (tr,$triggerBtn) {
                            var id=$(tr).find("input[name=id]").val();
                            $("#wsStaID").val(id);
                            var name=$(tr).find("input[name=name]").val();
                            $("#wsStaName").val(name);
                            var code=$(tr).find("input[name=code]").val();
                            $("#wsStaCode").val(code);

                            $("#wsPileID").val("");
                            $("#wsPileCode").val("");
                            $("#wsPileName").val("");
                        }
                    });
                    $("#HJPileHelp").helper17({
                        hiddenInps: [
                            { inpNm: "id", inpValue: "ID" },
                            { inpNm: "code", inpValue: "Code" },
                            { inpNm: "name", inpValue: "Name" },
                            { inpNm: "StaID", inpValue: "StaID" },
                            { inpNm: "StaName", inpValue: "StaName" },
                            { inpNm: "StaCode", inpValue: "StaCode" }
                        ],
                        theadHtml: function () {
                            var html = '<th style="text-align:center; width:20px;">序号</th>'
                                + '<th style="text-align:center; width:50px;" data-field="field:Code,cssClass:text-center">终端编号</th>'
                                + '<th style="text-align:center; width:60px;" data-field="field:Name,isTree:true,cssClass:text-left">终端名称</th>'
                            return html;
                        },
                        filterKey: function () {
                            return JSON.stringify({ 'StaID': $('#wsStaID').val() });
                        },
                        confirmCallback:function (tr,$triggerBtn) {
                            var id=$(tr).find("input[name=id]").val();
                            $("#wsPileID").val(id);

                            var name=$(tr).find("input[name=name]").val();
                            $("#wsPileName").val(name);

                            var code=$(tr).find("input[name=code]").val();
                            $("#wsPileCode").val(name);

                            var StaID=$(tr).find("input[name=StaID]").val();
                            $("#wsStaID").val(StaID);

                            var StaName=$(tr).find("input[name=StaName]").val();
                            $("#wsStaName").val(StaName);

                            var StaCode=$(tr).find("input[name=StaCode]").val();
                            $("#wsStaCode").val(StaCode);
                        }
                    })
                }

                $("#recording").attr("title",that.$i18n.messages[window.locale].localeMsg.WRPRecordingStart)
                $("#recording").off("click").on("click",function () {
                    if($(this).hasClass("active")){

                        $(this).removeClass("active")
                        $(this).attr("title",that.$i18n.messages[window.locale].localeMsg.WRPRecordingStart)
                        that.traceJump()
                        window.BatchID = null
                    }else{
                        window.BatchID = (new Date()).getTime()+""+randomNum(10)
                        $(this).addClass("active")
                        $(this).attr("title",that.$i18n.messages[window.locale].localeMsg.WRPRecordingEnd)

                    }
                })

                $("#TraceSettingHelp").question({
                    type: "popover",
                    name: "WRPTraceEnable",
                    local: "zh-cn",
                    popoverStyle:{width:"400px"}
                }).data('bs.question');

                // 解码
                function decodeUnicode(str) {
                    str = str.replace(/\\/g, "%");
                    return unescape(str);
                }

                var confluenceHost = "//k.teld.cn"
                var CompanyId = "b0ba1259-54cc-4122-b66e-41988ac531ef"//集团总部
                var DepartmentId = "0c0b4f96-8d6e-40f9-8b12-ab39972bd7d3"//云平台中心
                //1A0BFEA6-E9D4-4384-9F47-398C0FBC4017 云平台外协
                var isPlatformUser = true;
                function loginConflunce() {
                    return getWrpUserInfo().then(function (ret) {
                        //云平台和外协用自己账号登陆（集团总部）
                        if(ret.CompanyId == CompanyId){
                            //获取用户名密码
                            getDataSync(window.FrameSGHost+"ConfluenceLogin-IdentifiedToken","post",null, function (ret) {
                                if (ret.state == "1") {
                                    var token=decodeUnicode(ret.data);
                                    var upArray = token.split("#")
                                    var username = upArray[0]
                                    var pwd = upArray[1]
                                    //登陆
                                    var sendData = {
                                        "os_username":username,
                                        "os_password":pwd,
                                        "login":"登录"
                                    }

                                    $.ajax({
                                        url:confluenceHost+"/dologin.action",
                                        method:"POST",
                                        async:false,
                                        data:sendData,
                                        cache: false,
                                        xhrFields: { withCredentials: true },
                                        success:function(data){
                                        }
                                    })

                                } else {
                                    NotifyError(ret.errmsg);
                                }
                            });
                        }
                        //非集团总部的用公共账户登陆
                        else {
                            isPlatformUser = false
                            var username="helperdocuser"
                            var pwd="123456a?"
                            //登陆
                            var sendData = {
                                "os_username":username,
                                "os_password":pwd,
                                "login":"登录"
                            }

                            $.ajax({
                                url:confluenceHost+"/dologin.action",
                                method:"POST",
                                async:false,
                                data:sendData,
                                cache: false,
                                xhrFields: { withCredentials: true },
                                success:function(data){

                                }
                            })
                        }
                    })
                }

                //提前登陆
//                if(!readCookie("JSESSIONID")){
//                    loginConflunce()
//                }

                var retry = 0,rRetry = 0
                var requirementUrl = null;

                // 获取需求文档url
                function getRequirementUrl(){

                    return new Promise(function (resolve, reject) {
                        var url = null;
                        var app = window.p_context.SubApplication.toUpperCase()
                        var pageName = isPC()?$.trim($("#breadcrumbs").find("small").text()):$.trim($("#mobilePageName").text())
                        //跳转到在线帮助
                        var content = "UI_"+app+"_"+pageName;

                        $.ajax({
                            url:confluenceHost+"/rest/api/search?cql=text ~'"+content+"'%20AND%20type=page&expand=content.space,space.homepage&limit=10",
                            method:"get",
                            dataType:"json",
                            async:false,
                            cache: false,
                            xhrFields: { withCredentials: true },
                            success:function(data){
                                if(data.hasOwnProperty("results") && data.results.length > 0 ){
                                    url= data._links.base + data.results[0].url

                                }
                                resolve(url)

                            },
                            error:function(xhr, textStatus, errorThrown){
                                //无权限需要重新登陆
                                if("Forbidden"==errorThrown){
                                    if(rRetry > 1){
                                        rRetry = 0
                                        NotifyError("知识库登陆失败！");
                                        return false;
                                    }

                                    loginConflunce().then(function () {
                                        rRetry++
                                        url = getRequirementUrl()
                                        resolve(url)
                                    })

                                }else{reject()}

                            }

                        })
                    })
                }


                function openRequirementUrl() {
                    var opener =  window.open(requirementUrl.replace("http:","https:"),"_blank")
                    opener = null
                }

                window.openRequirementUrlForClick = function () {
                    if(requirementUrl){
                        var opener = window.open(requirementUrl,"_blank")
                        opener = null
                    }else{
                        getRequirementUrl().then(function (ru) {
                            if(!ru){
                                NotifyError("未找到需求文档")
                                return false
                            }
                            requirementUrl = ru
                            // 打开跳转列表
                            var opener = window.open(requirementUrl,"_blank")
                            opener = null
                        })
                    }

                }

                $("#online-helper").click(function () {
                    jumpToHelper()
                })

                //获取在线帮助文档地址
                function getHelperUrl(title) {

                    return new Promise(function (resolve, reject) {
                        var url = null;
                        var app = window.p_context.SubApplication.toUpperCase()
                        var pageName = isPC()?$.trim($("#breadcrumbs").find("small").text()):$.trim($("#mobilePageName").text())
                        //跳转到在线帮助
                        var title = pageName+"("+app+")";

                        $.ajax({
                            url:confluenceHost+"/rest/api/search?cql=title='"+title+"'%20AND%20type=page&expand=content.space,space.homepage&limit=10",
                            method:"get",
                            dataType:"json",
                            async:false,
                            cache: false,
                            xhrFields: { withCredentials: true },
                            success:function(data){
                                if(data.hasOwnProperty("results") && data.results.length > 0 ){
                                    url= data._links.base + data.results[0].url

                                }
                                resolve(url)

                            },
                            error:function(xhr, textStatus, errorThrown){

                                //无权限需要重新登陆
                                if("Forbidden"==errorThrown){
                                    if(retry > 1){
                                        retry = 0
                                        NotifyError("知识库登陆失败！");
                                        return false;
                                    }

                                    loginConflunce().then(function () {
                                        retry++
                                        url = getHelperUrl()
                                        resolve(url)
                                    })

                                }else{
                                    reject()
                                }

                            }

                        })
                    })
                }

                function jumpToHelper(){

                    getHelperUrl().then(function (url) {

                        if(!url){
                            return NotifyWarning("未找到帮助文档")
                        }
                        var opener = window.open(url.replace("http:","https:"),"_blank")
                        opener = null
                    })
                }

                $("#wrpOnlineHelperDiv").on("keydown",function(evt){
                    if(evt.which==13){
                        openRequirementUrl()
                        //转向文档地址
                        return false;

                    }
                })


                //快捷键绑定
                $(document).on("keydown", function (event) {

                    if(event.altKey && event.which==49){
                        jumpToHelper()
                        return false;
                    }

                    if(event.altKey && event.which==50){
                        if(!isPlatformUser) return false;
                        getRequirementUrl().then(function (ru) {
                            if(!ru){
                                NotifyWarning("未找到需求文档")
                                return false
                            }
                            requirementUrl = ru
                            // 打开跳转列表
                            $("#wrpOnlineHelperDiv").modal("show")
                        })
                        return false;
                    }
                });
            })

            sessionStorage.setItem("wrpopened","1")

            resetPageBody();
            var isSaas = this.saasInfo && this.saasInfo.hasOwnProperty("SYSName") && this.saasInfo != null
            window.isSaas = isSaas
            var titleName = this.$i18n.messages[window.locale].localeMsg.WrpTitle

            if(isSaas){
                titleName = this.saasInfo.SYSName
            }else{
                if(this.p_context.SubApplication != "" && window.ApplilcationNames && window.ApplilcationNames[this.p_context.SubApplication])
                    titleName = window.localeMessage.app["APP"+window.FrameApplicationInfo[this.p_context.SubApplication]]
            }

            window.document.title = titleName

            //window.document.getElementById("frameIcon").href
            var icoHref= isSaas?this.saasInfo.SYSIconAddr:window.ResourcePath + "/platform/teld/img/teld.ico"
            window.top.postMessage("icoHref="+icoHref,"*")
            window.document.getElementById("frameIcon").href = icoHref

            if(this.p_context.isPlatformIndex){
                if(isPC())$("#sidebar").addClass("hide")
            }

            if(!this.HasAuth){
                return
            }


            getDataAsync(FrameSGHost+"WRPFrame-GetRSAParameters", 'get', {clientId:""}, function (data) {
                if (data.state == 0) {
                    NotifyError(data.errmsg);
                }
                else {

                    $("#encryption").val(data.data.Exponent);
                    $("#modulus").val(data.data.Modulus);
                    $("#ReqID").val(data.data.ReqID);
                }
            });

            $(".frame-form").bootstrapValidator();

            getDataAsync(FrameSGHost+"WRPFrame-GetCurrentUser", 'get', null, function (data) {


                that.userData.Alias = data.CustInfomationVMSG.alias==null?"":data.CustInfomationVMSG.alias
                that.userData.RealName=data.CustInfomationVMSG.realname==null?"":data.CustInfomationVMSG.realname
                that.userData.Gender = data.CustInfomationVMSG.gender==null?"":(data.CustInfomationVMSG.gender==1?'男':'女')
                that.userData.Birthday = data.CustInfomationVMSG.birthday
                that.userData.Mobile = data.CustInfomationVMSG.mobile
                that.userData.userID = data.CustInfomationVMSG.userID
                var imgurl = window.ResourcePath + "/Content/img/avatars/nopictrue.png";
                that.userData.Avatar = (data.CustInfomationVMSG.headImg ==null || data.CustInfomationVMSG.headImg == "")?imgurl:data.CustInfomationVMSG.headImg
                that.$nextTick(function () {
                    $("#oldAvatar").val((data.CustInfomationVMSG.headImg ==null || data.CustInfomationVMSG.headImg == "")?"":data.CustInfomationVMSG.headImg)

                })

                that.userData.Email = data.CurUserForWebUI.EMail
                that.userData.CompanyId= data.CurUserForWebUI.CompanyId
                that.userData.CompanyName = data.CurUserForWebUI.CompanyName
                that.userData.DepartmentId = data.CurUserForWebUI.DepartmentId
                that.userData.DepartmentName = data.CurUserForWebUI.DepartmentName

                that.userData.WorkGroupId = data.CurUserForWebUI.WorkGroupId
                that.userData.WorkGroupName = data.CurUserForWebUI.WorkGroupName

                window.WrpUserInfo = that.userData

                //TODO:经开公交临时对应
                WRPCommon.jkTempHandle(that)


            });


            getDataAsync(window.FrameSysSrv+ 'SYSSrv-GetTPAuthBindList','POST',{

            },function(data)
            {

                if(data.state!="1")return
                for(var i in data.data){
                    var bindData = data.data[i]
                    //支付宝
                    if(bindData.TPType==7){
                        that.zfbBindData = bindData.ID
                        that.zfbName = bindData.Remark
                    }
                    //微信
                    if(bindData.TPType==8){
                        that.wxBindData = bindData.ID
                        that.wxName = bindData.Remark
                    }
                }

            });

            $("#frame_settiong").off('shown.bs.modal').on('shown.bs.modal', function () {

                new CropAvatar($('#crop-avatar'))

                $("#wrpUserBirthday").datepicker({
                    autoclose: true,
                    language:window.locale
                });

                if(window.readCookie('locale')=="zh"){
                    $("#langzh").prop("checked",true)
                }
                else if(window.readCookie('locale')=="en"){
                    $("#langen").prop("checked",true)
                } else {
                    $("#langzh").prop("checked",true)
                }


                if(window.readCookie('traceEnable')=="yes"){
                    $("#traceYes").prop("checked",true)
                    //$("#recording").removeClass("hide")
                }
                else if(window.readCookie('traceEnable')=="no"){
                    $("#traceNo").prop("checked",true)
                    //$("#recording").addClass("hide")
                } else {
                    $("#traceNo").prop("checked",true)
                }



            });
            $("#WRPAccessLog").off("shown.bs.tab").on('shown.bs.tab', function (e) {
                that.wrpAccecssLogTbSearch();
            })

            // 其余关键应用列表设置最大高度
            if(isPC()){
                $("#subSysDiv .subsystem-menu").css("max-height",document.documentElement.clientHeight - 70)
            }

            if(window.readCookie('traceEnable')=="yes"){
                //$("#traceYes").prop("checked",true)
                $("#recording").removeClass("hide")
            }
            else if(window.readCookie('traceEnable')=="no"){
                //$("#traceNo").prop("checked",true)
                $("#recording").addClass("hide")
            } else {
                //$("#traceNo").prop("checked",true)
            }
        },

        components:{
            "Navbar":Navbar
        },
        methods:{

            changeSystemSetting:function () {
                var trace = $("input[name='trace-field-radio']:checked").attr("data-trace");
                createCookie('traceEnable',trace)

                var val = $("input[name='form-field-radio']:checked").attr("data-lang");
                createCookie('locale',val)
                window.location.reload()
            },
            refresh:function () {
                //var url = this.$route.path;
                this.$router.go(0)
            },
            subMenuChange:function (groupid,notClick) {
                var that = this;

                if(!notClick)
                this.toIndexPage()
                //var appid = window.FrameApplicationInfo[this.p_context.SubApplication]

                //eraseCookie(getMenuCookieKey())
                createCookie(getMenuGroupCookieKey(), groupid);
                //var ret;

                //saas系统时，默认的key为saas
                var appkey = this.p_context.SubApplication
                if(this.saasInfo && window.getApplicationId(appkey) == -1){
                    appkey = "saas"
                }

                var appid = this.p_context.isPlatformIndex?window.ApplicationID:window.getApplicationId(appkey)

                getDataAsync(FrameSGHost+"WRPFrame-GetPageSidebarPartial&applicationId="+appid+"&groupId="+groupid, "get", {}, function (psp) {
                    if (psp.hasOwnProperty("ErrorInfo")==false) {
                        var thizz = Object.assign({},window.SiderData)
                        thizz.SiderData.Menu = psp.data.Menu;
                        that.$store.dispatch("updateSiderData",thizz)
                    } else {
                        NotifyError(psp.ErrorInfo);
                    }
                });

            },
            toIndexPage : function () {
                eraseCookie(getMenuCookieKey());
                eraseCookie(getMenuGroupCookieKey())
                $(".sidebar-menu").find("li").each(function () {
                     $(this).removeClass("open");
                     $(this).find(".submenu").each(function () {
                         $(this).removeClass("open");
                         $(this).find("li.active").removeClass("active")
                         $(this).css("display", "none");
                     });
                });
                $("li.menu-floor-1.active").find("li.active").removeClass("active")
                $("li.menu-floor-1.active").removeClass("active").removeClass("open")
                this.$router.push("/"+this.p_context.SubApplication);

                $('#breadcrumbs').find('small').remove();
                window.favorateBtnStatusSet()
                window.onlineBtnStatusSet();
            },
            backOnMobile:function(){
                this.$router.push("/"+this.p_context.SubApplication+"/?_b=true");
                //this.$router.go(-1);
                $('#breadcrumbs').find('small').remove();
            },
            backSetting:function(){

                $("#breadcrumbsForMobie").css("display", "inline-block");
                $("#breadcrumbsForSetting").css("display", "none");
                $("#mobileSettingUl").css("display","inline-block");
                $("#mobileSettingUl").find("li.active").removeClass("active");
                $("#mobileSettingUl").parent().find("div.tab-pane.active").removeClass("active");
                this.$router.push("/Frame/Setting");
            },
            check:function(e){

                var formData = $("#frame_pwd_form").data("bootstrapValidator");
                formData.validate();
                //判断验证结果
                var bool = formData.isValid();
                if (bool) {
                    if ($("#newPassOne").val().trim() != $("#newPassTwo").val().trim()) {
                        NotifyError("两次新密码输入不一致");
                        return false;
                    }
                    var encryption = $("#encryption").val().trim();
                    var modulus = $("#modulus").val().trim();
                    setMaxDigits(129);
                    var key = new RSAKeyPair(encryption, '', modulus);
                    var rsaPassword = encryptedString(key, $("#oldPass").val().trim());
                    var newRsaPassOne = encryptedString(key, $("#newPassOne").val().trim());
                    var newRsaPassTwo = encryptedString(key, $("#newPassTwo").val().trim());

                    getDataAsync(FrameSGHost+'WRPFrame-UpdatePassword', 'post',
                        {
                            'oldEncryptPwd': rsaPassword,
                            'newEncryptPwd': newRsaPassOne,
                            //'newRsaPassTwo': newRsaPassTwo,
                            'reqId':$("#ReqID").val()
                        }, function (data) {
                            if (data.state == 0) {
                                NotifyError(data.message);
                            }
                            else {
                                NotifySuccess("密码修改成功");
                                $("#oldPass").val("");
                                $("#newPassOne").val("");
                                $("#newPassTwo").val("");
                                eraseCookie("TELDSID")
                                eraseCookie("telda")
                                eraseCookie("teldb")

                                var oldUrl = "?redirect_uri="+ encodeURIComponent(window.location.href);
                                window.location.href=window.UserCenterUrl +oldUrl;
                            }

                        }, function () {

                        }, function () {
                            NotifyError("服务器内部错误");
                        });
                }
            },
            save:function(e){

                let pageName = "UserInfoSetting";
                var formData = $("#profileForm").data("bootstrapValidator");

                formData.validate();
                //判断验证结果
                var bool = formData.isValid();
                if (bool) {
                    var changeData = getChangeData(pageName);

                    if(!changeData){
                        NotifyWarning("数据没有变化！");
                        return;
                    }
                    getDataAsync(FrameSGHost+'WRPFrame-SaveUserInfo', 'post',
                        {
                            userInfo:JSON.stringify({Birthday:$("#Birthday").val(), Stacey:$("#Alias").val()})

                        }, function (data) {
                            if (data.state == 0) {
                                NotifyError(data.errmsg);
                            }
                            else {
                                NotifySuccess("用户信息修改成功");
                            }

                        }, function () {

                        }, function () {
                            NotifyError("服务器内部错误");
                        });
                }

                e.preventDefault()
            },
            undoAvatar:function(e){


                var that = this;
                getDataAsync(FrameSGHost+'WRPFrame-UndoAvatar', 'post',
                    {
                        userInfo:JSON.stringify({Avatar:''})
                    }, function (data) {

                        if (data.state == 0) {
                            NotifyError(data.errmsg);
                        }
                        else {
                            var imgurl = window.ResourcePath + "/Content/img/avatars/nopictrue.png";
                            $(".avatar-view").find("img").attr("src", imgurl);
                            $(".login-area").find("img").attr('src', imgurl);
                            $(".avatar-area").find("img").attr('src', imgurl);
                            //Alias,Birthday,OICQ,OpenId
                            that.userData.Avatar = imgurl
                            that.userData.Alias = $("#Alias").val()
                            that.userData.Birthday = $("#Birthday").val()
                            that.userData.OICQ = $("#OICQ").val()
                            that.userData.OpenId = $("#OpenId").val()
                            NotifySuccess("头像撤销成功");
                        }

                    }, function () {

                    }, function () {
                        NotifyError("服务器内部错误");
                    });
            },
            showMenu :function() {

                return false
                if(this.$route.path=="/" ||  this.$route.path==("/"+window.p_context.SubApplication)
                    || this.$route.path==("/"+window.p_context.SubApplication+"/")) return false

                if(window.PerformanceInfo.hasOwnProperty(this.$route.path)){
                    return false;
                }
                if(this.$route.hasOwnProperty("meta") && this.$route.meta.hasOwnProperty("mvcUrl"))return false

                event.preventDefault()
                var x = event.clientX
                var y = event.clientY
                // Get the current location
                this.contextMenuData.axios = {
                    x, y
                }
            },
            traceJump:function () {
                var url = "//web"+window.domain+"/#/om/Trace/TraceOperation?batchID="+window.BatchID+"&NoAuth=true"
                var opener = window.open(url,"_blank")
                opener=null
            },
            wsbtnReset:function () {
                $("#wsMobile").val("");
                $("#wsPileID").val("");
                $("#wsPileName").val("");
                $("#wsPileCode").val("");
                $("#wsStaID").val("");
                $("#wsStaName").val("");
                $("#wsStaCode").val("");
            },
            unbindAccout:function (id,type) {
                var that = this
                getDataAsync(window.FrameSysSrv+ 'SYSSrv-UnbindTPUserById','POST',{
                    tpUser:JSON.stringify({"ID":id})
                },function(data)
                {
                    if(data.state=="1" && data.data==true){
                        if(type==7){
                            that.zfbBindData=null
                            that.zfbName = "";
                        }
                        if(type==8){
                            that.wxBindData=null
                            that.wxName = ""
                        }
                        NotifySuccess("解绑成功");
                    }else{
                        NotifyError("解绑失败");
                    }

                });
            },
            wrpAccecssLogTbSearch:function () {
                var userinfo = window.WrpUserInfo
                var date =  new Date();
                var endDate = date.format("yyyy-MM-dd hh:mm:ss")
                date.setDate(date.getDate()-7);
                var startDate = date.format("yyyy-MM-dd hh:mm:ss")

                var postData = {
                    "filter": {
                        "UserID":userinfo.Mobile || userinfo.UserName,
                        startTime:startDate,
                        endTime:endDate,
                        "chartType":"all",
                        personal:'personal'
                    }
                };
                $("#wrpAccecssLogTb").datagrid17({
                    showPagination: true,
                    url: window.FrameSGHost+"wrpframe-GetUserOpData",
                    tableType: "single",
                    resizeCol: true,
                    showPageSelect: false,
                    cookieEnable: false
                }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
            }
        }
    }
</script>
