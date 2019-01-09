

const IndexPage = r => require.ensure([], () => r(require('./src/vue/frame/Index.vue')), 'Index')
const SubIndexPage = r => require.ensure([], () => r(require('./src/vue/frame/SubIndex.vue')), 'Index')
const UserListPage = r => require.ensure([], () => r(require('./src/vue/sys/user/UserListPage.vue')), 'User')

export const Routes = [
    //首页
    { path: '/', component: IndexPage },
    { path: '/newsys', component: SubIndexPage },
    {path: '/newsys/User/UserListPage', component: UserListPage, name: "用户管理"},
]