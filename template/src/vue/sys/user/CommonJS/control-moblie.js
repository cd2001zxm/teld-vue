(function () {
    'use strict';
    window.moblieQuery = function () {

    }
    moblieQuery.prototype = {
        init: function () {

        },
        loadingToast: function (flag) {
            var $loadingToast = $('#loadingToast');
            if (flag == 'hide') {
                $('html,body').removeClass('cover');
                $loadingToast.fadeOut(100);
            } else {
                if ($loadingToast.length) {
                    if ($loadingToast.css('display') == 'none') {
                        $('html,body').addClass('cover');
                        $loadingToast.fadeIn(100);
                    }
                    return;
                }
                var html = '';
                html += '<div id="loadingToast" style="display: none;">';
                html += '<div class="mask-transparent"></div>';
                html += '<div class="moblie-toast">';
                html += '<i class="moblie-loading moblie-icon-toast"></i>';
                html += '<p class="moblie-toast-content">加载中</p>';
                html += '</div>';
                html += '</div>';
                $('body').append(html);
                $loadingToast = $('#loadingToast');
                $('html,body').addClass('cover');
                $loadingToast.fadeIn(100);
            }
        },
        labelToast: function (msg) {
            var $labelkToast = $('#labelkToast');
            if (!$labelkToast.length) {
                var html = '';
                html += '<div id="labelkToast" class="labelkToast" style="display:none;">' + msg + '</div>';
                $('body').append(html);
                $labelkToast = $('#labelkToast');
            }
            $labelkToast.html(msg).fadeIn(1000);
            setTimeout(function () { $labelkToast.fadeOut(1000); }, 3000);
        },
        bottomToast: function (msg) {
            var $bottomToast = $('#bottomToast');
            if (!$bottomToast.length) {
                var html = '';
                html += '<div id="bottomToast" class="bottomToast" style="display:none;">' + msg + '</div>';
                $('body').append(html);
                $bottomToast = $('#bottomToast');
            }
            $bottomToast.html(msg).fadeIn(1000);
            setTimeout(function () { $bottomToast.fadeOut(1000); }, 3000);
        },
        pulldownrefresh: function (obj, parent, offset, callback) {
            var start,
                end,
                isLock = false,//是否锁定整个操作
                isCanDo = false,//是否移动滑块
                isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
                hasTouch = 'ontouchstart' in window && !isTouchPad;

            //将对象转换为jquery的对象
            obj = $(obj);
            var objchildren = obj.children(":first");
            var objparent = parent || obj.parent();

            /*操作方法*/
            var fn =
                {
                    //移动容器
                    translate: function (diff) {
                        obj.css({
                            "-webkit-transform": "translate(0," + diff + "px)",
                            "transform": "translate(0," + diff + "px)"
                        });
                    },
                    //设置效果时间
                    setTranslition: function (time) {
                        obj.css({
                            "-webkit-transition": "all " + time + "s",
                            "transition": "all " + time + "s"
                        });
                    },
                    //返回到初始位置
                    back: function () {
                        fn.translate(0 - offset);
                        //标识操作完成
                        isLock = false;
                        //objchildren.css("display","none");
                        $("#loadMore").css("display","block");
                    }
                };

            //滑动开始
            obj.bind("touchstart", function (e) {

                if (!isLock && objparent.scrollTop() <= 0) {
                    var even = typeof event == "undefined" ? e : event;
                    //标识操作进行中
                    isLock = true;
                    //保存当前鼠标Y坐标
                    start = hasTouch ? even.touches[0].pageY : even.pageY;
                    //消除滑块动画时间
                    fn.setTranslition(0);
                }
            });

            //滑动中
            obj.bind("touchmove", function (e) {

                if (isLock && objparent.scrollTop() <= 0) {
                    isCanDo = true;

                    var even = typeof event == "undefined" ? e : event;

                    //保存当前鼠标Y坐标
                    end = hasTouch ? even.touches[0].pageY : even.pageY;

                    if (start < end) {
                        even.preventDefault();
                        //消除滑块动画时间
                        fn.setTranslition(0);
                        //移动滑块
                        fn.translate(end - start - offset);
                        if (end - start >= offset) {
                            objchildren.html('松开立即刷新');
                            //objchildren.css("display","block");
                            $("#loadMore").css("display","none");
                        } else {
                            objchildren.html('下拉可以刷新');
                            //objchildren.css("display","block");
                            $("#loadMore").css("display","none");
                        }
                    }

                }
            });


            //滑动结束
            obj.bind("touchend", function (e) {
                if (isCanDo) {
                    isCanDo = false;
                    //判断滑动距离是否大于等于指定值
                    if (end - start >= offset) {
                        objchildren.html('正在刷新数据中...');
                        //objchildren.css("display","block");
                        $("#loadMore").css("display","none");
                        //设置滑块回弹时间
                        fn.setTranslition(1);
                        //保留提示部分
                        fn.translate(0);

                        //执行回调函数
                        if (typeof callback == "function") {
                            callback.call(fn, e);
                        }
                    } else {
                        //返回初始状态
                        fn.back();
                    }
                }
            });
        },
        pulluploaddata: function (obj, parent, offset, callback) {
            var start,
                end,
                isLock = false,//是否锁定整个操作
                isCanDo = false,//是否移动滑块
                isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
                hasTouch = 'ontouchstart' in window && !isTouchPad;

            /*操作方法*/
            var fn =
                {
                    //移动容器
                    translate: function (diff) {
                        obj.css({
                            "-webkit-transform": "translate(0," + diff + "px)",
                            "transform": "translate(0," + diff + "px)"
                        });
                    },
                    //设置效果时间
                    setTranslition: function (time) {
                        obj.css({
                            "-webkit-transition": "all " + time + "s",
                            "transition": "all " + time + "s"
                        });
                    },
                    //返回到初始位置
                    back: function () {
                        fn.translate(0 - offset);
                        //标识操作完成
                        isLock = false;
                    }
                };
            //将对象转换为jquery的对象
            obj = $(obj);
            var objchildren = obj.children(":last");
            var objparent = parent || obj.parent();
            var diffheight;

            //滑动开始
            obj.bind("touchstart", function (e) {
                diffheight = obj.height() - $(window).height();
                if (!isLock && objparent.scrollTop() >= diffheight) {
                    var even = typeof event == "undefined" ? e : event;
                    //标识操作进行中
                    isLock = true;
                    //保存当前鼠标Y坐标
                    start = hasTouch ? even.touches[0].pageY : even.pageY;
                    //消除滑块动画时间
                    fn.setTranslition(0);
                }
            });

            //滑动中
            obj.bind("touchmove", function (e) {

                if (isLock && objparent.scrollTop() >= diffheight) {
                    isCanDo = true;
                    var even = typeof event == "undefined" ? e : event;

                    //保存当前鼠标Y坐标
                    end = hasTouch ? even.touches[0].pageY : even.pageY;

                    if (start > end) {
                        even.preventDefault();
                        //消除滑块动画时间
                        fn.setTranslition(0);
                        //移动滑块
                        fn.translate(end - start - offset);
                    }

                }
            });
            //滑动结束
            obj.bind("touchend", function (e) {
                if (isCanDo) {
                    isCanDo = false;
                    //判断滑动距离是否大于等于指定值
                    if (start - end >= offset) {
                        //执行回调函数
                        if (typeof callback == "function") {
                            callback.call(fn, e);
                        }
                    }
                    //消除滑块动画时间
                    fn.setTranslition(1);
                    //返回初始状态
                    fn.back();
                }
            });
        }
    }
})();