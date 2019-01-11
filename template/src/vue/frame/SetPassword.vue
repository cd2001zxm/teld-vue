<template>
    <div class="row" style="margin-right:0;">
        <div class="col-lg-12 col-sm-12 col-xs-12">
            <form class="form-horizontal" id="frame_pwd_form">
                <input type="hidden" id="encryption" value="">
                <input type="hidden" id="modulus" value="">
                <div class="tabbable tabs-top">
                    <div>
                        <div id="sta" class="tab-pane in active">

                            <!-- 账户总览  -->
                            <div class="well widget-body">
                                <div class="row" id="SingleCardTitle">
                                    <div class="col-lg-12 col-sm-12 col-xs-12" style="padding-left:2px;" id="AccountView">
                                        <h5 class="row-title before-color" style="padding-left:2px;"><i class="fa fa-file-text iconcolor"></i>修改密码</h5>
                                    </div>
                                </div>
                                <div id="baseInfo" class="row">
                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-2 col-sm-2 col-xs-12">
                                        </div>
                                        <div class="col-lg-4 col-sm-4 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">旧密码</label>
                                                <div class="col-sm-8">
                                                    <input type="password" data-bv-notempty="true" maxlength="20"
                                                           class="form-control" id="oldPass" name="oldPass"
                                                           data-bv-notempty-message="请输入旧密码" autocomplete="off" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-2 col-sm-2 col-xs-12">
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">新密码</label>
                                                <div class="col-sm-8">
                                                    <input type="password" data-bv-notempty="true" maxlength="20" autocomplete="off"
                                                           class="form-control" id="newPassOne" name="newPassOne"
                                                           data-bv-notempty-message="请输入新密码"
                                                           data-bv-stringlength="true"
                                                           data-bv-stringlength-min="6"
                                                           data-bv-stringlength-max="20"
                                                           data-bv-stringlength-message="密码长度最少为6位,最多20位" value="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row col-lg-12 col-sm-12 col-xs-12">
                                        <div class="col-lg-2 col-sm-2 col-xs-12">
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            <div class="form-group">
                                                <label class="col-sm-4 control-label ">确认新密码</label>
                                                <div class="col-sm-8">
                                                    <input type="password" data-bv-notempty="true" maxlength="20"
                                                           class="form-control" id="newPassTwo" name="newPassTwo"
                                                           data-bv-notempty-message="请输入确认新密码"
                                                           data-bv-stringlength="true"
                                                           data-bv-stringlength-min="6"
                                                           data-bv-stringlength-max="20"
                                                           data-bv-stringlength-message="密码长度最少为6位，最多20位" autocomplete="off" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div class="well widget-body" name="ButtonGroup">
                                <button type="button" class="btn btn-primary " name="btnSave" v-on:click="check" data-loading-text="正在保存..." click-text="正在保存..."><i class="fa fa-save "></i>保 存</button>
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

<script>

    export default{
        data(){
            return{
            }
        },
        mounted(){
            //if (!isPC()) {
                //$("#breadcrumbsForMobie").css("display", "none");
                //$("#breadcrumbsForSetting").css("display", "inline-block");
            //}
            //window.require(["validator"],function($){
                $("form").bootstrapValidator();
            //});

            $('.avatar-view').tooltip({
                placement: 'bottom'
            });

            getDataAsync(FrameHost+'/Spa/getencryption', 'get', null, function (data) {
                if (data.state == 0) {
                    NotifyError(data.errmsg);
                }
                else {

                    $("#encryption").val(data.data.Encryption);
                    $("#modulus").val(data.data.Modulus);
                }
            });
        },
        components:{

        },
        methods:{
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

                    getDataAsync(FrameHost+'/Spa/SavePassword', 'post',
                        {
                            'rsaPassword': rsaPassword,
                            'newRsaPassOne': newRsaPassOne,
                            'newRsaPassTwo': newRsaPassTwo
                        }, function (data) {
                            if (data.state == 0) {
                                NotifyError(data.errmsg);
                            }
                            else {
                                NotifySuccess("密码修改成功");
                                $("#oldPass").val("");
                                $("#newPassOne").val("");
                                $("#newPassTwo").val("");
                                location.href = $("#LoginOutUrl").val();
                            }

                        }, function () {

                        }, function () {
                            NotifyError("服务器内部错误");
                        });
                }
            }
        }
    }
</script>
