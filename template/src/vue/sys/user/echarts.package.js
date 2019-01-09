/**
 * Created by 孙正强 on 2018/4/12.
 */
//饼图绑定数据
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');

require('echarts/lib/component/markLine');
require('echarts/lib/component/legend');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
//import "../../js/Common/teld-walden.js"
//require('echarts/theme/macarons');
var _echart_theme="teld-walden";
//_echart_theme=macarons;
export default {


    defaultEcharts:function(id, option, mycharts)
    {
        var that=this;
        $("#" + id).removeAttr("_echarts_instance_");
        mycharts = echarts.init(document.getElementById(id), _echart_theme);
        mycharts.setOption(option);
        return mycharts;
    },
    registerPile:function(id, params, mycharts)
    {
        var that=this;
        $("#" + id).removeAttr("_echarts_instance_");
        var mycharts = echarts.init(document.getElementById(id), _echart_theme);
        var option = that.InitPileOption();
        jQuery.each(params, function (key, val) {
            switch (key) {
                case 'title':
                case 'legend':
                    that.EachBindData(option, key, val);
                    break;
                case 'series':
                    that.BindPileData(option, val);
                    break;
                default:
                    option[key] = val;
                    break;
            }
        });
        mycharts.setOption(option);
    },

    registerBarLine: function (mycharts, id, params) {
        if (typeof(mycharts) == 'undefined') {
            $("#" + id).removeAttr("_echarts_instance_");
            mycharts = echarts.init(document.getElementById(id), _echart_theme);
        }
        var option = this.InitBarAndLineOption();
        //解析传递过来的所有属性，然后一一替换赋值。
        var that=this;
        jQuery.each(params, function (key, val) {
            switch (key) {
                case 'dataZoom':
                    if (val == true) {
                        val = that.dataZoom;
                    }
                    option[key] = val;
                    break;
                case 'title':
                case 'grid':
                case 'legend':
                case 'yAxis':
                    that.EachBindData(option, key, val);
                    break;
                case 'series':
                    option[key] = val;
                    that.BindLengAndMarkPointData(option, val);
                    break;
                default:
                    option[key] = val;
                    break;
            }
        });
        mycharts.setOption(option);
        return mycharts;
    },
    //更新数据
    UpdateBarLine: function (myChart, params) {
        // var option = myChart.getOption();
        // for (var i = 0; i <= params.length - 1; i++) {
        // var obj=params[i];
        // option.series[0].data = obj.data;

        // }
        // myChart.setOption(option);
        // return myChart;
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 85,
            end: 100
        },
        {
            type: 'inside',
            realtime: true,
            start: 85,
            end: 100
        }
    ]
    ,
    markPointMax: {type: 'max', name: '最大值'},
    markPointMin: {type: 'min', name: '最小值'},
    markLineAvg: {type: 'average', name: '平均值'},
    //绑定图例和最大，最小，平均线效果
    BindLengAndMarkPointData: function (option, vals) {
        var lengArray = [];
        var suffixArray = [];
        var that=this;
        jQuery.each(vals, function (key, val) {
            if (val.show != false) {
                lengArray.push(val.name);
            }
            suffixArray.push(that.ValidateNull(val.suffix));
            if (val.max == true || val.min == true) {
                option.series[key].markPoint = {data: []};
                if (val.max == true) {
                    option.series[key].markPoint.data.push(this.markPointMax);
                }
                if (val.min == true) {
                    option.series[key].markPoint.data.push(this.markPointMin);
                }
                if (val.average == true) {
                    option.series[key].markLine = {data: []};
                    option.series[key].markLine.data.push(this.markLineAvg);
                }
            }
        });
        option.legend.data = lengArray;
        //that.BindTooltip(option, vals, suffixArray);
    },
    //null或undefined判断
    ValidateNull: function (v) {
        if (v == undefined || v == null) {
            return '';
        }
        return v;
    },
    //绑定tooltip效果-重新绑定为了增加单位。
    BindTooltip: function (option, vals, suffixArray) {
        var that=this;
        option.tooltip.formatter = function (param) {
            var temp = "";
            for (var i = 0; i <= param.length - 1; i++) {
                if (i == 0) {
                    temp = param[0].name + "<br/>";
                }
                var v = param[i].data;
                if (v == undefined) {
                    v = 0;
                }
                temp += param[i].seriesName + ":&nbsp;" + v + suffixArray[i] + "<br/>";
            }
            return temp;
        }
    },
    //绑定饼图数据
    BindPileData: function (option, vals) {
        var lengArray = [];
        for (var i = 0; i <= vals.length - 1; i++) {
            jQuery.each(vals[0], function (key, val) {
                option.series[i][key] = val;
                if (key == 'data') {
                    jQuery.each(val, function (k, v) {
                        lengArray.push(v.name);
                    });
                }
            });
        }
        option.legend.data = lengArray;
    },
    //根据具体的属性绑定数据
    EachBindData: function (option, keys, vals) {
        jQuery.each(vals, function (key, val) {
            option[keys][key] = val;
        });
    },
    //饼图-参数初始化
    InitPileOption: function () {
        var option = {
            title: {
                text: '',
                x: 'center',
                top: 20
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: true,
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: []
                }
            ]
        };
        return option;
    },
    //折线和柱状图-参数初始化
    InitBarAndLineOption: function () {
        var optionEchart = {
            title: {
                text: '',
                subtext: '',
                left: 'center',
                top: 5
            },
            grid: {
                left: '4%',
                right: '4%',
                bottom: '5%',
                top: '20%',
                height: 'auto',
                //containLabel
                //grid 区域是否包含坐标轴的刻度标签。
                //containLabel 为 false 的时候：
                //grid.left grid.right grid.top grid.bottom grid.width grid.height 决定的是由坐标轴形成的矩形的尺寸和位置。
                //这比较适用于多个 grid 进行对齐的场景，因为往往多个 grid 对齐的时候，是依据坐标轴来对齐的。
                //containLabel 为 true 的时候：
                //grid.left grid.right grid.top grid.bottom grid.width grid.height 决定的是包括了坐标轴标签在内的所有内容所形成的矩形的位置。
                //这常用于『防止标签溢出』的场景，标签溢出指的是，标签长度动态变化时，可能会溢出容器或者覆盖其他组件。
                containLabel: true
            },
            //'plain'：普通图例。缺省就是普通图例。
            //'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。
            legend: {
                show: true,
                left: 'auto',//如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
                right: 'auto',
                top: '25',
                bottom: 'auto',
                orient: 'horizontal',//'horizontal''vertical'
                data: []
            },
            // color: ['#51c0e2', '#6f78d4', '#f1ae45', '#dc524c'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                textStyle: {
                    align: 'left'
                }
            },
            //'value' 数值轴，适用于连续数据。
            //'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            //'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
            //'log' 对数轴。适用于对数数据。
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        textStyle: {
                            color: '#8e8e93',
                            fontSize: 9
                        }
                    },
                    data: []
                },
                {
                    type: 'category',
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    nameTextStyle: {
                        color: '#8e8e93',
                        fontSize: 10,
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        length: 0
                    },
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#b4b5c1',
                            fontSize: 9
                        }
                    },
                    splitLine: {
                        show: false,
                        interval: 'auto',
                        lineStyle: {
                            color: ['#dfdfdf'],
                            width: 1,
                            type: 'solid',
                        }
                    }
                },
                {
                    //坐标轴名称显示位置。[ default: 'end' ]
                    //'start'
                    //'middle' 或者 'center'
                    //'end'
                    nameLocation: 'end',
                    type: 'value',
                    inverse: false,
                    show: false,
                    nameTextStyle: {
                        color: '#8e8e93',
                        fontSize: 10,
                    },
                    //坐标轴轴线
                    axisLine: {
                        show: false
                    },
                    //坐标轴刻度
                    axisTick: {
                        //坐标轴刻线的长度
                        length: 0
                    },
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#b4b5c1',
                            fontSize: 9
                        }
                    },
                    splitLine: {
                        show: false,
                        interval: 'auto',
                        lineStyle: {
                            color: ['#dfdfdf'],
                            width: 1,
                            type: 'solid',
                        }
                    }
                }
            ],
            series: []
        };
        return optionEchart;
    }

}