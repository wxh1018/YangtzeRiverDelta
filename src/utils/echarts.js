let echart = {
    getGeo(zoom, arr) {
        console.log(arr);
        arr = arr || [120.55027, 30.67386]
        zoom = zoom || 8
        return {
            map: "china",
            zoom: zoom,
            center: arr,
            label: {
                normal: {
                    show: true,
                    color: "#fff"
                },
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    // color: "rgba(51, 69, 89, .5)", //地图背景色
                    borderColor: 'rgba(147, 235, 248, 1)',
                    borderWidth: 1,
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(147, 235, 248, .1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(128, 217, 248, 1)',
                    // shadowColor: 'rgba(255, 255, 255, 1)',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                },
                emphasis: {
                    color: "rgba(37, 43, 61, .5)" //悬浮背景
                }
            }
        }
    },
    getLegend(arr) {
        return {
            show: true,
            orient: "vertical",
            top: "bottom",
            left: "left",
            itemWidth: 90,
            itemHeight: 30,
            data: arr,
            textStyle: {
                color: "#fff",
                fontSize: 18
            }
        }
    },
    getColor() {
        return ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"]
    },
    getCenter(arr) {
        arr = arr || [{
            name: '宁波市',
            value: [121.624618, 29.860363]
        }]
        return {
            name: "地点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 100,
            rippleEffect: {
                brushType: "stroke"
            },
            label: {
                normal: {
                    show: true,
                    position: "right", //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: function (params) {
                        //圆环显示文字
                        return params.data.name;
                    },
                    fontSize: 20,
                    color: '#fff',
                },
                emphasis: {
                    show: true,
                    position: "right",
                    formatter: "{b}"
                }
            },
            symbolSize: 30,
            showEffectOn: "render",
            itemStyle: {
                normal: {
                    color: "#46bee9"
                }
            },
            data: arr
        }
    },
    getData({
        startCity = "城市1",
        endCity = "城市2",
        startLng = "X1",
        startLat = "Y1",
        endLng = "X2",
        endLat = "Y2",
        valueName,
        data,
        islnglat = false,
        width = 5
    }) {
        let citys = [],
            moveLines = [],
            top10 = [];
        let allcity = [];
        let msgData = data;
        // 货物
        moveLines = data.map((v, id) => {
            allcity.push(v[startCity]);
            allcity.push(v[endCity]);
            let fromname = v[startCity];
            let toname = v[endCity];
            let coord = [];
            if (islnglat) {
                coord = [v[startLng], v[startLat]];
            } else {
                let fromobj = this.allCitys().find((res) => res.市名称 == v.城市1);
                let toobj = this.allCitys().find((res) => res.市名称 == v.城市2);
                coord = [fromobj["经度"], fromobj["纬度"]];
            }
            let value = parseInt(v[valueName]);
            let lineStyle = {
                width: parseInt(value / width + 1),
                opacity: 0.9,
                curveness: 0.2,
            };
            let obj = { coord, value, fromname, toname, lineStyle };
            let obj2 = { coord: [v[endLng], v[endLat]] };
            top10.push({ name: toname, fromname, value });
            return [obj, obj2];
        });
        let cityOptions = [...new Set(allcity)];
        citys = msgData.map((v) => {
            let fromname = v[startCity];
            let toname = v[endCity];
            let coord = [];
            if (islnglat) {
                coord = [v[startLng], v[startLat]];
            } else {
                let fromobj = this.allCitys().find((res) => res.市名称 == v.城市1);
                let toobj = this.allCitys().find((res) => res.市名称 == v.城市2);
                coord = [fromobj["经度"], fromobj["纬度"]];
            }
            let value = parseInt(v[valueName]);
            let obj = {
                name: toname,
                toname: fromname,
                value: [v[endLng], v[endLat], value],
            };
            return obj;
        });
        top10 = top10
            .sort((a, b) => {
                return b.value - a.value;
            })
            .slice(0, 10);
        var allData = {
            citys,
            moveLines,
            top10,
            cityOptions,
        };
        return allData;
    },
    getData2({
        startCity = "城市1",
        endCity = "城市2",
        startLng = "X1",
        startLat = "Y1",
        endLng = "X2",
        endLat = "Y2",
        valueName,
        data,
        islnglat = false,
        width = 5,
        lineStyleConfig,
        scatterValueKey = "终点"

    }) {
        let citys = [],
            moveLines = [],
            top10 = [];
        let allcity = [];
        let msgData = data;
        // 货物
        moveLines = data.map((v, id) => {
            allcity.push(v[startCity]);
            allcity.push(v[endCity]);
            let fromname = v[startCity];
            let toname = v[endCity];
            let coord = [];
            let coord2 = [];
            if (islnglat) {
                coord = [v[startLng], v[startLat]];
                coord2 = [v[startLng], v[endLat]]
            } else {
                let fromobj = this.allCitys().find((res) => res.市名称 == v[startCity]);
                let toobj = this.allCitys().find((res) => res.市名称 == v[endCity]);
                coord = [fromobj["经度"], fromobj["纬度"]];
                coord2 = [toobj['经度'], toobj['纬度']]
            }
            let value = parseInt(v[valueName]);
            let lineStyle = {
                width: parseInt(value / width + 1),
                opacity: 0.9,
                curveness: 0.2,
                ...lineStyleConfig
            };
            let obj = { coord, value, fromname, toname };
            let obj2 = { coord: coord2, lineStyle };
            top10.push({ name: toname, fromname, value });
            return [obj, obj2];
        });
        let cityOptions = [...new Set(allcity)];
        citys = msgData.map((v) => {
            let fromname = v[startCity];
            let toname = v[endCity];
            let coord = [];
            if (islnglat) {
                coord = [v[startLng], v[startLat]];
            } else {
                let obj = this.allCitys().find((res) => res.市名称 == v[scatterValueKey]);
                coord = [obj["经度"], obj["纬度"]];
            }
            let value = parseInt(v[valueName]);
            let obj = {
                name: toname,
                toname: fromname,
                value: [...coord, value],
            };
            return obj;
        });
        top10 = top10
            .sort((a, b) => {
                return b.value - a.value;
            })
            .slice(0, 10);
        var allData = {
            citys,
            moveLines,
            top10,
            cityOptions,
        };
        return allData;
    },
    setEch({ allData, title = "", max = 100, myChart, effect = {}, type = 'set', tooltipText = "值" }) {
        var option = {
            backgroundColor: "#013954",
            title: {
                text: title,
                left: "center",
                textStyle: {
                    color: "#fff",
                },
                top: 20
            },
            tooltip: {
                trigger: "item",
                formatter: function (params) {
                    var value = "";
                    let fromname = "";
                    let toname = "";
                    if (params.componentSubType == "scatter") {
                        value = params.value[2];
                        fromname = params.data.name;
                        toname = params.data.toname;
                        return fromname;
                    } else {
                        value = params.data.value;
                        fromname = params.data.fromname;
                        toname = params.data.toname;
                        return (
                            fromname + "-----" + toname + "<br/>" + tooltipText + ":" + value
                        );
                    }
                },
            },
            visualMap: [
                {
                    min: 0,
                    max: max,
                    left: "right",
                    top: "bottom",
                    splitNumber: 5,
                    text: ["联系强度"], // 文本，默认为数值文本
                    calculable: true,
                    // inRange: {
                    color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
                    // },
                    textStyle: {
                        color: "#ffffff",
                    },
                },
            ],
            legend: this.getLegend(),
            geo: this.getGeo(1, [118, 31.6, 20]),
            series: [
                {
                    name: "地点",
                    type: "scatter",
                    coordinateSystem: "geo",
                    zlevel: 100,
                    rippleEffect: {
                        period: 4, //动画时间，值越小速度越快
                        brushType: "stroke", //波纹绘制方式 stroke, fill
                        scale: 4, //波纹圆环最大限制，值越大波纹越大
                    },
                    label: {
                        normal: {
                            show: true,
                            position: "right", //显示位置
                            offset: [5, 0], //偏移设置
                            formatter: function (params) {
                                //圆环显示文字
                                return params.data.name;
                            },
                            fontSize: 13,
                            color: "#fff",
                        },
                        emphasis: {
                            show: true,
                            position: "right",
                            formatter: "{b}",
                        },
                    },
                    symbolSize(params){
                        return params[2]/1000 + 5
                    },
                    showEffectOn: "render",
                    itemStyle: {
                        normal: {
                            // color: "#46bee9"
                        },
                    },
                    data: allData.citys,
                },
                {
                    name: "线路",
                    type: "lines",
                    coordinateSystem: "geo",
                    zlevel: 1,
                    large: true,
                    effect,
                    // lineStyle: {
                    //   // color:'white',
                    //   width: 1.3,
                    //   opacity: 0.9,
                    //   curveness: 0.1
                    // },
                    data: allData.moveLines,
                },
                //   this.$setEch.getCenter(this.center)
            ],
        };
        if (type == 'get') {
            return option
        }
        window.onresize = function () {
            myChart.resize();
        };
        function setZoom(v) {
            option.geo.zoom = v;
            myChart.setOption(option);
        }
        myChart.setOption(option);
        return {
            setZoom,
        };
    },
    allCitys() {
        return [
            { "省名称": "江苏省", "市名称": "徐州市", "经度": 117.28416, "纬度": 34.204207 },
            { "省名称": "江苏省", "市名称": "宿迁市", "经度": 118.275247, "纬度": 33.963135 },
            { "省名称": "江苏省", "市名称": "淮安市", "经度": 119.113021, "纬度": 33.551503 },
            { "省名称": "江苏省", "市名称": "连云港市", "经度": 119.222024, "纬度": 34.596123 },
            { "省名称": "浙江省", "市名称": "衢州市", "经度": 118.859381, "纬度": 28.970302 },
            { "省名称": "浙江省", "市名称": "丽水市", "经度": 119.923057, "纬度": 28.467842 },
            { "省名称": "安徽省", "市名称": "六安市", "经度": 116.519795, "纬度": 31.735686 },
            { "省名称": "安徽省", "市名称": "阜阳市", "经度": 115.814459, "纬度": 32.890957 },
            { "省名称": "安徽省", "市名称": "淮南市", "经度": 117.018449, "纬度": 32.587285 },
            { "省名称": "安徽省", "市名称": "亳州市", "经度": 115.778589, "纬度": 33.846228 },
            { "省名称": "安徽省", "市名称": "蚌埠市", "经度": 117.388508, "纬度": 32.91681 },
            { "省名称": "安徽省", "市名称": "淮北市", "经度": 116.798399, "纬度": 33.955699 },
            { "省名称": "安徽省", "市名称": "宿州市", "经度": 116.96418, "纬度": 33.647441 },
            { "省名称": "安徽省", "市名称": "黄山市", "经度": 118.337667, "纬度": 29.71478 },
            { "省名称": "上海市", "市名称": "上海市", "经度": 121.4737, "纬度": 31.23037 },
            { "省名称": "江苏省", "市名称": "南京市", "经度": 118.79647, "纬度": 32.05838 },
            { "省名称": "江苏省", "市名称": "无锡市", "经度": 120.31237, "纬度": 31.49099 },
            { "省名称": "江苏省", "市名称": "常州市", "经度": 119.97365, "纬度": 31.81072 },
            { "省名称": "江苏省", "市名称": "苏州市", "经度": 120.585251, "纬度": 31.299015 },
            { "省名称": "江苏省", "市名称": "南通市", "经度": 120.894434, "纬度": 31.981306 },
            { "省名称": "江苏省", "市名称": "扬州市", "经度": 119.412975, "纬度": 32.394331 },
            { "省名称": "江苏省", "市名称": "镇江市", "经度": 119.425356, "纬度": 32.188852 },
            { "省名称": "江苏省", "市名称": "盐城市", "经度": 120.162621, "纬度": 33.348222 },
            { "省名称": "江苏省", "市名称": "泰州市", "经度": 119.922853, "纬度": 32.4566 },
            { "省名称": "浙江省", "市名称": "杭州市", "经度": 120.209849, "纬度": 30.246574 },
            { "省名称": "浙江省", "市名称": "宁波市", "经度": 121.624618, "纬度": 29.860363 },
            { "省名称": "浙江省", "市名称": "温州市", "经度": 120.69924, "纬度": 27.99375 },
            { "省名称": "浙江省", "市名称": "湖州市", "经度": 120.087004, "纬度": 30.894455 },
            { "省名称": "浙江省", "市名称": "嘉兴市", "经度": 120.755775, "纬度": 30.746963 },
            { "省名称": "浙江省", "市名称": "绍兴市", "经度": 120.583321, "纬度": 30.051209 },
            { "省名称": "浙江省", "市名称": "金华市", "经度": 119.64735, "纬度": 29.07916 },
            { "省名称": "浙江省", "市名称": "舟山市", "经度": 122.20746, "纬度": 29.985541 },
            { "省名称": "浙江省", "市名称": "台州市", "经度": 121.420469, "纬度": 28.655759 },
            { "省名称": "安徽省", "市名称": "合肥市", "经度": 117.227286, "纬度": 31.820635 },
            { "省名称": "安徽省", "市名称": "芜湖市", "经度": 118.433131, "纬度": 31.352463 },
            { "省名称": "安徽省", "市名称": "马鞍山市", "经度": 118.506839, "纬度": 31.669271 },
            { "省名称": "安徽省", "市名称": "铜陵市", "经度": 117.81152, "纬度": 30.945341 },
            { "省名称": "安徽省", "市名称": "安庆市", "经度": 117.11538, "纬度": 30.532221 },
            { "省名称": "安徽省", "市名称": "滁州市", "经度": 118.333354, "纬度": 32.256398 },
            { "省名称": "安徽省", "市名称": "池州市", "经度": 117.491537, "纬度": 30.664919 },
            { "省名称": "安徽省", "市名称": "宣城市", "经度": 118.759198, "纬度": 30.93902 },
            { "省名称": "江苏省", "市名称": "昆山市", "经度": 120.98181, "纬度": 31.38475 },
            { "省名称": "江苏省", "市名称": "太仓市", "经度": 121.12975, "纬度": 31.45911 },
            { "省名称": "江苏省", "市名称": "启东市", "经度": 121.59195, "纬度": 31.81738 },
            { "省名称": "江西省", "市名称": "萍乡市", "经度": 114.66539, "纬度": 27.3035663 },
            { "省名称": "江西省", "市名称": "新余市", "经度": 114.94461, "纬度": 27.80038 },
        ]
    },
    effect() {
        return {
            show: true,
            constantSpeed: 50,
            symbol: "pin",
            symbolSize: 8,
            trailLength: 0
        }
    },
    //工具栏
    toolbox() {
        return {
            trigger: "item",
            //triggerOn: 'mousemove',
            backgroundColor: "rgba(0,0,0,.8)",
            borderColor: "#3574c8",
            borderWidth: "2",
            extraCssText: "padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
            show: false,
            formatter: function (params) {
                var res;
                if (params.value > 0) {
                    res = params.data.value2 + "<br/>";
                    res += params.data.value3;
                } else {
                    res = "";
                }
                return res;
            }
        }
    },
    //  var style = (value) => {
    //     return {
    //       width: parseInt(value / 5 + 1),
    //       opacity: 0.9,
    //       curveness: 0.2,
    //     };
    //   };
    //   const data = [
    //     [
    //       { coord: [118, 32], value: 100, lineStyle: style(100) },
    //       { coord: [119, 31], value: 200, lineStyle: style(100) },
    //     ],
    //   ];
}
export default echart