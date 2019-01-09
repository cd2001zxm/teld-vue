//document.write("<script language=javascript src='MyEcharts.js'></script>");
import * as MyEcharts from  "./MyEcharts.js"
import * as dispatch_PayCard from  "./dispatch_PayCard.js"
import * as dispatchForValiReload from  "./dispatchForValiReload.js"

//判断是否只有一条记录，按钮是否禁用
export function isOneRecord() {
    var url = ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetCustStaByCustIdSysAC";
    var postdata = {
        "filter": JSON.stringify(
            {
                "FieldName": "",
                "FieldValue": "",
                "FilterKey": "",
                "page": 1,
                "rows": 10
            }
        )
    };
    getDataSync(url, "post", postdata, function (result) {
        if (result.state == 1) {
            var row = result.data.row;//对象数组
            var total = result.data.total;
            if (total == 1) {
                debugger
                $("button[data-helper='PowerStationHelp']").attr("disabled", "disabled");
            } else {
                return
            }
        } else {
            NotifyWarning("获取电站信息列表失败");
        }
    });

}
//获取当前userID/customerid
export function getCurHidId() {
    //"src/vue/dispitch/test/getCurUserID.json"
    //需使用同步函数
    getDataSync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetTpsViewCommon", "POST", {}, function (result) {
        result = str2json(result);
        var currentUserId = result.data.UserID;
        var currentCustomerId = result.data.CustID;
        var buttonhtml=result.data.ButtonHtml;
        $("#hideUserID").val(currentUserId);
        $("#hideCustomerID").val(currentCustomerId);
        $("#div_Button").html(buttonhtml);
        $("#div_Button").children().css("border-left","0px");
    });
}
//获取后台已存的自动刷新频率值
export function getRefreshrate() {
    //"src/vue/dispitch/test/getRefreshrate.json"
    //var userid=$("#hideUserID").val();
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetRefreshRate", "POST", {}, function (result) {
        result = str2json(result);
        var currentRefreshrate = result.data;//.refreshTime,返回的只是个data
        if (currentRefreshrate != 0) {
            $("#hideRefreshRate").val(currentRefreshrate);
            $("#span_RefreshTime").text(currentRefreshrate);
        } else {
            $("#span_RefreshTime").text($("#hideRefreshRate").val());
        }

    });
}
//隐藏按钮
export function appDispatch() {
}
export function BillDetail() {
}
export function AppChargeAll() {
}

//根据电站ID获取集控器列表
export function GetCtrlsByStaID() {
    var curStaId = $("#hideStaId").val();//选择的电站id
    if (curStaId == "" || curStaId == "undefined") {
        $("#hideStaId").val("");
        return;
    }
    SetHandRefreshDisabledStatus(true);//设置手动刷新按钮是否能动

    //清空集控器
    $("#Ctrl").html("");
    $("#ddlCtrl").html('集控器<span class="caret"></span>');//当前选中的值
    Dispatch.CtrlAddressMap = "";//清空收集的集控器地址集合
    Dispatch.All_CtrlAddressMap = "";//清空收集的集控器地址集合
    $("#hideCtrlId").val("");//清空隐藏的选中集控器ID
    $("#hideCtrlAddr").val("");//清空隐藏的选中集控器地址
    ClearJSQuantitySumValue();//清空js定义的数据值


    //判断是否保存到localStorage中，如果存在，则不需要向服务器请求
    var ctrllocalStoreID = "tps_ctrl_" + curStaId + "&" + Dispatch.CustomerID;
    var curCtrlList = localStorage.getItem(ctrllocalStoreID);//当前电站对应的集控器列表
    if (curCtrlList != null) {//已经在页面本地存储了
        var result = JSON.parse(curCtrlList);
        BindCtrlDropData(result);
    } else {//还没有页面本地存储
        var postData = {
            'filter': JSON.stringify({
                'StaID': curStaId
            })
        };
        //"src/vue/dispitch/test/GetCtrlListByStaSysAC.json"
        getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetCtrlListByStaSysAC", "POST", postData, function (result) {
            result = str2json(result);
            if (result.state != "1") {
                NotifyWarning(result.errmsg);
                return;
            }
            //本地存储该电站的集控器列表数据
            localStorage.setItem(ctrllocalStoreID, JSON.stringify(result));
            BindCtrlDropData(result);//集控器下拉操作
        }, null, null);
    }
}
//绑定集控器下拉数据
export function BindCtrlDropData(result) {
    Dispatch.All_CtrlAddressMap = result.data.All_CtrlAddressMap;
    var rowCount = result.data.CtrlList.length;
    var ctrlData = result.data.CtrlList;
    var str = "";
    str += "  <li><a href='javascript:void(0)' class='ctrltype' style='height:20px;' ctrlAddr='" + result.data.CtrlAddressMap + "' value='' ></a></li>";
    for (var i = 0; i < rowCount; i++) {

        str += ' <li><a href="javascript:void(0)"  class="' + i + '"  value="' + ctrlData[i].ID + '" ctrlAddr="' + ctrlData[i].Code + '">' + ctrlData[i].Name + '</a></li>';

    }

    $("#Ctrl").html(str);

    //自己加的（上方拼接字符串的含参方法的调用,）
    $("#Ctrl li a").bind("click", function (event) {
        var obj = event.target;
        SearchDataByCtrl(obj);
        //$("#divCtrl>.dropdown-menu").css("display","none");
    });

    var curSelSta = localStorage.getItem("tps_cursta");//cookie里的电站id
    var curSelStaName = decodeURIComponent(localStorage.getItem("tps_cursta_name"));//cookie里的电站名称
    var curSelCtrlID = localStorage.getItem("tps_curctrl_id"); //cookie里集控器ID
    var curSelCtrlName = decodeURIComponent(localStorage.getItem("tps_curctrl_name"));//cookie里集控器名称
    var curSeleCtrlAddress = localStorage.getItem("tps_curctrl_address");//cookie里集控器集合

    //只有第一次页面加载的时候才可以     //(1 == 2 &&)
    //集控器为了配合负荷调度，不再使用cookie 【EditBy shaocx,2016-09-16】
    if (Dispatch.isLoadPage && curSelSta != "undefined" && curSelSta != null && curSelStaName != null && curSelSta == $("#hideStaId").val()
        && curSeleCtrlAddress != null
        && $("#Ctrl").html().indexOf(curSelCtrlID) > -1
    ) {
        Dispatch.CtrlAddressMap = curSeleCtrlAddress;
        $("#hideCtrlId").val(curSelCtrlID);
        $("#ddlCtrl").html(curSelCtrlName + '<span class="caret"></span>');
        $("#hideCtrlAddr").val(curSeleCtrlAddress);
    }
    else {
        Dispatch.CtrlAddressMap = result.data.CtrlAddressMap;
        localStorage.removeItem("tps_curctrl_address");
        localStorage.removeItem("tps_curctrl_id");
        localStorage.removeItem("tps_curctrl_name");

    }
    //根据集控器加载终端数据
    //GetPileData(Dispatch.CtrlAddressMap, false);--liujia
    GetPileData(Dispatch.CtrlAddressMap, false,false);
    Dispatch.isLoadPage = false;
}

//群充模式或充电策略确定按钮
export function btnSaveChargeModelStrategySet() {
    SaveChargeModelStrategySet();
}

