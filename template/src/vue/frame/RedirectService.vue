<template>
    <div>
    </div>

</template>



<script>
    export default{
        data(){

            return {
                a:""
            }
        },
        mounted(){
            var param = this.$route.query
            var otherParam = []
            for(var key in param){
                if(key !="appName" && key !="path")
                    otherParam.push(key+"="+param[key])
            }

            var path = param.path
            if(path.indexOf('/')==-1){
                for(var index in window.MainRouterInfo){
                    var item = window.MainRouterInfo[index]
                    if(item.ChunkName == path){
                        path = item.Router
                        break
                    }
                }
                    //ChunkName
            }

            if(otherParam.length==0)
                window.location.hash = "/" + param.appName + path
            else
                window.location.hash = "/" + param.appName + path + "?" + otherParam.join("&")

        }

    }


</script>