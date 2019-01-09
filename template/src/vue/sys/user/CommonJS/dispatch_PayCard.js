import * as TPSSearch from  "./TPSSearch.js"

/*
        * 下面是关于刷卡充电的参数
        */
export var card_CustType = "" ;//支付账户类型
export var card_CompanyId = "";//支付企业ID
export var card_CustomerId = "";//支付个人ID
export var card_CtrlAddress = "";//充电的集控器ID
export var card_CanSN = "";//充电的终端Can地址
export var card_IsTestChage = "";//是否测试充电
export var card_UserBalance = "true";//是否使用现金支付
export var card_UserCredit = "true";//是否使用信用支付
export var card_VoucherIds = "";//选择支付的代金券ID集合 ( id,id,id )
export var card_CouponIds = "";//选择支付的优惠券ID集合 ( id,id,id )
export var card_CardNo = "";//卡号信息
export var card_CardId = "";//卡号内码
export var card_chargeInfoData = null;//当前充电详情
export var card_ChargeFlag = "";//刷卡用于充电还是结束充电标识 （1 刷卡充电 2刷卡结束充电）

export var isNeedBindTableButtonClick = true;//是否需要绑定列表按钮事件



/*//当前倒计时剩余(30秒)
export var card_CurrentSurplusTime = 30;  //发布时用//暂时注释*************
//默认倒计时(30秒)
export var card_DefaultTotalTime = 30; //发布时用//暂时注释*************
//*/

//当前倒计时剩余(5秒)
export var card_CurrentSurplusTime = 5;//模拟，发布时要去掉【！！！！！！】
//默认倒计时(5秒)
export var card_DefaultTotalTime = 5; //模拟，发布时要去掉【！！！！！！】
//*/
//是否正在计时（true是false否）
export var card_IsCounting = false;
/*与一体机进行一些全局变量的传递方式---------开始*/
export function sendCard_IsCounting(cardStartTimeFlag) {
    card_IsCounting = cardStartTimeFlag;
}
export function sendCard_ChargeFlag(cardChargeFlag) {
    card_ChargeFlag = cardChargeFlag;
}

export function getIsBindTableEvent(EventFlag) {
    isNeedBindTableButtonClick = EventFlag;
    //return isNeedBindTableButtonClick;
}

// export function card_CustType(cardChargeFlag) {
//     card_CustType = cardChargeFlag;
// }
// export function card_CompanyId(cardChargeFlag) {
//     card_CompanyId = cardChargeFlag;
// }
// export function card_CustomerId(cardChargeFlag) {
//     card_CustomerId = cardChargeFlag;
// }
export function sendCard_CtrlAddress(cardAddressFlag) {
    card_CtrlAddress = cardAddressFlag;
}
export function sendCard_CanSN(cardCanSNFlag) {
    card_CanSN = cardCanSNFlag;
}
// export function card_IsTestChage(cardChargeFlag) {
//     card_IsTestChage = cardChargeFlag;
// }
// export function card_UserBalance(cardChargeFlag) {
//     card_UserBalance = cardChargeFlag;
// }
//
// export function card_UserCredit(cardChargeFlag) {
//     card_UserCredit = cardChargeFlag;
// }
// export function card_VoucherIds(cardChargeFlag) {
//     card_VoucherIds = cardChargeFlag;
// }
// export function card_CouponIds(cardChargeFlag) {
//     card_CouponIds = cardChargeFlag;
// }
// export function card_CardNo(cardChargeFlag) {
//     card_CardNo = cardChargeFlag;
// }
// export function card_CardId(cardChargeFlag) {
//     card_CardId = cardChargeFlag;
// }
// export function card_chargeInfoData(cardChargeFlag) {
//     card_chargeInfoData = cardChargeFlag;
// }

/*与一体机进行一些全局变量的传递方式----------结束*/


