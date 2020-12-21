const v1 = [
    // { name: "客货出行", router: "", icon: "el-icon-truck" },
    // { name: "客运出行", router: "", icon: "el-icon-user" },
    // { name: "货运出行", router: "", icon: "el-icon-goods" },
    // { name: "可达性", router: "", icon: "el-icon-s-help" },
    // { name: "密度图", router: "", icon: "el-icon-s-grid" }
    {
        name: "行政边界",
        router: "/ArcGis",
        icon: "icon-hangzheng",
        gis: 'Administrative_Node_Layer',
        list: [
            { name: "行政边界", router: "/ArcGis", icon: "icon-hangzheng", gis: 'New_Administrative_Node' },
        ]
    },
    {
        name: "线网设施",
        router: '/ArcGis',
        icon: "icon-weibiaoti-",
        gis: 'New_Wire_Overview',
        list: [//一级下拉
            {
                name: '公路网络',
                icon: 'icon-gonglu',
                list2: [//二级下拉
                    { name: "高速路网", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_HighSpeed' },
                    { name: "国道路网", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_StateRoad' },
                    { name: "省道路网", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_ProvincialHighway' },
                ]
            }, {
                name: '铁路网络',
                icon: 'icon-tielu2',
                list2: [
                    { name: "铁路现状", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_Railway' },
                    {
                        name: "铁路规划", router: "/ArcGis",
                        gis: 'New_Wire_RailwayByGuiHua', icon: "el-icon-setting"
                    },
                    // { name: "普速铁路", router: "/ArcGis", icon: "el-icon-setting",gis:'' },
                    // { name: "高速铁路", router: "/ArcGis", icon: "el-icon-setting",gis:'' },
                ]
            },
            {
                name: '水运网络',
                icon: 'icon-shuiyun',
                list2: [
                    { name: "内河航道", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_WaterTransport' },
                    { name: "远航航线", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_WaterTransportByOcean' },
                ]
            },
            // {
            //   name: '航空网络',
            //   icon: 'icon-hangkong',
            //   list2: [
            //     { name: "航线", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_Aviation' },
            //   ]
            // }

            // { name: "省道路网", router: "/Comprehensive/Networkinfrastructure/provincialhighway", icon: "el-icon-setting" },
            // { name: "铁路网络", router: "/Comprehensive/Networkinfrastructure/railway", icon: "el-icon-setting" },
            // { name: "航道网络", router: "/Comprehensive/Networkinfrastructure/channel", icon: "el-icon-setting" },
            // { name: "航线网络", router: "", icon: "el-icon-setting" },
        ]
    },
    {
        name: "节点设施",
        router: "/ArcGis",
        icon: "icon-luwangguanli",
        gis: 'New_Node_Overview',
        list: [
            { name: "机场现状", router: "/ArcGis", icon: "icon-hangkongqi", gis: 'New_Node_Airport' },
            { name: "机场规划", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Node_AirportByGuiHua' },
            { name: "火车站", router: "/ArcGis", icon: "icon-huochezhan", gis: 'New_Node_TrainStation' },
            { name: "服务区", router: "/ArcGis", icon: "icon-fuwuqu", gis: 'New_Node_ServiceArea' },
            { name: "收费站", router: "/ArcGis", icon: "icon-shoufeizhan", gis: 'New_Node_Toll' },
            { name: "客运站", router: "/ArcGis", icon: "icon-keyunzhan", gis: 'New_Node_PassengerStation' },
            { name: "港口", router: "/ArcGis", icon: "icon-gangkou", gis: 'New_Node_Port' },
            // { name: "行政节点", router: "/ArcGis", icon: "el-icon-setting", gis: '' },
        ]
    },
]
const v2 = [
    {
        name: "城市发展",
        icon: "icon-hangzheng",
        list: [
            { name: "行政区划", router: "/ArcGis", icon: "icon-hangzheng", gis: 'New_Administrative_Node' },
        ]
    },
    {
        name: "公路",
        // router: "/ArcGis",
        icon: 'icon-gonglu',
        list: [
            {
                name: "线网设施",
                router: '/ArcGis',
                icon: "icon-gonglu",
                list2: [//二级下拉
                    { name: "高速路网", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_HighSpeed' },
                    { name: "国道路网", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_StateRoad' },
                    { name: "省道路网", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_ProvincialRoad' },
                ]
            },
            {
                name: '节点设施',
                icon: 'icon-luwangguanli',
                list2: [
                    { name: "服务区", router: "/ArcGis", icon: "icon-fuwuqu", gis: 'New_Node_ServiceArea' },
                    { name: "收费站", router: "/ArcGis", icon: "icon-shoufeizhan", gis: 'New_Node_Toll' },
                    { name: "客运站", router: "/ArcGis", icon: "icon-keyunzhan", gis: 'New_Node_PassengerStation' },
                ]
            }
        ]
    },
    {
        name: "铁路",
        icon: 'icon-tielu2',
        list: [
            {
                name: "线网设施",
                icon: "icon-gonglu",
                list2: [
                    { name: "铁路现状", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_Railway' },
                    {
                        name: "铁路规划", router: "/ArcGis",
                        gis: 'New_Wire_RailwayByGuiHua', icon: "el-icon-setting"
                    },
                ]
            },
            {
                name: '节点设施',
                icon: 'icon-huochezhan',
                list2: [
                    { name: "火车站", router: "/ArcGis", icon: "icon-huochezhan", gis: 'New_Node_TrainStation' },
                ]
            }
        ]
    },
    {
        name: "水路",
        icon: 'icon-shuiyun',
        list: [
            {
                name: "线网设施",
                icon: "icon-weibiaoti-",
                list2: [
                    { name: "内河航道", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_WaterTransport' },
                    { name: "远航航线", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Wire_WaterTransportByOcean' },
                ]
            },
            {
                name: '节点设施',
                icon: 'icon-gangkou',
                list2: [
                    { name: "港口", router: "/ArcGis", icon: "icon-gangkou", gis: 'New_Node_Port' },
                ]
            }
        ]
    },
    {
        name: "航空",
        icon: 'icon-hangkong',
        list: [
            {
                name: "节点设施",
                icon: 'icon-luwangguanli',
                list2: [
                    { name: "机场现状", router: "/ArcGis", icon: "icon-hangkongqi", gis: 'New_Node_Airport' },
                    { name: "机场规划", router: "/ArcGis", icon: "el-icon-setting", gis: 'New_Node_AirportByGuiHua' },
                ]
            }
        ]
    },
]
export default v2