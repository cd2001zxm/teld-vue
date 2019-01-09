<template>
    <LayoutDetailPage ssid="BtnListPage_IDList" v-on:idchanged="idchanged" v-bind:idval="this.$route.query.userId">
        <form slot="DetailContent" id="form" method="" class="form-horizontal bv-form">
            <ul class="nav nav-tabs" id="aaa">
                <li id="Set"    data-vae="0" class="active">
                    <a  data-toggle="tab">基本信息</a>
                </li>
                <li id="LItem"  data-vae="1">
                    <a data-toggle="tab">拥有角色</a>
                </li>
                <li  id="LIMent" data-vae="2">
                    <a data-toggle="tab">功能权限</a>
                </li>
                <li  id="LIBtn" data-vae="3">
                    <a data-toggle="tab">按钮权限</a>
                </li>
                <li  data-vae="4" id="data">
                    <a data-toggle="tab">数据权限</a>
                </li>
            </ul>
            <div class="tab-content" id="bbb"  style="overflow:hidden" >
                <!--基本信息-->
                <div id="basic"   data-vae="1">
                        <div class="tabbable">
                            <div class="tab-pane in">
                                <div class="well widget-body">
                                    <div class="row">
                                        <!-- 第一行-->
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">账号</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="" v-bind:value="basic.Account" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">姓名</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="" v-bind:value="basic.RealName" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 第二行-->
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">国际区号</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="" v-bind:value="basic.AreaCode" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">手机号</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="" v-bind:value="basic.Mobile" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 第三行-->
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">电子邮件</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="" v-bind:value="basic.Email" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">职位</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="DutyID" id="DutyID"  v-bind:value="basic.DutyID" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">登录密码</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="" value="******" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">有效性</label>
                                                    <div class="col-sm-8  ">
                                                        <div class="btn-group">
                                                            <label class="control-label">
                                                                <input type="checkbox" class="checkbox-slider" data-validate="false" checked="checked" id="Enabled" v-bind:checked="basic.Enabled==1" disabled/>
                                                                <span class="text"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">默认公司</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="" v-bind:value="basic.CompanyName" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">默认部门</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="" v-bind:value="basic.DepartmentName" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">默认工作组</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm"  v-bind:value="basic.WorkgroupName" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">企业客户</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm"  v-bind:value="basic.BusiCustName" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">是否已同步客户信息</label>
                                                    <div class="btn-group">
                                                        <label class="control-label">
                                                            <input type="checkbox" class="checkbox-slider" data-validate="false" checked="checked" id="IsSync" v-bind:checked="basic.IsSync==1" disabled/>
                                                            <span class="text"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">客户内码</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control input-sm" name="CustomerId" id="CustomerId"  v-bind:value="basic.CustomerId" readonly="readonly"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">其它组织机构</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 " id="box">
                                                        <div class="input-group" id="otherDepartment">
                                                            <input type="hidden" name="otherDepartmentID" id="otherDepartmentID"  v-bind:value="otherDepartmentID">
                                                            <input type="hidden" name="otherDepartmentName" id="otherDepartmentName" class="form-control input-sm" readonly="readonly"  v-bind:value="DepartmentName">
                                                            <div class="form-control input-sm" id="Tagrs" style="height: 66px;overflow-y: auto;background-color: #eee;"></div>
                                                            <span class="input-group-btn" style="vertical-align: top">
                                                                    <button class="btn btn-default shiny btn-sm" data-toggle="modal"  type="button" data-validate="false"  disabled="disabled"><i class=" fa fa-ellipsis-h"></i></button>
                                                                </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-4 control-label ">说明</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                                        <textarea name="" id="" cols="3" rows="3" style="resize:none;font-size:12px;" class="form-control" maxlength="144" v-bind:value="basic.Description" readonly="readonly"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <!--拥有角色-->
                <div id="haverole" style="display: none" class="table-responsive"  data-vae="2">
                        <div style="margin-bottom: 15px">
                            <div  class="btn-group">
                                <div class="input-group helper-group" id="RoleSortDiv" style="width: 200px">
                                    <input type="hidden" name="RoleSortId" id="RoleSortId"data-recive-helper-data="id">
                                    <input type="hidden" name="Category" id="Category" data-recive-helper-data="code">
                                    <input type="text" placeholder="角色分类" name="RoleSortName" id="RoleSortName" class="form-control input-sm" readonly="readonly" data-recive-helper-data="name">
                                    <span class="input-group-btn">
                                                            <button class="btn btn-default shiny btn-sm" data-toggle="modal" data-helper="RoleSortHelp" type="button" data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                                        </span>
                                </div>
                            </div>
                            <div class="btn-group">
                                <div class="input-group helper-group" style=" float: left; width: 200px">
                                    <input type="text" class="form-control input-sm" id="rolekeywords"
                                           name="rolekeywords"
                                           @keyup.enter="roleSubmit" data-recive-helper-data="rolekeywords"
                                           placeholder="编号、名称">
                                </div>
                            </div>
                            <!--v-on:keyup.enter="autoSubmit"-->
                            <a  href="javascript:void(0);" class="btn btn-default" v-on:click="roleSearch">
                                <i class="fa fa-search"></i>查 询
                            </a>
                            <a  href="javascript:void(0);" class="btn btn-default" v-on:click="roleReset" >
                                <i class="fa fa-repeat"></i>重 置
                            </a>
                        </div>
                        <div>
                            <div  id="userhaverolediv" class="table-responsive">
                                <table   class="table table-striped table-hover table-bordered max-width-table" id="userroleTable" style="table-layout:fixed !important">
                                    <thead>
                                    <tr role="row">
                                        <th style="width: 50px;"  class="text-center Code_col">
                                            <label for="">序号</label>
                                        </th>
                                        <th  class="text-center"  style="width: 100px;"  data-field="field:Code,cssClass:text-left,hasTitle:true,isTree:true">
                                            <label>编号</label>
                                        </th>
                                        <th  class="text-center"   style="width: 100px;" data-field="field:FullName,cssClass:text-left,hasTitle:true">
                                            <label>名称</label>
                                        </th>
                                        <th  class="text-center"   style="width: 100px;" data-field="field:ItemName,cssClass:text-left,hasTitle:true">
                                            <label>角色分类</label>
                                        </th>
                                        <!-- <th  class="text-center" id="UserDataViewth" style="width:80px"   data-field="cssClass:text-left,hasTitle:true,type:arch,archName:查看,archMethod:rebindInput" >
                                             <label></label>
                                         </th>-->
                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                </div>
                <!--模块权限-->
                <div id="haveprem" data-vae="3" class="table-responsive" style="display: none">
                        <!--查询区-->
                        <div style="margin-bottom: 15px">
                            <div class="btn-group">
                                <div class="input-group helper-group" style=" float: left; width: 150px"id="ApplicationHelpDiv">
                                    <input type="hidden" id="ApplicationID" name="ApplicationID" data-recive-helper-data="id">
                                    <input type="text" class="form-control input-sm" id="ApplicationName" name="ApplicationName" data-recive-helper-data="name"  placeholder="系统应用" readonly="readonly" style="width: 160px">
                                    <span class="input-group-btn" >
                                            <button class="btn btn-default shiny btn-sm" data-toggle="modal" data-helper="UserViewPreApplicationHelp" type="button" id="btnApplication">
                                                <i class=" fa fa-ellipsis-h"></i>
                                            </button>
                                        </span>
                                </div>
                            </div>
                            <div class="btn-group">
                                <div class="input-group helper-group" style=" float: left; width: 200px">
                                    <input type="text" class="form-control input-sm"  id="prekeywords" name="prekeywords"
                                           v-on:keyup.enter="preSubmit" data-recive-helper-data="keywords"  placeholder="编号、名称">
                                </div>
                            </div>
                            <div class="btn-group">
                                <div id="AuthorizeExplain1">
                                </div>
                            </div>
                            <!--v-on:keyup.enter="autoSubmit"-->
                            <div class="btn-group" style="margin-left: 10px">
                                <label class="control-label " >
                                    <input type="checkbox"  class="checkbox-slider" data-validate="false"id="UserMenuIsCheck"v-on:click="UserMenuIsCheck"/>
                                    <span class="text" ></span>
                                </label>
                                <label id="IsInnerOrganizeabel" style="padding-right: 10px;position:relative;top:3px"> 显示未拥有的权限</label>
                            </div>
                            <a id="BtnSearch" href="javascript:void(0);" class="btn btn-default" v-on:click="preSearch">
                                <i class="fa fa-search"></i>查 询
                            </a>
                            <a id="BtnReset" href="javascript:void(0);" class="btn btn-default" v-on:click="preRest" >
                                <i class="fa fa-repeat"></i>重 置
                            </a>
                            <a  href="javascript:void(0);" class="btn btn-default" id="UserMenubtn" v-on:click="MenuRight" >
                                <i class="fa fa-edit"></i>功能授权
                            </a>

                        </div>
                        <div id="UserhaveMenuDiv" >
                            <div class="table-responsive" id="HavemenuDiv">
                                <table class="table table-striped table-hover table-bordered max-width-table" id="usermenuTable"  style="table-layout:fixed !important">
                                    <thead>
                                    <tr role="row">
                                        <th style="width: 50px;"  class="text-center Code_col">
                                            <label for="">序号</label>
                                        </th>
                                        <th  class="text-center" style="width:80px"
                                             data-field="field:Code,cssClass:text-left,hasTitle:true">
                                            <label>编号</label>
                                        </th>
                                        <th  class="text-center" style="width:200px"
                                             data-field="field:Name,cssClass:text-left,hasTitle:true,isTree:true">
                                            <label>名称</label>
                                        </th>
                                        <th  class="text-center" style="width:100px"
                                             data-field="field:Remark,cssClass:text-left,hasTitle:true">
                                            <label>授权说明</label>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
                <!-- 按钮权限-->
                <div id="haveBtn" data-vae="4" style="display: none">
                    <!-- 动态加载所有应用的按钮-->
                    <div class="well widget-body">
                        <template>
                            <div class="table-toolbar" style="text-align:left;" id="ButtonGroup"></div>
                        </template>
                    </div>
                    <!--数据展示区-->
                    <!--模块列表-->
                    <div style="padding-right: 10px">
                        <input type="hidden" id="MenuId">
                        <input type="hidden" id="IsReferenced">
                        <input type="hidden" id="OldMenuID">
                        <input type="hidden" id="AppId">
                        <div  class="widget-body col-lg-5 col-md-5 col-sm-5  col-xs-12" style=" margin-bottom:10px;">
                            <div class="table-responsive" id="MenuDiv" style="overflow: auto;">
                                <table style="table-layout:fixed" class="table table-striped table-hover table-bordered max-width-table" id="menutable">
                                    <thead>
                                    <tr role="row">
                                        <th style="width: 50px;"  class="text-center Code_col">
                                            <label for="">序号</label>
                                        </th>
                                        <th style="width: 100px; text-align: center" data-field="field:Code,cssClass:text-left,hasTitle:true" class="Code_col ">
                                            <label for="">编号</label>
                                        </th>
                                        <th style="width: 450px; text-align: center" data-field="field:Name,cssClass:text-left,hasTitle:true,isTree:true" class="Code_col ">
                                            <label for="">名称</label>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody id="menutbody">
                                    <tr>
                                        <td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="3">无记录</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!--按钮列表-->
                        <div class="widget-body col-lg-7 col-md-7 col-sm-7 col-xs-12"  style="margin-bottom: 10px; " id="btn">
                            <div class="well widget-body" style="padding: 5px" id="Userbtnrightdiv" >
                                <div class="widget-buttons " id="Buttons" style="margin-bottom: 3px">
                                    <input type="hidden" value="de26342d-08b1-457a-b76f-4b34d5a3b340">
                                    <button type="button" class=" btn " href="javascript:void(0);" style="padding: 4px 10px;" v-on:click.prevent="userbtnright">
                                        <i class="fa fa-edit" style="font-size: 13px;">按钮授权</i>
                                    </button>
                                </div>
                                <div class="btn-group" style="margin-left: 5px">
                                    <label class="control-label " >
                                        <input type="checkbox"  class="checkbox-slider" data-validate="false"id="UserBtnIsCheck" v-on:click="UserBtnIsCheck" />
                                        <span class="text" ></span>
                                    </label>
                                    <label  style="position:relative;top:3px">显示未拥有的权限</label>
                                </div>
                            </div>
                            <div class="table-responsive" style="overflow-x: auto;">
                                <table style="table-layout:fixed" class="table table-striped table-hover table-bordered max-width-table" id="BtnTable">
                                    <thead>
                                    <tr role="row">
                                        <th style="width: 50px;"  class="text-center Code_col">
                                            <label for="">序号</label>
                                        </th>
                                        <th style="width: 65px; text-align: center" data-field="field:Code,cssClass:text-left,hasTitle:true">
                                            <label for="">编号</label>
                                        </th>
                                        <th style=" width: 100px; text-align: center" data-field="field:Name,cssClass:text-left,hasTitle:true">
                                            <label for="">名称</label>
                                        </th>
                                        <th style="width: 100px; text-align: center" data-field="field:Remark,cssClass:text-left,hasTitle:true">
                                            <label for="">授权说明</label>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody id="btntbody">
                                    <tr>
                                        <td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="4">无记录</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 数据权限-->
                <div id="havepdata" data-vae="5" class="table-responsive" style="display: none">
                    <!--查询区-->
                        <div style="margin-bottom: 15px">
                            <div class="btn-group">
                                <div id="AuthorizeType1">
                                </div>
                            </div>
                            <div class="btn-group">
                                <div id="AuthorizeExplain2">
                                </div>
                            </div>
                            <div class="btn-group">
                                <div class="input-group helper-group" style=" float: left; width: 200px">
                                    <input type="text" class="form-control input-sm"  id="datakeywords" name="datakeywords"
                                           v-on:keyup.enter="dataSubmit"      data-recive-helper-data="keywords"  placeholder="授权对象名称">
                                </div>
                            </div>
                            <!--v-on:keyup.enter="autoSubmit"-->
                            <div class="btn-group" style="margin-left: 10px">
                                <label class="control-label " >
                                    <input type="checkbox"  class="checkbox-slider" data-validate="false"id="UserDataIsCheck" v-on:click="UserDataIsCheck" />
                                    <span class="text" ></span>
                                </label>
                                <label  style="padding-right: 10px;position:relative;top:3px"> 显示未拥有的权限</label>
                            </div>
                            <a  href="javascript:void(0);" class="btn btn-default"  v-on:click="dataSearch">
                                <i class="fa fa-search"></i>查 询
                            </a>
                            <a  href="javascript:void(0);" class="btn btn-default" v-on:click="dataRest">
                                <i class="fa fa-repeat"></i>重 置
                            </a>
                            <a  href="javascript:void(0);" class="btn btn-default"  id="UserDatabtn"  v-on:click="dataRight" >
                                <i class="fa fa-edit"></i>数据授权
                            </a>
                        </div>
                        <div>
                            <div class="table-responsive " id="userhavedatadiv">
                                <table class="table table-striped table-hover table-bordered max-width-table" id="datamenuTable"  style="table-layout:fixed !important">
                                    <thead>
                                    <tr role="row">
                                        <th style="width: 50px;"  class="text-center Code_col">
                                            <label for="">序号</label>
                                        </th>
                                        <th  class="text-center" style="width: 100px;" data-field="field:Name,cssClass:text-left,hasTitle:true,isTree:true">
                                            <label>授权对象名称</label>
                                        </th>
                                        <th  class="text-center"   style="width: 100px;" data-field="field:AUType,cssClass:text-left,hasTitle:true">
                                            <label>授权类型</label>
                                        </th>
                                        <th  class="text-center"   style="width: 100px;" data-field="field:Remark,cssClass:text-left,hasTitle:true">
                                            <label>授权说明</label>
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
        </form>
    </LayoutDetailPage>