//计时
export function card_startTimer() {
    debugger
    if (!card_IsCounting)
        return;
    debugger
    $('#span_CountDown').html(
        (card_CurrentSurplusTime < 10 ? "&nbsp;&nbsp;" + card_CurrentSurplusTime.toString() : card_CurrentSurplusTime.toString())
    );
    debugger
    card_CurrentSurplusTime = card_CurrentSurplusTime - 1;

    if (card_CurrentSurplusTime == -1) {//说明倒计时结束
        $("#PleasePayByCardModal").modal("hide");
        //getCard("1101201612000191");//企业客户卡,模拟，发布时要去掉【！！！！！！】
        //getCard("1100201513000010");//个人客户卡,模拟，发布时要去掉【！！！！！！】
        //getCard("1100201513000020");//个人客户卡,模拟，发布时要去掉【！！！！！！】
        //getCard("1100201513000010");//个人客户卡,模拟，发布时要去掉【！！！！！！】
        //getCard("1401201613000047");//可用测试--在准生产这个方法什么时候被触发？？？
    } else {
        setTimeout(card_startTimer, 1000);
    }
}
//停止计时
export function card_stopCount() {
    debugger
    card_IsCounting = false;//停止计时
    card_CurrentSurplusTime = card_DefaultTotalTime;
    $('#span_CountDown').html("");
}

/** 读卡操作*/
export function readCard() {
    debugger
    if (window.AppDispatch != undefined) {
        window.AppDispatch.startSwipingCard();//这是调的APP那边的方法
    }
}
/** 取消读卡操作*/
export function closeCom() {
    if (window.AppDispatch != undefined) {
        window.AppDispatch.closeCom();//这是调的APP那边的方法
    }
}

/** 获得卡号---如果调不到，放在methods里面试试*/
export function getCard(cardCode) {
    if (cardCode != '' && cardCode != undefined) {
        debugger
        card_CardNo = "";
        card_CardNo = cardCode;
        closeCom();//取消刷卡
        $("#PleasePayByCardModal").modal("hide");
        showLoading();
    } else {
        NotifyError("卡号为空,请检查!");
        return;
    }

    if (card_ChargeFlag == "1") {//表示 刷卡充电
        LoadDataByCardCode(true);
    } else if (card_ChargeFlag == "2") {//表示 刷卡结束充电
        hideLoading();
        TPSSearch.endChargeCommonFun(TPSSearch.Dispatch.curAutoID, true);
    }

}




/*
       * 加载刷卡数据
       * isLastData 是否是上次充电详情，true是 false 是本次充电详情
       */
export function LoadDataByCardCode(isLastData) {
    debugger
    var postData = {
        'cardCode': card_CardNo,
        'terminalCode': TPSSearch.Dispatch.curPillCode, //终端编号
        'staId': $("#hideStaId").val() //电站内码
    };

    //异步加载
    //"/TPS/GetCardInfoByCardCode"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetCardInfoByCardCode", "POST", postData, function (result) {
        result = str2json(result);
        hideLoading();
        if (result.state == "1") {
            var data = result.data;

            card_CardId = "";
            card_CardId = data.ID;//卡号内码

            $("#span_CardCode").html(data.CardCode);
            $("label[name='span_CustName']").html(data.CardName);

            card_IsTestChage = "";
            //1 自由卡，2 测试卡,3 第三方卡
            if (data.IsSelf == "2") {
                card_IsTestChage = "true";
            } else {
                card_IsTestChage = "false";
            }

            var custTypeName = '';
            var curCustomerID = data.CustomerID;//当前客户
            var str_PayCust = "";
            if (data.CustType == '1') {
                custTypeName = '个人客户';
                str_PayCust += "  <li><a href='javascript:void(0)' style='height:20px;' value='" + curCustomerID + "' custtype='" + data.CustType + "' >个人账户</a></li>";
                if (data.IsBindCompanyCust == "1") {//说明绑定了企业账户
                    for (var i = 0; i < data.arryCompanys.length; i++) {
                        str_PayCust += "  <li><a href='javascript:void(0)' style='height:20px;' value='" + data.arryCompanys[i].companyId + "' custtype='2' >" + data.arryCompanys[i].companyName + "</a></li>";
                    }
                }
                $("#PayCust").html(str_PayCust);
                $("#hid_PayCust").val(curCustomerID);
                $("#ddlPayCust").html('个人账户<span class="caret"></span>');

            }
            else if (data.CustType == '2') {
                custTypeName = '企业客户';
                str_PayCust += "  <li><a href='#' style='height:20px;' value='" + curCustomerID + "' custtype='" + data.CustType + "'  >企业账户</a></li>";
                $("#PayCust").html(str_PayCust);
                $("#hid_PayCust").val(curCustomerID);
                $("#ddlPayCust").html('企业账户<span class="caret"></span>');
            }
            $("#span_CustType").html(custTypeName);
            //客户事件绑定

            $("#PayCust li a").bind("click", function ($event) {
                debugger
                //SelectDataByPayData(event.target);  //选择支付账户下拉
                SelectDataByPayData($event);  //选择支付账户下拉
            });

            SetCustInfoByCustType(data.CustType, curCustomerID);//根据客户类型设置客户信息

            SetBalanceAndSecuritiesAndCouponData(data);//设定余额和代金券数据和优惠券数据

            SetLastChargeInfoData(data, isLastData);//设定上次充电详情

            if (!isLastData) {
                $("#div_footer_noCharge").show();
                $("#div_footer").hide();
            } else {
                $("#div_footer_noCharge").hide();
                $("#div_footer").show();
            }

            $("#PayByCardChargeModal").modal("show");
        }
        else {
            NotifyError(result.errmsg);
        }
    }, null, null);
}


