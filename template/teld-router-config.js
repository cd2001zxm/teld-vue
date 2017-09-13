

const IndexPage = r => require.ensure([], () => r(require('../vue/frame/Index.vue')), 'Index')


export const Routes = [
    //首页
    { path: '/', component: IndexPage },
   
]