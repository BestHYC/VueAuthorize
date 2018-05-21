import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect:{
                name:'Login'
            },
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '首页' ,permission: true },
            children:[
                {
                    path: 'community',
                    name:'community',
                    redirect:{
                        name: 'index',
                    },
                    component: resolve => require(['../components/manage/communityService/community.vue'], resolve),
                    meta: { title: '社区平台', permission: false ,index:1},
                        children:[
                            {
                                path: 'dashboard',
                                name: 'index',
                                component: resolve => require(['../components/manage/dashboard.vue'], resolve),
                                meta: { title: '首页', permission: false ,icon:'el-icon-setting' }
                            },
                            {
                                path: '',
                                name: 'community1',
                                component: resolve => require(['../components/manage/communityService/community.vue'], resolve),
                                meta: { title: '监控中心', permission: false ,icon:'el-icon-tickets'  },
                                children:[
                                    {
                                        path: 'realTimePoliceForce',
                                        name: 'realTimePoliceForce',
                                        component: resolve => require(['../components/manage/communityService/monitoringCenter/realTimePoliceForce.vue'], resolve),
                                        meta: { title: '实时警力', permission: false ,icon:'el-icon-message'  }
                                    },
                                    {
                                        path: 'trajectoryQuery',
                                        name: 'trajectoryQuery',
                                        component: resolve => require(['../components/manage/communityService/monitoringCenter/trajectoryQuery.vue'], resolve),
                                        meta: { title: '轨迹查询', permission: false ,icon:'el-icon-message'  }
                                    },
                                    {
                                        path: 'controlEarlyWarning',
                                        name: 'controlEarlyWarning',
                                        component: resolve => require(['../components/manage/communityService/monitoringCenter/controlEarlyWarning.vue'], resolve),
                                        meta: { title: '布控预警', permission: false ,icon:'el-icon-setting'  }
                                    },
                                    {
                                        path: 'patrolEarlyWarning',
                                        name: 'patrolEarlyWarning',
                                        component: resolve => require(['../components/manage/communityService/monitoringCenter/patrolEarlyWarning.vue'], resolve),
                                        meta: { title: '巡逻预警', permission: false ,icon:'el-icon-message'  }
                                    },
                                ]

                            },
                            {
                                path: '',
                                name: 'community2',
                                component: resolve => require(['../components/manage/communityService/community.vue'], resolve),
                                meta: { title: '安防管理', permission: false ,icon:'el-icon-tickets'  },
                                children:[
                                    {
                                        path: 'personnelInformation',
                                        name: 'personnelInformation',
                                        component: resolve => require(['../components/manage/communityService/safetyManagement/personnelInformation.vue'], resolve),
                                        meta: { title: '人员信息', permission: false ,icon:'el-icon-message'  }
                                    },
                                    {
                                        path: 'policeWeaponInformation',
                                        name: 'policeWeaponInformation',
                                        component: resolve => require(['../components/manage/communityService/safetyManagement/policeWeaponInformation.vue'], resolve),
                                        meta: { title: '警械信息', permission: false ,icon:'el-icon-message'  }
                                    },
                                    {
                                        path: 'controlManagement',
                                        name: 'controlManagement',
                                        component: resolve => require(['../components/manage/communityService/safetyManagement/controlManagement.vue'], resolve),
                                        meta: { title: '布控管理', permission: false ,icon:'el-icon-message'  }
                                    },
                                ]
                            },
                            {
                                path: '',
                                name: 'community3',
                                component: resolve => require(['../components/manage/communityService/community.vue'], resolve),
                                meta: { title: '警情管理', permission: false ,icon:'el-icon-tickets'  },
                                children:[
                                    {
                                        path: 'policeSituationRelease',
                                        name: 'policeSituationRelease',
                                        component: resolve => require(['../components/manage/communityService/policeSituationManagement/policeSituationRelease.vue'], resolve),
                                        meta: { title: '警情发布', permission: false ,icon:'el-icon-message'  }
                                    },
                                    {
                                        path: 'historicalPoliceSituation',
                                        name: 'historicalPoliceSituation',
                                        component: resolve => require(['../components/manage/communityService/policeSituationManagement/historicalPoliceSituation.vue'], resolve),
                                        meta: { title: '历史警情', permission: false ,icon:'el-icon-message'  }
                                    },
                                ]
                            },

                            {
                                path: '',
                                name: 'community4',
                                component: resolve => require(['../components/manage/communityService/community.vue'], resolve),
                                meta: { title: '报表群组', permission: false ,icon:'el-icon-tickets'  },
                                children:[
                                    {
                                        path: 'classificationOfPoliceSituation',
                                        name: 'classificationOfPoliceSituation',
                                        component: resolve => require(['../components/manage/communityService/reportGroup/classificationOfPoliceSituation.vue'], resolve),
                                        meta: { title: '警情分类统计表', permission: false ,icon:'el-icon-message'  }
                                    },
                                    {
                                        path: 'controlSituation',
                                        name: 'controlSituation',
                                        component: resolve => require(['../components/manage/communityService/reportGroup/controlSituation.vue'], resolve),
                                        meta: { title: '布控信息统计表', permission: false ,icon:'el-icon-message'  }
                                    },
                                    {
                                        path: 'patrolPlanning',
                                        name: 'patrolPlanning',
                                        component: resolve => require(['../components/manage/communityService/reportGroup/patrolPlanning.vue'], resolve),
                                        meta: { title: '巡逻规划统计表', permission: false ,icon:'el-icon-message'  }
                                    },
                                ]
                            },
                            {
                                path: '',
                                name: 'community5',
                                component: resolve => require(['../components/manage/communityService/community.vue'], resolve),
                                meta: { title: '基础设置', permission: false ,icon:'el-icon-tickets'  },
                                children:[
                                    {
                                        path: 'patrol',
                                        name: 'patrol',
                                        component: resolve => require(['../components/manage/communityService/basicSetting/patrol.vue'], resolve),
                                        meta: { title: '巡逻规划', permission: false ,icon:'el-icon-message'  }
                                    }
                                ]
                            }
                        ]
                    },
                {
                    path: 'data',
                    name:'data',
                    // redirect:{
                    //     name: 'urbanAllocation',
                    // },
                    component: resolve => require(['../components/manage/dataService/data.vue'], resolve),
                    meta: { title: '数据中心', permission: false , index:2 },
                    children:[
                        {
                            path: 'urbanAllocation',
                            name: 'urbanAllocation',
                            component: resolve => require(['../components/manage/dataService/urbanAllocation/urbanAllocation.vue'], resolve),
                            meta: { title: '城市配置', permission: false ,icon:'el-icon-tickets'  }
                        },
                        {
                            path: 'applicationConfiguration',
                            name: 'applicationConfiguration',
                            component: resolve => require(['../components/manage/dataService/applicationConfiguration/applicationConfiguration.vue'], resolve),
                            meta: { title: '应用配置', permission: false ,icon:'el-icon-tickets'  }
                        },
                        {
                            path: '',
                            name: 'data2',
                            redirect:{
                                name:'organizationManagement'
                            },
                            component: resolve => require(['../components/manage/dataService/data.vue'], resolve),
                            meta: { title: '基础配置', permission: false ,icon:'el-icon-tickets'  },
                            children:[
                                {
                                    path: 'organizationManagement',
                                    name: 'organizationManagement',
                                    component: resolve => require(['../components/manage/dataService/basicConfiguration/organizationManagement.vue'], resolve),
                                    meta: { title: '组织机构管理', permission: false ,icon:'el-icon-message'  }
                                },
                                {
                                    path: 'serviceManagement',
                                    name: 'serviceManagement',
                                    component: resolve => require(['../components/manage/dataService/basicConfiguration/serviceManagement.vue'], resolve),
                                    meta: { title: '服务模块管理', permission: false ,icon:'el-icon-message'  }
                                },
                                {
                                    path: 'dataDictionaryManagement',
                                    name: 'dataDictionaryManagement',
                                    component: resolve => require(['../components/manage/dataService/basicConfiguration/dataDictionaryManagement.vue'], resolve),
                                    meta: { title: '数据字典管理', permission: false ,icon:'el-icon-message'  }
                                },
                            ]
                        },
                    ]

                },
                {
                    path: 'tag',
                    name:'tag',
                    // redirect:{
                    //     name:'serviceInto'
                    // },
                    component: resolve => require(['../components/manage/tagService/tag.vue'], resolve),
                    meta: { title: '标签服务', permission: false,index:3 },
                    children:[
                        {
                            path: 'serviceInto',
                            name: 'serviceInto',
                            component: resolve => require(['../components/manage/tagService/serviceInto/serviceInto.vue'], resolve),
                            meta: { title: '服务接入', permission: false ,icon:'el-icon-tickets'  }
                        },
                        {
                            path: 'formConfiguration',
                            name: 'formConfiguration',
                            component: resolve => require(['../components/manage/tagService/formConfiguration/formConfiguration.vue'], resolve),
                            meta: { title: '表单配置', permission: false ,icon:'el-icon-tickets'  }
                        },
                        {
                            path: 'listConfiguration',
                            name: 'listConfiguration',
                            component: resolve => require(['../components/manage/tagService/listConfiguration/listConfiguration.vue'], resolve),
                            meta: { title: '列表配置', permission: false ,icon:'el-icon-tickets'  }
                        }
                    ]
                },
                {
                    path: 'authority',
                    name:'authority',
                    // redirect:{
                    //     name:'authority1'
                    // },
                    component: resolve => require(['../components/manage/authorityService/authority.vue'], resolve),
                    meta: { title: '权限服务', permission: false,index:4 },
                    children:[
                        {
                            path: '',
                            name: 'authority1',
                            redirect:{
                                name:'accountManagement'
                            },
                            component: resolve => require(['../components/manage/authorityService/authority.vue'], resolve),
                            meta: { title: '权限管理', permission: false ,icon:'el-icon-tickets'  },
                            children:[
                                {
                                    path: 'accountManagement',
                                    name: 'accountManagement',
                                    component: resolve => require(['../components/manage/authorityService/authorityManagement/accountManagement.vue'], resolve),
                                    meta: { title: '账号管理', permission: false ,icon:'el-icon-message'  }
                                },
                                {
                                    path: 'roleInformation',
                                    name: 'roleInformation',
                                    component: resolve => require(['../components/manage/authorityService/authorityManagement/roleInformation.vue'], resolve),
                                    meta: { title: '角色信息', permission: false ,icon:'el-icon-message'  }
                                }
                            ]
                        }
                    ]
                },

            ]
        },
        {
            path: '/login',
            name:'Login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})
