<template>
  <div class="wrap">
    <left>
      <div class="zhen">
        <i class="iconfont icon-zhibeizhen3"></i>
        <div id="ech"></div>
      </div>
      <div class="basebtn" @click="down">下载</div>
    </left>
    <Right>
      <table class="basetable">
        <thead>
          <th colspan="2">宁波市航空货物流量数据表</th>
        </thead>
        <tbody>
          <tr>
            <td>发往城市</td>
            <td>货物(t)</td>
          </tr>
          <tr v-for="(item,id) in top10" :key="id">
            <td>{{item[0].name}}->{{item[1].name}}</td>
            <td>{{item[1].value}}</td>
          </tr>
        </tbody>
      </table>
      <div id="rightEch"></div>
      <div class="block">
        <span class="demonstration">空间维度选择:</span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </div>
      <div class="basebtn" @click="downTable">下载</div>
    </Right>
    <table style="display:none" id="table1">
      <tr>
        <td>发往城市</td>
        <td>货物(t)</td>
      </tr>
      <tbody>
        <tr v-for="(item,id) in top10" :key="id">
          <td>{{item[0].name}}->{{item[1].name}}</td>
          <td>{{item[1].value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Left from "../base/Left";
import Right from "../base/Right";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      value: ["浙江", "宁波市"],
      options: [],
      data: [
        {
          name: "",
          num: ""
        }
      ],
      top10: []
    };
  },
  components: {
    Left,
    Right
  },
  computed: {},
  watch: {},
  created() {
    this.options = this.$store.state.options;
    this.$store.commit("setLeftActive", "3-1");
    setTimeout(() => {
      this.$em.$emit("changeTop", "5");
    }, 0);
  },
  mounted() {
    this.ech();
    this.rightEch();
  },
  methods: {
    ech() {
      var that = this;
      var myChart = this.$echarts.init(document.getElementById("ech"));
      var geoCoordMap = {
        宁波: [121.4619, 29.8267],
        广州: [113.266, 23.1842],
        北京首都: [116.585, 40.0801],
        重庆: [106.642, 29.7192],
        深圳: [113.811, 22.6393],
        青岛: [120.392419, 36.273127],
        长沙: [113.231578, 28.194022],
        郑州: [113.8612, 34.5322],
        西安: [108.7686, 34.4421],
        昆明: [102.9356, 25.1029],
        海口: [110.4686, 19.9442],
        大连: [121.5496, 38.9694],
        沈阳: [123.4997, 41.6391],
        哈尔滨: [126.2595, 45.6336],
        成都: [103.9582, 30.5658],
        贵阳: [106.8072, 26.5491],
        武汉: [114.2174, 30.7763],
        天津: [117.3681, 39.137],
        长春: [125.6979, 44.0015],
        石家庄: [114.7039, 38.2874],
        南昌: [115.9221, 28.8656],
        桂林: [110.0546, 25.2236],
        珠海: [113.3872, 22.0141],
        揭阳: [116.5156, 23.5526],
        兰州: [103.6273, 36.5199],
        北京南苑: [116.4007, 39.7905],
        太原: [112.6409, 37.76],
        南宁: [108.1909, 22.6137],
        绵阳: [104.7496, 31.4346],
        宜昌: [111.4922, 30.5591],
        乌鲁木齐: [87.487, 43.9124],
        三亚: [109.4188, 18.3136],
        烟台: [120.9982, 37.6645],
        威海: [122.247, 37.1955],
        银川: [106.4004, 38.3283],
        上海浦东: [121.8151, 31.1575],
        万州: [108.4423, 30.8061],
        兴义: [104.9687, 25.0882],
        丽江: [104.9687, 25.0882],
        厦门: [118.1436, 24.545],
        安庆: [117.0613, 30.586],
        赣州: [114.7899, 25.8551],
        济南: [117.2205, 36.8573],
        北海: [109.3019, 21.543],
        铜仁: [109.3201, 27.8874],
        临沂: [118.4228, 35.0544],
        潍坊: [119.1291, 36.6524],
        东营: [118.7987, 37.5125],
        景德镇: [117.1884, 29.3418],
        延吉: [129.4627, 42.8897],
        张家界: [110.4546, 29.1072],
        呼和浩特: [111.8336, 40.8593],
        洛阳: [112.4004, 34.7454],
        秦皇岛: [119.0734, 39.6718],
        西宁: [102.0467, 36.5352],
        黔江: [108.8421, 29.5175],
        池州: [117.6974, 30.7442],
        湛江: [110.3701, 21.2183],
        淮安: [119.1379, 33.7951],
        包头: [110.0105, 40.5684],
        盐城: [120.2143, 33.4315],
        泸州: [105.4723, 29.0261],
        济宁: [116.3597, 35.2995],
        运城: [111.0446, 35.1217],
        连云港: [118.888, 34.5764],
        十堰: [110.9197, 32.595],
        遵义: [107.2571, 27.813],
        牡丹江: [129.5826, 44.535],
        呼伦贝尔: [119.831, 49.2183],
        井冈山: [114.7489, 26.8594],
        白山: [127.6159, 42.0744],
        宜春: [114.3224, 27.803],
        杭州: [120.4433, 30.2406],
        温州: [120.8599, 27.9134],
        福州: [119.6764, 25.9346],
        大庆: [125.1496, 46.7584],
        南京: [118.8821, 31.7362],
        无锡: [120.4402, 31.5089],
        上海虹桥: [121.3468, 31.2033],
        香港: [113.9451, 22.3202],
        台北: [121.2447, 25.0827],
        澳门: [113.588, 22.1605],
        高雄: [120.3553, 22.5782],
        台中: [120.634, 24.2671]
      };
      var NBData = [
        [{ name: "宁波" }, { name: "广州", value: 98.4 }],
        [{ name: "宁波" }, { name: "北京首都", value: 67.0 }],
        [{ name: "宁波" }, { name: "重庆", value: 43.1 }],
        [{ name: "宁波" }, { name: "深圳", value: 100.0 }],
        [{ name: "宁波" }, { name: "青岛", value: 21.4 }],
        [{ name: "宁波" }, { name: "长沙", value: 11.9 }],
        [{ name: "宁波" }, { name: "郑州", value: 11.6 }],
        [{ name: "宁波" }, { name: "西安", value: 23.0 }],
        [{ name: "宁波" }, { name: "昆明", value: 35.0 }],
        [{ name: "宁波" }, { name: "海口", value: 22.7 }],
        [{ name: "宁波" }, { name: "大连", value: 12.7 }],
        [{ name: "宁波" }, { name: "沈阳", value: 26.0 }],
        [{ name: "宁波" }, { name: "哈尔滨", value: 18.4 }],
        [{ name: "宁波" }, { name: "成都", value: 41.6 }],
        [{ name: "宁波" }, { name: "贵阳", value: 8.8 }],
        [{ name: "宁波" }, { name: "武汉", value: 23.2 }],
        [{ name: "宁波" }, { name: "天津", value: 14.1 }],
        [{ name: "宁波" }, { name: "长春", value: 12.4 }],
        [{ name: "宁波" }, { name: "石家庄", value: 5.3 }],
        [{ name: "宁波" }, { name: "南昌", value: 4.1 }],
        [{ name: "宁波" }, { name: "桂林", value: 1.2 }],
        [{ name: "宁波" }, { name: "珠海", value: 1.3 }],
        [{ name: "宁波" }, { name: "揭阳", value: 0.4 }],
        [{ name: "宁波" }, { name: "兰州", value: 10.3 }],
        [{ name: "宁波" }, { name: "北京南苑", value: 4.7 }],
        [{ name: "宁波" }, { name: "太原", value: 3.8 }],
        [{ name: "宁波" }, { name: "南宁", value: 3.3 }],
        [{ name: "宁波" }, { name: "绵阳", value: 7.2 }],
        [{ name: "宁波" }, { name: "宜昌", value: 0.4 }],
        [{ name: "宁波" }, { name: "乌鲁木齐", value: 6.9 }],
        [{ name: "宁波" }, { name: "三亚", value: 1.6 }],
        [{ name: "宁波" }, { name: "烟台", value: 1.4 }],
        [{ name: "宁波" }, { name: "威海", value: 0.3 }],
        [{ name: "宁波" }, { name: "银川", value: 2.1 }],
        [{ name: "宁波" }, { name: "上海浦东", value: 26.1 }],
        [{ name: "宁波" }, { name: "万州", value: 0.0 }],
        [{ name: "宁波" }, { name: "兴义", value: 0.0 }],
        [{ name: "宁波" }, { name: "丽江", value: 0.8 }],
        [{ name: "宁波" }, { name: "厦门", value: 3.7 }],
        [{ name: "宁波" }, { name: "安庆", value: 0.0 }],
        [{ name: "宁波" }, { name: "赣州", value: 0.1 }],
        [{ name: "宁波" }, { name: "济南", value: 1.4 }],
        [{ name: "宁波" }, { name: "北海", value: 0.6 }],
        [{ name: "宁波" }, { name: "铜仁", value: 0.0 }],
        [{ name: "宁波" }, { name: "临沂", value: 0.0 }],
        [{ name: "宁波" }, { name: "潍坊", value: 0.1 }],
        [{ name: "宁波" }, { name: "东营", value: 0.0 }],
        [{ name: "宁波" }, { name: "景德镇", value: 0.0 }],
        [{ name: "宁波" }, { name: "延吉", value: 0.2 }],
        [{ name: "宁波" }, { name: "张家界", value: 0.0 }],
        [{ name: "宁波" }, { name: "呼和浩特", value: 0.5 }],
        [{ name: "宁波" }, { name: "洛阳", value: 0.0 }],
        [{ name: "宁波" }, { name: "秦皇岛", value: 0.0 }],
        [{ name: "宁波" }, { name: "西宁", value: 0.2 }],
        [{ name: "宁波" }, { name: "黔江", value: 0.0 }],
        [{ name: "宁波" }, { name: "池州", value: 0.0 }],
        [{ name: "宁波" }, { name: "湛江", value: 0.0 }],
        [{ name: "宁波" }, { name: "淮安", value: 0.0 }],
        [{ name: "宁波" }, { name: "包头", value: 2.3 }],
        [{ name: "宁波" }, { name: "盐城", value: 0.0 }],
        [{ name: "宁波" }, { name: "泸州", value: 0.1 }],
        [{ name: "宁波" }, { name: "济宁", value: 0.0 }],
        [{ name: "宁波" }, { name: "运城", value: 0.5 }],
        [{ name: "宁波" }, { name: "连云港", value: 0.0 }],
        [{ name: "宁波" }, { name: "十堰", value: 0.0 }],
        [{ name: "宁波" }, { name: "遵义", value: 0.0 }],
        [{ name: "宁波" }, { name: "牡丹江", value: 0.0 }],
        [{ name: "宁波" }, { name: "呼伦贝尔", value: 0.0 }],
        [{ name: "宁波" }, { name: "井冈山", value: 0.0 }],
        [{ name: "宁波" }, { name: "白山", value: 0.0 }],
        [{ name: "宁波" }, { name: "宜春", value: 0.0 }],
        [{ name: "宁波" }, { name: "杭州", value: 0.2 }],
        [{ name: "宁波" }, { name: "温州", value: 0.0 }],
        [{ name: "宁波" }, { name: "福州", value: 0.0 }],
        [{ name: "宁波" }, { name: "大庆", value: 0.0 }],
        [{ name: "宁波" }, { name: "南京", value: 7.8 }],
        [{ name: "宁波" }, { name: "无锡", value: 0.0 }],
        [{ name: "宁波" }, { name: "上海虹桥", value: 0.0 }],
        [{ name: "宁波" }, { name: "香港", value: 46.9 }],
        [{ name: "宁波" }, { name: "台北", value: 64.7 }],
        [{ name: "宁波" }, { name: "澳门", value: 10.3 }],
        [{ name: "宁波" }, { name: "高雄", value: 2.5 }],

        [
          {
            name: "宁波"
          },
          {
            name: "台中",
            value: 0.1
          }
        ]
      ];
      NBData.sort((a, b) => {
        return b[1].value - a[1].value;
      });
      this.top10 = NBData.filter((v, id) => id < 10);
      console.log(this.top10);
      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

      var convertData = function(data) {
        // console.log(data);
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: dataItem[1].value,
              lineStyle: {
                width: dataItem[1].value / 50 + 1,
                color: "#555"
              }
            });
          }
        }
        return res;
      };
      var color = ["#46bee9", "#46bee9", "#ffa022", "#87cefa"];
      var series = [];
      [["宁波", NBData]].forEach(function(item, i) {
        //console.log(item,i);
        series.push(
          {
            name: "航线",
            type: "lines",
            zlevel: 1,
            // effect: {
            //   show: true,
            //   //特效动画的时间，单位s
            //   period: 6,
            //   //特效尾迹的长度
            //   trailLength: 0.7,
            //   //特效标记的颜色
            //   color: "#fff",
            //   //特效标记的大小
            //   symbolSize: 3 //白色尾迹大小
            // },
            //出发地道目的地的萧条
            // lineStyle: {
            //   normal: {
            //     color: color[i],
            //     width: 0,
            //     curveness: 0.2
            //   }
            // },
            data: convertData(item[1])
          },
          {
            name: "航线",
            type: "lines",
            zlevel: 3,
            symbol: ["none", "arrow"],
            symbolSize: 10, //箭头三角形大小
            // effect: {
            //   show: true,
            //   //飞机的大小
            //   period: 6,
            //   trailLength: 0,
            //   symbol: planePath,
            //   symbolSize: 15 //飞机大小
            // },
            lineStyle: {
              normal: {
                color: "#46bee9",
                width: 1,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: convertData(item[1])
          },
          {
            name: "地点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: function(val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: "#CCFFFF" //字体颜色
              }
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
              };
            })
          },
          that.$setEch.getCenter()
        );
      });
      console.log(series);
      var option = {
        grid: {
          // left: "3%",
          // right: "4%",
          top: "5%",
          bottom: "20%",
          containLabel: true
        },
        // backgroundColor: "#404a59",
        visualMap: {
          min: 0,
          max: 100,
          left: "right",
          top: "bottom",
          text: ["货物重量(t)"], // 文本，默认为数值文本
          calculable: true,
          // inRange: {
          color: that.$setEch.getColor(),
          //   color: ["white", "red"]
          // },
          textStyle: {
            color: "#ffffff"
          }
        },
        title: {
          text: "宁波市航空货物流量OD",
          subtext: "货邮数（吨）",
          left: "center",
          textStyle: {
            color: "aqua"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params, ticket, callback) {
            // console.log(params);
            if (params.seriesType == "scatter") {
              return params.data.name;
            } else if (params.seriesType == "lines") {
              return (
                params.data.fromName +
                ">" +
                params.data.toName +
                "<br />" +
                params.data.value
              );
            } else {
              return params.name;
            }
          }
        },
        legend: that.$setEch.getLegend(["地点", "航线"]),
        geo: that.$setEch.getGeo(1, [110, 34]),
        series: series
      };
      var optionMap = {
        // timeline: {
        //   data: year,
        //   axisType: "category",
        //   autoPlay: true,
        //   playInterval: 3000,
        //   left: "10%",
        //   right: "10%",
        //   bottom: "0%",
        //   width: "80%",
        //   label: {
        //     normal: {
        //       textStyle: {
        //         color: "#ddd"
        //       }
        //     },
        //     emphasis: {
        //       textStyle: {
        //         color: "#fff"
        //       }
        //     }
        //   },
        //   symbolSize: 10,
        //   // lineStyle: {
        //   //   color: "#555"
        //   // },
        //   checkpointStyle: {
        //     borderColor: "#777",
        //     borderWidth: 2
        //   },
        //   controlStyle: {
        //     showNextBtn: true,
        //     showPrevBtn: true,
        //     normal: {
        //       color: "#666",
        //       borderColor: "#666"
        //     },
        //     emphasis: {
        //       color: "#aaa",
        //       borderColor: "#aaa"
        //     }
        //   }
        // },
        baseOption: option
      };
      myChart.setOption(optionMap);
    },
    rightEch() {
      var myChart = this.$echarts.init(document.getElementById("rightEch"));
      let Xdata = [];
      let Data = [];
      this.top10.forEach(v => {
        Xdata.push(v[1].name);
        Data.push(v[1].value);
      });
      var option = {
        title: {
          text: "排名前十的城市",
          // subtext: "货邮数（吨）",
          left: "center",
          textStyle: {
            color: "aqua"
          }
        },
        grid: {
          bottom: "15%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["分配比例"],
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          type: "category",
          data: Xdata,
          name: "城市名称",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 14
            },
            formatter: function(param) {
              if (param.length > 10) {
                param.slice(0, 10) + "...";
              }
              return param.split("").join("\n");
            }
          },
          //线颜色
          axisLine: {
            lineStyle: {
              color: "#fff",
              type: "solid",
              width: "1"
            }
          }
        },
        yAxis: {
          type: "value",
          name: "货物重量(t)",
          max: 100,
          min: 0,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 14
            }
          },
          //线颜色
          axisLine: {
            lineStyle: {
              color: "#fff",
              type: "solid",
              width: "1"
            }
          },
          // 线样式
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(255,255,255)",
              width: 1
            }
          }
        },
        series: [
          {
            data: Data,
            type: "bar",
            // color: ["rgb(0, 255, 255,.5)"],
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "rgb(255, 2, 2)",
                    "rgb(255, 2, 2,.9)",
                    "rgb(255, 2, .8)",
                    "rgb(255, 2, 2,.7)",
                    "rgb(255, 2, 2,.6)",
                    "rgb(255, 2, 2,.5)",
                    "rgb(255, 2, 2,.4)",
                    "rgb(255, 2, 2,.3)",
                    "rgb(255, 2, 2,.2)",
                    "rgb(255, 2, 2,.2)"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            //高亮时的设置
            emphasis: {
              itemStyle: {
                color: "skyblue"
              },
              //文字显示
              label: {
                show: true,
                color: "white"
                // formatter:'123'
              }
            },
            label: {
              show: true,
              formatter: "{c}",
              position: "inside",
              // verticalAlign: "middle",
              textStyle: {
                color: "white",
                fontSize: 20
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    },
    down() {
      const domObj = document.getElementById("ech");
      html2canvas(domObj, {
        onrendered: function(canvas) {
          let a = document.createElement("a");
          var body = document.querySelector("body");
          a.href = canvas.toDataURL();
          a.download = "pic.png";
          a.style.display = "none";
          body.append(a);
          a.click();
        }
      });
    },
    downTable() {
      let et = XLSX.utils.table_to_book(document.getElementById("table1")); //此处传入table的DOM节点
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        // if (this.value1 == '' && this.value2 == ''){
        //   FileSaver.saveAs(
        //     new Blob([etout], {
        //       type: "application/octet-stream"
        //     }),
        //     'total.xlsx'
        //   ); //trade-publish.xlsx 为导出的文件名
        // } else {
        FileSaver.saveAs(
          new Blob([etout], {
            type: "application/octet-stream"
          }),
          "total.xlsx"
        ); //trade-publish.xlsx 为导出的文件名
        // }
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#ech {
  width: 100%;
  height: 90%;
  border: 1px solid rgb(0, 255, 255, 0.7);
}

.basebtn {
  position: absolute;
  bottom: 20px;
  left: 10px;
}

#rightEch {
  width: 100%;
  height: 37%;
  border: 1px solid rgb(0, 255, 255, 0.7);
  position: absolute !important;
  bottom: 10%;
}
</style>