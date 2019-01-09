<template>
    <div class="row" id="User">
        <LayoutSingleList>
            <!--查询区-->
            <div slot="TableListSearch">
                <div class="btn-group">
                    <div class="input-group helper-group" id="OrgHelpDiv" style=" float: left; width: 150px">
                        <input type="hidden" name="OrganizationID" data-recive-helper-data="id" id="OrganizationID">
                        <input type="hidden" id="OrganizationCode" name="OrganizationCode"
                               data-recive-helper-data="code">
                        <input type="text" name="OrganiationName" id="OrganiationName" class="form-control input-sm"
                               readonly="readonly" data-recive-helper-data="showName" placeholder="组织机构"
                               style="width:160px"/>
                            <span class="input-group-btn">
                                    <button class="btn btn-default shiny btn-sm" data-toggle="modal"
                                            data-helper="UserListOrgHelp" type="button" data-validate="false"><i
                                            class=" fa fa-ellipsis-h"></i></button>
                            </span>
                    </div>
                </div>
                <div class="btn-group">
                    <input type="text" id="Key" placeholder="账号、手机号(不支持模糊查询)" title="账号、手机号(不支持模糊查询)"
                           class="form-control input-sm" v-on:keyup.enter="autoSubmit" style="width:220px"/>
                </div>
                <div class="btn-group">
                    <input type="text" id="Name" placeholder="姓名(支持模糊查询)" title="姓名(支持模糊查询)"
                           class="form-control input-sm" v-on:keyup.enter="autoSubmit" style="width:220px"/>
                </div>
                <div class="btn-group">
                    我的默认公司：
                </div>
                <div class="btn-group" style="padding-right: 10px;">
                    <label class="control-label" style="position:relative;top:6px">
                        <input type="checkbox" class="checkbox-slider" data-validate="false"
                               id="Userdefaultorg" v-on:click="defaultorg"/>
                        <span class="text"></span>
                    </label>
                </div>
                <div class="btn-group">
                    <div id="SelIsSyncCustomerInfo">
                    </div>
                </div>
                <button id="BtnSearch" class="btn btn-default" v-on:click="search">
                    <i class="fa fa-search"></i>查 询
                </button>
                <button id="Btn" class="btn btn-default" v-on:click="btnReset">
                    <i class="fa fa-repeat"></i>重 置
                </button>

            </div>
            <!--按钮操作区-->
            <div slot="TableListBtn">
                <Buttons mid="726a332c-62cc-4ba3-8b33-76ae228d919e" @UserInfo="UserInfo" @btnAdd="btnAdd"
                         @btnEdit="btnEdit" @btnDelete="btnDelete" @btnView="View" @Password="Password"
                         @showUserAssignRoleDialog="showUserAssignRoleDialog" @UserLeave="UserLeave"
                         @CopyPurview="CopyPurview" @btnUpdateMobile="btnUpdateMobile"></Buttons>
            </div>
            <!--数据展示区-->
            <div slot="TableContent">
                <div class="table-responsive" style="overflow-x: auto" id="usertable">
                    <table class="table table-striped table-hover table-bordered max-width-table" id="editabledatatable"
                           style="table-layout:fixed !important">
                        <thead>
                        <tr role="row">
                            <th style="width: 50px;" class="text-center Code_col">
                                <label>序号</label>
                            </th>
                            <th style="width: 110px;"
                                data-field="field:Account,cssClass:text-left,hasTitle:true,enum:{null=}"
                                class="text-center Code_col">
                                <label>账号</label>
                            </th>
                            <th style="width: 80px;"
                                data-field="field:RealName,cssClass:text-left,hasTitle:true,enum:{null=}"
                                class="text-center TaskStatus_col">
                                <label>姓名</label>
                            </th>
                            <th style="width: 70px; "
                                data-field="field:AreaCode,cssClass:text-left,hasTitle:true,enum:{null= }"
                                class="text-center TaskStatus_col">
                                <label>国际区号</label>
                            </th>
                            <th style="width: 120px; "
                                data-field="field:Mobile,cssClass:text-left,hasTitle:true,enum:{null= }"
                                class="text-center TaskStatus_col">
                                <label>手机号</label>
                            </th>
                            <th style="width:130px;"
                                data-field="field:Email,cssClass:text-left,hasTitle:true,enum:{null= }"
                                class="text-center TaskStatus_col">
                                <label>电子邮件</label>
                            </th>
                            <th style="width: 120px;"
                                data-field="field:CompanyName,cssClass:text-left,hasTitle:true,enum:{null=}"
                                class="text-center TaskStatus_col">
                                <label>默认公司</label>
                            </th>
                            <th style="width: 120px;"
                                data-field="field:DepartmentName,cssClass:text-left,hasTitle:true,enum:{null=}"
                                class="text-center TaskStatus_col">
                                <label>默认部门</label>
                            </th>
                            <th style="width: 120px;"
                                data-field="field:WorkGroupName,cssClass:text-left,hasTitle:true,enum:{null=}"
                                class="text-center TaskStatus_col">
                                <label>默认工作组</label>
                            </th>
                            <th style="width: 80px;"
                                data-field="field:DutyName,cssClass:text-left,hasTitle:true,enum:{null=}"
                                class="text-center TaskStatus_col">
                                <label>职位</label>
                            </th>
                            <th style="width: 110px;"
                                data-field="field:IsSync,cssClass:text-center,hasTitle:true,enum:{0=否&1=是}"
                                class="text-center TaskStatus_col">
                                <label>已同步客户信息</label>
                            </th>
                            <th style="width: 110px;"
                                data-field="field:CreateUserName,cssClass:text-left,hasTitle:true,enum:{null= }"
                                class="text-center CreateUserName_col">
                                <label>创建人</label>
                            </th>
                            <th style="width: 150px; "
                                data-field="field:CreateDate,cssClass:text-center,hasTitle:true,enum:{null= }"
                                class="text-center CreateDate_col">
                                <label>创建时间</label>
                            </th>
                            <th style="width: 110px; "
                                data-field="field:ModifyUserName,cssClass:text-left,hasTitle:true,enum:{null= }"
                                class="text-center ModifyUserName_col">
                                <label>修改人</label>
                            </th>
                            <th style="width: 150px; "
                                data-field="field:ModifyDate,cssClass:text-center,hasTitle:true,enum:{null= }"
                                class="text-center ModifyDate_col">
                                <label>修改时间</label>
                            </th>
                        </tr>
                        </thead>
                        <tbody id="usertbody">
                            <tr>
                                <td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="15">请输入查询条件</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </LayoutSingleList>
        <!-- 重置密码-->
        <div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false"
             id="PassWord" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal"
                                aria-hidden="true">×
                        </button>
                        <h6 class="modal-title">重置密码</h6>
                    </div>
                    <div class="modal-body tabbable form-horizontal bv-form" id="DetailDataBody"
                         style="overflow: hidden">
                        <div class="tab-pane in active bv-form">
                            <form role="well widget-body row" id="form">
                                <div class="col-lg-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label no-padding-left">账号</label>
                                        <div class="col-sm-8">
                                            <input type="text" readonly="readonly" class="form-control input-sm" name=""
                                                   maxlength="18" id="passName"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label no-padding-left">新密码</label>
                                        <!--<div class="col-sm-8">-->
                                        <!--<input type="text" class="form-control input-sm" id="newPwd" name="newPwd"-->
                                        <!--maxlength="20" v-on:keyup.enter="newSubmit" data-bv-field="newPwd"-->
                                        <!--data-bv-regexp="true" data-bv-regexp-regexp="^[\x00-\xff]{8,20}$"-->
                                        <!--data-bv-regexp-message="密码必须是8-20位半角字符,不允许有汉字"/>-->
                                        <!--</div>-->
                                        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                            <div class="input-group helper-group">
                                                <input type="password" class="form-control input-sm" id="newPwd"
                                                       name="newPwd"
                                                       maxlength="20" v-on:keyup.enter="newSubmit"
                                                       data-bv-field="newPwd"
                                                       data-bv-regexp="true" data-bv-regexp-regexp="^[\x00-\xff]{8,20}$"
                                                       data-bv-regexp-message="密码必须是8-20位半角字符,不允许有汉字"/>
                                                <span class="input-group-btn">
                                            <button id="isShowHide1" class="btn btn-default shiny btn-sm" data-toggle=""
                                                    data-helper="" type="button"
                                                    data-validate="false">
                                                <i id="isShowHide2" class="glyphicon glyphicon-eye-close"></i>
                                            </button>
                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label no-padding-left">确认密码</label>
                                        <!--<div class="col-sm-8">-->
                                        <!--<input type="text" class="form-control input-sm" id="confirmPassword"-->
                                        <!--name="confirmPassword" maxlength="20" v-on:keyup.enter="oldSubmit"-->
                                        <!--data-bv-field="confirmPassword" data-bv-regexp="true"-->
                                        <!--data-bv-regexp-regexp="^[\x00-\xff]{8,20}$"-->
                                        <!--data-bv-regexp-message="密码必须是8-20位半角字符,不允许有汉字"/>-->
                                        <!--</div>-->
                                        <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                            <div class="input-group helper-group">
                                                <input type="password" class="form-control input-sm"
                                                       id="confirmPassword"
                                                       name="confirmPassword" maxlength="20"
                                                       v-on:keyup.enter="oldSubmit"
                                                       data-bv-field="confirmPassword" data-bv-regexp="true"
                                                       data-bv-regexp-regexp="^[\x00-\xff]{8,20}$"
                                                       data-bv-regexp-message="密码必须是8-20位半角字符,不允许有汉字"/>
                                                <span class="input-group-btn">
                                            <button id="isShowHide3" class="btn btn-default shiny btn-sm" data-toggle=""
                                                    data-helper="" type="button"
                                                    data-validate="false">
                                                <i id="isShowHide4" class="glyphicon glyphicon-eye-close"></i>
                                            </button>
                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                        <button type="button" class="btn" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 复制权限-->
        <div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false"
             id="copyPurview" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true"
                                v-on:click="Copyclose">×
                        </button>
                        <h6 class="modal-title">复制权限</h6>
                    </div>
                    <div class="modal-body tabbable form-horizontal bv-form" id="DetailDataBody"
                         style="overflow: hidden">
                        <div class="tab-pane in active bv-form">
                            <form role="well widget-body row">
                                <div class="col-lg-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label no-padding-left">复制</label>
                                        <div class="col-sm-8  ">
                                            <div class="input-group" id="newUserHelpDiv">
                                                <input type="hidden" name="selUserId" id="selUserId"
                                                       data-recive-helper-data="id">
                                                <input type="text" name="selUserName" id="selUserName"
                                                       class="form-control input-sm" readonly="readonly"
                                                       data-recive-helper-data="name">
                                                <span class="input-group-btn">
                                            <button class="btn btn-default shiny btn-sm" @click="UserModal(0)"
                                                    type="button" data-validate="false">
                                                <i class=" fa fa-ellipsis-h"></i>
                                            </button>
                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label no-padding-left">到</label>
                                        <div class="col-sm-8  ">
                                            <div class="input-group" id="oldUserHelpDiv">
                                                <input type="hidden" name="authUserId" id="authUserId" value=""
                                                       data-recive-helper-data="id">
                                                <input type="text" name="authUserName" id="authUserName"
                                                       class="form-control input-sm" readonly="readonly"
                                                       data-recive-helper-data="name">
                                                <span class="input-group-btn">
                                            <button class="btn btn-default shiny btn-sm" @click="UserModal(1)"
                                                    type="button" data-validate="false">
                                                <i class=" fa fa-ellipsis-h"></i>
                                            </button>
                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label no-padding-left" style="top:-3px;">复制内容</label>
                                        <div class="col-sm-8  ">
                                            <input class="form-control input-sm" type="checkbox" id="Role" name="Role"
                                                   style="opacity: 1;float:left;margin-right: 5px; position: static"/>
                                            <label class="btn-group" for="all"
                                                   style="top:5px;float:left;margin-right: 10px">
                                                用户所属角色
                                            </label>
                                            <input class="form-control input-sm" type="checkbox" id="UserModule"
                                                   name="UserModule"
                                                   style="opacity: 1;float:left; margin-right:5px ; position: static"/>
                                            <label class="btn-group" for="all"
                                                   style="top:5px;float:left;margin-right: 10px">
                                                用户功能权限
                                            </label>
                                            <input class="form-control input-sm" type="checkbox" id="UserButton"
                                                   name="UserButton"
                                                   style="opacity: 1;float:left; margin-right: 5px; position: static"/>
                                            <label class="btn-group" for="all"
                                                   style="top:5px;margin-right:10px;float:left;">
                                                用户按钮权限
                                            </label>
                                            <input class="form-control input-sm" type="checkbox" id="UserData"
                                                   name="UserData"
                                                   style="opacity: 1;float:left;margin-right: 5px; position: static"/>
                                            <label class="btn-group" for="all"
                                                   style="top:5px;margin-right: 10px; float:left;">
                                                用户数据权限
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
                        <button type="button" class="btn" data-dismiss="modal" v-on:click="Copyclose">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 更换手机号-->
        <div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false"
             id="UpdateMobile" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true"
                                v-on:click="Mobileclose">×
                        </button>
                        <h6 class="modal-title">更换手机号</h6>
                    </div>
                    <div class="modal-body tabbable form-horizontal bv-form" id="UpdateMobileD"
                         style="overflow: hidden">
                        <div class="tab-pane in active bv-form">
                            <form role="well widget-body row" id="Mobileform">
                                <div class="col-lg-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label no-padding-left">姓名</label>
                                        <div class="col-sm-8">
                                            <input type="text" readonly="readonly" class="form-control input-sm"
                                                   maxlength="18" id="MobileUserName"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label no-padding-left">原手机号</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control input-sm" id="OldMobile"
                                                   name="OldMobile" maxlength="20" readonly="readonly"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-12 col-xs-12">
                                    <div class="form-group">
                                        <label for="" class="col-sm-2 control-label no-padding-left">新手机号</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control input-sm" id="NewMobile"
                                                   name="NewMobile" maxlength="20" v-on:keyup.enter="MobileSubmit"
                                                   data-bv-field="NewMobile" data-bv-regexp="true"
                                                   data-bv-regexp-regexp="^1[3|4|5|7|8]{1}[0-9]{9}$"
                                                   data-bv-regexp-message="请输入正确的手机号"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">确定</button>
                        <button type="button" class="btn" data-dismiss="modal" v-on:click="Mobileclose">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 用户帮助-->
        <div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false"
             id="UserModal" data-backdrop="static" style="overflow-y: auto">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="bootbox-close-button close"
                                data-dismiss="modal" aria-hidden="true">×
                        </button>
                        <h6 class="modal-title">用户帮助</h6>
                    </div>
                    <div class="modal-body">
                        <div class="table-toolbar">
                            <div class="btn-group">
                                <select class="form-control" v-model="SearchType">
                                    <option value="">全部</option>
                                    <option value="Account">账号</option>
                                    <option value="RealName">姓名</option>
                                    <option value="Mobile">手机</option>
                                </select>
                            </div>
                            <div class="btn-group">
                                <div class="input-group helper-group" style=" float: left; width: 200px">
                                    <input type="text" class="form-control input-sm input-sm" id="keywords"
                                           name="keywords"
                                           @keyup.enter="btnsearch" placeholder="请输入查询条件">
                                </div>
                            </div>
                            <button id="Search" class="btn btn-default " @click="btnsearch">
                                <i class="fa fa-search"></i>查 询
                            </button>
                            <button id="Reset" class="btn btn-default " @click="btnreset">
                                <i class="fa fa-repeat"></i>重 置
                            </button>
                        </div>
                        <div class="form-group">
                            <div class="table-responsive">
                                <table class="table table-striped table-hover table-bordered  max-width-table"
                                       id="userdatatable"
                                       style="">
                                    <thead id="unthead">
                                    <tr role="row" id="untabrow">
                                        <th style="width: 60px;" class="text-center">
                                            <label>
                                                序号
                                            </label>
                                        </th>
                                        <th style="width: 100px; " class="text-center Code_col"
                                            data-field="field:Account,cssClass:text-left,hasTitle:true">
                                            <label>
                                                账号
                                            </label>
                                        </th>
                                        <th class="text-center Name_col"
                                            data-field="field:RealName,cssClass:text-left,hasTitle:true,isTree:true">
                                            <label>
                                                姓名
                                            </label>
                                        </th>
                                        <th class="text-center Name_col"
                                            data-field="field:Mobile,cssClass:text-left,hasTitle:true">
                                            <label>
                                                手机
                                            </label>
                                        </th>
                                    </tr>

                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="4">请输入查询条件
                                        </td>
                                    </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="save">确定</button>
                        <button type="button" class="btn" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import LayoutSingleList from "teld-vue-frame/vue/LayoutSingleList.vue"
    import Buttons from "teld-vue-frame/vue/Button.vue"
    import Syscommon from "../../../js/Syscommon"
    var urARR = {};//存放用户拥有角色数组
    var UserID;//分配角色使用的用户内码
    var mid;
    var hasQueried;
    var orgIdBuf;
    var orgNameBuf;
    var orgCodeBuf;
    var searchEmpty = 'NoMore!';
    export default{
        data () {
            return {
                helperOption: {
                    multi: true,
                    showPagination: true
                },
                SearchType: '',
                UserType: '',
            }
        },
        mounted(){
            var isShowHide1 = $('#isShowHide1');
            var isShowHide2 = $('#isShowHide2');
            var newPwd = $("#newPwd");
            isShowHide1.off('click').on('click', function () {
                if (isShowHide2.hasClass('glyphicon-eye-close')) {
                    isShowHide2.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');//密码可见
                    newPwd.attr("type", "text");
                } else {
                    isShowHide2.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');//密码不可见
                    newPwd.attr("type", "password");
                }
                ;
            });
            var isShowHide3 = $('#isShowHide3');
            var isShowHide4 = $('#isShowHide4');
            var confirmPassword = $("#confirmPassword");
            isShowHide3.off('click').on('click', function () {
                if (isShowHide4.hasClass('glyphicon-eye-close')) {
                    isShowHide4.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');//密码可见
                    confirmPassword.attr("type", "text");
                } else {
                    isShowHide4.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');//密码不可见
                    confirmPassword.attr("type", "password");
                }
                ;
            });
            Syscommon.delSaveContent("Formcondition");
            //引入表单验证插件
            $("#form").bootstrapValidator();
            $("#Mobileform").bootstrapValidator();
            mid = this.$route.query.mid;
            hasQueried = false;
            // window.helperList = helperList;
            $("#SelIsSyncCustomerInfo").select({
                id: "SelIsSyncCustomerInfoSel",
                blankLabel: "是否已同步客户信息",
                hasBlankOption: true,
                dataSource: function () {
                    var data = [];
                    data.push({"Code": "1", "Name": "是"});
                    data.push({"Code": "0", "Name": "否"});
                    return data;
                },
                onSelect: function () {
                }
            });
            //组织机构帮助
            $("#OrgHelpDiv").filterTreeHelper17({
                multi: false,
                showPagination: false,
                showType: 1,
                IsDetail: 0,
                resizeCol: true,
                filterKey: function () {
                    return {
                        ParentID: '0',
                        IsFlag: '0',
                        Data_FunctionID: "C1680F43-7867-4A58-B12E-72A01668CE38",
                        Data_PermissionsID: "E014043A-B531-48B1-9BA6-E5C4B80DBC07"
                    }
                },
                openNode: function (node) {
                    var id = node.curId;
                    var url = ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList";
                    var nodePostData = {
                        'filter': '{"FilterKey":{"ParentID":"' + id + '",' +
                        '"Data_FunctionID":"C1680F43-7867-4A58-B12E-72A01668CE38",' +
                        '"Data_PermissionsID":"E014043A-B531-48B1-9BA6-E5C4B80DBC07"}}'
                    };
                    var data = {total: 0, rows: []}
                    getDataSync(url, "get", nodePostData, function (rdata) {
                        data = rdata;
                    });
                    return data;
                },
                filterHtml: function (tHtml) {
                    return tHtml ? tHtml
                            : '<li><a href="javascript:void(0);" data-code="">全部</a></li>'
                    + '<li><a href="javascript:void(0);" data-code="Code">编号</a></li>'
                    + '<li><a href="javascript:void(0);" data-code="Name">组织机构</a></li>';
                }
            });
            if (isPC()) {
                var crumbs = $("#breadcrumbs small");
                crumbs.html("<i class='fa fa-angle-right'></i>" + "用户管理");
            }
            //记忆查询
            var that = this;

            var condition = getOldCondition(this);
            var Userdefaultorg = Syscommon.getSaveContent("Userdefaultorg");
            if (Userdefaultorg == "1") {
                $("#Userdefaultorg").attr("checked", 'true');
                if (condition) {
                    $("#OrganizationID").val(condition.UserOrganizationID);
                    orgIdBuf = condition.UserOrganizationID;
                    $("#OrganizationCode").val(condition.UserOrganizationCode)
                    orgCodeBuf = condition.UserOrganizationCode;
                    $("#OrganiationName").val(condition.UserOrganiationName);
                    orgNameBuf = condition.UserOrganiationName;
                    $("#Key").val(condition.UserKey);
                    $("#Name").val(condition.Name);
                    $('#hideSelIsSyncCustomerInfoSel').val(condition.IsSync);
                    $('#SelIsSyncCustomerInfoSel').text(condition.IsSyncName);
                } else {
                    // this.initDataGrid();
                }
                getDataSync(ServiceHost + '/api/invoke?SID=SYS_UserMgr_GetLoginSysUser', 'get', null, function (data) {
                    if (data) {
                        var OrganiationName = data.CompanyName;
                        var OrganiationId = data.CompanyID;
                        $("#OrganiationName").val(OrganiationName);
                        orgNameBuf = OrganiationName;
                        $("#OrganizationID").val(OrganiationId);
                        orgIdBuf = OrganiationId;
                        that.LoadPageData();
                    }
                });

            } else {
                $("#Userdefaultorg").removeAttr("checked");
                if (condition) {
                    if (condition.UserOrganizationID || condition.UserOrganizationCode || condition.UserOrganiationName || condition.UserKey || condition.Name|| condition.IsSync|| condition.IsSyncName) {
                        $("#OrganizationID").val(condition.UserOrganizationID);
                        orgIdBuf = condition.UserOrganizationID;

                        $("#OrganizationCode").val(condition.UserOrganizationCode);
                        orgCodeBuf = condition.UserOrganizationCode;

                        $("#OrganiationName").val(condition.UserOrganiationName);
                        orgNameBuf = condition.UserOrganiationName;

                        $("#Key").val(condition.UserKey);
                        $("#Name").val(condition.Name);
                        $('#hideSelIsSyncCustomerInfoSel').val(condition.IsSync);
                        $('#SelIsSyncCustomerInfoSel').text(condition.IsSyncName)
                        that.LoadPageData();
                    }
                } else {
                    $("#OrganizationID").val("");
                    orgIdBuf = "";
                    $("#OrganizationCode").val("");
                    orgCodeBuf = "";
                    $("#OrganiationName").val("");
                    orgNameBuf = "";
                    // this.initDataGrid();
                }
            }

            //初始化自定义选择
            var cntperpage = readCookie("cntperpage");
            cntperpage = parseInt(cntperpage);
            if (cntperpage > 100 || !cntperpage) {
                cntperpage = 10;
            }
            cntperpage = cntperpage.toString();
            createCookie("cntperpage", cntperpage);
        },
        components: {
            'LayoutSingleList': LayoutSingleList,
            'Buttons': Buttons
        },
        methods: {
            getSelectData: function () {
                if($("#editabledatatable").data('bs.datagrid17')) {
                    return $("#editabledatatable").data('bs.datagrid17').getSelectedRowData();
                }
            },
            initDataGrid: function () {
                $("#editabledatatable").datagrid17({
                    showPagination: true,
                    url: ServiceHost + "/api/invoke?SID=SYS_UserMgr_GetUserPageListWhere",
                    tableType: "single",
                    maxRecordLimit: 10000,
                    resizeCol: true,
                    countPerPage: 10,
                    PageSelectList: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100],
                    hiddenInps: [
                        {inpNm: "hidId", inpValue: "UserID"},
                        {inpNm: "hidName", inpValue: "Account"}
                    ],
                    success: function (rData) {

                    }
                }).data('bs.datagrid17');

                $("#editabledatatable").off("BODY_RENDER_COMPLETE").on("BODY_RENDER_COMPLETE", function (event, table) {
                    if (table.rowCount > 10000) {
                        NotifyWarning("共查询到" + table.rowCount + "条记录，数据量较大，请输入更精确的查询条件!");
                        table.rowCount = 0
                        table.totalPage = 0;
                        $("#editabledatatable").data('bs.datagrid17').clearData();
                    }
                });
            },
            //默认公司的复选框
            defaultorg: function () {
                var condition = getOldCondition(this);
                var that = this;
                var ischecked = $("#Userdefaultorg").is(':checked');
                if (ischecked) {
                    Syscommon.setSaveContent("Userdefaultorg", 1);
                    $("#Userdefaultorg").attr("checked", 'true');

                    getDataSync(ServiceHost + '/api/invoke?SID=SYS_UserMgr_GetLoginSysUser', 'get', null, function (data) {
                        if (data) {
                            var OrganiationName = data.CompanyName;
                            var OrganiationId = data.CompanyID;
                            $("#OrganiationName").val(OrganiationName);
                            orgNameBuf = OrganiationName;
                            $("#OrganizationID").val(OrganiationId);
                            orgIdBuf = OrganiationId;
                            that.LoadPageData();
                        }
                    });
                } else {
                    hasQueried = true;
                    Syscommon.setSaveContent("Userdefaultorg", 0);

                    $("#OrganizationID").val("");
                    orgIdBuf = $("#OrganizationID").val();
                    $("#OrganizationCode").val("");
                    orgCodeBuf = $("#OrganizationCode").val();
                    $("#OrganiationName").val("");
                    orgNameBuf = $("#OrganiationName").val();
                    if($("#Key").val()==''&&$("#Name").val()==''){
                        hasQueried=false;
                    }
                    if (!hasQueried) {
                        //that.LoadPageData();
                        $("#editabledatatable").data('bs.datagrid17').clearData();
                    }else{
                        that.LoadPageData();
                    }
                }
            },
            saveUserSelectCondition: function () {
                var condition = {
                    UserOrganizationID: $("#OrganizationID").val(),
                    UserOrganizationCode: $("#OrganizationCode").val(),
                    UserOrganiationName: $("#OrganiationName").val(),
                    UserKey: $("#Key").val(),
                    Name: $("#Name").val(),
                    IsSync: $('#hideSelIsSyncCustomerInfoSel').val(),
                    IsSyncName: $('#SelIsSyncCustomerInfoSel').text()
                };
                if (condition.UserOrganizationID!='' || condition.UserOrganizationCode!=''|| condition.UserKey!='' || condition.Name!=''|| condition.IsSync!='') {
                    saveCondition(this, condition);
                }
            },
            btnAdd: function (json) {
                var pathUrl = eval(json);
                this.saveUserSelectCondition();
                this.$router.push({path: pathUrl.Url, query: {flag: "add"}});
            },
            btnEdit: function (json) {
                var pathUrl = eval(json);
                this.saveUserSelectCondition();
                var datas = this.getSelectData();
                if (datas) {//说明列表有选中项
                    var UserId = datas.UserID;
                    this.$router.push({path: pathUrl.Url, query: {flag: "edit", UserId: encodeURIComponent(UserId)}});
                } else {
                    NotifyWarning("请选择要编辑的记录！");
                    return;
                }
            },
            btnDelete: function (json) {
                var pathUrl = eval(json);
                var datas =  this.getSelectData();
                if (datas) {//说明列表有选中项
                    var that = this;
                    bootbox.setDefaults("locale", "zh_CN");
                    bootbox.confirm("您确定要删除该记录吗？", function (ok) {
                        if (ok) {
                            var custId = datas.UserID;//内码
                            getDataAsync(ServiceHost + pathUrl.Url, "post", {"userId": JSON.stringify(custId)}, function (result) {
                                NotifySuccess("删除成功！");
                                that.LoadPageData();
                            });
                        }
                    });

                } else {
                    NotifyWarning("请选择要删除的记录！");
                    return;
                }
            },
            View: function (json) {
                var pathUrl = eval(json);
                this.saveUserSelectCondition();
                const viewUrl = pathUrl.Url;
                var datas =  this.getSelectData();
                if (datas) {//说明列表有选中项
                    var IdList = [];
                    var IdLists = $("#editabledatatable").data('bs.datagrid17').getAllRowData();
                    for (var i = 0; i < IdLists.length; i++) {
                        IdList.push(IdLists[i].UserID);
                    }
                    SaveGlobelData("BtnListPage_IDList", IdList);
                    var custId = datas.UserID;//内码
                    this.$router.push({path: viewUrl, query: {userId: custId, flag: "view"}});
                } else {
                    NotifyWarning("请选择要查看的记录！");
                    return;
                }
            },
            //分配角色
            showUserAssignRoleDialog: function (json) {
                var pathUrl = eval(json);
                this.saveUserSelectCondition();
                const updateUrl = pathUrl.Url;
                var datas =  this.getSelectData();
                if (datas) {//说明列表有选中项
                    var custId = datas.UserID;//内码
                    var UserName = datas.Account;//内码
                    this.$router.push({
                        path: updateUrl,
                        query: {userId: custId, UserName: encodeURIComponent(UserName)}
                    });
                }else {
                    NotifyWarning("请选择要分配角色的记录！");
                    return;
                }
            },
            //列表页面的查询
            search: function () {
                hasQueried = true;
                orgIdBuf = $("#OrganizationID").val();
                orgCodeBuf = $("#OrganizationCode").val();
                orgNameBuf = $("#OrganiationName").val();
                if ($.trim($("#Key").val()) == "" && $.trim($("#Name").val()) == "" && $.trim(orgIdBuf) == "" && $.trim(orgCodeBuf) == "" && $.trim(orgNameBuf) == "") {
                    hasQueried = false;
                    NotifyWarning("请输入查询条件!")
                } else {
                    this.LoadPageData();
                }
            },
            //列表页面的重置
            btnReset: function () {
                var ischecked = $("#Userdefaultorg").is(':checked');
                hasQueried = false;
                $.trim($("#Key").val(""));
                $.trim($("#Name").val(""));
                if (!ischecked) {
                    $.trim($("#OrganizationID").val(""));
                    orgIdBuf = "";
                    $.trim($("#OrganizationCode").val(""));
                    orgCodeBuf = "";
                    $.trim($("#OrganiationName").val(""));
                    orgNameBuf = "";
                    $("#editabledatatable").removeData('bs.datagrid');
                }
                var condition = {
                    UserOrganizationID: '',
                    UserOrganizationCode: '',
                    UserOrganiationName: '',
                    UserKey: '',
                    NameL: '',
                    IsSync: '',
                    IsSyncName: '',
                }
                saveCondition(this, condition);
                //this.LoadPageData();
                $("#hideSelIsSyncCustomerInfoSel").val("");
                $("#SelIsSyncCustomerInfoSel").html("是否已同步客户信息" + "<span class='caret'></span>");

                $("#editabledatatable").data('bs.datagrid17').clearData();
            },
            //列表页面查询框的回车查询
            autoSubmit: function () {
                if ($.trim($("#Key").val()) == "" && $.trim($("#Name").val()) == "" && $.trim(orgIdBuf) == "" && $.trim(orgCodeBuf) == "" && $.trim(orgNameBuf) == "") {
                    hasQueried = false;
                    NotifyWarning("请输入查询条件!")
                } else {
                    hasQueried = true;
                    this.LoadPageData();
                }
            },
            //同步用户信息
            UserInfo: function (json) {
                var pathUrl = eval(json);
                var datas = this.getSelectData();
                if (datas) {//说明列表有选中项
                    const Url = ServiceHost + pathUrl.Url;
                    var UserId = datas.UserID;
                    var RealName = datas.RealName;
                    var Alias = datas.Alias;
                    var Mobile = datas.Mobile;
                    var IsSync = datas.IsSync;
                    var that = this;
                    if (!Mobile) {
                        NotifyWarning("该用户没有手机号，请在编辑页面维护！");
                        return
                    }
                    var CustTypeSelector = "";
                    CustTypeSelector += '<div class="btn-group"><input type="radio" name="CustType" id="general" checked="checked" value="1" style="opacity:1;position: static"/></div><label for="general" class="btn-group" style="top:2px;margin-right: 10px">普通客户</label>';
                    CustTypeSelector += '<div class="btn-group"><input type="radio" name="CustType"id="charge" value="3" style="opacity:1;position: static"/></div><label  for="charge" class="btn-group"  style="top:2px">充电工</label>';
                    //auTypeSelector+='<div class="btn-group"><input type="radio" name="AUTypeSel" value="4" style="opacity:1;position: static"/></div><div class="btn-group">自定义sql</div>';
                    bootbox.dialog({
                        message: CustTypeSelector,
                        title: "请选择客户类型",
                        buttons: {
                            Cancel: {
                                label: "取消",
                                className: "btn-default",
                                callback: function () {

                                }
                            }
                            , OK: {
                                label: "确定",
                                className: "btn-primary",
                                callback: function () {
                                    var CustType = $('input[name="CustType"]:checked').val();
//                                    if (CustType == 1) {
//                                        var reg = /^1[3|5|6|7|8|9]{1}[0-9]{9}$/;
//                                        var flag = reg.test(Mobile);
//                                        if (!flag) {
//                                            NotifyWarning("手机号格式不正确，请在编辑页面维护正确的手机号");
//                                            return
//                                        }
//                                    }
                                    getDataSync(Url, "post",
                                            {
                                                // "filter": "{'ObjectId':'" + UserId + "','Name':'" + RealName + "','Mobile':'" + Mobile + "','Stacey':'" + Alias + "','CustType':'" + CustType + "'}"
                                                "filter": '{"ObjectId":"' + UserId + '","IsSync":"' + IsSync + '","Name":"' + RealName + '","Mobile":"' + Mobile + '","Stacey":"' + Alias + '","CustType":"' + CustType + '"}'
                                            }, function (result) {
                                                if (result == 1) {
                                                    NotifySuccess("操作成功");
                                                } else if (result == -1) {
                                                    NotifyWarning("手机号客户信息已存在客户使用！");
                                                } else {
                                                    NotifyError("操作失败");
                                                }
                                            });
                                    that.LoadPageData();
                                }
                            }
                        }
                    });

                } else {
                    NotifyWarning("请选择要同步信息的记录！");
                    return;
                }
            },
            //重置密码
            Password: function (json) {
                var pathUrl = eval(json);
                var datas =  this.getSelectData();
                if (datas) {//说明列表有选中项
                    $("#PassWord").modal("show");
                    var UserName = datas.Account;//内码
                    var UserId = datas.UserID;//内码
                    var secretKey = datas.SecretKey;
                    $.trim($("#passName").val(UserName));
                    $("#PassWord button.btn.btn-primary").off("click").on("click", function () {
                        var formData = $("#form").data("bootstrapValidator");
                        //$('#form').data('bootstrapValidator').enableFieldValidators('newPwd', true);
                        // $('#form').data('bootstrapValidator').enableFieldValidators('confirmPassword', true);
                        formData.validate();
                        //判断验证结果
                        var b = formData.isValid();
                        if (!b) {
                            return false;
                        }
                        var newPwd = $.trim($("#newPwd").val());
                        var confirmPassword = $.trim($("#confirmPassword").val());
                        if (newPwd && confirmPassword) {
                            if (newPwd == confirmPassword) {
                                getDataSync(ServiceHost + pathUrl.Url, "post", {
                                    "userId": "'" + UserId + "'",
                                    "oldPwd": "",
                                    "newPwd": "'" + newPwd + "'",
                                    "secretkey": "'" + secretKey + "'"
                                }, function (result) {
                                    if (result == 1) {
                                        NotifySuccess("保存成功");
                                    } else {
                                        NotifyError("保存失败");
                                    }
                                });
                            } else {
                                NotifyWarning("请确认密码是否相同！");
                                return false
                            }
                        } else if (!newPwd && confirmPassword) {
                            NotifyWarning("请输入新密码");
                            return false
                        } else if (newPwd && !confirmPassword) {
                            NotifyWarning("请输入确认密码");
                            return false
                        } else if (!newPwd && !confirmPassword) {
                            NotifyWarning("请输入新密码");
                            return false
                        }
                    })
                } else {
                    NotifyWarning("请选择要重置密码的记录！");
                    return;
                }
                $.trim($("#newPwd").val(""));
                $.trim($("#confirmPassword").val(""));

            },
            //确认密码的回车功能
            oldSubmit: function () {
                var newPwd = $.trim($("#newPwd").val());
                var confirmPassword = $.trim($("#confirmPassword").val());
                if (!newPwd && confirmPassword) {
                    NotifyWarning("请输入新密码");
                    return
                } else if (newPwd && !confirmPassword) {
                    NotifyWarning("请输入确认密码");
                    return
                } else if (!newPwd && !confirmPassword) {
                    NotifyWarning("请输入新密码");
                    return
                }
                $("#PassWord button.btn.btn-primary").trigger("click");
            },
            newSubmit: function () {
                var newPwd = $.trim($("#newPwd").val());
                var confirmPassword = $.trim($("#confirmPassword").val());
                if (!newPwd && confirmPassword) {
                    NotifyWarning("请输入新密码");
                    return
                } else if (newPwd && !confirmPassword) {
                    NotifyWarning("请输入确认密码");
                    return
                } else if (!newPwd && !confirmPassword) {
                    NotifyWarning("请输入新密码");
                    return
                }
                $("#PassWord button.btn.btn-primary").trigger("click");
            },
            //离职
            UserLeave: function (json) {
                var pathUrl = eval(json);
                var datas = this.getSelectData();
                var that = this;
                if (datas) {//说明列表有选中项
                    bootbox.setDefaults("locale", "zh_CN");
                    bootbox.confirm("您确定要办理该用户的离职么？", function (ok) {
                        if (ok) {
                            var custId = datas.UserID;//内码
                            getDataAsync(ServiceHost + pathUrl.Url, "post", {"userId": JSON.stringify(custId)}, function (result) {
                                if (result > 0) {
                                    NotifySuccess("操作成功！");
                                } else {
                                    NotifyError("操作失败");
                                }
                                that.LoadPageData();
                            });
                        }
                    });
                } else {
                    NotifyWarning("请选择要离职的用户！");
                    return;
                }
            },
            //复制用户权限
            CopyPurview: function (json) {
                var pathUrl = eval(json);
                var datas =  this.getSelectData();
                if (datas) {
                    var UserName = datas.Account;//内码
                    var UserId = datas.UserID;//内码
                    $.trim($("#selUserId").val(UserId));
                    $.trim($("#selUserName").val(UserName));
                    $("#copyPurview").modal("show");
                    $("#copyPurview button.btn.btn-primary").off("click").on("click", function () {
                        var copyType = [];
                        if ($('#Role').is(':checked')) {
                            copyType.push("Role");
                        }
                        if ($('#UserModule').is(':checked')) {
                            copyType.push("UserModule");
                        }
                        if ($('#UserButton').is(':checked')) {
                            copyType.push("UserButton");
                        }
                        if ($('#UserData').is(':checked')) {
                            copyType.push("UserData");
                        }
                        if (copyType.length == 0) {
                            NotifyWarning("请选择复制类型！");
                            return false
                        }

                        var selUserId = $("#selUserId").val();
                        var authUserId = $("#authUserId").val();
                        if (selUserId == authUserId) {
                            NotifyWarning("不允许相同用户复制权限！");
                            return false;
                        }
                        else if (!authUserId || !selUserId) {
                            NotifyWarning("请选择授权的用户！");
                            return false;
                        } else {
                            getDataSync(ServiceHost + pathUrl.Url, "post", {
                                "selUserId": JSON.stringify(selUserId),
                                "userId": JSON.stringify(authUserId),
                                "copyType": JSON.stringify(copyType.join(","))
                            }, function (result) {
                                if (result > 0) {
                                    NotifySuccess("操作成功！");
                                } else {
                                    NotifyError("操作失败");
                                }
                            });
                        }
                    })
                } else {
                    NotifyWarning("请选择要复制权限的记录！");
                }
                $.trim($("#authUserId").val(""));
                $("#authUserId").removeAttr("title");
                $.trim($("#authUserName").val(""));
                $("#authUserName").removeAttr("title");
                $('#Role').prop("checked", false);
                $('#UserModule').prop("checked", false);
                $('#UserButton').prop("checked", false);
                $('#UserData').prop("checked", false);
            },
            //复制权限 自定义帮助 关闭和叉号的功能
            Copyclose: function () {
                $.trim($("#selUserId").val(""));
                $("#selUserId").removeAttr("title");
                $.trim($("#selUserName").val(""));
                $("#selUserName").removeAttr("title");
                $.trim($("#authUserId").val(""));
                $("#authUserId").removeAttr("title");
                $.trim($("#authUserName").val(""));
                $("#authUserName").removeAttr("title");
            },
            //更换手机号功能
            btnUpdateMobile: function (json) {
                var pathUrl = eval(json);
                var datas =  this.getSelectData();
                if (datas) {//说明列表有选中项
                    var OldMobile = datas.Mobile;//原手机号
                    var IsSync = datas.IsSync;
                    if (!IsSync) {
                        NotifyWarning("该用户未同步客户信息，无法更换手机号！");
                        return;
                    }
                    if (!OldMobile) {
                        NotifyWarning("该用户原来没有手机号，无法更换手机号！");
                        return;
                    }
                    var MobileUserName = datas.RealName;//用户名
                    if (!MobileUserName) {
                        NotifyWarning("该用户没有姓名，请在编辑页面维护！");
                        return;
                    }
                    $("#UpdateMobile").modal("show");

                    var MobileUserId = datas.UserID;//内码
                    var MobileStacey = datas.Alias;//昵称
                    $("#MobileUserName").val(MobileUserName);
                    $("#OldMobile").val(OldMobile);
                    var that = this;
                    $("#UpdateMobile button.btn.btn-primary").off("click").on("click", function () {
                        //增加验证插件
                        var MobileformData = $("#Mobileform").data("bootstrapValidator");
                        MobileformData.validate();
                        //判断验证结果
                        var isUpdataMobile = MobileformData.isValid();
                        if (!isUpdataMobile) {
                            return false;
                        }
                        var NewMobile = $.trim($("#NewMobile").val());
                        if (!NewMobile) {
                            NotifyWarning("请填写新的手机号！");
                            return false
                        } else if (NewMobile == OldMobile) {
                            NotifyWarning("新手机号不能和原手机号相同！");
                            return false
                        }
                        else {
                            var UpdataFilter = {
                                "filter": "{'ObjectId':'" + MobileUserId + "','IsSync':'" + IsSync + "','NewMobile':'" + NewMobile + "','OldMobile':'" + OldMobile + "','Name':'" + MobileUserName + "','Stacey':'" + MobileStacey + "'}"
                            };
                            getDataSync(ServiceHost + pathUrl.Url, "post", UpdataFilter, function (result) {
                                if (result == 1) {
                                    NotifySuccess("更换成功");
                                    $("#UpdateMobile").modal("hide");
                                    that.LoadPageData();
                                    $("#MobileUserName").val("");
                                    $("#OldMobile").val("");
                                    $("#NewMobile").val("")
                                } else if (result == -1) {
                                    NotifyWarning("新手机号客户信息已存在客户使用！");
                                } else {
                                    NotifyError("更换失败");
                                }
                            });
                        }
                    })
                } else {
                    NotifyWarning("请选择要更换手机号的用户！");
                    return;
                }
                //  $('#form').data('bootstrapValidator').enableFieldValidators('newPwd', false);
                /// $('#form').data('bootstrapValidator').enableFieldValidators('confirmPassword', false);
            },
            //更换手机号的回车功能
            MobileSubmit: function () {
                $("#UpdateMobile button.btn.btn-primary").trigger("click");
            },
            //更换手机号  自定义帮助  关闭和叉号功能
            Mobileclose: function () {
                $.trim($("#NewMobile").val(""));
            },
            LoadPageData: function () {
                var keyValue = $.trim($("#Key").val());
                var name = $.trim($("#Name").val());
                if (keyValue == "") {
                    keyValue = null;
                }
                if (name == "") {
                    name = null;
                }
                //var ischecked = $("#IsSyncCustomerInfo").is(':checked');
                var isSyncCustomerInfo = $("#hideSelIsSyncCustomerInfoSel").val();
                isSyncCustomerInfo = isSyncCustomerInfo == '' ? null : isSyncCustomerInfo;

                var OrganizationID = $.trim(orgIdBuf);
                var OrganizationName = $.trim(orgNameBuf);
                var postData = {
                    "filter": {
                        "keywords": keyValue,
                        "ObjectID": OrganizationID,
                        "Data_FunctionID": "DF686BBF-2387-4259-886B-249022156A8A",
                        "Name": name,
                        "FilterKey": {"IsSync": isSyncCustomerInfo}
                    }
                };

                if (!OrganizationID || !OrganizationName) {
                    postData.filter.ObjectID = null;
                }
                var dataGrid = $("#editabledatatable").data('bs.datagrid17');
                if (dataGrid) {
                    dataGrid.searchByFilter({searchCond: postData});
                } else {
                    this.initDataGrid();
                    dataGrid = $("#editabledatatable").data('bs.datagrid17');
                    dataGrid.searchByFilter({searchCond: postData});
                }
            },
            UserModal: function (flag) {
                $('#UserModal').modal('show');
                if (flag == 0) {
                    this.UserType = '0'
                } else {
                    this.UserType = '1'
                }
                var keywords = $('#keywords').val();
                if (keywords != '' || this.SearchType != '') {
                    this.SearchType = '';
                    $('#keywords').val('');
                    var userdatatabledata = $("#userdatatable").data('bs.datagrid17');
                    if (userdatatabledata) {
                        window.setTimeout(function () {
                            userdatatabledata.clearData()
                        }, 200)
                    }
                }
            },
            //选择模块帮助里的查询
            btnsearch: function () {
                var keywords = $('#keywords').val();
                if (keywords == '') {
                    NotifyWarning('请输入查询条件！');
                    return
                }
                this.LoadUserPageData(keywords, this.SearchType);
            },
            //选择模块帮助的重置
            btnreset: function () {
                this.SearchType = '';
                $('#keywords').val('');
                $("#userdatatable").data('bs.datagrid17').clearData();
            },
            LoadUserPageData: function (keywords, SearchType) {
                var userid = '',
                        username = '';
                if (this.UserType == '0') {
                    userid = $('#selUserId');
                    username = $('#selUserName');
                } else {
                    userid = $('#authUserId');
                    username = $('#authUserName');
                }
                var _this = this;
                let dataUrl = ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetUserList&help=true";
                var postData = {
                    "filter": {
                        "FieldName": SearchType,
                        "FieldValue": keywords,
                        'FilterKey': {
                            'Data_FunctionID': 'DF686BBF-2387-4259-886B-249022156A8A',
                            'Enabled': '1'
                        }
                    }
                };
                $("#userdatatable").datagrid17({
                    showPagination: true,
                    url: dataUrl,
                    tableType: "single",
                    resizeCol: true,
                    maxRecordLimit: 10000,
                    PageSelectList: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100],
                    cookieEnable: false,
                    hiddenInps: [
                        {inpNm: "hidId", inpValue: "UserID"},
                        {inpNm: "hidName", inpValue: "Account"}
                    ],
                    success: function (rData) {
                    },

                }).data('bs.datagrid17').searchByFilter({searchCond: postData});
            },
            save: function () {
                var userid = '',
                        username = '';
                if (this.UserType == '0') {
                    userid = $('#selUserId');
                    username = $('#selUserName');
                } else {
                    userid = $('#authUserId');
                    username = $('#authUserName');
                }
                var obj = $("#userdatatable").data('bs.datagrid17');
                if (!obj) {
                    userid.val('');
                    username.val('');
                } else {
                    let datasSel = obj.getSelectedRowData();
                    if (datasSel) {
                        var id = datasSel.UserID,
                                name = datasSel.Account;
                        userid.val(id);
                        username.val(name);

                    } else {
                        userid.val('');
                        username.val('');
                    }

                }
            }
        }
    }

</script>