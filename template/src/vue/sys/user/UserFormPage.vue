<template>
    <div class="row" id="UserAddPage">
        <div class="col-lg-12 col-sm-12 col-xs-12">
            <!--头部的保存返回-->
            <div class="well widget-body">
                <button type="button" class="btn btn-primary" click-text="正在保存" v-on:click="save" id="save">
                    <i class="fa fa-save "></i>保存
                </button>
                <button type="button" name="btnBack" v-on:click="back" class="btn btn-default">
                    <i class="fa fa-reply "></i>返回
                </button>
            </div>
            <!-- 中部的信息填写-->
            <div class="well widget-body">
                <div class="row">
                    <h5 class="row-title before-color">
                        <i class="fa fa-file-text iconcolor"></i>
                        基本信息
                    </h5>
                    <div id="form" method="post" autocomplete="new-password" class="form-horizontal bv-form">
                        <!-- 第一行-->
                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">*账号</label>
                                    <div class="col-sm-8  ">
                                        <input style="display:none">
                                        <input type="text" class="form-control input-sm" name="Account " id="Account"
                                               maxlength="25" v-bind:value="Account" data-bv-regexp="true" autocomplete="new-password"
                                               data-bv-regexp-regexp="^([\u4E00-\u9FA5]|\w)*$" data-bv-notempty="true"
                                               data-bv-field="Account" data-bv-notempty-message="请输入账号"
                                               data-bv-regexp-message="请不要输入特殊符号"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">姓名</label>
                                    <div class="col-sm-8  ">
                                        <input style="display:none">
                                        <input type="text" class="form-control input-sm" name="RealName"
                                               autocomplete="new-password" id="RealName" maxlength="25" v-bind:value="RealName"
                                               data-bv-field="RealName"
                                               data-bv-regexp="true"
                                               data-bv-regexp-regexp="^([\u4E00-\u9FA5]|\w|-)*$"
                                               data-bv-regexp-message="请不要输入特殊符号"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 第二行-->
                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">国际区号</label>
                                    <!--data-bv-notempty="true" data-bv-field="Mobile"  data-bv-regexp="true" data-bv-regexp-regexp="^1[3|5|8]{1}[0-9]{9}$" data-bv-regexp-message="请输入正确的手机号" data-bv-notempty-message="请输入手机号"-->
                                    <div class="col-sm-8  "><input type="number" class="form-control input-sm" name="AreaCode" id="AreaCode" v-bind:value="AreaCode" maxlength="3"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">手机号</label>
                                    <!--data-bv-notempty="true" data-bv-field="Mobile"  data-bv-regexp="true" data-bv-regexp-regexp="^1[3|5|8]{1}[0-9]{9}$" data-bv-regexp-message="请输入正确的手机号" data-bv-notempty-message="请输入手机号"-->
                                    <div class="col-sm-8  "><input type="text" class="form-control input-sm" name="Mobile" id="Mobile" v-bind:value="Mobile"  maxlength="25"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--第三行-->
                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">电子邮箱</label>
                                    <div class="col-sm-8  ">
                                        <input type="text" class="form-control input-sm" name="Email" id="Email"
                                               v-bind:value="Email" data-bv-field="Email" data-bv-regexp="true"
                                               data-bv-regexp-regexp="^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"
                                               data-bv-regexp-message="请输入正确的邮件地址如：123@qq.com"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">职位</label>
                                    <div class="col-sm-8  ">
                                        <input type="text" class="form-control input-sm" name="DutyID" id="DutyID"
                                               v-bind:value="DutyID" maxlength="18"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">*登录密码</label>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                        <div class="input-group helper-group">
                                            <input type="hidden" id="SecretKey" name="SecretKey" v-bind:value="SecretKey"/>
                                            <input type="hidden" id="Password1" name="Password1" v-bind:value="Password"/>
                                            <input style="display:none">
                                            <input type="text" class="form-control input-sm" name="Password"
                                                   autocomplete="new-password" id="Password" v-bind:value="Password"
                                                   data-bv-notempty="true" data-bv-field="Password"
                                                   data-bv-notempty-message="请输入密码" maxlength="20" />
                                            <span class="input-group-btn" id="editShowHide">
                                            <button id="isShowHide" class="btn btn-default shiny btn-sm" data-toggle=""
                                                    data-helper="" type="button"
                                                    data-validate="false">
                                                <i id="isShowHide1" class="glyphicon glyphicon-eye-close"></i>
                                            </button>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--有效性-->
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">有效性</label>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                        <div class="btn-group">
                                            <label class="control-label">
                                                <input type="checkbox" class="checkbox-slider" data-validate="false"
                                                       checked="checked" id="Enabled" v-bind:checked="Enabled==1"/>
                                                <span class="text"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">*默认公司</label>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                        <div class="input-group" id="company">
                                            <input type="hidden" name="CompanyID" id="CompanyID" value=""
                                                   data-recive-helper-data="id" v-bind:value="CompanyID">
                                            <input type="text" name="CompanyName" id="CompanyName"
                                                   class="form-control input-sm" readonly="readonly"
                                                   data-recive-helper-data="name" v-bind:value="CompanyName"
                                                   data-bv-notempty="true" data-bv-field="OrganizationIdsName"
                                                   data-bv-notempty-message="请选择所属公司">
                                            <input type="hidden" name="CompanyCategory" id="CompanyCategory" value=""
                                                   data-recive-helper-data="category">
                                            <span class="input-group-btn">
                                                        <button class="btn btn-default shiny btn-sm" data-toggle="modal"
                                                                data-helper="companyOrgHelp" type="button"
                                                                data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                                    </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">默认部门</label>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                        <div class="input-group" id="Department">
                                            <input type="hidden" name="DepartmentID" id="DepartmentID" value=""
                                                   data-recive-helper-data="id" v-bind:value="DepartmentID">
                                            <input type="text" name="DepartmentName" id="DepartmentName"
                                                   class="form-control input-sm" readonly="readonly"
                                                   data-recive-helper-data="name" v-bind:value="DepartmentName">
                                            <input type="hidden" name="DepartmentCategory" id="DepartmentCategory" value=""
                                                   data-recive-helper-data="category">
                                            <span class="input-group-btn">
                                                <button class="btn btn-default shiny btn-sm" data-toggle="modal"
                                                        data-helper="DepartmentOrgHelp" type="button"
                                                        data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">默认工作组</label>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                        <div class="input-group" id="workgroup">
                                            <input type="hidden" name="WorkgroupID" id="WorkgroupID" value=""
                                                   data-recive-helper-data="id" v-bind:value="WorkgroupID">
                                            <input type="text" name="WorkgroupName" id="WorkgroupName"
                                                   class="form-control input-sm" readonly="readonly"
                                                   data-recive-helper-data="name" v-bind:value="WorkgroupName">
                                            <input type="hidden" name="WorkgroupCategory" id="WorkgroupCategory" value=""
                                                   data-recive-helper-data="category">
                                            <span class="input-group-btn">
                                                        <button class="btn btn-default shiny btn-sm" data-toggle="modal"
                                                                data-helper="WorkgroupOrgHelp" type="button"
                                                                data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                                    </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">企业客户</label>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                        <div class="input-group helper-group" id="ComBusiCustomerDiv">
                                            <input type="hidden" name="BusiCustID" id="BusiCustID"
                                                   data-recive-helper-data="id" v-bind:value="BusiCustID">
                                            <input type="text" name="BusiCustName" id="BusiCustName"
                                                   class="form-control input-sm" data-recive-helper-data="name"
                                                   readonly="readonly" v-bind:value="BusiCustName"/>
                                            <span class="input-group-btn">
                                                        <button class="btn btn-default shiny btn-sm" data-toggle="modal"
                                                                data-helper="ComBusiCustomerHelp" type="button"
                                                                data-validate="false"><i
                                                                class="fa fa-ellipsis-h"></i></button>
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row col-lg-12 col-sm-12 col-xs-12 ">
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">是否已同步客户信息</label>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                        <div class="btn-group">
                                            <label class="control-label">
                                                <input type="checkbox" class="checkbox-slider" data-validate="false"
                                                       checked="checked" id="IsSync" v-bind:checked="IsSync==1" disabled/>
                                                <span class="text"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">客户内码</label>
                                    <div class="col-sm-8  ">
                                        <input type="text" class="form-control input-sm" name="CustomerId" id="CustomerId"
                                               v-bind:value="CustomerId" maxlength="36" disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label class="col-sm-4 control-label ">所属其它组织机构</label>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  " id="box">
                                        <div class="input-group" id="otherDepartment">
                                            <input type="hidden" name="otherDepartmentID" id="otherDepartmentID"
                                                   v-bind:value="otherDepartmentID">
                                            <input type="hidden" name="otherDepartmentName" id="otherDepartmentName"
                                                   class="form-control input-sm" readonly="readonly"
                                                   v-bind:value="DepartmentName">
                                            <div class="form-control input-sm" id="Tagrs"
                                                 style="height: 66px;overflow-y: auto;background-color: #eee"></div>
                                            <span class="input-group-btn" style="vertical-align: top">
                                                <button class="btn btn-default shiny btn-sm" data-toggle="modal"
                                                        type="button" data-validate="false" v-on:click="Department"><i
                                                        class=" fa fa-ellipsis-h"></i></button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                <div class="form-group">
                                    <label for="" class="col-sm-4 control-label ">说明</label>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                        <textarea name="Description" id="Description" cols="3" rows="3"
                                                  style="resize:none;font-size:12px;" class="form-control btn-sm" maxlength="100"
                                                  v-bind:value="Description"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" class="btn btn-primary" click-text="正在保存" v-on:click="save">
                    <i class="fa fa-save "></i>保存
                </button>
                <button type="button" class="btn btn-default" name="btnBack" v-on:click="back">
                    <i class="fa fa-reply "></i>返回
                </button>
            </div>

        </div>
        <!-- 所属部门的弹窗-->
        <div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false"
             id="OrganizationDiv" data-backdrop="static">
            <div class="modal-dialog modal-lg" >
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h6 class="modal-title">组织机构</h6>
                    </div>
                    <div class="modal-body" id="DetailDataBody">
                        <div class="table-toolbar">
                            <div class="btn-group">
                                <input type="text" id="KeyOrganization" placeholder="编号、名称" title="编号、名称"
                                       class="form-control input-sm" v-on:keyup.enter="autoSubmit" style="width:220px"/>
                            </div>
                            <a  href="javascript:void(0);" class="btn btn-default" v-on:click="searchOrg">
                                <i class="fa fa-search">
                                </i>
                                查 询
                            </a>
                            <a id="btnSearchOrg" href="javascript:void(0);" class="btn btn-default" v-on:click="restOrg">
                                <i class="fa fa fa-repeat">
                                </i>
                                重置
                            </a>
                        </div>
                        <div class="form-group" id="orgdiv">
                            <div class="table-responsive">
                                <table style="table-layout:fixed" class="table table-striped table-hover table-bordered max-width-table" id="organizationstable">
                                    <thead id="rogthead">
                                    <tr role="row" id="orgtabrow">
                                        <th style="width: 50px;" class="text-center">
                                            <span style="width:4px;margin:0;height: 100% !important;position: relative;display: inline;overflow: hidden;margin-right:-8px;">&nbsp;</span>
                                        </th>
                                        <th style="width: 80px; text-align: center" data-field="field:Code,cssClass:text-left,hasTitle:true,enum:{null= }">
                                            <label for="">编号</label>
                                        </th>
                                        <th style="text-align: center;width:200px" data-field="field:FullName,cssClass:text-left,hasTitle:true,isTree:true,enum:{null= }" class="FullName_col ">
                                            <label for="">名称</label>
                                        </th>
                                        <th style="width: 80px; text-align: center" data-field="field:Category,cssClass:text-center,hasTitle:true,enum:{null= }" class="Category_col ">
                                            <label for="">分类</label>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="btnSure">确定</button>
                        <button type="button" class="btn" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="teld-vue-frame/thirdpart/css/bootstrap-datepicker3.min.css"></style>
