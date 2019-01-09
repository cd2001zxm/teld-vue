<template>
    <div>

        <input type="hidden" id="hideCustomerID" value=""/>
        <!--后台获取，要写方法,ccbd613e-ea56-43ab-931c-267cda568237-->
        <input type="hidden" id="hideUserID" value=""/><!--后台获取，要写方法-->
        <input type="hidden" id="hideStaId" value=""/>
        <input type="hidden" id="hideStaName" value=""/>
        <input type="hidden" id="hideRefreshRate" value="60"/><!--后台获取，要写方法-->
        <div id="div_search" style="padding-left:5px;">
            <!--充电站帮助-->
            <div class="btn-group table-toolbar">
                <div class="input-group">

                    <div id="PowerStationDiv" class="input-group helper-group" style="min-width:250px;">
                        <!--data-recive-helper-data="id"上次访问电站的id-->
                        <input type="hidden" id="hidePowerStationId" name="hidePowerStationId"
                               data-recive-helper-data="ID" value=""/>
                        <!--data-recive-helper-data="name"上次访问电站的name-->
                        <input type="text" class="form-control input-sm" id="PowerStationName"
                               name="PowerStationName" readonly="readonly"
                               data-recive-helper-data="Name" value=""
                               maxlength="36"
                               data-bv-notempty="true"
                               data-bv-notempty-message="请选择电站" placeholder="电站名称"/>
                        <span class="input-group-btn">
                                            <button class="btn btn-default shiny btn-sm" data-toggle="modal"
                                                    data-helper="PowerStationHelp" type="button">
                                                <i class="fa fa-ellipsis-h"></i>
                                            </button>
                                        </span>
                    </div>

                </div>
            </div>
            <!--集控器下拉-->
            <div class="widget-buttons table-toolbar" id="divCtrl">
                <button id="ddlCtrl" type="button" class="btn btn-default dropdown-toggle"
                        data-toggle="dropdown"
                        aria-expanded="false">
                    集控器<span class="caret"></span>
                </button>
                <input type="hidden" id="hideCtrlId" value=""/>
                <input type="hidden" id="hideCtrlAddr" value=""/>
                <ul class="dropdown-menu " id="Ctrl" role="menu" aria-labelledby="ddlCtrl"></ul>
            </div>
            <!--每隔几秒自动刷新-->
            <div class="btn-group table-toolbar">
                <label id="demo"
                       style="vertical-align: middle;font-size: 13px;display:inline-block;float:left;padding-top: 6px;">每隔<span
                        id="span_RefreshTime">60</span>秒自动刷新</label>
            </div>
            <!--手动刷新按钮-->
            <div class="widget-buttons table-toolbar" style="margin-top: 5px;">

                <button type="button" id="handRefresh" class="btn btn-default"
                        @click="GetRealTimeDataForHand1">
                    手动刷新
                </button>
            </div>
            <!--%选择区-->
            <div class="btn-group table-toolbar" style="width:220px; ">
                <div class="input-group">
                    <input type="text" class="form-control input-sm" id="startSOC" value=""/>
                    <span class="input-group-addon">
                                                 %
                                            </span>
                    <span class="input-group-addon">
                                            <i class="fa  fa-minus"></i>
                                            </span>
                    <input type="text" class="form-control input-sm" id="endSOC" value=""/>
                    <span class="input-group-addon">
                                                %
                                            </span>
                </div>
            </div>
            <!--SOC过滤按钮-->
            <div class="btn-group table-toolbar">
                <a id="btnSocQuery" href="javascript:void(0);" class="btn btn-default">
                    <i class="fa fa-search"></i>
                    SOC过滤
                </a>
            </div>
            <!--缩略模式、刷新频率、密码修改、帮助 按钮margin-top: 5px-->
            <div id="div_rightButton" class="widget-buttons table-toolbar"
                 style="float: right;margin-top: 5px;">

                <button type="button" id="btnModelCheck" class="btn btn-default"
                        style="border-radius: 2px;"
                        @click="ModelCheck1">缩略模式
                </button>

                <button type="button" class="btn btn-default" style="border-radius: 2px;"
                        @click="ShowRefreshData1">
                    刷新频率
                </button>

                <!--密码修改只有进入PowerDispatchingShowForValiReload页面才显示-->
                 <button type="button" id="btnIntegrMachineInfo" class="btn btn-group btn-default"
                         style="border-radius: 2px;">密码修改</button>

                <button type="button" id="handRefresh1" class="btn btn-default"
                        style="border-radius:2px;" @click="showhelp">帮助
                </button>

            </div>
        </div>

    </div>
</template>


<style>

</style>


<script>

    import * as TPSSearch from "../CommonJS/TPSSearch.js" //TPS公共js
    //引用组件
    export default {

        data() {
            return {}
        },

        mounted() {
            var flag=$("#DispatchFlag").val();
            if(flag == "PowerDispatchingShow" || flag == "App_PowerDispatchingShow"){
                $("#btnIntegrMachineInfo").hide();//如果页面不是一体机，修改密码隐藏
            }

        },

        components: {

        },

        methods: {
            //手动刷新
            GetRealTimeDataForHand1:function () {
                TPSSearch.GetRealTimeDataForHand();
            },
            //缩略模式-详情模式切换
            ModelCheck1:function () {
                TPSSearch.ModelCheck();
            },
            //刷新频率
            ShowRefreshData1:function () {
                TPSSearch.ShowRefreshData();
            },
            //充电图片显示隐藏
            showhelp:function () {
                $("#TpsHelpModal").modal("show");
            },
//            //密码修改
//            modifyPass:function () {
//
//            }

        }
    }


</script>