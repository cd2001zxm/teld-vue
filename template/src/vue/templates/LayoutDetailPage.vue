<template>
    <div id="LayoutDetailPage" class="col-lg-12 col-sm-12 col-xs-12">
                <!--按钮操作区-->
                <div class="well widget-body" style="text-align:left;margin-bottom: 10px"  name="ButtonGroup" id="upbuttondiv">
                    <div class="widget-buttons buttons-bordered " style="border:none;">
                        <button id="btnAdd" title="返回" class="btn btn-default goback btn-primary" v-on:click="back"><i class="fa fa-reply "></i>返回</button>
                    </div>
                    <div class="widget-buttons buttons-bordered " style="border:none;">
                        <template v-if="priviousBtnEnabled">
                            <button id="btnAdd" title="上一条" class="btn btn-default " v-on:click="previous"><i class="fa fa-long-arrow-up"></i>上一条</button>
                        </template>
                        <template v-else>
                            <button id="btnAdd" title="上一条" class="btn btn-default " v-on:click="previous" disabled="disabled"><i class="fa fa-long-arrow-up"></i>上一条</button>
                        </template>

                    </div>
                    <div class="widget-buttons buttons-bordered " style="border:none;">
                        <template v-if="nextBtnEnabled">
                            <button id="btnAdd" title="下一条" class="btn btn-default " v-on:click="next"><i class="fa  fa-long-arrow-down"></i>下一条</button>
                        </template>
                        <template v-else>
                            <button id="btnAdd" title="下一条" class="btn btn-default " v-on:click="next" disabled="disabled"><i class="fa  fa-long-arrow-down"></i>下一条</button>
                        </template>
                    </div>
                </div>

                <!--数据展示区-->
                    <div class="row" style="padding:14px">
                        <slot name="DetailContent"></slot>
                    </div>



                <!--底部的保存返回-->
                <div class="well widget-body" style="text-align:left;" name="ButtonGroup">
                    <div class="widget-buttons buttons-bordered " style="border:none;">
                        <button id="btnAdd" title="返回" class="btn btn-default goback btn-primary" v-on:click="back"><i class="fa fa-reply "></i>返回</button>
                    </div>
                    <div class="widget-buttons buttons-bordered " style="border:none;">
                        <template v-if="priviousBtnEnabled">
                            <button id="btnAdd" title="上一条" class="btn btn-default " v-on:click="previous"><i class="fa fa-long-arrow-up"></i>上一条</button>
                        </template>
                        <template v-else>
                            <button id="btnAdd" title="上一条" class="btn btn-default " v-on:click="previous" disabled="disabled"><i class="fa fa-long-arrow-up"></i>上一条</button>
                        </template>

                    </div>
                    <div class="widget-buttons buttons-bordered " style="border:none;">
                        <template v-if="nextBtnEnabled">
                            <button id="btnAdd" title="下一条" class="btn btn-default " v-on:click="next"><i class="fa  fa-long-arrow-down"></i>下一条</button>
                        </template>
                        <template v-else>
                            <button id="btnAdd" title="下一条" class="btn btn-default " v-on:click="next" disabled="disabled"><i class="fa  fa-long-arrow-down"></i>下一条</button>
                        </template>
                    </div>
                </div>
            </div>
</template>

<script>

    export default{
        data(){
            let result={};
            let IdList = window.sessionStorage.getItem(this.ssid).split(",");
            let curIndex = getIndex(this.idval,IdList);
            let total = IdList.length;
            result.priviousBtnEnabled = curIndex==0?false:true;
            result.nextBtnEnabled = curIndex==total-1?false:true;
            result.curIndex = curIndex;
            return result;
        },
        props: {
            ssid:{
                type: String,
                required: true
            },
            idval:{
                type: String,
                required: true
            }
        },
        beforeDestroy(){
           //window.sessionStorage.removeItem(this.ssid)
        },
        methods :{
            next :function () {
                let result={};
                let curIndex = this.curIndex;
                let IdList = window.sessionStorage.getItem("BtnListPage_IDList").split(",");
                let ButtonID = IdList[curIndex + 1];
                let total = IdList.length;

                this.curIndex = curIndex + 1;
                this.priviousBtnEnabled = this.curIndex==0?false:true;
                this.nextBtnEnabled = this.curIndex==total-1?false:true;
                this.$emit('idchanged',ButtonID)
            },
            previous :function () {
                let result={};
                let curIndex = this.curIndex;
                let IdList = window.sessionStorage.getItem("BtnListPage_IDList").split(",");
                let ButtonID = IdList[curIndex - 1];
                let total = IdList.length;

                this.curIndex = curIndex - 1;
                this.priviousBtnEnabled = this.curIndex==0?false:true;
                this.nextBtnEnabled = this.curIndex==total-1?false:true;
                this.$emit('idchanged',ButtonID)
            },
            back :function () {

            }
        }
    }
    function getIndex(id, idList) {
        for (var i = 0; i < idList.length; i++) {
            if (idList[i] == id) return i;
        }
        return -1;
    }
</script>
