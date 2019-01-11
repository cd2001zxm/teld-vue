

const UserListPage = r => require.ensure([], () => r(require('./src/vue/sys/user/UserListPage.vue')), 'User')

export const Routes = [
    {path: '/newsys/User/UserListPage', component: UserListPage, name: "用户管理"},
]