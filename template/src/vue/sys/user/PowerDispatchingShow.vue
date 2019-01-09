<template>
    <div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12">
            <div class="widget radius-bordered" style="margin-bottom: 1px;min-height:500px">
                <div class="widget-body">
                    <div id="searchCondition" class="table-toolbar" style="padding-top:5px; padding-bottom:5px;">
                        <input type="hidden" id="DispatchFlag" value="PowerDispatchingShow"/>
                        <!--查询区域-->
                        <Dispatch_TableListSearch></Dispatch_TableListSearch>
                        <!--按钮组-->
                        <Buttons mid="67830b89-2f15-4731-a384-c5fa39a2e045" id="allbuttons"
                                 @setChargeMode="setChargeMode" @setChargeStrategy="setChargeStrategy"
                                 @btnBillSearch="btnBillSearch"
                                 @btnStaChargeView="btnStaChargeView" @handOneKeyCharge="handOneKeyCharge"
                                 @handTimeOneKeyCharge="handTimeOneKeyCharge" @appDispatch="appDispatch"
                                 @BillSearch="BillSearch" @BillDetail="BillDetail" @AppChargeAll="AppChargeAll">
                        </Buttons>
                    </div>
                    <hr class="wide hidden-print hidden-lg hidden-md hidden-sm"
                        style="margin-top:2px;margin-bottom:2px;margin-left: 2px;"/><!--新加margin-left: -10px;-->
                    <div class="wide text-center hidden-print hidden-lg hidden-md hidden-sm" id="vCollapse">
                        <span><i class="fa  fa-angle-double-up"></i></span>
                    </div>
                    <hr class="wide" style="margin-top:2px;margin-bottom:2px;"/>
                    <div class="table-toolbar" style="text-align:left;" name="ButtonGroup">
                        <!--负荷调度警告-->
                        <Dispatch_TableListBtn></Dispatch_TableListBtn>
                    </div>
                    <div class="table-responsive">
                        <!--终端详情-->
                        <Dispatch_TableContent></Dispatch_TableContent>
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
    #appDispatch,#BillSearch,#BillDetail,#AppChargeAll{
        display: none;

    }
</style>


