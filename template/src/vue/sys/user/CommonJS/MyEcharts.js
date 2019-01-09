import * as TPSSearch from  "./TPSSearch.js"

export var datachart_PileFunnel;
export var pollECCount = 0;//轮询EC的次数

export function GetEc() {
    var myEc = TPSSearch.currentEc;
    if (myEc == undefined) {
        pollECCount++;
        setTimeout(GetEc, 1000);//1秒执行一次
        if (pollECCount == 3) {//轮询寻找三次后，放弃
            return undefined;
        }
    } else {
        return myEc;
    }
}
//生成没有数据时的Html
export function CreateHTMLForNoData() {
    $(".dataPielChart").css("height", "148px");
    var strhtml = [];
    strhtml.push('<img class="img-responsive" src="/Content/img/tpsall/tps/zanWu.png" style="margin:0 auto; position:relative; top:30%;" />');
    $(datachart_PileFunnel.dom).html(strhtml);
}

/*
 * 生成饼状图
 * chargingCount:充电中终端数
 * noChargingSum:未充电终端数
 */
export function CreatePie(ec, chargingCount, noChargingSum) {

    if (ec == undefined) {
        ec = GetEc();
        if (ec == undefined) {//轮询后还发现是undefined,就放弃
            return;
        }
    }

    //解决提示There is a chart instance already initialized on the dom
    if (datachart_PileFunnel != null && datachart_PileFunnel != "" && datachart_PileFunnel != undefined) {
        datachart_PileFunnel.dispose();
    }
    // 基于准备好的dom，初始化echarts实例
    //myChart = echarts.init(document.getElementById('sjtjt'));

    datachart_PileFunnel = ec.init(document.getElementById("dataPielChart"));
    //datachart_PileFunnel = echarts.init(document.getElementById("dataPielChart"));
    if (chargingCount == 0 && noChargingSum == 0) {
        CreateHTMLForNoData();
        return;
    }
    $(".dataPielChart").css("height", "158px");
    var option = {
        title: {
            text: '',
            subtext: '',
            x: 'center'
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left',
            data: []
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: true},
                magicType: {
                    show: true,
                    type: ['pie'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: false,//是否可拖动
        animation: false,
        series: [
            {
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {
                        //value: 195, name: ('未充电' + 155),
                        value: noChargingSum, name: ('未充电' + noChargingSum),
                        itemStyle: {
                            normal: {
                                color: '#638ceb',
                                label: {
                                    textStyle: {
                                        color: '#638ceb'
                                    }
                                },
                                labelLine: {
                                    length: 7.999,
                                    lineStyle: {
                                        color: '#638ceb'
                                    }
                                }
                            }
                        }
                    },
                    {
                        //value: 255, name: ('充电中' + 155),
                        value: chargingCount, name: ('充电中' + chargingCount),
                        itemStyle: {
                            normal: {
                                color: '#bbd81e',
                                label: {
                                    textStyle: {
                                        color: '#bbd81e'
                                    }
                                },
                                labelLine: {
                                    length: 7.999,
                                    lineStyle: {
                                        color: '#bbd81e'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ]
    };

    datachart_PileFunnel.setOption(option);
}