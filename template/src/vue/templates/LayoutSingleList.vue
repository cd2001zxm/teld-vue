<template>
    <div class="" id="LayoutSingleList">
        <div class="col-lg-12 col-sm-12 col-xs-12">
            <div class="widget radius-bordered" style="margin-bottom: 1px;min-height:500px">
                <div class=" widget-body">

                    <div id="searchCondition" class="table-toolbar" style="padding-top:5px; padding-bottom:5px;">
                        <slot name="TableListSearch"></slot>
                    </div>
                    <!--class="table-toolbar"-->
                    <hr class="wide" style="margin-top:2px;margin-bottom:2px;" />
                    <div  style="text-align:left;" name="ButtonGroup">
                        <slot name="TableListBtn"></slot>
                    </div>
                    <div class="table-responsive">
                        <slot name="TableContent"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        data(){
            return{
            }
        }
    }

</script>
