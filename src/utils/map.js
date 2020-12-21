const Map = {
    GeoItemStyle() {
        return {
            normal: {
                borderColor: "#2ab8ff",
                borderWidth: 1.5,
                areaColor: "#12235c",
            },
            emphasis: {
                areaColor: "#2AB8FF",
                borderWidth: 0,
                color: "green",
            },
        }
    },
    title(name) {
        return {
            text: name,
            left: "center",
            textStyle: {
                color: "#fff",
            },
            top: 20,
        }
    },
    visualMap({ max = 1000, text = ["高", "底"], type = 1, pieces }) {
        pieces = pieces || [
            {
                gt: 300,
                label: "300以上",
                color: "#7f1100",
            },
            {
                gte: 200,
                lte: 300,
                label: "200 - 300 次",
                color: "#ff5428",
            },
            {
                gte: 80,
                lt: 200,
                label: "80 - 200",
                color: "#ff8c71",
            },
            {
                gt: 0,
                lt: 80,
                label: "80以下",
                color: "#ffd768",
            },
        ];
        if (type == 1) {
            return {
                min: 0,
                max,
                left: "3%",
                bottom: "5%",
                seriesIndex: [0],
                dimension: 2,
                text,
                calculable: true,
                //   inverse: true,
                //   inRange: {
                color: ["#7f1100", "#ff5428", "#ffd768"],
                //   },
                textStyle: {
                    color: "#fff",
                },
            }
        } else {
            return {
                min: 0,
                max: 100,
                left: "3%",
                bottom: "5%",
                seriesIndex: [0],
                //   text:['旅游包车客运发送量（万人次）','底'],
                //   calculable:true,
                inverse: true,
                inRange: {
                    color: ["#24CFF4", "#2E98CA", "#1E62AC"],
                },
                pieces,
                textStyle: {
                    color: "#24CFF4",
                },
            }
        }
    },
    geo({ map = 'csjmap', center, zoom = 1 }) {
        var obj = {
            map: map,
            roam: true,
            zoom,
            label: {
                show: true,
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                },
                formatter(params) {
                    let { name } = params;
                    let exclude = [
                        "金山区",
                        "松江区",
                        "青浦区",
                        "奉贤区",
                        "浦东新区",
                        "杨浦区",
                        "宝山区",
                        "嘉定区",
                        "普陀区",
                        "虹口区",
                        "静安区",
                        "黄浦区",
                        "长宁区",
                        "徐汇区",
                    ];
                    if (exclude.includes(name)) {
                        return "";
                    }
                    if (name == "闵行区") {
                        return "上海市";
                    }
                    return name;
                },
            },
            itemStyle: {
                normal: {
                    borderColor: "#2ab8ff",
                    borderWidth: 1.5,
                    areaColor: "#12235c",
                },
                emphasis: {
                    areaColor: "#2AB8FF",
                    borderWidth: 0,
                    color: "green",
                },
            }
        }
        if (center) {
            obj.center = center
        }
        return obj
    },
    toolbox(type = 'base') {
        const map = {
            show: true,
            feature: {
                saveAsImage: {},
                restore: {},
            },
            iconStyle: {
                borderColor: "#fff",
            },
        }
        const base = {
            show: true,
            feature: {
                saveAsImage: {},
                restore: {},
                dataView: {},
                magicType: {
                    type: ["line", "bar"],
                },
            },
            iconStyle: {
                borderColor: "#fff",
            },
        }
        return type == 'base' ? base : map
    },
    xAxis(name, data) {
        return {
            name,
            type: "category",
            data,
            axisLabel: {
                color: "#fff",
                interval: 0,
                margin: 10,
                rotate: 40,
            },
            axisLine: {
                lineStyle: {
                    color: "#fff",
                },
            },
            axisTick: {
                alignWithLabel: true,
            },
        }
    },
    yAxis(name) {
        return {
            type: "value",
            name,
            axisLabel: {
                color: "#fff",
            },
            axisLine: {
                lineStyle: {
                    color: "#fff",
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "rgba(150, 164, 244, 1)",
                    type: "dashed",
                },
            },
        }
    },
    //解码 
    decode(json) {
        if (!json.UTF8Encoding) {
            return json;
        }
        var encodeScale = json.UTF8Scale;
        if (encodeScale == null) {
            encodeScale = 1024;
        }

        var features = json.features;

        for (var f = 0; f < features.length; f++) {
            var feature = features[f];
            var geometry = feature.geometry;
            var coordinates = geometry.coordinates;
            var encodeOffsets = geometry.encodeOffsets;

            for (var c = 0; c < coordinates.length; c++) {
                var coordinate = coordinates[c];

                if (geometry.type === 'Polygon') {
                    coordinates[c] = this.decodePolygon(
                        coordinate,
                        encodeOffsets[c],
                        encodeScale
                    );
                }
                else if (geometry.type === 'MultiPolygon') {
                    for (var c2 = 0; c2 < coordinate.length; c2++) {
                        var polygon = coordinate[c2];
                        coordinate[c2] = this.decodePolygon(
                            polygon,
                            encodeOffsets[c][c2],
                            encodeScale
                        );
                    }
                }
            }
        }
        // Has been decoded
        json.UTF8Encoding = false;
        return json;
    },
    decodePolygon(coordinate, encodeOffsets, encodeScale) {
        var result = [];
        var prevX = encodeOffsets[0];
        var prevY = encodeOffsets[1];

        for (var i = 0; i < coordinate.length; i += 2) {
            var x = coordinate.charCodeAt(i) - 64;
            var y = coordinate.charCodeAt(i + 1) - 64;
            // ZigZag decoding
            x = (x >> 1) ^ (-(x & 1));
            y = (y >> 1) ^ (-(y & 1));
            // Delta deocding
            x += prevX;
            y += prevY;

            prevX = x;
            prevY = y;
            // Dequantize
            result.push([x / encodeScale, y / encodeScale]);
        }

        return result;
    }
}
export default Map