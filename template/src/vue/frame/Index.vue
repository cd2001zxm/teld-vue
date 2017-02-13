<template>

        <div class="row hidden-xs" id="TeldIndex">
            <div class="col-lg-12 col-sm-12 col-xs-12" id="wyqcd" style="height:100%">
                <div id="wyqimg" class="row" style=" text-align: center;vertical-align: middle;">
                    <img src="/Content/img/ntbwld.png" height="45" />
                </div>
            </div>
        </div>

</template>

<script>

    export default{
        data(){
            return{
            }
        },
        mounted(){
            if (!isPC()) {
                $("#sidebar").addClass("hide");
                $(".page-content").hide();
                $(".navbar").show();
            } else {
                var resizeMain = function (init) {

                    var h = window.screen.availHeight - 110 - $(".navbar").height() - $(".page-header").height();
                    if (!init) {
                        h = h + 100;
                    }
                    var th = h / 2 - 22.5;
                    $("#wyqcd").height(h);
                    $("#wyqimg").css("margin-top", th);
                }
                resizeMain(true);
            }
        }
    }
</script>
