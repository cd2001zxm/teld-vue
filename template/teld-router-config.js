
const IndexPage = resolve => require(['./src/vue/frame/Index.vue'], resolve)
//参考例子
//const RoleListPage = resolve => require(['./src/vue/sys/role/RoleListPage.vue'], resolve)








export const Routes = [
    //首页
    { path: '/', component: IndexPage },
    //参考例子
    //{ path: '/Role/RoleListPage', component: RoleListPage,name:"角色管理"},

]