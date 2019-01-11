/**
 * Created by chendong on 2017/2/10.
 */
'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from './teld-vue-router'
//import vueResource from 'vue-resource'
import FrameBody from '../vue/frame/FrameBody.vue'
//import FrameBody from '../vue/frame/FrameBody.vue'
import { Routes } from '../../teld-router-config'
import VueI18n from './teld-vue-i18n'


//全局配置
Vue.config.devtools = true;
Vue.config.errorHandler = function(err, vm) {
    // handle error
    console.error(err);
}

//路由器
Vue.use(Vuex)
Vue.use(VueRouter)
//Vue.use(vueResource)
Vue.use(VueI18n)

const store = new Vuex.Store({
    state: {
        condition: null
    },
    mutations: {
        updCondition(state, condition) {
            // 变更状态
            state.condition = condition;
        }
    }
})

const router = new VueRouter({
    //mode: 'history',
    base: __dirname,
    routes: Routes,
    linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
    beforeIntoPage(to, from,next);
    next();
})

router.afterEach(route => {
    afterIntoPage(route);
})

const messages = {
}

messages[window.locale] = window.localeMessage


// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: window.locale,
    messages,
})


window.teldVue = new Vue({
    i18n,
    router,
    store,
    render: h => h(FrameBody)
}).$mount('#FrameBody')


