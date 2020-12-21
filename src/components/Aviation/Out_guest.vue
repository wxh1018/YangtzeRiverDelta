<template>
  <div class="wrap">
    <Left>
      <div class="zhen">
        <i class="iconfont icon-zhibeizhen3"></i>
        <div id="ech"></div>
      </div>
      <div class="basebtn" @click="down">下载</div>
    </Left>
    <Right>
      <table class="basetable">
        <thead>
          <th>城市流量排行</th>
          <th>美元(万)</th>
        </thead>
        <tbody>
          <tr v-for="(item,id) in top10" :key="id">
            <td>{{item.name}}</td>
            <td>{{item.value}}</td>
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
    </Right>
  </div>
</template>
<script>
import Left from "../base/Left";
import Right from "../base/Right";
import * as Api from "../../api/Aviation";
import echarts from "echarts";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      data: "",
      options: [],
      value: ["江苏", "南京市", "出口"],
      city: "南京市",
      inner: false,
      visualMap_text: "空运出口值(万)",
      top10: [{ name: 1, value: 1 }]
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
    this.$store.commit("setLeftActive", "3-3");
    setTimeout(() => {
      this.$em.$emit("changeTop", "5");
    }, 0);
  },
  mounted() {
    this.handleChange();
  },
  methods: {
    handleChange() {
      this.city = this.value[1];
      if (this.value[2] == "进口") {
        this.visualMap_text = "空运[进口]值(万)";
        this.inner = true;
      } else {
        this.visualMap_text = "空运[出口]值(万)";
        this.inner = false;
      }
      this.getData();
    },
    getData() {
      Api.LongitudeAndLatitude({
        city: this.city,
        year: "2014",
        mx: "exit"
      }).then(res => {
        console.log(res);
        if (!res.data.dates[0]) {
          this.base.warn(this, "该城市暂无数据");
          return;
        }
        this.visualMap_text = `[${this.city}]${this.visualMap_text}`;
        this.data = res.data.dates;
        this.creat_ech();
        this.table();
      });
    },
    creat_ech() {
      var myChart = this.$echarts.init(document.getElementById("ech"));
      window.onresize = function(size) {
        myChart.resize();
      };
      var geoCoordMap1 = {
        南京: [118.769, 32.048],
        尼日利亚: [-4.388361, 11.186148],
        美国洛杉矶: [-118.24311, 34.052713],
        香港邦泰: [114.195466, 22.282751],
        美国芝加哥: [-87.801833, 41.870975],
        加纳库马西: [-4.62829, 7.72415],
        英国曼彻斯特: [-1.657222, 51.886863],
        德国汉堡: [10.01959, 54.38474],
        哈萨克斯坦阿拉木图: [45.326912, 41.101891],
        俄罗斯伊尔库茨克: [89.116876, 67.757906],
        巴西: [-48.678945, -10.493623],
        埃及达米埃塔: [31.815593, 31.418032],
        西班牙巴塞罗纳: [2.175129, 41.385064],
        柬埔寨金边: [104.88659, 11.545469],
        意大利米兰: [9.189948, 45.46623],
        乌拉圭蒙得维的亚: [-56.162231, -34.901113],
        莫桑比克马普托: [32.608571, -25.893473],
        阿尔及利亚阿尔及尔: [3.054275, 36.753027],
        阿联酋迪拜: [55.269441, 25.204514],
        匈牙利布达佩斯: [17.108519, 48.179162],
        澳大利亚悉尼: [150.993137, -33.675509],
        美国加州: [-121.910642, 41.38028],
        澳大利亚墨尔本: [144.999416, -37.781726],
        墨西哥: [-99.094092, 19.365711],
        加拿大温哥华: [-123.023921, 49.311753]
      };
      var BJData1 = [
        [
          {
            name: "德国汉堡",
            value: 6280
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "哈萨克斯坦阿拉木图",
            value: 7255
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "俄罗斯伊尔库茨克",
            value: 8125
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "巴西",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "埃及达米埃塔",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "西班牙巴塞罗纳",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "柬埔寨金边",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "意大利米兰",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "乌拉圭蒙得维的亚",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "莫桑比克马普托",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "阿尔及利亚阿尔及尔",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "阿联酋迪拜",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "匈牙利布达佩斯",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "澳大利亚悉尼",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "美国加州",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "澳大利亚墨尔本",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "墨西哥",
            value: 3590
          },
          {
            name: "南京"
          }
        ],
        [
          {
            name: "加拿大温哥华",
            value: 3590
          },
          {
            name: "南京"
          }
        ]
      ];
      var BJData = [];
      var geoCoordMap = {};
      let last = this.data[this.data.length - 1];
      let lng = last.lat;
      last.lat = last.lon;
      last.lon = lng;
      this.data.forEach(v => {
        geoCoordMap[v.name] = [Number(v.lon), Number(v.lat)];
        var value = "";
        this.inner ? (value = v.imported_value) : (value = v.export_value);
        BJData.push([{ name: v.name, value }, { name: this.city }]);
      });
      if (this.inner) {
      } else {
        BJData.map(v => {
          let obj1 = v[0];
          v[0] = v[1];
          v[1] = obj1;
          return [v[0], v[1]];
        });
      }

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem[1].value,
                name: dataItem[1].name
              },
              {
                coord: toCoord
              }
            ]);
          }
        }
        return res;
      };

      var series = [];
      [[this.city, BJData]].forEach((item, i) => {
        series.push(
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.21, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 5 //图标大小
            },
            lineStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#58B3CC"
                    },
                    {
                      offset: 1,
                      color: "#F58158"
                    }
                  ],
                  false
                ),
                width: 1,
                opacity: 0.03,
                curveness: 0.1
              }
            },

            data: convertData(item[1])
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                // formatter: "{b}" //圆环显示文字
                formatter: ""
              },
              emphasis: {
                show: true
              }
            },
            symbol: "circle",
            symbolSize: function(val) {
              var value = val[2];
              value > 100000 ? (value = 100000) : (value = value);
              return 4 + value / 3000; //圆环大小
            },
            itemStyle: {
              normal: {
                // show: false,
                color: "skyblue"
              }
            },
            data: item[1].map(dataItem => {
              var name = "";
              var value = "";
              if (this.inner) {
                //进口
                name = dataItem[0].name;
                value = geoCoordMap[dataItem[0].name].concat([
                  dataItem[0].value
                ]);
              } else {
                //出口
                name = dataItem[1].name;
                value = geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value
                ]);
              }
              return {
                name: name,
                value: value
              };
            })
          },
          //被攻击点
          {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: "stroke",
              scale: 4
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#00ffff",
                formatter: "{b}",
                textStyle: {
                  color: "white"
                }
              },
              emphasis: {
                show: true
              }
            },
            symbol: "pin",
            symbolSize: 50,
            itemStyle: {
              normal: {
                // show: true,
                color: "red" //标志颜色
              }
            },
            data: [
              {
                name: item[0],
                value: geoCoordMap[item[0]].concat([100])
              }
            ]
          }
        );
      });

      var option = {
        backgroundColor: "#000",
        title: {
          text: "空运进出口流量流向分布",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "#1540a1",
          borderColor: "#FFFFCC",
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value[2];
            if (params.seriesType == "lines") {
              value = params.value;
            }
            res =
              "<span style='color:#fff;'>" +
              name +
              "</span><br/>美元值(万)：" +
              value;
            return res;
          }
        },
        // visualMap: {
        //   //图例值控制
        //   min: 0,
        //   max: 10000,
        //   show: false,
        //   calculable: true,
        //   text: [this.visualMap_text],
        //   color: ["skyblue"],
        //   textStyle: {
        //     color: "#fff"
        //   }
        // },
        geo: {
          map: "world",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true, //是否允许缩放
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: "180%",
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#8F98A6"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },

        series: series
      };
      myChart.setOption(option);
    },
    down() {
      var domObj = document.querySelector("#ech");
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
    rightEch() {
      var myChart = this.$echarts.init(document.getElementById("rightEch"));
      let Xdata = [];
      let Data = [];
      this.top10.forEach(v => {
        Xdata.push(v.name);
        Data.push(v.value);
      });
      var option = {
        toolbox:{
          feature:{
            saveAsImage:{}
          }
        },
        title: {
          text: "排名前十的国家",
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
          name: "国家名称",
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
          name: "流动资金(万元)",
          // max: 100000,
          // min: 0,
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
            // color: ['green'],
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
              show: false,
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
    table() {
      let data = this.data;
      if (this.inner) {
        //进口
        data.sort((a, b) => {
          return b.imported_value - a.imported_value;
        });
        data = data.slice(0, 10);
        this.top10 = data.map(v => {
          return { name: v.name, value: v.imported_value };
        });
      } else {
        //出口
        data.sort((a, b) => {
          return b.export_value - a.export_value;
        });
        data = data.slice(0, 10);
        this.top10 = data.map(v => {
          return { name: v.name, value: v.export_value };
        });
      }
      this.rightEch();
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
  height: 40%;
  border: 1px solid rgb(0, 255, 255, 0.7);
  position: absolute !important;
  bottom: 10%;
}
</style>