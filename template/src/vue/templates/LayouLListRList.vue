/**
* Created by ligq on 2017/5/29.
*/
<template>
    <div class="" id="LayoutListRListContainer">
        <div class="row">
            <div class="col-lg-12 col-sm-12 col-xs-12" style="padding-left: 5px;padding-right: 5px;">
                <div class="widget radius-bordered" style="margin-bottom: 0px;">
                    <div class="widget-header">
                        <slot name="TableListSearch"></slot>
                    </div>
                    <div style="margin-top: 12px; margin-right: 12px;">
                        <div class="widget-body" v-bind:class="lClass" style="padding: 12px; margin-bottom: 1px;">
                            <slot name="TableContentL"></slot>
                        </div>
                        <div class="widget-body"  v-bind:class="rClass"  style="padding: 12px; left: 12px; margin-bottom: 1px;">
                            <div class="table-responsive ">
                                <slot name="TableContentR"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LayoutListRlist',
        data(){
            return {
            };
        },
        props:["leftWidth"],
        methods: {

        },
        computed: {
            lClass: function () {
                var left = 1;
                this.leftWidth = parseInt(this.leftWidth)
                if(this.leftWidth >= 12){
                    left = 12;
                }else{
                    left = this.leftWidth;
                }
                var clsObject = {};
                clsObject["col-lg-" + left] = true;
                clsObject["col-md-" + left] = true;
                clsObject["col-sm-" + left] = true;
                clsObject["col-xs-12"] = true;
                clsObject["left-con"] = true;
                return clsObject
            },
            rClass: function () {
                var right = 1;
                this.leftWidth = parseInt(this.leftWidth)
                if(this.leftWidth >= 12){
                    right = 12;
                }else{
                    right = 12 - this.leftWidth;
                }
                var clsObject = {};
                clsObject["col-lg-" + right] = true;
                clsObject["col-md-" + right] = true;
                clsObject["col-sm-" + right] = true;
                clsObject["col-xs-12"] = true;
                clsObject["right-con"] = true;
                return clsObject
            }
        }
    }
</script>
