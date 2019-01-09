<template>
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12">
            <div class="tabbable tabs-top">
                <div>
                    <div class="tab-pane in active">
                        <!--按钮操作区-->
                        <div class="well widget-body" name="ButtonGroup">
                            <!--<button @click="save" title="保存" class="btn btn-primary "><i class="fa fa-reply "></i>保存</button>-->
                            <button @click="back" title="返回" class="btn btn-primary "><i class="fa fa-reply "></i>返回</button>
                        </div>
                        <form class="form-horizontal" method="post" id="form">
                            <!--数据展示区-->
                            <div class="well widget-body">
                                <div class="row">
                                    <div class="col-lg-12 col-sm-12 col-xs-12" style="padding-left:2px;">
                                        <h5 class="row-title before-color" style="padding-left:2px;"><i class="fa fa-file-text iconcolor"></i>分配角色</h5>
                                    </div>
                                </div>
                                <div id="form" class="row">
                                    <div class="col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-6 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">*用户</label>
                                                <div class="col-sm-8  ">
                                                    <div class="input-group"id="UserHelpDiv">
                                                        <input type="hidden" name="UserID" id="UserID" value="" data-recive-helper-data="id">
                                                        <input type="text" name="UserName" id="UserName" class="form-control input-sm" readonly="readonly" data-recive-helper-data="name"  data-bv-notempty="true" data-bv-field="UserName" data-bv-notempty-message="请选择用户">
                                                        <span class="input-group-btn">
                                                <button class="btn btn-default shiny btn-sm" data-toggle="modal" id="AppBtn" @click="UserModal" type="button" data-validate="false">
                                                    <i class=" fa fa-ellipsis-h"></i>
                                                </button>
                                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="authInfo" class="row">
                                    <div class="col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">查询</label>
                                                <div class="col-sm-10">
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
                                                        <div class="input-group helper-group" style="width: 200px">
                                                            <input type="text" class="form-control input-sm input-sm" id="tabkey" v-on:keyup.enter="tabSearch" placeholder="角色编号、角色名称">
                                                        </div>
                                                    </div>
                                                    <a id="Search" class="btn btn-default " href="javascript:void(0);" v-on:click="tabSearch">
                                                        <i class="fa fa-search"></i>查 询
                                                    </a>
                                                    <a id="Reset" class="btn btn-default " href="javascript:void(0);" v-on:click="tabReset">
                                                        <i class="fa fa-repeat"></i>重 置
                                                    </a >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">操作</label>
                                                <div class="col-sm-10">
                                                    <button type="button" id="AddRow" @click="showUserlog" class="btn btn-default ">
                                                        <i class="fa fa-plus"></i>增加角色
                                                    </button>
                                                    <button type="button" id="DeleteRow" @click="DeleteRow" class="btn btn-default ">
                                                        <i class="fa fa-minus"></i>删除角色
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-12 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label">已分配角色</label>
                                                <div class="col-sm-10" id=" ">
                                                    <div class="table-responsive" style="overflow-x: auto" id="Assigndiv">
                                                        <table class="table table-striped table-hover table-bordered  max-width-table" id="RoleTable"
                                                               style="table-layout:fixed !important">
                                                            <thead>
                                                            <tr role="row">
                                                                <th style="width: 50px;"  class="text-center Code_col">
                                                                    <label for="">序号</label>
                                                                </th>
                                                                <th style="width: 80px;" data-field="field:Code,cssClass:text-left,hasTitle:true,enum:{null= }" class="text-center Code_col">
                                                                    <label for="">编号</label>
                                                                </th>
                                                                <th style="width: 180px;" data-field="field:FullName,cssClass:text-left,hasTitle:true,enum:{null= }" class="text-center TaskStatus_col">
                                                                    <label for="">名称</label>
                                                                </th>
                                                                <th style="width: 80px; " data-field="field:ItemName,cssClass:text-left,hasTitle:true,enum:{null= }" class="text-center TaskStatus_col">
                                                                    <label for="">分类</label>
                                                                </th>
                                                                <th style="width:180px;" data-field="field:Description,cssClass:text-left,hasTitle:true,enum:{null= }" class="text-center TaskStatus_col">
                                                                    <label for="">描述</label>
                                                                </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody id="tbodySelect">
                                                            <tr>
                                                                <td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="5">无记录</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <!--按钮操作区-->
                        <div class="well widget-body" name="ButtonGroup">
                            <!--  <button @click="save" title="保存" class="btn btn-primary "><i class="fa fa-reply "></i>保存</button>-->
                            <button @click="back" title="返回" class="btn btn-primary "><i class="fa fa-reply "></i>返回</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--待选择的角色帮助(二级菜单)-->
        <div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false"
             id="UnrelateModal" data-backdrop="static" style="overflow-y: auto">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header"> <button type="button" class="bootbox-close-button close" @click="closehelp" data-dismiss="modal" aria-hidden="true">×</button>
                        <h6 class="modal-title">角色帮助</h6>
                    </div>
                    <div class="modal-body" id="DetailDataBody">
                        <div class="table-toolbar">
                            <div class="btn-group">
                                <div class="input-group helper-group" id="OrgHelpDiv" style=" float: left; width: 150px">
                                    <input type="hidden" name="OrganizationID"  data-recive-helper-data="id" id="OrganizationID">
                                    <input type="hidden" id="OrganizationCode" name="OrganizationCode" data-recive-helper-data="code">
                                    <input type="text" name="OrganiationName" id="OrganiationName" class="form-control input-sm" readonly="readonly" data-recive-helper-data="name" placeholder="组织机构" style="width:160px" />
                                    <span class="input-group-btn">
                                        <button class="btn btn-default shiny btn-sm" data-toggle="modal" data-helper="UserAssRoleHelp" type="button" data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                    </span>
                                </div>
                            </div>
                            <div class="btn-group">
                                <div class="input-group helper-group" style=" float: left; width: 200px">
                                    <input type="text" class="form-control input-sm input-sm" id="keywords" name="keywords"
                                           @keyup.enter="search" placeholder="编号、名称">
                                </div>
                            </div>
                            <button id="BtnSearch" class="btn btn-default " @click="search">
                                <i class="fa fa-search"></i>查 询
                            </button>
                            <button id="BtnReset" class="btn btn-default " @click="reset">
                                <i class="fa fa-repeat"></i>重 置
                            </button>
                        </div>
                        <div class="form-group">
                            <div class="table-responsive">
                                <table class="table table-striped table-hover table-bordered  max-width-table" id="UnRoleTable">
                                    <thead>
                                    <tr role="row">
                                        <th style="width: 50px;"  class="text-center Code_col">
                                            <label for="">序号</label>
                                        </th>
                                        <th style="width: 50px; text-align: center;padding-bottom: 0px;padding-top:0px">
                                            <div class="checkbox" style="margin-top: 0px; margin-bottom: 0px;top:8px">
                                                <label style="padding-left: 0px;">
                                                    <input id="Checkbox_SelAll" type="checkbox" class="colored-success input-sm frameSelAll">
                                                    <span class="text"></span>
                                                </label>
                                            </div>
                                        </th>
                                        <th  data-field="field:Code,cssClass:text-left,hasTitle:true,enum:{null= }" style="width:80px" class="text-center Code_col">
                                            <label for="">编号</label>
                                        </th>
                                        <th  data-field="field:FullName:text-left,hasTitle:true,enum:{null= }"  style="width:200px" class="text-center FullName_col">
                                            <label for="">名称</label>
                                        </th>
                                        <th  data-field="field:ItemName,cssClass:text-center,hasTitle:true,enum:{null= }" style="width:100px" class="text-center ItemName_col">
                                            <label for="">角色分类</label>
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
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="save">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 用户帮助-->
        <div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false"
             id="UserModal" data-backdrop="static" style="overflow-y: auto">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header"> <button type="button" class="bootbox-close-button close"
                                                       data-dismiss="modal" aria-hidden="true">×</button>
                        <h6 class="modal-title">用户帮助</h6>
                    </div>
                    <div class="modal-body" >
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
                                    <input type="text" class="form-control input-sm input-sm" id="keywords1" name="keywords1"
                                           @keyup.enter="btnsearch" placeholder="请输入查询条件">
                                </div>
                            </div>
                            <button  class="btn btn-default " @click="btnsearch">
                                <i class="fa fa-search"></i>查 询
                            </button>
                            <button  class="btn btn-default " @click="btnreset">
                                <i class="fa fa-repeat"></i>重 置
                            </button>
                        </div>
                        <div class="form-group">
                            <div class="table-responsive" >
                                <table class="table table-striped table-hover table-bordered  max-width-table" id="userdatatable"
                                       style="">
                                    <thead id="unthead">
                                    <tr role="row" id="untabrow">
                                        <th style="width: 60px;" class="text-center">
                                            <label>
                                                序号
                                            </label>
                                        </th>
                                        <th style="width: 100px; " class="text-center Code_col" data-field="field:Account,cssClass:text-left,hasTitle:true">
                                            <label>
                                                账号
                                            </label>
                                        </th>
                                        <th  class="text-center Name_col" data-field="field:RealName,cssClass:text-left,hasTitle:true,isTree:true">
                                            <label>
                                                姓名
                                            </label>
                                        </th>
                                        <th  class="text-center Name_col" data-field="field:Mobile,cssClass:text-left,hasTitle:true">
                                            <label>
                                                手机
                                            </label>
                                        </th>
                                    </tr>

                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="4">请输入查询条件</td>
                                    </tr>
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="btnsave">确定</button>
                        <button type="button" class="btn" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var roleArrr=[];//已关联的用户集合
    var addroleArr=[];//增加的数组
    var delroleArr=[];//删除的数组
    var isfirtOpen=false;//一次判断 第一次打开帮助 或者帮助翻页时  不进行trclick() 方法里的Adds Dels的操作
    export default{
        data()
        {
            return {
                SearchType:'',
            }
        },
        mounted()
        {
            $("#RoleSortDiv").helper17({
                multi: false,
                showPagination: true
            });
            //PC端 面包屑的修改
            if(isPC()){
                var  crumbs=$("#breadcrumbs small");
                crumbs.html("<i class='fa fa-angle-right'></i>"+"用户管理"+" <i class='fa fa-angle-right'></i>"+ "分配角色");

            }
            var userId=this.$route.query.userId;
            var UserName=this.$route.query.UserName;
            if(typeof(userId) != 'undefined'){
                UserName=decodeURIComponent(UserName);
                $("#UserID").val(userId);
                $("#UserName").val(UserName);
                LoadPagedate();
                getAllRolers();//把所有的角色放进数组
            }

            //用户帮助
            // $("#UserHelpDiv").helper17({
            //     multi: false,
            //     showPagination: true,
            //     confirmCallback:function(){
            //         roleArrr=[];
            //         var UserID=$("#UserID").val();
            //         if(UserID){
            //             getAllRolers();//把所有的角色放进数组
            //             isfirtOpen=false;
            //             addroleArr=[];
            //             delroleArr=[];
            //             LoadPagedate();
            //
            //         }else{
            //             $("#tbodySelect").html(' <tr><td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="5">无记录</td></tr>');
            //             $("div[name='RoleTable']").html("");
            //         }
            //
            //     },
            //     filterKey:function () {
            //         return{
            //             Data_FunctionID:"DF686BBF-2387-4259-886B-249022156A8A",
            //             Enabled:1
            //         }
            //     },
            //     filterHtml: function (tHtml) {
            //         return tHtml ? tHtml
            //                 : '<li><a href="javascript:void(0);" data-code="">全部</a></li>'
            //         + '<li><a href="javascript:void(0);" data-code="Account">用户名</a></li>'
            //         + '<li><a href="javascript:void(0);" data-code="RealName">姓名</a></li>'
            //         + '<li><a href="javascript:void(0);" data-code="Mobile">手机</a></li>';
            //     }
            // });
            //增加角色里的组织机构帮助
            $("#OrgHelpDiv").filterTreeHelper17({
                multi: false,
                showPagination: false,
                showType:1,
                IsDetail:0,
                filterKey:function(){
                    return {
                        ParentID:'0',
                        IsFlag:'0',
                        Data_FunctionID:"C1680F43-7867-4A58-B12E-72A01668CE38",
                        Data_PermissionsID:"E014043A-B531-48B1-9BA6-E5C4B80DBC07"
                    }
                },
                openNode: function (node) {
                    var id = node.curId;
                    var url = ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList";
                    var nodePostData = {
                        'filter':'{"FilterKey":{"ParentID":"' + id + '",' +
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
        },
        methods :{
            //打开角色帮助
            showUserlog:function(){
                var UserID=$("#UserID").val();
                if(!UserID){
                    NotifyWarning("请选择用户！");
                    return;
                }
               $("#UnrelateModal").modal("show");
                $('#UnrelateModal').one('shown.bs.modal', function () {
                    getAllRolers();
                    UnLoadPagedate();
                });
            },
            //删除角色
            DeleteRow:function () {
                addroleArr=[];
                delroleArr=[];
                var pathUrl=ServiceHost+"/api/invoke?SID=SYS_UserMgr_DeleteUserRoleById";
                var datas = $("#RoleTable").data('bs.datagrid17').getSelectedRowData();
                if (datas) {//说明列表有选中项
                    bootbox.setDefaults("locale", "zh_CN");
                    bootbox.confirm("您确定要删除该记录吗？", function (ok) {
                        if (ok) {
                            let custId = datas.UserRoleID;//内码
                            let roleId = datas.RoleID;//内码
                            getDataSync(pathUrl,"post", {"userRoleId":JSON.stringify(custId) }, function (result) {
                                if(result>0){
                                    //delroleArr.push(roleId);
                                    LoadPagedate();
                                    //getAllRolers();
                                    NotifySuccess("删除成功！");
                                }else{
                                    NotifyError("删除失败");
                                }

                            });
                        }
                    });

                } else {
                    NotifyWarning("请选择要删除的记录！");
                    return;
                }
            },
            back:function(){
                isfirtOpen=false;
                addroleArr=[];
                delroleArr=[];
                roleArrr=[];
                this.$router.go(-1);
            },
            //详情页面的查询
            tabSearch:function(){
                var UserID=$("#UserID").val();
                if(!UserID){
                    NotifyWarning("请先选择用户！");
                }else{
                    LoadPagedate();
                }

            },
            //详情页面的重置
            tabReset:function(){
                var UserID=$("#UserID").val();
                if(!UserID){
                    NotifyWarning("请先选择用户！");
                }else{
                    $("#tabkey").val('');
                    $("#Category").val('');
                    $("#RoleSortName").val('');
                    LoadPagedate();
                }

            },
            //角色帮助里的查询
            search:function(){
                $(".frameSelAll").prop("checked",false);
                UnLoadPagedate();
            },
            //点击自定义帮助(角色帮助)  叉号时   表示放弃修改   清空增加和删除数组
            closehelp:function(){
                isfirtOpen=false;
                /*addroleArr=[];
                delroleArr=[];
                roleArrr=[];*/
            },
            //角色帮助里的重置
            reset:function(){
                $("#OrganizationID").val('');
                $("#OrganizationCode").val('');
                $("#OrganiationName").val('');
                $("#keywords").val('');
                $('.frameSelAll').prop('checked',false);
                UnLoadPagedate();
            },
            //角色帮助里的确定
            save:function(){
                var Adds=[];
                for(var key in addroleArr){
                    Adds.push({"RoleID":addroleArr[key]});
                }
                var Dels=[];
                for(var key in delroleArr){
                    Dels.push({"RoleID":delroleArr[key]});
                }
                var UserID=$("#UserID").val();
                var RoleIds=roleArrr.join(",")
                var SaveDate = {
                    "paramsDto": "{'UserId':'" + UserID + "','Adds':"+JSON.stringify(Adds)+",'Dels':"+JSON.stringify(Dels)+"}"
                };
                getDataSync(ServiceHost + "/api/invoke?SID=SYS_UserMgr_InsertUserRole", "post", SaveDate,
                        function(data) {
                            if (data < 1) {
                                NotifyError("操作失败");
                            }else{
                                NotifySuccess("操作成功");
                                getAllRolers();
                                isfirtOpen=false;
                                addroleArr=[];
                                delroleArr=[];
                                roleArrr=[];
                                LoadPagedate();
                            }
                        });
            },
            UserModal:function (flag) {
                $('#UserModal').modal('show');
                var keywords = $('#keywords1').val();
                if(keywords!=''||this.SearchType!=''){
                    this.SearchType = '';
                    $('#keywords1').val('');
                    var userdatatabledata = $("#userdatatable").data('bs.datagrid17');
                    if(userdatatabledata){
                        window.setTimeout(function () {
                            userdatatabledata.clearData()
                        },200)
                    }
                }
            },
            //选择模块帮助里的查询
            btnsearch:function(){
                var keywords = $('#keywords1').val();
                if(keywords==''){
                    NotifyWarning('请输入查询条件！');
                    return
                }
                this.LoadUserPageData(keywords,this.SearchType);
            },
            //选择模块帮助的重置
            btnreset:function(){
                this.SearchType = '';
                $('#keywords1').val('');
                $("#userdatatable").data('bs.datagrid17').clearData();
            },
            LoadUserPageData:function(keywords,SearchType) {
                var userid = $('#UserID');
                var username = $('#UserName');
                var _this = this;
                let dataUrl = ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetUserList&help=true";
                var postData = {
                    "filter":{
                        "FieldName":SearchType,
                        "FieldValue":keywords,
                        'FilterKey':{
                            'Data_FunctionID':'DF686BBF-2387-4259-886B-249022156A8A',
                            'Enabled':'1'
                        }
                    }
                };
                $("#userdatatable").datagrid17({
                    showPagination: true,
                    url: dataUrl,
                    tableType: "single",
                    resizeCol: true,
                    maxRecordLimit:10000,
                    PageSelectList:[5,10,15,20,25,30,35,40,45,50,100],
                    cookieEnable:false,
                    hiddenInps: [
                        { inpNm: "hidId", inpValue: "UserID" },
                        { inpNm: "hidName", inpValue: "Account" },
                    ],
                    success: function (rData) {
                    },
                    trdblclick:function () {
                        let id = $(this).find("input[name='hidId']").val();
                        let name = $(this).find("input[name='hidName']").val();
                        $('#UserID').val(id);
                        $('#UserName').val(name);
                        _this.afteruser();
                        $('#UserModal').modal('hide');
                    }


                }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
            },
            btnsave:function () {
                var userid = $('#UserID');
                var username = $('#UserName');
                var _this = this;
                var obj = $("#userdatatable").data('bs.datagrid17');
                if(!obj){
                    userid.val('');
                    username.val('');
                }else {
                    let datasSel = obj.getSelectedRowData();
                    if(datasSel){
                        var id = datasSel.UserID,
                            name = datasSel.Account;
                        userid.val(id);
                        username.val(name);
                        this.afteruser();
                    }else {
                        userid.val('');
                        username.val('');
                    }
                }
            },
            //选择用户之后的方法
            afteruser:function () {
                roleArrr=[];
                var UserID=$("#UserID").val();
                if(UserID){
                    getAllRolers();//把所有的角色放进数组
                    isfirtOpen=false;
                    addroleArr=[];
                    delroleArr=[];
                    LoadPagedate();

                }else{
                    $("#tbodySelect").html(' <tr><td class="text-center Name_col" title="" style="width: 60px; height: 35px;" colspan="5">无记录</td></tr>');
                    $("div[name='RoleTable']").html("");
                }
            }
        },

    }
    //加载已存在的角色   参数为用户ID
    function LoadPagedate () {
        // debugger
        var UserID=$("#UserID").val();
        var tabkey=$("#tabkey").val();
        var Category = $("#Category").val() == null ? null: $("#Category").val();//$("#RoleSortName").val(),
        var postData = {
            'filter':{
                'ObjectId':UserID,
                "Data_FunctionID":"EB6E735B-70A3-46D7-90A5-C354FAAB415F",
                "Keywords":tabkey,
                "FilterKey": {
                    "Category": Category
                }
            }
        };
        $("#RoleTable").datagrid17({
            showPagination: true,
            url:ServiceHost+"/api/invoke?SID=SYS_UserMgr_GetUserRoleByUserID",
            tableType: "single",
            resizeCol: true,
            showPageSelect:true,
            autoHeight:false,
            hiddenInps: [
                { inpNm: "hidId", inpValue: "UserRoleID" },
                { inpNm: "hidRoleID", inpValue: "RoleID" },
            ],
            success: function (rData) {
            }
        }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
    }

    //加载要选择的角色
    function UnLoadPagedate () {
        const dataUrl = "/api/invoke?SID=SYS_CommonHelper_GetRoleList";
        var keyWord = $.trim($("#keywords").val());
        var OrganizationID=$.trim($("#OrganizationID").val());
        var OrganizationName=$.trim($("#OrganiationName").val());
        var postData = {
            "filter": {
                "FieldName":"",
                "FieldValue":keyWord,
                "FilterKey":{"Data_FunctionID":"EB6E735B-70A3-46D7-90A5-C354FAAB415F"},
                "ObjectID":OrganizationID
            }
        };
        if(!OrganizationID || !OrganizationName){
            postData.filter.ObjectID = null;
        }

        //选中已授权的数据
        $("#UnRoleTable").off("BODY_RENDER_COMPLETE").on("BODY_RENDER_COMPLETE",function(){
            isfirtOpen=false;
            var iii = $("#UnRoleTable").data('bs.datagrid17').tableBodyId;
            var hidInputs =$("#"+iii).find('input[name="hidId"]');
            for(var i=0;i<hidInputs.length;i++){
                for (var j = 0; j < roleArrr.length; j++) {
                    if (hidInputs[i].value == roleArrr[j])
                        $(hidInputs[i]).parent().parent()[0].click();
                }
                for (var j = 0; j < addroleArr.length; j++) {
                    if (hidInputs[i].value == addroleArr[j])
                        $(hidInputs[i]).parent().parent()[0].click();
                }
                for (var j = 0; j < delroleArr.length; j++) {
                    if (hidInputs[i].value == delroleArr[j])
                        $(hidInputs[i]).parent().parent()[0].click();
                }
            }
            isfirtOpen=true;
        });

        $("#UnRoleTable").datagrid17({
            showPagination: true,
            url: ServiceHost+dataUrl,
            tableType: "multi",
            resizeCol: true,
            checkAll:true,
            autoHeight:false,
            showPageSelect:true,
            hiddenInps: [
                { inpNm: "hidId", inpValue: "RoleID" },
                { inpNm: "hidCode", inpValue: "Code" },
                { inpNm: "hidFullName", inpValue: "FullName" },
                { inpNm: "hidItemName", inpValue: "ItemName" },
                { inpNm: "hidDescription", inpValue: "Description" }
            ],
            success: function (rData) {
            },
            trclick:function(tr){
                var isChecked = $(tr).find("input.keyword:checked").length>0;
                var RoleID = $(tr).find("input[name='hidId']").val();

                if(isfirtOpen){
                    if($.inArray(RoleID,roleArrr) ==-1){
                        if($.inArray(RoleID,addroleArr)==-1){
                            if(isChecked){
                                addroleArr.push(RoleID);
                            }
                        }else{
                            if(!isChecked) {
                                $.each(addroleArr, function (index, item) {
                                    // index是索引值（即下标）   item是每次遍历得到的值；
                                    if (item == RoleID) {
                                        addroleArr.splice(index, 1);
                                        return false;
                                    }
                                });
                            }
                        }
                    }else{
                        if($.inArray(RoleID,roleArrr)!=-1 && $.inArray(RoleID,delroleArr) ==-1 ){
                            if(!isChecked){
                                delroleArr.push(RoleID);
                            }
                        }else{
                            $.each(delroleArr,function(index,item){
                                if(isChecked){
                                    // index是索引值（即下标）   item是每次遍历得到的值；
                                    if(item == RoleID){
                                        delroleArr.splice(index,1);
                                        return false;
                                    }
                                }
                            });
                        }
                    }
                }
            }
        }).data('bs.datagrid17').searchByFilter({ searchCond: postData });
    }
    //获取用户所拥有的所有角色
    function getAllRolers() {
        roleArrr=[];
        var userId=$("#UserID").val();
        var getdata={
            "filter":"{ObjectId:"+"'"+userId+"'"+"}"
        };
        getDataSync(ServiceHost + "/api/invoke?SID=SYS_UserMgr_GetRoleIDByUserID", "post", getdata,
                function(data) {
                    //console.log(data);
                    if (data.rows.length>0) {
                        for(var i=0;i<data.rows.length;i++){
                            roleArrr.push(data.rows[i].RoleID)
                        }
                    }
                });
    }
</script>