//选择支付账户下拉
export function SelectDataByPayData(selected) {
    var selCustomerId = $(selected.target).attr("value");
    var selCustType = $(selected.target).attr("custtype");
    var hidPayCust = $("#hid_PayCust").val();
    if (selCustomerId == hidPayCust) {//如果一致就返回
        return;
    }

    $("#hid_PayCust").val(selCustomerId);
    $("#ddlPayCust").html($(selected.target).text() + '<span class="caret"></span>');//当前选中的值
    //获取余额和代金券信息
    GetBalanceAndBalanceAndSecurities(selCustType, selCustomerId);
}


//根据客户类型设置客户信息
export function SetCustInfoByCustType(CustType, CustomerID) {
    card_CustType = CustType;
    if (CustType == "1") {//个人客户
        card_CustomerId = CustomerID;
        card_CompanyId = "";
        $("#div_CreditBalance").css("display", "none");//隐藏信用额度，个人没有信用额度
        card_UserCredit = "false";
    } else if (CustType == "2") {//企业客户
        card_CompanyId = CustomerID;
        $("#div_CreditBalance").css("display", "block");//显示信用额度
        card_UserCredit = "true";
    }
}
/*
 * 根据客户ID获取余额和代金券信息
 * CustType:客户类型
 * CustomerID：客户ID
 * CompanyID:企业ID
 * terminalCode:终端编号
 */
export function GetBalanceAndBalanceAndSecurities(CustType, CustomerID) {
    SetCustInfoByCustType(CustType);

    //首先清空数据
    $("#cb_Securities").html("");
    $("#span_CashBalance").html("");
    $("#cb_Coupon").html("");
    $("#span_CreditBalance").html("");
    var data = {
        "filter": JSON.stringify({
            "CustType": CustType,
            "CustomerID": CustomerID,
            'terminalCode': TPSSearch.Dispatch.curPillCode, //终端编号
            'staId': $("#hideStaId").val() //电站内码
        })
    };
    //异步加载
    ///TPS/GetBalanceAndSecuritiesAndCoupon
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetBalanceAndSecuritiesAndCoupon", "POST", data, function (result) {
        result = str2json(result);
        if (result.state == "1") {
            var data = result.data;
            SetBalanceAndSecuritiesAndCouponData(data);
        }
        else {
            NotifyError(result.errmsg);
        }
    }, null, null);
}

