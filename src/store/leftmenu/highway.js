const v1 = [
    {
        name: "基础设施",
        router: "/ArcGis",
        icon: "icon-jichusheshi",
        gis: 'New_Highway_Overview',
        list: [
            { name: "服务区", router: "/ArcGis", icon: "icon-fuwuqu", gis: 'New_Node_ServiceArea' },
            { name: "收费站", router: "/ArcGis", icon: "icon-shoufeizhan", gis: 'New_Node_Toll' },
            { name: "客运站", router: "/ArcGis", icon: "icon-keyunzhan", gis: 'New_Node_PassengerStation' },
            { name: "高速路网", router: "/ArcGis", gis: 'New_Wire_HighSpeed', icon: "icon-gaosugonglu" },
            { name: "国道路网", router: "/ArcGis", gis: 'New_Wire_StateRoad', icon: "icon-gonglu1" },
            { name: "省道路网", router: "/ArcGis", gis: 'New_Wire_ProvincialHighway', icon: "icon-daoluhangzhengdengji-shengdao" },
        ]
    },
    {
        name: "客运出行", router: "", icon: "el-icon-user",
        list: [
            // { name: "线路流量", router: "", icon: "el-icon-user" },
            { name: "收费站OD", router: "/highway/toll", icon: "el-icon-user" },
        ]
    },
    {
        name: "货运出行", router: "", icon: "el-icon-goods",
        list: [
            // { name: "线路流量", router: "", icon: "el-icon-goods" },
            { name: "货重OD", router: "/highway/goods/goods", icon: "el-icon-goods" },
            { name: "货流OD", router: "/highway/goods/frequency", icon: "el-icon-goods" },
        ]
    },
    {
        name: "通达分析", router: "", icon: "el-icon-setting",
        list: [
            { name: "等时圈（高速公路）", router: "/Comprehensive/Mastery/byhighway", icon: "el-icon-setting" },
            { name: "等时圈（国省道）", router: "/Comprehensive/Mastery/ProvincialHighway", icon: "el-icon-setting" },
            { name: "等时圈（综合公路）", router: "/Comprehensive/Mastery/HighwayOverall", icon: "el-icon-setting" },
        ]
    },
    {
        name: "联系强度", router: "", icon: "icon-cunzhentongdafangxiangzhuanti",
        list: [
            { name: "客车班次", router: "/highway/contact/shift", icon: "icon-keyunzhan" },
            { name: "满载率", router: "/highway/contact/fullLoad", icon: "icon-pingjunmanzaishuai" },
            { name: "两客一危", router: "/highway/contact/second", icon: "icon-daxingkeche" },
        ]
    },
    {
        name: "路网运行分析", router: "", icon: "icon-cunzhentongdafangxiangzhuanti",
        list: [
            { name: "饱和度及运行速度", router: "/highway/baohedu", icon: "icon-keyunzhan" },
        ]
    },
    //报告
    {
        name: "报告", router: "", icon: "icon-cunzhentongdafangxiangzhuanti",
        list: [
            { name: "过江通道", router: "/highway/report_br", icon: "icon-keyunzhan" },
        ]
    },
]
const v2 = [
    {
        name: "基础设施",
        router: "/ArcGis",
        icon: "icon-jichusheshi",
        gis: 'New_Highway_Overview',
        list: [
            { name: "高速路网", router: "/ArcGis", gis: 'New_Wire_HighSpeed', icon: "icon-gaosugonglu" },
            { name: "国道路网", router: "/ArcGis", gis: 'New_Wire_StateRoad', icon: "icon-gonglu1" },
            { name: "省道路网", router: "/ArcGis", gis: 'New_Wire_ProvincialRoad', icon: "icon-daoluhangzhengdengji-shengdao" },
            { name: "跨省公路", router: "/ArcGis", icon: "icon-fuwuqu", gis: 'Interprovincial_Index' },//未
            { name: "客运站", router: "/ArcGis", icon: "icon-keyunzhan", gis: 'New_Node_PassengerStation' },
            { name: "服务区", router: "/ArcGis", icon: "icon-fuwuqu", gis: 'New_Node_ServiceArea' },
            { name: "收费站", router: "/ArcGis", icon: "icon-shoufeizhan", gis: 'New_Node_Toll' },
        ]
    },
    {
        name: '联系强度',
        icon: 'icon-cunzhentongdafangxiangzhuanti',
        list: [
            {
                name: '客运',
                icon: 'el-icon-user',
                list2: [//二级下拉
                    { name: "总量", router: "/highway/customerTotal", icon: "el-icon-setting", },//未
                    { name: "高速公路客车OD", router: "/ArcGis", icon: "el-icon-setting", },//未
                    { name: "长途客运班线", router: "/highway/contact/shift", icon: "icon-keyunzhan" },
                    {
                        name: "旅游包车OD", router: "/highway/customerTravel", icon: "el-icon-setting",
                        list2: [
                            { name: "等时圈", router: "/ArcGis", icon: "el-icon-setting", gis: 'IsochronousCircleByHighway' },//未
                            { name: "城市集计", router: "/ArcGis", icon: "el-icon-setting", gis: 'SpeedInteroperability' }
                        ]
                    },//未
                ]
            },
            {
                name: '货运',
                icon: 'el-icon-goods',
                list2: [//二级下拉
                    { name: "总量", router: "/highway/goodsTotal", icon: "el-icon-setting", },//未
                    { name: "高速公路货车OD", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_HighSpeed' },//未
                    { name: "危化品货车OD", router: "/highway/goods/goods", icon: "el-icon-setting" },//未
                    { name: "集装箱货车OD", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_HighSpeed' },//未
                ]
            },
        ]
    },
    {
        name: "运营效率",
        icon: "icon-jichusheshi",
        list: [
            {
                name: "高速可达性", router: "/Comprehensive/Mastery/byhighway", icon: "el-icon-setting",
                list2: [
                    { name: "等时圈", router: "/ArcGis", icon: "el-icon-setting", gis: 'IsochronousCircleByHighway' },
                    { name: "城市集计", router: "/ArcGis", icon: "el-icon-setting", gis: 'SpeedInteroperability' },
                ]
            },
            { name: "高速公路服务水平", router: "/ArcGis", gis: 'HighSpeed_Index', icon: "icon-gaosugonglu" },
            { name: "国省干线服务水平", router: "/ArcGis", gis: 'StateProvince_Index', icon: "icon-gonglu1" },
            { name: "过江通道", router: "/highway/report_br", icon: "icon-keyunzhan" },
            { name: "长途客运线路满载率", router: "/ArcGis", icon: "icon-fuwuqu", gis: 'New_Node_ServiceArea' },//未
            { name: "毗邻公交", router: '/highway/pilinBus', icon: "icon-fuwuqu", gis: 'New_Node_ServiceArea' }, //未
            { name: "收费站", router: '/highway/effect/toll', icon: "icon-shoufeizhan" }, //未
            { name: "客运站", router: '/highway/effect/passenger', icon: "icon-keyunzhan" }, //未
            { name: '跨省公路交通量', router: '/ArcGis', icon: 'icon-gonglu1', gis: '' }
        ]
    }

]
export default v2