</template>
<style>
    @media screen and (max-width: 529px){
        .nav-tabs>li {
            width:20%!important
        }
    }
    #form{
        margin-top: -12px;
        margin-bottom: -12px;
    }
</style>
<script>
    // import LayoutDetailPage from "../teld-vue-frame/vue/LayoutDetailPage.vue"
    import Syscommon from "../../../js/Syscommon"
    import LayoutDetailPage from "teld-vue-frame/vue/LayoutDetailPage.vue"
/*
    import LayoutSingleList from "teld-vue-frame/vue/LayoutSingleList.vue"
*/
    //var nubs=[];
    var titleName;//面包屑的用户名
    var defaultcntperpage;//初始化列表的分页选择
    var rolecntperpage;//拥有角色列表的分页选择
    var menucntperpage;//拥有菜单列表的分页选择
    var datacntperpage;//拥有数据权限列表的分页选择
    var defaultArr =[];
    let  defluttabwidth=$(window).width();          //浏览器时下窗口可视区域高度
    export default{
        data () {
            var rows = {};
            var userId = this.$route.query.userId;
            getDataSync(ServiceHost + "/api/invoke?SID=SYS_UserMgr_GetSysUserById", "post", {"userId": "'" + userId + "'"},
                    function (data) {
                        if (data.Birthday != null) {
                            var date = new Date(data.Birthday.toString());
                            var birthday = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                            data.Birthday = birthday;
                        }
                        if(data.CompanyID){
                            defaultArr.push(data.CompanyID);
                        }
                        if(data.DepartmentID){
                            defaultArr.push(data.DepartmentID);
                        }
                        if(data.WorkgroupID){
                            defaultArr.push(data.WorkgroupID);
                        }
                        titleName=data.Account;
                        if(isPC()){
                            var  crumbs=$("#breadcrumbs small");
                            // var title=crumbs.html();
                            crumbs.html("<i class='fa fa-angle-right'></i>"+"用户管理"+" <i class='fa fa-angle-right'></i>"+ "查看"+ " <i class='fa fa-angle-right'></i>"+titleName);
                        }
                        rows.basic = data;

                    });
            rows.nubs = {};

            return rows;
//            var myWidth=($("#box").width() - 33) + 'px'
//            return myWidth;

        },
        components:{
            'LayoutDetailPage':LayoutDetailPage,
        },
        mounted(){
            window.onresize = function windowResize () {
                // 通过捕获系统的onresize事件触发我们需要执行的事件
                var nowWidth = ($("#box").width() - 33) + 'px';
                $("#Tagrs").css("width",nowWidth);
            }
            var w=$("#box").width()-33;
            $("#Tagrs").css("width",w+"px");
            $("#UserMenuIsCheck").off().on('click',function () {
                $("#UserMenuIsCheck").prop('disabled',true);
            });
            $("#RoleSortDiv").helper17({
                multi: false,
                showPagination: true
            });
            $("#AuthorizeExplain1").select({
                id: "AuthorizeExplain1Sel",
                blankLabel: "授权说明",
                hasBlankOption: true,
                dataSource: function () {
                    var data = [];
                    data.push({"Code": "1", "Name": "用户授权"});
                    data.push({"Code": "2", "Name": "角色授权"});
                    return data;
                },
                onSelect: function () {
                }
            });
            $("#AuthorizeExplain2").select({
                id: "AuthorizeExplain2Sel",
                blankLabel: "授权说明",
                hasBlankOption: true,
                dataSource: function () {
                    var data = [];
                    data.push({"Code": "1", "Name": "用户授权"});
                    data.push({"Code": "2", "Name": "角色授权"});
                    return data;
                },
                onSelect: function () {
                }
            });
            $("#AuthorizeType1").select({
                id: "AuthorizeType1Sel",
                blankLabel: "授权类型",
                hasBlankOption: true,
                dataSource: function () {
                    var data = [];
                    data.push({"Code": "1", "Name": "全部"});
                    data.push({"Code": "2", "Name": "明细"});
                    data.push({"Code": "3", "Name": "规则"});
                    return data;
                },
                onSelect: function () {
                }
            });
            //初始话列表的分页选择
            defaultcntperpage=readCookie("cntperpage");
            //返回按钮的路由跳转
            $("div[name='ButtonGroup']").each(function (e) {
                $(this).find("div").first().off("click").on("click",function(e){
                    page.$router.push({path:"/User/UserListPage?mid=726a332c-62cc-4ba3-8b33-76ae228d919e"});
                })
            })

            //模块权限的帮助
            $("#ApplicationHelpDiv").helper17({
                multi: false,
                showPagination: true,
                filterKey:function () {
                    return{
                        Data_FunctionID:"89295BCE-2DC2-4FC9-AD5E-62E4A25A3A74",
                        Data_PermissionsID:"2D3D065B-FEF2-4EEB-BBA0-A2F4ABA07973"
                    }
                },
                filterHtml: function (tHtml) {
                    return tHtml ? tHtml
                            : '<li><a href="javascript:void(0);" data-code="">全部</a></li>'
                    + '<li><a href="javascript:void(0);" data-code="Code">编码</a></li>'
                    + '<li><a href="javascript:void(0);" data-code="Name">简称</a></li>';
                }
            });
            //调整按钮权限的 模块列表和按钮列表在手机端的样式
            if(defluttabwidth>=768){
                $("#btn").css("left","10px")
            }else{
                $("#btn").css("left","0")
            }
            //浏览器窗口的监听事件
            $(window).resize(function () {          //当浏览器大小变化时
                let tabwidth=$(window).width();          //浏览器时下窗口可视区域高度
                if(tabwidth>=768){
                    $("#btn").css("left","10px")
                }else{
                    $("#btn").css("left","0")
                }
            });
            var page=this;
            //上一条 下一条切换时 先清空其他组织机构
            $("#Tagrs").html("");
            //加载其他组织机构
            this.bindOrgVal();
            //tab页的切换功能
            $("#aaa li").click(function(){
                $('#aaa li').removeClass('active');
                $(this).addClass('active');
                var nub= $(this).attr('data-vae');
                nub= parseInt(nub);
                $('#bbb>div').hide();
                var cc=$("#bbb>div")[nub];
                cc.style.display= 'block';

                if(!page.$data.nubs.hasOwnProperty(nub)){
                    page.$data.nubs[nub] = nub;
                    if(nub==1){
                        page.loadUserRoleTablePageData();//拥有角色
                    }else if(nub==2){
                        $("#UserMenuIsCheck").prop('disabled',true);
                        $("#prekeywords").val("");
                        $("#ApplicationName").val("");
                        $("#ApplicationID").val("");
                        $("#hideAuthorizeExplain1Sel").val("");
                        $("#AuthorizeExplain1Sel").html("授权说明" + "<span class='caret'></span>");
                        page.loadUserMenuTablePageData();//模块权限
                    }else if(nub==3){
                        page.getAppBtn();//拥有的按钮权限
                    }else{
                        $("#datakeywords").val("");
                        $("#hideAuthorizeExplain2Sel").val("");
                        $("#AuthorizeExplain2Sel").html("授权说明" + "<span class='caret'></span>");
                        $("#hideAuthorizeType1Sel").val("");
                        $("#AuthorizeType1Sel").html("授权类型" + "<span class='caret'></span>");
                        page.loadUserdataMenuTablePageData();//拥有数据
                    }
                }else if(page.$data.nubs.hasOwnProperty(nub)){
                    //如果有分页的选项有调整  按tab重新加载列表
                    if(nub==1){
                        if(rolecntperpage!=defaultcntperpage){
                            $("#rolekeywords").val("");
                            $("#gridBodyDiv_userroleTable").remove();
                            $("#gridHeaderDiv_userroleTable").remove();
                            $("#userroleTable").removeData('bs.datagrid17');
                            //$("#Rolemember  .table-footer").remove();
                            page.loadUserRoleTablePageData();//拥有角色
                        }
                    }else if(nub==4){
                        if(datacntperpage!=defaultcntperpage){
                            $("#datakeywords").val("");
                            $("#hideAuthorizeExplain2Sel").val("");
                            $("#AuthorizeExplain2Sel").html("授权说明" + "<span class='caret'></span>");
                            $("#hideAuthorizeType1Sel").val("");
                            $("#AuthorizeType1Sel").html("授权类型" + "<span class='caret'></span>");
                            $("#gridBodyDiv_datamenuTable").remove();
                            $("#gridHeaderDiv_datamenuTable").remove();
                            $("#datamenuTable").removeData('bs.datagrid17');
                            page.loadUserdataMenuTablePageData();//拥有数据
                        }
                    }else if(nub==2){
                        if(menucntperpage!=datacntperpage){
                            $("#UserMenuIsCheck").prop('disabled',true);
                            $("#prekeywords").val("");
                            $("#ApplicationName").val("");
                            $("#ApplicationID").val("");
                            $("#hideAuthorizeExplain1Sel").val("");
                            $("#AuthorizeExplain1Sel").html("授权说明" + "<span class='caret'></span>");
                            $("#gridBodyDiv_usermenuTable").remove();
                            $("#gridHeaderDiv_usermenuTable").remove();
                            $("#usermenuTable").removeData('bs.datagrid17');
                            $("#usermenuTable").removeData('bs.treegrid17');
                            page.loadUserMenuTablePageData();//模块权限
                        }
                    }
                }
            });
            //模块权限 按钮权限 数据权限的tab记忆查询
            var Oldcondition= Syscommon.getSaveContent("Formcondition");
            if(Oldcondition){
                Oldcondition = eval('(' + Oldcondition + ')');
                //模块权限的记忆查询
                if(Oldcondition.tabflag=="Usermenutable"){
                    $('#aaa li').removeClass('active');
                    $("#LIMent").addClass('active');
                    $("#UserMenuIsCheck").prop('disabled',true);
                    $('#bbb>div').hide();
                    var cc=$("#bbb>div")[2];
                    cc.style.display= 'block';
                    $("#ApplicationID").val(Oldcondition.ApplicationID);
                    $("#ApplicationName").val(Oldcondition.ApplicationName);
                    $("#prekeywords").val(Oldcondition.prekeywords);
                    if(Oldcondition.IsCheck==1){
                        $("#UserMenuIsCheck").prop("checked",true);
                    }else{
                        $("#UserMenuIsCheck").prop("checked",false);
                    }
                    if(Oldcondition.prekeywords){
                        this.loadUserMenuTablePageData("searchMenu");//查询后的模块列表（datagrid列表）
                    }else{
                        var ischecked= $("#UserMenuIsCheck").is(':checked');
                        if(ischecked){
                            this.loadUserMenuTablePageData("searchMenu");//查询后的模块列表（datagrid列表）
                        }else{
                            this.loadUserMenuTablePageData()//未查询后的模块列表(treegrid列表)
                        }

                    }

                }//按钮权限的记忆查询
                else if(Oldcondition.tabflag=="Userbtntable"){
                    $('#aaa li').removeClass('active');
                    $("#LIBtn").addClass('active');
                    $('#bbb>div').hide();
                    var cc=$("#bbb>div")[3];
                    cc.style.display= 'block';
                    $("#AppId").val(Oldcondition.ApplicationID);
                    $("#MenuId").val(Oldcondition.MenuId);
                    this.getAppBtn();//按钮权限tab页的应用按钮组列表加载
                    //用户按钮权限返回后 如果有AppId  则选中应用按钮组
                    if(Oldcondition.ApplicationID ){
                        var ButtonSet= $("#Buttons .authbutton");
                        for(var i=0;i<ButtonSet.length;i++){
                            var ButtonAppID = $(ButtonSet[i]).prev().val();//应用按钮组中 某一个按钮的APPAid
                            if(ButtonAppID == Oldcondition.ApplicationID ){
                                var SeletBtn=$(ButtonSet[i]);//选中的按钮
                                SeletBtn.attr("class","btn btn-default btn-primary");
                                //dataType.setIdAttribute("class","authbutton btn btn-primary")
                                break;
                            }
                        }
                        this.LoadMenuPage(Oldcondition.ApplicationID);

                    }
                    //用户按钮权限返回后 如果有menuID  则继续加载按钮列表
                    if(Oldcondition.MenuId){
                        if(Oldcondition.IsCheck==1){
                            $("#UserBtnIsCheck").prop("checked",true);
                        }else{
                            $("#UserBtnIsCheck").prop("checked",false);
                        }
                        this.LoadPageData();
                    }
                }//数据权限的记忆查询
                else if(Oldcondition.tabflag=="Userdatatable"){
                    $('#aaa li').removeClass('active');
                    $("#data").addClass('active');
                    $('#bbb>div').hide();
                    var cc=$("#bbb>div")[4];
                    cc.style.display= 'block';
                    $("#datakeywords").val(Oldcondition.datakeywords);
                    if(Oldcondition.IsCheck==1){
                        $("#UserDataIsCheck").prop("checked",true);
                    }else{
                        $("#UserDataIsCheck").prop("checked",false);
                    }
                    this.loadUserdataMenuTablePageData();//拥有数据
                }
            }

        },
        methods : {
            //数据权限tab页  查看列的跳转
            rebindInput:function (rowData) {
                var Remark=rowData.Remark;
                if(Remark=="未授权"){
                    NotifyWarning("未授权的权限无法查看！");
                    return;
                }
                let IdList = window.sessionStorage.getItem("BtnListPage_IDList");
                SaveGlobelData("viewbtn",IdList);
                var UserId= this.$route.query.userId;
                var ObjectID= rowData.ObjectID;
                var ownerType=rowData.OwnerType;
                var ResultID=rowData.ResultID;
                var AUType=rowData.AUType;
                var datakeywords=$("#datakeywords").val();
                var Formcondition=JSON.stringify({
                    tabflag:"Userdatatable",
                    datakeywords:datakeywords
                });
                Syscommon.setSaveContent("Formcondition",Formcondition);
                var url="";
                if(ownerType=="1")
                {
                    if(AUType=="全部"){
                        url="/Auth/AllAuthViewUser";
                    }else if(AUType=="明细"){
                        url="/Auth/DetailAuthViewUser";
                    }else if(AUType=="规则"){
                        url="/Auth/RuleAuthViewUser";
                    }
                }
                else if(ownerType=="2"){
                    if(AUType=="全部"){
                        url="/Auth/AllAuthViewRole";
                    }else if(AUType=="明细"){
                        url="/Auth/DetailAuthViewRole";
                    }else if(AUType=="规则"){
                        url="/Auth/RuleAuthViewRole";
                    }
                }
                this.$router.push({path:url,query:{id : ResultID,ownerType:ownerType,auObjectId:ObjectID,flag:"UserView",UserId:UserId}});
            },
            idchanged:function (param) {
                //debugger
                var UserID = param;
                var rows={};
                getDataSync
                (ServiceHost+ "/api/invoke?SID=SYS_UserMgr_GetSysUserById","post",{"userId":"'"+UserID+"'" },
                        function (data) {
                            if(data.Birthday != null) {
                                var date = new Date(data.Birthday.toString());
                                var birthday = date.getFullYear() + "-" + (date.getMonth() + 1
                                        ) + "-" + date.getDate();
                                data.Birthday = birthday;
                            }
                            if(data.CompanyID){
                                defaultArr.push(data.CompanyID);
                            }
                            if(data.DepartmentID){
                                defaultArr.push(data.DepartmentID);
                            }
                            if(data.WorkgroupID){
                                defaultArr.push(data.WorkgroupID);
                            }
                            titleName=data.Account;
                            if(isPC()){
                                var  crumbs=$("#breadcrumbs small");
                                // var title=crumbs.html();
                                crumbs.html("<i class='fa fa-angle-right'></i>"+"用户管理"+" <i class='fa fa-angle-right'></i>"+ "查看"+ " <i class='fa fa-angle-right'></i>"+titleName);
                            }
                            rows.basic = data;
                        });
                copyObject2Object(rows,this);
                this.$data.nubs={};
                $('#aaa li').removeClass('active');
                $("#Set").addClass('active');
                $('#bbb>div').hide();
                var cc=$("#bbb>div")[0];
                cc.style.display= 'block';

                this.$router.replace({path: "/User/UserView",  query:{flag: "view",userId : encodeURIComponent(UserID)}});
                this.bindOrgVal();
            },/* back: function(){
                this.$router.go(-1);
            },*/
            roleSearch:function(){
                this.loadUserRoleTablePageData();
            },
            roleReset:function(){
                $("#rolekeywords").val("");
                $("#Category").val('');
                $("#RoleSortName").val('');
                this.loadUserRoleTablePageData();
            },
            roleSubmit:function(){
                this.loadUserRoleTablePageData();
            },
            //加载拥有角色列表
            loadUserRoleTablePageData:function() {
                // debugger;
                var userId=this.$route.query.userId;
                var rolekeywords=$("#rolekeywords").val();
                var Category = $.trim($("#Category").val())
                // var Category = $("#Category").val() == null ? null: $("#Category").val();
                if(Category=="")
                    Category=null;
                var postData = {
                    "filter": {
                        "ObjectId":userId,
                        "Data_FunctionID":"EB6E735B-70A3-46D7-90A5-C354FAAB415F",
                        "Keywords":rolekeywords,
                        "FilterKey": {
                            "Category": Category
                        }
                    }
                };
                var url = ServiceHost+ '/api/invoke?SID=SYS_UserMgr_GetUserRoleByUserID';
                $("#userroleTable").off("BODY_RENDER_COMPLETE").on("BODY_RENDER_COMPLETE",function(){
                    //重新计算列表的样式
                    var loadheight=$("#gridBodyDiv_userroleTable").find("table").height();
                    var loadwidth=$("#gridBodyDiv_userroleTable").find("table").width();
                    $("#gridBodyDiv_userroleTable").css("height",loadheight+3+"px");
                    $("#gridBodyDiv_userroleTable").css("width",loadwidth+"px");
                    $("#gridHeaderDiv_userroleTable").css("width",loadwidth+2+"px");
                    $("#gridHeaderDiv_userroleTable>div").css("width",loadwidth+"px");
                    $("#gridBodyDiv_userroleTable").css("overflow","visible");
                    //获取列表分页数量
                    rolecntperpage=readCookie("cntperpage");
                    defaultcntperpage=rolecntperpage
                });
                $("#userroleTable").datagrid17({
                    showPagination: true,
                    url: url,
                    tableType: "single",
                    resizeCol: true,
                    showPageSelect:true,
                    autoHeigt:false,
                    hiddenInps: [
                        { inpNm: "hidId",
                            inpValue: "RoleID" }
                    ],
                    success: function (rData) {
                        //debugger
                    }
                }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
            },
            //加载模块权限列表
            loadUserMenuTablePageData:function(searchMenu){
                // debugger
                //按权限加载模块tab页的授权按钮
                var menupostdata={
                    "menuId":JSON.stringify("5e51c835-3c82-41ef-aae5-e2b0e62ad8da"),
                    "buttonId":JSON.stringify("e3f34e7c-a989-4e82-a325-3876d7f0ceb5")
                }
                getDataSync(ServiceHost + "/api/invoke?SID=SYS_UserMgr_ValidateUserModuleButton", "post", menupostdata,
                        function (data) {
                            if(data>0){
                                $("#UserMenubtn").show()
                            }else {
                                $("#UserMenubtn").hide()
                            }
                        });

                var userId= this.$route.query.userId;
                var ApplicationID= $("#ApplicationID").val();
                let Name=$.trim($("#prekeywords").val());
                if(!Name){
                    Name=null;
                }
                var AuthorizeExplain1 = $("#hideAuthorizeExplain1Sel").val() == null ? null : $("#hideAuthorizeExplain1Sel").val();
                //是否显示未授权的权限
                var IsCheck = 1;
                if($("#UserMenuIsCheck")[0].checked == false){
                    IsCheck=0;
                }
                var postData = {
                    'filter': {
                        'Keywords':Name,
                        'Name':Name,
                        'ObjectId': userId,
                        "FilterKey":{
                            "ApplicationID":ApplicationID,
                            "Remark":AuthorizeExplain1
                        },
                        "IsCheck":IsCheck
                    }
                };
                var ischecked= $("#UserMenuIsCheck").is(':checked')
               if(ischecked && !Name ){
                    postData = {
                       'filter': {
                           'Keywords':1,
                           'Name':Name,
                           'ObjectId': userId,
                           "FilterKey":{
                               "ApplicationID":ApplicationID,
                               "Remark":AuthorizeExplain1
                           },
                           "IsCheck":IsCheck
                       }
                   };
               }
                var url = ServiceHost+ '/api/invoke?SID=SYS_UserMgr_GetAllUserModulePermisssions';
                //alert(url);er
                $("#usermenuTable").off("BODY_RENDER_COMPLETE").on("BODY_RENDER_COMPLETE",function(){
                    //重新计算列表的样式
                    if(!searchMenu){
                        var winheight=$(window).height();//759
                        let  defluttabwidth=$(window).width();
                        if(defluttabwidth>780){
                            winheight=winheight-455;
                            if(winheight>400){
                                winheight=400;
                            }
                            $("#gridBodyDiv_usermenuTable").css("height",winheight+"px");
                            $("#gridBodyDiv_usermenuTable").css("overflow-x","hidden");
                        }
                    }else{
                        //重新计算列表的样式
                       $("#HavemenuDiv").removeAttr("style")
                    }

                    var trs= $("#gridBodyDiv_usermenuTable").find("tr");
                    for(var i=0;i<trs.length;i++){
                        var IsChecktr=$(trs[i]).find("input[name='hidRemark']").val();
                        if(IsChecktr=="未授权"){
                            $(trs[i]).css("color","red");
                        }
                    }
                    //获取列表分页数量
                    menucntperpage=readCookie("cntperpage");
                    defaultcntperpage=menucntperpage;
                })
                if(!searchMenu){
                    $("#usermenuTable").datagrid17({
                        showPagination: true,
                        url: url,
                        tableType: "single",
                        resizeCol: true,
                        showType:1,
                        showPageSelect:true,
                        autoHeight:false,
                        hiddenInps: [
                            { inpNm: "hidId", inpValue: "ID" },
                            { inpNm: "hidRemark", inpValue: "Remark" }
                        ],
                        afterOpenNode:function(){
                            var trs= $("#gridBodyDiv_usermenuTable").find("tr");
                            for(var i=0;i<trs.length;i++){
                                var IsChecktr=$(trs[i]).find("input[name='hidRemark']").val();
                                if(IsChecktr=="未授权"){
                                    $(trs[i]).css("color","red");
                                }
                            }
                        },
                        success: function (rData) {
                            //debugger
                            $("#UserMenuIsCheck").prop('disabled',false);
                        }
                    }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
                }else{
                    $("#usermenuTable").datagrid17({
                        showPagination: true,
                        url: url,
                        tableType: "single",
                        resizeCol: true,
                        showType:1,
                        showPageSelect:true,
                        autoHeight:false,
                        hiddenInps: [
                            { inpNm: "hidId", inpValue: "ID" },
                            { inpNm: "hidRemark", inpValue: "Remark" }
                        ],
                        afterOpenNode:function(){
                            var trs= $("#gridBodyDiv_usermenuTable").find("tr");
                            for(var i=0;i<trs.length;i++){
                                var IsChecktr=$(trs[i]).find("input[name='hidRemark']").val();
                                if(IsChecktr=="未授权"){
                                    $(trs[i]).css("color","red");
                                }
                            }
                        },
                        success: function (rData) {
                            //debugger
                            $("#UserMenuIsCheck").prop('disabled',false);
                        }
                    }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
                }

            },
            //模块权限里的模块授权按钮
            MenuRight:function(){
                let IdList = window.sessionStorage.getItem("BtnListPage_IDList");
                SaveGlobelData("viewbtn",IdList);
                var userId= this.$route.query.userId;
                var ApplicationID= $("#ApplicationID").val();
                var ApplicationName= $("#ApplicationName").val();
                var prekeywords=$("#prekeywords").val();
                var IsCheck = 1;
                if($("#UserMenuIsCheck")[0].checked == false){
                    IsCheck=0;
                }
                var Formcondition=JSON.stringify({
                    tabflag:"Usermenutable",
                    ApplicationID:ApplicationID,
                    ApplicationName:ApplicationName,
                    prekeywords:prekeywords,
                    IsCheck:IsCheck
                });
                Syscommon.setSaveContent("Formcondition",Formcondition);
                this.$router.push({path:"/ModuleAuthorization/UserModuleAuthPage",  query:{userId : userId, name:titleName,ApplicationID : ApplicationID,ApplicationName : ApplicationName }});
            },
            //模块权限里的  是否显示未授权的checkbox
            UserMenuIsCheck:function(){
                $("#gridHeaderDiv_usermenuTable").remove();
                $("#gridBodyDiv_usermenuTable").remove();
                $("#usermenuTable").removeData('bs.treegrid17');
                $("#usermenuTable").removeData('bs.datagrid17');
                var ischecked= $("#UserMenuIsCheck").is(':checked');
                if(!ischecked){
                    if(!$("#prekeywords").val()){
                        this.loadUserMenuTablePageData();
                    }else{
                        this.loadUserMenuTablePageData("searchMenu");
                    }
                }else{
                    this.loadUserMenuTablePageData("searchMenu");
                }
            },
            //模块权限里的查询
            preSearch:function(){
                $("#gridHeaderDiv_usermenuTable").remove();
                $("#gridBodyDiv_usermenuTable").remove();
                $("#usermenuTable").removeData('bs.treegrid17');
                $("#usermenuTable").removeData('bs.datagrid17');
                $("#UserMenuIsCheck").prop('disabled',true);
                var ischecked= $("#UserMenuIsCheck").is(':checked');
                if(!ischecked){
                    if(!$("#prekeywords").val()){
                        this.loadUserMenuTablePageData();
                    }else{
                        this.loadUserMenuTablePageData("searchMenu");
                    }
                }else{
                    this.loadUserMenuTablePageData("searchMenu");
                }


            },
            //模块权限里的重置
            preRest:function(){
                $("#gridHeaderDiv_usermenuTable").remove();
                $("#gridBodyDiv_usermenuTable").remove();
                $("#usermenuTable").removeData('bs.treegrid17');
                $("#usermenuTable").removeData('bs.datagrid17');
                $("#prekeywords").val("");
                $("#ApplicationName").val("");
                $("#ApplicationID").val("");
                $("#hideAuthorizeExplain1Sel").val("");
                $("#AuthorizeExplain1Sel").html("授权说明" + "<span class='caret'></span>");
                // $("#AuthorizeExplain1Sel").val("");
                var ischecked= $("#UserMenuIsCheck").is(':checked');
                if(ischecked){
                    this.loadUserMenuTablePageData("searchMenu");
                }else{
                    this.loadUserMenuTablePageData();
                }

            },
            //模块权限里的搜索框回车查询
            preSubmit:function(){
                $("#gridHeaderDiv_usermenuTable").remove();
                $("#gridBodyDiv_usermenuTable").remove();
                $("#usermenuTable").removeData('bs.treegrid17');
                $("#usermenuTable").removeData('bs.datagrid17');
                var ischecked= $("#UserMenuIsCheck").is(':checked');
                if(!ischecked){
                    if(!$("#prekeywords").val()){
                        this.loadUserMenuTablePageData();
                    }else{
                        this.loadUserMenuTablePageData("searchMenu");
                    }
                }else{
                    this.loadUserMenuTablePageData("searchMenu");
                }
            },
            //加载拥有数据权限列表
            loadUserdataMenuTablePageData:function(){
                // debugger
                //是否有权限加载  按钮授权的  按钮
                var datapostdata={
                    "menuId":JSON.stringify("2BB005F5-22EE-4587-B253-1E20C408F1B8"),
                    "buttonId":JSON.stringify("d5937b92-59eb-4d57-ba5b-3e41750d8444")
                }
                getDataSync(ServiceHost + "/api/invoke?SID=SYS_UserMgr_ValidateUserModuleButton", "post", datapostdata,
                        function (data) {
                            if(data>0){
                                $("#UserDatabtn").show()
                            }else {
                                $("#UserDatabtn").hide()
                            }
                        });
                //  //是否有权限加载  列表中的    查看按钮
                var dataviewpostdata={
                    "menuId":JSON.stringify("2BB005F5-22EE-4587-B253-1E20C408F1B8"),
                    "buttonId":JSON.stringify("0d9a3e9d-9890-40de-9172-e6316476dad8")
                }
                getDataSync(ServiceHost + "/api/invoke?SID=SYS_UserMgr_ValidateUserModuleButton", "post", dataviewpostdata,
                        function (data) {
                            if(data>0){
                                if($("#Userdataview").length==0){
                                    var tr=$("#datamenuTable").find("thead").find("tr")
                                    tr.append('<th  class="text-center" id="Userdataview" style="width:50px" data-field="cssClass:text-center,hasTitle:true,type:arch,archName:查看,archMethod:rebindInput" ><label>操作</label></th>')
                                }
                            }
                        });
                var page=this;
                var userId=this.$route.query.userId;
                let Name=$.trim($("#datakeywords").val());
                var IsCheck = 1;
                if($("#UserDataIsCheck")[0].checked == false){
                    IsCheck=0;
                }
                var AuthorizeExplain2Sel = $("#hideAuthorizeExplain2Sel").val() == null ? null : $("#hideAuthorizeExplain2Sel").val();
                var AuthorizeType1 = $("#hideAuthorizeType1Sel").val() == null ? null : $("#hideAuthorizeType1Sel").val();
                var postData = {
                    'filter': {
                        "Name":Name,
                        'ObjectId': userId,
                        "IsCheck":IsCheck,
                        "FilterKey": {
                            "Remark":AuthorizeExplain2Sel,
                            "AUType":AuthorizeType1
                        }
                        /*  'ParentID':'0'*/// 'menuName': $('#KeyValues').val()
                    }
                };
                var vuethis=this;
                var url = ServiceHost+'/api/invoke?SID=SYS_UserMgr_GetUserAUResult';
                //alert(url);
                $("#datamenuTable").off("BODY_RENDER_COMPLETE").on("BODY_RENDER_COMPLETE",function(){
                    //重新计算列表的样式
                    var loadheight=$("#gridBodyDiv_datamenuTable").find("table").height();
                    var loadwidth=$("#gridBodyDiv_datamenuTable").find("table").width();
                    $("#gridBodyDiv_datamenuTable").css("height",loadheight+2+"px");
                    $("#gridBodyDiv_datamenuTable").css("width",loadwidth+"px");
                    $("#gridHeaderDiv_datamenuTable").css("width",loadwidth+2+"px");
                    $("#gridHeaderDiv_datamenuTable>div").css("width",loadwidth+"px");
                    $("#gridBodyDiv_datamenuTable").css("overflow","visible");
                    var trs= $("#gridBodyDiv_datamenuTable").find("tr");
                    for(var i=0;i<trs.length;i++){
                        var IsChecktr=$(trs[i]).find("input[name='hidRemark']").val();
                        if(IsChecktr=="未授权"){
                            $(trs[i]).css("color","red");
                            $(trs[i]).find("a").css("color","red");
                        }
                    }
                    //获取数据权限列表的分页数量
                    datacntperpage=readCookie("cntperpage");
                    defaultcntperpage=datacntperpage
                });
                $("#datamenuTable").datagrid17({
                    showPagination: true,
                    url: url,
                    tableType: "single",
                    resizeCol: true,
                    showType:1,
                    autoHeight:false,
                    showPageSelect:true,
                    vm:vuethis,
                    hiddenInps: [
                        { inpNm: "hidObjectID", inpValue: "ObjectID" },
                        { inpNm: "hidOwnerType", inpValue: "OwnerType" },
                        { inpNm: "hidResultID", inpValue: "ResultID" },
                        { inpNm: "hidRemark", inpValue: "Remark" }
                    ],
                    success: function (rData) {
                        //debugger
                    }
                }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
                //  rebindInput();
            },
            //数据权限列表的授权按钮
            dataRight:function(){
                var page=this;
                var datas = $("#datamenuTable").data('bs.datagrid17').getSelectedRowData();
                let IdList = window.sessionStorage.getItem("BtnListPage_IDList");
                SaveGlobelData("viewbtn",IdList);
                var userId= this.$route.query.userId;
                //数据权限 的记忆查询
                var datakeywords=$("#datakeywords").val();
                var IsCheck = 1;
                if($("#UserDataIsCheck")[0].checked == false){
                    IsCheck=0;
                }
                var Formcondition=JSON.stringify({
                    tabflag:"Userdatatable",
                    datakeywords:datakeywords,
                    IsCheck:IsCheck

                });
                Syscommon.setSaveContent("Formcondition",Formcondition);
                if (datas) {//说明列表有选中项   进入编辑页面
                    //未授权的权限  选中列表时  进入数据权限的新增页面
                    var Remark=datas.Remark;
                    if($("#UserDataIsCheck")[0].checked == true){
                        var ObjectID = datas.ObjectID;
                        var Name = datas.Name;
                        var auTypeSelector ="";
                        auTypeSelector+='<div class="btn-group" style="margin-right:5px"><input type="radio" name="AUTypeSel" id="all1" value="1" style="opacity:1;position: static"/></div><label for="all1" class="btn-group" style="top:2px;margin-right: 20px">全部</label>';
                        auTypeSelector+='<div class="btn-group" style="margin-right: 5px"><input type="radio" name="AUTypeSel" id="detail1" value="2" style="opacity:1;position: static"/></div><label for="detail1" class="btn-group"  style="top:2px;margin-right: 20px">明细</label>';
                        auTypeSelector+='<div class="btn-group" style="margin-right: 5px"><input type="radio" name="AUTypeSel"id="rule1" value="3" style="opacity:1;position: static"/></div><label  for="rule1" class="btn-group"  style="top:2px">规则</label>';
                        bootbox.dialog({
                            message: auTypeSelector,
                            title: "请选择授权类型",
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
                                        var auTypeSel = $('input[name="AUTypeSel"]:checked').val();
                                        if(auTypeSel==''){
                                            NotifyWarning("请选择授权类型！");
                                        }else if(auTypeSel=='1'){//全部数据权限新增
                                            page.$router.push({path:"/Auth/AllAuthAddFormUser",query:{'ownerType':'1',"userId":userId ,'ObjectID':ObjectID,'Name':Name,"flag":"dateview",'OwnerName': encodeURIComponent(titleName)}});
                                        }else if(auTypeSel=='2'){//明细数据权限新增
                                            page.$router.push({path:"/Auth/DetailAddAuthFormUser",query:{'ownerType':'1','ObjectID':ObjectID,'OwnerName': encodeURIComponent(titleName),'Owner': userId,flag:"dateview"}});
                                        }else if(auTypeSel=='3'){//规则明细权限新增
                                            page.$router.push({path:"/Auth/RuleAddAuthFormUser",query:{'ownerType':'1',"userId":userId,'flag':"dateview",'ObjectID':ObjectID,'Name':Name,'OwnerName': encodeURIComponent(titleName)}});
                                        }
                                    }
                                }
                            }
                        });
                    }
                    var ObjectID=datas.ObjectID;
                    var OwnerType=datas.OwnerType;
                    var ResultID=datas.ResultID;
                    var AUType=datas.AUType;
                    // var ownerType=datas.ownerType;
                    var url="";
                    if(OwnerType=="1")
                    {
                        if(AUType=="全部"){
                            url="/Auth/AllAuthUpdateFormUser";
                            this.$router.push({path: url, query: {'id': ResultID, 'ownerType': OwnerType,'userId':userId, 'auObjectId': ObjectID, flag: "dateview"}  });
                            // this.$router.push({path:url,query:{'Owner':userId,'OwnerName':titleName,'id':ResultID,'ownerType':OwnerType,'auObjectId':ObjectID,flag:"dateview"}});
                            return
                        }else if(AUType=="明细"){
                            url="/Auth/DetailUpdateAuthFormUser";
                            this.$router.push({path:url,query:{'Owner':userId,'OwnerName':titleName,'id':ResultID,'ownerType':OwnerType,'auObjectId':ObjectID,flag:"dateview"}});
                            return
                        }else if(AUType=="规则"){
                            url="/Auth/RuleAddAuthFormUser";
                            this.$router.push({path:url,query:{'id':ResultID,'userId':userId,'ownerType':OwnerType,'auObjectId':ObjectID,flag:"dateview"}});
                            return;
                        }
                    }
                    else if(OwnerType=="2"){
                        if(AUType=="全部"){
                            url = "/Auth/AllAuthUpdateFormRole";
                            this.$router.push({path: url, query: {'id': ResultID, 'ownerType': OwnerType,'userId':userId, 'auObjectId': ObjectID, flag: "dateview"}  });
                            return
                        }else if(AUType=="明细"){
                            url="/Auth/DetailAddAuthFormRole";
                            this.$router.push({path:url,query:{'Owner':userId,'OwnerName':titleName,'id':ResultID,'ownerType':OwnerType,'auObjectId':ObjectID,flag:"dateview"}});
                            return
                        }else if(AUType=="规则"){
                            url="/Auth/RuleAddAuthFormRole";
                            this.$router.push({path:url,query:{'id':ResultID,'userId':userId,'ownerType':OwnerType,'auObjectId':ObjectID,flag:"dateview"}});
                            return
                        }
                    }
                    //  var OwnerType=datas.OwnerType;
                } else {//列表中没有选择项 为数据权限授权的新增页面
                    var auTypeSelector ="";
                    auTypeSelector+='<div class="btn-group" style="margin-right:5px"><input type="radio" name="AUTypeSel" id="all1" value="1" style="opacity:1;position: static"/></div><label for="all1" class="btn-group" style="top:2px;margin-right: 20px">全部</label>';
                    auTypeSelector+='<div class="btn-group" style="margin-right: 5px"><input type="radio" name="AUTypeSel" id="detail1" value="2" style="opacity:1;position: static"/></div><label for="detail1" class="btn-group"  style="top:2px;margin-right: 20px">明细</label>';
                    auTypeSelector+='<div class="btn-group" style="margin-right: 5px"><input type="radio" name="AUTypeSel"id="rule1" value="3" style="opacity:1;position: static"/></div><label  for="rule1" class="btn-group"  style="top:2px">规则</label>';
                    bootbox.dialog({
                        message: auTypeSelector,
                        title: "请选择授权类型",
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
                                    var auTypeSel = $('input[name="AUTypeSel"]:checked').val();
                                    if(auTypeSel==''){
                                        NotifyWarning("请选择授权类型！");
                                    }else if(auTypeSel=='1'){//全部数据权限新增
                                        page.$router.push({path:"/Auth/AllAuthAddFormUser",query:{'ownerType':'1',userId:userId ,flag:"dateview",'OwnerName': encodeURIComponent(titleName)}});
                                    }else if(auTypeSel=='2'){//明细数据权限新增
                                        page.$router.push({path:"/Auth/DetailAddAuthFormUser",query:{'ownerType':'1','OwnerName': encodeURIComponent(titleName),'Owner': userId,flag:"dateview"}});
                                    }else if(auTypeSel=='3'){//规则明细权限新增
                                        page.$router.push({path:"/Auth/RuleAddAuthFormUser",query:{'ownerType':'1',userId:userId,'flag':"dateview",'OwnerName': encodeURIComponent(titleName)}});
                                    }
                                }
                            }
                        }
                    });
                }
            },
            //数据权限tab页内的 是否显示未拥有权限的 checkbox
            UserDataIsCheck:function(){
                this.loadUserdataMenuTablePageData();
            },
            //拥有数据的搜索
            dataSearch:function(){
                this.loadUserdataMenuTablePageData();
            },
            //拥有数据的重置
            dataRest:function(){
                $("#datakeywords").val("");
                $("#hideAuthorizeExplain2Sel").val("");
                $("#AuthorizeExplain2Sel").html("授权说明" + "<span class='caret'></span>");
                $("#hideAuthorizeType1Sel").val("");
                $("#AuthorizeType1Sel").html("授权类型" + "<span class='caret'></span>");
                this.loadUserdataMenuTablePageData();
            },
            //拥有数据的回车查询
            dataSubmit:function(){
                this.loadUserdataMenuTablePageData();
            },
            //基本信息  其他组织机构的数据绑定
            bindOrgVal:function(){
                var urARR=[];
                //console.log(defaultArr);
                var UserId= this.$route.query.userId;
                var formDataUrlobj = ServiceHost + '/api/invoke?SID=Sys_UserMgr_GetUserOrganizationByUserID';
                var  dataUrlobj = formDataUrlobj + "&userId='" + UserId + "'";
                getDataSync(dataUrlobj, "get", null, function (data) {
                            $.each(data, function (i) {
                                if(data){
                                    var orgID= data[i].OrganizationID;
                                    var flag=$.inArray(orgID,defaultArr);
                                    //console.log(flag);
                                    if(flag != -1  ){
                                        var checkData = {ID:data[i].OrganizationID,Name:data[i].AllName, Category:""};
                                        urARR.push(checkData);
                                    }
                                }

                            });
                        });
                $("#Tagrs").html("");
                if(urARR.length>0&&urARR[0].Name){
                    for(var i=0;i<urARR.length;i++){
                        var html="<span style='margin-right: 5px;margin-bottom: 5px;' class='tag label label-info'>"+urARR[i].Name+"<i class='glyphicon glyphicon-remove'style='margin-left: 3px;cursor:default'></i>"+"</span>";
                        $("#Tagrs").append(html);
                        // DepartmentName +=urARR[i].Name;
                        //console.log(Tagr);

                    }
                }
            },
            //按钮权限的应用按钮组加载
            getAppBtn:function(){
                //是否有权限加载  按钮授权的  按钮
                var btnpostdata={
                    "menuId":JSON.stringify("BC27AFD7-2E88-4ADA-A564-3C2C2FA53EF1"),
                    "buttonId":JSON.stringify("e3f34e7c-a989-4e82-a325-3876d7f0ceb5")
                }
                getDataSync(ServiceHost + "/api/invoke?SID=SYS_UserMgr_ValidateUserModuleButton", "post", btnpostdata,
                        function (data) {
                            if(data>0){
                                $("#Userbtnrightdiv").show()
                            }else {
                                $("#Userbtnrightdiv").hide()
                            }
                        });
                var userId= this.$route.query.userId;
                // var ObjectId= this.$route.query.userId;
                var page=this;
                var result={};
                var syedata={
                    'filter':'{"FieldName":"",' +
                    '"FieldValue":"",' +
                    '"QueryType":"All",' +
                    '"ObjectId":"'+userId+'",' +
                    '"FilterKey":{\"IsAuthorityLimited\":\"1\"},' +
                    '"page":"1",'+
                    '"rows":"100"' +
                    '}'
                };

                getDataSync(ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationList", "post",syedata ,
                        function (data) {
                            result=data.rows;
                        });
                var AppBtns=result;
                $("#ButtonGroup").html("");
                $("#gridBodyDiv_menutable").find("tbody").html('<tr><td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="3">无记录</td></tr>');
                $("#gridBodyDiv_BtnTable").find("tbody").html('<tr><td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="4">无记录</td></tr>');
                $("#BtnTable").removeData('bs.datagrid');
                $("#menutable").removeData('bs.treegrid');
                $("#ButtonGroup").addClass("table-toolbar");
                if(AppBtns.length==0){
                    var html ='<div style="color:red">该用户没有任何功能权限</div>';
                    $("#ButtonGroup").html(html);
                    $("#ButtonGroup").removeClass("table-toolbar");
                }else{
                    for(var i=0;i<AppBtns.length;i++){
                        var html='<div class="widget-buttons " id="Buttons" style="margin-bottom: 3px">'+
                            // 破坏widget-buttons.a的css结构不让该样式生效
                           '<div>'+
                            '<input type="hidden" value="'+AppBtns[i].ApplicationID+'">'+
                           ' <a class="authbutton btn btn-default">'+AppBtns[i].AppFullName +'</a>'+
                            '</div>'+
                         //   ' <button class="authbutton btn btn-default"  href="javascript:void(0);">'+AppBtns[i].AppFullName +'</button>'+
                             '</div>';
                        $("#ButtonGroup").append(html);
                    }
                }

                //为按钮添加点击事件
                $(".authbutton").on("click",function(){
                    $("#Buttons .btn-primary").attr("class","authbutton btn btn-default");
                    $(this).attr("class","btn btn-default btn-primary")
                    //LoadPageData(id);
                    var AppId=$(this).prev().val();

                    //console.log(MenuID);
                    $("#AppId").val(AppId);
                    $("#menutable").css("height","300px");
                    $("#MenuDiv").removeAttr("style");
                    page.LoadMenuPage(AppId);
                    $("#detailDataTable").removeData('bs.datagrid');
                    $("#gridBodyDiv_BtnTable").find("tbody").html('<tr><td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="4">无记录</td></tr>');
                    $("#gridBodyDiv_BtnTable").css("height","55px")
                    $("#btn .table-footer").remove();
                    $("#MenuId").val("");
                    $("#UserBtnIsCheck").prop("checked",false);
                })
            },
            //加载模块列表
            LoadMenuPage:function(AppId){
                var userId= this.$route.query.userId;
                var page=this;
                const dataUrl = "/api/invoke?SID=SYS_ModuleAuthorizationMgr_GetMenuListByUserId";
                var postData = {
                    "filter":{
                        "ObjectId":AppId,
                        'userId':userId,
                        "ParentID":"",
                        "QueryType":"User"
                    }
                };
                $("#menutable").off("BODY_RENDER_COMPLETE").on("BODY_RENDER_COMPLETE",function(){
                    var menutableheight=$("#gridBodyDiv_menutable");
                    menutableheight.css("height","400px")
                    let id=$("#MenuId").val();
                    $('#gridBodyDiv_menutable').find("tbody").find("input.curId[value='"+id+"']").closest("tr").addClass("selected");
                });
                $("#menutable").treegrid17({
                    showPagination: false,
                    url: ServiceHost + dataUrl,
                    tableType: "single",
                    resizeCol: true,
                    showType:0, //-1:只显示根 0：全展开 2:展开到2层
                    hiddenInps: [
                        { inpNm: "hidId", inpValue: "ID" },
                        { inpNm: "hidIsReferenced", inpValue: "IsReferenced" },
                        { inpNm: "hidOldMenuID", inpValue: "OldMenuID" },
                    ],
                    success: function (rData) {
                    },
                    trclick:function(tr){
                        var checkedId = $(tr).find("input[name='hidId']").val();
                        var IsReferenced = $(tr).find("input[name='hidIsReferenced']").val();
                        var OldMenuID = $(tr).find("input[name='hidOldMenuID']").val();
                        $("#MenuId").val(checkedId);
                        $("#IsReferenced").val(IsReferenced);
                        $("#OldMenuID").val(OldMenuID);
                        console.log($("#OldMenuID").val());
                        $("#BtnTable").removeData('bs.datagrid');
                        page.LoadPageData();
                    }
                }).data('bs.treegrid17').searchByFilter({ searchCond: postData });
            },
            //加载按钮列表
            LoadPageData:function() {
                const dataUrl = "/api/invoke?SID=SYS_UserMgr_GetAllUserButtonPermisssions";
                var MenuId=$("#MenuId").val();
                if($("#IsReferenced").val()=='1'&&$("#OldMenuID").val()!=null){
                    var MenuId=$("#OldMenuID").val();
                }

                var userId= this.$route.query.userId;
                //是否显示未授权的权限
                var IsCheck = 1;
                if($("#UserBtnIsCheck")[0].checked == false){
                    IsCheck=0;
                }
                var postData = {
                    "filter":{
                        "ObjectId":userId,
                        "menuId":MenuId,
                        "IsCheck":IsCheck
                    }
                };
                $("#BtnTable").off("BODY_RENDER_COMPLETE").on("BODY_RENDER_COMPLETE",function(){
                    var trs= $("#gridBodyDiv_BtnTable").find("tr");
                    for(var i=0;i<trs.length;i++){
                        var IsChecktr=$(trs[i]).find("input[name='hidRemark']").val();
                        if(IsChecktr=="未授权"){
                            $(trs[i]).css("color","red");
                        }
                    }
                })
                $("#BtnTable").datagrid17({
                    showPagination: false,
                    url: ServiceHost+dataUrl,
                    tableType: "single",
                    resizeCol: true,
                    autoHeight:false,
                    hiddenInps: [
                        { inpNm: "hidId", inpValue: "ID" },
                        { inpNm: "hidRemark", inpValue: "Remark" }
                    ],
                    success: function (rData) {
                    },
                }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
            },
            //按钮列表里的授权按钮功能
            userbtnright:function(){
                // debugger;
                let IdList = window.sessionStorage.getItem("BtnListPage_IDList");
                SaveGlobelData("viewbtn",IdList);
                var userId= this.$route.query.userId;
                var ApplicationID= $("#AppId").val();
                var MenuId=$("#MenuId").val();
                console.log($("#OldMenuID").val())
                if($("#IsReferenced").val()=='1'&&$("#OldMenuID").val()!=null){
                    var MenuId=$("#OldMenuID").val();
                }

                var IsCheck = 1;
                if($("#UserBtnIsCheck")[0].checked == false){
                    IsCheck=0;
                }
                var Formcondition=JSON.stringify({
                    tabflag:"Userbtntable",
                    ApplicationID:ApplicationID,
                    MenuId:MenuId,
                    IsCheck:IsCheck
                });
                Syscommon.setSaveContent("Formcondition",Formcondition);
                this.$router.push({path:"/ButtonAuthorization/UserButtonAuthPage",  query:{userId : userId, name:titleName,AppId : ApplicationID,MenuId:MenuId }});
            },
            //按钮权限tab页里的  显示未授权checkbox
            UserBtnIsCheck:function(){
                if(!$("#AppId").val()){
                    NotifyWarning("请选择应用按钮！");
                    $("#UserBtnIsCheck").prop("checked",false);
                    return
                }else if(!$("#MenuId").val()){
                    NotifyWarning("请在左侧的功能列表内选择功能！");
                    $("#UserBtnIsCheck").prop("checked",false);
                    return
                }
                this.LoadPageData();
            }
        }

    }
</script>