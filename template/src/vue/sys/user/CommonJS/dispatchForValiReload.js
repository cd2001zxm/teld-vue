//

export function isPC() {
    return false;
}

//这是用于锁屏
export var interval = 30;//暂时改为6秒
export var isOverTime=false;//是否超时

//计算是否超时
export function timeInterval(){
    interval=interval-1;
    console.log('超时倒计时:'+interval.toString());//自测时自己带着
    if(interval<=0){
        isOverTime=true;
    }else{
        setTimeout(timeInterval,1000);
    }
}
//开始计时
export function initInterval(){
    //interval=6;
    interval=30;
    isOverTime=false;
    timeInterval();
}
//initInterval();放在这里有什么用处

export var ButtonFlag = "";
//接收一体机页面buttonflag的赋值
export function getButtonFlag(ButtonFlagForReload) {
    ButtonFlag = ButtonFlagForReload;
}

/************************【武汉公交安卓验证是否重新登录】开始***************************************/
//武汉公交安卓验证是否重新登录,true需要重新登录，false不需要重新登录
export function ValidateIsReloadForValiReload() {
    debugger
    //dispatchForValiReload.timeout
    if (isOverTime) {//timeout所属已修改
        return true;
    }
    return false;
}
//武汉公交安卓页面重新登录
export function ReloadPageForValiReload() {
    debugger
    $("#password").val("");
    $("#inputnum").val("");
    $("#ValdatePasswordModal").modal("show");


    /*
    eraseCookie('TELDSID');
    setTimeout(function () {
        var account=$("#hideAccount").val();
        location.href = location.href + "&account=" + account;
        //location.reload();
    }, 500);
    //*/
}

//取消登录
export function CancelValdatePassword() {
    $("#password").val("");
    $("#inputnum").val("");
    $("#ValdatePasswordModal").modal("hide");
}
//验证口令
export function ValdatePassword() {
    debugger
    var submit = $("#btnValdatePassword").button('loading');//得到点击对象--验证按钮正在处理
    var password = $("#password").val();
    var hideUnlockPassword = $("#hideUnlockPassword").val();
    if (password == '') {
        debugger
        NotifyWarning("请输入口令!");
        document.getElementById("password").click();
        //初始化到开始状态
        submit.button('reset');
        event.returnValue = false;
        return false;
    }

    if (password != hideUnlockPassword) {
        debugger
        NotifyWarning("口令输入不正确!");
        document.getElementById("password").click();
        //初始化到开始状态
        submit.button('reset');
        event.returnValue = false;
        return false;
    }

    submit.button('reset');
    $("#ValdatePasswordModal").modal("hide");
    submit.button('reset');//验证按钮初始化
    initInterval();
    $("#password").val("");
    $("#inputnum").val("");
    //主动触发事件
    if (ButtonFlag != '')
        $("#" + ButtonFlag).click();
}
//修改密码
export function UpdatePassWord() {
    SetBtnStatusForUpdatePassWord(true);
    var newPass = $("#newPassWord").val();
    var odlPass = $("#oldPassWord").val();
    if (odlPass == '') {
        NotifyWarning("原密码不能为空!");
        $("#oldPassWord").focus();
        SetBtnStatusForUpdatePassWord(false);
        return;
    }
    if (newPass == '') {
        NotifyWarning("新密码不能为空!");
        $("#newPassWord").focus();
        SetBtnStatusForUpdatePassWord(false);
        return;
    }
    if (odlPass != $("#hideUnlockPassword").val()) {
        NotifyWarning("原密码不正确!");
        $("#oldPassWord").focus();
        SetBtnStatusForUpdatePassWord(false);
        return;
    }
    var postData = {
        "flag":"Password",
        "newPass": newPass,
        "refreshTime": ""
    };
    ///TPS/UpdatePassWord
    //"src/vue/dispitch/test/UpdatePassWord.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID="+ServiceHost_DISTPS+"UpdatePassWord", "POST", postData, function (result) {
        SetBtnStatusForUpdatePassWord(false);
        if (result.state != "1") {
            NotifyWarning(result.errmsg);
            return;
        }
        $("#hideUnlockPassword").val(newPass);
        NotifySuccess("保存密码成功");
        $("#newPassWord").val("");
        $("#oldPassWord").val("");
        $("#integrMachineInoPasswordModal").modal("hide");
    });
}
export function SetBtnStatusForUpdatePassWord(isDisabled) {
    if (isDisabled) {//要禁用
        $("#btnUpdatePassWord").attr("disabled", "disabled");
        $("#btnUpdatePassWord").text("保存中...");
    } else {
        $("#btnUpdatePassWord").removeAttr("disabled");
        $("#btnUpdatePassWord").text("保存");
    }
}
//获取密码
export function GetPassWord() {
    //获取密码
    var postData = {};
    ///TPS/GetPassWord
    //"src/vue/dispitch/test/GetPassWord.json"
    getDataAsync(ServiceHost_Dispatch + "/api/invoke?SID="+ServiceHost_DISTPS+"GetPassWord", "POST", postData, function (result) {
        if (result.state != "1") {
            NotifyWarning(result.errmsg);
            return;
        }
        var unlockPass = result.data.unlockPass;
        $("#hideUnlockPassword").val(unlockPass);
    });
}