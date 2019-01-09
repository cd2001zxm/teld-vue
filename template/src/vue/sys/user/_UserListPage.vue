<template>
    <div class="row" id="app">

        <template v-for="row in dashboard.rows">
            <div class="dashboard-row col-lg-12 col-sm-12 col-xs-12" data-component-id="">
                <div class="row">
                    <template v-for="panel in row.panels">
                        <!--<div class="panel-container">-->
                            <div v-bind:style="'float:left;display: block;width:'+panel.width" class="dashboard-panel draggable">
                                <div class="widget" >
                                    <div class="widget-header">
                                        <i class="widget-icon fa fa-check"></i>
                                        <span class="widget-caption">{{panel.title}}</span>
                                        <div class="widget-buttons">
                                            <a href="#" data-toggle="config">
                                                <i class="fa fa-cog"></i>
                                            </a>
                                            <a href="#" data-toggle="maximize">
                                                <i class="fa fa-expand"></i>
                                            </a>
                                            <a href="#" data-toggle="collapse">
                                                <i class="fa fa-minus"></i>
                                            </a>
                                            <a href="#" data-toggle="dispose">
                                                <i class="fa fa-times"></i>
                                            </a>
                                        </div><!--Widget Buttons-->
                                    </div><!--Widget Header-->
                                    <div class="widget-body resizeable">
                                        <p>
                                            Without any change in default mark-up.
                                        </p>
                                    </div><!--Widget Body-->
                                </div>
                            </div>
                        <!--</div>-->

                    </template>


                </div>
            </div>
        </template>


        <div class="col-lg-12 col-sm-12 col-xs-12">
            <button id="funcNew" class="btn btn-primary" type="button" v-on:click="addRow"><i class="fa fa-plus"></i>增加行</button>
        </div>


    </div>
</template>
<style>

    .dashboard-panel{
        min-width: 20%;
    }
    .widget{
        padding: 5px;
    }
    .list-complete-item {
        padding: 4px;
        margin-top: 4px;
        border: solid 1px;
        transition: all 1s;
    }

    .list-complete-enter, .list-complete-leave-active {
        opacity: 0;
    }
    #resizable { width: 150px; height: 150px; padding: 0.5em; }
    #resizable h3 { text-align: center; margin: 0; }
    #draggable { width: 100px; height: 100px; padding: 0.5em; float: left; margin: 10px 10px 10px 0; }
    #droppable { width: 150px; height: 150px; padding: 0.5em; float: left; margin: 10px; }
</style>
<script>


    export default {

        data ()
        {
            return {
                dashboard:{
                    rows:[
                        {
                            panels:[{
                                title:"测试1",
                                width:"30%"
                            },{
                                title:"测试2",
                                width:"40%"
                            },{
                                title:"测试3",
                                width:"30%"
                            }]
                        },
                        {
                            panels:[{
                                title:"测试11",
                                width:"60%"
                            },{
                                title:"测试12",
                                width:"40%"
                            }]
                        },
                        {
                            panels:[{
                                title:"测试13",
                                width:"100%"
                            }]
                        }
                    ]
                }

            }
        },
        mounted(){

            var that = this

            this.initResizeable()

            $(".draggable").draggable({

                revert: "invalid", // when not dropped, the item will revert back to its initial position
                helper: "clone",
                cursor: "move",
                opacity: 0.35,
                zIndex: 10000
            });

            $(".dashboard-panel").droppable({
                drop: function( event, ui ) {
                    console.dir(ui)
//                    $(this).resizable("destroy");
//                    ui.draggable.resizable("destroy");

                    //$(".resizeable").resizable({ destroy: true });
                    window.resizableList.each(function () {
                        $(this).resizable("destroy");
                    })

                    var temp = $(this).html()
                    var tempWidth = $(this).width()
                    var tempHeight = $(this).height()


                    $(this).empty().html(ui.draggable.html())
                    $(this).width(tempWidth)
                    $(this).height(tempHeight)

                    var tempSrcWidth = ui.draggable.width()
                    var tempSrcHeight = ui.draggable.height()

                    ui.draggable.empty().html(temp)
                    ui.draggable.width(tempSrcWidth)
                    ui.draggable.height(tempSrcHeight)
                    $(this).css("border-style","none")



                    that.initResizeable()
                },
                over:function( event, ui ) {
                    $(this).css("border-style","dotted")
                },
                out: function(event, ui) {
                    $(this).css("border-style","none")
                },
            });
        },

        methods: {
            initResizeable: function() {
                //$(".resizeable").resizable("destroy");
                window.resizableList = $( ".resizeable" ).resizable({
                    resize:function( event, ui ){
                        var w = ui.element.closest(".dashboard-row").width()
                        var afterResizeWidth = ui.size.width/w * 100
                        ui.element.closest(".widget").find(".widget-header").width(ui.size.width -12)
                        ui.element.closest(".dashboard-panel").width(afterResizeWidth + "%")
                        var lastPanelWidth = w
                        lastPanelWidth -= ui.size.width

                        var panels = ui.element.closest(".dashboard-row").find(".dashboard-panel")
                        var panelsSize = panels.length - 1
                        panels.each(function (index) {
                            if(index != 0 && index != panelsSize)
                                lastPanelWidth -= $(this).width()
                        })
                        panels.last().width(lastPanelWidth/w *100 + "%")

                    },
                    stop:function (event, ui) {
                        var h = ui.size.height

                        ui.element.closest(".dashboard-row").find(".widget-body").height(h)
                    }
                });

            },
            addRow:function (event) {
                console.dir(this.dashboard)
                this.dashboard.rows.push({})
            }
        }
    }

</script>