<style scoped>
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
        -webkit-text-fill-color: #333;
    }
</style>
<script>
    import 'teld-vue-frame/thirdpart/js/teld-datepicker.min'
    var hidPassword;//把用户输入的密码 存到此变量
    var urARR = [];
    var defaultArr=[];//保存默认的公司 部门 工作组
    var istree=true;
    export default{
        data()
        {
            //debugger
            urARR = [];
            let result={};
            let flag=this.$route.query.flag;
            var UserId = this.$route.query.UserId;
            if(flag=="add"){
                return {
                    UserId:null,
                    Code:null,
                    Account:null,
                    RealName:null,
                    Password:null,
//                    Gender:null,
                    Mobile:null,
//                    Birthday:null,
//                    TelePhone:null,
//                    OICQ:null,
                    Email:null,
                    SecretKey:null,
                    DutyID:null,
                    Description:null,
                    ACCompanyID:null,
                    ACCompanyName:null,
                    BusiCustName:null,
                    BusiCustID:null,
                    Enabled:1,
                    WorkgroupID:null,
                    WorkgroupName:null,
                    CompanyID:null,
                    CompanyName:null,
                    DepartmentID:null,
                    DepartmentName:null,
                    IsSync:0,
                    AreaCode:86
                }
            }
            else{
                let formDataUrl=ServiceHost+'/api/invoke?SID=SYS_UserMgr_GetSysUserById';
                var dataUrl = formDataUrl+ "&userId='"+UserId+"'";
                getDataSync(dataUrl, "get",
                        null, function (data) {
//                            if(data.Birthday != null) {
//                                var date = new Date(data.Birthday.toString());
//                                var birthday = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
//                                data.Birthday = birthday;
//                            }
                            result=data;
                            result.UserId=UserId;
                            if(data.CompanyID){
                                defaultArr.push(data.CompanyID);
                            }
                            if(data.DepartmentID){
                                defaultArr.push(data.DepartmentID);
                            }
                            if(data.WorkgroupID){
                                defaultArr.push(data.WorkgroupID);
                            }


                        });

                //编辑页面绑定所属部门的数据
                var formDataUrlobj = ServiceHost + '/api/invoke?SID=Sys_UserMgr_GetUserOrganizationByUserID';
                var  dataUrlobj = formDataUrlobj + "&userId='" + UserId + "'";
                getDataSync(dataUrlobj, "get",
                        null, function (data) {
                            $.each(data, function (i) {
                                var orgID= data[i].OrganizationID;
                                var flagorg=$.inArray(orgID,defaultArr);
                                //console.log(flag);
                                if(flagorg == -1  ){
                                    var checkData = {ID:data[i].OrganizationID,Name:data[i].AllName, Category:""};
                                    urARR.push(checkData);
                                }
                            });
                        });

            }
            return result;
        },
        mounted()
        {
            window.onresize = function windowResize () {
                // 通过捕获系统的onresize事件触发我们需要执行的事件
                var nowWidth = ($("#box").width() - 33) + 'px';
                $("#Tagrs").css("width",nowWidth);
            }
            var w=$("#box").width()-33;
            $("#Tagrs").css("width",w+"px");
            //
            var flag=this.$route.query.flag;
            if(isPC()){
                var  crumbs=$("#breadcrumbs small");
                if(flag == "edit"){
                    crumbs.html("<i class='fa fa-angle-right'></i>"+"用户管理"+" <i class='fa fa-angle-right'></i>"+ "编辑");
                }else{
                    crumbs.html("<i class='fa fa-angle-right'></i>"+"用户管理"+" <i class='fa fa-angle-right'></i>"+ "新增");
                }
            }
            $("#form").bootstrapValidator();
            var isShowHide = $('#isShowHide');
            var isShowHide1 = $('#isShowHide1');
            var showPwd = $("#Password");
            var showPwd1 = $("#Password1");
            if(flag == "edit") {
                $("#Password").val("*********");
                isShowHide.unbind()
                // $("#Password").attr("type","password");
                $("#Password").attr("readonly", "readonly");
                $("#Tagrs").html("");
                if(urARR.length>0&& urARR[0].Name ){
                    getOrghtml ();//绑定其他组织机构帮助的内容 并增加删除的点击事件
                }
            }else{
                // $("#Password").focus(function(event){
                //     $("#Password").attr("type","password");
                //     event.stopPropagation();
                // })
                // $("#Password").blur(function(event){
                //     hidPassword=$("#Password").val();
                //     var aa='';
                //     for(var i=0;i<hidPassword.length;i++){
                //         aa +="•"
                //     }
                //
                //     //console.log(aa);
                //     $("#Password").attr("type","text");
                //     $("#Password").val(aa);
                //     event.stopPropagation();
                // })
                $("#Password").attr("type","password")
                isShowHide.off('click').on('click',function(){
                    if(isShowHide1.hasClass('glyphicon-eye-close')){
                        isShowHide1.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');//密码可见
                        showPwd.attr("type","text");
                    }else{
                        isShowHide1.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');//密码不可见
                        showPwd.attr("type","password");
                    };
                });
                // hidPassword=$("#Password").val();
            }
            //控制密码显示和隐藏

            //日期控件
            $('.date').datepicker();
            //this.loadFormData();
            //企业客户帮助
            $("#ComBusiCustomerDiv").helper17({
                multi: false,
                showPagination: true,
                filterKey:function(){
                    return ("{Type:2}")
                }
            });
            //公司 部门 工作组帮助

            //公司帮助
            $("#company").filterTreeHelper17({
                multi: false,
                showPagination: false,
                showType:1,
                IsDetail:0,
                filterKey:function(){
                    console.log('zouwo')
                    return {
                        ParentID:"0",
                        IsFlag:'1',
                        // OrgType:'公司',
                        Data_FunctionID:"C1680F43-7867-4A58-B12E-72A01668CE38",
                        Data_PermissionsID:"E014043A-B531-48B1-9BA6-E5C4B80DBC07"
                    }
                },
                openNode: function (node) {
                    var id = node.curId;
                    var url = ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList";
                    var nodePostData = {
                        'filter':'{"FilterKey":{' +
                        '"ParentID":"' + id + '",' +
                        /*  '"OrgType":"公司",' +*/
                        '"Data_FunctionID":"C1680F43-7867-4A58-B12E-72A01668CE38",' +
                        '"Data_PermissionsID":"E014043A-B531-48B1-9BA6-E5C4B80DBC07"' +
                        '}}'
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
                },
                confirmCallback:function (tr, $triggerBtn) {
                    if($("#CompanyCategory").val()!="公司"){
                        NotifyWarning("请选择类型为公司的组织机构！");
                        $('#CompanyID').val('');
                        $('#CompanyName').val('');
                    }
                    $("#DepartmentID").val("");
                    $("#DepartmentID").removeAttr("title");
                    $("#DepartmentName").val("");
                    $("#DepartmentName").removeAttr("title");
                    $("#WorkgroupID").val("");
                    $("#WorkgroupID").removeAttr("title");
                    $("#WorkgroupName").val("");
                    $("#WorkgroupName").removeAttr("title");
                    defaultArr=[];
                    defaultArr.push($("#CompanyID").val());
                    $("#Tagrs").html("");
                    if(urARR.length>0&& urARR[0].Name ){
                        for(var i=0;i<urARR.length;i++){
                            if($("#CompanyID").val()==urARR[i].ID){
                                // console.log(1);
                                urARR.splice(i,1)
                            }
                            // DepartmentName +=urARR[i].Name;
                            //console.log(Tagr);
                        }
                        getOrghtml ();
                    }

                }
            });
            //部门帮助
            $("#Department").filterTreeHelper17({
                multi: false,
                showPagination: false,
                showType:1,
                IsDetail:0,
                filterKey:function(){
                    return {
                        ParentID:$("#CompanyID").val(),
                        // ParentID:"0",
                        IsFlag:'1',
                        Data_FunctionID:"C1680F43-7867-4A58-B12E-72A01668CE38",
                        Data_PermissionsID:"E014043A-B531-48B1-9BA6-E5C4B80DBC07"
                    }
                },
                openNode: function (node) {
                    var id = node.curId;
                    var url = ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList";
                    var nodePostData = {
                        'filter':'{"FilterKey":{' +
                        '"ParentID":"' + id + '",' +
                        '"Data_FunctionID":"C1680F43-7867-4A58-B12E-72A01668CE38",' +
                        '"Data_PermissionsID":"E014043A-B531-48B1-9BA6-E5C4B80DBC07"' +
                        '}}'
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
                },
                berforeOpen:function (){
                    var CompanyID=$("#CompanyID").val();
                    if(!CompanyID){
                        NotifyWarning("请选择公司！");
                        return false
                    }else{
                        return  true
                    }
                },
                confirmCallback:function(tr, $triggerBtn) {
                    if($("#DepartmentCategory").val()!="部门"){
                        NotifyWarning("请选择类型为部门的组织机构！");
                        $('#DepartmentID').val('')
                        $('#DepartmentName').val('')
                    }
                    $("#WorkgroupID").val("");
                    $("#WorkgroupID").removeAttr("title");
                    $("#WorkgroupName").val("");
                    $("#WorkgroupName").removeAttr("title");
                    defaultArr = [];
                    defaultArr.push($("#CompanyID").val());
                    defaultArr.push($("#DepartmentID").val());
                    $("#Tagrs").html("");
                    if (urARR.length > 0 && urARR[0].Name) {
                        for (var i = 0; i < urARR.length; i++) {
                            if ($("#DepartmentID").val() == urARR[i].ID) {
                                urARR.splice(i, 1)
                            }
                            // DepartmentName +=urARR[i].Name;//console.log(Tagr);
                        }
                        getOrghtml();
                    }
                }
            });
            //工作组
            $("#workgroup").filterTreeHelper17({
                multi: false,
                showPagination: false,
                showType:1,
                IsDetail:0,
                filterKey:function(){
                    return {
                        ParentID:$("#DepartmentID").val(),
                        // ParentID:"0",
                        IsFlag:'1',
                        Data_FunctionID:"C1680F43-7867-4A58-B12E-72A01668CE38",
                        Data_PermissionsID:"E014043A-B531-48B1-9BA6-E5C4B80DBC07"
                    }
                },
                openNode: function (node) {
                    var id = node.curId;
                    var url = ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList";
                    var nodePostData = {
                        'filter':'{"FilterKey":{' +
                        '"ParentID":"' + id + '",' +
                        '"Data_FunctionID":"C1680F43-7867-4A58-B12E-72A01668CE38",' +
                        '"Data_PermissionsID":"E014043A-B531-48B1-9BA6-E5C4B80DBC07"' +
                        '}}'
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
                },
                berforeOpen:function (){
                    var CompanyID=$("#CompanyID").val();
                    var DepartmentID=$("#DepartmentID").val();
                    if(!CompanyID){
                        NotifyWarning("请选择公司！");
                        return false
                    }else if(CompanyID && !DepartmentID){
                        NotifyWarning("请选择部门！");
                        return false
                    }else{
                        return  true
                    }
                },
                confirmCallback:function(tr, $triggerBtn){
                    if($("#WorkgroupCategory").val()!="工作组"){
                        NotifyWarning("请选择类型为工作组的组织机构！");
                        $('#WorkgroupID').val()
                        $('#WorkgroupName').val()
                    }
                    defaultArr=[];
                    defaultArr.push($("#CompanyID").val());
                    defaultArr.push($("#DepartmentID").val());
                    defaultArr.push($("#WorkgroupID").val());
                    $("#Tagrs").html("");
                    if(urARR.length>0&& urARR[0].Name ){
                        for(var i=0;i<urARR.length;i++){
                            if($("#WorkgroupID").val()==urARR[i].ID){
                                urARR.splice(i,1)
                            }
                            // DepartmentName +=urARR[i].Name;
                            //console.log(Tagr);
                        }
                        getOrghtml();
                    }
                }
            });


        },
        components:{
            //:OtherComponent
        },
        methods :{
            save :function () {
                //对结果集的判断
                // console.log(hidPassword);
                // debugger;
                var formData=$('#form').data("bootstrapValidator");
                formData.validate();
                let _this = this;
                var verify=formData.isValid();
                if(!verify){
                    NotifyWarning("您有未填必选项！");
                    return
                };
                var UserId = this.$route.query.UserId;
                var Account=$("#Account").val();
                // var telreg=/^1[3|4|5|7|8]{1}[0-9]{9}$/;
                // var telflag=telreg.test(Account);
                // if(telflag){
                //     NotifyWarning("用户名不能为手机号！");
                //     return
                // }
                var emailreg=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                var emailflag=emailreg.test(Account);
                if(emailflag){
                    NotifyWarning("账号不能为邮箱！");
                    return
                }
                var data={
                    "UserID":"",
                    "Code":$("#Code").val(),
                    "Account":$("#Account").val(),
                    "RealName":$("#RealName").val(),
                    // "Password":hidPassword,
                    "Password":$("#Password").val(),
//                    "Gender":"",
                    "Mobile":$("#Mobile").val(),
//                    "Birthday":"",
//                    "TelePhone":$("#TelePhone").val(),
                    "DutyID":$("#DutyID").val(),
//                    "OICQ":$("#OICQ").val(),
                    "Email":$("#Email").val(),
                    // "OrganizationIds":$("#OrganizationIds").val(),
                    "Description":$("#Description").val(),
                    "ACCompanyID":$.trim($("#ACCompanyID").val()),
                    "BusiCustID":$.trim($("#BusiCustID").val()),
                    "ACCompanyName":$.trim($("#ACCompanyName").val()),
                    "BusiCustName":$.trim($("#BusiCustName").val()),
                    "DeleteMark":"0",
                    "CompanyID":$.trim($("#CompanyID").val()),
                    "DepartmentID":$.trim($("#DepartmentID").val()),
                    "WorkgroupID":$.trim($("#WorkgroupID").val()),
                    "OrganizationIds":$.trim($("#otherDepartmentID").val()),
                    "CustomerId":$.trim($("#CustomerId").val()),
                    "AreaCode":$.trim($("#AreaCode").val())
                };
                if(data.OrganizationIds=='null'){
                    data.OrganizationIds='';
                }
                var flag = this.$route.query.flag;
                if(flag!="add"){
                    data.Password=$("#Password1").val();
                    data.SecretKey=$("#SecretKey").val();
                }
                data.DeleteMark="0";
                var Enabled = 1;
                if($("#Enabled")[0].checked == false){
                    Enabled = 0;
                }
                data.Enabled=Enabled;
                data.IsSync=$("#IsSync")[0].checked?1:0;
                if(this.$route.query.flag != "add"){
                    data.UserID=UserId;
                    let updateUrl=ServiceHost+'/api/invoke?SID=SYS_UserMgr_UpdateUser';
                    getDataSync(updateUrl, "post",
                            {"entity": JSON.stringify(data)}, function (result) {
                                if(result>0){
                                    urARR = [];
                                    defaultArr=[];
                                    NotifySuccess("操作成功");
                                    _this.$router.go(-1);
                                }else{
                                    NotifyError("操作失败");
                                }
                            });
                }else{
                    let addUrl=ServiceHost+'/api/invoke?SID=SYS_UserMgr_InsertUser';
                    getDataSync(addUrl, "post",
                            {"entity": JSON.stringify(data)}, function (result) {
                                if(result){
                                    urARR = [];
                                    defaultArr=[];
                                    NotifySuccess("操作成功");
                                    _this.$router.go(-1);
                                }else{
                                    NotifyError("操作失败");
                                }
                            });
                }

            },
            back:function () {
                urARR = [];
                defaultArr=[];
                this.$router.go(-1);
            },
            Department:function(){
                $("#OrganizationDiv").modal("show");
                /* $("#UnrelateModal"),show(function(){
                 alert(1);
                 });*/
                $('#OrganizationDiv').off("shown.bs.modal").on('shown.bs.modal', function () {
                    istree=true;
                    var checkbox_th=$("#checkbox_th").length;
                    if(checkbox_th>0){
                        $("#checkbox_th").remove();
                        $("#gridBodyDiv_organizationstable").remove();
                        $("#gridHeaderDiv_organizationstable").remove();
                        $("#organizationstable").removeData('bs.treegrid17');
                        $("#organizationstable").removeData('bs.datagrid17');
                    }
                    $("#KeyOrganization").val("");
                    LoadOrgsData();
                })

            },
            btnSure:function(){
                //console.log(urARR);
                var DepartmentID="";
                var DepartmentName="";
                $("#Tagrs").html("");
                if(urARR.length>0){
                    for(var i=0;i<urARR.length;i++){
                        var html="<span style='margin-right: 5px;margin-bottom: 5px' class='tag label label-info'>"+urARR[i].Name+"<i class='glyphicon glyphicon-remove'style='margin-left: 3px;cursor:pointer'></i>"+"</span>";
                        $("#Tagrs").append(html);
                        DepartmentID =DepartmentID+urARR[i].ID+",";
                        DepartmentName =DepartmentName+urARR[i].Name+",";
                        // DepartmentName +=urARR[i].Name;
                        //console.log(Tagr);

                    }
                }
                var str=(DepartmentID.substring(DepartmentID.length-1)==',')?DepartmentID.substring(0,DepartmentID.length-1):DepartmentID;
                var strname=(DepartmentName.substring(DepartmentName.length-1)==',')?DepartmentName.substring(0,DepartmentName.length-1):DepartmentName;
                $("#otherDepartmentID").val(str);
                $("#otherDepartmentName").val(strname);
                $("#Tagrs").find("i.glyphicon").on("click",function(e){
                    DepartmentID="";
                    DepartmentName="";
                    var  str="";
                    var strname="";
                    var Name=$(this).parent().text()
                    $.each(urARR,function(index,item){
                        // index是索引值（即下标）   item是每次遍历得到的值；
                        if(item) {
                            if (item.Name == Name) {
                                urARR.splice(index, 1);
                            }
                        }
                    });
                    for(var i=0;i<urARR.length;i++){
                        DepartmentID =DepartmentID+urARR[i].ID+",";
                        DepartmentName =DepartmentName+urARR[i].Name+",";
                        // DepartmentName +=urARR[i].Name;
                        //console.log(Tagr);

                    };
                    str=(DepartmentID.substring(DepartmentID.length-1)==',')?DepartmentID.substring(0,DepartmentID.length-1):DepartmentID;
                    strname=(DepartmentName.substring(DepartmentName.length-1)==',')?DepartmentName.substring(0,DepartmentName.length-1):DepartmentName;
                    $("#otherDepartmentID").val(str);
                    $("#otherDepartmentName").val(strname);
                    $(this).parent().remove();
                })
            },
            searchOrg:function(){
                var checkbox_th=$("#checkbox_th").length;
                var KeyOrganization=$("#KeyOrganization").val();
                if(checkbox_th==0){
                    if(KeyOrganization){
                        istree=false;
                        $("#gridBodyDiv_organizationstable").remove();
                        $("#gridHeaderDiv_organizationstable").remove();
                        $("#organizationstable").removeData('bs.datagrid17');
                        $("#organizationstable").removeData('bs.treegrid17');
                        $("#orgtabrow>th").first().after('<th style="width: 50px; text-align: center;padding-bottom: 0px;padding-top:0px" id="checkbox_th" >'+
                                '<div class="checkbox" style="margin-top: 0px; margin-bottom: 0px;top:8px">'+
                                '<label style="padding-left: 0px;">'+
                                '<input id="Checkbox_SelAll" type="checkbox" class="colored-success input-sm frameSelAll">'+
                                '<span class="text"></span>'+
                                '</label></div></th>')
                        LoadOrgsData();
                    }else{
                        istree=true;
                        LoadOrgsData();
                    }
                }else{
                    istree=false;
                    LoadOrgsData();
                }
            },
            restOrg:function(){
                var checkbox_th=$("#checkbox_th").length;
                if(checkbox_th>0){
                    istree=true;
                    var checkbox_th=$("#checkbox_th").length;
                    if(checkbox_th>0){
                        $("#checkbox_th").remove();
                        $("#gridBodyDiv_organizationstable").remove();
                        $("#gridHeaderDiv_organizationstable").remove();
                        $("#organizationstable").removeData('bs.treegrid17');
                        $("#organizationstable").removeData('bs.datagrid17');
                    }
                    $("#KeyOrganization").val("");
                    LoadOrgsData();
                }else{
                    istree=true;
                    $("#KeyOrganization").val("");
                    LoadOrgsData();
                }
            },
            autoSubmit:function(){
                var checkbox_th=$("#checkbox_th").length;
                var KeyOrganization=$("#KeyOrganization").val();
                if(checkbox_th==0){
                    if(KeyOrganization){
                        istree=false;
                        $("#gridBodyDiv_organizationstable").remove();
                        $("#gridHeaderDiv_organizationstable").remove();
                        $("#organizationstable").removeData('bs.datagrid17');
                        $("#organizationstable").removeData('bs.treegrid17');
                        $("#orgtabrow>th").first().after('<th style="width: 50px; text-align: center;padding-bottom: 0px;padding-top:0px" id="checkbox_th" >'+
                                '<div class="checkbox" style="margin-top: 0px; margin-bottom: 0px;top:8px">'+
                                '<label style="padding-left: 0px;">'+
                                '<input id="Checkbox_SelAll" type="checkbox" class="colored-success input-sm frameSelAll">'+
                                '<span class="text"></span>'+
                                '</label></div></th>')
                        LoadOrgsData();
                    }else{
                        istree=true;
                        LoadOrgsData();
                    }
                }else{
                    istree=false;
                    LoadOrgsData();
                }
            }
        }
    }
    //其他组织机构
    function LoadOrgsData(curPageNum) {
        // debugger
        const dataUrl = "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList";
        var keyWord = $("#KeyOrganization").val();//获取搜索框中内容
        var parentId = null;
        if(keyWord == "" || keyWord == null){
            parentId = "0";
        }
        var postData = {
            "filter": {
                "FieldName":"",
                "Keywords":keyWord,
                "FilterKey":{"ParentID":"0","IsFlag":"1","Data_FunctionID":"C1680F43-7867-4A58-B12E-72A01668CE38","Data_PermissionsID":"E014043A-B531-48B1-9BA6-E5C4B80DBC07"},
            }
        };
        var flag = false;
        $("#organizationstable").off("BODY_RENDER_COMPLETE").on("BODY_RENDER_COMPLETE", function () {
            if(istree){
                for (var j = 0; j < urARR.length; j++) {
                    //var id = urARR[j].ID;
                    var id = urARR[j].ID;
                    $("#gridBodyDiv_organizationstable").find("input.curId[value='"+id+"']").closest("tr").find(".ckselect").prop("checked",true);
                }
                //点开其他组织机构帮助后 默认公司/部门/工作组的选择勾选 且不可编辑
                for(var i=0;i<defaultArr.length;i++){
                    var defaultid=defaultArr[i];
                    $("#gridBodyDiv_organizationstable").find("input.curId[value='"+defaultid+"']").closest("tr").find(".ckselect").prop("checked",true);
                    $("#gridBodyDiv_organizationstable").find("input.curId[value='"+defaultid+"']").closest("tr").find("td").css("background-color","#E8E8E8");
                    //  $("#organizationstable").find("input.curId[value='"+defaultid+"']").closest("tr").find(".ckselect").prop("disabled","disabled");
                    $("#gridBodyDiv_organizationstable").find("input.curId[value='"+defaultid+"']").closest("tr").find(".ckselect").on("change",function(){
                        $(this).prop("checked",true);
                        NotifyWarning("默认项无法在此取消");
                    })

                };
            }else{
                var hidInputs = $('#gridBodyDiv_organizationstable').find("tbody").find('input[name="hidId"]');
                for(var i=0;i<hidInputs.length;i++){
                    for (var j = 0; j < urARR.length; j++) {
                        if (hidInputs[i].value == urARR[j].ID){
                            $(hidInputs[i]).parent().parent()[0].click();
                        }
                    }
                    for (var j = 0; j < defaultArr.length; j++) {
                        if (hidInputs[i].value == defaultArr[j]){
                            $(hidInputs[i]).parent().parent()[0].click();
                        }
                    }
                }
            }
        });
        if(istree){
            $("#organizationstable").treegrid17({
                showPagination: false,
                url: ServiceHost + dataUrl,
                tableType: "single",
                resizeCol: true,
                checkSelf:true,
                showCheckbox:true,
                //showPageSelect:false,
                openNode: function (node) {
                    var id = node.curId;
                    var url = ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList";
                    var nodePostData = {
                        "filter": "{" +
                        "'ParentID':'" + id + "'," +
                        "'Data_FunctionID':'C1680F43-7867-4A58-B12E-72A01668CE38'," +
                        "'Data_PermissionsID':'E014043A-B531-48B1-9BA6-E5C4B80DBC07'" +
                        "}"
                    };
                    var data = {total: 0, rows: []}
                    getDataSync(url, "get", nodePostData, function (rdata) {
                        data = rdata;
                    });
                    return data;
                },
                hiddenInps: [
                    { inpNm: "hidId", inpValue: "ID" },
                    { inpNm: "hidName", inpValue: "AllName" },
                    { inpNm: "hidCategory", inpValue: "Category" }
                ],
                afterOpenNode:function(node,$tr){
                    for (var j = 0; j < urARR.length; j++) {
                        var id = urARR[j].ID;
                        $("#gridBodyDiv_organizationstable").find("input.curId[value='"+id+"']").closest("tr").find(".ckselect").prop("checked",true);
                    }
                    //点开其他组织机构帮助后 默认公司/部门/工作组的选择勾选 且不可编辑
                    for(var i=0;i<defaultArr.length;i++){
                        var defaultid=defaultArr[i];
                        $("#gridBodyDiv_organizationstable").find("input.curId[value='"+defaultid+"']").closest("tr").find(".ckselect").prop("checked",true);
                        $("#gridBodyDiv_organizationstable").find("input.curId[value='"+defaultid+"']").closest("tr").find("td").css("background-color","#E8E8E8");
                        $("#gridBodyDiv_organizationstable").find("input.curId[value='"+defaultid+"']").closest("tr").find(".ckselect").on("change",function(){
                            $(this).prop("checked",true);
                            NotifyWarning("默认项无法在此取消");
                        })


                    }
                },
                afterCkClick:function(node,$curTr){
                    // console.log(2);
                    var isChecked = node.isChecked;
                    var ID = node.curId;
                    var Name= $curTr.find("[name='hidName']").val();
                    var Category = "";
                    var checkData = {ID:ID,Name:Name,Category:Category};
                    //debugger
                    if(isChecked) {//选中的追加到用户角色数组
                        if(urARR.length == 0) {
                            urARR.push(checkData);
                        }else{
                            var flag;
                            for(var i = 0; i < urARR.length; i++){
                                if(urARR[i].ID == ID){
                                    flag = false;
                                    break;
                                }else{
                                    flag = true;
                                }
                            }
                            if(flag == true){
                                urARR.push(checkData);
                            }
                        }

                    }
                    else {//取消选中的从数组中移除
                        $.each(urARR,function(index,item){
                            // index是索引值（即下标）   item是每次遍历得到的值；
                            if(item) {
                                if (item.ID == ID) {
                                    urARR.splice(index, 1);
                                }
                            }
                        });
                    }
                },
                success: function (rData) {
                }
            }).data('bs.treegrid17').searchByFilter({ searchCond: postData });
        }else{
            $("#organizationstable").datagrid17({
                showPagination: true,
                url: ServiceHost + dataUrl,
                tableType: "multi",
                resizeCol: true,
                checkAll:true,
                autoHeight:false,
                showPageSelect:true,
                hiddenInps: [
                    { inpNm: "hidId", inpValue: "ID" },
                    { inpNm: "hidName", inpValue: "AllName" },
                    { inpNm: "hidCategory", inpValue: "Category" }
                ],
                success: function (rData) {
                },
                trclick:function(tr){
                    var isChecked = $(tr).find("input.keyword:checked").length>0;
                    var checkedId = $(tr).find("input[name='hidId']").val();
                    var Name= $(tr).find("input[name='hidName']").val();
                    var Category = "";
                    var checkData = {ID:checkedId,Name:Name,Category:Category};
                    if(!isChecked){
                        for (var j = 0; j < defaultArr.length; j++) {
                                if(checkedId==defaultArr[j]){
                                    $(tr).click();
                                    NotifyWarning("默认项无法在此取消");
                                }
                        }
                        $.each(urARR, function(index, item) {
                            // index是索引值（即下标）   item是每次遍历得到的值；
                            if(item) {
                                if (item.ID == checkedId) {
                                    urARR.splice(index, 1);
                                }
                            }
                        });
                    }else{
                        var isExist = false; //是否存在
                        $.each(urARR, function(index, item) {
                            // index是索引值（即下标）   item是每次遍历得到的值；
                            if(item) {
                                if (item.ID == checkedId) {
                                    isExist = true;
                                    return false;
                                }
                            }
                        });
                        if (!isExist) { //不存在则添加
                            urARR.push(checkData); //选中的追加到用户角色数组
                        }
                    }

                },
            }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
        }
    }
    //加载其他组织机构的内容 并增加点击事件 删除
    function getOrghtml (){
        var DepartmentID="";
        var DepartmentName="";
        for(var i=0;i<urARR.length;i++){
            var html="<span style='margin-right: 5px;margin-bottom: 5px' class='tag label label-info'>"+urARR[i].Name+"<i class='glyphicon glyphicon-remove'style='margin-left: 3px;cursor:pointer'></i>"+"</span>";
            $("#Tagrs").append(html);
            DepartmentID =DepartmentID+urARR[i].ID+",";
            DepartmentName =DepartmentName+urARR[i].Name+",";
            // DepartmentName +=urARR[i].Name;
            //console.log(Tagr);

        }
        var str=(DepartmentID.substring(DepartmentID.length-1)==',')?DepartmentID.substring(0,DepartmentID.length-1):DepartmentID;
        var strname=(DepartmentName.substring(DepartmentName.length-1)==',')?DepartmentName.substring(0,DepartmentName.length-1):DepartmentName;
        $("#otherDepartmentID").val(str);
        $("#otherDepartmentName").val(strname) ;
        $("#Tagrs").find("i.glyphicon").on("click",function(e){
            DepartmentID="";
            DepartmentName="";
            var  str="";
            var strname="";
            var Name=$(this).parent().text()
            $.each(urARR,function(index,item){
                // index是索引值（即下标）   item是每次遍历得到的值；
                if(item) {
                    if (item.Name == Name) {
                        urARR.splice(index, 1);
                    }
                }
            });
            for(var i=0;i<urARR.length;i++){
                DepartmentID =DepartmentID+urARR[i].ID+",";
                DepartmentName =DepartmentName+urARR[i].Name+",";
                // DepartmentName +=urARR[i].Name;
                //console.log(Tagr);

            };
            str=(DepartmentID.substring(DepartmentID.length-1)==',')?DepartmentID.substring(0,DepartmentID.length-1):DepartmentID;
            strname=(DepartmentName.substring(DepartmentName.length-1)==',')?DepartmentName.substring(0,DepartmentName.length-1):DepartmentName;
            $("#otherDepartmentID").val(str);
            $("#otherDepartmentName").val(strname);
            $(this).parent().remove();
        })
    }
</script>
