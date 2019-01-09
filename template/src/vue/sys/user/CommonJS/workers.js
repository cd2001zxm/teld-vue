var tempDate = new Date();
var now = tempDate.getTime();
//var interval = 60 * 1000;//��ʱʱ���趨Ϊ1����
var interval = 6 * 1000;//暂时改为6秒
var targetDate = now + interval;
var loop = 2000;

setInterval(function () {
    var dateFor = new Date();
    var ceil = parseInt((dateFor.getTime() - targetDate) / loop);
    console.info(ceil);
    if (ceil == 0) {
        debugger
        postMessage("lockscreen");
    }
}, loop);

self.onmessage = function (evt) {
    if (evt.data && evt.data == "reset") {
        tempDate = new Date();
        now = tempDate.getTime();
        targetDate = now + interval;
    }
    console.info('work:' + evt.data);
};