//显示 设置充电模式窗口
export function ViewSetChargeMode(flag) {
    if (!Dispatch.IsSetFinished) {//说明没有设置完毕，默认为true，这里用于在界面上控件终端的禁用和启用
        $("#SetChargeModeMessageModal").modal('show');//显示模态窗口
        return;
    }
    $('#SetChargeModeModal').modal('show');//显示模态窗口
    Dispatch.curChargeModeOrChargeStrategy = flag;
    if (Dispatch.ChargeModeOrChargeStrategyDic["ChargeMode"] == flag) {//充电模式
        $("#div_ChargeStrategy").css("display", "none");
        $("#div_ChargeMode").css("display", "block");
        $("#chargeModalLabel").html("设置充电模式");

    } else {//群充策略
        $("#div_ChargeMode").css("display", "none");
        $("#div_ChargeStrategy").css("display", "block");
        $("#chargeModalLabel").html("设置群充策略");

    }
    GetCtrlsByStaIDForModelStrategy();//加载集控器列表
}
//主动隐藏充电模式窗口
export function CancelChargeModelStrategySet() {
    InitDataForChargeModeStrategy("hide");
}
//初始化关于充电模式和群充策略的数据
//* flag:  hide 模态框隐藏 selectEmptyCtrl 选择空的集控器 selectValueCtrl 选择有值的集控器 selectEmptyChargeGroup 选择空的集控器 selectValueChargeGroup 选择有值的群充组
export function InitDataForChargeModeStrategy(flag) {
    switch (flag) {
        case "hide"://模态框隐藏,这里应该是所有值都清空
            Dispatch.allCtrlcanAddrStr = "";
            Dispatch.CtrlcanAddrStr_ChargGroup = "";
            Dispatch.CtrlcanAddrStr_RoundFilling = "";
            $("#hid_CtrlModel").val("");
            $("#hid_DCPile").val("");
            $("#ddlDCPile").html('群充组<span class="caret"></span>');//当前选中的值
            $("#DCPile").html("");
            $("#ddlCtrlModel").html('集控器<span class="caret"></span>');//当前选中的值

            break;
        case "selectEmptyCtrl"://选择空的集控器
            $("#ddlCtrlModel").html('集控器<span class="caret"></span>');//当前选中的值
            $("#ddlDCPile").html('群充组<span class="caret"></span>');//当前选中的值
            $("#DCPile").html("");
            $("#hid_CtrlModel").val("");
            break;
        case "selectValueCtrl"://选择有值的集控器
            $("#ddlDCPile").html('群充组<span class="caret"></span>');//当前选中的值
            $("#DCPile").html("");
            $("#hid_CtrlModel").val("");
            break;
        case "selectEmptyChargeGroup"://选择空的群充组
            $("#hid_DCPile").val("");
            $("#ddlDCPile").html('群充组<span class="caret"></span>');//当前选中的值
            break;
        case "selectValueChargeGroup"://选择有值的群充组
            break;
    }
    Dispatch.chargeMode = "";//充电模式
    Dispatch.chargeStrategy = "";//群充策略
    Dispatch.chargeModeName = "";//充电模式
    Dispatch.chargeStrategyName = "";//群充策略
    Dispatch.curChargeMode = "";
    Dispatch.curChargeStrategy = "";
    Dispatch.curChargeModeName = "";
    Dispatch.curChargeStrategyName = "";
    Dispatch.errMsg_ModeStrategy = "";//错误提示
    Dispatch.allCtrlcanAddrStr = "";
    Dispatch.allCtrlcanAddrCount = 0;
    Dispatch.CtrlcanAddrStr_ChargGroup = "";
    Dispatch.CtrlcanAddrStr_RoundFilling = "";
    Dispatch.CtrlcanAddrStr_ChargGroupAutoID = "";
    Dispatch.CtrlcanAddrStr_ChargGroupCount = 0;
    Dispatch.CtrlcanAddrStr_RoundFillingCount = 0;
    $("#RoundFilling").removeAttr("disabled");
    $("#ChargGroup").removeAttr("disabled");
    $("#ChargGroup").prop("checked", false);
    $("#RoundFilling").prop("checked", false);
    $("#Strategy_B").prop("checked", false);
    $("#Strategy_C").prop("checked", false);
    $("#Strategy_A").prop("checked", false);
    $("#Strategy_B").removeAttr("disabled");
    $("#Strategy_C").removeAttr("disabled");
    $("#Strategy_A").removeAttr("disabled");
    Dispatch.IsSetFinished = true;
}
//* 加载终端数据，请求初始化数据 ctrlAddressMap:集控器地址集合  isClickModelCheck:是否点击了切换模式按钮,modelCtrlFlag标记【SearchDataByCtrl 】【ModelCheck】是否调用startTimer方法modelCtrlFlag=true的时候不调用--liujia
export function GetPileData(ctrlAddressMap, isClickModelCheck,modelCtrlFlag) {

    arr_OperatingPile = [];//页面正在操作中的终端,数组存的是ID（集控器地址+Can地址）（如：开启充电、结束充电、刷卡充电、强制充电等）
    $("#data").html("");
    arr_pileForLock = new Array();
    ifLock = false;
    $('#chart-container').html("");//首先负荷调度清空值
    Dispatch.curPageAllCtrlAutoID_Json = {};
    Dispatch.curPageAllCtrlAutoID_Arr = new Array();
    Dispatch.ChargGroupPileObject_Arr = new Array();
    Dispatch.ChargGroupPileObject_ArrForOneKeyCharge = new Array();
    ClearJSQuantitySumValue();//清空JS变量的值，初始化
    //给额定总功率赋值
    $("#ChargingPower").text("0.00");
    //实际功率
    $("#GrossPower").text("0.00");
    $("#phone_GrossPower").text("0.00");
    CalcGrossPowerProportion();//计算实际功率占额定总功率的比例
    //$("#div_LoadDispatchGroup").html("");
    $("#div_LoadDispatchGroup_computer").html("");//在tablelistcontent中，还未放入template，若放入，页面提示会一直请求失败
    $("#div_LoadDispatchGroup_phone").html("");//在tablelistcontent中，还未放入template，若放入，页面提示会一直请求失败
    Dispatch.TraRealTimeData = {};//清空负荷调度的数据
    SetHandRefreshDisabledStatus(true);
    var rowCount = 0;
    if (ctrlAddressMap == "") {//说明选择的是全部集控器
        ctrlAddressMap = Dispatch.All_CtrlAddressMap;
    }
    var postData = {
        'filter': JSON.stringify({
            'StaID': $("#hideStaId").val(),
            'StaName': $("#hideStaName").val(),
            'CustomerID': Dispatch.CustomerID,
            'CtrlAddressMap': ctrlAddressMap,
            'CtrlID': $("#hideCtrlId").val(),  //集控器ID
            'ModelCheck': Dispatch.curModelCheck, //当前选择的模式
            'PageFlag': Dispatch.PageFlag, //页面类型
            'CustomerID': Dispatch.CustomerID //客户ID
        })
    };
    //var url="src/vue/dispitch/test/getPileData.json"
    var url = ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "InitPillsList";
    getDataAsync(url, "POST", postData, function (result) {
        result = str2json(result);
        //result = JSON.parse(result);
        //startTimer();//开始调用循环调用

        if(!modelCtrlFlag){
            startTimer();//开始调用循环调用--liujia
        };
        if(Dispatch.isChangSta){//只有第一次调用集控器绑定电站可以。默认是true --liujia
            startTimer();//开始调用循环调用
        };

        SetHandRefreshDisabledStatus(false);
        if (result.state != "1") {
            NotifyWarning(result.errmsg);
            return;
        }
        if (isClickModelCheck) {
            //如果是点击了 模式切换按钮，则设置模式按钮样式
            SetBtnModelCheckForSuccess();
        }
        //给额定总功率赋值
        var chargingPower = result.data.ChargingPowerSum;
        $("#ChargingPower").text(chargingPower);//chargingPower
        var chargingPowerWidth = $("#ChargingPower").css("width");
        $("td[name='td_Power']").css("width", chargingPowerWidth);
        //实际功率
        var grossPower = result.data.GrossPower;
        grossPower = changeTwoDecimal_f(grossPower);
        $("#GrossPower").text(grossPower);
        $("#phone_GrossPower").text(grossPower);
        CalcGrossPowerProportion();//计算实际功率占额定总功率的比例
        //显示负荷调度信息（变压器）
        SetLoadDispatchViewData(result.data.TraData);
        Dispatch.TraRealTimeData = result.data.TraRealTimeData;//负荷调度数据
        var resListData = result.data.queryPiles;//返回的列表值对象
        rowCount = resListData.length;//要加载的终端数量
        var str = "";
        if (rowCount == 0) {
            PageBodyResize();
            str += "<tr>";
            str += "<td colspan='10' style='text-align:center;'>";
            str += "无记录";
            str += "</td>";
            str += "</tr>";
            $("#data").html(str);
        }
        else {
            //首先验证下这些终端是否有地锁
            ifLock = false;//是否支持地锁
            for (var bb = 0; bb < rowCount; bb++) {
                //if (resListData[bb].IfLock == "1") {//显示地锁
                if (resListData[bb].CarportSensor == "1" || resListData[bb].CarportSensor == "2") {//显示地锁
                    ifLock = true;
                    break;
                }
            }
            var currentInitPillObj = undefined,//当前的终端对象 【EditBy shaocx,2015-10-23】
                nameCountRight_forceReplyCharge = "nameCountRight_forceReplyCharge",
                pillName = undefined,
                chrgingGroup = undefined,//轮充组
                nameHtml = null,
                ctrlName = undefined,
                renderName = null,
                int_chrgingGroup = 0,
                chargingPort = null,
                chargingPowerText = null,
                result = "",
                resultArr = new Array();
            for (var i = 0; i < rowCount; i++) {
                currentInitPillObj = resListData[i];
                //构建整体div开头
                str += "<div id='pilldiv_" + currentInitPillObj.AutoID + "' class='myPilldivInfo wholePaddingLeftRight'>";
                str += "<div  class='pilldiv pillDivCoverWH'>";
                //遮罩层
                str += "<div id='pillcover_" + currentInitPillObj.AutoID + "' class='divcover pillDivCoverWH' style='display: none;'></div>";
                str += "<div id='modeStrategyCover_" + currentInitPillObj.AutoID + "' class='divcover pillDivCoverWH' style='display: none;'></div>";
                //隐藏字段
                str += "<input type='hidden' value='" + currentInitPillObj.PillID + "' id='pillID_" + currentInitPillObj.AutoID + "'>";
                str += "<input type='hidden' value='" + currentInitPillObj.PillCode + "' id='pillCode_" + currentInitPillObj.AutoID + "'>";//终端编号【EditBy shaocx,2016-05-23】
                str += "<input type='hidden' value='" + currentInitPillObj.CanSN + "' id='pillCanSN_" + currentInitPillObj.AutoID + "'>";
                str += "<input type='hidden' value='" + currentInitPillObj.CtrlAddress + "' id='CtrlAddress_" + currentInitPillObj.AutoID + "'>";
                str += "<input type='hidden' value='" + currentInitPillObj.SSZT + "' id='SSZT_" + currentInitPillObj.AutoID + "'>";
                str += "<input type='hidden' value='" + currentInitPillObj.CustID + "' id='custId_" + currentInitPillObj.AutoID + "'>";//当前开始该终端的用户
                str += "<input type='hidden' value='" + currentInitPillObj.Chargers + "' id='Chargers_" + currentInitPillObj.AutoID + "'>";//操作方式编号,刷卡充电只处理(10为调度充) 【EditBy shaocx,2016-05-15】
                //是否是各个群充组下的非第一个终端，1为是 0为否，用于界面上的终端 群充模式下禁用
                str += "<input type='hidden' value='" + currentInitPillObj.IsNextForChargGroup + "' id='IsNextForChargGroup_" + currentInitPillObj.AutoID + "'>";
                //属于各个群充组下的第一个终端CAN地址,如果是第一个，则为空
                str += "<input type='hidden' value='" + currentInitPillObj.FirstPileCanSN + "' id='FirstPileCanSN_" + currentInitPillObj.AutoID + "'>";
                //顶部状态名称
                str += "<div id='pillColor_" + currentInitPillObj.AutoID + "' class='pilldivColor'>";
                str += "</div>";
                str += "<div class='nameCount' id=''>";
                str += "<s:property value='%{pillName.stateText}' id='statusName_" + currentInitPillObj.AutoID + "'></s:property>";
                str += "</div>";

                //顶部右侧
                if (IsDetailsModel()) {//只有详情模式才显示【查看上次充电记录】onclick='dispatch_PayCard.SetChargeDeatilData(this,1);'
                    str += "<div  idvalue='" + currentInitPillObj.AutoID + "' title='查看上次充电记录'    style='cursor:pointer' class='nameCountRight' >";
                    str += "</div>";
                } else {//只有简化模式下显示【查看详情】onclick='ShowDetailModal(this);'
                    str += "<div  idvalue='" + currentInitPillObj.AutoID + "' title='查看详情'    style='cursor:pointer' class='nameCountRight' >";
                    str += "</div>";
                    nameCountRight_forceReplyCharge = "nameCountRight_forceReplyChargeForSimplify";
                }

                //默认会隐藏,人工调度按钮onclick='forceReplyCharge(\"" + currentInitPillObj.AutoID + "\")    'style='cursor:pointer;display:none'
                str += "<div id='forceReplyCharge_" + currentInitPillObj.AutoID + "'title='人工调度'  style='cursor:pointer;display:none' class=" + nameCountRight_forceReplyCharge + " >";
                str += "</div>";

                str += "<div id='pzt_" + currentInitPillObj.AutoID + "' class='pilldivS pilldivSButtonW clearfix'>";

                //终端名称
                pillName = currentInitPillObj.PillName;
                chrgingGroup = currentInitPillObj.LCZFZ;//轮充组
                ctrlName = currentInitPillObj.CtrlName;
                //根据轮充组判断颜色： 轮充组为空：无色 轮充组%2=1：蓝色（76a2bc） 轮充组%2=0：黄色（9c9a69）
                if (IsDetailsModel()) {//详情模式
                    //终端信息主体
                    str += "<div flag='lockDivLeft' style='width: 70%;float: left;'>";//主左Div【开始】

                    /***********地锁车位样式开始(修改后)******************/
                    //地锁状态
                    if (ifLock) {
                        str += "<div class='pilldivInfo'>";
                        str += "<div class='redtextdiv_While' style='margin-left:0;margin-bottom: 15px;'>";
                        if (currentInitPillObj.CarportSensor == "0" || currentInitPillObj.CarportSensor == null) {//车位感应状态0，无显示
                            str += '<div  class="lockStuts navbar-toggleColorForGL" style="background-color: #FCFCFC;"></div> ';

                        } else if (currentInitPillObj.CarportSensor == "1") {//车位感应状态1，有地锁
                            if (currentInitPillObj.ParkStateName == null || currentInitPillObj.ParkStateName == "") {
                                //str += '<div id="div_ParkStateName_' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">车位未知</div> &nbsp;&nbsp;';
                                currentInitPillObj.ParkStateName = "车位未知";
                            }
                            if (currentInitPillObj.LockStateName == null || currentInitPillObj.LockStateName == "") {
                                //str += '<div id="div_LockStateName_' + currentInitPillObj.AutoID + '"   class="lockStuts navbar-toggleColorForGL">地锁离网</div> ';
                                currentInitPillObj.LockStateName = "地锁离网";
                            }

                            str += '<div id="div_ParkStateName_' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">' + currentInitPillObj.ParkStateName + '</div> &nbsp;&nbsp;';
                            str += '<div id="div_LockStateName_' + currentInitPillObj.AutoID + '"   class="lockStuts navbar-toggleColorForGL">' + currentInitPillObj.LockStateName + '</div> ';


                        } else if (currentInitPillObj.CarportSensor == "2") {//显示车位状态
                            str += '<div id="div_ParkStateName_' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">'
                                + ((currentInitPillObj.ParkStateName==null || currentInitPillObj.ParkStateName=="")?"车位未知": currentInitPillObj.ParkStateName)
                                + '</div>';
                        }
                        str += "</div>";
                        str += "</div>";
                    }
                    /*if (ifLock) {
                                    //地锁状态
                                    str += "<div class='pilldivInfo'>";
                                    str += "<div class='redtextdiv_While' style='margin-left:0;margin-bottom: 15px;'>";
                                    if (currentInitPillObj.IfLock == "1") {//显示地锁
                                        str += '<div id="div_ParkStateName_' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">' + currentInitPillObj.ParkStateName + '</div> &nbsp;&nbsp;';
                                        str += '<div id="div_LockStateName_' + currentInitPillObj.AutoID + '"   class="lockStuts navbar-toggleColorForGL">' + currentInitPillObj.LockStateName + '</div> ';
                                    } else {
                                        str += '<div  class="lockStuts navbar-toggleColorForGL" style="background-color: white;"></div> ';
                                    }
                                    str += "</div>";
                                    str += "</div>";
                                }//*/
                    /***********地锁车位样式结束******************/

                    str += "<div class='pilldivInfo'>";
                    str += "<div class='redtextdiv_While' style='margin-left:0'>";
                    renderName = pillName + " | " + ctrlName;//显示的名称
                    if (chrgingGroup == "" || chrgingGroup == null) {
                        nameHtml = '<span class="nocolor">' + renderName + '</span>';
                    } else {
                        int_chrgingGroup = parseInt(chrgingGroup);
                        if (int_chrgingGroup % 2 == 1) {
                            nameHtml = '<span class="color_blue fontWeightBold">' + renderName + '</span>';
                        } else if (int_chrgingGroup % 2 == 0) {
                            nameHtml = '<span class="color_yellow fontWeightBold">' + renderName + '</span>';
                        }
                    }
                    str += "<div  id='pillName_" + currentInitPillObj.AutoID + "'>" + nameHtml + "</div>";
                    str += "</div>";
                    str += "</div>";
                    chargingPort = ConvertViewStr(currentInitPillObj.ChargingPort, "ChargingPort");//充电接口
                    chargingPowerText = "额定功率" + ConvertViewStr(currentInitPillObj.ChargingPowerText, "ChargingPowerText");//额定功率
                    str += "<div class='pilldivInfo'>";
                    str += "<div class='redtextdiv_While' style='margin-left:0'>";
                    str += "<div class='nocolor'>" + (chargingPort + " | " + chargingPowerText) + "</div>";
                    str += "</div>";
                    str += "</div>";

                    str += "</div>";//主左Div【结束】

                    /************地锁车位状态-地锁图片显示开始（修改后）*****************/

                    if (ifLock) {

                        if (currentInitPillObj.CarportSensor == "1") {//显示地锁
                            var display = "display:block;";
                            if (currentInitPillObj.LockStateName == '地锁离网') {
                                display = "display:none;";
                            }
                            str += "<div  flag='lockDivRight' id='div_lock_" + currentInitPillObj.AutoID + "' style='width: 30%;float: right;" + display + "'>";//主右Div【开始】
                            switch (currentInitPillObj.iLockStateCode) {
                                //case "0"://地锁升起状态
                                case 0://地锁升起状态
                                default://故障或离网
                                    str += "<div id='div_lockImg_" + currentInitPillObj.AutoID + "' class='lockImgForRise'></div>";
                                    str += '<div><button autoid="' + currentInitPillObj.AutoID + '" id="btn_lock_' + currentInitPillObj.AutoID + '" type="button" class="btn btn-default lockButton lockType" iLockStateCode="' + currentInitPillObj.iLockStateCode + '" PileCode="' + currentInitPillObj.PillCode + '" >降下地锁</button></div>';
                                    break;
                                //case "1"://地锁降下
                                case 1://地锁降下
                                    str += "<div  id='div_lockImg_" + currentInitPillObj.AutoID + "'  class='lockImgForDrop'></div>";
                                    str += '<div><button autoid="' + currentInitPillObj.AutoID + '" id="btn_lock_' + currentInitPillObj.AutoID + '" type="button" class="btn btn-default lockButton lockType" iLockStateCode="' + currentInitPillObj.iLockStateCode + '" PileCode="' + currentInitPillObj.PillCode + '" >升起地锁</button></div>';
                                    break;
                            }


                            str += "</div>";//主右Div【结束】
                        }
                    }
                    /************地锁车位状态开始*****************/

                    //这个div纯粹是为了增加间隔弄的
                    str += "<div class='pilldivInfo' style='height:20px;'/>";

                } else { //缩略模式
                    //终端信息主体
                    str += "<div class='pilldivInfo'>";
                    str += "<div class='redtextdiv_While' style='margin-left:0'>";
                    str += "<div class='pilldivInfo'/>";
                    renderName = pillName;//显示的名称
                    if (chrgingGroup == "" || chrgingGroup == null) {
                        nameHtml = '<span>' + renderName + '</span>';
                    } else {
                        int_chrgingGroup = parseInt(chrgingGroup);
                        if (int_chrgingGroup % 2 == 1) {
                            nameHtml = '<span class="color_blue">' + renderName + '</span>';
                        } else if (int_chrgingGroup % 2 == 0) {
                            nameHtml = '<span class="color_yellow">' + renderName + '</span>';
                        }
                    }
                    str += "<div  id='pillName_" + currentInitPillObj.AutoID + "' title='" + renderName + "'>" + nameHtml + "</div>";
                    str += "</div>";
                    str += "</div>";

                    str += "<div class='pilldivInfo'>";
                    str += "<div style='margin-left:0'>";
                    str += "<div title='" + ctrlName + "'>" + ctrlName + "</div>";
                    str += "</div>";
                    str += "</div>";
                    str += "<div class='pilldivInfo' />";
                }

                str += "<div id='ctrlObj_" + currentInitPillObj.AutoID + "' >";
                if (IsDetailsModel()) {
                    //详情模式
                    str = CreateControlObjectForDetails(currentInitPillObj, str);
                } else {
                    //缩略模式
                    str = CreateControlObjectForBreviary(currentInitPillObj, str);
                    var detailHtml = CreateDetailDataForBreviary(currentInitPillObj);
                    str += detailHtml;
                }
                str += "</div>";
                str += "</div>";//pzt_ 的结束


                /*【终端按钮】开始*/
                str += "<button class='pilldivButton pilldivSButtonW startcharge' style='background:#49A449;display:none;' id='replyCharge_" + currentInitPillObj.AutoID + "'>";
                str += "<span>";
                str += "<s:text name='开始充电'>开始充电</s:text>";
                str += "</span>";
                str += "</button>";


                str += "<button class='pilldivButton pilldivSButtonW endcharge' style='background:#D05353;display:none;' id='endCharge_" + currentInitPillObj.AutoID + "' >";
                str += "<span>";
                str += "<s:text name='结束充电'>结束充电</s:text>";
                str += "</span>";
                str += "</button>";

                str += "<button class='pilldivButton pilldivSButtonW ' style='background:#5396D0;display:none;' disabled='disabled' id='plugGrab_" + currentInitPillObj.AutoID + "'>";
                str += "<span>";
                str += "<s:text name='请插枪'>请插枪</s:text>";
                str += "</span>";
                str += "</button>";

                str += "<button class='pilldivButton pilldivSButtonW' style='background:#dfb614;display:none;' disabled='disabled' id='baGrab_" + currentInitPillObj.AutoID + "'>";
                str += "<span>";
                str += "<s:text name='请拔枪'>请拔枪</s:text>";
                str += "</span>";
                str += "</button>";

                str += "<button class='pilldivButton pilldivSButtonW' style='background:#C1C1C1;display:none;' disabled='disabled' id='timeout_" + currentInitPillObj.AutoID + "'>";
                str += "<span>";
                str += "<s:text name='暂停服务'>暂停服务</s:text>";
                str += "</span>";
                str += "</button>";

                str += "<button class='pilldivButton pilldivSButtonW' style='background:#595959;color:#bababa;display:none;' disabled='disabled' id='canntuse_" + currentInitPillObj.AutoID + "'>";
                str += "<span>";
                str += "<s:text name='被其他用户控制'>被其他用户控制</s:text>";
                str += "</span>";
                str += "</button>";

                str += "<button class='pilldivButton pilldivSButtonW' style='background:#595959;color:#bababa;display:none;' disabled='disabled' id='setModeStrategy_" + currentInitPillObj.AutoID + "'>";
                str += "<span>";
                str += "<s:text name='正在设置充电模式' id='textModeStrategy_" + currentInitPillObj.AutoID + "'>正在设置充电模式</s:text>";
                str += "</span>";
                str += "</button>";

                str += "<button class='pilldivButton pilldivSButtonW' style='background:#C1C1C1;display:none;' disabled='disabled' id='loadDispatch_" + currentInitPillObj.AutoID + "'>";
                str += "<span>";
                str += "<s:text name='等候调度'>等候调度</s:text>";
                str += "</span>";
                str += "</button>";

                /*【终端按钮】结束*/
                str += "</div>";
                //构建整体div结束
                str += '</div>';

                resultArr.push(str);
                //$("#data").append(str);
                str = "";//注意，要清空！！！！
            }
            result = resultArr.join("");
            $("#data").html(result);
            ClearJSQuantitySumValue();//清空JS变量的值，初始化
            currentInitPillObj = undefined;
            var firstObj = null;
            GetPageSumValue_Before();//汇总页面状态前夕
            var strJson = "{";//构造JSON字符串//遍历页面上所有的终端ID
            //必须再次循环一遍，不然控件会找不到
            for (var i = 0; i < rowCount; i++) {
                if (i == 0) {
                    firstObj = resListData[0];
                }
                currentInitPillObj = resListData[i];//重新赋值 【EditBy shaocx,2015-10-23】
                SetPageContollerValue(currentInitPillObj, true);//根据终端对象的值给页面相关控件赋值，这是核心业务 【EditBy shaocx,2015-10-23】

                GetPageSumValue_Center(currentInitPillObj.AutoID, currentInitPillObj.SSZT);//汇总页面状态中夕

                //遍历页面上所有的终端ID
                strJson += "'" + currentInitPillObj.AutoID + "':'" + currentInitPillObj.AutoID + "',";
                Dispatch.curPageAllCtrlAutoID_Arr.push(currentInitPillObj.AutoID);
            }
            GetPageSumValue_End();//汇总页面状态后夕

            /***开始充电-结束充电-模式切换事件*************************/
            bindClickEvent();
            /***开始充电-结束充电-模式切换事件*************************/

            /***人工调度事件*************************/
            $(".nameCountRight_forceReplyCharge").unbind().bind("click", function (obj) {
                var data = $(obj.target).attr('id').split('_')[1];
                //var data = currentInitPillObj.AutoID;
                forceReplyCharge(data);
            });
            //缩略模式下的人工调度事件
            $(".nameCountRight_forceReplyChargeForSimplify").unbind().bind("click", function (obj) {
                var data = $(obj.target).attr('id').split('_')[1];
                forceReplyCharge(data);
            });
            /***人工调度事件*************************/

            /***地锁事件*************************/

            $(".lockType").unbind().bind("click", function (event) {
                var obj = event.target;
                if (IsDetailsModel()) {//详情模式
                    if (ifLock) {
                        for (var i = 0; i < rowCount; i++) {
                            currentInitPillObj = resListData[i];
                            if (currentInitPillObj.CarportSensor == "1") {
                                //if (currentInitPillObj.IfLock == "1") {//显示地锁

                                switch (currentInitPillObj.iLockStateCode) {
                                    case "0"://地锁升起状态
                                    case 0://地锁升起状态
                                        PutLockInfo(obj);
                                        break;
                                    case "1"://地锁降下
                                    case 1://地锁降下
                                        PutLockInfo(obj);
                                        break;
                                    default://故障或离网
                                        break;
                                }
                                //}
                            }
                        }
                    }
                }
            });
            /***地锁事件*************************/

            //遍历页面上所有的终端ID
            if (strJson != "{") {
                strJson = strJson.substring(0, strJson.length - 1);
            }
            strJson += "}";
            Dispatch.curPageAllCtrlAutoID_Json = eval('(' + strJson + ')');

            ShowHideWarningByStationHighPriceFlag(firstObj);
            SetPageCtrlDiscoverForModeStrategy();//根据设置模式或策略的终端设置页面终端的遮罩禁用
            SetPileShowHideByCookie();//根据cookie里的记录显示和隐藏终端
        }
    }, null, null);

}
//事件绑定
export function bindClickEvent() {
    //自己加的（上方拼接字符串的含参方法的调用）（拼接字符串事件的引用）
    $(".nameCountRight").bind("click", function (event) {
        var obj = event.target;
        if (IsDetailsModel()) {//详情模式
            dispatch_PayCard.SetChargeDeatilData(obj, 1);
        } else {//缩略模式
            ShowDetailModal(obj);
        }
    });
    //自己加的,开始充电
    $(".startcharge").bind("click", function (event) {
        var obj = event.target;
        replyCharge(obj);
    });
    //自己加的（上方拼接字符串的含参方法的调用,#Ctrl）（拼接字符串事件的引用）
    $(".endcharge").bind("click", function (event) {
        var obj = event.target;
        endCharge(obj);
    });

}
//创建详情模式的显示对象  currentInitPillObj:数据对象 str：整理的字符串 prefix:缩略模式下的详情样式前缀,如果为空，说明不是缩略模式下的详情
export function CreateControlObjectForDetails(currentInitPillObj, str, prefix) {
    var prefixForBreviary = '';
    if (prefix != undefined) {
        prefixForBreviary = prefix;
    }
    /*【块状1】开始*/
    str += "<div>";
    /*【左侧显示】开始*/
    str += "<div class='" + prefixForBreviary + "pilldivInfoLeft'>";//添加的新的div，用于显示左侧 【EditBy shaocx,2016-01-11】
    str += "<div class='" + prefixForBreviary + "content'>";
    //模拟
    /*
                 currentInitPillObj.Carport = "这是车位";
                 currentInitPillObj.CPH = "京NMW019";
                 currentInitPillObj.CX = "吉利帝豪EC7 EV";
                 currentInitPillObj.ChargerNames = "刷卡、直接充";
                 currentInitPillObj.FZDY = "24V";
                 currentInitPillObj.QSSOC = "98.00%";
                 currentInitPillObj.DQSOC = "98.00%";
                 currentInitPillObj.Power = "31563.59";
                 currentInitPillObj.YCQSJ = "16:23";
                 currentInitPillObj.SJGL = "4524.36";
                 //*/
    str += GetStrForPilldivInfo("Carport", "车位", currentInitPillObj.Carport, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("QSSOC", "初始SOC", currentInitPillObj.QSSOC, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("DQSOC", "当前SOC", currentInitPillObj.DQSOC, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("Power", "电量", "", currentInitPillObj.AutoID, currentInitPillObj, prefixForBreviary);
    str += GetStrForPilldivInfo("ChargingMode", "充电模式", "--", currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("FZDY", "辅源类型", currentInitPillObj.FZDY, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += "</div>";
    str += "</div>";//添加的新的div，用于显示左侧 【EditBy shaocx,2016-01-11】
    /*【左侧显示】结束*/
    /*【右侧显示】开始*/
    str += "<div class='" + prefixForBreviary + "pilldivInfoRight'>";
    str += "<div class='" + prefixForBreviary + "content'>";
    str += GetStrForPilldivInfo("CPH", "车牌号", currentInitPillObj.CPH, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("CX", "车型", currentInitPillObj.CX, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("CarCode", "车辆自编号", currentInitPillObj.CarCode, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("FullPower", "车辆额定电量", currentInitPillObj.FullPower, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("ChargeStrategy", "群充策略", "--", currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("ChargerNames", "启动方式", currentInitPillObj.ChargerNames, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += "</div>";//添加的新的div，用于显示右侧 【EditBy shaocx,2016-01-11】
    str += '</div>';
    /*【右侧显示】结束*/
    str += "</div>";
    /*【块状1】结束*/
    str += "<div class='" + prefixForBreviary + "pilldivInfoAll'>";
    str += '<hr  style="margin-top:2px;margin-bottom:2px;">';
    str += "</div>";
    /*【块状2】开始*/
    str += "<div>";
    /*【左侧显示】开始*/
    str += "<div class='" + prefixForBreviary + "pilldivInfoLeft'>";//添加的新的div，用于显示左侧 【EditBy shaocx,2016-01-11】
    str += "<div class='" + prefixForBreviary + "content'>";
    str += GetStrForPilldivInfo("YCQSJ", "插枪时间", currentInitPillObj.YCQSJ, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("CDZSJ", "充电时间", currentInitPillObj.CDZSJ, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("YCMSJ", "充满时间", currentInitPillObj.YCMSJ, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += "</div>";
    str += "</div>";//添加的新的div，用于显示左侧 【EditBy shaocx,2016-01-11】
    /*【左侧显示】结束*/
    /*【右侧显示】开始*/
    str += "<div class='" + prefixForBreviary + "pilldivInfoRight'>";
    str += "<div class='" + prefixForBreviary + "content'>";
    str += GetStrForPilldivInfo("PDSJ", "排队时间", currentInitPillObj.PDSJ, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("CDSYSJ", "预计剩余时间", currentInitPillObj.CDSYSJ, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("CSCS", "重试次数", currentInitPillObj.CSCS, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += "</div>";//添加的新的div，用于显示右侧 【EditBy shaocx,2016-01-11】
    str += '</div>';
    /*【右侧显示】结束*/
    str += "</div>";
    /*【块状2】结束*/
    str += "<div class='" + prefixForBreviary + "pilldivInfoAll'>";
    str += '<hr  style="margin-top:2px;margin-bottom:2px;">';
    str += "</div>";
    /*【块状3】开始*/
    str += "<div>";
    /*【左侧显示】开始*/
    str += "<div class='" + prefixForBreviary + "pilldivInfoLeft'>";//添加的新的div，用于显示左侧 【EditBy shaocx,2016-01-11】
    str += "<div class='" + prefixForBreviary + "content'>";
    str += GetStrForPilldivInfo("DY", "当前电压", currentInitPillObj.DY, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("SJGL", "当前功率", currentInitPillObj.SJGL, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("XZGL", "限制功率", currentInitPillObj.XZGL, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("DemandPowerText", "需求功率", currentInitPillObj.DemandPowerText, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("MinPowerText", "最小功率", currentInitPillObj.MinPowerText, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("DSQMS", "单双枪模式", currentInitPillObj.DSQMS, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += "</div>";
    str += "</div>";//添加的新的div，用于显示左侧 【EditBy shaocx,2016-01-11】
    /*【左侧显示】结束*/
    /*【右侧显示】开始*/
    str += "<div class='" + prefixForBreviary + "pilldivInfoRight'>";
    str += "<div class='" + prefixForBreviary + "content'>";
    str += GetStrForPilldivInfo("RatedVoltage", "额定电压", currentInitPillObj.RatedVoltage, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("DL", "当前电流", currentInitPillObj.DL, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("XZDL", "限制电流", currentInitPillObj.XZDL, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("XQDL", "需求电流", currentInitPillObj.XQDL, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("MinCurrent", "最小电流", currentInitPillObj.MinCurrent, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("SFZQ", "是否主枪", currentInitPillObj.SFZQ, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += "</div>";//添加的新的div，用于显示右侧 【EditBy shaocx,2016-01-11】
    str += '</div>';
    /*【右侧显示】结束*/
    str += "</div>";
    /*【块状3】结束*/
    return str;
}
//创建缩略模式的显示对象
export function CreateControlObjectForBreviary(currentInitPillObj, str) {
    var prefixForBreviary = '';
    //模拟
    /*
                 currentInitPillObj.Carport = "这是车位";
                 currentInitPillObj.CPH = "京NMW019";
                 currentInitPillObj.CX = "吉利帝豪EC7 EV";
                 currentInitPillObj.ChargerNames = "刷卡、直接充";
                 currentInitPillObj.FZDY = "24V";
                 currentInitPillObj.QSSOC = "98.00%";
                 currentInitPillObj.DQSOC = "98.00%";
                 currentInitPillObj.Power = "31563.59";
                 currentInitPillObj.YCQSJ = "16:23";
                 currentInitPillObj.SJGL = "4524.36";
                 //*/

    /*************************************************【块状1】开始***************************************************************/
    str += "<div>";
    /*************************************************【左侧显示】开始***************************************************************/
    str += "<div class='pilldivInfoLeft'>";//添加的新的div，用于显示左侧 【EditBy shaocx,2016-01-11】
    str += '<div class="content">';
    str += GetStrForPilldivInfo("Carport", "车位", currentInitPillObj.Carport, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("Power", "电量", "", currentInitPillObj.AutoID, currentInitPillObj, prefixForBreviary);
    str += GetStrForPilldivInfo("DL", "当前电流", currentInitPillObj.DL, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("CDSC", "充电时长", currentInitPillObj.CDSC, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("DY", "当前电压", currentInitPillObj.DY, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += GetStrForPilldivInfo("SJGL", "当前功率", currentInitPillObj.SJGL, currentInitPillObj.AutoID, null, prefixForBreviary);
    str += "</div>";
    str += "</div>";//添加的新的div，用于显示左侧 【EditBy shaocx,2016-01-11】
    /*【左侧显示】结束*/
    /*【右侧显示】开始*/
    /*【右侧显示】结束*/
    str += "</div>";
    /*【块状1】结束*/
    return str;
}
//创建缩略模式下的详情对象
export function CreateDetailDataForBreviary(currentInitPillObj) {
    var prefixForBreviary = 'Breviary_';
    var str = "";
    str += "<div  name='DetailDataForBreviary'  style='display:none;'>";
    str += "<div class='" + prefixForBreviary + "pilldiv  " + prefixForBreviary + "pillDivCoverWH' >";
    //顶部状态名称
    str += "<div id='pillColor2_" + currentInitPillObj.AutoID + "' class='pilldivColor2'>";
    str += "</div>";
    str += "<div class='nameCount' id=''>";
    str += "<s:property value='%{pillName.stateText}' id='statusName2_" + currentInitPillObj.AutoID + "'></s:property>";
    str += "</div>";
    str += "<div  class='" + prefixForBreviary + "pilldivS  " + prefixForBreviary + "pilldivSButtonW  " + prefixForBreviary + "clearfix'>";

    //终端信息主体
    str += "<div flag='lockDivLeft' style='width: 70%;float: left;'>";//主左Div【开始】

    /**********地锁车位状态样式（原来的）**********************/
    //地锁状态
    if (ifLock) {
        str += "<div class='pilldivInfo'>";
        str += "<div class='redtextdiv_While' style='margin-left:0;margin-bottom: 15px;'>";
        if (currentInitPillObj.CarportSensor == "0" || currentInitPillObj.CarportSensor == null) {//车位感应状态0，无显示
            str += '<div  class="lockStuts navbar-toggleColorForGL " style="background-color: #FCFCFC;"></div> ';

        } else if (currentInitPillObj.CarportSensor == "1") {//车位感应状态1，有地锁
            if (currentInitPillObj.ParkStateName == null || currentInitPillObj.ParkStateName == "") {
                //str += '<div id="div_ParkStateName_' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">车位未知</div> &nbsp;&nbsp;';
                currentInitPillObj.ParkStateName = "车位未知";
            }
            if (currentInitPillObj.LockStateName == null || currentInitPillObj.LockStateName == "") {
                //str += '<div id="div_LockStateName_' + currentInitPillObj.AutoID + '"   class="lockStuts navbar-toggleColorForGL">地锁离网</div> ';
                currentInitPillObj.LockStateName = "地锁离网";
            }
            str += '<div id="div_ParkStateName_2' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">' + currentInitPillObj.ParkStateName + '</div> &nbsp;&nbsp;';
            str += '<div id="div_LockStateName_2' + currentInitPillObj.AutoID + '"   class="lockStuts navbar-toggleColorForGL">' + currentInitPillObj.LockStateName + '</div> ';
        } else if (currentInitPillObj.CarportSensor == "2") {//显示车位
            str += '<div id="div_ParkStateName_2' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">' + currentInitPillObj.ParkStateName + '</div>';
        }
        str += "</div>";
        str += "</div>";
    }
    /*if (ifLock) {
                    //地锁状态
                    str += "<div class='pilldivInfo'>";
                    str += "<div class='redtextdiv_While' style='margin-left:0;margin-bottom: 15px;'>";
                    if (currentInitPillObj.IfLock == "1") {//显示地锁
                        str += '<div id="div_ParkStateName_2' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">' + currentInitPillObj.ParkStateName + '</div> &nbsp;&nbsp;';
                        str += '<div id="div_LockStateName_2' + currentInitPillObj.AutoID + '"   class="lockStuts navbar-toggleColorForGL">' + currentInitPillObj.LockStateName + '</div> ';
                    } else {
                        str += '<div  class="lockStuts navbar-toggleColorForGL " style="background-color: white;"></div> ';
                    }
                    str += "</div>";
                    str += "</div>";
                }//*/
    /**********地锁车位状态样式**********************/

    str += "<div class='" + prefixForBreviary + "pilldivInfo'>";
    str += "<div class='" + prefixForBreviary + "redtextdiv_While' style='margin-left:0'>";
    //终端名称
    var pillName = currentInitPillObj.PillName;
    var chrgingGroup = currentInitPillObj.LCZFZ;//轮充组
    var nameHtml;
    var ctrlName = currentInitPillObj.CtrlName;
    var renderName;
    //根据轮充组判断颜色： 轮充组为空：无色  轮充组%2=1：蓝色（76a2bc） 轮充组%2=0：黄色（9c9a69）
    renderName = pillName + " | " + ctrlName;//显示的名称
    if (chrgingGroup == "" || chrgingGroup == null) {
        nameHtml = '<span class="' + prefixForBreviary + 'nocolor">' + renderName + '</span>';
    } else {
        var int_chrgingGroup = parseInt(chrgingGroup);
        if (int_chrgingGroup % 2 == 1) {
            nameHtml = '<span class="color_blue fontWeightBold">' + renderName + '</span>';
        } else if (int_chrgingGroup % 2 == 0) {
            nameHtml = '<span class="color_yellow fontWeightBold">' + renderName + '</span>';
        }
    }
    str += "<div>" + nameHtml + "</div>";
    str += "</div>";
    str += "</div>";
    var chargingPort = ConvertViewStr(currentInitPillObj.ChargingPort, "ChargingPort");//充电接口
    var chargingPowerText = "额定功率" + ConvertViewStr(currentInitPillObj.ChargingPowerText, "ChargingPowerText");//额定功率
    str += "<div class='" + prefixForBreviary + "pilldivInfo'>";
    str += "<div class='" + prefixForBreviary + "redtextdiv_While' style='margin-left:0'>";
    str += "<div class='" + prefixForBreviary + "nocolor'>" + (chargingPort + " | " + chargingPowerText) + "</div>";
    str += "</div>";
    str += "</div>";

    str += "</div>";//主左Div【结束】

    /************缩略模式详情地锁图片显示-地锁车位状态开始*****************/
    if (ifLock) {
        if (currentInitPillObj.CarportSensor == "1") {//显示地锁
            var display="display:block;";
            if(currentInitPillObj.LockStateName =='地锁离网'){
                display="display:none;";
            }
            str += "<div  flag='lockDivRight' id='div_lock_2" + currentInitPillObj.AutoID + "' style='width: 30%;float: right;"+display+"'>";//主右Div【开始】
            switch (currentInitPillObj.iLockStateCode) {
                //case "0"://地锁升起状态
                case 0://地锁升起状态
                default://故障或离网
                    str += "<div id='div_lockImg_2" + currentInitPillObj.AutoID + "' class='lockImgForRise'></div>";
                    break;
                //case "1"://地锁降下
                case 1://地锁降下
                    str += "<div  id='div_lockImg_2" + currentInitPillObj.AutoID + "'  class='lockImgForDrop'></div>";
                    break;
            }

            str += "</div>";//主右Div【结束】
        }
    }


    /************地锁车位状态事件结束*****************/

    //这个div纯粹是为了增加间隔弄的
    str += "<div class='" + prefixForBreviary + "pilldivInfo' style='height:20px;'/>";


    str += "<div>";
    str = CreateControlObjectForDetails(currentInitPillObj, str, prefixForBreviary);
    str += "</div>";

    str += "</div>";//pzt_ 的结束

    str += "<button class='pilldivButton pilldivSButtonW' style='background:#49A449;display:none;' id='replyCharge_2" + currentInitPillObj.AutoID + "' >";
    str += "<span>";
    str += "<s:text name='开始充电'>开始充电</s:text>";
    str += "</span>";
    str += "</button>";

    str += "<button class='pilldivButton pilldivSButtonW' style='background:#D05353;display:none;' id='endCharge_2" + currentInitPillObj.AutoID + "' >";
    str += "<span>";
    str += "<s:text name='结束充电'>结束充电</s:text>";
    str += "</span>";
    str += "</button>";

    str += "<button class='pilldivButton pilldivSButtonW' style='background:#5396D0;display:none;' disabled='disabled' id='plugGrab_2" + currentInitPillObj.AutoID + "'>";
    str += "<span>";
    str += "<s:text name='请插枪'>请插枪</s:text>";
    str += "</span>";
    str += "</button>";

    str += "<button class='pilldivButton pilldivSButtonW' style='background:#dfb614;display:none;' disabled='disabled' id='baGrab_2" + currentInitPillObj.AutoID + "'>";
    str += "<span>";
    str += "<s:text name='请拔枪'>请拔枪</s:text>";
    str += "</span>";
    str += "</button>";

    str += "<button class='pilldivButton pilldivSButtonW' style='background:#C1C1C1;display:none;' disabled='disabled' id='timeout_2" + currentInitPillObj.AutoID + "'>";
    str += "<span>";
    str += "<s:text name='暂停服务'>暂停服务</s:text>";
    str += "</span>";
    str += "</button>";

    str += "<button class='pilldivButton pilldivSButtonW' style='background:#595959;color:#bababa;display:none;' disabled='disabled' id='canntuse_2" + currentInitPillObj.AutoID + "'>";
    str += "<span>";
    str += "<s:text name='被其他用户控制'>被其他用户控制</s:text>";
    str += "</span>";
    str += "</button>";

    str += "<button class='pilldivButton pilldivSButtonW' style='background:#595959;color:#bababa;display:none;' disabled='disabled' id='setModeStrategy_2" + currentInitPillObj.AutoID + "'>";
    str += "<span>";
    str += "<s:text name='正在设置充电模式' id='textModeStrategy_" + currentInitPillObj.AutoID + "'>正在设置充电模式</s:text>";
    str += "</span>";
    str += "</button>";

    str += "<button class='pilldivButton pilldivSButtonW' style='background:#C1C1C1;display:none;' disabled='disabled' id='loadDispatch_2" + currentInitPillObj.AutoID + "'>";
    str += "<span>";
    str += "<s:text name='等候调度'>等候调度</s:text>";
    str += "</span>";
    str += "</button>";

    str += "</div>";
    str += "</div>";

    return str;
}
//手动刷新
export function GetRealTimeDataForHand() {
    //GetRealTimeData(false);
    GetRealTimeData(true, false);//true代表不重新再轮询
}
//重新计时
export function ReTimer() {
    //记录下当前时间
    Dispatch.curClientTime = new Date();
    RecursiveStartTimer();//60秒重新调一次
}
//获取实时数据
//获取实时数据--判断是否是开始充电和结束充电ChargFlag，如果是不重新计时 ,务必放在第一个参数的位置 liujia
//isNeedShowLoading可以为空
export function GetRealTimeData(ChargFlag,isNeedShowLoading) {

    isOvertimeForOperatingPile();

    //首先验证页面是否存在终端，如果不存在，则不请求数据
    if (!ValidatePageIsExistCtrls()) {
        if (!ChargFlag) {//liujia
            ReTimer();//重新计时
        }
        //NotifyWarning("没有找到终端数据!");
        return;
    }

    Dispatch.ChargGroupPileObject_Arr = new Array();
    Dispatch.ChargGroupPileObject_ArrForOneKeyCharge = new Array();
    if (Dispatch.CtrlAddressMap == "") {
        if (!ChargFlag) {//liujia
            ReTimer();//重新计时
        }
        return;
    }

    SetHandRefreshDisabledStatus(true, isNeedShowLoading);

    ClearJSQuantitySumValue(true);//清空JS变量的值，初始化


    var postData = {
        'CtrlAddressMap': Dispatch.CtrlAddressMap, //集控器地址集合
        'StaID': $("#hideStaId").val(),
        'TraRealTimeData': JSON.stringify(Dispatch.TraRealTimeData), //负荷调度实时数据
        'PageFlag': Dispatch.PageFlag, //页面类型
        'StaName': $("#hideStaName").val(),
        'CustomerID': Dispatch.CustomerID //客户ID
    };
    //请求数据
    //"src/vue/dispitch/test/InitRealTimeDataPillsList.json"
    console.log("InitRealTimeDataPillsList"+"-"+ChargFlag);
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "InitRealTimeDataPillsList", "POST", postData,
        function (result) {
            result = str2json(result);
            SetHandRefreshDisabledStatus(false, isNeedShowLoading);

            if (result.state != "1") {
                if (!ChargFlag) {//liujia
                    ReTimer();//重新计时
                }
                NotifyWarning(result.errmsg);
                return;
            }
            var resGrossPowerData = result.data.GrossPower;
            resGrossPowerData = changeTwoDecimal_f(resGrossPowerData)
            $("#GrossPower").text(resGrossPowerData);//额定总功率
            $("#phone_GrossPower").text(resGrossPowerData);//额定总功率
            CalcGrossPowerProportion();//计算实际功率占额定总功率的比例
            if (result.data.CurTraRTData.length > 0) {
                SetLoadDispatchViewDataRealTime(result.data.CurTraRTData);
            }

            var resListData = result.data.ht_res;//返回的列表数据
            if (resListData != undefined && resListData != null) {

                var currentPillObj = undefined,//当前的终端对象
                    pztArrObj = Dispatch.curPageAllCtrlAutoID_Arr,
                    firstObj = null,
                    id = null;
                GetPageSumValue_Before();//汇总页面状态前夕


                for (var i = 0; i < pztArrObj.length; i++) {
                    id = pztArrObj[i];
                    currentPillObj = resListData["pid_" + id];//当前的终端对象
                    if (firstObj == null && currentPillObj != null) {
                        firstObj = currentPillObj;
                    }
                    SetPageContollerValue(currentPillObj, false);//根据终端对象的值给页面相关控件赋值，这是核心业务 【EditBy shaocx,2015-10-23】
                    GetPageSumValue_Center(currentPillObj.AutoID, currentPillObj.SSZT);//汇总页面状态中夕
                }
                //*/
                GetPageSumValue_End();//汇总页面状态后夕
                ShowHideWarningByStationHighPriceFlag(firstObj);
                SetPageCtrlDiscoverForModeStrategy();//根据设置模式或策略的终端设置页面终端的遮罩禁用

            }
            GetPageCheckdStatusAndShowByCookie();//根据界面上选择的显示和隐藏有关终端

            //再次触发定时器
            if (!ChargFlag) {//liujia
                ReTimer();//重新计时
            }

        }, null, null);
    /*function(excetion){//失败
                ReTimer();//重新计时
            }, null, null,null);*/
}
//开始计时读卡 id:唯一ID标识  card_ChargeFlag：刷卡用于充电还是结束充电标识 （1 刷卡充电 2刷卡结束充电）
export function StartReadCard(id) {
    debugger
    if (dispatch_PayCard.card_ChargeFlag == "2") {//表示是结束充电
        $("#span_pleaseTitle").html("结束充电");
    }
    if (dispatch_PayCard.card_ChargeFlag == "1") {//表示开启充电
        $("#span_pleaseTitle").html("充电");
    }
    $("#hidCtrlAddrPillCan").val(id);
    debugger
    dispatch_PayCard.readCard();
    $("#PleasePayByCardModal").modal("show");
    //dispatch_PayCard.card_IsCounting = true;
    dispatch_PayCard.sendCard_IsCounting(true);

    //dispatch_PayCard.card_CtrlAddress = "";
    dispatch_PayCard.sendCard_CtrlAddress("");

    //dispatch_PayCard.card_CanSN = "";
    dispatch_PayCard.sendCard_CanSN("");

    //dispatch_PayCard.card_CtrlAddress = $("#CtrlAddress_" + id).val();
    var card_CtrlAddress = $("#CtrlAddress_" + id).val();
    dispatch_PayCard.sendCard_CtrlAddress(card_CtrlAddress);

    //dispatch_PayCard.card_CanSN = $("#pillCanSN_" + id).val();
    var card_CanSN = $("#pillCanSN_" + id).val();
    dispatch_PayCard.sendCard_CanSN(card_CanSN);

    dispatch_PayCard.card_startTimer();

}
//开始充电
export function replyCharge(selected) {
    $("#hidCtrlAddrPillCan").val("");
    var id = $(selected).attr("id");
    //var id = "replyCharge_8001-1";//----发布时去掉
    id = id.split("_")[1];
    //武汉公交安卓页面验证
    if (Dispatch.PageFlag == "PowerDispatchingShowForValiReload") {
        debugger
        //dispatchForValiReload.ButtonFlag = "replyCharge_" + id;
        dispatchForValiReload.getButtonFlag("replyCharge_" + id);
        debugger
        if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
            debugger
            dispatchForValiReload.ReloadPageForValiReload();
            return false;
        }
    }
    debugger
    var isPayByCard = false;//是否刷卡充电(true是 false否)
    isPayByCard = IsPayByCard(id);
    Dispatch.curPillCode = "";
    //isPayByCard = true;//模拟刷卡，发布时要去掉【！！！！！！】
    Dispatch.curPillCode = $("#pillCode_" + id).val();//当前充电的终端编号
    if (isPayByCard) {
        debugger
        //dispatch_PayCard.card_ChargeFlag = "1";//表示刷卡充电
        dispatch_PayCard.sendCard_ChargeFlag("1");

        StartReadCard(id);
    } else {
        chargeCommonFun(id, false);
    }
}
//刷卡充电【确定】按钮 【EditBy shaocx,2016-05-14】
export function PayByCardForCharege() {
    var ctrlAddrPillCan = $("#hidCtrlAddrPillCan").val();
    //var ctrlAddrPillCan="8001-1"; //------发布时注释
    chargeCommonFun(ctrlAddrPillCan, true);
}
//充电公共请求方法 ctrlAddrPillCan:集控器ID+'-'+终端Can地址组成的ID isPayByCard:是否刷卡充电(true是 false否)
export function chargeCommonFun(ctrlAddrPillCan, isPayByCard) {
    var chargeUrl = "";
    if (isPayByCard) {//如果是刷卡充电
        SetReplyChargeForStarting(ctrlAddrPillCan);
        //获取选择的代金券id
        dispatch_PayCard.GetCheckedSecurities();
        $("#PayByCardChargeModal").modal('hide');
        //"src/vue/dispitch/test/startChargingForCard.json"
        chargeUrl = ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "startChargingForCard";
        debugger
        var data = {
            "filter": JSON.stringify({
                "CustType": dispatch_PayCard.card_CustType,
                "CompanyId": dispatch_PayCard.card_CompanyId,
                "CustomerId": dispatch_PayCard.card_CustomerId,
                "CtrlAddress": dispatch_PayCard.card_CtrlAddress,
                "CanSN": dispatch_PayCard.card_CanSN,
                //"CtrlAddress":"8001",
                //"CanSN": "1",//发布时去掉
                'IsTestChage': dispatch_PayCard.card_IsTestChage, //是否测试充电
                "UserBalance": dispatch_PayCard.card_UserBalance,
                "UserCredit": dispatch_PayCard.card_UserCredit,
                "VoucherIds": dispatch_PayCard.card_VoucherIds,
                "CouponIds": dispatch_PayCard.card_CouponIds,
                "CardNo": dispatch_PayCard.card_CardNo,
                'StaName': $("#hideStaName").val()
            })
        };
        debugger
        //异步加载
        var timeout = getTimeOut(dispatch_PayCard.card_CanSN);
        add_arr_OperatingPile(ctrlAddrPillCan, timeout);//将id保存到数组里
        getDataAsync(chargeUrl, "POST", data, function (result) {
            result = str2json(result);
            chargeResultOperation(result, ctrlAddrPillCan);
        }, null, null, timeout);
    }
    else {
        var msg = "";
        var statusName = $("#statusName_" + ctrlAddrPillCan).text();
        if (statusName == Dispatch.StatusDic["AlreadyFull"].text) {
            msg = "该终端目前状态为'" + Dispatch.StatusDic["AlreadyFull"].text + "'，确定要给终端【" + $("#pillName_" + ctrlAddrPillCan).text() + "】继续充电吗？";
        } else {
            msg = "确定要给终端【" + $("#pillName_" + ctrlAddrPillCan).text() + "】开始充电吗？";
        }
        //确实要开始充电吗？
        bootbox.setDefaults("locale", "zh_CN");
        bootbox.confirm(msg,
            function (result) {
                if (result) {
                    SetReplyChargeForStarting(ctrlAddrPillCan);
                    //"src/vue/dispitch/test/startCharging.json"
                    chargeUrl = ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "startCharging";
                    var data = {
                        "filter": JSON.stringify({
                            'ctrlAddr': $("#CtrlAddress_" + ctrlAddrPillCan).val(),
                            'canAddress': $("#pillCanSN_" + ctrlAddrPillCan).val(),
                            'CustomerID': Dispatch.CustomerID,
                            'StaName': $("#hideStaName").val(),
                            'SecondSource':Dispatch.PageFlag
                        })
                    };
                    //异步加载--liujia
                    var timeout = getTimeOut($("#pillCanSN_" + ctrlAddrPillCan).val());
                    add_arr_OperatingPile(ctrlAddrPillCan, timeout);//将id保存到数组里
                    getDataAsync(chargeUrl, "POST", data, function (result) {
                        result = str2json(result);
                        chargeResultOperation(result, ctrlAddrPillCan);
                    }, function(){//充电失败的处理
                        remove_arr_OperatingPile(ctrlAddrPillCan);//移除数组里的值
                        GetRealTimeData(true);
                    }, null, timeout);
                    //异步加载
                    // var timeout = getTimeOut($("#pillCanSN_" + ctrlAddrPillCan).val());
                    // add_arr_OperatingPile(ctrlAddrPillCan, timeout);//将id保存到数组里
                    // getDataAsync(chargeUrl, "POST", data, function (result) {
                    //     result = str2json(result);
                    //     chargeResultOperation(result, ctrlAddrPillCan);
                    // }, null, null, timeout);
                }
            });
    }
}
//设置请求超时时间
export function getTimeOut(canAddress) {
    var timeout = 70000;//默认70秒
    if (parseInt(canAddress) >= 181) {
        timeout = timeout + 45000;//再加45秒
    }
    return timeout;
}
//充电结果处理
export function chargeResultOperation(result, ctrlAddrPillCan) {
    remove_arr_OperatingPile(ctrlAddrPillCan);//移除数组里的值 --liujia
    GetRealTimeData(true);
    SetReplyChargeForInit(ctrlAddrPillCan);
    if (result.state != "1") {
        NotifyWarning(result.errmsg);
    }

    // SetReplyChargeForInit(ctrlAddrPillCan);
    // if (result.state == "1") {
    //     GetRealTimeData();
    // }
    // else {
    //     NotifyWarning(result.errmsg);
    // }
}
//人工调度
export function forceReplyCharge(id) {
    //武汉公交安卓页面验证
    if (Dispatch.PageFlag == "PowerDispatchingShowForValiReload") {
        //dispatchForValiReload.ButtonFlag = "forceReplyCharge_" + id;
        dispatchForValiReload.getButtonFlag("forceReplyCharge_" + id);
        if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
            dispatchForValiReload.ReloadPageForValiReload();
            return false;
        }
    }
    var msg = "确定要对终端【" + $("#pillName_" + id).text() + "】进行人工调度充电吗？";
    var oldStatusValue = $("#SSZT_" + id).val();//原先旧的状态值
    //确实要开始充电吗？
    bootbox.setDefaults("locale", "zh_CN");
    bootbox.confirm(msg,
        function (result) {
            if (result) {
                SetReplyChargeByForceReplyCharge(oldStatusValue, id);
                //传递 电站ID和终端can地址
                var postData = {
                    'ctrlAddr': $("#CtrlAddress_" + id).val(),
                    'canAddress': $("#pillCanSN_" + id).val(),
                    'CustomerID': Dispatch.CustomerID,
                    'StaName': $("#hideStaName").val()+"|"+Dispatch.PageFlag,
                };
                var timeout = getTimeOut($("#pillCanSN_" + id).val());
                add_arr_OperatingPile(id, timeout);//将id保存到数组里
                //"src/vue/dispitch/test/ForcingDispatchStartCharge.json"
                getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "ForcingDispatchStartCharge", "POST", postData, function (result) {
                    result = str2json(result);
                    remove_arr_OperatingPile(id);//移除数组里的值

                    GetRealTimeData(true);//true代表充电不创建轮询--liujia
                    if (result.state != "1") {//传递命令成功后，获取该终端的状态数据
                        NotifyWarning(result.errmsg);
                    }
                    SetReplyChargeForInitByForceReplyChargeFail(oldStatusValue, id);
                }, function(){//人工调度失败的处理
                    remove_arr_OperatingPile(id);//移除数组里的值
                    GetRealTimeData(true);
                },  null, timeout);//liujia

                //     vue_this.GetRealTimeData(true);//true代表充电不创建轮询--liujia
                //     if (result.state == "1") {//传递命令成功后，获取该终端的状态数据
                //         GetRealTimeData();
                //     } else {
                //         NotifyWarning(result.errmsg);
                //     }
                //     SetReplyChargeForInitByForceReplyChargeFail(oldStatusValue, id);
                // }, null, null, timeout);
            }
        });
}
//结束充电
export function endCharge(selected) {
    var id = $(selected).attr("id");
    id = id.split("_")[1];
    Dispatch.curAutoID = "";
    Dispatch.curAutoID = id;
    //武汉公交安卓页面验证
    if (Dispatch.PageFlag == "PowerDispatchingShowForValiReload") {
        //dispatchForValiReload.ButtonFlag = "endCharge_" + id;
        dispatchForValiReload.getButtonFlag("endCharge_" + id);
        if (dispatchForValiReload.ValidateIsReloadForValiReload()) {
            dispatchForValiReload.ReloadPageForValiReload();
            return false;
        }
    }
    var isPayByCard = false;//是否刷卡充电(true是 false否)
    isPayByCard = IsPayByCard(id);
    Dispatch.curPillCode = "";
    //isPayByCard = true;//模拟刷卡，发布时要去掉【！！！！！！】
    Dispatch.curPillCode = $("#pillCode_" + id).val();//当前充电的终端编号
    if (isPayByCard) {
        //endChargeCommonFun(id, true);
        //dispatch_PayCard.card_ChargeFlag = "2";//表示刷卡结束充电
        dispatch_PayCard.sendCard_ChargeFlag("2");
        StartReadCard(id);
    } else {
        //确实要结束充电吗？
        bootbox.setDefaults("locale", "zh_CN");
        bootbox.confirm("确定要给终端【" + $("#pillName_" + id).text() + "】结束充电吗？",
            function (result) {
                if (result) {
                    endChargeCommonFun(id, false);
                }
            });
    }
}
//结束充电公共请求方法 id:集控器ID+'-'+终端Can地址组成的ID isPayByCard:是否刷卡充电(true是 false否)
export function endChargeCommonFun(id, isPayByCard) {
    SetEndChargeForEnding(id);
    //移除掉当前终端操作非本人开启，不允许结束充电! 【EditBy shaocx,2016-01-18】
    /*
                 if ($("#custId_" + id).val() != Dispatch.CustomerID) {
                 if ($("#custId_" + id).val() == "" || $("#custId_" + id).val() == "null") {//手动开启应该可以结束

                 } else {//不是自己开启不能结束
                 NotifyWarning("当前终端操作非本人开启，不允许结束充电!");
                 return;
                 }
                 } else {
                 }
                 //*/
    var postData;
    if (isPayByCard) {//刷卡充电
        postData = {
            'ctrlAddr': $("#CtrlAddress_" + id).val(),
            'canAddress': $("#pillCanSN_" + id).val(),
            'cardNo': dispatch_PayCard.card_CardNo,
            'CustomerID': Dispatch.CustomerID,
            'StaName': $("#hideStaName").val()
        };
    } else {
        postData = {
            'ctrlAddr': $("#CtrlAddress_" + id).val(),
            'canAddress': $("#pillCanSN_" + id).val(),
            'cardNo': "",
            'CustomerID': Dispatch.CustomerID,
            'StaName': $("#hideStaName").val()
        };
    }
    var timeout = getTimeOut($("#pillCanSN_" + id).val());
    add_arr_OperatingPile(id, timeout);//将id保存到数组里
    //2、给端口下达结束充电命令 【开始】
    //"src/vue/dispitch/test/endCharge.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "endCharge", "POST", postData, function (result) {
        result = str2json(result);
        remove_arr_OperatingPile(id);//移除数组里的值

        GetRealTimeData(true);//true代表结束充电，不参与重新创建轮询--liujia
        if (result.state == "1") {
            SetEndChargeForInit(id);
            if (isPayByCard) {//如果是刷卡充电，还要弹出来客户的卡信息
                //停留3秒才获取充电详情
                setTimeout(getDataByCardCode(), 3000);
            }
        } else {
            NotifyWarning(result.errmsg);
            SetEndChargeForInit(id);
        }
    }, function(){//结束充电失败的处理
        remove_arr_OperatingPile(id);//移除数组里的值
        GetRealTimeData(true);
    }, null, timeout);//----liujia

    //     if (result.state == "1") {
    //         SetEndChargeForInit(id);
    //         GetRealTimeData();
    //         if (isPayByCard) {//如果是刷卡充电，还要弹出来客户的卡信息
    //             //停留3秒才获取充电详情
    //             setTimeout(getDataByCardCode(), 3000);
    //         }
    //     } else {
    //         NotifyWarning(result.errmsg);
    //         SetEndChargeForInit(id);
    //     }
    // }, null, null, timeout);
}
//刷卡充电结束后获取本次充电详情
export function getDataByCardCode() {
    dispatch_PayCard.LoadDataByCardCode(false);//false代表是本次充电结束
}
//一键充电
export function OneKeyCharge() {
    var alterMsg = "'" + Dispatch.StatusDic["Clink"].text + "'且不支持调度刷卡充电";
    if (Dispatch.OneKeyChargeStatus == "Open" && Dispatch.Arr_AllClinkAutoID.length > 0) {//说明已经点击了 一键充电
        $('#OneKeyChargeModal').modal('show');
        return;
    }
    Dispatch.OneKeyChargeStatus = "NoOpen";
    GetClinkIDArray(false);//false代表非定时一键充电
    if (Dispatch.Arr_AllClinkAutoID.length == 0 || Dispatch.ctrlcanAddrList.length == 0) {
        NotifyWarning("当前没有处于" + alterMsg + "的终端!");
        return;
    }
    var isClickConfirm = false;//是否已经点击了‘确定’按钮，防止重复点击
    var clink_AllCount = Dispatch.Arr_AllClinkAutoID.length.toString();//全部数
    bootbox.setDefaults("locale", "zh_CN");
    bootbox.confirm("确定要给本次" + clink_AllCount + "个" + alterMsg + "的终端进行充电吗？",
        function (result) {
            if (result) {
                if (!isClickConfirm) {
                    isClickConfirm = true;
                } else {
                    return;
                }
                if (Dispatch.IsRefresh) {//状态已刷新,要给出提示并关闭
                    NotifyWarning("页面已刷新，请重新点击一键充电！");
                    //清空数据
                    ClearOneKeyChargeAboutArr();
                    return;
                }
                Dispatch.OneKeyChargeStatus = "Open";//确定开启一键充电
                $("#lbl_Clink_AllCount").html("0");
                $("#lbl_Clink_SuccessCount").html("0");
                $("#lbl_Clink_FailureCount").html("0");
                $("#lbl_Clink_Starting").html("0");
                //$("#handOneKeyCharge").css("background", "url(/Content/img/tps/loading.gif) no-repeat center");
                $("#handOneKeyCharge").text("一键充电中...");
                for (var i = 0; i < Dispatch.Arr_AllClinkAutoID.length; i++) {
                    SetReplyChargeForStarting(Dispatch.Arr_AllClinkAutoID[i]);//将这些终端的【正在充电】按钮改为【正在开启...】
                    $("#replyCharge_" + Dispatch.Arr_AllClinkAutoID[i]).css("display", "block");//【开始充电】
                    $("#plugGrab_" + Dispatch.Arr_AllClinkAutoID[i]).css("display", "none");//【请插枪】
                }
                var postData = {
                    'CustomerID': Dispatch.CustomerID,
                    'ctrlcanAddrList': JSON.stringify(Dispatch.ctrlcanAddrList),
                    'clink_AllCount': clink_AllCount.toString(),
                    'StaName': $("#hideStaName").val()+"|"+Dispatch.PageFlag,
                };
                //发送充电命令
                //"src/vue/dispitch/test/oneHandcharge.json"
                getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "OneKeyCharge", "POST", postData, function (result) {
                    result = str2json(result);
                    if (result.state == "1") {//发送命令成功
                        //显示层
                        $('#lbl_Clink_AllCount').html(clink_AllCount.toString());
                        $('#OneKeyChargeModal').modal('show');
                        Dispatch.IsClickOneKeyCharge = true;//是否点击了一键充电，如果点击了，则延迟60秒刷新页面
                    }
                    else {
                        //清空数据
                        ClearOneKeyChargeAboutArr();
                        NotifyWarning(result.errmsg);
                    }
                }, null, null);
            } else {
                //清空数据
                ClearOneKeyChargeAboutArr();
                return;
            }
        });
}
//为充电详情界面赋值  显示充电详情 myModalLabelTitle:标题 data：维护数据 isShow：是否弹出详情页
export function SetDataForViewChargeDetail(myModalLabelTitle, data, isShow) {
    debugger
    ClearDataForViewChargeDetail();
    $("#title_chargeDetailModal").html(myModalLabelTitle);
    dispatch_PayCard.ShowDIYModal($("#chargeDetailModal"));
    if (data == undefined || data == null) {
        return;
    }
    var countFee = ((parseFloat(data.SCTaxInFee_Str) * 1000 + parseFloat(data.ECTaxInFee_Str) * 1000) / 1000).toString();
    var Fee = data.ECTaxInFee_Str.toString() + "(电费)+" + data.SCTaxInFee_Str.toString() + "(服务费)=" + changeTwoDecimal_f(countFee);
    $("#BeginTime").html('开始时间：' + data.BeginTime_Str);
    $("#EndTime").html('结束时间：' + data.EndTime_Str);
    $("#Power").html('总电量(度)：' + data.Power_Str);
    $("#ECTaxInFee").html('充电费用(元)：' + Fee);
    var custNameTitle = "";
    if (data.CustName != null) {
        custNameTitle = data.CustName;
    }
    $("#CustName").html('充电人：' + custNameTitle);
    var list = data.ChargeBillDetailList;//充电分录列表
    if (list != null) {
        var str = '',
            jsonObj = null;
        for (var i = 0; i < list.length; i++) {
            jsonObj = list[i];
            str += " <tr role='row'>";
            str += " <td  class='text-center' data-field='cssClass:text-center,hasTitle:true'>" + jsonObj.TimeRange + "</td>";
            str += " <td  class='text-center' data-field='cssClass:text-center'>" + jsonObj.EcTaxInPrice_Str + "</td>";
            str += " <td  class='text-center' data-field='cssClass:text-center'>" + jsonObj.ScTaxInPrice_Str + "</td>";
            str += "<td  class='text-center' data-field='cssClass:text-center,hasTitle:true'>  " + jsonObj.Power_Str + " </td>";
            str += "</tr>";
        }
        $("#chargeTable tbody").html(str);
    }
}
//清空充电详情里的数据
export function ClearDataForViewChargeDetail() {
    $("#BeginTime").html('开始时间：');
    $("#EndTime").html('结束时间：');
    $("#Power").html('总电量(度)：');
    $("#ECTaxInFee").html('充电费用(元)：');
    $("#CustName").html('充电人：');
    $("#chargeTable tbody").html('');
    $("#title_chargeDetailModal").html('');
}
//根据获取的值显示充电模式和群充策略
export function GetChargeModeStrategyStr(obj) {
    var strObj = new Object();
    strObj.Flag = "2";//标识，0群充 1轮充 2无
    strObj.ChargingModeName = "";
    strObj.ChargeStrategyName = "";
    if (obj.ChargingMode != null && obj.ChargingMode.toString() == Dispatch.ChargeModeDic["ChargGroup"]) {//群充模式
        strObj.ChargingModeName = "群充";
        strObj.Flag = "0";
        switch (obj.ChargeStrategy) {
            case "1":
                strObj.ChargeStrategyName = "A策略";
                break;
            case "2":
                strObj.ChargeStrategyName = "B策略";
                break;
            case "3":
                strObj.ChargeStrategyName = "C策略";
                break;
            case "0":
            default:
                strObj.ChargeStrategyName = "未知策略";
                break;
        }
    } else if (obj.ChargingMode != null && obj.ChargingMode.toString() == Dispatch.ChargeModeDic["RoundFilling"]) {//轮充模式
        strObj.Flag = "1";
        strObj.ChargingModeName = "轮充";
        strObj.ChargeStrategyName = "";
    }
    return strObj;
}
/*充电模式、群充策略【开始】*/
//根据电站ID获取集控器列表
export function GetCtrlsByStaIDForModelStrategy() {

    if ($("#hideStaId").val() == "" || $("#hideStaId").val() == "undefined") {
        $("#hideStaId").val("");
        return;
    }
    $("#CtrlModel").html("");
    $("#ddlCtrlModel").html('集控器<span class="caret"></span>');//当前选中的值
    var postData = {
        'filter': JSON.stringify({
            'StaID': $("#hideStaId").val()
        })
    };
    //"src/vue/dispitch/test/staBindctr.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetCtrlListByStaSysAC", "POST", postData, function (result) {
        result = str2json(result);
        if (result.state != "1") {
            NotifyWarning(result.errmsg);
            return;
        }
        var rowCount = result.data.CtrlList.length;
        var ctrlData = result.data.CtrlList;
        var strModel = "";
        strModel += "  <li><a href='javascript:void(0)' style='height:20px;' ctrlAddr='" + result.data.CtrlAddressMap + "'value='' ></a></li>";
        for (var i = 0; i < rowCount; i++) {
            strModel += ' <li><a href="javascript:void(0)"  value="' + ctrlData[i].ID + '" ctrlAddr="' + ctrlData[i].Code + '">' + ctrlData[i].Name + '</a></li>';
        }

        $("#CtrlModel").html(strModel);
        //自己新加，以上两行的click事件
        $("#CtrlModel li a").bind("click", function (event) {
            var obj = event.target;
            SearchChargeGroupDataByCtrl(obj);
        });
    }, null, null);

}
/* 群充、轮充设置 开始*/
export function RadioChange(value) {
    if (value == "ChargGroup") {//群充
        $("#Strategy_A").removeAttr("disabled");
        $("#Strategy_B").removeAttr("disabled");
        $("#Strategy_C").removeAttr("disabled");
        Dispatch.chargeMode = Dispatch.ChargeModeDic["ChargGroup"];
        Dispatch.chargeModeName = "群充模式";
    } else {//轮充
        $("#Strategy_A").attr("disabled", "disabled");
        $("#Strategy_B").attr("disabled", "disabled");
        $("#Strategy_C").attr("disabled", "disabled");
        Dispatch.chargeMode = Dispatch.ChargeModeDic["RoundFilling"];
        Dispatch.chargeModeName = "轮充模式";
    }
}
//设置三个策略的选中状态
export function SetStrategyCheckbox(value) {
    switch (value) {
        case "Strategy_A":
            $("#Strategy_B").prop("checked", false);
            $("#Strategy_C").prop("checked", false);
            Dispatch.chargeStrategy = "1";
            Dispatch.chargeStrategyName = "策略A";
            break;
        case "Strategy_B":
            $("#Strategy_A").prop("checked", false);
            $("#Strategy_C").prop("checked", false);
            Dispatch.chargeStrategy = "2";
            Dispatch.chargeStrategyName = "策略B";
            break;
        case "Strategy_C":
            $("#Strategy_B").prop("checked", false);
            $("#Strategy_A").prop("checked", false);
            Dispatch.chargeStrategy = "3";
            Dispatch.chargeStrategyName = "策略C";
            break;
    }
}
//【选择集控器】根据集控器查询群充组下拉列表
export function SearchChargeGroupDataByCtrl(selected) {
    var ctrlID = $(selected).attr("value");
    if (ctrlID == "") {
        InitDataForChargeModeStrategy("selectEmptyCtrl");
        return;
    }
    else {
        $("#ddlCtrlModel").html($(selected).text() + '<span class="caret"></span>');//当前选中的值
        InitDataForChargeModeStrategy("selectValueCtrl");

    }
    $("#hid_CtrlModel").val(ctrlID);
    var postData = {
        'CtrlID': ctrlID
    };
    //"src/vue/dispitch/test/GetChargeGroupDataByCtrl.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetChargeGroupDataByCtrl", "POST", postData, function (result) {
        result = str2json(result);
        var html = $("#toast-container");
        if (result.state == "1") {
            if (html != undefined) {
                $(html).remove();
            }
            var resData = result.data;
            var str_dcPiles = "";
            for (var i = 0; i < resData.length; i++) {
                str_dcPiles += ' <li><a href="javascript:void(0)" value="' + resData[i].GroupCharge + '" ctrlID="' + ctrlID + '">' + resData[i].GroupCharge + '</a></li>';
            }
            $("#DCPile").html(str_dcPiles);
            //自己加的（上方拼接字符串的含参方法的调用）（拼接字符串事件的引用）
            $("#DCPile li a").bind("click", function (event) {
                var obj = event.target;
                GetPilesDataByChargeGroup(obj);
            });
        }
        else {
            if (html != undefined) {
                $(html).remove();
            }
            NotifyWarning(result.errmsg);
        }

    }, null, null);
}
//【选择群充组】根据群充组和集控器ID获取该群充组下的所有终端数据
export function GetPilesDataByChargeGroup(selected) {
    if ($(selected).text() == "") {
        InitDataForChargeModeStrategy("selectEmptyChargeGroup");

    } else {
        $("#ddlDCPile").html($(selected).text() + '<span class="caret"></span>');//当前选中的值
        InitDataForChargeModeStrategy("selectValueChargeGroup");
    }

    var selId = $(selected).attr("value");
    var ctrlID = $(selected).attr("ctrlID");
    $("#hid_DCPile").val(selId);
    var filter = {
        "filter": JSON.stringify({
            'CtrlID': ctrlID,
            'GroupCharge': selId,
            "ChargingModeStrategy": Dispatch.curChargeModeOrChargeStrategy
        })
    };
    //发送充电命令
    //"src/vue/dispitch/test/GetPilesDataByChargeGroup.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetPilesDataByChargeGroup", "POST", filter, function (result) {
        result = str2json(result);
        var html = $("#toast-container");
        if (result.state == "1") {
            if (html != undefined) {
                $(html).remove();
            }
            var resData = result.data;
            if (resData.errMsg != undefined) {//错误
                Dispatch.errMsg_ModeStrategy = resData.errMsg;
                NotifyWarning(resData.errMsg);
                return;
            }

            if (Dispatch.ChargeModeOrChargeStrategyDic["ChargeMode"] == Dispatch.curChargeModeOrChargeStrategy) {//充电模式
                //获取当前模式为群充还是轮充
                if (resData.ChargingMode != undefined) {
                    var chargingMode = resData.ChargingMode;
                    Dispatch.curChargeMode = chargingMode;
                    Dispatch.curChargeModeName = resData.ChargingModeName;
                    if (chargingMode == Dispatch.ChargeModeDic["RoundFilling"]) {//轮充
                        $("#RoundFilling").prop("checked", true);
                        RadioChange('RoundFilling')
                    } else if (chargingMode == Dispatch.ChargeModeDic["ChargGroup"]) {//群充
                        $("#ChargGroup").prop("checked", true);
                        RadioChange('ChargGroup');
                    }
                    Dispatch.allCtrlcanAddrStr = resData.CtrlAddressAndPileCanSN;
                    Dispatch.allCtrlcanAddrCount = resData.CtrlAddressAndPileCanSNCount;
                    Dispatch.CtrlcanAddrStr_ChargGroup = resData.CtrlcanAddrStr_ChargGroup;
                    Dispatch.CtrlcanAddrStr_RoundFilling = resData.CtrlcanAddrStr_RoundFilling;
                    Dispatch.CtrlcanAddrStr_ChargGroupAutoID = resData.CtrlcanAddrStr_ChargGroupAutoID;
                    Dispatch.CtrlcanAddrStr_ChargGroupCount = resData.CtrlcanAddrStr_ChargGroupCount;
                    Dispatch.CtrlcanAddrStr_RoundFillingCount = resData.CtrlcanAddrStr_RoundFillingCount;
                }
            } else {
                //获取当前模式为群充还是轮充
                if (resData.ChargeStrategy != undefined) {
                    var chargeStrategy = resData.ChargeStrategy;
                    Dispatch.curChargeStrategy = chargeStrategy;
                    Dispatch.curChargeStrategyName = resData.ChargeStrategyName;
                    switch (chargeStrategy) {
                        case "0":
                            break;
                        case "1"://A策略
                            $("#Strategy_A").prop("checked", true);
                            $("#Strategy_B").prop("checked", false);
                            $("#Strategy_C").prop("checked", false);
                            SetStrategyCheckbox('Strategy_A');
                            break;
                        case "2"://B策略
                            $("#Strategy_A").prop("checked", false);
                            $("#Strategy_B").prop("checked", true);
                            $("#Strategy_C").prop("checked", false);
                            Dispatch.SetStrategyCheckbox('Strategy_B');
                            break;
                        case "3"://C策略
                            $("#Strategy_B").prop("checked", false);
                            $("#Strategy_A").prop("checked", false);
                            $("#Strategy_C").prop("checked", true);
                            SetStrategyCheckbox('Strategy_C');
                            break;
                    }
                    Dispatch.allCtrlcanAddrStr = resData.CtrlAddressAndPileCanSN;
                    Dispatch.allCtrlcanAddrCount = resData.CtrlAddressAndPileCanSNCount;
                    Dispatch.CtrlcanAddrStr_ChargGroup = resData.CtrlcanAddrStr_ChargGroup;
                    Dispatch.CtrlcanAddrStr_RoundFilling = resData.CtrlcanAddrStr_RoundFilling;
                    Dispatch.CtrlcanAddrStr_ChargGroupAutoID = resData.CtrlcanAddrStr_ChargGroupAutoID;
                    Dispatch.CtrlcanAddrStr_ChargGroupCount = resData.CtrlcanAddrStr_ChargGroupCount;
                    Dispatch.CtrlcanAddrStr_RoundFillingCount = resData.CtrlcanAddrStr_RoundFillingCount;
                }
            }

        }
        else {
            if (html != undefined) {
                $(html).remove();
            }
            NotifyWarning(result.errmsg);
        }
    }, null, null);
}
//保存按钮
export function SaveChargeModelStrategySet() {


    if (!ValidateForChargeModelStrategy()) {//验证
        return;
    }
    //*/
    if (Dispatch.ChargeModeOrChargeStrategyDic["ChargeMode"] == Dispatch.curChargeModeOrChargeStrategy) {//充电模式
        SaveChargeModeSet();
    } else if (Dispatch.ChargeModeOrChargeStrategyDic["ChargeStrategy"] == Dispatch.curChargeModeOrChargeStrategy) {
        SaveChargeStrategySet();
    } else {
        NotifyWarning("无法判断设置充电模式还是群充策略");
        return;
    }
}
//保存之前的验证
export function ValidateForChargeModelStrategy() {
    if ($("#hid_CtrlModel").val() == "") {
        NotifyWarning("请选择集控器!");
        return false;
    }
    if ($("#hid_DCPile").val() == "") {
        NotifyWarning("请选择群充组!");
        return false;
    }
    if (Dispatch.errMsg_ModeStrategy != "") {
        NotifyWarning(Dispatch.errMsg_ModeStrategy);
        return false;
    }

    if (Dispatch.ChargeModeOrChargeStrategyDic["ChargeMode"] == Dispatch.curChargeModeOrChargeStrategy) {//充电模式
        if (Dispatch.chargeMode == "") {
            NotifyWarning("请选择充电模式!");
            return false;
        }

        if (Dispatch.chargeMode == Dispatch.curChargeMode) {
            NotifyWarning("当前该群充组下的充电模式已经是" + Dispatch.curChargeModeName + "!");
            return false;
        }

    } else if (Dispatch.ChargeModeOrChargeStrategyDic["ChargeStrategy"] == Dispatch.curChargeModeOrChargeStrategy) {//群充策略
        if (Dispatch.chargeStrategy == "") {
            NotifyWarning("请选择群充策略!");
            return false;
        }
        if (Dispatch.chargeStrategy == Dispatch.curChargeStrategy) {
            NotifyWarning("当前该群充组下的群充策略已经是" + Dispatch.curChargeStrategyName + "!");
            return false;
        }
    } else {
        NotifyWarning("无法判断设置充电模式还是群充策略");
        return false;
    }
    if (Dispatch.allCtrlcanAddrStr == undefined || Dispatch.allCtrlcanAddrStr == "") {
        NotifyWarning("获取群充组下的终端为空，请检查!");
        return false;
    }
    return true;
}
//保存群充、轮充设置
export function SaveChargeModeSet() {
    bootbox.setDefaults("locale", "zh_CN");
    bootbox.confirm("确定要将充电模式修改为【" + Dispatch.chargeModeName + "】吗？",
        function (result) {
            if (result) {
                var btn = $("#btnSaveChargeModelStrategySet").button('loading');
                //判断选择的是群充还是轮充
                var chargeMode = Dispatch.chargeMode;
                var ctrlAddressAndCanSN = "";
                if (chargeMode == Dispatch.ChargeModeDic["ChargGroup"]) {//群充
                    ctrlAddressAndCanSN = Dispatch.CtrlcanAddrStr_ChargGroup;
                } else {//轮充
                    ctrlAddressAndCanSN = Dispatch.CtrlcanAddrStr_RoundFilling;
                }
                var postData = {
                    'CtrlAddressAndCanSN': ctrlAddressAndCanSN,
                    'Mode': Dispatch.chargeMode
                }
                //"src/vue/dispitch/test/SaveChargeModeSet.json"
                getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "SaveChargeModeSet", "POST", postData, function (result) {
                    result = str2json(result);
                    var html = $("#toast-container");
                    if (result.state == "1") {
                        if (html != undefined) {
                            $(html).remove();
                        }
                        ShowChargeModeMessageModal();
                    }
                    else {
                        if (html != undefined) {
                            $(html).remove();
                        }
                        NotifyWarning(result.errmsg);
                    }
                    btn.button('reset');
                }, null, null);

            } else {
                return;
            }
        });
}
//保存群充策略设置
export function SaveChargeStrategySet() {
    bootbox.setDefaults("locale", "zh_CN");
    bootbox.confirm("确定要将群充策略修改为【" + Dispatch.chargeStrategyName + "】吗？",
        function (result) {
            if (result) {
                //判断选择的是群充还是轮充
                var chargeMode = Dispatch.chargeMode;
                var ctrlAddressAndCanSN = "";
                if (chargeMode == Dispatch.ChargeModeDic["ChargGroup"]) {//群充
                    ctrlAddressAndCanSN = Dispatch.CtrlcanAddrStr_ChargGroup;
                } else {//轮充
                    ctrlAddressAndCanSN = Dispatch.CtrlcanAddrStr_RoundFilling;
                }
                var postData = {
                    'CtrlAddressAndCanSN': ctrlAddressAndCanSN,
                    'Strategy': Dispatch.chargeStrategy
                }
                //"src/vue/dispitch/test/SaveChargeStrategy.json"
                getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "SaveChargeStrategy", "POST", postData, function (result) {
                    result = str2json(result);
                    var html = $("#toast-container");
                    if (result.state == "1") {
                        if (html != undefined) {
                            $(html).remove();
                        }
                        ShowChargeModeMessageModal();
                    }
                    else {
                        if (html != undefined) {
                            $(html).remove();
                        }
                        NotifyWarning(result.errmsg);
                    }
                }, null, null);

            } else {
                return;
            }
        });
}
//显示充电模式或群充策略的消息框
export function ShowChargeModeMessageModal() {
    switch (Dispatch.curChargeModeOrChargeStrategy) {
        case Dispatch.ChargeModeOrChargeStrategyDic["ChargeMode"]:
            $("#chargeModeMessageLabel").html("设置充电模式为【" + Dispatch.chargeModeName + "】详情");
            switch (Dispatch.chargeMode) {
                case Dispatch.ChargeModeDic["ChargGroup"]://设置的是群充模式
                    $("#lbl_td_AllCount").html(Dispatch.CtrlcanAddrStr_ChargGroupCount);//注意：群充策略使用的字符串跟群充模式的一样
                    $("#lbl_td_Starting").html(Dispatch.CtrlcanAddrStr_ChargGroupCount);//注意：群充策略使用的字符串跟群充模式的一样
                    break;
                case Dispatch.ChargeModeDic["RoundFilling"]:
                    $("#lbl_td_AllCount").html(Dispatch.CtrlcanAddrStr_RoundFillingCount);
                    $("#lbl_td_Starting").html(Dispatch.CtrlcanAddrStr_RoundFillingCount);
                    break;
                default:
                    NotifyWarning("无法判断设置的充电模式");
                    return false;
            }
            break;
        case Dispatch.ChargeModeOrChargeStrategyDic["ChargeStrategy"]:
            $("#lbl_td_AllCount").html(Dispatch.CtrlcanAddrStr_ChargGroupCount);//注意：群充策略使用的字符串跟群充模式的一样
            $("#lbl_td_Starting").html(Dispatch.CtrlcanAddrStr_ChargGroupCount);//注意：群充策略使用的字符串跟群充模式的一样
            $("#chargeModeMessageLabel").html("设置群充策略为【" + Dispatch.chargeStrategyName + "】详情");
            break;
        default:
            NotifyWarning("无法判断设置充电模式还是群充策略");
            return false;
    }

    $("#SetChargeModeModal").modal('hide');

    //初始化数据 【EditBy shaocx,2016-12-29】
    $("#lbl_td_SuccessCount").html("0");
    $("#lbl_td_FailureCount").html("0");

    $("#SetChargeModeMessageModal").modal('show');//显示模态窗口
    Dispatch.IsSetFinished = false;
    setTimeout(GetChargeModeStrategyAboutCount, Dispatch.RoundTimeForChargeModeOrChargeStrategy);//10秒一次
}
//获取设置充电模式或群充策略的成功数、失败数和启动中数
export function GetChargeModeStrategyAboutCount() {
    var ctrlAddressAndCanSNStr = "";
    switch (Dispatch.curChargeModeOrChargeStrategy) {
        case Dispatch.ChargeModeOrChargeStrategyDic["ChargeMode"]:
            switch (Dispatch.chargeMode) {
                case Dispatch.ChargeModeDic["ChargGroup"]://设置的是群充模式
                    ctrlAddressAndCanSNStr = Dispatch.CtrlcanAddrStr_ChargGroup;//注意：群充策略使用的字符串跟群充模式的一样
                    break;
                case Dispatch.ChargeModeDic["RoundFilling"]:
                    ctrlAddressAndCanSNStr = Dispatch.CtrlcanAddrStr_RoundFilling;
                    break;
                default:
                    NotifyWarning("无法判断设置的充电模式");
                    return false;
            }
            break;
        case Dispatch.ChargeModeOrChargeStrategyDic["ChargeStrategy"]:
            ctrlAddressAndCanSNStr = Dispatch.CtrlcanAddrStr_ChargGroup;//注意：群充策略使用的字符串跟群充模式的一样
            break;
        default:
            NotifyWarning("无法判断设置充电模式还是群充策略");
            return false;
    }

    var filter = {
        "filter": JSON.stringify({
            'CtrlAddressAndCanSN': ctrlAddressAndCanSNStr,
            "IsTimeOut": Dispatch.IsTimeOutForChargeModeOrChargeStrategy,
            "ChargingModeStrategy": Dispatch.curChargeModeOrChargeStrategy
        })
    };
    //"src/vue/dispitch/test/GetRealTimeForChargeModeOrStrategy.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetRealTimeForChargeModeOrStrategy", "post", filter, function (result) {
        result = str2json(result);
        Dispatch.NowTimeOutForChargeModeOrChargeStrategy = Dispatch.NowTimeOutForChargeModeOrChargeStrategy + Dispatch.RoundTimeForChargeModeOrChargeStrategy;//轮询一次
        if (Dispatch.NowTimeOutForChargeModeOrChargeStrategy >= Dispatch.TimeOutForChargeModeOrChargeStrategy) {//已经超时
            Dispatch.IsTimeOutForChargeModeOrChargeStrategy = "1";
        }
        if (result.state == "1") {
            var resData = result.data;//返回的数据对象
            var successNum = result.data.successnum;
            var failureNum = result.data.failurenum;
            $("#lbl_td_AllCount").html(result.data.countnum.toString());
            $("#lbl_td_SuccessCount").html(successNum);
            $("#lbl_td_FailureCount").html(failureNum);
            var staring = (parseInt(result.data.countnum) * 100 - parseInt(successNum) * 100 - parseInt(failureNum) * 100) / 100;
            $("#lbl_td_Starting").html(staring.toString());
            //hasSuccessCtrlAddressPileCanSN = result.data.hasSuccessCtrlAddressPileCanSN;
            var FinishFlag = result.data.FinishFlag;//进度是否完成标识
            if (FinishFlag == "1") {//表示进度完成
                InitDataForChargeModeStrategy("hide");
            } else {//继续轮询
                setTimeout(GetChargeModeStrategyAboutCount, Dispatch.RoundTimeForChargeModeOrChargeStrategy);//10秒一次
            }
            if (Dispatch.curChargeModeOrChargeStrategy == Dispatch.ChargeModeOrChargeStrategyDic["ChargeMode"]) {//说明是设置充电模式

            } else if (Dispatch.curChargeModeOrChargeStrategy == Dispatch.ChargeModeOrChargeStrategyDic["ChargeStrategy"]) {//说明设置的是群充策略

            } else {
                NotifyWarning("无法判断设置充电模式还是群充策略");
                return;
            }
        } else {
            NotifyError(result.errmsg);
        }
    });
}
//根据设置模式或策略的终端设置页面终端的遮罩禁用
export function SetPageCtrlDiscoverForModeStrategy() {
    if (!Dispatch.IsSetFinished) {
        //最后判断页面是否正在设置充电模式或群充策略，如果有，则处理
        var str = "";
        var txtStr = "正在设置";
        switch (Dispatch.curChargeModeOrChargeStrategy) {
            case Dispatch.ChargeModeOrChargeStrategyDic["ChargeMode"]:
                switch (Dispatch.chargeMode) {
                    case Dispatch.ChargeModeDic["ChargGroup"]://设置群充模式时，除了前四个终端，其他都不可用。
                        str = Dispatch.CtrlcanAddrStr_ChargGroupAutoID;
                        break;
                    case Dispatch.ChargeModeDic["RoundFilling"]:
                        //设置轮充模式时，所有的终端都可用。
                        break;
                    default:
                        NotifyWarning("无法判断设置的充电模式");
                        break;
                }
                break;
            case Dispatch.ChargeModeOrChargeStrategyDic["ChargeStrategy"]:
                str = Dispatch.CtrlcanAddrStr_ChargGroupAutoID;
                break;
            default:
                NotifyWarning("无法判断设置充电模式还是群充策略");
                break;
        }

        if (str != "") {
            var arry = str.split(',');
            var id = "";
            for (var i = 0; i < arry.length; i++) {
                id = arry[i];
                if (Dispatch.curPageAllCtrlAutoID_Json[id] != undefined) {//禁用操作
                    $("#modeStrategyCover_" + id).css("display", "block");
                    $("#textModeStrategy_" + id).html(txtStr);
                    $("#textModeStrategy_" + id).attr("value", txtStr);

                    SetStatusButtonIsDisplay("setModeStrategy_", id);//显示【正在设置充电模式】
                }
            }
        }
    }
    //注释掉，这里应该会是轮询中处理
    /*
                 else {
                 var id = "";
                 for (var i = 0; i < Dispatch.curPageAllCtrlAutoID_Arr.length; i++) {
                 id = Dispatch.curPageAllCtrlAutoID_Arr[i];
                 $("#setModeStrategy_" + id).css("display", "none");
                 $("#modeStrategyCover_" + id).css("display", "none");
                 $("#textModeStrategy_" + id).html("");
                 $("#textModeStrategy_" + id).attr("value", "");
                 }
                 }
                 //*/
}
/*充电模式、群充策略【结束*/
//根据终端对象的值给页面相关控件赋值，这是核心业务 【EditBy shaocx,2015-10-23】
//currentPillObj:当前循环的终端对象 isFirst：是否第一次加载
export function SetPageContollerValue(currentPillObj, isFirst) {
    if (currentPillObj != undefined) {
        var id = currentPillObj.AutoID;//我自己生成的终端ID，有集控器ID和终端ID组成,格式"集控器ID-终端ID"
        if (!isFirst) {//非第一次加载
            for (var i = 0; i < arr_OperatingPile.length; i++) {
                if (arr_OperatingPile[i].ID == id) {//说明他正在操作中，就不要改变页面的值
                    return;//退出函数
                }
            }
        }
        //判断充电模式和群充策略,这个地方第一次加载和非第一次加载都需要重新赋值 【EditBy shaocx,2014-12-08】
        var modelStrategyObj = GetChargeModeStrategyStr(currentPillObj);
        switch (modelStrategyObj.Flag) {
            case "0"://群充
                if (modelStrategyObj.ChargingModeName != null)
                    SetTextValueForControl("ChargingMode", id, currentPillObj.ChargingMode);
                if (modelStrategyObj.ChargeStrategyName != null)
                    SetTextValueForControl("ChargeStrategy", id, currentPillObj.ChargeStrategy);
                break;
            case "1"://轮充
                if (modelStrategyObj.ChargingModeName != null)
                    SetTextValueForControl("ChargingMode", id, currentPillObj.ChargingMode);
                break;
            case "2"://无
                break;
        }
        //状态为正在服务的时候，获取的电量为充电订单中的电量 【EditBy shaocx,2015-08-15】
        $("#SSZT_" + id).val(currentPillObj.SSZT);//终端状态赋值
        //$("#custId_" + id).val(currentPillObj.CustID);//客户ID //客户id无用，注释 【EditBy shaocx,2017-12-13】
        var curState = currentPillObj.SSZT;//获取控件上的最新的终端状态值
        if (isFirst) {//只有第一次加载
        } else {//非第一次加载
            /*****************************************【非第一次加载】开始********************************************************/

            //地锁显示
            //判断地锁是否在操作中
            Dispatch.isExistOperationLock = false;
            if (arr_pileForLock.length > 0 && arr_pileForLock.toString().indexOf(id) > -1) {
                Dispatch.isExistOperationLock = true;
            }

            if (!Dispatch.isExistOperationLock) {
                if (IsDetailsModel()) {//详情模式
                    controlLockStatusView(id, currentPillObj);
                } else {
                    controlLockStatusViewForAbbreviationsModel(id, currentPillObj);
                }
            }
            //*/


            //充电时长【EditBy shaocx,2016-12-02】
            SetTextValueForControl("CDSC", id, currentPillObj.CDSC);

            //单双枪模式
            SetTextValueForControl("DSQMS", id, currentPillObj.DSQMS);
            //是否主枪
            SetTextValueForControl("SFZQ", id, currentPillObj.SFZQ);
            //限制电流
            SetTextValueForControl("XZDL", id, currentPillObj.XZDL);
            //限制功率
            SetTextValueForControl("XZGL", id, currentPillObj.XZGL);

            //需求功率
            SetTextValueForControl("DemandPowerText", id, currentPillObj.DemandPowerText);
            //需求电流 【EditBy shaocx,2065-09-01】
            SetTextValueForControl("XQDL", id, currentPillObj.XQDL);
            SetTextValueForControl("CX", id, currentPillObj.CX);//车型
            SetTextValueForControl("QSSOC", id, currentPillObj.QSSOC);//初始SOC
            SetTextValueForControl("CarCode", id, currentPillObj.CarCode);//车辆自编号

            SetTextValueForControl("FullPower", id, currentPillObj.FullPower);//车辆额定电量
            SetTextValueForControl("DQSOC", id, currentPillObj.DQSOC);//当前SOC
            SetTextValueForControl("CPH", id, currentPillObj.CPH);//车牌号
            //重试次数 【EditBy shaocx,2015-09-19】
            SetTextValueForControl("CSCS", id, currentPillObj.CSCS);
            //电压
            SetTextValueForControl("DY", id, currentPillObj.DY);
            //电流
            SetTextValueForControl("DL", id, currentPillObj.DL);
            //功率
            SetTextValueForControl("SJGL", id, currentPillObj.SJGL);
            //辅源 【EditBy shaocx,2015-11-12】
            SetTextValueForControl("FZDY", id, currentPillObj.FZDY);
            SetTextValueForControl("CDSYSJ", id, currentPillObj.CDSYSJ);//预计剩余时间
            SetTextValueForControl("YCQSJ", id, currentPillObj.YCQSJ);//插枪时间
            SetTextValueForControl("PDSJ", id, currentPillObj.PDSJ);//排队时间

            SetTextValueForControl("CDZSJ", id, currentPillObj.CDZSJ);//充电时间
            SetTextValueForControl("YCMSJ", id, currentPillObj.YCMSJ);//充满时间
            //*/

            if (curState == Dispatch.StatusDic["AlreadyFull"].value ||
                curState == Dispatch.StatusDic["Pause"].value ||
                curState == Dispatch.StatusDic["Using"].value ||
                curState == Dispatch.StatusDic["TrickleCharge"].value
            ) {//【正在服务】
                //电量
                SetTextValueForControl("Power", id, currentPillObj.DLZL);

            } else {
                //电量
                SetTextValueForControl("Power", id, currentPillObj.Power);
            }

            //只有不是第一次加载的时候，才会处于 一键充电的问题
            if (Dispatch.OneKeyChargeStatus == "Open" && Dispatch.Arr_AllClinkAutoID.length > 0) {//只有 数组个数大于0的时候，才说明正在进行一键充电，然后处理业务

                if (Dispatch.Json_AllClinkAutoID[id] != undefined) {//说明此id在JSON字符串中
                    switch (curState) {
                        case Dispatch.StatusDic["Pause"].value://暂停
                        case Dispatch.StatusDic["Using"].value://充电中
                        case Dispatch.StatusDic["TrickleCharge"].value://涓流充
                            if (currentPillObj.QDBZ == 1) {//启动中
                                Dispatch.Json_AllClinkAutoID[id] = Dispatch.Starting;//设为‘启动中’状态
                            } else {
                                Dispatch.Json_AllClinkAutoID[id] = Dispatch.Success;//设为‘成功’状态
                            }
                            break;
                        default://其他状态
                            if (currentPillObj.QDBZ == 1) {//启动中
                                Dispatch.Json_AllClinkAutoID[id] = Dispatch.Starting;//设为'启动中'状态
                            } else {
                                Dispatch.Json_AllClinkAutoID[id] = Dispatch.Failure;//设为'失败'状态
                            }
                            break;
                    }
                }
                GetOneKeyChargeAboutCount();
            } else if (Dispatch.OneKeyChargeStatus == "NoOpen") {//未开启(点击了一键充电，但是没点确定按钮)
                Dispatch.IsRefresh = true;//已刷新
            }

            //负荷调度弹出框的需求功率赋值
            SetLoadDispatchData(id, currentPillObj.DemandPowerText);
            /*****************************************【非第一次加载】结束********************************************************/
        }

        $("#forceReplyCharge_" + id).css("display", "none");

        //群充模式下的遮罩层
        $("#setModeStrategy_" + id).css("display", "none");
        $("#modeStrategyCover_" + id).css("display", "none");
        $("#textModeStrategy_" + id).html("");
        $("#textModeStrategy_" + id).attr("value", "");

        switch (curState) {
            case Dispatch.StatusDic["Free"].value://显示【请插枪】
                Common_SetPageContollerValue(Dispatch.StatusDic["Free"].text, kongxian, "plugGrab_", id);
                break;
            case Dispatch.StatusDic["AlreadyFull"].value://显示【请拔枪】
                Common_SetPageContollerValue(Dispatch.StatusDic["AlreadyFull"].text, shiyongzhong, "baGrab_", id);
                break;
            case Dispatch.StatusDic["Pause"].value://显示【结束充电】
                Common_SetPageContollerValue(Dispatch.StatusDic["Pause"].text, shiyongzhong, "endCharge_", id);
                //显示人工调度按钮
                $("#forceReplyCharge_" + id).css("display", "block");
                break;
            case Dispatch.StatusDic["Using"].value://显示【结束充电】
                Common_SetPageContollerValue(Dispatch.StatusDic["Using"].text, shiyongzhong, "endCharge_", id);
                break;
            case Dispatch.StatusDic["TrickleCharge"].value://显示【结束充电】
                Common_SetPageContollerValue(Dispatch.StatusDic["TrickleCharge"].text, shiyongzhong, "endCharge_", id);
                break;
            case Dispatch.StatusDic["Clink"].value:
            case Dispatch.StatusDic["Switching"].value:
            case Dispatch.StatusDic["Starting"].value:
            case Dispatch.StatusDic["Dischargeing"].value://显示【开始充电】
                Common_SetPageContollerValue(Dispatch.StatusDic["Clink"].text, shiyongzhong, "replyCharge_", id);
                break;
            case Dispatch.StatusDic["Away"].value:
            case "null":
            case ""://显示【暂停服务】
                Common_SetPageContollerValue(Dispatch.StatusDic["Away"].text, liwang, "timeout_", id);
                break;
            case Dispatch.StatusDic["PileFault"].value://显示【暂停服务】
                Common_SetPageContollerValue(Dispatch.StatusDic["PileFault"].text, guzhang, "timeout_", id);
                break;
            case Dispatch.StatusDic["ChargerFault"].value://显示【暂停服务】
                Common_SetPageContollerValue(Dispatch.StatusDic["ChargerFault"].text, guzhang, "timeout_", id);
                break;
            case Dispatch.StatusDic["BMSFault"].value://显示【暂停服务】
                Common_SetPageContollerValue(Dispatch.StatusDic["BMSFault"].text, guzhang, "timeout_", id);
                break;
            case Dispatch.StatusDic["ConnectFault"].value://显示【暂停服务】
                Common_SetPageContollerValue(Dispatch.StatusDic["ConnectFault"].text, guzhang, "timeout_", id);
                break;
            case Dispatch.StatusDic["LoadDispatch"].value://等待调度,显示【等待调度】
                Common_SetPageContollerValue(Dispatch.StatusDic["LoadDispatch"].text, liwang, "loadDispatch_", id);
                break;
            case Dispatch.StatusDic["FuQiang"].value://副枪 显示【暂停服务】
                Common_SetPageContollerValue(Dispatch.StatusDic["FuQiang"].text, shiyongzhong, "timeout_", id);
                break;
            case Dispatch.StatusDic["WeiZhi"].value://未知 显示【暂停服务】
                Common_SetPageContollerValue(Dispatch.StatusDic["WeiZhi"].text, liwang, "timeout_", id);
                break;
            case Dispatch.StatusDic["Recovering"].value://恢复中 显示【暂停服务】
                Common_SetPageContollerValue(Dispatch.StatusDic["Recovering"].text, liwang, "timeout_", id);
                break;
        }

        //如果是调度轮充中，需要显示队列中和队列数量 【EditBy shaocx,2015-09-01】
        //去掉currentPillObj.ChargeType=5(轮充)的判断，因为=1（群充）时也会排队 【EditBy shaocx,2015-11-25】

        if (currentPillObj.DLCD > 0) {//说明正在队列中
            $("#statusName_" + id).text("排队" + currentPillObj.DLCD);

            //显示人工调度按钮
            $("#forceReplyCharge_" + id).css("display", "block");
        }

        SetButtonStyleByPillObj(currentPillObj);//根据终端的值设置【开始充电】【结束充电】【请插枪】【暂停服务】的样式 【Editby shaocx,2015-10-23】

        //处理当设置为群充模式时，显示禁用遮罩层
        //判断如果是群充模式
        var curIsNextForChargGroup = $("#IsNextForChargGroup_" + id).val();
        var curFirstPileCanSN = $("#FirstPileCanSN_" + id).val();
        var txtStr = "群充不可用";
        if (curIsNextForChargGroup == "1") {//说明是非群充组下的第一个终端
            for (var i = 0; i < Dispatch.ChargGroupPileObject_Arr.length; i++) {
                if (Dispatch.ChargGroupPileObject_Arr[i].CanSN == curFirstPileCanSN
                    && Dispatch.ChargGroupPileObject_Arr[i].CtrlAddress == currentPillObj.CtrlAddress) {//说明符合条件
                    $("#modeStrategyCover_" + id).css("display", "block");
                    $("#textModeStrategy_" + id).html(txtStr);
                    $("#textModeStrategy_" + id).attr("value", txtStr);

                    SetStatusButtonIsDisplay("setModeStrategy_", id);//显示【正在设置充电模式】
                }
            }
        }
        else {
            if (currentPillObj.ChargingMode != null && currentPillObj.ChargingMode.toString() == Dispatch.ChargeModeDic["ChargGroup"])//群充模式
            {//说明设置的是群充模式，记录下他的Can地址
                Dispatch.ChargGroupPileObject_Arr.push(currentPillObj);
                Dispatch.ChargGroupPileObject_ArrForOneKeyCharge.push(currentPillObj);
            }
        }
    }
}
//控件赋值公共方法  statusName:要显示状态文本名称  pillColor:设置状态的显示样式  btnType:要显示按钮的按钮类型 id:自己生成的id号
export function Common_SetPageContollerValue(statusName, pillColor, btnType, id) {
    $("#statusName_" + id).text(statusName);
    $("#statusName2_" + id).text(statusName);
    $("#pillColor_" + id).css("background-color", pillColor);
    $("#pillColor2_" + id).css("background-color", pillColor);
    SetStatusButtonIsDisplay(btnType, id);
}
// 控制状态按钮是否显示和隐藏  btnType:要显示按钮的按钮类型  id:自己生成的id号
export function SetStatusButtonIsDisplay(btnType, id) {
    $("#" + btnType + id).css("display", "block");//显示按钮
    $("#" + btnType + "2" + id).css("display", "block");//显示按钮
    for (var i = 0; i < Dispatch.StatusButtonArray.length; i++) {
        if (btnType != Dispatch.StatusButtonArray[i]) {
            $("#" + Dispatch.StatusButtonArray[i] + id).css("display", "none");//隐藏按钮
            $("#" + Dispatch.StatusButtonArray[i] + "2" + id).css("display", "none");//隐藏按钮
        }
    }
}
/*【实时状态个数】开始*/
/*
             * 清空JS变量的值，初始化
             * isNotNeedSetPageValue：是否不需要更新界面显示的值
             */
export function ClearJSQuantitySumValue(isNotNeedSetPageValue) {
    Dispatch.AllSum = 0;
    Dispatch.Sum_ChargingCount = 0;
    Dispatch.freeSum = 0;
    Dispatch.clinkSum = 0;
    Dispatch.usingSum = 0;
    Dispatch.awaySum = 0;
    Dispatch.pileFaultSum = 0;
    Dispatch.chargerFaultSum = 0;
    Dispatch.bmsFaultSum = 0;
    Dispatch.connectFaultSum = 0;
    Dispatch.AlreadyFullSum = 0;//已充满
    Dispatch.TrickleChargeSum = 0;//涓流充
    Dispatch.PauseSum = 0;//暂停
    Dispatch.LoadDispatchSum = 0;//等待调度
    Dispatch.fuqiangSum = 0;//副枪
    Dispatch.weizhiSum = 0;//未知
    Dispatch.recoveringSum = 0;//恢复中
    if (isNotNeedSetPageValue) {//不需要更新
    } else {
        $("#PileSum").text("0");
        $("#ChargingSum").text("0");
        $("#NoChargingSum").text("0");
        if (currentEc != undefined) {
            debugger
            MyEcharts.CreatePie(currentEc, 0, 0);
        }
        SetControlSumValue();
    }
}
//设置控件Sum的值
export function SetControlSumValue() {
    var $obj_Computer = $("#divComputerCheckButton");
    var $obj_Phone = $("#div_smallCheckbox");
    SetControlSumValue2Small($obj_Computer);
    SetControlSumValue2Small($obj_Phone);
}
export function SetControlSumValue2Small($obj) {
    $obj.find("span[class='AllSum']").text(Dispatch.AllSum);//10000Dispatch.AllSum
    $obj.find("span[class='awaySum']").text(Dispatch.awaySum);
    $obj.find("span[class='freeSum']").text(Dispatch.freeSum);
    $obj.find("span[class='clinkSum']").text(Dispatch.clinkSum);
    $obj.find("span[class='AlreadyFullSum']").text(Dispatch.AlreadyFullSum);
    $obj.find("span[class='PauseSum']").text(Dispatch.PauseSum);
    $obj.find("span[class='LoadDispatchSum']").text(Dispatch.LoadDispatchSum);//Dispatch.LoadDispatchSum
    $obj.find("span[class='pileFaultSum']").text(Dispatch.pileFaultSum);//Dispatch.pileFaultSum
    $obj.find("span[class='chargerFaultSum']").text(Dispatch.chargerFaultSum);
    $obj.find("span[class='bmsFaultSum']").text(Dispatch.bmsFaultSum);
    $obj.find("span[class='connectFaultSum']").text(Dispatch.connectFaultSum);
    $obj.find("span[class='recoveringSum']").text(Dispatch.fuqiangSum);
    $obj.find("span[class='weizhiSum']").text(Dispatch.weizhiSum);
    $obj.find("span[class='recoveringSum']").text(Dispatch.recoveringSum);
    //涓流充和充电中状态合并为 充电中
    $obj.find("span[class='usingSum']").text(Dispatch.usingSum);
}
/*【实时状态个数】结束*/
//清空一键充电相关的值，初始化
export function ClearOneKeyChargeAboutArr() {
    Dispatch.IsClickOneKeyCharge = false;//是否点击了一键充电，如果点击了，则延迟60秒刷新页面
    //$("#handOneKeyCharge").css("background", "url(/Content/img/tps/OneKeyCharge.png) no-repeat center");
    $("#handOneKeyCharge").text("一键充电");
    Dispatch.Arr_AllClinkAutoID = new Array();
    Dispatch.ctrlcanAddrList = new Array();
    Dispatch.Json_AllClinkAutoID = {};
    Dispatch.OneKeyChargeStatus = "Init";//未开启一键充电
    Dispatch.IsRefresh = false;
}
//获取一键充电的成功数、失败数和启动中数
export function GetOneKeyChargeAboutCount() {
    var successCount = 0;
    var failureCount = 0;
    var startingCount = 0;
    for (var key in Dispatch.Json_AllClinkAutoID) {
        switch (Dispatch.Json_AllClinkAutoID[key]) {
            case Dispatch.Success:
                successCount += 1;
                break;
            case Dispatch.Failure:
                failureCount += 1;
                break;
            case Dispatch.Starting:
                startingCount += 1;
                break;
        }
    }

    //赋值
    $("#lbl_Clink_SuccessCount").html(successCount.toString());
    $("#lbl_Clink_FailureCount").html(failureCount.toString());
    $("#lbl_Clink_Starting").html(startingCount.toString());

    //（判断成功数+失败数）是否等于总数，如果等于，则说明一键充电完成
    var myCount = successCount + failureCount;
    if (myCount == Dispatch.Arr_AllClinkAutoID.length) {//说明一键充电完成
        ClearOneKeyChargeAboutArr();//初始化
    }
}
//根据终端的值设置【开始充电】【结束充电】【请插枪】【暂停服务】的样式 【Editby shaocx,2015-10-23】
export function SetButtonStyleByPillObj(pillObj) {
    if (pillObj == undefined)
        return;

    //【开始充电】【结束充电】【请插枪】【暂停服务】
    var btns = ["replyCharge_", "endCharge_", "plugGrab_", "timeout_"],
        colors = ["#49A449", "#D05353", "#5396D0", "#C1C1C1"],
        names = ["开始充电", "结束充电", "请插枪", "暂停服务"],
        nid = null;
    if (pillObj && pillObj.QDBZ == 1) {//显示 启动中
        $("#statusName_" + pillObj.AutoID).text("启动中");

        for (var k = 0; k < btns.length; k++) {
            nid = btns[k] + pillObj.AutoID;
            if ($("#" + nid).css("display") == "block") {
                $("#" + nid).html("正在开启...");
                $("#" + nid).attr("disabled", true);
                $("#" + nid).css("background-color", "gray");
                break;
            }
        }
    } else {
        for (var k = 0; k < btns.length; k++) {
            nid = btns[k] + pillObj.AutoID;
            if ($("#" + nid).css("display") == "block") {
                $("#" + nid).html(names[k]);
                $("#" + nid).attr("disabled", false);
                $("#" + nid).css("background-color", colors[k]);
                break;
            }
        }
    }
}
//遍历页面上处于‘已插枪’，并且不支持调度刷卡充电的终端 isTimingOper:是否是定时任务的一键充电【true是 false 否（界面上点击一键充电按钮）】
export function GetClinkIDArray(isTimingOper) {
    var str_json_Arr_AllClinkAutoID = "{",//构造JSON字符串
        arrObj = Dispatch.curPageAllCtrlAutoID_Arr,
        id = null,
        ctrAdd = null,
        canAdd = null;
    for (var i = 0; i < arrObj.length; i++) {
        id = arrObj[i];
        ctrAdd = id.split("-")[0];
        canAdd = id.split("-")[1];

        //首先验证不能是调度刷卡充电，如果是调度刷卡充电，则必须用刷卡充电  【EditBy shaocx,2016-07-11】
        if (IsPayByCard(id)) {
            continue;//跳出此次循环，继续下一次循环
        }
        if (isTimingOper) {
            str_json_Arr_AllClinkAutoID = OrganizePileDataForOneKey(id, str_json_Arr_AllClinkAutoID, ctrAdd, canAdd);
        } else {
            if ($("#statusName_" + id).text() == Dispatch.StatusDic["Clink"].text) {
                str_json_Arr_AllClinkAutoID = OrganizePileDataForOneKey(id, str_json_Arr_AllClinkAutoID, ctrAdd, canAdd);
            }
        }
    }
    if (str_json_Arr_AllClinkAutoID != "{") {
        str_json_Arr_AllClinkAutoID = str_json_Arr_AllClinkAutoID.substring(0, str_json_Arr_AllClinkAutoID.length - 1);
    }
    str_json_Arr_AllClinkAutoID += "}";
    Dispatch.Json_AllClinkAutoID = eval('(' + str_json_Arr_AllClinkAutoID + ')');
}
//组织一键充电所要充电的终端数据 id:标记Id
export function OrganizePileDataForOneKey(id, str_json_Arr_AllClinkAutoID, ctrAdd, canAdd) {
    //这里还需要验证如果是群充模式的话，只允许发送该群充模式下的各个轮充组下的第一个终端，其他的都不可用
    //判断如果是群充模式
    var isAllow = true;

    var curIsNextForChargGroup = $("#IsNextForChargGroup_" + id).val();
    var curFirstPileCanSN = $("#FirstPileCanSN_" + id).val();
    var curCtrlAddress = $("#CtrlAddress_" + id).val();
    if (curIsNextForChargGroup == "1") {//说明是非群充组下的第一个终端
        for (var j = 0; j < Dispatch.ChargGroupPileObject_ArrForOneKeyCharge.length; j++) {
            if (Dispatch.ChargGroupPileObject_ArrForOneKeyCharge[j].CanSN == curFirstPileCanSN
                && Dispatch.ChargGroupPileObject_ArrForOneKeyCharge[j].CtrlAddress == curCtrlAddress) {//说明符合条件
                isAllow = false;
                break;//跳出循环
            }
        }
    }
    //*/

    if (isAllow) {
        Dispatch.Arr_AllClinkAutoID.push(id);
        str_json_Arr_AllClinkAutoID += "'" + id + "':'" + Dispatch.Init + "',";
        Dispatch.ctrlcanAddrList.push({
            CtrlAddress: ctrAdd,
            CanAddress: canAdd
        });
    }
    return str_json_Arr_AllClinkAutoID;
}
//设置【开始充电】按钮改为【正在开启...】，并禁用
export function SetReplyChargeForStarting(id) {
    $("#replyCharge_" + id).html("正在开启...");
    $("#replyCharge_" + id).attr("disabled", true);
    $("#replyCharge_" + id).css("background-color", "gray");

    SetStatusButtonIsDisplay("replyCharge_", id);//显示【开始充电】
}
//设置【正在开启...】按钮改为【开始充电】，并启用
export function SetReplyChargeForInit(id) {
    remove_arr_OperatingPile(id);//移除数组里的值
    $("#replyCharge_" + id).html("开始充电");
    $("#replyCharge_" + id).attr("disabled", false);
    $("#replyCharge_" + id).css("background-color", kongxian);
}
// 人工调度操作 statusValue:原始状态值 id:终端页面id
export function SetReplyChargeByForceReplyCharge(statusValue, id) {
    switch (statusValue) {
        case Dispatch.StatusDic["Clink"].value://已插枪，当时是【开始充电】显示
            SetReplyChargeForStarting(id);
            break;
        case Dispatch.StatusDic["Pause"].value://已暂停,即排队中的状态,当时是【结束充电】显示
            $("#endCharge_" + id).html("正在开启...");
            $("#endCharge_" + id).attr("disabled", true);
            $("#endCharge_" + id).css("background-color", "gray");
            break;
        default:
            break;
    }
}
//  还原原始按钮，为人工调度方法调取失败时使用 statusValue:原始状态值 id:终端页面id
export function SetReplyChargeForInitByForceReplyChargeFail(statusValue, id) {
    switch (statusValue) {
        case Dispatch.StatusDic["Clink"].value://已插枪，当时是【开始充电】显示
            SetReplyChargeForInit(id);
            break;
        case Dispatch.StatusDic["Pause"].value://已暂停,即排队中的状态,当时是【结束充电】显示
            SetEndChargeForInit(id);
            break;
        default:
            break;
    }
}
//设置【结束充电】按钮改为【正在结束...】，并禁用
export function SetEndChargeForEnding(id) {
    $("#endCharge_" + id).html("正在结束...");
    $("#endCharge_" + id).attr("disabled", true);
    $("#endCharge_" + id).css("background-color", "gray");
}
//设置【正在结束...】按钮改为【结束充电】，并启用
export function SetEndChargeForInit(id) {
    $("#endCharge_" + id).html("结束充电");
    $("#endCharge_" + id).attr("disabled", false);
    $("#endCharge_" + id).css("background-color", "#D05353");
}
/*【根据选中状态控制终端显示或隐藏】开始*/
//终端状态显示隐藏过滤  stateType：状态类型 checkFlag:选择是否标识
export function SetShowHidePillDiv(stateType, checkFlag) {
    var stateObj = Dispatch.StatusDic[stateType],//状态字典对象
        stateValue = stateObj.value,
        stateDivName = "div_" + stateType,
        pztArrObj = Dispatch.curPageAllCtrlAutoID_Arr,
        id = null,
        state = null;
    if (checkFlag) {//选中
        if (Dispatch.curNoChecked_Arr.indexOf(stateDivName) > -1) {
            Dispatch.curNoChecked_Arr = Dispatch.curNoChecked_Arr.replace(stateDivName, "");
        }
        for (var i = 0; i < pztArrObj.length; i++) {
            id = pztArrObj[i];
            state = $("#SSZT_" + id).val();
            //特殊处理下离网和充电中的情况
            if (state == "null" || state == "") {//当做【离网】状态处理
                state = Dispatch.StatusDic["Away"].value;
            }
            if (state == Dispatch.StatusDic["TrickleCharge"].value) {//如果状态是【充电中】或【涓流充】,充电中，因为状态【充电中】和【涓流充】合并了，所以这里特殊处理
                state = Dispatch.StatusDic["Using"].value;
            }
            if (state == stateValue) {
                $('#pilldiv_' + id).css("display", "block");
            }
        }
    } else {//不选中
        if (Dispatch.curNoChecked_Arr.indexOf(stateDivName) < 0) {
            Dispatch.curNoChecked_Arr += "," + stateDivName;
        }
        for (var i = 0; i < pztArrObj.length; i++) {
            id = pztArrObj[i];
            state = $("#SSZT_" + id).val();
            //特殊处理下离网和充电中的情况
            if (state == "null" || state == "") {//当做【离网】状态处理
                state = Dispatch.StatusDic["Away"].value;
            }
            if (state == Dispatch.StatusDic["TrickleCharge"].value) {//如果状态是【充电中】或【涓流充】,充电中，因为状态【充电中】和【涓流充】合并了，所以这里特殊处理
                state = Dispatch.StatusDic["Using"].value;
            }
            if (state == stateValue) {
                $('#pilldiv_' + id).css("display", "none");
            }
        }
    }

    //重新整理保存的cookie值
    var curStr = Dispatch.curNoChecked_Arr;
    if (curStr != '') {
        var myArr = Dispatch.curNoChecked_Arr.split(",");
        var newArr = new Array();//当前未被选中的checkbox集合
        for (var i = 0; i < myArr.length; i++) {
            if (myArr[i] != "" && newArr.indexOf(myArr[i]) < 0) {
                newArr.push(myArr[i]);
            }
        }
        curStr = newArr.toString();
    } else {//说明是全部选中了

    }
    Dispatch.curNoChecked_Arr = curStr;
    localStorage.setItem("tps_curnochecked", curStr);

    //注意：执行完毕之后再查询SOC过滤
    SearchSOC("0");
}
/*
             * [批量]终端状态显示隐藏过滤
             * strStateValuesHide:要隐藏的状态值集合字符串
             */
export function SetShowHidePillDivForBatch(strStateValuesHide) {
    var pztArrObj = Dispatch.curPageAllCtrlAutoID_Arr,
        id = null,
        state = null;
    for (var i = 0; i < pztArrObj.length; i++) {
        id = pztArrObj[i];
        state = $("#SSZT_" + id).val();//状态值
        //特殊处理下离网和充电中的情况
        if (state == "null" || state == "") {//当做【离网】状态处理
            state = Dispatch.StatusDic["Away"].value;
        }
        if (state == Dispatch.StatusDic["TrickleCharge"].value) {//如果状态是【充电中】或【涓流充】,充电中，因为状态【充电中】和【涓流充】合并了，所以这里特殊处理
            state = Dispatch.StatusDic["Using"].value;
        }

        if (strStateValuesHide.indexOf(state) > -1) {//要显示
            $('#pilldiv_' + id).css("display", "none");
        } else {//要隐藏
            $('#pilldiv_' + id).css("display", "block");
        }
    }
}

//通用设置状态checkbox显示和隐藏【电脑】 isNeedShow:是否需要显示控件，true是 false否
export function CommonSetStateShowHideForComputer(isNeedShow) {
    var divCheckBoxArr = $("div[name='divCheckBox']");
    var cssValue = null;
    var StateType = null;
    var statusDic = null;
    for (var i = 0; i < divCheckBoxArr.length; i++) {
        cssValue = $(divCheckBoxArr[i]).attr("class");
        StateType = $(divCheckBoxArr[i]).attr("statetype");
        statusDic = Dispatch.StatusDic[StateType];

        if (isNeedShow) {//要控件显示
            if (cssValue == statusDic.noCheckedStyle) {//原先是未选中状态的
                SetCss(divCheckBoxArr[i], undefined, true);//让他选中
            }
        } else {//要控件隐藏
            if (cssValue == statusDic.checkedStyle) {//原先是选中状态的
                SetCss(divCheckBoxArr[i], undefined, true);//让他不选中
            }
        }
    }
}
//通用设置状态checkbox显示和隐藏【手机】 isNeedShow:是否需要显示控件，true是 false否
export function CommonSetStateShowHideForPhone(isNeedShow) {
    var imgCheckBoxArr = $("div[name='imgCheckBox']");
    var divObj = null;
    var imgObj = null;
    var srcValue = null;
    for (var i = 0; i < imgCheckBoxArr.length; i++) {
        divObj = $(imgCheckBoxArr[i]);
        imgObj = $(imgCheckBoxArr[i]).find("img");
        srcValue = imgObj.css("display") == "none" ? '' : 'xxx';

        if (isNeedShow) {//要控件显示
            if (srcValue == '') {//以前是未选中状态
                SetCssForPhone(divObj, true);
            }
        } else {//要控件隐藏
            if (srcValue != '') {//以前是选中状态
                SetCssForPhone(divObj, true);
            }
        }
    }
}
//全选/全不选【电脑】
export function SelectAllForComputer(obj) {
    isClickCheckbox = true;
    //首先验证选择的是 全部选中还是不全部选中
    var allCssValue = $(obj).attr("class");
    var allStateType = $(obj).attr("statetype");
    var allStatusDic = Dispatch.StatusDic[allStateType];
    if (allCssValue == allStatusDic.noCheckedStyle) {//原先是未选中状态的

        //全选的checkbox样式
        $(obj).attr("class", allStatusDic.checkedStyle);
        $("#img_" + allStateType).show();

        CommonSetStateShowHideForComputer(true);
    } else if (allCssValue == allStatusDic.checkedStyle) {//原先是选中状态的

        $(obj).attr("class", allStatusDic.noCheckedStyle);
        $("#img_" + allStateType).hide();

        CommonSetStateShowHideForComputer(false);
    }
}
//全选/全不选【手机】
export function SelectAllForPhone(phoneObj) {
    //首先验证选择的是 全部选中还是不全部选中
    debugger
    var allImgObj = $(phoneObj).find("img");
    var allSrcValue = allImgObj.css("display") == "none" ? '' : 'xxx';
    var allStateType = allImgObj.attr("statetype");

    var allStatusDic = Dispatch.StatusDic[allStateType];
    if (allSrcValue == '') {//以前是未选中状态
        $("#div_" + allStateType).attr("class", allStatusDic.checkedStyle);
        allImgObj.show();
        SetShowHidePillDiv(allStateType, true);

        CommonSetStateShowHideForPhone(true);
    } else {//以前是选中状态
        debugger
        $("#div_" + allStateType).attr("class", allStatusDic.noCheckedStyle);
        allImgObj.hide();
        SetShowHidePillDiv(allStateType, false);

        CommonSetStateShowHideForPhone(false);
    }
}
//设置Css样式【电脑】 obj:对象 isAuto:如果是记录cookie所做的操作，则设为不选中 isClickAllCheck：是否是点击了 【全选】checkbox
export function SetCss(obj, isAuto, isClickAllCheck) {
    isClickCheckbox = true;
    var cssValue = $(obj).attr("class");
    var StateType = $(obj).attr("statetype");
    var statusDic = Dispatch.StatusDic[StateType];
    if (cssValue == statusDic.noCheckedStyle) {//原先是未选中状态的
        if (isAuto != undefined && isAuto) //如果是记录cookie所做的操作，则设为不选中
        {
            $(obj).attr("class", statusDic.noCheckedStyle);
            $("#img_" + StateType).hide();
            SetShowHidePillDiv(StateType, false);
            return false;
        }

        $(obj).attr("class", statusDic.checkedStyle);
        $("#img_" + StateType).show();
        SetShowHidePillDiv(StateType, true);
    } else if (cssValue == statusDic.checkedStyle) {//原先是选中状态的
        $(obj).attr("class", statusDic.noCheckedStyle);
        $("#img_" + StateType).hide();
        SetShowHidePillDiv(StateType, false);
    }

    if (isClickAllCheck == undefined) {//说明不是点击了 【全选】checkbox,就需要判断是否进行了全选和全不选
        SetAllCheckboxChecked();
    }
}
// 设置Css样式【手机】 phoneObj：对象  isClickAllCheck：是否是点击了 【全选】checkbox
export function SetCssForPhone(phoneObj, isClickAllCheck) {
    var imgObj = $(phoneObj).find("img");
    var srcValue = imgObj.css("display") == "none" ? '' : 'xxx';
    var stateType = imgObj.attr("statetype");
    var statusDic = Dispatch.StatusDic[stateType];
    if (srcValue == '') {//以前是未选中状态
        $("#div_" + stateType).attr("class", statusDic.checkedStyle);
        imgObj.show();
        SetShowHidePillDiv(stateType, true);
    } else {//以前是选中状态
        $("#div_" + stateType).attr("class", statusDic.noCheckedStyle);
        imgObj.hide();
        SetShowHidePillDiv(stateType, false);
    }

    if (isClickAllCheck == undefined) {//说明不是点击了 【全选】checkbox,就需要判断是否进行了全选和全不选
        SetAllCheckboxChecked();
    }
}
//根据Cookie里的记录控制终端的显示和隐藏
export function SetPileShowHideByCookie() {
    var tps_curnochecked = localStorage.getItem("tps_curnochecked");//cookie里的没有选择的状态
    if (tps_curnochecked != undefined && tps_curnochecked != '') {
        Dispatch.curNoChecked_Arr = tps_curnochecked;
        var arr = Dispatch.curNoChecked_Arr.split(",");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != "")
                SetCss("#" + arr[i], true);//这些是默认不选中的
        }
    } else {//如果所有状态都选择了，还得处理soc过滤
        SearchSOC("0");
    }
    //解决如果终端隐藏了页面样式会乱的问题
    PageBodyResize();
}
//判断界面上状态checkbox是否都选中或者不选中，以控件 全选的checkbox的样式
export function SetAllCheckboxChecked() {
    var divCheckBoxArr = $("div[name='divCheckBox']");
    var allCount = divCheckBoxArr.length;
    var noCheckCount = 0;//未选中的状态
    var hasCheckcount = 0;//已选中的状态
    var cssValue = null;
    var StateType = null;
    var statusDic = null;
    for (var i = 0; i < divCheckBoxArr.length; i++) {
        cssValue = $(divCheckBoxArr[i]).attr("class");
        StateType = $(divCheckBoxArr[i]).attr("statetype");
        statusDic = Dispatch.StatusDic[StateType];
        if (cssValue == statusDic.noCheckedStyle) {//当前是未选中状态
            noCheckCount++;
        }
        else if (cssValue == statusDic.checkedStyle) {//当前是选中状态
            hasCheckcount++;
            //console.log(hasCheckcount);
        }
    }


    var allStateType = $("#div_All").attr("statetype");
    var allStatusDic = Dispatch.StatusDic[allStateType]
    if (hasCheckcount == allCount) {//全选中了

        $("#div_All").attr("class", allStatusDic.checkedStyle);
        $("#img_" + allStateType).show();
    } else {
        $("#div_All").attr("class", allStatusDic.noCheckedStyle);
        $("#img_" + allStateType).hide();
    }
}
/*【根据选中状态控制终端显示或隐藏】结束*/
//设置刷新按钮的是否禁用SetHandRefreshDisabledStatus
//点击按钮【订单查询】---放弃使用
// export function BillSearch() {
//         var UserId = $("#hideUserID").val();
//         //跳转界面
//         var url;
//         if (Dispatch.PageFlag == "PowerDispatchingShowForValiReload") {
//             url = "/TPS/TPSReport?url=/RechargeRecord/Index";
//         } else if (Dispatch.PageFlag == "App_PowerDispatchingShow") {//App调度充电
//             url = "/TPS/App_ChargeBillSearch";
//         }
//         else {
//             url = "/TPS/BossReport?url=/RechargeRecord/Index";
//         }
//         //location.href = url;
//         this.$router.push({path: url, query: {UserID: UserId}});
//     }
//点击按钮【电站充电一览】---放弃使用
// export function StaChargeView() {
//         var staId = $("#hideStaId").val();
//         var UserId = $("#hideUserID").val();
//         if (staId == "") {
//             NotifyWarning("请先选择一个电站!");
//             return;
//         }
//         var after_url = "url=/PubTransWuHan/Index?StaID=" + staId + "&UserID=" + UserId;
//         if (Dispatch.PageFlag == "PowerDispatchingShowForValiReload") {
//             var url = "/TPS/BossReportForValiReload?" + after_url;
//             // location.href = url;
//             //$.pjax({url: url});
//             //this.$router.push({path:url});
//         } else if (Dispatch.PageFlag == "App_PowerDispatchingShow") {//App调度页面
//             var url = "/TPS/App_BossReport?" + after_url;
//             //$.pjax({url: url});
//
//         }
//         else {
//             var url = "/TPS/BossReport1?" + after_url;
//             //$.pjax({url: url});
//             //this.$router.push({path:url});
//             //this.$router.push({path:url,query:{"StaID":staId}});
//         }
//         this.$router.push({path: url, query: {UserID: UserId, StaID: staId}});
//     }
// 根据是否高峰显示警示框
export function ShowHideWarningByStationHighPriceFlag(firstObj) {
    if (firstObj != null) {
        if (firstObj.SFGF == 1) {//高峰时段
            $("#div_warning").css("display", "block");
            //$("#warningLine").css("display", "block");
        } else {
            $("#div_warning").css("display", "none");
            //$("#warningLine").css("display", "none");
        }
    }
}
//循环调用
export function startTimer() {
    if ($("#DispatchFlag").val() == undefined) //说明该页面已经不存在了
        return;
    //验证上次执行时间跟当前是否相差了60秒
    if (Dispatch.curClientTime != '') {
        var curDate = new Date();
        var curClentTime = new Date(Dispatch.curClientTime);
        var hmCount = curDate.getTime() - curClentTime.getTime();
        var refreshRate = $("#hideRefreshRate").val();
        refreshRate = parseInt(refreshRate * 1000) - 2000;
        if (hmCount < refreshRate)//底线是58秒刷新一次
        {
            RecursiveStartTimer();//重新调一次
            return;
        }
    }
    if (!Dispatch.IsClickOneKeyCharge) {//是否点击了一键充电，如果点击了，则延迟60秒刷新页面
        //GetRealTimeData(false);//调用方法
        GetRealTimeData(false, false);//调用方法
    } else {
        //记录下当前时间
        Dispatch.curClientTime = new Date();
        RecursiveStartTimer();//60秒重新调一次
    }
}
//60秒递归一次
export function RecursiveStartTimer() {
    Dispatch.IsClickOneKeyCharge = false;
    var refreshRate = $("#hideRefreshRate").val();
    setTimeout(startTimer, parseInt(refreshRate * 1000));
}
//根据集控器查询终端
export function SearchDataByCtrl(selected) {
    var selId = $(selected).attr("value");
    var ctrlAddr = $(selected).attr("ctrlAddr");
    $("#hideCtrlId").val(selId);
    $("#hideCtrlAddr").val(ctrlAddr);
    Dispatch.CtrlAddressMap = ctrlAddr;//选中的集控器地址
    if ($(selected).text() == "") {
        $("#ddlCtrl").html('集控器<span class="caret"></span>');//当前选中的值（一个电站下所有集控器）
        //todo clear cookie
        localStorage.removeItem("tps_curctrl_address");
        localStorage.removeItem("tps_curctrl_id");
        localStorage.removeItem("tps_curctrl_name");


    } else {
        $("#ddlCtrl").html($(selected).text() + '<span class="caret"></span>');//当前选中的值
        //todo update cookie
        localStorage.setItem("tps_curctrl_address", ctrlAddr);
        localStorage.setItem("tps_curctrl_id", selId);
        localStorage.setItem("tps_curctrl_name", encodeURIComponent($(selected).text()));

    }
    //GetPileData(ctrlAddr, false);----liujia
    GetPileData(ctrlAddr, false,true);
}
//验证页面是否存在终端
export function ValidatePageIsExistCtrls() {
    var ctrls = $("div[class='pilldiv pillDivCoverWH']");
    if (ctrls != undefined && ctrls.length > 0) {
        return true;
    } else {
        return false;
    }

}
// 判断终端启动方式是否包含调度刷卡充电 id:页面的id  返回：true是包含调度刷卡充 false为否
export function IsPayByCard(id) {
    return $("#Chargers_" + id).val().indexOf("10") > -1 ? true : false;//如果终端启动方式包含调度刷卡充，则提示客户刷卡。
}
/*【负荷调度】开始*/
//设置负荷调度数据
export function SetLoadDispatchData(id, demandPower) {
    var tranId = $("#Grandson_DemandPower_" + id).attr("tranId");

    var oldDemandPower = $("#Grandson_DemandPower_" + id).text();//之前的需求功率
    $("#Grandson_DemandPower_" + id).text(demandPower);//设置需求功率
    var calcValue = (parseFloat(demandPower) * 1000 - parseFloat(oldDemandPower) * 1000) / 1000;//计算需求功率的变化值

    var oldPowerDeviation = $("#Grandson_PowerDeviation_" + id).text();//之前的功率偏差
    $("#Grandson_PowerDeviation_" + id).text((calcValue + parseFloat(oldPowerDeviation)).toString());//设置功率偏差

    //计算汇总的总需求功率和总功率偏差
    var oldTotalDemandPower = $("#DemandPower_" + tranId).text();//之前的总需求功率
    $("#DemandPower_" + tranId).text((calcValue + parseFloat(oldTotalDemandPower)));//设置总需求功率值

    var oldTotalPowerDeviation = $("#PowerDeviation_" + tranId).text();//之前的总功率偏差
    $("#PowerDeviation_" + tranId).text((calcValue + parseFloat(oldTotalPowerDeviation)).toString());//设置总功率偏差
}
// 计算实际功率和剩余功率的样式文本
export function GetmyPowerHtml(maxPowerText, grossTotalPowerText, surplusPowerText) {
    var maxPower = parseFloat(maxPowerText);
    var grossTotalPower = parseFloat(grossTotalPowerText);
    var surplusPower = parseFloat(surplusPowerText);

    var myPowerHtml = '';
    var grossTotalPowerWidth = '';//实际功率长度%
    var surplusPowerWidth = '';//剩余功率长度%
    var grossTotalPowerTitle = '';
    var surplusPowerTitle = '';


    if (grossTotalPower == 0 && surplusPower != 0) {//如果实际功率为0的话
        grossTotalPowerWidth = "0%";
        surplusPowerWidth = "100%";
        surplusPowerTitle = '剩余' + surplusPowerText + 'kw(' + surplusPowerWidth + ')';
        myPowerHtml += '<div style="width:' + surplusPowerWidth + '" divtype="surplusPower"  class="toggleColorForLoadDispatchLRForSurplusPower" title="' + surplusPowerTitle + '"><span>剩余' + surplusPowerText + '</span></div>';
    } else if (grossTotalPower != 0 && surplusPower == 0) //如果剩余功率为0的话
    {
        grossTotalPowerWidth = "100%";
        surplusPowerWidth = "0%";
        grossTotalPowerTitle = '实际' + grossTotalPowerText + 'kw(' + grossTotalPowerWidth + ')';
        myPowerHtml += '<div style="width:' + grossTotalPowerWidth + '" divtype="grossTotalPower" class="toggleColorForLoadDispatchLRForGrossTotalPower" title="' + grossTotalPowerTitle + '"><span>实际' + grossTotalPowerText + '</span></div>';

    } else {//计算宽度
        var grossBFB = changeTwoDecimal_f(((grossTotalPower * 1000) / (maxPower * 1000)));
        //这是浮点运算的误差。因为小数点后有三位，所以先乘以1000，再除以1000，这样运算就不会有误差了。
        grossBFB = 100 * (grossBFB * 1000) / 1000;
        if (grossBFB == 100) {//实际功率100%
            grossTotalPowerWidth = "100%";
            surplusPowerWidth = "0%";
            grossTotalPowerTitle = '实际' + grossTotalPowerText + 'kw(' + grossTotalPowerWidth + ')';
            myPowerHtml += '<div style="width:' + grossTotalPowerWidth + '" divtype="grossTotalPower" class="toggleColorForLoadDispatchLRForGrossTotalPower" title="' + grossTotalPowerTitle + '"><span>实际' + grossTotalPowerText + '</span></div>';
        } else if (grossBFB == 0) {//实际功率为0%
            grossTotalPowerWidth = "0%";
            surplusPowerWidth = "100%";
            surplusPowerTitle = '剩余' + surplusPowerText + 'kw(' + surplusPowerWidth + ')';
            myPowerHtml += '<div style="width:' + surplusPowerWidth + '" divtype="surplusPower"  class="toggleColorForLoadDispatchLRForSurplusPower" title="' + surplusPowerTitle + '"><span>剩余' + surplusPowerText + '</span></div>';
        }
        else {
            grossTotalPowerWidth = (grossBFB).toString() + "%";
            surplusPowerWidth = (100 - grossBFB).toString() + "%";
            grossTotalPowerTitle = '实际' + grossTotalPowerText + 'kw(' + grossTotalPowerWidth + ')';
            surplusPowerTitle = '剩余' + surplusPowerText + 'kw(' + surplusPowerWidth + ')';
            myPowerHtml += '<div style="width:' + grossTotalPowerWidth + '" divtype="grossTotalPower" class="toggleColorForLoadDispatchLeft" title="' + grossTotalPowerTitle + '"><span>实际' + grossTotalPowerText + '</span></div>';
            myPowerHtml += '<div style="width:' + surplusPowerWidth + '" divtype="surplusPower" class="toggleColorForLoadDispatchRight" title="' + surplusPowerTitle + '"><span>剩余' + surplusPowerText + '</span></div>';
        }
    }
    return myPowerHtml;
}
export function ValidateIsShowPowerValue() {
    ValidateIsLong("grossTotalPower");
    ValidateIsLong("surplusPower");
}
//验证字体长度是否超过了限制
export function ValidateIsLong(typeName) {
    var grossTotalPowerArr = $("div[divtype='" + typeName + "']");
    var grossTotalPowerWidth = '';
    var grossTotalPowerSpanWidth = '';
    for (var i = 0; i < grossTotalPowerArr.length; i++) {
        grossTotalPowerWidth = $(grossTotalPowerArr[i]).css("width");
        grossTotalPowerWidth = grossTotalPowerWidth.substring(0, grossTotalPowerWidth.length - 2);

        //grossTotalPowerSpanWidth = $(grossTotalPowerArr[i]).find("span").css("width");
        $("#span_XXX").text($(grossTotalPowerArr[i]).find("span").text());
        grossTotalPowerSpanWidth = $("#span_XXX").css("width");

        grossTotalPowerSpanWidth = grossTotalPowerSpanWidth.substring(0, grossTotalPowerSpanWidth.length - 2);
        if (parseFloat(grossTotalPowerWidth) < parseFloat(grossTotalPowerSpanWidth)) {
            $(grossTotalPowerArr[i]).find("span").text("");
        }
    }
}
//设置负荷调度数据信息
export function SetLoadDispatchViewData(listData) {

    if (listData.length > 0) {
        //说明是负荷调度电站，集控器列表禁用
        $("#ddlCtrl").attr("disabled", "disabled");

        var sHtml_computer = "";
        var sHtml_phone = "";


        if (listData.length > 0) {
            sHtml_phone += '<div class="div_phone_loadDispatch wholePaddingLeftRight  col-lg-12 col-md-12 col-sm-12 col-xs-12 ">';
        }
        var transName = null,
            transId = null,
            grossTotalPowerText = null,
            surplusPowerText = null,
            maxPowerText = null,
            myPowerHtml = null,
            transNameWidth = null,
            maxPowerTextWidth = null;
        for (var i = 0; i < listData.length; i++) {
            transName = listData[i].TransName;
            transId = listData[i].TransId;
            grossTotalPowerText = listData[i].GrossTotalPowerText;
            surplusPowerText = listData[i].SurplusPowerText;
            maxPowerText = listData[i].MaxPowerText;

            myPowerHtml = GetmyPowerHtml(maxPowerText, grossTotalPowerText, surplusPowerText);

            $("#xxx").text(transName);
            transNameWidth = $("#xxx").css("width");
            $("#xxx").text('');
            $("#xxx").text(maxPowerText + '(kW)');
            maxPowerTextWidth = $("#xxx").css("width");

            sHtml_computer += '<div class="loadDispatchWhole wholePaddingLeftRight">';
            sHtml_computer += '<div class="content">';
            sHtml_computer += '<div class="div_table_loadDispatch loadDispatchCoverWH">';
            sHtml_computer += ' <table style="height: 100%; width: 100%">';
            sHtml_computer += '<tr>';
            sHtml_computer += '<td style="width:' + transNameWidth + '; ">' + transName + '</td>';
            sHtml_computer += ' <td>';
            sHtml_computer += ' <div name="myPower_' + transId + '" style="float: left; width: 100%;padding-left:15px;padding-right:15px">';

            sHtml_computer += myPowerHtml;

            sHtml_computer += '</div>';
            sHtml_computer += '</td>';
            sHtml_computer += '<td style="width:' + maxPowerTextWidth + '; "><label id="maxPower_' + transId + '" style="font-weight: bold; margin-bottom: 0px">' + maxPowerText + '(kW)</label></td>';
            sHtml_computer += ' </tr>';
            sHtml_computer += ' </table>';
            sHtml_computer += '</div>';
            sHtml_computer += '</div>';
            sHtml_computer += '</div>';


            sHtml_phone += '<div class="col-lg-6 col-md-12 col-sm-12 col-xs-12 " style="margin-top: 25px; height: 105px; float: left; border-radius: 6px 6px 6px 6px; border: #b9bbbc 1px solid; background-color: #ffffff; ">';
            sHtml_phone += '<div style="margin-top: 25px; ">';
            sHtml_phone += '<table style="height: 100%; width: 100%">';
            sHtml_phone += ' <tr>';
            sHtml_phone += '<td style="width: ' + transNameWidth + '; padding-right: 16px;padding-bottom:5px;">' + transName + '</td>';
            sHtml_phone += '</tr>';
            sHtml_phone += '<tr>';
            sHtml_phone += '<td>';
            sHtml_phone += '<div name="myPower_' + transId + '" style="float: left; width: 100%; padding-bottom: 5px;">';

            sHtml_phone += myPowerHtml;

            sHtml_phone += ' </div>';
            sHtml_phone += ' </td>';
            sHtml_phone += ' </tr>';
            sHtml_phone += '  <tr>';
            sHtml_phone += '<td><label style="font-weight: bold; padding-bottom: 5px;">' + maxPowerText + '(kW)</label></td>';
            sHtml_phone += ' </tr>';
            sHtml_phone += '</table>';
            sHtml_phone += ' </div>';
        }

        if (listData.length > 0) {
            sHtml_computer += '</div>';
            $("#div_LoadDispatchGroup_computer").append(sHtml_computer);
            sHtml_phone += '</div>';
            $("#div_LoadDispatchGroup_phone").append(sHtml_phone);

            ValidateIsShowPowerValue();
        }


    } else {//说明是不是负荷调度电站，集控器列表启用
        $("#ddlCtrl").removeAttr("disabled");
    }
}
//实时设置负荷调度数据信息
export function SetLoadDispatchViewDataRealTime(listData) {
    if (listData.length > 0) {
        var maxPower = 0,//总功率上限
            surplusPower = 0,//剩余可用功率
            grossTotalPower = 0,//总实际功率
            transId = '',//集控器Id
            myPowerHtml = null;
        for (var i = 0; i < listData.length; i++) {
            transId = listData[i].TraId;
            maxPower = parseFloat($("#maxPower_" + transId).text());
            grossTotalPower = parseFloat(listData[i].SJZGL);//当前的实际功率
            grossTotalPower = grossTotalPower.toFixed(2);
            surplusPower = (maxPower * 1000 - grossTotalPower * 1000) / 1000;
            surplusPower = surplusPower.toFixed(2);

            $('#phone_GrossTotalPower_' + transId).text(grossTotalPower);
            $('#GrossTotalPower_' + transId).text(grossTotalPower);
            $("#phone_SurplusPower_" + transId).text(surplusPower);
            $("#SurplusPower_" + transId).text(surplusPower);


            myPowerHtml = GetmyPowerHtml(maxPower, grossTotalPower, surplusPower);

            $("div[name='myPower_" + transId + "']").html(myPowerHtml);

            ValidateIsShowPowerValue();
        }
    }
}
/*【负荷调度】结束*/
/*【文本显示】开始*/
//构造pilldivInfo字符串  objText:对象英文名称 objTextDesc:对象中文名称 objValue：对象文本值 objAutoID：对象ID值
//currentInitPillObj:对象 prefixForBreviary:缩略模式下的详情样式前缀,如果为空，说明不是缩略模式下的详情
export function GetStrForPilldivInfo(objText, objTextDesc, objValue, objAutoID, currentInitPillObj, prefixForBreviary) {

    var myObjValue = ConvertViewStr(objValue, objText);
    var myObjValueTips = myObjValue;
    var redtextdivStr = "redtextdiv";
    var defaultStateSum = "StateSum";//默认的值样式

    objTextDesc = objTextDesc + ":";
    $("#div_OOO").text("");
    $("#div_OOO").text(objTextDesc);
    var marginLeftWidth = $("#div_OOO").css("width");

    if (objText != null) {
        switch (objText) {
            case "Power"://电量
                //特殊处理电量
                if (currentInitPillObj != null) {
                    if (currentInitPillObj.SSZT == Dispatch.StatusDic["AlreadyFull"].value ||
                        currentInitPillObj.SSZT == Dispatch.StatusDic["Pause"].value ||
                        currentInitPillObj.SSZT == Dispatch.StatusDic["Using"].value ||
                        currentInitPillObj.SSZT == Dispatch.StatusDic["TrickleCharge"].value
                    ) {//【正在服务】
                        myObjValueTips = myObjValue = ConvertViewStr(currentInitPillObj.DLZL, objText);
                    } else {//
                        myObjValueTips = myObjValue = ConvertViewStr(currentInitPillObj.Power, objText);
                    }
                }
                break;
            case "ChargingPort"://充电接口，样式需要改变
                redtextdivStr = " redtextdiv_OnlyRight";
                break;
        }
    }


    var myStr = "<div class='" + prefixForBreviary + "pilldivInfo'>";

    myStr += "<div class='" + redtextdivStr + "'>" + objTextDesc;
    myStr += "</div>";

    myStr += "<div class='" + defaultStateSum + "' style='margin-left:" + marginLeftWidth + "'>";
    myStr += "<span id='" + objText + "_" + objAutoID + "'  title='" + myObjValueTips + "' class='" + prefixForBreviary + "nocolor'>";
    myStr += myObjValue;
    myStr += "</span>";
    myStr += "</div>";

    myStr += "</div>";
    return myStr;
}
//设置文本值  objText:项名称标识 objAutoID:Id值  objValue:从后台获取的值
export function SetTextValueForControl(objText, objAutoID, objValue) {
    var myValue = ConvertViewStr(objValue, objText);
    var myValueTips = myValue;

    switch (objText) {
        case "ChargeStrategy"://群充策略特殊
            if (objValue == "A策略") {
                myValueTips = "优先满足先请求充电车辆，有剩余功率则分配给其它车辆，若无剩余则排队等待。";
            } else if (objValue == "B策略") {
                myValueTips = "优先满足先请求充电车辆，保证每个车辆至少分配一个功率单元。";
            } else if (objValue == "C策略") {
                myValueTips = "根据请求充电的车辆平均分配充电功率。";
            }
            break;
        default:
            break;
    }
    /*
                 var spanName = "span[name='" + objText + "_" + objAutoID + "']";
                 var $SpanObject = $("#ctrlObj_" + objAutoID).find(spanName);
                 $SpanObject.text(myValue);
                 $SpanObject.attr('title', myValueTips);
                 //*/
    var $SpanObject = $("#" + objText + "_" + objAutoID);
    $SpanObject.text(myValue).attr('title', myValueTips);
}
//转换显示字符串
export function ConvertViewStr(objValue, objText) {
    if (objValue == null || objValue == '' || objValue == 0 || objValue == "--") {
        return '--';
    }
    switch (objText) {
        case "ChargingPowerText"://额定功率
        case "SJGL"://功率
        case "DemandPowerText"://需求功率
        case "XZGL"://限制功率
        case "MinPowerText"://最小功率
            objValue = changeTwoDecimal_f(objValue);
            objValue += "kW";
            break;
        case "DY"://电压
        case "RatedVoltage"://额定电压
            objValue = changeTwoDecimal_f(objValue);
            objValue += "V";
            break;
        case "DL"://电流
        case "XZDL"://限制电流
        case "XQDL"://需求电流
        case "MinCurrent"://最小电流
            objValue = changeTwoDecimal_f(objValue);
            objValue += "A";
            break;
        case "Power"://电量
        case "FullPower"://车辆额定电量
            objValue = changeTwoDecimal_f(objValue);
            objValue += "kWh";
            break;
        case "FZDY"://辅助电源
            switch (objValue) {
                case 1:
                    objValue = "12V";
                    break;
                case 2:
                    objValue = "24V";
                    break;
                default:
                    break;
            }
            break;
        case "CDSYSJ"://预计剩余时间
            var arr = objValue.split(":");
            objValue = parseInt(arr[0]).toString() + "时" + parseInt(arr[1]).toString() + "分";
            break;
        case "DSQMS"://单双枪模式
            if (objValue == "1")
                objValue = "标准单充";
            else if (objValue == "2")
                objValue = "单枪单充";
            else if (objValue == "3")
                objValue = "多枪单充";
            break;
        case "SFZQ"://是否主枪
            if (objValue == "0")
                objValue = "否";
            else if (objValue == "1")
                objValue = "是";
            break;
        case "ChargingMode"://充电模式
            objValue = Dispatch.ChargingModeDic[objValue].toString();
            break;
        case "ChargeStrategy"://群充策略
            objValue = Dispatch.ChargeStrategyDic[objValue].toString();
            break;
        default:
            break;
    }
    return objValue;
}
/*【文本显示】结束*/
/*【SOC过滤】开始*/
// 查询SQC isClickBtnSearch:是否是点击了按钮【查询SOC】进行了过滤 ,0 否 1 是
export function SearchSOC(isClickBtnSearch) {
    var startSoc = $("#startSOC").val();
    var endSoc = $("#endSOC").val();

    if (!(startSoc == '' && endSoc == '')) {
        //验证
        var reg = new RegExp("^[0-9]+(.[0-9]{2})?$");
        if (startSoc != '') {
            if (!reg.test(startSoc)) {
                NotifyWarning("查询开始SOC只能是0~100的数字(可精确到两位小数)!");
                return;
            }
            if (parseFloat(startSoc) > 100) {
                NotifyWarning("查询开始SOC不能大于100!");
                return;
            }
        }
        if (endSoc != '') {
            if (!reg.test(endSoc)) {
                NotifyWarning("查询结束SOC只能是0~100的数字(可精确到两位小数)!");
                return;
            }
            if (parseFloat(endSoc) > 100) {
                NotifyWarning("查询结束SOC不能大于100!");
                return;
            }
        }
        if (endSoc != '' && startSoc != '') {
            if (parseFloat(endSoc) < parseFloat(startSoc)) {
                NotifyWarning("查询开始SOC不能大于查询结束SOC!");
                return;
            }
            if (parseFloat(endSoc) == parseFloat(startSoc)) {
                NotifyWarning("查询开始SOC不能等于查询结束SOC!");
                return;
            }
        }
    }
    SetShowHideSOC(startSoc, endSoc, isClickBtnSearch);

}
//SOC过滤  startSoc：当前Soc开始  endSoc:当前Soc结束  isClickBtnSearch:是否是点击了按钮【查询SOC】进行了过滤 ,0 否 1 是
export function SetShowHideSOC(startSoc, endSoc, isClickBtnSearch) {
    if (isClickBtnSearch == "1") {//只有主动点击按钮查询才重新走cookie
        //1、首先根据cookie里的记录显示和隐藏终端
        GetPageCheckdStatusAndShowByCookie();
    }
    var pztArrObj = Dispatch.curPageAllCtrlAutoID_Arr,
        id = null,
        DQSOC = null,
        float_SocText = null,
        float_StartSoc = null,
        float_EndSoc = null;
    for (var i = 0; i < pztArrObj.length; i++) {
        id = pztArrObj[i];

        //注意：只处理当前页面显示的终端，因为还牵扯按照状态过滤的显示终端
        if ($("#pilldiv_" + id).css("display") != "block")
            continue;//继续下一次循环

        DQSOC = $($("span[name='DQSOC_" + id + "']")[0]).text();//为什么这么写呢，因为加入缩略模式后，按照这样取会有两个对象。
        float_SocText = 0.00;
        if (DQSOC != "--") {//不处理
            DQSOC = DQSOC.substring(0, DQSOC.indexOf('%'));
            float_SocText = parseFloat(DQSOC);
        }
        else {
            if (!(startSoc == '' && endSoc == '')) { //隐藏
                $("#pilldiv_" + id).css("display", "none");
                continue;//继续下一次循环
            }
        }

        if (startSoc != '' && endSoc == '') {
            float_StartSoc = parseFloat(startSoc);
            if (float_StartSoc <= float_SocText) {//显示
                $("#pilldiv_" + id).css("display", "block");
            } else {
                $("#pilldiv_" + id).css("display", "none");
            }
        }
        if (endSoc != '' && startSoc == '') {
            float_EndSoc = parseFloat(endSoc);
            if (float_EndSoc >= float_SocText) {//显示
                $("#pilldiv_" + id).css("display", "block");
            } else {
                $("#pilldiv_" + id).css("display", "none");
            }
        }
        if (endSoc != '' && startSoc != '') {
            float_StartSoc = parseFloat(startSoc);
            float_EndSoc = parseFloat(endSoc);
            if (float_EndSoc >= float_SocText && float_SocText >= float_StartSoc) {//显示
                $("#pilldiv_" + id).css("display", "block");
            } else {
                $("#pilldiv_" + id).css("display", "none");
            }
        }
        if (startSoc == '' && endSoc == '') {
            $("#pilldiv_" + id).css("display", "block");
        }
    }
}
//根据cookie值获取当前页的选中的状态，并将选中的终端显示出来
export function GetPageCheckdStatusAndShowByCookie() {
    /*
                 //1、获取当前页面所有的状态可选框
                 var statusIDArry = GetStatusIDArry();
                 //2、获取cookie里的没有选择的状态，并从当前页面所有的状态可选框把他们过滤掉
                 var tps_curnochecked = localStorage.getItem("tps_curnochecked");//cookie里的没有选择的状态
                 var hideArr = new Array();
                 if (tps_curnochecked != undefined && tps_curnochecked != '') {
                 Dispatch.curNoChecked_Arr = tps_curnochecked;
                 hideArr = Dispatch.curNoChecked_Arr.split(",");
                 for (var i = 0; i < hideArr.length; i++) {
                 if (hideArr[i] != "") {
                 //statusIDArry.remove(hideArr[i]);//移除元素
                 $.each(statusIDArry, function (index, item) {// index是索引值（即下标）   item是每次遍历得到的值；
                 if (item) {
                 if (item==hideArr[i] ) {
                 statusIDArry.splice(index, 1);
                 }
                 }
                 });
                 }
                 }
                 } else {//说明所有的状态都是选中状态

                 }

                 //设定显示
                 var StateType = null;
                 for (var p = 0; p < statusIDArry.length; p++) {
                 StateType = $("#" + statusIDArry[p]).attr("statetype");
                 SetShowHidePillDiv(StateType, true);
                 }
                 //设定隐藏
                 for (var z = 0; z < hideArr.length; z++) {
                 StateType = $("#" + hideArr[z]).attr("statetype");
                 SetShowHidePillDiv(StateType, false);
                 }
                 //*/

    var hideArr = new Array();
    var tps_curnochecked = localStorage.getItem("tps_curnochecked");//cookie里的没有选择的状态
    if (tps_curnochecked != null && tps_curnochecked != "") {
        hideArr = tps_curnochecked.split(",");
    }
    /*
                var showArr = new Array();
                var tps_curchecked = localStorage.getItem("tps_curchecked");//cookie里的选择的状态
                if (tps_curchecked != null && tps_curchecked != "") {
                    showArr = tps_curchecked.split(",");
                }
                //*/
    //设定显示
    var strStateValuesHide = '';
    var StateType = null;
    for (var p = 0; p < hideArr.length; p++) {
        StateType = $("#" + hideArr[p]).attr("statetype");
        strStateValuesHide += Dispatch.StatusDic[StateType].value + ",";
    }
    SetShowHidePillDivForBatch(strStateValuesHide);
}
/*【SOC过滤】结束*/
/*【设置充电时间】开始*/
//根据电站ID获取集控器列表
export function GetCtrlsByStaIDForOneKey() {
    if ($("#hideStaId").val() == "") {
        return;
    }
    $("label[name='lbl_onekey_Sta']").text($("#hideStaName").val());
}
//判断是否有定时器
export function GetTimingOnekeyCharge() {
    //验证是否选择了全部集控器
    var curCtrlId = $("#hideCtrlId").val();
    if (curCtrlId != "") {
        NotifyWarning("请先选择该电站下的全部集控器！");
        return;
    }

    $("#hid_JobId").val("");
    $("#lbl_onekey_time").text("");
    $("#lbl_TimeType").text("");
    //判断是否有了定时器了
    var postData = {
        "StaId": $("#hideStaId").val() //电站
    };
    //"src/vue/dispitch/test/GetTimingOnekeyCharge.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetTimingOnekeyCharge", "POST", postData, function (result) {
        result = str2json(result);
        if (result.state != "1") {
            NotifyWarning(result.errmsg);
            return;
        }
        GetCtrlsByStaIDForOneKey();
        var resData = result.data;
        if (resData.IsExist == "1") {//证明已经有定时器了,进入查看模式
            $("#lbl_onekey_time").text(resData.ChargeTime);
            var timeTypeText = "仅定时一次";
            if (resData.TimeType == "2") {//仅定时一次
                timeTypeText = "长期定时";
            }
            $("#lbl_TimeType").text(timeTypeText);
            $("#hid_JobId").val(resData.JobId);
            $("#handTimeOneKeyShowModal").modal("show");
            $("#btnRemoveTimingOnekeyCharge").removeAttr('disabled');
            $("#btnRemoveTimingOnekeyCharge").text('撤销');
        } else {//没设置定时器
            $("#timepicker_onekey").timepicker("setTime", resData.DefaultTime);
            $("#handTimeOneKeyChargeModal").modal("show");
            $("#btnAddTimingOnekeyCharge").removeAttr('disabled');
            $("#btnAddTimingOnekeyCharge").text('保存');
        }
    });
}
//保存定时器
export function AddTimingOnekeyCharge() {
    //首先验证是否选择 定时类型
    var timeType = $("input[name='TimeRadio']:checked").val();
    if (timeType == undefined) {
        NotifyWarning("请选择定时类型(仅定时一次/长期定时)!");
        return;
    }
    GetClinkIDArray(true);//true代表定时一键充电
    var postData = {
        "filter": JSON.stringify({
            "StaId": $("#hideStaId").val(), //电站
            "CustId": Dispatch.CustomerID,
            "ChargeTime": $("#timepicker_onekey").val(),
            "TimeType": timeType,
            "SecondSource":Dispatch.PageFlag
        })
    };
    $("#btnAddTimingOnekeyCharge").attr('disabled', 'disabled');
    $("#btnAddTimingOnekeyCharge").text('保存中...');
    //"src/vue/dispitch/test/AddTimingOnekeyCharge.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "AddTimingOnekeyCharge", "POST", postData, function (result) {
        result = str2json(result);
        if (result.state != "1") {
            NotifyWarning(result.errmsg);
            return;
        }
        ;
        NotifySuccess("保存成功");
        $("#handTimeOneKeyChargeModal").modal("hide");
        $("#btnAddTimingOnekeyCharge").removeAttr('disabled');
        $("#btnAddTimingOnekeyCharge").text('保存');
    });
    ClearOneKeyChargeAboutArr();//初始化
}
//撤销定时器
export function RemoveTimingOnekeyCharge() {
    var postData = {
        "StaId": $("#hideStaId").val(), //电站
        "JobId": $("#hid_JobId").val()
    };
    $("#btnRemoveTimingOnekeyCharge").attr('disabled', 'disabled');
    $("#btnRemoveTimingOnekeyCharge").text('撤销中...');
    //"src/vue/dispitch/test/RemoveTimingOnekeyCharge.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "RemoveTimingOnekeyCharge", "POST", postData, function (result) {
        result = str2json(result);
        if (result.state != "1") {
            NotifyWarning(result.errmsg);
            return;
        }
        ;
        NotifySuccess("撤销成功");
        $("#handTimeOneKeyShowModal").modal("hide");
        $("#btnRemoveTimingOnekeyCharge").removeAttr('disabled');
        $("#btnRemoveTimingOnekeyCharge").text('撤销');
    });
}
/*【设置充电时间】结束*/
/*【公共计算】开始*/
//js保留2位小数（强制）
export function changeTwoDecimal_f(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}
//计算实际功率占额定总功率的比例
export function CalcGrossPowerProportion() {
    var GrossPower = $("#GrossPower").text();
    var ChargingPower = $("#ChargingPower").text();
    if (ChargingPower == '' || parseFloat(ChargingPower) == 0) {
        $("#div_ChargingPowerLenth").css("width", "0.00%");
        $("#div_GrossPowerLenth").css("width", "0.00%");
        return;
    }
    var myProportion = ((parseFloat(GrossPower) * 1000) / (parseFloat(ChargingPower) * 1000)) * 100;
    myProportion = changeTwoDecimal_f(myProportion);
    $("#div_GrossPowerLenth").css("width", myProportion.toString() + "%");
    $("#div_ChargingPowerLenth").css("width", "100%");
}
/****************************************【汇总界面上状态】开始**********************************************************************/
//汇总界面上状态-前夕
export function GetPageSumValue_Before() {
    ClearJSQuantitySumValue();
}
//汇总界面上状态-后夕
export function GetPageSumValue_End() {
    //for循环结束
    var pileSum = Dispatch.AllSum;
    var chargingCount = Dispatch.Sum_ChargingCount;
    $("#PileSum").text(pileSum);//pileSum
    $("#ChargingSum").text(chargingCount.toString());
    var noChargingSum = (parseInt(pileSum) - parseInt(chargingCount)).toString();
    $("#NoChargingSum").text(noChargingSum);
    MyEcharts.CreatePie(currentEc, chargingCount, noChargingSum);

    SetControlSumValue();
}
//汇总界面上状态-中夕
export function GetPageSumValue_Center(id, state) {
    Dispatch.AllSum++;
    switch (state) {
        case Dispatch.StatusDic["Free"].value:
            Dispatch.freeSum++;
            break;
        case Dispatch.StatusDic["Clink"].value:
        case Dispatch.StatusDic["Switching"].value:
        case Dispatch.StatusDic["Starting"].value:
        case Dispatch.StatusDic["Dischargeing"].value:
            Dispatch.clinkSum++;
            break;
        case Dispatch.StatusDic["Pause"].value:
            Dispatch.PauseSum++;
            break;
        case Dispatch.StatusDic["Using"].value://充电中
        case Dispatch.StatusDic["TrickleCharge"].value://涓流充
            Dispatch.usingSum++;
            break;
        case Dispatch.StatusDic["AlreadyFull"].value:
            Dispatch.AlreadyFullSum++;
            break;
        case Dispatch.StatusDic["FuQiang"].value://副枪
            Dispatch.fuqiangSum++;
            break;
        case Dispatch.StatusDic["WeiZhi"].value://未知
            Dispatch.weizhiSum++;
            break;
        case Dispatch.StatusDic["Recovering"].value://恢复中
            Dispatch.recoveringSum++;
            break;
        case Dispatch.StatusDic["Away"].value://离网
        case "null":
        case "":
            Dispatch.awaySum++;
            break;
        case Dispatch.StatusDic["PileFault"].value:
            Dispatch.pileFaultSum++;
            break;
        case Dispatch.StatusDic["ChargerFault"].value:
            Dispatch.chargerFaultSum++;
            break;
        case Dispatch.StatusDic["BMSFault"].value:
            Dispatch.bmsFaultSum++;
            break;
        case Dispatch.StatusDic["ConnectFault"].value:
            Dispatch.connectFaultSum++;
            break;
        case Dispatch.StatusDic["LoadDispatch"].value://等待调度
            Dispatch.LoadDispatchSum++;
            break;
    }
    // 充电中 排队中 涓流充 都属于充电中
    if ($("#statusName_" + id).text() == Dispatch.StatusDic["Using"].text
        || $("#statusName_" + id).text() == Dispatch.StatusDic["TrickleCharge"].text) {
        Dispatch.Sum_ChargingCount++;
    }
}
/****************************************【汇总界面上状态】结束**********************************************************************/
//屏幕自适应
export function PageBodyResize() {
    // $(".widget-buttons").height("25px");//新增，针对六个功能按钮，设置高度25px,原高度36px
    // $("#allbuttons").css("margin-top", "-10px");//设置6个按钮style


    if (MyEcharts.datachart_PileFunnel != undefined) {
        MyEcharts.datachart_PileFunnel.resize();//返回当前对象本身
    }


    var pageBodyWidth = $("#page-body").css("width");
    pageBodyWidth = pageBodyWidth.substring(0, pageBodyWidth.length - 2);
    /*
                 *页面初始化化oldPagebodyWidth是小屏的时候，不需要处理
                 * 页面初始化oldPagebodyWidth是大屏的时候，需要移除掉
                 //*/
    if (oldPagebodyWidth == 0) {
        oldPagebodyWidth = pageBodyWidth;
        if (oldPagebodyWidth <= 735) {//小屏
            ifNeedRemovemargintop0 = false;
        } else {
            ifNeedRemovemargintop0 = true;
        }
    }
    if (ifNeedRemovemargintop0) {//如果不是页面加载
        $("#page-body").removeClass("margintop0");
    }

    //自适应右边显示的【帮助】【缩略模式】【密码修改】按钮样式
    if (pageBodyWidth > 1160) {//683
//                    if($("#ddlCtrl").width()>=105||$("#div_search").width()<1095){
//                        $("#div_rightButton").css("float", "right");
//                        $("#div_rightButton").css("margin-top", "25px");
//                    }else{
//                        $("#div_rightButton").css("float", "right");
//                        $("#div_rightButton").css("margin-top", "5px");
//                    }
        $("#div_rightButton").css("float", "right");
        $("#div_rightButton").css("margin-top", "5px");
    } else if (pageBodyWidth >= 683 && pageBodyWidth <= 1160) {
        $("#div_rightButton").css("float", "right");
        $("#div_rightButton").css("margin-top", "-5px");//组合之前是-8
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
//                if (pageBodyWidth >= 683) {//683
////                    if($("#ddlCtrl").width()>=105||$("#div_search").width()<1095){
////                        $("#div_rightButton").css("float", "right");
////                        $("#div_rightButton").css("margin-top", "25px");
////                    }else{
////                        $("#div_rightButton").css("float", "right");
////                        $("#div_rightButton").css("margin-top", "5px");
////                    }
//                    $("#div_rightButton").css("float", "right");
//                } else {
////                    if($("#ddlCtrl").width()>=105){
////                        $("#div_rightButton").css("float", "none");
////                        $("#div_rightButton").css("margin-top", "25px");
////                    }else{
////                        $("#div_rightButton").css("float", "none");
////                        $("#div_rightButton").css("margin-top", "25px");
////                    }
//                    $("#div_rightButton").css("float", "none");
//
//                }

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
        if (pageBodyWidth >= 976 && pageBodyWidth <= 1370) {//1370  1442
            $(".myPilldivInfo").css("width", "50%");
            $(".pilldivInfoLeft").css("width", "43%");//43%
            $(".pilldivInfoRight").css("width", "43%");
            $(".pilldivS").css("height", (506 + addNumber).toString() + "px");
            $(".pillDivCoverWH").css("height", (601 + addNumber).toString() + "px");
            $("div[flag='lockDivLeft']").css("width", "70%");
            $("div[flag='lockDivRight']").css("width", "30%");
        } else if (pageBodyWidth >= 1370) {//1370  1442
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
    if (pageBodyWidth > 1680) {//最大模式
        $(".div_mainRight").css("width", "30%");//33.33333333%
        $(".div_mainRight").css("padding-left", "15px");
        $(".div_mainRight").css("margin", "");

        $(".div_mainLeft").css("width", "70%");//66.66666667%
        $(".div_mainLeft").css("height", div_mainLeft_width_big);

        $(".pilldivInfoLeftForCheckBox").css("padding-left", "30px");//30

        $("#divComputerCheckButton").css("display", "block");//状态checkbox
        $("#divHr").css("display", "block");//竖线

        $(".qmain2").css("display", "none");//手机屏幕状态 ，右侧额定总功率自成一行，饼图自成一行

        $(".PileNumSty").css("width", "185px");//左侧终端个数表
        $(".dataPielChart").css("width", "255px");//左侧饼图

    }
    else if (1445 <= pageBodyWidth && pageBodyWidth <= 1680) {//右侧额定总功率 缩小，饼图扩大1420
        $(".div_mainRight").css("width", "20%");//24%
        $(".div_mainRight").css("padding-left", "15px");
        $(".div_mainRight").css("margin", "");

        $(".div_mainLeft").css("width", "80%");//76%
        $(".div_mainLeft").css("height", div_mainLeft_width_big);

        $(".pilldivInfoLeftForCheckBox").css("padding-left", "21px");

        $("#divComputerCheckButton").css("display", "block");//状态checkbox
        $("#divHr").css("display", "block");//竖线

        $(".qmain2").css("display", "none");//手机屏幕状态 ，右侧额定总功率自成一行，饼图自成一行

        $(".PileNumSty").css("width", "185px");//左侧终端个数表
        $(".dataPielChart").css("width", "255px");//左侧饼图
    } else if (1175 < pageBodyWidth && pageBodyWidth < 1445) {//1072
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
    else if (620 < pageBodyWidth && pageBodyWidth <= 1175) { //饼图和右侧状态checkbox都自成一行1072
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
    if ($(".img-responsive").length == 0 && MyEcharts.datachart_PileFunnel != undefined) {
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
        MyEcharts.datachart_PileFunnel.setOption(series);
        //datachart_PileFunnel.setSeries(series);//设置图例数据
    }
    //alert(pageBodyWidth);

    //*/
    ValidateIsShowPowerValue();

    $("div[class='divcover pillDivCoverWH']").css("width", $("div[class='pilldiv pillDivCoverWH']").css("width"));
}

//屏幕自适应---是否适应APP调度???
export function PageBodyResizeForApp() {
    //$(".widget-buttons").height("25px");//新增，针对六个功能按钮，设置高度25px,原高度36px
    //$("#div_Button").css("margin-top","-10px");//设置6个按钮style
    if (MyEcharts.datachart_PileFunnel != undefined) {
        MyEcharts.datachart_PileFunnel.resize();//返回当前对象本身
    }


    var pageBodyWidth = $("#page-body").css("width");
    pageBodyWidth = pageBodyWidth.substring(0, pageBodyWidth.length - 2);
    /*
    *页面初始化化oldPagebodyWidth是小屏的时候，不需要处理
    * 页面初始化oldPagebodyWidth是大屏的时候，需要移除掉
   //*/
    /*
    if(oldPagebodyWidth==0){
        oldPagebodyWidth=pageBodyWidth;
        if(oldPagebodyWidth<=735){//小屏
            ifNeedRemovemargintop0=false;
        }else{
            ifNeedRemovemargintop0=true;
        }
    }
    if(ifNeedRemovemargintop0){//如果不是页面加载
        $("#page-body").removeClass("margintop0");
    }//*/

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
    if ($(".img-responsive").length == 0 && MyEcharts.datachart_PileFunnel != undefined) {
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
        MyEcharts.datachart_PileFunnel.setOption(series);
        //datachart_PileFunnel.setSeries(series);//设置图例数据
    }
    //alert(pageBodyWidth);

    //*/
    ValidateIsShowPowerValue();

    $("div[class='divcover pillDivCoverWH']").css("width", $("div[class='pilldiv pillDivCoverWH']").css("width"));
}

/*【模式选择】开始*/
//模式选择 缩略模式/详情模式
export function ModelCheck() {
    var btnName = $("#btnModelCheck").text();
    if (btnName == "缩略模式") {
        $("#btnModelCheck").text("切换中...");
        $("#btnModelCheck").attr("disabled", "disabled");
        Dispatch.curModelCheck = "2";
    } else if (btnName == "详情模式") {
        $("#btnModelCheck").text("切换中...");
        $("#btnModelCheck").attr("disabled", "disabled");
        Dispatch.curModelCheck = "1";
    }

    //重新加载终端列表
    //GetPileData(Dispatch.CtrlAddressMap, true); -----liujia
    GetPileData(Dispatch.CtrlAddressMap, true,true);

}
//转换成功后，设置模块按钮的样式
export function SetBtnModelCheckForSuccess() {
    $("#btnModelCheck").removeAttr("disabled");
    if (Dispatch.curModelCheck == "2") {//详情模式
        $("#btnModelCheck").text("详情模式");
    } else if (Dispatch.curModelCheck == "1") {//缩略模式
        $("#btnModelCheck").text("缩略模式");
    } else {
        //默认是详情模式
        Dispatch.curModelCheck = "1";
        //NotifyWarning("获取详情/缩略模式错误!");
    }
    localStorage.setItem("tps_ModelCheck", Dispatch.curModelCheck);
}
//根据客户端数据保存的模式控制按钮样式
export function GetModelCheckForLocalStorage() {
    var curModelCheck = localStorage.getItem("tps_ModelCheck");
    if (curModelCheck == null || curModelCheck == "1") {
        Dispatch.curModelCheck = "1";//默认是详情模式
        $("#btnModelCheck").text("缩略模式");
    }
    else {//其次为 缩略模式
        Dispatch.curModelCheck = "2";
        $("#btnModelCheck").text("详情模式");
    }
}
//获取当前选择的模式是否是详情模式(是true，否false)
export function IsDetailsModel() {
    if (Dispatch.curModelCheck == "1") {//详情模式
        return true;
    } else if (Dispatch.curModelCheck == "2") {//缩略模式
        return false;
    } else {//默认为 详情模式
        Dispatch.curModelCheck = "1";
        $("#btnModelCheck").text("缩略模式");
        $("#btnModelCheck").removeAttr("disabled");
        return true;
    }
}
//显示查看详情 myModalLabelTitle:标题  data：维护数据 isShow：是否弹出详情页
export function ShowDetailModal(obj) {
    $("#divDetailRow").html($(obj).parent().find("div[name='DetailDataForBreviary']").html());
    dispatch_PayCard.ShowDIYModal($("#ShowDetailModal"));
}
/*【模式选择】结束*/
/*【本地存储】开始*/
//设置超时的本地存储
export function SetOverdueLocalStorage() {
    var time_localstorage_id = "tps_time";
    var time_localstorage = localStorage.getItem(time_localstorage_id);
    if (time_localstorage != null) {
        time_localstorage = JSON.parse(time_localstorage);
        var curStorageTime = new Date(time_localstorage);
        var curDate = new Date();
        var jgTime = curDate.getTime() - curStorageTime.getTime();
        if (jgTime >= Dispatch.LocalStorageInvalidTime) {//本地存储失效
            //首先保存原先的值
            var tps_curnochecked = localStorage.getItem("tps_curnochecked");
            var tps_ModelCheck = localStorage.getItem("tps_ModelCheck");
            var staData = localStorage.getItem("sta.data");
            var tps_cursta = localStorage.getItem("tps_cursta_" + Dispatch.CustomerID);
            var tps_cursta_name = localStorage.getItem("tps_cursta_name_" + Dispatch.CustomerID);
            localStorage.clear();//清空所有
            //清空后重新赋值
            if (tps_curnochecked != null)
                localStorage.setItem("tps_curnochecked", tps_curnochecked);
            if (tps_ModelCheck != null)
                localStorage.setItem("tps_ModelCheck", tps_ModelCheck);
            if (staData != null)
                localStorage.setItem("sta.data", staData);
            if (tps_cursta != null)
                localStorage.setItem("tps_cursta_" + Dispatch.CustomerID, tps_cursta);
            if (tps_cursta_name != null)
                localStorage.setItem("tps_cursta_name_" + Dispatch.CustomerID, tps_cursta_name);
            localStorage.setItem(time_localstorage_id, JSON.stringify(new Date()));

            //数据清空后，查询当前电站是否还有权限
            var thisStaID = tps_cursta;
            var postData =
                {
                    "filter": JSON.stringify({
                        "thisStaID": thisStaID,
                        "page": "1",
                        "rows": "999999999",
                    })
                };
            //给帮助赋值（此处是为了验证强制刷新后之前的默认电站是否还有权限）
            SetStationHelpValFirstLoad(postData);
        } else {
            //页面强制刷新加载时给电站帮助赋值
            SetStationHelpVal();
        }
    } else {
        localStorage.setItem(time_localstorage_id, JSON.stringify(new Date()));
        //数据清空后，查询当前电站是否还有权限
        var tps_cursta = localStorage.getItem("tps_cursta_" + Dispatch.CustomerID);
        if (tps_cursta == null)
            tps_cursta = "tps_cursta";
        var postData =
            {
                "filter": JSON.stringify({
                    "thisStaID": tps_cursta,
                    "page": "1",
                    "rows": "999999999",
                })
            };
        //给帮助赋值（此处是为了验证强制刷新后之前的默认电站是否还有权限）
        SetStationHelpValFirstLoad(postData);
    }
}
/*【本地存储】结束*/
/*【公共计算】 开始*/
//页面强制刷新加载时给电站帮助赋值
export function SetStationHelpVal() {
    isOneRecord();//是否只有一条记录，按钮禁用
    var tps_cursta_ = "tps_cursta_" + Dispatch.CustomerID;//登录客户的上次选择的电站ID
    var tps_cursta_name_ = "tps_cursta_name_" + Dispatch.CustomerID;//登录客户的上次选择的电站名称
    var localStaID = localStorage.getItem(tps_cursta_);
    var localStaName = localStorage.getItem(tps_cursta_name_);
    if (localStaID != null) {//存在本地存储
        $("#hideStaId").val(localStaID);
        $("#hideStaName").val(localStaName);
        $("#hidePowerStationId").val(localStaID);
        $("#PowerStationName").val(localStaName);
        Dispatch.isChangSta = false;//----liujia
        GetCtrlsByStaID();//加载集控器
    } else {//重新配置值
        var postData =
            {
                "filter": JSON.stringify({
                    "thisStaID": "thisStaID",
                    "page": "1",
                    "rows": "999999999",
                })
            };
        //给帮助赋值（此处是为了验证强制刷新后之前的默认电站是否还有权限）
        SetStationHelpValFirstLoad(postData);
    }

}
export function SetStationHelpValFirstLoad(postData) {
    isOneRecord();//是否只有一条记录，按钮禁用
    ///"src/vue/dispitch/test/CheckStaByCustID.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "CheckStaByCustID", "POST", postData, function (result) {
        result = str2json(result);
        if (result.data == "11") {//说明当前用户已经没有任何电站的权限了,需要清空缓存
            //设置缓存
            localStorage.removeItem("tps_cursta_" + Dispatch.CustomerID);//当前选中的电站ID
            localStorage.removeItem("tps_cursta_name_" + Dispatch.CustomerID);//当前选中的电站名称
            //设置帮助框值
            $("#hideStaId").val("");
            $("#hideStaName").val("");
            $("#hidePowerStationId").val("");
            $("#PowerStationName").val("");
            return;
        } else if (result.state == "1" && result.data != "11") {
            //说明之前的电站已经无权限查询了，此时给帮助框重新赋值有权限的电站之一（针对于30min后页面刷新与首次加载无缓存情况）
            var newStaID = result.data.ID;
            var newStaName = result.data.Name;
            //设置缓存
            localStorage.setItem("tps_cursta_" + Dispatch.CustomerID, newStaID);//当前选中的电站ID
            localStorage.setItem("tps_cursta_name_" + Dispatch.CustomerID, newStaName);//当前选中的电站名称
            //设置帮助框值
            $("#hideStaId").val(newStaID);
            $("#hideStaName").val(newStaName);
            $("#hidePowerStationId").val(newStaID);
            $("#PowerStationName").val(newStaName);
            Dispatch.isChangSta = false;//----liujia
            GetCtrlsByStaID();//加载集控器
        } else {
            NotifyWarning("获取电站信息失败！");
        }
    }, null, null);
}
//获取当前页面所有的状态可选框,以后增加新的状态的时候不要忘了添加
export function GetStatusIDArry() {
    /*
                 var statusIDArry = new Array();
                 var statusObjArr = $("#divComputerCheckButton div[name='divCheckBox']");
                 for (var z = 0; z < statusObjArr.length; z++) {
                 statusIDArry.push($(statusObjArr[z]).attr("id"));
                 }
                 return statusIDArry;
                 //*/
    var statusIDArry = Dispatch.allChecksArr;
    return statusIDArry;
}
/*****************************【刷新频率帮助】开始*************************************************/
export function search() {
    ShowRefreshData();
}
export function reset() {
    $("#Pile_keywords").val(null);
    ShowRefreshData();
}
//绑定添加终端相关事件
export function ShowRefreshData() {
    var tableName = "RefreshTimeTable";

    //选中已授权的数据
    $("#" + tableName).off("BODY_RENDER_COMPLETE").on("BODY_RENDER_COMPLETE", function () {
        var hidInputs = $("#gridBodyDiv_" + tableName).find("input[name='hideName']");//hideName就是要刷新的频率值（秒）
        //var hidInputs = $("#"+tableName).find("input[name='hideName']");
        for (var i = 0; i < hidInputs.length; i++) {
            if (hidInputs[i].value == $("#hideRefreshRate").val())
                $(hidInputs[i]).parent().parent()[0].click();
        }
    });

    var postData = {
        'filter': {
            "FieldName": "Name",
            "FieldValue": $("#Pile_keywords").val(),
            "FilterKey": "",
            "SetId": "T612"
        }
    };
    $("#" + tableName).datagrid17({
        url: ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetCodeItemHelp",
        tableType: "single",
        showPageSelect: true,
        resizeCol: false,
        showPagination: true,
        autoHeight: false,
        success: function (data) {
            //数据未加载前的data操作
        },
        hiddenInps: [
            {inpNm: "hideCode", inpValue: "Code"},
            {inpNm: "hideName", inpValue: "Name"}
        ],
        trclick: function (tr) {

            var $tr = $(tr);
            var isChecked = $tr.find("input.keyword:checked").length > 0;
            var checkedId = $tr.find("input[name='hideCode']").val();
            var checkedName = $tr.find("input[name='hideName']").val();
            if (!isChecked) {//是要选中
                $("#hidRefreshTime").val(checkedId);
                $("#hidRefreshTimeValue").val(checkedName);
                Dispatch.curRefreshTime = checkedName;
            } else { //取消选中的从数组中移除
                $("#hidRefreshTime").val("");
            }
        }
    }).data('bs.datagrid17').searchByFilter({searchCond: postData});


    setTimeout(this.reTable, 300);//150


}
//设置帮助列表宽度
export function reTable() {
    var tableName = "RefreshTimeTable";
    $("#gridHeaderDiv_" + tableName).css("width", "570px");

    $("#gridHeaderDiv_" + tableName + " table").css("width", "553px");

    $("#gridBodyDiv_" + tableName).css("width", "570px");

    $("#gridBodyDiv_" + tableName + " table").css("width", "553px");

    $("#RefreshTimeModal").modal("show");
}
//保存刷新时间
export function SaveRereshTime() {
    $("#btnSaveRereshTime").attr("disabled", "disabled");
    $("#btnSaveRereshTime").text("保存中...");
    var selRefreshTime = $("#hidRefreshTime").val();
    if (selRefreshTime != "") {//说明选择了，保存数据并修改页面的刷新时间
        var postData = {
            "flag": "RefreshTime",
            "newPass": "",
            "refreshTime": selRefreshTime
        };
        //"/src/vue/dispitch/test/frequencyRefresh.json"
        getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "UpdatePassWord", "POST", postData, function (result) {
            result = str2json(result);
            $("#btnSaveRereshTime").removeAttr("disabled");
            $("#btnSaveRereshTime").text("确定");
            if (result.state != "1") {
                NotifyWarning(result.errmsg);
                return;
            }
            $("#RefreshTimeModal").modal("hide");
            var newRefreshTimeValue = $("#hidRefreshTimeValue").val();
            $("#span_RefreshTime").text(newRefreshTimeValue);
            //最重要的是修改这个值，刷新频率是按照这个值来的
            $("#hideRefreshRate").val(newRefreshTimeValue);
            startTimer();
            NotifySuccess("保存刷新频率成功");
        });
    } else {
        $("#btnSaveRereshTime").removeAttr("disabled");
        $("#btnSaveRereshTime").text("确定");
    }
}
/*****************************【刷新频率帮助】结束*************************************************/
/*****************************【arr_OperatingPile（正在操作的终端数据）】开始*************************************************/
/* addId：新增的ID，overTimeConfig：超时配置(毫秒)*/
export function add_arr_OperatingPile(addId, overTimeConfig) {
    var isExist = false;
    $.each(arr_OperatingPile, function (index, item) {
        // index是索引值（即下标）   item是每次遍历得到的值；
        if (item) {
            if (item.ID == addId) {
                isExist = true;
            }
        }
    });
    if (!isExist) {
        arr_OperatingPile.push({
            "ID": addId,
            "CreateTime": JSON.stringify(new Date()),
            "OverTimeConfig": overTimeConfig
        });
    }
}
//移除数据里的项
export function remove_arr_OperatingPile(removeId) {
    $.each(arr_OperatingPile, function (index, item) {
        // index是索引值（即下标）   item是每次遍历得到的值；
        if (item) {
            if (item.ID == removeId) {
                arr_OperatingPile.splice(index, 1);
            }
        }
    });
}
//操作中的终端请求是否超时，如果超时，则主动将数组移除他
//这个方法调用实际是每次自动刷新的时候,即InitRealTimeDataPillsList方法
export function isOvertimeForOperatingPile() {
    var arr_remove = [], createTimeJSON = null, createTime = null;
    for (var i = 0; i < arr_OperatingPile.length; i++) {
        if (arr_OperatingPile[i].CreateTime || arr_OperatingPile[i].OverTimeConfig) {
            createTimeJSON = JSON.parse(arr_OperatingPile[i].CreateTime);
            createTime = new Date(createTimeJSON);
            var curDate = new Date();
            var jgTime = curDate.getTime() - createTime.getTime();
            if (jgTime >= arr_OperatingPile[i].OverTimeConfig) {//超时
                arr_remove.push(arr_OperatingPile[i]);
            }
        } else {
            arr_remove.push(arr_OperatingPile[i]);
        }
    }
    for (var j = 0; j < arr_remove.length; j++) {
        remove_arr_OperatingPile(arr_remove[j].ID);
    }
}
/*****************************【arr_OperatingPile（正在操作的终端数据）】结束*************************************************/
/*****************************【地锁操作】开始*************************************************/
export function add_arr_pileForLock(id) {
    var isExist = false;
    for (var i = 0; i < arr_pileForLock.length; i++) {
        if (arr_pileForLock[i] == id) {
            isExist = true;
            break;
        }
    }
    if (!isExist) {
        arr_pileForLock.push(id);
    }
}
export function remove_arr_pileForLock(id) {
    $.each(arr_pileForLock, function (index, item) {
        // index是索引值（即下标）   item是每次遍历得到的值；
        if (item) {
            if (item == id) {
                arr_pileForLock.splice(index, 1);
            }
        }
    });
}
//升/降地锁
export function PutLockInfo(obj) {
    var autoId = $(obj).attr("autoid");
    var pileCode = $(obj).attr("PileCode");
    var iLockStateCode = $(obj).attr("iLockStateCode");//原先的地锁状态
    var oldBtnText = $(obj).text();

    //增加界面数组对象
    add_arr_pileForLock(autoId);

    var operateType = "";
    var warnText = "";
    var warnBtnText = "";
    switch (iLockStateCode) {
        case "0"://地锁升起状态
        case 0://地锁升起状态
            operateType = "down";
            warnText = "降下地锁";
            warnBtnText = "降下中...";
            break;
        case "1"://地锁降下
        case 1://地锁降下
            operateType = "up";
            warnText = "升起地锁";
            warnBtnText = "升起中...";
            break;
        default://故障或离网
            break;
    }
    var postData = {
        "PileCode": pileCode, //电站
        "OperateType": operateType,// up down
        "CustomerID": Dispatch.CustomerID,

    };

    $(obj).attr("disabled", "disabled");
    $(obj).text(warnBtnText);
    var retryCount = 0;//重试次数,要求重试三次
    //"src/vue/dispitch/test/PutLockInfo.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "PutLockInfo", "POST", postData, function (result) {
        result = str2json(result);
        if (result.state != "1") {
            //还原
            remove_arr_pileForLock(autoId);
            $(obj).text(oldBtnText);
            $(obj).removeAttr("disabled");
            NotifyWarning(result.errmsg);
            return;
        }
        ;
        GetLockStatus(iLockStateCode, postData, autoId, retryCount, warnText, obj);
    });
}
export function GetLockStatus(old_iLockStateCode, postData, autoId, retryCount, warnText, obj) {
    retryCount++;
    if (retryCount > 10) {
        //还原
        remove_arr_pileForLock(autoId);
        $(obj).removeAttr("disabled");
        //GetRealTimeData();//重新刷新数据吧
        GetRealTimeData(true);//---liujia
        return;
    }
    //"src/vue/dispitch/test/GetLockStatus.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetLockStatus", "POST", postData, function (result) {
        result = str2json(result);
        if (result.state != "1") {
            //还原
            remove_arr_pileForLock(autoId);
            $(obj).removeAttr("disabled");
            //GetRealTimeData();//重新刷新数据吧---liujia
            GetRealTimeData(true);
            NotifyWarning(result.errmsg);
            return;
        }

        var data = result.data;
        if (data != null) {//查到状态了
            if (data.iLockStateCode != old_iLockStateCode) {//说明状态变了
                remove_arr_pileForLock(autoId);
                controlLockStatusView(autoId, data);
                NotifySuccess(warnText + "成功");
                $(obj).removeAttr("disabled");
            } else {//状态没变，继续
                window.setTimeout(function () {
                    GetLockStatus(old_iLockStateCode, postData, autoId, retryCount, warnText, obj);
                }, 2000);
            }
        }
    });
}
/*
             * 详情模式下控制地锁样式显示
             * id:界面终端对象id
             * lockObj：地锁对象
             */
export function controlLockStatusView(id, lockObj) {
    if ($("#div_ParkStateName_" + id).length == 0)
        return;

    if (lockObj.ParkStateName == null || lockObj.ParkStateName == "") {
        //str += '<div id="div_ParkStateName_' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">车位未知</div> &nbsp;&nbsp;';
        lockObj.ParkStateName = "车位未知";
    }
    if (lockObj.LockStateName == null || lockObj.LockStateName == "") {
        //str += '<div id="div_LockStateName_' + currentInitPillObj.AutoID + '"   class="lockStuts navbar-toggleColorForGL">地锁离网</div> ';
        lockObj.LockStateName = "地锁离网";
        lockObj.iLockStateCode = 2;

    }
    //地锁显示
    $("#div_ParkStateName_" + id).html(lockObj.ParkStateName);//车位空闲状态
    $("#div_LockStateName_" + id).html(lockObj.LockStateName);//地锁状态名称

    if (ifLock) {
        if (lockObj.LockStateName == null || lockObj.LockStateName == "") {
            $("#div_lock_" + id).css("display", "none");
        }
    }

    switch (lockObj.iLockStateCode) {
        case "0"://地锁升起状态
        case 0://地锁升起状态
            $("#div_lock_" + id).css("display", "block");
            $("#btn_lock_" + id).text("降下地锁");
            $("#div_lockImg_" + id).addClass("lockImgForRise");
            $("#div_lockImg_" + id).removeClass("lockImgForDrop");
            break;
        case "1"://地锁降下
        case 1://地锁降下
            $("#div_lock_" + id).css("display", "block");
            $("#btn_lock_" + id).text("升起地锁");
            $("#div_lockImg_" + id).addClass("lockImgForDrop");
            $("#div_lockImg_" + id).removeClass("lockImgForRise");
            break;
        default://故障或离网
            $("#div_lock_" + id).css("display", "none");
            break;
    }

    $("#btn_lock_" + id).attr("iLockStateCode", lockObj.iLockStateCode);
}
/*
            * 缩略模式下控制地锁样式显示
            * id:界面终端对象id
            * lockObj：地锁对象
            */
export function controlLockStatusViewForAbbreviationsModel(id, lockObj) {
    if ($("#div_ParkStateName_2" + id).length == 0)
        return;

    if (lockObj.ParkStateName == null || lockObj.ParkStateName == "") {
        //str += '<div id="div_ParkStateName_' + currentInitPillObj.AutoID + '"  class="lockStuts_Car navbar-toggleColorForGL">车位未知</div> &nbsp;&nbsp;';
        lockObj.ParkStateName = "车位未知";
    }
    if (lockObj.LockStateName == null || lockObj.LockStateName == "") {
        //str += '<div id="div_LockStateName_' + currentInitPillObj.AutoID + '"   class="lockStuts navbar-toggleColorForGL">地锁离网</div> ';
        lockObj.LockStateName = "地锁离网";
    }

    //地锁显示
    $("#div_ParkStateName_2" + id).html(lockObj.ParkStateName);//车位空闲状态
    $("#div_LockStateName_2" + id).html(lockObj.LockStateName);//地锁状态名称

    if (ifLock) {
        if (lockObj.LockStateName == null || lockObj.LockStateName == "") {
            $("#div_lock_2" + id).css("display", "none");
        }
    }

    switch (lockObj.iLockStateCode) {
        case "0"://地锁升起状态
        case 0://地锁升起状态
            $("#div_lock_2" + id).css("display", "block");
            $("#div_lockImg_2" + id).addClass("lockImgForRise");
            $("#div_lockImg_2" + id).removeClass("lockImgForDrop");
            break;
        case "1"://地锁降下
        case 1://地锁降下
            $("#div_lock_2" + id).css("display", "block");
            $("#div_lockImg_2" + id).addClass("lockImgForDrop");
            $("#div_lockImg_2" + id).removeClass("lockImgForRise");
            break;
        default://故障或离网
            $("#div_lock_2" + id).css("display", "none");
            break;
    }
}
/*****************************【地锁操作】结束*************************************************/









/*【根据选中状态控制终端显示或隐藏】结束*/
//设置刷新按钮的是否禁用
export function SetHandRefreshDisabledStatus(isDisabled, isNeedShowLoading) {
    var $this = $("#handRefresh");
    if (isDisabled) {
        $this.text("刷新中...");
        $this.attr("disabled", "disabled");
        if (isNeedShowLoading != undefined && isNeedShowLoading == false) {
        } else {
            $("#loadingToast").show(); //针对APP充电订单管理界面的
        }
    } else {
        $this.text("手动刷新");
        $this.removeAttr("disabled");
        $("#loadingToast").hide();
    }
}



export function StatusObj(text, value, checkedStyle, noCheckedStyle) {
    this.text = text;//文本
    this.value = value;//值
    this.checkedStyle = checkedStyle;//选中时显示样式
    this.noCheckedStyle = noCheckedStyle;//未选中时显示样式
}

export var Dispatch = {
    isChangSta : true,//是否是第一次调用根据电站绑定集控的函数，默认是；电站是否切换，默认为未切换(这)
    isExistOperationLock: false,//是否存在地锁
    curModelCheck: "",//模式选择  1 详情 2 缩略
    curClientTime: '', //当前客户端页面的时间
    LocalStorageInvalidTime: 1800000,//本地存储失效时间(毫秒),默认30分钟(1800000)
    isLoadPage: true,//是否页面加载，true是 false否
    //状态字典  【EditBy shaocx,2016-01-19】
    StatusDic: {
        "All": new StatusObj("全选", "00", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "Away": new StatusObj("离网", "01", "navbar-toggleColor statecolorZChecked", "navbar-toggleColor statecolorZ"),
        "Free": new StatusObj("空闲", "02", "navbar-toggleColor statecolorKChecked", "navbar-toggleColor statecolorK"),
        "Clink": new StatusObj("已插枪", "03", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "AlreadyFull": new StatusObj("已充满", "04", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "Pause": new StatusObj("暂停", "05", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "Using": new StatusObj("充电中", "06", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "TrickleCharge": new StatusObj("涓流充", "07", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "PileFault": new StatusObj("终端故障", "08", "navbar-toggleColor statecolorLChecked", "navbar-toggleColor statecolorL"),
        //下面三个状态归纳于 【已插枪】状态
        "Switching": new StatusObj("切换中", "09", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "Starting": new StatusObj("启动中", "10", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "Dischargeing": new StatusObj("放电中", "11", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "ChargerFault": new StatusObj("充电机故障", "12", "navbar-toggleColor statecolorLChecked", "navbar-toggleColor statecolorL"),
        "BMSFault": new StatusObj("BMS故障", "13", "navbar-toggleColor statecolorLChecked", "navbar-toggleColor statecolorL"),
        "ConnectFault": new StatusObj("连接故障", "14", "navbar-toggleColor statecolorLChecked", "navbar-toggleColor statecolorL"),
        "LoadDispatch": new StatusObj("等候调度", "15", "navbar-toggleColor statecolorZChecked", "navbar-toggleColor statecolorZ"),
        "FuQiang": new StatusObj("副枪", "16", "navbar-toggleColor statecolorYChecked", "navbar-toggleColor statecolorY"),
        "WeiZhi": new StatusObj("未知", "17", "navbar-toggleColor statecolorZChecked", "navbar-toggleColor statecolorZ"),
        "Recovering": new StatusObj("恢复中", "18", "navbar-toggleColor statecolorZChecked", "navbar-toggleColor statecolorZ")
    },
    //状态按钮字典  【EditBy shaocx,2016-08-13】
    StatusButtonArray: new Array("replyCharge_", "endCharge_", "plugGrab_", "baGrab_", "timeout_", "canntuse_", "setModeStrategy_", "loadDispatch_"),
    //界面上所有的checkbox状态集合
    allChecksArr: new Array("div_Free", "div_Pause", "div_Away", "div_FuQiang", "div_LoadDispatch", "div_Clink", "div_Using", "div_AlreadyFull", "div_WeiZhi",
        "div_PileFault", "div_BMSFault", "div_ConnectFault", "div_ChargerFault", "div_Recovering"),
    PageFlag: "",//页面标识
    CustomerID: "", //当前登录用户所属的客户ID
    CtrlAddressMap: "",//当前集控器地址集合
    All_CtrlAddressMap: "",//当前集控器地址集合
    curPillCode: "",//当前选择充电的终端编号
    curAutoID: "",//当前选择的终端对象的ID（是集控器+终端集合的ID，用于标识控件的）
    /**************************【界面个数】开始*******************************/
    //所有状态个数
    AllSum: 0,
    //汇总正在充电中的个数，用于汇总
    Sum_ChargingCount: 0,
    //空闲个数
    freeSum: 0,
    //请插枪个数
    clinkSum: 0,
    //使用中个数
    usingSum: 0,
    //离网个数
    awaySum: 0,
    //终端故障个数
    pileFaultSum: 0,
    //充电机故障个数
    chargerFaultSum: 0,
    //BMS故障个数
    bmsFaultSum: 0,
    //连接故障个数
    connectFaultSum: 0,
    //已充满个数
    AlreadyFullSum: 0,
    //涓流充个数
    TrickleChargeSum: 0,
    //暂停个数
    PauseSum: 0,
    //等待调度个数
    LoadDispatchSum: 0,
    //副枪个数
    fuqiangSum: 0,
    //未知个数
    weizhiSum: 0,
    //恢复中个数
    recoveringSum: 0,
    /**************************【界面个数】结束*******************************/
    //【EditBy shaocx,2016-01-20】
    curNoChecked_Arr: "",//当前页面没有选择的状态数组，用于记录Cookie，便于下次刷新保存
    curPageAllCtrlAutoID_Json: {},//当前页面上的终端ID JSON对象
    curPageAllCtrlAutoID_Arr: new Array(), //当前页面上的终端ID 数组对象
    //【EditBy shaocx,2015-12-22】
    ChargGroupPileObject_ArrForOneKeyCharge: new Array(),//页面上属于群充模式的终端对象,用于一键充电
    /**************************一键充电*******************************/
    IsClickOneKeyCharge: false,//是否点击了一键充电，如果点击了，则延迟60秒刷新页面
    Arr_AllClinkAutoID: new Array(),//界面上状态为【已插枪】的ID数组,也就是一键充电的总数量数组
    Json_AllClinkAutoID: {},//一键充电的ID对象，对象名是ID，值为Success或Failure（表示一键充电成功或失败）
    Init: "Init",//初始字符串
    Success: "Success",//成功字符串
    Failure: "Failure",//失败字符串
    Starting: "Starting",//启动中字符串
    ctrlcanAddrList: new Array(),//集控器—终端地址集合对象 【EditBy shaocx,2017-05-25】
    OneKeyChargeStatus: "Init",//一键充电状态值(Init:初始(未点击一键充电)；NoOpen:未开启(点击了一键充电，但是没点确定按钮);Open:已开启(一键充电启动))
    IsRefresh: false,//是否刷新（false未刷新，true已刷新）
    /***************************充电模式和群充策略设置 【开始】***************************/
    allCtrlcanAddrStr: "",//所有的集控器—终端地址集合字符串，用于设置充电模式
    allCtrlcanAddrCount: 0,//所有的集控器—终端地址集合的个数，用于设置充电模式
    CtrlcanAddrStr_ChargGroup: "",//所有的集控器—终端地址集合字符串，用于设置群充充电模式或群充策略
    CtrlcanAddrStr_ChargGroupAutoID: "",//所有的集控器—终端地址集合字符串，用于设置群充充电模式或群充策略,格式 "集控地址-终端地址"
    CtrlcanAddrStr_ChargGroupCount: 0,//所有的集控器—终端地址集合字符串，用于设置群充充电模式或群充策略的个数
    CtrlcanAddrStr_RoundFilling: "",//所有的集控器—终端地址集合字符串，用于设置轮充充电模式
    CtrlcanAddrStr_RoundFillingCount: 0,//所有的集控器—终端地址集合字符串，用于设置轮充充电模式的个数
    chargeMode: "",//当前界面设置的充电模式,(注意： 轮充 1 群充 2 )
    chargeModeName: "",//当前界面设置的充电模式名称,(注意： 轮充 1 群充 2 )
    chargeStrategy: "",//当前界面设置的群充策略
    chargeStrategyName: "",//当前界面设置的群充策略名称
    curChargeMode: "",//当前群充组的充电模式,(注意： 轮充 6 群充 7 )
    curChargeModeName: "",
    curChargeStrategy: "",//当前群充组的群充策略
    curChargeStrategyName: "",
    ctrlAddress_chargeModeStrategy: "",//设置充电模式和策略时选择的集控器地址
    curChargeModeOrChargeStrategy: "",//当前是设置充电模式还是设置群充策略
    ChargeModeOrChargeStrategyDic: {
        "ChargeMode": "ChargeMode", "ChargeStrategy": "ChargeStrategy"
    },//充电模式还是群充策略
    ChargeModeDic: {
        "RoundFilling": "6", "ChargGroup": "7"
    },//充电模式字典(轮充 6 群充 7)  【EditBy shaocx,2015-10-23】
    IsTimeOutForChargeModeOrChargeStrategy: "0",//是否超时//是否超时(0否 1是)
    NowTimeOutForChargeModeOrChargeStrategy: 0,//当前超时时间
    RoundTimeForChargeModeOrChargeStrategy: 10000,//定时器轮询时间，默认为10秒
    TimeOutForChargeModeOrChargeStrategy: 45000,//方法超时时间，默认为45秒
    //充电模式和群充策略错误提示
    errMsg_ModeStrategy: "",
    IsSetFinished: true,//是否设置完毕，默认为true，这里用于在界面上控件终端的禁用和启用
    ChargGroupPileObject_Arr: new Array(),//页面上属于群充模式的终端对象
    ChargingModeDic: {
        "0": "未知模式",
        "1": "被动快充",
        "2": "智能充电",
        "3": "经济充电",
        "4": "智能恢复",
        "6": "轮充模式",
        "7": "群充模式"
    },//充电模式枚举字典
    ChargeStrategyDic: {
        "0": "未知策略",
        "1": "A策略",
        "2": "B策略",
        "3": "C策略"
    },//群充策略枚举字典
    TraRealTimeData: {},//负荷调度数据
}

export var arr_OperatingPile = [];//页面正在操作中的终端,数组存的是ID（集控器地址+Can地址）（如：开启充电、结束充电、刷卡充电、强制充电等）[EditBy shaocx,2017-08-28]
export var currentEc = undefined;//currentEc
export var isClickCheckbox = false;
export var ifLock = false;//是否存在地锁
export var arr_pileForLock = new Array();//保存升降地锁过程中操作的终端对象，用于控制升降中刷新状态不会影响到升降地锁

export var oldPagebodyWidth = 0;
export var ifNeedRemovemargintop0 = false;//是否需要移除掉class margintop0


/*空闲*/
export var kongxian = "#49A449";
/*已插枪、已充满、暂停、充电中、涓流充*/
export var shiyongzhong = "#63BBFF";
/*离网*/
export var liwang = "#BFBFBF";
/*故障*/
export var guzhang = "#FF6969";
/* 请拔枪*/
export var qingbaqiang = "#dfb614";

export function str2json(result){
    return result;
}

