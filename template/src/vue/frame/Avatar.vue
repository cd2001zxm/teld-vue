<template>
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12" id="crop-avatar">
            <form class="form-horizontal avatar-form" enctype="multipart/form-data" method="post" v-bind:action="action">
                <div class="tabbable tabs-top">
                    <div>
                        <div id="sta" class="tab-pane in active">
                            <input type="hidden" id="oldAvatar" value="" />
                            <div class="well widget-body">

                                <div id="baseInfo" class="row">
                                    <div class="avatar-body">
                                        <div class="row">
                                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                                <label style="font-weight:600">请选择本地的图片，支持JPG、GIF、PNG、BMP格式，文件小于2M。</label>
                                            </div>
                                        </div>
                                        <!-- Upload image and data -->
                                        <div class="avatar-upload row" style="padding-top:10px;">
                                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                                <input type="hidden" class="avatar-src" name="avatar_src">
                                                <input type="hidden" class="avatar-data" name="avatar_data">
                                                <input type="file" class="avatar-input " id="avatarInput" name="avatar_file">
                                            </div>
                                        </div>
                                        <!-- Crop and preview -->
                                        <div class="row">
                                            <div class="col-md-9">
                                                <div class="avatar-wrapper"></div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="avatar-preview preview-lg"></div>
                                                <div class="avatar-preview preview-md"></div>
                                                <div class="avatar-preview preview-sm"></div>
                                            </div>
                                        </div>

                                        <div class="row avatar-btns">
                                            <div class="col-md-9" >
                                                <div class="btn-group" style="display:none;">
                                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="-90" title="Rotate -90 degrees">Rotate Left</button>
                                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="-15">-15deg</button>
                                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="-30">-30deg</button>
                                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="-45">-45deg</button>
                                                </div>
                                                <div class="btn-group" style="display:none;">
                                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="90" title="Rotate 90 degrees">Rotate Right</button>
                                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="15">15deg</button>
                                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="30">30deg</button>
                                                    <button type="button" class="btn btn-primary" data-method="rotate" data-option="45">45deg</button>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <button type="submit" class="btn btn-primary btn-block avatar-save">上传</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="well widget-body" name="ButtonGroup">
                                <button type="button" class="btn btn-default goback" v-on:click="back"><i class="fa fa-reply "></i> 返 回</button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<style>

</style>
<script>

    export default{
        data(){


            return{
                action:window.FrameHost+"/Spa/AvatarUpload"
            }
        },
        mounted(){
            setPageName("设置");
            getDataAsync(window.FrameHost+'/Spa/Avatar', 'get', null, function (data) {
                if (data.state == 0) {
                    NotifyError(data.errmsg);
                }
                else {
                    $("#oldAvatar").val(data.data);
                    CropAvatar($('#crop-avatar'));
                }
            });

        },
        methods:{
            back:function(){
                this.$router.push("/Frame/Setting");
            }
        }
    }
</script>