<script>
    var echarts = require('echarts');//？？？？？？？？
    import Buttons from "teld-vue-frame/vue/Button.vue"
    import * as timepicker from "./CommonJS/datetime/bootstrap-timepicker.js"
    //import * as knockout from "./CommonJS/knockout-2.3.0.js"//-----------暂时注释---不知道用来干什么
    import * as TPSSearch from "./CommonJS/TPSSearch.js" //公共js
    import * as dispatch_PayCard from "./CommonJS/dispatch_PayCard.js" //公共js

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
    //    var oldPagebodyWidth = 0;
    //    var ifNeedRemovemargintop0 = false;//是否需要移除掉class margintop0
    //    //var Dispatch = TPSSearch.Dispatch;

    /*空闲*/
    //    var kongxian = "#49A449",
    //        /*已插枪、已充满、暂停、充电中、涓流充*/
    //        shiyongzhong = "#63BBFF",
    //        /*离网*/
    //        liwang = "#BFBFBF",
    //        /*故障*/
    //        guzhang = "#FF6969",
    //        /* 请拔枪*/
    //        qingbaqiang = "#dfb614";



    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };


    export default {

        data() {
            return {};
        },

        mounted() {
            vue_this = this;
            //用于调整自适应
            $(".widget-buttons").height("25px");//新增，针对六个功能按钮，设置高度25px,原高度36px
            $("#allbuttons").css("margin-top", "-15px");//设置6个按钮style
            //屏幕自适应加载
            $("#page-body").resize(function () {
                if (TPSSearch.isClickCheckbox) {
                    TPSSearch.isClickCheckbox = false;
                    return;
                }
                TPSSearch.PageBodyResize();
            });

            //加载页面
            vue_this.LoadPageData();//饼形图初始化包含在这里面
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
                closeCom();//取消读卡
                dispatch_PayCard.card_stopCount();//停止计时
            });

            $('body').append('<div class="rs-overlay" />');
            dispatch_PayCard.InitDIYModal();
            //test(); //模拟刷卡，发布时要去掉【！！！！！！】

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


        },

        components: {
            'Buttons': Buttons,
            'Dispatch_TableListSearch':Dispatch_TableListSearch,
            'Dispatch_TableListBtn':Dispatch_TableListBtn,
            'Dispatch_TableContent':Dispatch_TableContent,
            'Dispatch_Modal':Dispatch_Modal,
        },

        //放在主页里//数据加载LoadPageData
        methods: {
            //数据加载
            LoadPageData: function () {
                TPSSearch.isOneRecord();
                //获取当前userid
                TPSSearch.getCurHidId();
                //获取当前刷新频率
                TPSSearch.getRefreshrate();
                TPSSearch.Dispatch.PageFlag = "PowerDispatchingShow";
                TPSSearch.arr_OperatingPile=[];
//                $("#appDispatch").parent().removeClass("buttons-bordered");
//                $("#BillSearch").parent().removeClass("buttons-bordered");
//                $("#BillDetail").parent().removeClass("buttons-bordered");
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
                TPSSearch.ViewSetChargeMode('ChargeMode');
            },
            //设置群充策略
            setChargeStrategy: function () {
                TPSSearch.ViewSetChargeMode('ChargeStrategy');
            },
            //订单查询
            btnBillSearch: function () {
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
                TPSSearch.OneKeyCharge();
            },
            //定时一键充电
            handTimeOneKeyCharge: function () {
                TPSSearch.GetTimingOnekeyCharge();
            },

            //隐藏按钮
            appDispatch: function () {
            },
            BillDetail: function () {
            },
            AppChargeAll: function () {
            },
            BillSearch:function () {//针对APP调度充电

            },

        }
    }




    /**一体机刷卡专用---这里暂时用不到***/
    //刷卡测试专用
    function test() {
        $("#hidCtrlAddrPillCan").val("");
        NotifyWarning("请刷卡");
        //Dispatch.curPillCode = "3702120244307";
        //Dispatch.curPillCode = "3706010001114";
        //Dispatch.curPillCode = "3702120244502";//net的终端
        Dispatch.curPillCode = "3702120244101";

        $("#hideStaId").val("45b6d5d5-3962-4ec3-bbb5-4c649f4c6f27");//云平台测试站
        $("#PleasePayByCardModal").modal("show");
        dispatch_PayCard.card_IsCounting = true;
        dispatch_PayCard.card_ChargeFlag = "1";
        dispatch_PayCard.card_startTimer();


    }

    /*
     * 读卡操作
     */
    function readCard() {
        if (window.AppDispatch != undefined) {
            window.AppDispatch.startSwipingCard();
        }
    }

    /*
     * 取消读卡操作
     */
    function closeCom() {
        if (window.AppDispatch != undefined) {
            window.AppDispatch.closeCom();
        }
    }

    /*
     * 获得卡号
     */
    function getCard(cardCode) {
        if (cardCode != '' && cardCode != undefined) {
            dispatch_PayCard.card_CardNo = "";
            dispatch_PayCard.card_CardNo = cardCode;
            closeCom();//取消刷卡
            $("#PleasePayByCardModal").modal("hide");
            showLoading();
        } else {
            NotifyError("卡号为空,请检查!");
            return;
        }
        if (dispatch_PayCard.card_ChargeFlag == "1") {//表示 刷卡充电
            dispatch_PayCard.LoadDataByCardCode(true);
        } else if (dispatch_PayCard.card_ChargeFlag == "2") {//表示 刷卡结束充电
            hideLoading();
            vue_this.endChargeCommonFun(Dispatch.curAutoID, true);
        }

    }



</script>