//设定余额和代金券数据和优惠券数据
export function SetBalanceAndSecuritiesAndCouponData(data) {
    $("#divThirdAccs").html("");
    var thirdList = data.BalanceAndSecuritiesAndCounpon.thirdAccsList;
    if (thirdList != null) {//说明有第三方账户
        var str = "";
        for (var i = 0; i < thirdList.length; i++) {
            str += '<div class="col-lg-12 col-sm-12 col-xs-12">';
            str += ' <div class="form-group">';
            str += '<label class="col-sm-5 control-label no-padding-left">' + thirdList[i].ACCNAME + '现金余额</label>';
            str += ' <div class="col-sm-7">';
            str += '<div class="btn-group">';
            str += '<label  class="control-label">' + thirdList[i].Balance + '元</label>';
            str += ' </div>';
            str += '</div>';
            str += ' </div>';
            str += '</div>';
            $("#divThirdAccs").append(str);
            str = '';
        }
        $("#divThirdAccs").css("display", "block");
        $("#div_CashBalance").css("display", "none");
    } else {
        $("#divThirdAccs").css("display", "none");
        $("#div_CashBalance").css("display", "block");
        //1、现金
        $("#span_CashBalance").html(data.BalanceAndSecuritiesAndCounpon.CashBalance + "元");
    }
    //2、信用
    $("#span_CreditBalance").html(data.BalanceAndSecuritiesAndCounpon.CreditBalance + "元");

    //3、代金券
    var str_Securities = '';
    var secTitle = '';
    var realTitle = '';
    var data_Sec = data.BalanceAndSecuritiesAndCounpon.SecuritiesList;
    if (data_Sec != undefined && data_Sec.length > 0) {//说明有代金券
        $("#div_Securities").css("display", "block");
        for (var i = 0; i < data_Sec.length; i++) {
            secTitle = '';
            if (data_Sec[i].desc != undefined && data_Sec[i].desc.length > 0) {
                for (var j = 0; j < data_Sec[i].desc.length; j++) {
                    if (j == 0) {
                        secTitle += data_Sec[i].desc[j];
                    }
                }
            }
            if (secTitle.indexOf("电费") > -1 && secTitle.indexOf("服务费") > -1) {
                realTitle = "(通抵)";
            } else if (secTitle.indexOf("电费") > -1) {
                realTitle = "(电)";
            }
            else if (secTitle.indexOf("服务费") > -1) {
                realTitle = "(服)";
            }
            str_Securities += '<div style="float:left;">';
            str_Securities += '<div id="' + data_Sec[i].cardID + '" name="Securities"  class="Securities">';
            str_Securities += '&nbsp;&nbsp;抵' + data_Sec[i].balance.toString() + '元' + realTitle + '&nbsp;&nbsp;';
            str_Securities += '</div>';
            str_Securities += '<div></div>&nbsp;&nbsp;';//显示是否选中图片
            str_Securities += '</div>';
        }
        $("#cb_Securities").html(str_Securities);
        //事件绑定
        $(".Securities").bind("click", function (event) {
            clickSecurities(event.target);
        });
        checkAllSecurities();
    } else {//没有代金券
        $("#div_Securities").css("display", "none");
    }

    //4、优惠券
    var str_Coupon = '';
    var secTitle = '';
    var data_Coupon = data.BalanceAndSecuritiesAndCounpon.CouponList;
    if (data_Coupon != undefined && data_Coupon.length > 0) {//说明有代金券
        $("#div_Coupon").css("display", "block");
        for (var i = 0; i < data_Coupon.length; i++) {
            str_Coupon += '<div style="float:left;">';
            str_Coupon += '<div id="' + data_Coupon[i].ID + '" name="Coupon" class="Coupon">';
            str_Coupon += '&nbsp;&nbsp;' + data_Coupon[i].ViewTitle + '&nbsp;&nbsp;';
            str_Coupon += '</div>';
            str_Coupon += '<div></div>&nbsp;&nbsp;';//显示是否选中图片
            str_Coupon += '</div>';
        }

        $("#cb_Coupon").html(str_Coupon);
        //事件绑定
        $(".Coupon").bind("click", function (event) {
            clickCoupon(event.target);
        });
        checkAllCoupon();
    } else {//没有代金券
        $("#div_Coupon").css("display", "none");
    }
}

