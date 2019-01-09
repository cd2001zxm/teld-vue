<template>
    <div class="page-body" id="UserEditPage">
        <div class="row">
            <div class="col-lg-12 col-sm-12 col-xs-12">
                <form action="" class="form-horizontal bv-form" novalidate="novalidate" role="form">
                    <div class="tabbable">
                        <div>
                            <div id="" class="tab-pane in active">
                                <!--头部的保存返回-->
                                <div class="well widget-body" name="btnSave">
                                    <button type="button" class="btn btn-primary" click-text="正在保存" v-on:click="save" id="save">
                                        <i class="fa fa-save "></i>
                                        保存
                                    </button>
                                    <button type="button" name="btnBack" v-on:click="back" class="btn btn-default">
                                        <i class="fa fa-reply "></i>返回
                                    </button>
                                </div>
                                <!-- 中部的信息填写-->
                                <div class="well widget-body">
                                    <div id="" class="row">
                                        <!-- 第一行-->
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">编号</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control" id="Code" name="Code" maxlength="36"  v-bind:value="Code"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">账号</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="text" class="form-control" name="Account " id="Account" maxlength="36" v-bind:value="Account"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 第二行-->
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">姓名</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="hidden" id="" name="" value=""/>
                                                        <input type="text" class="form-control" name="RealName"  v-bind:value="RealName" id="RealName"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">登录密码</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="hidden" id="SecretKey" name="SecretKey" v-bind:value="SecretKey"/>
                                                        <input type="hidden" id="Password" name="Password" v-bind:value="Password"/>
                                                        <input type="text" readonly="readonly" class="form-control"
                                                               value="******"
                                                               data-bv-regexp-message="密码必须是8-20位半角字符,不允许有汉字"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">男女</label>
                                                    <div class="col-sm-8" style="top:4px;">
                                                        <div class="btn-group" >
                                                            <input type="radio" name="1" value="size" style="opacity: 1;left:0; position: static" id="man" v-bind:checked="Gender=='男'"/>
                                                        </div>
                                                        <label class="btn-group" for="nan">
                                                            男
                                                        </label>
                                                        <div class="btn-group" style="left:20px;">
                                                            <input type="radio" name="1" value="size" style="opacity: 1;left:0;position: static" id="woman" v-bind:checked="Gender=='女'"/>
                                                        </div>
                                                        <label class="btn-group" style="left:20px;" for="woman">
                                                            女
                                                        </label>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">手机</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="hidden" id="" name="" value=""/>
                                                        <input type="text" class="form-control" name="Mobile" id="Mobile" v-bind:value="Mobile"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">出生日期</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="hidden" id="" name="" value=""/>
                                                        <input type="text" class="form-control" name="Birthday" id="Birthday" value="" v-bind:value="Birthday"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">电话</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="hidden" id="" name="" value=""/>
                                                        <input type="text" class="form-control" name="TelePhone" id="TelePhone" v-bind:value="TelePhone"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">职位</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                                        <select name="" id="" class="form-control" v-model="DutyID" >
                                                            <option value="">总经理</option>
                                                            <option value="">副总经理</option>
                                                            <option value="">部门经理</option>
                                                            <option value="">员工</option>
                                                        </select>
                                                        <input type="hidden" id="" name="DutyID" id='DutyID' value="" v-bind:value="DutyID"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">QQ号码</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="hidden" id="" name="" value=""/>
                                                        <input type="text" class="form-control" name="OICQ" id="OICQ" v-bind:value="OICQ"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">职称</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                                        <select name="" id="" class="form-control" v-model="TitleID" >
                                                            <option value="">软件工程师</option>
                                                            <option value="">实验技术人员</option>
                                                            <option value="">会计专业</option>
                                                        </select>
                                                        <input type="hidden" id="" name="TitleID" id="TitleID" v-bind:value="TitleID"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">电子邮箱</label>
                                                    <div class="col-sm-8  ">
                                                        <input type="hidden" id="" name="" value=""/>
                                                        <input type="text" class="form-control" name="Email" id="Email" v-bind:value="Email"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">公司</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                                        <div class="input-group" id="Department">
                                                            <input type="hidden" name="id"  data-recive-helper-data="RealName">
                                                            <input type="hidden" name="code" data-recive-helper-data="Code">
                                                            <input type="text" class="form-control" id="CompanyID" name="CompanyID" v-bind:value="CompanyID" maxlength="15"/>
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-default shiny" data-toggle="modal" data-helper="OrganizationHelp" type="button" data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">部门名称</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                                        <div class="input-group" id="company">
                                                            <input type="hidden" name="id"  data-recive-helper-data="RealName">
                                                            <input type="hidden" name="code" data-recive-helper-data="Code">
                                                            <input type="text" class="form-control" id="DepartmentID" name="DepartmentID" v-bind:value="DepartmentID" maxlength="15"/>
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-default shiny" data-toggle="modal" data-helper="OrganizationHelp" type="button" data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">工作组名称</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                                        <div class="input-group" id="workgroup">
                                                            <input type="hidden" name="id"  data-recive-helper-data="RealName">
                                                            <input type="hidden" name="code" data-recive-helper-data="Code">
                                                            <input type="text" class="form-control" id="WorkgroupID" name="WorkgroupID" v-bind:value="WorkgroupID" maxlength="15"/>
                                                            <span class="input-group-btn">
                                                                <button class="btn btn-default shiny" data-toggle="modal" data-helper="OrganizationHelp" type="button" data-validate="false"><i class=" fa fa-ellipsis-h"></i></button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">核算单位</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                                        <select name="" id="" class="form-control">
                                                            <option value="">青岛特来电新能源有限公司</option>
                                                        </select>
                                                        <input type="hidden" id="" name="" value=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">有效性</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  " >
                                                        <div class="btn-group">
                                                            <label class="btn-group control-label" >
                                                                <input type="checkbox" class="checkbox-slider"  name="Enabled" id="Enabled" v-bind:checked="Enabled==1"/>
                                                                <span class="text" ></span>
                                                            </label>
                                                            <!--<input type="checkbox" style="opacity: 1;left:0; position: static;" id="Enabled" name="Enabled" v-bind:checked="Enabled==1"/>-->
                                                        </div>
                                                        <div class="btn-group" style="color: red">
                                                            注意:禁用后该用户将不能登录
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label class="col-sm-4 control-label ">企业客户</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8  ">
                                                        <select name="" id="" class="form-control">
                                                            <option value="">请选择</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12">
                                            <div class="col-lg-5 col-sm-5 col-xs-12">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-4 control-label ">其他部门</label>
                                                    <div class="col-sm-8">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" id="OrganizationIds" name="OrganizationIds" value="" maxlength="15"/>
                                                            <span class="input-group-addon">...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row col-lg-12 col-sm-12 col-xs-12 ">
                                            <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                                                <div class="form-group">
                                                    <label for="" class="col-sm-2 control-label ">说明</label>
                                                    <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">
                                                        <textarea name="Description" id="Description" cols="3" rows="3" style="resize:none" class="form-control" maxlength="144"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--底部的保存返回-->
                                <div class="well widget-body" name="btnSave">
                                    <button type="button" class="btn btn-primary" click-text="正在保存" v-on:click="save">
                                        <i class="fa fa-save "></i>保存
                                    </button>
                                    <button type="button" class="btn btn-default" name="btnBack" v-on:click="back">
                                        <i class="fa fa-reply "></i>返回
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data () {
        var result={};
        var flag = this.$route.query.flag;//getQueryString("flag");

        if(flag == "edit"){
            var UserId = this.$route.query.UserId;
            getDataSync(ServiceHost+"/api/invoke?SID=SYS_UserMgr_GetSysUserById","post",{"Token":"teld","userId":"'"+UserId+"'" },
                    function (data) {
                        result = data;
                    });
            return result;
        }

    },
    mounted(){
        if(isPC()){
            var  crumbs=$("#breadcrumbs small");
            crumbs.html("<i class='fa fa-angle-right'></i>"+"用户管理"+" <i class='fa fa-angle-right'></i>"+ "成员维护");

        }
        // window.helperList = helperList;
        //弹出帮助
        $("#company").filterTreeHelper({
            multi: false,
            showPagination: false
        });
        $("#Department").filterTreeHelper({
            multi: false,
            showPagination: false
        });
        $("#workgroup").filterTreeHelper({
            multi: false,
            showPagination: false
        });

    },
    methods :{
        save :function () {
            var UserId = this.$route.query.UserId;
            var dataUrl;
            let _this = this;
            dataUrl = ServiceHost+"/api/invoke?Token=teld&SID=SYS_UserMgr_UpdateUser";
            var postData =
            {
                UserId: UserId,
                Code: $("#Code").val(),
                Account: $("#Account").val(),
                RealName: $("#RealName").val(),
                Password: $("#Password").val(),
                Secretkey: $("#Secretkey").val(),
                //男女
                Mobile: $("#Mobile").val(),
                Birthday: $("#Birthday").val(),
                TelePhone: $("#TelePhone").val(),
                DutyID: $("#DutyID").val(),
                OICQ: $("#OICQ").val(),
                TitleID: $("#TitleID").val(),
                Email: $("#Email").val(),
                CompanyID: $("#CompanyID").val(),
                WorkgroupID: $("#WorkgroupID").val(),
                OrganizationIds:"12,34",
                //核算单位
               //有效性
                //企业客户
                //其他部门

                Description: $("#Description").val()
            };
           /* var data = new FormData(document.forms[0]);
//                data.append("enable",$('#Code').prop("checked"));
            data={};
            data.Code=$('#Code').val();
            data.Account=$('#Account').val();
            data.OrganizationIds=$('#OrganizationIds').val();*/

            getDataAsync(dataUrl, "post",{"entity":JSON.stringify(postData)} , function (result) {

                if(parseInt(result)>0){
                    NotifySuccess("保存成功！");
                   // this.$router.go(-1);
                    _this.$router.go(-1);
                }
                else{
                    NotifyWarning("操作失败！");
                }

            });
        },
        back:function () {
            this.$router.go(-1);
        }
    }
    }
</script>