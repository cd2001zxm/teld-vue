<template>
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12">
            <form class="form-horizontal">
                <div class="tabbable tabs-top">
                    <div>

                        <div id="sta" class="tab-pane in active">

                            <div class="well widget-body">
                                <div class="row" id="SingleCardTitle">
                                    <div class="col-lg-12 col-sm-12 col-xs-12" style="padding-left:2px;" id="AccountView">
                                        <h5 class="row-title before-color" style="padding-left:2px;"><i class="fa fa-file-text iconcolor"></i>基本信息</h5>
                                    </div>
                                </div>
                                <div id="baseInfo" class="row">
                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">头像</label>
                                                <div class="col-sm-8 avatar-v">
                                                    <img v-bind:src="Avatar" width="150px" height="150px" v-on:click="avatar" />
                                                    <span class="user-img-title"><strong>点击修改头像</strong></span>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">昵称</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control v-change" id="Alias" name="Alias" v-bind:value="Alias" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label for="" class="col-sm-4 control-label ">姓名</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control" id="RealName" name="RealName" readonly='readonly' v-bind:value="RealName" />
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">性别</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control" id="Gender" name="Gender" readonly='readonly' v-bind:value="Gender" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 col-sm-12 col-xs-12">

                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">

                                                <label class="col-sm-4 control-label ">出生日期</label>
                                                <div class="col-sm-8">
                                                    <div class="input-group input-append date datapick">
                                                        <input class="form-control v-change" id="Birthday" name="Birthday" type="text" data-date-format="yyyy-mm-dd"
                                                               data-bv-regexp="true"
                                                               data-bv-regexp-regexp="^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$"
                                                               data-bv-regexp-message="请输入有效出生日期,例：1999-09-09" v-bind:value="Birthday"/>
                                                        <span class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">手机号码</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control" id="Mobile" name="Mobile" readonly='readonly' v-bind:value="Mobile" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">邮箱</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control" id="Email" name="Email" readonly='readonly' v-bind:value="Email" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">公司</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control" id="CompanyName" name="CompanyName" readonly='readonly' v-bind:value="CompanyName" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">部门</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control" id="DepartmentName" name="DepartmentName" readonly='readonly' v-bind:value="DepartmentName" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">职称</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control" id="TitleName" name="TitleName" readonly='readonly' v-bind:value="TitleName" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">固话</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control" id="Telephone" name="Telephone" readonly='readonly' v-bind:value="Telephone" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">QQ</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control v-change" id="OICQ" name="OICQ"  v-bind:value="OICQ" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">微信</label>
                                                <div class="col-sm-8">
                                                    <input type="text" maxlength="36"
                                                           class="form-control v-change" id="OpenId" name="OpenId" v-bind:value="OpenId" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="well widget-body" name="ButtonGroup">
                                <button type="button" class="btn btn-primary " name="btnSave" v-on:click="save" data-loading-text="正在保存..." click-text="正在保存..."><i class="fa fa-save "></i>保 存</button>
                                <button type="button" class="btn" name="undoAvatar" v-on:click="undoAvatar" ><i class="fa fa-undo "></i>撤销头像</button>
                                <button type="button" onclick="resetSelectedMenu()" class="btn btn-default hidden-xs"><i class="fa fa-reply "></i> 返 回</button>
                            </div>
                        </div>
                        <!-- /Page Station Info  -->
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<style>
    .user-img-title {
        position: absolute;
        left: 15px;
        bottom: 0;
        text-align: center;
        opacity: 0.7;
        width: 150px;
        color: white;
        background:black;
    }
</style>
<style src="teld-vue-frame/thirdpart/css/bootstrap-datepicker3.min.css"></style>
<script>
    import 'teld-vue-frame/thirdpart/js/teld-datepicker.min'
    let pageName = "UserInfoSetting";
    export default{
        data(){
            return{
                Avatar:'',Alias:'',
                RealName:'',Gender:'',Birthday:'',Mobile:'',Email:'',
                CompanyName:'',DepartmentName:'',TitleName:'',
                Telephone:'',OICQ:'',OpenId:''
            }
        },
        mounted(){
            $('.avatar-view').tooltip({
                placement: 'bottom'
            })

            $(".datapick").datepicker({
                    autoclose: true
             });

            $("form").bootstrapValidator();

            var that = this;
            getDataAsync(FrameHost+'/Spa/UserInfo', 'get', null, function (data) {
                if (!data) {
                    NotifyError(data);
                }
                else {
                    copyObject2Object(data,that)
                    saveCurrentData(pageName);
                }
            });
        },
        methods:{
            save:function(e){

                var formData = $("form").data("bootstrapValidator");
                formData.validate();
                //判断验证结果
                var bool = formData.isValid();
                if (bool) {
                    var changeData = getChangeData(pageName);
                    debugger
                    if(!changeData){
                        NotifyWarning("数据没有变化！");
                        return;
                    }
                    getDataAsync(FrameHost+'/Spa/SaveUserInfo', 'post',
                        {
                            'Birthday': $("#Birthday").val(),
                            'Alias': $("#Alias").val(),
                            'OpenId': $("#OpenId").val(),
                            'OICQ': $("#OICQ").val()
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
            },
            undoAvatar:function(){
                getDataAsync(FrameHost+'/Spa/UndoAvatar', 'post',
                   {

                   }, function (data) {
                       if (data.state == 0) {
                           NotifyError(data.errmsg);
                       }
                       else {
                           var imgurl = window.ResourcePath + "/Content/img/avatars/nopictrue.png";
                           $(".avatar-view").find("img").attr("src", imgurl);
                           $(".login-area").find("img").attr('src', imgurl);
                           $(".avatar-area").find("img").attr('src', imgurl);
                           NotifySuccess("头像撤销成功");
                       }

                   }, function () {

                   }, function () {
                       NotifyError("服务器内部错误");
                   });
            },
            avatar:function(){
                this.$router.push("/Frame/Avatar");
            }
        }
    }
</script>
