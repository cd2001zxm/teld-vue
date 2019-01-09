<template>
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12">
            <div class="widget radius-bordered" style="margin-bottom: 1px;">
                <div class=" widget-body">
                    <div class="table-toolbar" style="padding-top:5px; padding-bottom:5px;">
                        <!--<input type="hidden" id="encryption" value="">-->
                        <!--<input type="hidden" id="modulus" value="">-->
                        <!--<input type="hidden" id="Domain" value="">&lt;!&ndash;@ViewBag.Domain&ndash;&gt;-->

                        <input type="hidden" id="hideUnlockPassword" value="">
                        <input type="hidden" id="hideTimeOut" value=""><!--写一个从后台获取timeout的函数-->
                        <input type="hidden" id="DispatchFlag" value="PowerDispatchingShowForValiReload"/>
                        <!--查询区域-->
                        <Dispatch_TableListSearch></Dispatch_TableListSearch>
                        <!--按钮组-->
                        <!--<div id="div_Button" id="allbuttons">-->
                        <Buttons mid="78d807a7-f299-4d60-bc0a-fa325156c4a4" id="allbuttons"
                                 @setChargeMode="setChargeMode" @setChargeStrategy="setChargeStrategy"
                                 @btnBillSearch="btnBillSearch" @btnStaChargeView="btnStaChargeView"
                                 @handOneKeyCharge="handOneKeyCharge" @handTimeOneKeyCharge="handTimeOneKeyCharge">
                        </Buttons>
                        <!--</div>-->
                    </div>
                    <hr class="wide" style="margin-top:2px;margin-bottom:2px;" />
                    <div class="table-toolbar" style="text-align:left;" name="ButtonGroup">
                        <!--负荷调度警告-->
                        <Dispatch_TableListBtn></Dispatch_TableListBtn>
                    </div>
                    <div class="table-responsive">
                        <!--终端详情-->
                        <Dispatch_TableContent></Dispatch_TableContent>

                        <!-- Loading Container 干什么用的？-->
                        <div class="loading-container loading-inactive" id="innerLoading">
                            <div class="loader-overlay">
                                <div class="spinner">
                                    <div class="bounce1"></div>
                                    <div class="bounce2"></div>
                                    <div class="bounce3"></div>
                                </div>
                            </div>
                        </div>

                        <!--没用到-->
                        <!--<form method="post" action="" id="autoForm">
                            <input name="redirect_uri" value="../TPS/PowerDispatchingShowForValiReload?mid=78d807a7-f299-4d60-bc0a-fa325156c4a4?stimeout=1&NoFrame=true" type="hidden" />
                            <input id="username" name="username" value="18816881688" type="hidden" />
                            <input id="password" name="password" value="111111" type="hidden" />
                        </form>-->

                    </div>
                </div>
            </div>
        </div>

        <!--模态框-->
        <Dispatch_Modal></Dispatch_Modal>

    </div>

</template>



<style src="./commonCss/dashboard.css"></style>
<style src="./commonCss/mainPage.css"></style>
<style>
    /*隐藏按钮样式---隐藏*/
    #appDispatch,#BillSearch,#BillDetail,#AppChargeAll{
        display: none;
    }
    #setChargeStrategy,#btnBillSearch,#btnStaChargeView,#handTimeOneKeyCharge{
        background-color:#47a447!important;
        color:#fff;
        border: none;
    }
    #handOneKeyCharge{
        background-color:#f4b400 !important;
        color:#fff;
        border: none;
    }
</style>


