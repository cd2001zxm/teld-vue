/**
 * Created by chen-dong on 2015/6/22.
 */
var helperList17 = {
    //用户列表的组织机构帮助
    "UserListOrgHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户详情页的公司的组织机构帮助
    "companyOrgHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户详情页的部门的组织机构帮助
    "DepartmentOrgHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户详情页部门的组织机构帮助
    "WorkgroupOrgHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户分配角色的组织机构帮助
    "UserAssRoleHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色列表的组织机构帮助
    "RoleListOrgHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色成员的组织机构帮助
    "RoleEgisOrgHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //组织机构详情页的上级节点组织机构帮助
    "UponNoedeOrgHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色详情页的所属系统的组织机构帮助
    "BelongOrgHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户数据权限 组织机构帮助  DataOrgHelp
    "DataOrgHelp":{
        title:"组织机构",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&orgType='0'&parentId=&fullName=",
        // url:"//192.169.1.110:9091/api/invoke?SID=SYS_CommonHelper_GetOrganizationList&Token=teld&orgType='0'&parentId=&fullName=",
        pageSize:10,
        SeqColWidth:40,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",//绑定的后台数据
                displayName : "编号",//列名称
                width:40,
                cssClass:"text-left",
                hasTitle:true,
                return:true,//是否返回到页面中的帮助
                show:true//是否在帮助列表中显示
            },
            name : {
                field : "FullName",//必须
                displayName : "组织机构",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            category : {
                field : "Category",
                displayName : "类别",
                width:40,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    "ConfigLogDetail": {
        title: "配置发布历史数据", url: "/ConfigCenter/GetLogDetail?help=true", pageSize: 6,
        mapping: {
            "id": "ID",
            "code": "Version",
            "name": "ConfigKey"
        },
        rowKey: "id"
    },
    "CommitLogLogDetail": {
        title: "配置发布历史数据", url: "/ConfigCenter/GetCommitLogDetail?help=true", pageSize: 6,
        mapping: {
            "id": "ID",
            "code": "Version",
            "name": "ConfigKey",
        },
        rowKey: "id"
    },
    "ResourcHelp":{
        title: "请选择服务器",url:"/ApplicationClusterManager/GetResource?help=true", pageSize:10,
        mapping: {
        },
        rowKey: "ID"
    },
    "ServiceHelp":{
        title: "服务列表",url:"/ApplicationClusterManager/GetService?help=true", pageSize:10,
        mapping: {
            "id": "ID",
            "code": "Code",
            "name": "Name"
        },
        rowKey: "ID"
    },
    "TriggerHelp":{
        title: "触发器列表",url:"/Trigger/GetTriggerList?help=true", pageSize:10,
        mapping: {
            "id": "ID",
            "code": "Code",
            "name": "Name"
        },
        rowKey: "ID"
    },
    "TaskHelp":{
        title: "任务列表",url:"/ScheduleCenter/GetTask?help=true", pageSize:10,
        mapping: {
            "id": "ID",
            "code": "Code",
            "name": "Name"
        },
        rowKey: "ID"
    },
    //授权对象列表  功能帮助  AuObjFuncHelp
    "AuObjFuncHelp":{
        title: "功能帮助",url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetFunctionList&help=true", pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:60,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            }
        },
        rowKey: "id"
    },
    //授权对象   详情页面 功能名称帮助
    "AuObjFunFormHelp":{
        title: "功能帮助",url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetFunctionList&help=true", pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:60,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            }
        },
        rowKey: "id"
    },
    //授权对象列表 权限帮助
    "AuObjPreHelp":{
        title: "权限帮助",url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetDataPermissionsList&help=true", pageSize:10,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:60,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            }
        },
        rowKey: "id"
    },
    //授权对象 详情页面 权限名称帮助
    "AuObjPreFormHelp":{
        title: "权限帮助",url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetDataPermissionsList&help=true", pageSize:10,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:60,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            }
        },
        rowKey: "id"
    },
    //授权对象  详情页面  关联字段帮助  AuObjColumnHelp
    "AuObjColumnHelp":{
        title: "表列帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetFieldList&help=true",
        pageSize:10,
        colMetaData : {
            id : {
                field : "FieldName",
                show:false,
                return:true
            },
            name : {
                field : "FieldName",//必须
                displayName : "名称",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            description : {
                field : "FieldDescription",//必须
                displayName : "描述",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            },
            type : {
                field : "FieldType",//必须
                displayName : "类型",//必须
                width:80,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            }
        },
        rowKey: "id"
    },
    "DataAUObjectHelp": {
        title: "授权对象帮助", url: ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetDataAUObjectList&help=true", pageSize: 10,
        colMetaData: {
            id: {
                field: "ID",
                show: false,
                return: true
            },
            DataPermissionsID: {
                field: "DataPermissionsID",
                show: false,
                return: true
            },
            DataFunctionID: {
                field: "FunctionID",
                show: false,
                return: true
            },
            code: {
                field: "Code",
                displayName: "编号",
                width: 60,
                cssClass: "text-left",
                hasTitle: true,
                return: false,
                show: true
            },
            name: {
                field: "Name",//必须
                displayName: "名称",//必须
                width: 300,//宽度
                cssClass: "text-left",//样式，左中右
                isTree: true,//是否显示树的列
                hasTitle: true,//鼠标进入时，是否显示
                show: true,//是否显示该列
                return: true//是否是返回值
            }
        },
        rowKey: "id"
    },
    //依赖授权对象名称帮助
    "relyDataAUObjectHelp": {
        title: "授权对象帮助", url: ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetDataAUObjectList&help=true", pageSize: 10,
        colMetaData: {
            id: {
                field: "ID",
                show: false,
                return: true
            },
            DataPermissionsID: {
                field: "DataPermissionsID",
                show: false,
                return: true
            },
            DataFunctionID: {
                field: "FunctionID",
                show: false,
                return: true
            },
            code: {
                field: "Code",
                displayName: "编号",
                width: 60,
                cssClass: "text-left",
                hasTitle: true,
                return: false,
                show: true
            },
            name: {
                field: "Name",//必须
                displayName: "名称",//必须
                width: 300,//宽度
                cssClass: "text-left",//样式，左中右
                isTree: true,//是否显示树的列
                hasTitle: true,//鼠标进入时，是否显示
                show: true,//是否显示该列
                return: true//是否是返回值
            }
        },
        rowKey: "id"
    },
    //用户/角色 数据权限  全部详情页面 授权对象帮助
    "AllDataAUObjectHelp": {
        title: "授权对象帮助", url: ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetDataAUObjectList&help=true", pageSize: 10,
        colMetaData: {
            id: {
                field: "ID",
                show: false,
                return: true
            },
            DataPermissionsID: {
                field: "DataPermissionsID",
                show: false,
                return: true
            },
            DataFunctionID: {
                field: "FunctionID",
                show: false,
                return: true
            },
            code: {
                field: "Code",
                displayName: "编号",
                width: 60,
                cssClass: "text-left",
                hasTitle: true,
                return: false,
                show: true
            },
            name: {
                field: "Name",//必须
                displayName: "名称",//必须
                width: 300,//宽度
                cssClass: "text-left",//样式，左中右
                isTree: true,//是否显示树的列
                hasTitle: true,//鼠标进入时，是否显示
                show: true,//是否显示该列
                return: true//是否是返回值
            }
        },
        rowKey: "id"
    },
    //用户/角色 数据权限  规则详情页面 授权对象帮助
    "RuleDataAUObjectHelp": {
        title: "授权对象帮助", url: ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetDataAUObjectList&help=true", pageSize: 10,
        colMetaData: {
            id: {
                field: "ID",
                show: false,
                return: true
            },
            DataPermissionsID: {
                field: "DataPermissionsID",
                show: false,
                return: true
            },
            DataFunctionID: {
                field: "FunctionID",
                show: false,
                return: true
            },
            code: {
                field: "Code",
                displayName: "编号",
                width: 60,
                cssClass: "text-left",
                hasTitle: true,
                return: false,
                show: true
            },
            name: {
                field: "Name",//必须
                displayName: "名称",//必须
                width: 300,//宽度
                cssClass: "text-left",//样式，左中右
                isTree: true,//是否显示树的列
                hasTitle: true,//鼠标进入时，是否显示
                show: true,//是否显示该列
                return: true//是否是返回值
            }
        },
        rowKey: "id"
    },
    //用户/角色 数据权限  明细  授权对象帮助
    "DatailDataAUObjectHelp": {
        title: "授权对象帮助", url: ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetDataAUObjectList&help=true", pageSize: 10,
        colMetaData: {
            id: {
                field: "ID",
                show: false,
                return: true
            },
            DataPermissionsID: {
                field: "DataPermissionsID",
                show: false,
                return: true
            },
            DataFunctionID: {
                field: "FunctionID",
                show: false,
                return: true
            },
            code: {
                field: "Code",
                displayName: "编号",
                width: 60,
                cssClass: "text-left",
                hasTitle: true,
                return: false,
                show: true
            },
            name: {
                field: "Name",//必须
                displayName: "名称",//必须
                width: 300,//宽度
                cssClass: "text-left",//样式，左中右
                isTree: true,//是否显示树的列
                hasTitle: true,//鼠标进入时，是否显示
                show: true,//是否显示该列
                return: true//是否是返回值
            }
        },
        rowKey: "id"
    },
    "DataBaseHelp":{
        title: "数据库帮助",url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetDataBaseList&help=true", pageSize:10,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            }
        },
        rowKey: "id"
    },
    //数据权限   数据库帮助
    "PreDataBaseHelp":{
        title: "数据库帮助",url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetDataBaseList&help=true", pageSize:10,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:300,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            }
        },
        rowKey: "id"
    },
    "DataTableHelp":{
        title: "表/视图帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetDbTableViewList&help=true",
        pageSize:10,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:200,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            description : {
                field : "Description",//必须
                displayName : "描述",//必须
                width:200,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            },
            type : {
                field : "Type",//必须
                displayName : "类型",//必须
                width:80,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false,//是否是返回值
                enum:"{U =表&V =视图}"
            }
        },
        rowKey: "id"
    } ,
    //标识列帮助
    "IdColHelp":{
        title: "表列帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetFieldList&help=true",
        pageSize:10,
        colMetaData : {
            id : {
                field : "FieldName",
                show:false,
                return:true
            },
            name : {
                field : "FieldName",//必须
                displayName : "名称",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            description : {
                field : "FieldDescription",//必须
                displayName : "描述",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            },
            type : {
                field : "FieldType",//必须
                displayName : "类型",//必须
                width:80,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            }
        },
        rowKey: "id"
    },
    //  树形列帮助
    "TreeColHelp":{
        title: "表列帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetFieldList&help=true",
        pageSize:10,
        colMetaData : {
            id : {
                field : "FieldName",
                show:false,
                return:true
            },
            name : {
                field : "FieldName",//必须
                displayName : "名称",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            description : {
                field : "FieldDescription",//必须
                displayName : "描述",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            },
            type : {
                field : "FieldType",//必须
                displayName : "类型",//必须
                width:80,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            }
        },
        rowKey: "id"
    },
    //查询列帮助
    "SelectColHelp":{
        title: "表列帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetFieldList&help=true",
        pageSize:10,
        colMetaData : {
            id : {
                field : "FieldName",
                show:false,
                return:true
            },
            name : {
                field : "FieldName",//必须
                displayName : "名称",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            description : {
                field : "FieldDescription",//必须
                displayName : "描述",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            },
            type : {
                field : "FieldType",//必须
                displayName : "类型",//必须
                width:80,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            }
        },
        rowKey: "id"
    },
    //HideColHelp 隐藏列帮助
    "HideColHelp":{
        title: "表列帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetFieldList&help=true",
        pageSize:10,
        colMetaData : {
            id : {
                field : "FieldName",
                show:false,
                return:true
            },
            name : {
                field : "FieldName",//必须
                displayName : "名称",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            description : {
                field : "FieldDescription",//必须
                displayName : "描述",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            },
            type : {
                field : "FieldType",//必须
                displayName : "类型",//必须
                width:80,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            }
        },
        rowKey: "id"
    },
    //SaveCol 保存列帮助
    "SaveColHelp":{
        title: "表列帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetFieldList&help=true",
        pageSize:10,
        colMetaData : {
            id : {
                field : "FieldName",
                show:false,
                return:true
            },
            name : {
                field : "FieldName",//必须
                displayName : "名称",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            description : {
                field : "FieldDescription",//必须
                displayName : "描述",//必须
                width:100,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            },
            type : {
                field : "FieldType",//必须
                displayName : "类型",//必须
                width:80,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:false//是否是返回值
            }
        },
        rowKey: "id"
    },
    //模块管理  上级模块的模块帮助
    "UponMenuHelp":{
        title: "模块帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetMenuList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            menu: {
                field : "MenuName",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:150,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            appname: {
                field : "AppFullName",
                displayName : "所属应用",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                show:true,
                return:false
            },
            appid: {
                field : "ApplicationID",
                displayName : "所属应用",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                show:false,
                return:true
            },
        },
        rowKey: "id"
    },
    //模块管理  管理模块的模块帮助
    "RelationMenuDivHelp":{
        title: "模块帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetMenuList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            menu: {
                field : "MenuName",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:150,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            appname: {
                field : "AppFullName",
                displayName : "所属应用",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                show:true,
                return:false
            },
            appid: {
                field : "ApplicationID",
                displayName : "所属应用",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                show:false,
                return:true
            },
        },
        rowKey: "id"
    },
    //用户按钮权限 模块帮助  UserAuthBtnHelp
    "UserAuthBtnHelp":{
        title: "模块帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetMenuList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            menu: {
                field : "MenuName",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:150,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            appname: {
                field : "AppFullName",
                displayName : "所属应用",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                show:true,
                return:false
            },
            appid: {
                field : "ApplicationID",
                displayName : "所属应用",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                show:false,
                return:true
            },
        },
        rowKey: "id"
    },
    //角色按钮权限 模块帮助
    "RoleAuthBtnMenuHelp":{
        title: "模块帮助",
        url:ServiceHost+"/api/invoke?SID=SYS_CommonHelper_GetMenuList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            menu: {
                field : "MenuName",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",//必须
                displayName : "名称",//必须
                width:150,//宽度
                cssClass:"text-left",//样式，左中右
                isTree:true,//是否显示树的列
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            appname: {
                field : "AppFullName",
                displayName : "所属应用",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                show:true,
                return:false
            },
            appid: {
                field : "ApplicationID",
                displayName : "所属应用",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                show:false,
                return:true
            },
        },
        rowKey: "id"
    },

    "UserHelp":{
        title:"用户帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetUserList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "UserID",
                show:false,
                return:true
            },
            name : {
                field : "Account",
                displayName : "用户名",
                width:90,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            code : {
                field : "RealName",
                displayName : "姓名",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            tel : {
                field : "Mobile",
                displayName : "手机",
                width:90,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户模块权限 用户帮助
    "UserAuthUserHelp":{
        title:"用户帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetUserList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "UserID",
                show:false,
                return:true
            },
            name : {
                field : "Account",
                displayName : "用户名",
                width:90,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            code : {
                field : "RealName",
                displayName : "姓名",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            tel : {
                field : "Mobile",
                displayName : "手机",
                width:90,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户按钮权限 用户帮助
    "UserBtnUserHelp":{
        title:"用户帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetUserList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "UserID",
                show:false,
                return:true
            },
            name : {
                field : "Account",
                displayName : "用户名",
                width:90,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            code : {
                field : "RealName",
                displayName : "姓名",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            tel : {
                field : "Mobile",
                displayName : "手机",
                width:90,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户数据权限 用户帮助
    "DataUserHelp":{
        title:"用户帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetUserList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "UserID",
                show:false,
                return:true
            },
            name : {
                field : "Account",
                displayName : "用户名",
                width:90,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            code : {
                field : "RealName",
                displayName : "姓名",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            tel : {
                field : "Mobile",
                displayName : "手机",
                width:90,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户数据权限 全部明细页面 用户帮助
    "AllDataUserHelp":{
        title:"用户帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetUserList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "UserID",
                show:false,
                return:true
            },
            name : {
                field : "Account",
                displayName : "用户名",
                width:90,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            code : {
                field : "RealName",
                displayName : "姓名",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            tel : {
                field : "Mobile",
                displayName : "手机",
                width:90,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户数据权限 规则明细页面 用户帮助
    "DataRuleUserHelp":{
        title:"用户帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetUserList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "UserID",
                show:false,
                return:true
            },
            name : {
                field : "Account",
                displayName : "用户名",
                width:90,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            code : {
                field : "RealName",
                displayName : "姓名",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            tel : {
                field : "Mobile",
                displayName : "手机",
                width:90,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户数据权限  明细页面 用户帮助
    "DetailUserHelp":{
        title:"用户帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetUserList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "UserID",
                show:false,
                return:true
            },
            name : {
                field : "Account",
                displayName : "用户名",
                width:90,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            code : {
                field : "RealName",
                displayName : "姓名",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            tel : {
                field : "Mobile",
                displayName : "手机",
                width:90,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    "RoleHelp":{
        title:"角色帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetRoleList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "RoleID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "FullName",
                displayName : "名称",
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            item : {
                field : "ItemName",
                displayName : "分类",
                width:150,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色模块权限  角色帮助
    "RoleAuthMenuHelp":{
        title:"角色帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetRoleList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "RoleID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "FullName",
                displayName : "名称",
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            item : {
                field : "ItemName",
                displayName : "分类",
                width:150,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色按钮权限 角色帮助
    "RoleAuthBtnHelp":{
        title:"角色帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetRoleList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "RoleID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "FullName",
                displayName : "名称",
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            item : {
                field : "ItemName",
                displayName : "分类",
                width:150,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色数据权限 角色帮助
    "DataRoleHelp":{
        title:"角色帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetRoleList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "RoleID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "FullName",
                displayName : "名称",
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            item : {
                field : "ItemName",
                displayName : "分类",
                width:150,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色数据权限 全部详情页面  角色帮助
    "AllDataRoleHelp":{
        title:"角色帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetRoleList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "RoleID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "FullName",
                displayName : "名称",
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            item : {
                field : "ItemName",
                displayName : "分类",
                width:150,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色数据权限 规则详情页面 角色帮助
    "DataRuleRoleHelp":{
        title:"角色帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetRoleList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "RoleID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "FullName",
                displayName : "名称",
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            item : {
                field : "ItemName",
                displayName : "分类",
                width:150,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色数据权限  明细页面 角色帮助
    "DetailRoleHelp":{
        title:"角色帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetRoleList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "RoleID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "FullName",
                displayName : "名称",
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            },
            item : {
                field : "ItemName",
                displayName : "分类",
                width:150,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //模块详情页的所属应用帮助
    "MenuAppDivHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //模块  分配按钮的所属应用帮助
    "BtnApplicationHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //按钮管理 列表应用帮助
    "BtnAppHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //功能定义 关联模块帮助 AppReateMenuHelp
    "AppReateMenuHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //菜单组详情页 应用帮助
    "GroupFormAppHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //菜单组列表的 应用帮助
    "GroupAppHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //按钮管理 所属应用的帮助
    "AppFormHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    "ComACCompanyHelp":{
        title:"核算单位",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetACCompany&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",
                displayName : "名称",
                width:300,
                cssClass:"text-center",
                hasTitle:true,
                return:true,
                show:true
            }
        },
        rowKey: "id"
    },
    "ComBusiCustomerHelp":{
        title:"企业客户",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetBusiCustomer&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ID",
                show:false,
                return:true
            },
            code : {
                field : "Code",
                displayName : "编号",
                width:80,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "Name",
                displayName : "名称",
                width:300,
                cssClass:"text-left",
                hasTitle:true,
                return:true,
                show:true
            }
        },
        rowKey: "id"
    },
    "RoleSortHelp":{
        title:"角色分类",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetRoleTypeList&help=true",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ItemsID",
                show:false,
                return:true
            },
            code : {
                field : "ItemCode",
                displayName : "编号",
                width:60,
                cssClass:"text-center",
                hasTitle:true,
                return:true,
                show:true
            },
            name : {
                field : "ItemName",
                displayName : "名称",
                width:300,
                cssClass:"text-center",
                hasTitle:true,
                return:true,
                show:true
            }
        },
        rowKey: "id"
    },
    //有权限限制的应用帮助
    //用户模块权限  应用帮助
    "UserPerApplicationHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationDataPermissionsList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //用户管理查看 模块权限的 应用帮助 UserViewPreApplicationHelp
    "UserViewPreApplicationHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationDataPermissionsList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
    //角色模块权限 应用帮助
    "RoleAuthAppPerHelp":{
        title:"应用帮助",
        url:ServiceHost + "/api/invoke?SID=SYS_CommonHelper_GetApplicationDataPermissionsList",
        pageSize:10,
        SeqColWidth:45,
        colMetaData : {
            id : {
                field : "ApplicationID",
                show:false,
                return:true
            },
            code : {
                field : "Application",
                displayName : "编码",
                width:55,
                cssClass:"text-center",
                hasTitle:true,
                return:false,
                show:true
            },
            name : {
                field : "AppFullName",//必须
                displayName : "应用名称",//必须
                width:150,//宽度
                cssClass:"text-left",//样式，左中右
                hasTitle:true,//鼠标进入时，是否显示
                show:true,//是否显示该列
                return:true//是否是返回值
            },
            shortName : {
                field : "ApplicationName",
                displayName : "简称",
                width:100,
                cssClass:"text-left",
                hasTitle:true,
                return:false,
                show:true
            }
        },
        rowKey: "id"
    },
};