/*
 * 设定上次充电详情
 * data 配置数据
 * isLastData 是否是上次充电详情，true是 false 是本次充电详情
 */
export function SetLastChargeInfoData(data, isLastData) {
    var title = '本次';
    var secCouponTitle = '剩余';
    if (isLastData) {
        title = '上次';
        secCouponTitle = '';
    }


    $("span[name='span_lablTitle']").text(title);
    $("span[name='span_secCouponTitle']").text(secCouponTitle);

    var chargeInfoData = data.LastChargeBill;
    if (chargeInfoData != undefined || chargeInfoData != null) {
        $("#span_LastChargeTime").text(chargeInfoData.BeginTime_Str + ' - ' + chargeInfoData.EndTime_Str);//本次充电时间
        $("#span_LastChargePill").text(chargeInfoData.StaName + chargeInfoData.PileName);//本次充电终端
        $("#span_LastChargePower").text(chargeInfoData.Power_Str + '度');//本次充电电量
        $("#span_LastChargeMoney").text('电费' + chargeInfoData.ECTaxInFee_Str + '元  |  服务费' + chargeInfoData.SCTaxInFee_Str + '元');//本次充电费用

        card_chargeInfoData = null;
        card_chargeInfoData = chargeInfoData;
    }
}

//获取选择的代金券id集合
export function GetCheckedSecurities() {
    var securitsIds = '';
    var arr = $("div.ClickStyleForSecuritie");//获取所有有class为ClickStyleForSecuritie的div对象
    for (var i = 0; i < arr.length; i++) {
        if (i == arr.length - 1)
            securitsIds += $(arr[i]).attr("id");
        else
            securitsIds += $(arr[i]).attr("id") + ',';
    }
    card_VoucherIds = '';
    card_VoucherIds = securitsIds;
}

//获取选择的优惠券id集合
export function GetCheckedCoupon() {
    var CouponIds = '';
    var arr = $("div.ClickStyleForCoupon");//获取所有有class为ClickStyleForCoupon的div对象
    for (var i = 0; i < arr.length; i++) {
        if (i == arr.length - 1)
            CouponIds += $(arr[i]).attr("id");
        else
            CouponIds += $(arr[i]).attr("id") + ',';
    }
    card_CouponIds = '';
    card_CouponIds = CouponIds;
}

//点击代金券事件
export function clickSecurities(obj) {
    $(obj).toggleClass("NoClickStyleForSecuritie");
    $(obj).toggleClass("ClickStyleForSecuritie");
    $(obj).next().toggleClass("checkItem");
    $(obj).next().toggleClass("NoCheckItem");
}
//点击优惠券事件
export function clickCoupon(obj) {
    $(obj).toggleClass("NoClickStyleForCoupon");
    $(obj).toggleClass("ClickStyleForCoupon");
    $(obj).next().toggleClass("checkItem");
    $(obj).next().toggleClass("NoCheckItem");
}

//全选代金券事件
export function checkAllSecurities() {
    $("div[name=Securities]").toggleClass("ClickStyleForSecuritie");
    $("div[name=Securities]").next().toggleClass("checkItem");
}
//全选优惠券事件
export function checkAllCoupon() {
    $("div[name=Coupon]").toggleClass("ClickStyleForCoupon");
    $("div[name=Coupon]").next().toggleClass("checkItem");
}

