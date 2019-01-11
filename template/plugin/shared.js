(function(modules) { // webpackBootstrap
                     // install a JSONP callback for chunk loading
    var parentJsonpFunction = window["webpackJsonp"];
    window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
        // add "moreModules" to the modules object,
        // then flag all "chunkIds" as loaded and fire callback
        var moduleId, chunkId, i = 0, callbacks = [];
        for(;i < chunkIds.length; i++) {
            chunkId = chunkIds[i];
            if(installedChunks[chunkId])
                callbacks.push.apply(callbacks, installedChunks[chunkId]);
            installedChunks[chunkId] = 0;
        }
        for(moduleId in moreModules) {
            if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                modules[moduleId] = moreModules[moduleId];
            }
        }
        if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
        while(callbacks.length)
            callbacks.shift().call(null, __webpack_require__);
        if(moreModules[0]) {
            //替换路由模块脚本
            //modules.pop()
            modules["./teld-router-config.js"] = routerHandle
            installedModules[0] = 0;
            return __webpack_require__(0);
        }
    };


    // The module cache
    var installedModules = {};

    // object to store loaded and loading chunks
    // "0" means "already loaded"
    // Array means "loading", array contains callbacks
    var installedChunks = {
        shared:0
    };

    // The require function
    function __webpack_require__(moduleId) {

        // Check if module is in cache
        if(installedModules[moduleId])
            return installedModules[moduleId].exports;

        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };

        // Execute the module function
        if(!modules[moduleId]){
            console.warn(moduleId+"模块不存在")
            // alert("模块在上传的JS文件中不存在！！")
            return
        }

        if(/\.(png|jpg|jpeg|gif|woff|ttf|eot|svg)$/.test(moduleId)){
            var oldp = __webpack_require__.p
            __webpack_require__.p = __webpack_require__.p + window.p_context.SubApplication +"/"
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            __webpack_require__.p = oldp
        }else{
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        }

        // Flag the module as loaded
        module.loaded = true;

        // Return the exports of the module
        return module.exports;
    }

    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    __webpack_require__.e = function requireEnsure(chunkId, callback) {
        // "0" is the signal for "already loaded"
        if(installedChunks[chunkId] === 0)
            return callback.call(null, __webpack_require__);

        // an array means "currently loading".
        if(installedChunks[chunkId] !== undefined) {
            installedChunks[chunkId].push(callback);
        } else {


            // start chunk loading

            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.charset = 'utf-8';
            //script.async = true;

            if(chunkId.indexOf("$")==-1){
                installedChunks[chunkId] = [callback];
                if(chunkId=='frame' || chunkId =='Index'){
                    script.src = __webpack_require__.p + "" + ({"frame":"frame","Index":"Index"}[chunkId]||chunkId) + ".js";
                }else{
                    var saved = window.localStorage.getItem(window.versionKey)
                    var versionStr = window.versionKey && saved?"?version="+saved:""

                    var subApp = __webpack_require__.f?__webpack_require__.f:window.p_context.SubApplication
                    script.src = __webpack_require__.p + subApp +"/" + chunkId +  ".js" + versionStr;
                }
            } else {

                var pjs = chunkId.split("$")
                var p = pjs[0]
                var js = pjs[1]
                __webpack_require__.f=p
                installedChunks[js] = [callback];

                getDataSync(FrameSGHost+"WRPFrame-GetRouterList", "get", { applicationId:p}, function (result) {
                    if (result.state == "1") {
                        data = result.data;
                        var PluginSetting = result.data.PluginSetting
                        if(PluginSetting){
                            window.MenuType = PluginSetting.MenuType?PluginSetting.MenuType:0
                            window.ShowPageHeader = PluginSetting.ShowPageHeader==1?true:false
                            if(!isPC())window.ShowPageHeader = true
                            window.ShowNowOnNavbar = PluginSetting.ShowNowOnNavbar==1?true:false
                            window.ShowFullscreenOnNavbar = PluginSetting.ShowFullscreenOnNavbar==1?true:false
                            window.defaultRouter = PluginSetting.defaultRouter?PluginSetting.defaultRouter:null
                            //window.AppUrl = PluginSetting.AppUrl?PluginSetting.AppUrl:null
                        }
                        var PluginVariable = result.data.PluginVariable
                        if(PluginVariable && PluginVariable.length>0){
                            for(var index in PluginVariable){
                                var item = PluginVariable[index]
                                //window[item.VariableKey] = item.VariableValue
                                window[item.VariableKey] = item.VariableValue?item.VariableValue.replace(".${domain}",window.domain):null
                            }
                        }
                        var PluginVersion = result.data.PluginVersion
                        if(PluginVersion){
                            window.PluginVersion={}
                            for(var index in PluginVersion){
                                var item = PluginVersion[index]
                                window.PluginVersion[item.FuncId] = item.VerMask
                            }
                        }
                        var MainRouterInfo = result.data.MainRouterInfo
                        if(MainRouterInfo){
                            window.MainRouterInfo = MainRouterInfo
                        }

                        var AllPluginSetting = result.data.AllPluginSetting
                        if(AllPluginSetting){
                            window.AllPluginSetting = AllPluginSetting
                        }


                    } else {
                        alert(result.errmsg);
                    }
                });

                /***
                 * 如果后台是数据库的配置方式就读库
                 * 配置文件的方式就读配置文件
                 */
                getDataSync(FrameSGHostSOM+"WebRunPlatform-GetColMetaDatas", "post", {
                    applicationName:p
                }, function (result) {

                    if(result.total == 0){
                        if(window.location.href.replace("http://","").replace("https://","").startsWith("web."))
                            loadAndRusScript("teld-helper-list-17.js");
                    }else{
                        try{
                            createHelperList(result)
                        }catch (e){
                            alert(e)
                            console.dir(e)
                        }


                    }
                });

                script.src = __webpack_require__.p + p + "/" + js + ".js"
            }

            loadAndRusScript(script.src)
        }
    };

    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // __webpack_public_path__
    __webpack_require__.p = "plugin/";

    __webpack_require__.f = null;

    function loadAndRusScript(script) {
        $.ajax({
            url: script,
            type: "get",
            dataType: "script",
            data: undefined,
            xhrFields: { withCredentials:false},
            async:false

        });
    }

    function routerHandle(module, exports, __webpack_require__) {

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var IndexPage = function IndexPage(r) {
            return __webpack_require__.e/* nsure */("Index", function () {
                return r(__webpack_require__('./src/vue/frame/Index.vue'));
            });
        };
        var SubIndexPage= function IndexPage(r) {
            return __webpack_require__.e/* nsure */("Index", function () {
                return r(__webpack_require__('./src/vue/frame/SubIndex.vue'));
            });
        };

        // var Setting = function Setting(r) {
        //     return __webpack_require__.e/* nsure */('Index', function () {
        //         return r(__webpack_require__('./src/vue/frame/Setting.vue'));
        //     });
        // };
        // var Avatar = function Avatar(r) {
        //     return __webpack_require__.e/* nsure */('Index', function () {
        //         return r(__webpack_require__('./src/vue/frame/Avatar.vue'));
        //     });
        // };
        var Mvc = function Mvc(r) {
            return __webpack_require__.e/* nsure */('Index', function () {
                return r(__webpack_require__('./src/vue/frame/Mvc.vue'));
            });
        };

        var RedirectService = function RedirectService(r) {
            return __webpack_require__.e/* nsure */('Index', function () {
                return r(__webpack_require__('./src/vue/frame/RedirectService.vue'));
            });
        };

        exports.Routes = [
            //首页
            { path: '/', component: IndexPage, name: "首页" },
            { path: '/RService', component: RedirectService, name: "" }
            // { path: '/Frame/Avatar', component: Avatar, name: "设置" }
        ];
        var oldRoutes = exports.Routes;
        //加载插件脚本
        if(!window.p_context.isPlatformIndex){
            var data = "";
            var script = [];
            var funScriptList =[];
            var routerScriptList = [];


            getDataSync(FrameSGHost+"WRPFrame-GetRouterList", "get", { applicationId:window.p_context.SubApplication}, function (result) {
                if (result.state == "1") {
                    data = result.data;
                    var PluginSetting = result.data.PluginSetting
                    if(PluginSetting){
                        window.MenuType = PluginSetting.MenuType?PluginSetting.MenuType:0
                        window.ShowPageHeader = PluginSetting.ShowPageHeader==1?true:false
                        window.ShowNowOnNavbar = PluginSetting.ShowNowOnNavbar==1?true:false
                        window.ShowFullscreenOnNavbar = PluginSetting.ShowFullscreenOnNavbar==1?true:false
                        window.defaultRouter = PluginSetting.defaultRouter?PluginSetting.defaultRouter:null
                        window.AppUrl = PluginSetting.AppUrl?PluginSetting.AppUrl:null
                    }
                    var PluginVariable = result.data.PluginVariable
                    if(PluginVariable && PluginVariable.length>0){
                        for(var index in PluginVariable){
                            var item = PluginVariable[index]
                            //console.dir(document.domain)
                            window[item.VariableKey] = item.VariableValue?item.VariableValue.replace(".${domain}",window.domain):null
                        }
                    }
                    var PluginVersion = result.data.PluginVersion
                    if(PluginVersion){
                        window.PluginVersion={}
                        for(var index in PluginVersion){
                            var item = PluginVersion[index]
                            window.PluginVersion[item.FuncId] = item.VerMask
                        }
                    }
                    var MainRouterInfo = result.data.MainRouterInfo
                    if(MainRouterInfo){
                        window.MainRouterInfo = MainRouterInfo
                    }

                    var AllPluginSetting = result.data.AllPluginSetting
                    if(AllPluginSetting){
                        window.AllPluginSetting = AllPluginSetting
                    }


                } else {
                    NotifyError(result.errmsg);
                }
            });


            /***
             * 如果后台是数据库的配置方式就读库
             * 配置文件的方式就读配置文件
             */
            getDataSync(FrameSGHostSOM+"WebRunPlatform-GetColMetaDatas", "post", {
                applicationName:window.p_context.SubApplication
            }, function (result) {

                if(result.total == 0){
                    // $.ajax({
                    //     url: "plugin/"+window.p_context.SubApplication+"/teld-helper-list-17.js",
                    //     type: "get",
                    //     dataType: "script",
                    //     data: undefined,
                    //     xhrFields: { withCredentials:false},
                    //     async:false
                    //
                    // });
                    loadAndRusScript("teld-helper-list-17.js")
                    //$.getScript("plugin/"+window.p_context.SubApplication+"/teld-helper-list-17.js");
                }else{
                    try{

                        createHelperList(result)


                    }catch (e){
                        alert(e)
                    }


                }
            });


            var routerList = data.RouterInfo
            var reqiredTemplate = 'var {0} = function {0}(r) {return __webpack_require__.e("{1}", function () {return r(__webpack_require__("{2}"));});};'
            var routeListTemplate = "var Routes = exports.Routes = [{0}]";
            var routeTemplate = "{ path: '{0}', component: {1}, name: '{2}' }";
            var crossRouteTemplate = "{ path: '{0}', component: {1}, name: '{2}' ,meta:{system:'{3}',mvcUrl:'{4}',newOpen:'{5}'}}";

            for(var i in routerList){
                var router = routerList[i];
                var reqiredFun = ""
                var routerOjb = ""

                var appName = router.ApplicationName;
                if(appName=="saas")appName = window.p_context.SubApplication


                //是否跨域
                if(router.CrossApplication=="0"){
                    var ChunkName;

                    //SAAS加载的场合
                    if(router.MvcAppName && router.MvcAppName!=""){

                        ChunkName = router.MvcAppName+"$"+router.ChunkName

                    }
                    //标准加载
                    else {
                        appName = router.ApplicationName
                        ChunkName = router.ChunkName
                    }

                    reqiredFun = reqiredTemplate.replace("{0}","fun"+i).replace("{0}","fun"+i).replace("{1}",ChunkName).replace("{2}",router.VueFileName)
                    routerOjb = routeTemplate.replace("{0}","/"+appName + router.Router).replace("{1}","fun"+i).replace("{2}",router.RouterName)
                }else{

                    //系统内跳转（访问MVC）
                    if(router.CrossType == "Vue"){
                        routerOjb = crossRouteTemplate.replace("{0}","/"+appName +router.Router).replace("{1}","Mvc").replace("{2}",router.RouterName)
                            .replace('{3}',router.MvcAppName).replace('{4}',router.MvcUrl)
                    }
                    //访问其他系统
                    else{
                        routerOjb = crossRouteTemplate.replace("{0}","/"+appName +router.Router).replace("{1}","Mvc").replace("{2}",router.RouterName)
                            .replace('{3}',router.MvcAppName).replace('{4}',router.MvcUrl).replace('{5}',"true")
                    }
                    //跨系统访问
                    //reqiredFun = reqiredTemplate.replace("{0}","fun"+i).replace("{0}","fun"+i).replace("{1}",router.ChunkName).replace("{2}",router.VueFileName)

                }
                if(routerOjb==""){
                    debugger
                }
                funScriptList.push(reqiredFun)
                routerScriptList.push(routerOjb)
            }

            script = script.concat(funScriptList);
            script.push("var Routes = exports.Routes = [")
            script.push(routerScriptList.join(','))
            script.push("]")


            var exe = function (module, exports, __webpack_require__) {
                eval(script.join(""))
            };
            exe.call(this,module, exports, __webpack_require__)

            for(var i in exports.Routes){
                var route = exports.Routes[i];
                if(route.path=="/" || route.path==("/"+window.p_context.SubApplication)
                    || route.path==("/"+window.p_context.SubApplication+"/")
                    ||  route.path.indexOf("/Frame/")!=-1)continue

                oldRoutes.push(route)
            }


            oldRoutes.push({
                path:'/'+window.p_context.SubApplication ,
                component: SubIndexPage, name: (window.ApplilcationNames?window.ApplilcationNames[window.p_context.SubApplication]:"")
            })

            console.dir(oldRoutes)
            exports.Routes = oldRoutes;
        }

        /***/ }

    function createHelperList(data) {
        var rows = data.rows
        var helperList17 = {}
        for(var i in rows){
            var item = rows[i]
            var helper = {}
            //helper["helperCode"] = item.helperCode
            helper["title"] = item.title

            helper["url"] = '' + eval(item.url)
            helper["pageSize"] = item.pageSize
            helper["SeqColWidth"] = item.SeqColWidth
            helper["title"] = item.title
            helper["rowKey"] = item.rowKey
            helper["wbid"] = item.ResourceInfoID

            var colMetaData = {}
            for(var j in item.colMetaDataList){
                var metaItem = item.colMetaDataList[j]

                colMetaData[metaItem.name]={
                    field:metaItem.field,
                    displayName:metaItem.displayName,
                    width:metaItem.width,
                    cssClass:metaItem.cssClass,
                    //isTree:metaItem.isTree=="1"?true:false,
                    show:metaItem.show=="1"?true:false,
                    hasTitle:metaItem.hasTitle=="1"?true:false,
                    return:metaItem.returnValue=="1"?true:false,
                    enum:metaItem.enumValue,
                    wbid:metaItem.wbid
                }

                if(metaItem.isTree=="1"){
                    colMetaData[metaItem.name]["isTree"]=true
                }

            }

            helper["colMetaData"] = colMetaData

            helperList17[item.helperCode] = helper
        }
        //var temp = JSON.stringify(helperList17)

        // for(var i in rows){
        //     var item = rows[i]
        //     temp = temp.replace("{"+i+"}",item.url)
        // }
        //console.dir(temp)
        if(window.helperList17)
            $.extend(window.helperList17,helperList17)
        else
            window.helperList17 = helperList17
        console.dir(window.helperList17)
    }
})
/************************************************************************/
([]);