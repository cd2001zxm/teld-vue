<template>
    <div id="div_warning" style="display:none;">
        <div class="col-sm-12  " style="background-color: rgb(247, 247, 247);">
            <div class="col-sm-12  warningStyle" style="max-width:987px;margin-top:8px;">
                <div class=" warningStyleLeft">
                    <div class="content"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAYAAACXtf2DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0YjI5ZGZlZi0wNzFmLTRiN2UtOTAzOS0yMDgwMTk1NmRjYWEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjdDMDA2QUJCQ0M1MTFFNTgwMjVGQjg2NjZDRjJGMTQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjdDMDA2QUFCQ0M1MTFFNTgwMjVGQjg2NjZDRjJGMTQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Yzk2ZGNjY2YtMWY1YS00ZjJmLTg5MGYtZjgwNjhlNGFjMzY0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRiMjlkZmVmLTA3MWYtNGI3ZS05MDM5LTIwODAxOTU2ZGNhYSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrU9g2UAAAE3SURBVHjarJQxbsIwFIYdS0hcoOwtTF3KxgXYQtnhCjCmTbqAEIfpDmLiAsDGABswcYdKkZr+lp4ly9ixXflJn0Ji7JffX5KkmiUsoFI6bnwnJAENmuAk5oBX8OMziQfc/SdogSeQx07wDM5gBiqwpBS3WA1WoAPe6PwILuA9xhaltNAElIT4PVCk/zuBFHsAI23sG/Rcwrmn2MwwlvkI5w6xX2AB7nStIhhdE2MF/Td4i9agTWJLpQGjd0FUwyWc14gdKGJt5RRuStCkZ35vEKsncAo3JchJXhbwlluFc4PYQhPrU1bh+hYJsS+g69h7U0nhV3LykECKndYsrj6mNuGp2kAmkGJ3YFxzlzbJVuFcE/vh+rQ4FleFFzKB/BRv2eJ3yGLUnAuXfZFCNFirexa5Nn8CDACd+1di54PwiQAAAABJRU5ErkJggg=="
                                              style="vertical-align:middle"/></div>
                </div>
                <div class="warningStyleRight">
                    <div class="content">
                        <font color="#373737">
                            本电站充电模式为智能调度充电，目前处于电价高峰时段，已插枪终端处于暂停充电状态，
                            如需紧急补电请点击相应终端的人工调度按钮，开启立即充电模式。
                        </font>
                    </div>
                </div>
            </div>
            <div style="height:50px;">
            </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <hr class="wide " style="margin-top:2px;margin-bottom:2px;">
        </div>
    </div>
</template>


<style>

</style>


<script>

    //import LayoutSingleList from "teld-vue-frame/vue/LayoutSingleList.vue"
    //import Buttons from "teld-vue-frame/vue/Button.vue"

    //引用组件
    export default {

        data() {
            return {} //初始化data 
        },

        mounted() {
            //初始化控件等dom操作 
            //注意只有该声明周期可以操作dom 
        },

        components: {
            //'LayoutSingleList': LayoutSingleList,
            //'Buttons': Buttons
            //注册组件
        },

        methods: {
            //页面按钮click事件绑定 
        }
    }


</script>