//获取历史列表数据
export function InitMoreHistoryRecrordsList() {
    $("#title_moreHistoryChargerRecordsModal").html("卡号【" + card_CardNo + "】充电历史记录");
    var postData = {
        "filter": {
            'cardId': card_CardId,
            //'cardId': 1100201513000020,
            'sortName': 'endtime'
        }
    }
    $("#table_MoreHistoryRecrords").datagrid17({
        //url: "/TPS/GetHistoryChageBills",
        url: ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "GetHistoryChageBills",
        tableType: "single",
        autoHeight: false,
        preHandle: function () {
            ShowDIYModal($("#moreHistoryChargerRecordsModal"));
        },
        renderRowHtml: function (rows, pageNo, curPage) {
            var str = "";
            var rowNo = (pageNo - 1) * curPage + 1;
            for (var i = 0; i < rows.length; i++) {
                //获取单行信息
                var jsonObj = rows[i];
                //rownum
                str += "<tr>";
                str += "<td  style='text-align:center;'>" + rowNo++ + "</td>";
                //单选框---不知道这个单选框是干什么用的？
                /*str += " <td style='text-align:center; display:none;'>";
                str += " <div class='radio' style='margin-top: 0px; margin-bottom: 0px;'>";
                str += " <label style='padding-left:0px;'>";
                str += " <input type='radio'   class='colored-success'>";
                str += " <span class='text'></span>";
                str += " </label>";
                str += " </div>";
                str += " </td>";//*/

                var BeginTime = jsonObj.BeginTime == null ? "" : jsonObj.BeginTime;
                str += "<td  style='text-align:center;' title='" + BeginTime + "'>" + BeginTime + "</td>";
                var EndTime = jsonObj.EndTime == null ? "" : jsonObj.EndTime;
                str += "<td  style='text-align:center;' title='" + EndTime + "'>" + EndTime + "</td>";
                str += "<td  style='text-align:center;' title='" + jsonObj.ChargeCuration + "'>" + jsonObj.ChargeCuration + "</td>";
                str += "<td  style='text-align:center;' title='" + jsonObj.Power_Str + "'>" + jsonObj.Power_Str + "</td>";
                str += "<td  style='text-align:center;' title='" + jsonObj.ECTaxInFee_Str + "'>" + jsonObj.ECTaxInFee_Str + "</td>";
                str += "<td  style='text-align:center;' title='" + jsonObj.SCTaxInFee_Str + "'>" + jsonObj.SCTaxInFee_Str + "</td>";
                var jsonData = JSON.stringify(jsonObj).replace(/\"/g, "'");//将双引号替换成单引号
                var buttonStr = ' <a xiangying="xiangying" id="' + jsonObj.Id + '" jsonData="' + jsonData + '"   href="javascript:void(0)" >详情</a>';
                str += "<td  style='text-align:center;' title='充电详情'>" + buttonStr + "</td>";
                str += "</tr>";

                //buttonStr中的事件绑定

            }

            if (rows.length == 0) {
                isNeedBindTableButtonClick = false;
            }
            else {
                isNeedBindTableButtonClick = true;
            }

            setTimeout(bindEventTable(), 2000);

            return str;

        },
    }).data('bs.datagrid17').searchByFilter({searchCond: postData});

}
export function bindEventTable() {
    var td = $("#gridBodyDiv_table_MoreHistoryRecrords").find("tbody tr td");
    if (td.length == 1 && td.text() == "无记录") {
        isNeedBindTableButtonClick = false;
        return;
    }
    //每行的按钮【绑定】事件
    var tbodyButton = $("#gridBodyDiv_table_MoreHistoryRecrords").find("tbody").find("a[xiangying='xiangying']");
    if (tbodyButton.length > 0 && isNeedBindTableButtonClick) {
        tbodyButton.each(function () {
            $(this).off("click").on("click", function (e) {
                e.preventDefault();
                debugger;
                var obj = e.target;
                debugger
                SetChargeDeatilData(obj, 3);
            });
        });
    } else {
        if (!isNeedBindTableButtonClick) {
            return;
        } else {
            setTimeout(bindEventTable, 1000);
        }
    }


    /*$("#table_MoreHistoryRecrords").on("BODY_RENDER_COMPLETE", function (rows) {
        console.log(rows);
        debugger
        for (var i = 0; i < rows.length; i++) {
            //获取单行信息
            var jsonObj = rows[i];
            console.log(jsonObj.Id);
            $("#" + jsonObj.Id).bind("click", function (event) {
                debugger;
                var obj = event.target;
                debugger
                dispatch_PayCard.SetChargeDeatilData(obj, 3);
            });
        }
    });//*/
}




//设置充电详情的值
//设置充电详情的值
export function SetChargeDeatilData(obj, flag) {
    debugger
    switch (flag) {
        case 1://终端界面的详情
            TPSSearch.ClearDataForViewChargeDetail();
            var id = $(obj).attr("idvalue");
            var postData = {
                'filter': JSON.stringify({
                    'CustomerID': TPSSearch.Dispatch.CustomerID,//客户ID
                    'PillID': $("#pillID_" + id).val()//终端ID
                })
            }
            //"src/vue/dispitch/test/ViewChargeList.json"
            getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID=" + ServiceHost_DISTPS + "ViewChargeList", "POST", postData, function (result) {
                result = str2json(result);
                if (result.state == "1") {
                    var myModalLabelTitle = '(' + $('#pillName_' + id).text() + ')';
                    var data = result.data;//充电订单详情
                    if (data.IsNull == "1") {
                        $("#title_chargeDetailModal").html(myModalLabelTitle);
                        NotifyWarning(myModalLabelTitle + "无上次充电订单记录");
                        return;
                    }
                    myModalLabelTitle = "上次充电订单" + myModalLabelTitle;
                    TPSSearch.SetDataForViewChargeDetail(myModalLabelTitle, data, false);

                }
                else {//出现错误
                    NotifyError("查看上次充电订单异常");
                }
            });
            break;

        case 2://卡号界面的详情
            TPSSearch.SetDataForViewChargeDetail("充电订单详情", card_chargeInfoData, false);
            break;
        case 3://历史记录里的详情
            debugger
            var jsonDataStr = $(obj).attr("jsonData");
            jsonDataStr = jsonDataStr.replace(/'/g, '"');//将单引号替换成双引号
            var jsonData = JSON.parse(jsonDataStr);
            //myModalLabelTitle = '充电订单详情';
            //TPSSearch.SetDataForViewChargeDetail(myModalLabelTitle, jsonData, false);
            TPSSearch.SetDataForViewChargeDetail('充电订单详情', jsonData, false);
            break;
    }

}