<script>

    var echarts = require('echarts');//？？？？？？？？
    //import LayoutSingleList from "teld-vue-frame/vue/LayoutSingleList.vue"
    import Buttons from "teld-vue-frame/vue/Button.vue"
    //import LayoutDetailPage from "teld-vue-frame/vue/LayoutDetailPage.vue"
    import * as timepicker from "./CommonJS/datetime/bootstrap-timepicker.js"
    //import * as datepicker from "./CommonJS/datetime/bootstrap-datepicker.zh-CN.min.js"
    //import * as echarts_all from "./CommonJS/echarts-all.js"
    //import * as echarts from "./CommonJS/echarts/esl/esl.js"
    import * as knockout from "./CommonJS/knockout-2.3.0.js"

    import * as TPSSearch from "./CommonJS/TPSSearch.js" //公共js
    import * as dispatch_PayCard from "./CommonJS/dispatch_PayCard.js" //公共js
    import * as dispatchForValiReload from "./CommonJS/dispatchForValiReload.js" //公共js

    import Dispatch_TableListSearch from "./CommonVue/Dispatch_TableListSearch.vue" //查询部分
    import Dispatch_TableListBtn from "./CommonVue/Dispatch_TableListBtn.vue" //负荷调度警告部分
    import Dispatch_TableContent from "./CommonVue/Dispatch_TableContent.vue" //终端详情部分
    import Dispatch_Modal from "./CommonVue/Dispatch_Modal.vue" //模态框部分


    //自适应屏幕
    (function ($, h, c) {
        var a = $([]),
            e = $.resize = $.extend($.resize, {}),
            i,
            k = "setTimeout",
            j = "resize",
            d = j + "-special-event",
            b = "delay",
            f = "throttleWindow";
        e[b] = 250;
        e[f] = true;
        $.event.special[j] = {
            setup: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.add(l);
                $.data(this, d, {
                    w: l.width(),
                    h: l.height()
                });
                if (a.length === 1) {
                    g();
                }
            },
            teardown: function () {
                if (!e[f] && this[k]) {
                    return false;
                }
                var l = $(this);
                a = a.not(l);
                l.removeData(d);
                if (!a.length) {
                    clearTimeout(i);
                }
            },
            add: function (l) {
                if (!e[f] && this[k]) {
                    return false;
                }
                var n;

                function m(s, o, p) {
                    var q = $(this),
                        r = $.data(this, d);
                    r.w = o !== c ? o : q.width();
                    r.h = p !== c ? p : q.height();
                    n.apply(this, arguments);
                }

                if ($.isFunction(l)) {
                    n = l;
                    return m;
                } else {
                    n = l.handler;
                    l.handler = m;
                }
            }
        };

        function g() {
            h = window;//赋值windows对象
            i = h[k](function () {
                    a.each(function () {
                        var n = $(this),
                            m = n.width(),
                            l = n.height(),
                            o = $.data(this, d);
                        if (m !== o.w || l !== o.h) {
                            n.trigger(j, [o.w = m, o.h = l]);
                        }
                    });
                    g();
                },
                e[b]);
        }
    })(jQuery, this);


    var vue_this = null;
    var clickFlag = false;

    //暂时注释

    export default {

        data() {
            return {};
        },

        mounted() {
            vue_this = this;
            //window.AppDispatch = vue_this;//liujia--调APP方法的验证操作???好像不行
            /*
            //锁屏
            $(document).on('click keyDown', function (evt) {

                //if ($('#lockscreen').hasClass('no-show')) {
                teld_lockMonitor.w.postMessage("reset");
                //} else {
                //    timeout = true;

                //}

            });
            //*/
            $(".sidebar-toggler").click();//在加载的时候模拟一次鼠标单击，隐藏左侧菜单栏，.sidebar-toggler是右上角隐藏左侧菜单栏的样式

            $(".widget-buttons").height("25px");//新增，针对六个功能按钮，设置高度25px,原高度36px
            $("#allbuttons").css("margin-top", "-10px");//设置6个按钮style
            //屏幕自适应加载
            $("#page-body").resize(function () {
                if (TPSSearch.isClickCheckbox) {
                    TPSSearch.isClickCheckbox = false;
                    return;
                }
                //vue_this.PageBodyResize();
                TPSSearch.PageBodyResize();
            });

            //clickFlag = true;
            if(clickFlag){//解决一体机页面手动缩放页面不自适应问题
                //屏幕自适应加载
                $("#page-body").resize(function () {
                    if (TPSSearch.isClickCheckbox) {
                        TPSSearch.isClickCheckbox = false;
                        return;
                    }
                    //vue_this.PageBodyResize();
                    TPSSearch.PageBodyResize();
                });
            }


            //加载页面
            vue_this.LoadPageData();
            //计时锁屏
            dispatchForValiReload.initInterval();//计时锁屏开始



            //控制上拉下拉（小屏幕）
            $("#vCollapse").on("click", function (n) {
                n.preventDefault();
                var t = $(this).parents(".widget").eq(0).find("#searchCondition"),
                    //r = t.find("#searchCondition"),
                    i = $(this).find("i"),
                    u = "fa-angle-double-down",
                    f = "fa-angle-double-up",
                    e = 100;
                t.hasClass("collapsed") ? (i && i.addClass(f).removeClass(u), t.removeClass("collapsed"), t.slideUp(0, function () {
                    t.slideDown(e)
                })) : (i && i.addClass(u).removeClass(f), t.slideUp(100, function () {
                    t.addClass("collapsed")
                }));
                var fullscreenchange = $.Event('teld:fullscreenchange');
                $(this).trigger(fullscreenchange);
            });


            $(function () {
                $(".pilldivColor").css("background-color", "#c0ebbf");
            });
            //请刷卡模态框隐藏事件
            $('#PleasePayByCardModal').on('hide.bs.modal', function () {
                dispatch_PayCard.closeCom();//取消读卡--要是调不到，放在dispatch_PayCard里面试试
                dispatch_PayCard.card_stopCount();//停止计时
            });

            $('body').append('<div class="rs-overlay" />');
            dispatch_PayCard.InitDIYModal();
            //vue_this.test(); //模拟刷卡，发布时要去掉【！！！！！！】

            //一体机密码保存
            $("#btnUpdatePassWord").click(function () {
                dispatchForValiReload.UpdatePassWord();
            });

            //一体机登录口令验证---暂时注释---liujia
//            $("#PassWord").click(function () {
//                var temp = document.getElementById('inputnum');
//                temp.focus();
//            });
//            onfocus="this.click();"
//            oninput="document.getElementById('password').value = this.value"

            $("#btnValdatePassword").click(function () {
                debugger
                dispatchForValiReload.ValdatePassword();
            });
//            $("#logback").click(function(){
//                dispatchForValiReload.CancelValdatePassword();
//            });

            /*刷卡充电重复了--原来的*/
            //刷卡充电详情
//            $("#cardcharging").bind("click",function(event,type){
//                var obj=event.target;
//                var type=2;
//                dispatch_PayCard.SetChargeDeatilData(obj,type);
//            });
//            $("#history").click(function(){
//                dispatch_PayCard.InitMoreHistoryRecrordsList();
//            });
//            $("#btnPayByCardForCharege").click(function(){
//                vue_this.PayByCardForCharege();
//            });
            /*重复了--原来的*/

            //刷卡时充电详情事件
            $("#carddetail").bind("click", function (event) {
                dispatch_PayCard.SetChargeDeatilData(event.target, 2);
            });
            //刷卡历史记录事件
            $("#cardhistory").bind("click", function () {
                dispatch_PayCard.InitMoreHistoryRecrordsList();
            });
            //刷卡立即充电事件
            $("#btnPayByCardForCharege").bind("click", function () {
                TPSSearch.PayByCardForCharege();
            });


            //全选
            $("#div_All").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SelectAllForComputer(obj);
            });
            //statecolorAll
            $(".statecolorAll").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SelectAllForPhone(obj);
            });
            //空闲
            $("#div_Free").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#kongxian").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //暂停
            $("#div_Pause").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#zanting").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            ///离网
            $("#div_Away").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#liwang").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //副枪
            $("#div_FuQiang").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#fu").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //等待调度
            $("#div_LoadDispatch").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#diaodu").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //已插枪
            $("#div_Clink").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#chaqiang").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //充电中
            $("#div_Using").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#chongdian").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //已充满
            $("#div_AlreadyFull").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#chongman").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //未知
            $("#div_WeiZhi").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#notknow").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //终端故障
            $("#div_PileFault").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#pileguzhang").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //BMS故障
            $("#div_BMSFault").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#bms").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //连接故障
            $("#div_ConnectFault").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#lianjie").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //充电机故障
            $("#div_ChargerFault").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#machine").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });
            //恢复中
            $("#div_Recovering").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCss(obj);
            });
            $("#huifu").bind("click", function (event) {
                var obj = event.target;
                TPSSearch.SetCssForPhone(obj);
            });

            //充电模式--轮充事件
            $("#RoundFilling").bind("click", function () {
                TPSSearch.RadioChange("RoundFilling");
            });
            //充电模式--群充事件
            $("#ChargGroup").bind("click", function () {
                TPSSearch.RadioChange("ChargGroup");
            });
            //充电模式--策略A事件
            $("#Strategy_A").bind("click", function () {
                TPSSearch.SetStrategyCheckbox('Strategy_A');
            });
            //充电模式--策略B事件
            $("#Strategy_B").bind("click", function () {
                TPSSearch.SetStrategyCheckbox('Strategy_B');
            });
            //充电模式--策略C事件
            $("#Strategy_C").bind("click", function () {
                TPSSearch.SetStrategyCheckbox('Strategy_C');
            });

        },

        components: {
            'Buttons': Buttons,
            'Dispatch_TableListSearch': Dispatch_TableListSearch,
            'Dispatch_TableListBtn': Dispatch_TableListBtn,
            'Dispatch_TableContent': Dispatch_TableContent,
            'Dispatch_Modal': Dispatch_Modal,
        },

        methods: {
            //获取当前userID/customerid
            getCurHidId: function () {
                //"src/vue/dispitch/test/getCurUserID.json"
                getDataSync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetTpsViewCommon", "POST", {}, function (result) {
                    var currentUserId = result.data.UserID; //可能这地方要改
                    var currentCustomerId = result.data.CustID;//可能这地方要改
                    $("#hideUserID").val(currentUserId);
                    $("#hideCustomerID").val(currentCustomerId);
                });
            },
            //获取后台已存的自动刷新频率值
            getRefreshrate: function () {
                //"src/vue/dispitch/test/getRefreshrate.json"
                var userid = $("#hideUserID").val();
                getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetRefreshRate", "POST", {}, function (result) {
                    var currentRefreshrate = result.data;
                    if (currentRefreshrate != 0) {
                        $("#hideRefreshRate").val(currentRefreshrate);
                        $("#span_RefreshTime").text(currentRefreshrate);
                    } else {
                        $("#span_RefreshTime").text($("#hideRefreshRate").val());
                    }
                });
            },
            //隐藏按钮
            appDispatch: function () {
            },
            BillDetail: function () {
            },
            //隐藏按钮
            //数据加载
            LoadPageData: function () {
                TPSSearch.isOneRecord();
                //获取当前userid
                TPSSearch.getCurHidId();
                //获取当前刷新频率
                TPSSearch.getRefreshrate();
                //是否绑定刷卡历史记录列表事件赋标志值
                dispatch_PayCard.getIsBindTableEvent(true);

                //判断是否传递过来了timeout参数，如果传递了，并且值为true，则设定超时--感觉没用到liujia
//                var hideTimeout = $("#hideTimeOut").val();
//                if (hideTimeout != '' && hideTimeout == 'true') {
//                    teld_lockMonitor.timeout = true;
//
//                }

                $('#ValdatePasswordModal').on('shown.bs.modal', function () {
                    $('#inputnum').focus();
                    //$('#password').click();
                });
                TPSSearch.Dispatch.PageFlag = "PowerDispatchingShowForValiReload";

                dispatchForValiReload.GetPassWord();//获取密码

                /*var $handOneKeyCharge = $("#handOneKeyCharge"),//一键充电
                    $setChargeMode = $("#setChargeMode"),//设置充电模式
                    $setChargeStrategy = $("#setChargeStrategy"),//设置群充策略
                    $btnBillSearch = $("#btnBillSearch"),//订单查询
                    $btnStaChargeView = $("#btnStaChargeView"),//电站充电一览
                    $handTimeOneKeyCharge = $("#handTimeOneKeyCharge");//定时一键充电*/

                //绑定事件
                //点击【一键充电】
                /*if ($handOneKeyCharge.length > 0) {
                    $handOneKeyCharge.click(function () {
                        dispatchForValiReload.ButtonFlag = "handOneKeyCharge";
//                        //武汉公交安卓页面验证
                        if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                            dispatchForValiReload.ReloadPageForValiReload();
                        } else {
                            TPSSearch.OneKeyCharge();
                        }
                    });
                }//*/

                //点击【设置充电模式】
                /*if ($setChargeMode.length > 0) {
                    $setChargeMode.click(function () {
                        dispatchForValiReload.ButtonFlag = "setChargeMode";

                        //武汉公交安卓页面验证
                        if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                            dispatchForValiReload.ReloadPageForValiReload();
                            return false;
                        }
                        TPSSearch.ViewSetChargeMode('ChargeMode');
                    });
                }//*/

                //点击【设置群充策略】
                /*if ($setChargeStrategy.length > 0) {
                    $setChargeStrategy.click(function () {

                        dispatchForValiReload.ButtonFlag = "setChargeStrategy";

                        //武汉公交安卓页面验证
                        if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                            dispatchForValiReload.ReloadPageForValiReload();
                            return false;
                        }
                        TPSSearch.ViewSetChargeMode('ChargeStrategy');
                    });
                }//*/

                //点击【设置群充策略】或【设置充电模式】确定按钮
                $("#btnSaveChargeModelStrategySet").click(function () {

                    //dispatchForValiReload.ButtonFlag = "btnSaveChargeModelStrategySet";
                    dispatchForValiReload.getButtonFlag("btnSaveChargeModelStrategySet");
                    //武汉公交安卓页面验证
                    if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                        dispatchForValiReload.ReloadPageForValiReload();
                        return false;
                    }
                    TPSSearch.SaveChargeModelStrategySet();
                });

                //点击【订单查询】
                /*if ($btnBillSearch.length > 0) {
                    $btnBillSearch.click(function () {
                        dispatchForValiReload.ButtonFlag = "btnBillSearch";

                        //武汉公交安卓页面验证
                        if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                            dispatchForValiReload.ReloadPageForValiReload();
                            return false;
                        }
                        vue_this.btnBillSearch();
                    });
                }//*/

                //点击【电站充电一览】
                /*if ($btnStaChargeView.length > 0) {
                    $btnStaChargeView.click(function () {
                        dispatchForValiReload.ButtonFlag = "btnStaChargeView";

                        //武汉公交安卓页面验证
                        if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                            dispatchForValiReload.ReloadPageForValiReload();
                            return false;
                        }
                        vue_this.StaChargeView();
                    });
                }//*/

                //点击【定时一键充电】
                /*if ($handTimeOneKeyCharge.length > 0) {
                    $handTimeOneKeyCharge.click(function () {
                        dispatchForValiReload.ButtonFlag = "handTimeOneKeyCharge";
//                        //武汉公交安卓页面验证
                        if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                            dispatchForValiReload.ReloadPageForValiReload();
                        } else {
                            TPSSearch.GetTimingOnekeyCharge();
                        }
                    });
                }//*/

                //点击【密码修改】
                $("#btnIntegrMachineInfo").click(function () {
                    //获取密码
                    var postData = {};
                    //"src/vue/dispitch/test/GetPassWord.json"

                    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetPassWord", "POST", postData, function (result) {
                        if (result.state != "1") {
                            NotifyWarning(result.errmsg);
                            return;
                        }
                        var unlockPass = result.data.unlockPass;
                        $("#hideUnlockPassword").val(unlockPass);
                        $("#newPassWord").val("");
                        $("#oldPassWord").val("");
                        $("#integrMachineInoPasswordModal").modal("show");
                    });
                });

                TPSSearch.arr_OperatingPile = [];
                //模态框【设置充电时间】的隐藏事件
                $('#handTimeOneKeyChargeModal').on('hide.bs.modal', function () {
                    //全不选控件
                    $("input[name='TimeRadio']").prop("checked", false);
                });
                //记录
                TPSSearch.GetModelCheckForLocalStorage();//根据客户端数据保存的模式控制按钮样式,优先获取模式
                TPSSearch.Dispatch.CustomerID = $("#hideCustomerID").val();//客户ID
                TPSSearch.Dispatch.isLoadPage = true;
                $("#hideStaId").val("");
                $("#hideStaName").val("");
                if (TPSSearch.Dispatch.CustomerID == "") {
                    NotifyWarning("当前登录客户为空，请重新登录!");
                    return;
                }

                //使用
                require.ensure([],
                    function (require) {
                        var echarts = require('echarts/lib/echarts');
                        require('echarts/lib/chart/pie');//ec

                        TPSSearch.currentEc = echarts;

                        TPSSearch.SetOverdueLocalStorage();

                        //注册日期控件 【EditBy shaocx,2015-11-20】
                        $("#timepicker_onekey").timepicker({
                            minuteStep: 1,
                            showMeridian: false,
                            showSeconds: false,
                            modalBackdrop: true,
                            showInputs: false
                        });
                        /**************************初始化电站帮助********************************/

                        $("#PowerStationDiv").helper17({
                            multi: false,
                            showPagination: true,
                            hiddenInps: [
                                {inpNm: "ID", inpValue: "ID"},
                                {inpNm: "Code", inpValue: "Code"},
                                {inpNm: "Name", inpValue: "Name"}
                            ],
                            confirmCallback: function (helpetr) {
                                var curStaId = $(helpetr).find("[name=ID]").val() == "null" ? "" : $(helpetr).find("[name=ID]").val();
                                var curStaName = $(helpetr).find("[name=Name]").val() == "null" ? "" : $(helpetr).find("[name=Name]").val();
                                $("#hidePowerStationId").val(curStaId);
                                $("#PowerStationName").val(curStaName);
                                if (curStaId == "undefined" || curStaId == undefined) {
                                    TPSSearch.PageBodyResize();
                                    //vue_this.PageBodyResize();
                                    $("#Sta").text("电站名称");
                                    $("#hideStaId").val("");
                                    $("#hideStaName").val("");
                                    return;
                                }

                                if (curStaId == "") {//说明选择的全部电站,清空选择的cookie值
                                    localStorage.removeItem("sta.data");
                                    localStorage.removeItem("tps_cursta");
                                    localStorage.removeItem("tps_cursta_name");
                                    localStorage.removeItem("tps_curctrl_address");
                                    localStorage.removeItem("tps_curctrl_id");
                                    localStorage.removeItem("tps_curctrl_name");
                                    localStorage.removeItem("ctrl.data");
                                } else {//说明选择的是某一个电站
                                    localStorage.setItem("tps_cursta_" + TPSSearch.Dispatch.CustomerID, curStaId);//当前选中的电站ID
                                    localStorage.setItem("tps_cursta_name_" + TPSSearch.Dispatch.CustomerID, curStaName);//当前选中的电站名称
                                }

                                if ($("#hideStaId").val() == curStaId) {
                                    return;
                                }

                                $("#hideStaId").val(curStaId);
                                $("#hideStaName").val(curStaName);
                                //根据选择的电站加载所属集控器（带权限的）
                                TPSSearch.GetCtrlsByStaID();
                            }
                        });

                        /**************************初始化电站帮助********************************/

                        var curSelSta = localStorage.getItem("tps_cursta");//cookie里的电站id
                        var curSelStaName = decodeURIComponent(localStorage.getItem("tps_cursta_name"));//cookie里的电站名称

                        //绑定Soc过滤事件
                        $("#btnSocQuery").click(function () {
                            TPSSearch.SearchSOC(1);
                        });


                    },"TPS-Pie");
            },

            //设置充电模式
            setChargeMode: function () {
                //dispatchForValiReload.ButtonFlag = "setChargeMode";
                dispatchForValiReload.getButtonFlag("setChargeMode");
                //武汉公交安卓页面验证
                if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                    dispatchForValiReload.ReloadPageForValiReload();
                    return false;
                }
                TPSSearch.ViewSetChargeMode('ChargeMode');
            },
            //设置群充策略
            setChargeStrategy: function () {
                //dispatchForValiReload.ButtonFlag = "setChargeStrategy";
                dispatchForValiReload.getButtonFlag("setChargeStrategy");
                //武汉公交安卓页面验证
                if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                    dispatchForValiReload.ReloadPageForValiReload();
                    return false;
                }
                TPSSearch.ViewSetChargeMode('ChargeStrategy');
            },
            //订单查询
            btnBillSearch: function () {
                //dispatchForValiReload.ButtonFlag = "btnBillSearch";
                dispatchForValiReload.getButtonFlag("btnBillSearch");
                //武汉公交安卓页面验证
                if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                    dispatchForValiReload.ReloadPageForValiReload();
                    return false;
                }

                var UserId = $("#hideUserID").val();
                //跳转界面
                var url;
                if (TPSSearch.Dispatch.PageFlag == "PowerDispatchingShowForValiReload") {
                    url = "/TPS/TPSReport";
                } else if (TPSSearch.Dispatch.PageFlag == "App_PowerDispatchingShow") {//App调度充电
                    url = "/TPS/App_ChargeBillSearch";
                }
                else {
                    url = "/TPS/BossReport";
                }
                //location.href = url;
                this.$router.push({path: url, query: {UserID: UserId}});
            },
            //电站充电一览
            btnStaChargeView: function () {
                //dispatchForValiReload.ButtonFlag = "btnStaChargeView";
                dispatchForValiReload.getButtonFlag("btnStaChargeView");
                //武汉公交安卓页面验证
                if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                    dispatchForValiReload.ReloadPageForValiReload();
                    return false;
                }

                var staId = $("#hideStaId").val();
                var UserId = $("#hideUserID").val();
                if (staId == "") {
                    NotifyWarning("请先选择一个电站!");
                    return;
                }
                var after_url = "url=/PubTransWuHan/Index?StaID=" + staId + "&UserID=" + UserId;
                if (TPSSearch.Dispatch.PageFlag == "PowerDispatchingShowForValiReload") {
                    //var url = "/TPS/BossReportForValiReload?" + after_url;
                    var url = "/TPS/BossReportForValiReload";
                } else if (TPSSearch.Dispatch.PageFlag == "App_PowerDispatchingShow") {//App调度页面
                    //var url = "/TPS/App_BossReport?" + after_url;
                    var url = "/TPS/App_BossReport";

                }
                else {
                    //var url = "/TPS/BossReport1?" + after_url;
                    var url = "/TPS/BossReport1";

                }
                this.$router.push({path: url, query: {UserID: UserId, StaID: staId}});
            },
            //一键充电
            handOneKeyCharge: function () {
                //dispatchForValiReload.ButtonFlag = "handOneKeyCharge";
                dispatchForValiReload.getButtonFlag("handOneKeyCharge");
                //武汉公交安卓页面验证
                if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                    dispatchForValiReload.ReloadPageForValiReload();
                } else {
                    TPSSearch.OneKeyCharge();
                }
            },
            //定时一键充电
            handTimeOneKeyCharge: function () {
                //dispatchForValiReload.ButtonFlag = "handTimeOneKeyCharge";
                dispatchForValiReload.getButtonFlag("handTimeOneKeyCharge");
                //武汉公交安卓页面验证
                if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
                    dispatchForValiReload.ReloadPageForValiReload();
                } else {
                    TPSSearch.GetTimingOnekeyCharge();
                }
            },


            //隐藏按钮
            appDispatch: function () {
            },
            BillDetail: function () {
            },
            AppChargeAll: function () {
            },
            BillSearch: function () {//针对APP调度充电

            },

            //刷卡测试专用
            test:function() {
                debugger
                $("#hidCtrlAddrPillCan").val("");
                NotifyWarning("请刷卡");
                //Dispatch.curPillCode = "3702120244307";
                //Dispatch.curPillCode = "3706010001114";
                //Dispatch.curPillCode = "3702120244502";//net的终端
                TPSSearch.Dispatch.curPillCode = "3702120244101";

                $("#hideStaId").val("45b6d5d5-3962-4ec3-bbb5-4c649f4c6f27");//云平台测试站
                $("#PleasePayByCardModal").modal("show");
                debugger
                //dispatch_PayCard.card_IsCounting = true;
                dispatch_PayCard.sendCard_IsCounting(true);
                //dispatch_PayCard.card_ChargeFlag = "1";
                dispatch_PayCard.sendCard_ChargeFlag("1");
                //console.log("test--"+dispatch_PayCard.card_IsCounting);
                //console.log("test--"+dispatch_PayCard.card_ChargeFlag);
                dispatch_PayCard.card_startTimer();//在这地方赋值秒数



            },


            //事件绑定--没用到
            bindClickEvent11: function () {
                //自己加的（上方拼接字符串的含参方法的调用）（拼接字符串事件的引用）
                $(".nameCountRight").bind("click", function (event) {
                    var obj = event.target;
                    if (vue_this.IsDetailsModel()) {//详情模式
                        dispatch_PayCard.SetChargeDeatilData(obj, 1);
                    } else {//缩略模式
                        vue_this.ShowDetailModal(obj);
                    }
                });
                //自己加的,开始充电
                $(".startcharge").bind("click", function (event) {
                    var obj = event.target;
                    vue_this.replyCharge(obj);
                });
                //自己加的（上方拼接字符串的含参方法的调用,#Ctrl）（拼接字符串事件的引用）
                $(".endcharge").bind("click", function (event) {
                    var obj = event.target;
                    vue_this.endCharge(obj);
                });

            },
            //屏幕自适应--是否适应一体机????没用到
            PageBodyResizeForReload: function () {
                $(".widget-buttons").height("25px");//新增，针对六个功能按钮，设置高度25px,原高度36px
                $("#allbuttons").css("margin-top", "-10px");//设置6个按钮style
                if (datachart_PileFunnel != undefined) {
                    datachart_PileFunnel.resize();//返回当前对象本身
                }


                var pageBodyWidth = $("#page-body").css("width");
                pageBodyWidth = pageBodyWidth.substring(0, pageBodyWidth.length - 2);
                //console.log(pageBodyWidth);
                //自适应右边显示的【帮助】【缩略模式】【密码修改】按钮样式
                if (pageBodyWidth >= 683) {//683
//                    if($("#ddlCtrl").width()>=105||$("#div_search").width()<1095){
//                        $("#div_rightButton").css("float", "right");
//                        $("#div_rightButton").css("margin-top", "25px");
//                    }else{
//                        $("#div_rightButton").css("float", "right");
//                        $("#div_rightButton").css("margin-top", "5px");
//                    }
                    $("#div_rightButton").css("float", "right");
                } else {
//                    if($("#ddlCtrl").width()>=105){
//                        $("#div_rightButton").css("float", "none");
//                        $("#div_rightButton").css("margin-top", "25px");
//                    }else{
//                        $("#div_rightButton").css("float", "none");
//                        $("#div_rightButton").css("margin-top", "25px");
//                    }
                    $("#div_rightButton").css("float", "none");
                }

                //自适应查看详情右上角的X号图标位置
                if (pageBodyWidth >= 604) {
                    $(".closeModal").css("right", "-12px");
                } else {
                    $(".closeModal").css("right", "-2px");
                }
                var addNumber = 0;
                if (ifLock) {//有地锁
                    addNumber = 40;//加40px的高度
                }
                if (Dispatch.curModelCheck == "1") {//详情模式

                    $(".pilldivS").css("padding-left", "30px");
                    $(".pilldivS").css("padding-right", "30px");
                    $(".pilldivColor").css("margin-left", "30px");
                    $(".nameCountRight").css("margin-right", "30px");
                    if (pageBodyWidth >= 976 && pageBodyWidth <= 1370) {
                        $(".myPilldivInfo").css("width", "50%");
                        $(".pilldivInfoLeft").css("width", "43%");
                        $(".pilldivInfoRight").css("width", "43%");
                        $(".pilldivS").css("height", (506 + addNumber).toString() + "px");
                        $(".pillDivCoverWH").css("height", (601 + addNumber).toString() + "px");
                        $("div[flag='lockDivLeft']").css("width", "70%");
                        $("div[flag='lockDivRight']").css("width", "30%");
                    } else if (pageBodyWidth >= 1370) {
                        $(".myPilldivInfo").css("width", "33.333333333%");
                        $(".pilldivInfoLeft").css("width", "43%");
                        $(".pilldivInfoRight").css("width", "43%");
                        $(".pilldivS").css("height", (506 + addNumber).toString() + "px");
                        $(".pillDivCoverWH").css("height", (601 + addNumber).toString() + "px");
                        $("div[flag='lockDivLeft']").css("width", "70%");
                        $("div[flag='lockDivRight']").css("width", "30%");
                    } else if (427 <= pageBodyWidth && pageBodyWidth < 976) {
                        $(".myPilldivInfo").css("width", "100%");
                        $(".pilldivInfoLeft").css("width", "48%");
                        $(".pilldivInfoRight").css("width", "48%");
                        $(".pilldivS").css("height", (506 + addNumber).toString() + "px");
                        $(".pillDivCoverWH").css("height", (601 + addNumber).toString() + "px");
                        $("div[flag='lockDivLeft']").css("width", "70%");
                        $("div[flag='lockDivRight']").css("width", "30%");
                    } else if (pageBodyWidth < 427) {
                        $(".myPilldivInfo").css("width", "100%");
                        $(".pilldivInfoLeft").css("width", "100%");
                        $(".pilldivInfoRight").css("width", "100%");
                        addNumber = addNumber + addNumber + addNumber + 13;
                        $(".pilldivS").css("height", (852 + addNumber).toString() + "px");
                        $(".pillDivCoverWH").css("height", (946 + addNumber).toString() + "px");

                        $("div[flag='lockDivLeft']").css("width", "100%");
                        $("div[flag='lockDivRight']").css("width", "100%");
                    }
                } else if (Dispatch.curModelCheck == "2") {//缩略模式
                    $(".pilldivS").css("padding-left", "14px");
                    $(".pilldivS").css("padding-right", "14px");
                    $(".pilldivColor").css("margin-left", "14px");
                    $(".pilldivColor2").css("margin-left", "28px");
                    $(".pillDivCoverWH").css("height", "294px");
                    $(".pilldivS").css("height", "199px");
                    $(".pilldivInfoLeft").css("width", "100%");
                    $(".nameCountRight").css("margin-right", "14px");

                    $("div[flag='lockDivLeft']").css("width", "70%");
                    $("div[flag='lockDivRight']").css("width", "30%");

                    if (pageBodyWidth > 1570) {
                        $(".myPilldivInfo").css("width", "12.5%");
                    } else if (pageBodyWidth > 1268 && pageBodyWidth <= 1570) {
                        $(".myPilldivInfo").css("width", "16.66666%");
                    }
                    else if (pageBodyWidth > 1042 && pageBodyWidth <= 1268) {
                        $(".myPilldivInfo").css("width", "20%");
                    }
                    else if (pageBodyWidth > 869 && pageBodyWidth <= 1042) {
                        $(".myPilldivInfo").css("width", "25%");
                    }
                    else if (pageBodyWidth > 641 && pageBodyWidth <= 869) {
                        $(".myPilldivInfo").css("width", "33.33333%");
                    }
                    else if (pageBodyWidth > 412 && pageBodyWidth <= 641) {
                        $(".myPilldivInfo").css("width", "50%");
                    }
                    else {
                        $(".myPilldivInfo").css("width", "100%");
                    }

                    //自适应缩略模式下的【查看详情】样式
                    if (pageBodyWidth > 356) {
                        $(".Breviary_pilldivInfoLeft").css("width", "43%");
                        $(".Breviary_pilldivInfoRight").css("width", "43%");
                        if (ifLock) {//有地锁
                            $(".Breviary_pilldivS").css("height", (546).toString() + "px");
                            $(".Breviary_pillDivCoverWH").css("height", (628).toString() + "px");
                        } else {
                            $(".Breviary_pilldivS").css("height", (506).toString() + "px");
                            $(".Breviary_pillDivCoverWH").css("height", (590).toString() + "px");
                        }
                    }
                    else {
                        $(".Breviary_pilldivInfoLeft").css("width", "100%");
                        $(".Breviary_pilldivInfoRight").css("width", "100%");
                        $("div[flag='lockDivLeft']").css("width", "100%");
                        $("div[flag='lockDivRight']").css("width", "100%");
                        if (ifLock) {//有地锁
                            $(".Breviary_pilldivS").css("height", (942).toString() + "px");
                            $(".Breviary_pillDivCoverWH").css("height", (1026).toString() + "px");
                        } else {
                            $(".Breviary_pilldivS").css("height", (846).toString() + "px");
                            $(".Breviary_pillDivCoverWH").css("height", (932).toString() + "px");
                        }
                    }
                } else {
                    //默认是详情模式
                    Dispatch.curModelCheck = "1";
                    localStorage.setItem("tps_ModelCheck", Dispatch.curModelCheck);
                    //NotifyWarning("屏幕适应下获取详情/缩略模式错误!");
                }


                if (pageBodyWidth > 812) {
                    $("#div_LoadDispatchGroup_computer").css("display", "block");
                    $("#div_LoadDispatchGroup_phone").css("display", "none");
                } else {
                    $("#div_LoadDispatchGroup_computer").css("display", "none");
                    $("#div_LoadDispatchGroup_phone").css("display", "block");
                }


                var div_mainLeft_width_big = "188px";
                $(".dataPielChart").css("margin", "0 0");//左侧饼图

                //自适应终端个数和饼图样式
                if (pageBodyWidth > 1608) {//最大模式
                    $(".div_mainRight").css("width", "33.33333333%");
                    $(".div_mainRight").css("padding-left", "15px");
                    $(".div_mainRight").css("margin", "");

                    $(".div_mainLeft").css("width", "66.66666667%");
                    $(".div_mainLeft").css("height", div_mainLeft_width_big);

                    $(".pilldivInfoLeftForCheckBox").css("padding-left", "30px");

                    $("#divComputerCheckButton").css("display", "block");//状态checkbox
                    $("#divHr").css("display", "block");//竖线

                    $(".qmain2").css("display", "none");//手机屏幕状态 ，右侧额定总功率自成一行，饼图自成一行

                    $(".PileNumSty").css("width", "185px");//左侧终端个数表
                    $(".dataPielChart").css("width", "255px");//左侧饼图

                }
                else if (1420 <= pageBodyWidth && pageBodyWidth <= 1608) {//右侧额定总功率 缩小，饼图扩大
                    $(".div_mainRight").css("width", "24%");
                    $(".div_mainRight").css("padding-left", "15px");
                    $(".div_mainRight").css("margin", "");

                    $(".div_mainLeft").css("width", "76%");
                    $(".div_mainLeft").css("height", div_mainLeft_width_big);

                    $(".pilldivInfoLeftForCheckBox").css("padding-left", "21px");

                    $("#divComputerCheckButton").css("display", "block");//状态checkbox
                    $("#divHr").css("display", "block");//竖线

                    $(".qmain2").css("display", "none");//手机屏幕状态 ，右侧额定总功率自成一行，饼图自成一行

                    $(".PileNumSty").css("width", "185px");//左侧终端个数表
                    $(".dataPielChart").css("width", "255px");//左侧饼图
                } else if (1163 < pageBodyWidth && pageBodyWidth < 1420) {
                    $(".div_mainRight").css("width", "100%");
                    $(".div_mainRight").css("padding-left", "0px");
                    $(".div_mainRight").css("margin", "");

                    $(".div_mainLeft").css("width", "100%");
                    $(".div_mainLeft").css("margin-bottom", "10px");
                    $(".div_mainLeft").css("height", div_mainLeft_width_big);

                    $(".pilldivInfoLeftForCheckBox").css("padding-left", "21px");

                    $("#divComputerCheckButton").css("display", "block");//状态checkbox
                    $("#divHr").css("display", "block");//竖线

                    $(".qmain2").css("display", "none");//手机屏幕状态

                    $(".PileNumSty").css("width", "185px");//左侧终端个数表
                    $(".dataPielChart").css("width", "255px");//左侧饼图
                }
                else if (620 < pageBodyWidth && pageBodyWidth <= 1163) { //饼图和右侧状态checkbox都自成一行
                    $(".div_mainRight").css("width", "100%");
                    $(".div_mainRight").css("padding-left", "0px");
                    $(".div_mainRight").css("margin", "10px 0px");

                    $(".div_mainLeft").css("width", "100%");
                    $(".div_mainLeft").css("margin-bottom", "10px");
                    $(".div_mainLeft").css("height", div_mainLeft_width_big);

                    $(".pilldivInfoLeftForCheckBox").css("padding-left", "21px");

                    $("#divComputerCheckButton").css("display", "none");//状态checkbox
                    $("#divHr").css("display", "none");//竖线

                    $(".qmain2").css("display", "block");//手机屏幕状态

                    $(".PileNumSty").css("width", "50%");//左侧终端个数表
                    $(".dataPielChart").css("width", "50%");//左侧饼图
                }
                else {//最小屏幕
                    $(".div_mainRight").css("width", "100%");
                    $(".div_mainRight").css("padding-left", "0px");
                    $(".div_mainRight").css("margin", "10px 0px");

                    $(".div_mainLeft").css("height", "316px");
                    $(".div_mainLeft").css("width", "100%");

                    $("#divComputerCheckButton").css("display", "none");//状态checkbox
                    $("#divHr").css("display", "none");//竖线

                    $(".qmain2").css("display", "block");//手机屏幕状态


                    $(".PileNumSty").css("width", "100%");//左侧终端个数表
                    $(".dataPielChart").css("width", "100%");//左侧饼图

                }

                //单独设置饼图大小
                if ($(".img-responsive").length == 0 && datachart_PileFunnel != undefined) {
                    var series = [{radius: '55%'}];//默认的饼图大小
                    if (pageBodyWidth > 390) {

                    } else if (336 < pageBodyWidth && pageBodyWidth <= 390) {
                        series = [{radius: '35%'}];
                    }
                    else if (310 < pageBodyWidth && pageBodyWidth <= 336) {
                        series = [{radius: '15%'}];
                    } else {
                        //动态改变图表大小
                        series = [{radius: '8%'}];
                    }
                    datachart_PileFunnel.setOption(series);
                    //datachart_PileFunnel.setSeries(series);//设置图例数据
                }
                //alert(pageBodyWidth);

                //*/
                vue_this.ValidateIsShowPowerValue();

                $("div[class='divcover pillDivCoverWH']").css("width", $("div[class='pilldiv pillDivCoverWH']").css("width"));
            },
        }
    }

    //    /** 读卡操作*/
    //    export function readCard() {
    //        if (window.AppDispatch != undefined) {
    //            window.AppDispatch.startSwipingCard();
    //        }
    //    }
    //    /** 取消读卡操作*/
    //    export function closeCom() {
    //        if (window.AppDispatch != undefined) {
    //            window.AppDispatch.closeCom();
    //        }
    //    }
    //
    //    /** 获得卡号---如果调不到，放在methods里面试试*/
    //    export function getCard(cardCode) {
    //        if (cardCode != '' && cardCode != undefined) {
    //            dispatch_PayCard.card_CardNo = "";
    //            dispatch_PayCard.card_CardNo = cardCode;
    //            closeCom();//取消刷卡
    //            $("#PleasePayByCardModal").modal("hide");
    //            showLoading();
    //        } else {
    //            NotifyError("卡号为空,请检查!");
    //            return;
    //        }
    //
    //        if (dispatch_PayCard.card_ChargeFlag == "1") {//表示 刷卡充电
    //            dispatch_PayCard.LoadDataByCardCode(true);
    //        } else if (dispatch_PayCard.card_ChargeFlag == "2") {//表示 刷卡结束充电
    //            hideLoading();
    //            TPSSearch.endChargeCommonFun(TPSSearch.Dispatch.curAutoID, true);
    //        }
    //
    //    }






</script>