//初始化自定义的模态框
export function InitDIYModal() {
    RegisterDIYModal($("#chargeDetailModal"));//注册 上次充电详情模态框
    RegisterDIYModal($("#moreHistoryChargerRecordsModal"));//注册 充电历史记录模态框
    RegisterDIYModal($("#LoadDispatchModal"));//注册 上次充电详情模态框
    RegisterDIYModal($("#ShowDetailModal"));//注册 查看详情模态框
}

/*
 * 自定义模态框注册事件
 * rs_dialog:模态框对象
 */
export function RegisterDIYModal(rs_dialog) {
    var rs_box = rs_dialog.find('.rs-dialog-box');
    var rs_close = rs_dialog.find('.closeModal');
    var rs_overlay = $('.rs-overlay');
    if (!rs_dialog.length) return true;

    // Close dialog when clicking on the close button
    rs_close.click(function (e) {
        rs_dialog.removeClass('in').delay(150).queue(function () {
            rs_dialog.hide().dequeue();
            rs_overlay.fadeOut('slow');
            $('html').removeClass('dialog-open');
            $('body').css('padding-right', '');
        });
        return false;

    });

    // Close dialog when clicking outside the dialog
    /*
     //点击模态框外边的事件
     rs_dialog.click(function (e) {
     alert('点我');
     rs_close.trigger('click');
     });
     //*/
    //点击模块框里面的时间
    rs_box.click(function (e) {
        //e.stopPropagation();
    });
}

/*
 * 显示自定义模态框
 * rs_dialog:模态框对象
 */
export function ShowDIYModal(rs_dialog) {
    //Get the scrollbar width and avoid content being pushed
    var w1 = $(window).width();
    $('html').addClass('dialog-open');
    var w2 = $(window).width();
    var c = w2 - w1 + parseFloat($('body').css('padding-right'));
    if (c > 0) $('body').css('padding-right', c + 'px');

    var rs_overlay = $('.rs-overlay');
    rs_overlay.fadeIn('fast');
    rs_dialog.show('fast', function () {//显示模态框
        rs_dialog.addClass('in');
        $('.rs-overlay').css("display", "block");//强制显示，这也不管用
    });
    return false;
}


export function str2json(result) {
    return result;
}