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
          <th colspan="2">两客一危数据表</th>
        </thead>
        <tbody>
          <tr>
            <td>发往城市</td>
            <td>货车数量(自然量/日)</td>
          </tr>
          <tr v-for="(item,id) in top10" :key="id">
            <td>{{item.name}}->{{item.toname}}</td>
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
      <div class="basebtn" @click="downTable">下载</div>
    </Right>
    <table style="display:none" id="table1">
      <tr>
        <td colspan="2">两客一危数据表</td>
      </tr>
      <tbody>
        <tr>
          <td>发往城市</td>
          <td>货物(t)</td>
        </tr>
        <tr v-for="(item,id) in top10" :key="id">
          <td>{{item.name}}->{{item.toname}}</td>
          <td>{{item.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Left from "@/components/base/Left";
import Right from "@/components/base/Right";
import FileSaver from "file-saver";
import XLSX from "xlsx";
var myChart = null;
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
      top10: [],
      totalData: [
        { 起点: "滁州市", 终点: "宁波市", "数量（辆）": 12.36093943 },
        { 起点: "芜湖市", 终点: "宁波市", "数量（辆）": 12.36093943 },
        { 起点: "宿州市", 终点: "宁波市", "数量（辆）": 12.36093943 },
        { 起点: "南京市", 终点: "宁波市", "数量（辆）": 123.6093943 },
        { 起点: "南通市", 终点: "宁波市", "数量（辆）": 49.44375773 },
        { 起点: "苏州市", 终点: "宁波市", "数量（辆）": 173.053152 },
        { 起点: "泰州市", 终点: "宁波市", "数量（辆）": 135.9703337 },
        { 起点: "无锡市", 终点: "宁波市", "数量（辆）": 37.08281829 },
        { 起点: "扬州市", 终点: "宁波市", "数量（辆）": 12.36093943 },
        { 起点: "镇江市", 终点: "宁波市", "数量（辆）": 61.80469716 },
        { 起点: "上海市", 终点: "宁波市", "数量（辆）": 383.1891224 },
        { 起点: "杭州市", 终点: "宁波市", "数量（辆）": 432.6328801 },
        { 起点: "湖州市", 终点: "宁波市", "数量（辆）": 123.6093943 },
        { 起点: "嘉兴市", 终点: "宁波市", "数量（辆）": 679.8516687 },
        { 起点: "金华市", 终点: "宁波市", "数量（辆）": 247.2187886 },
        { 起点: "丽水市", 终点: "宁波市", "数量（辆）": 12.36093943 },
        { 起点: "衢州市", 终点: "宁波市", "数量（辆）": 98.88751545 },
        { 起点: "绍兴市", 终点: "宁波市", "数量（辆）": 716.934487 },
        { 起点: "台州市", 终点: "宁波市", "数量（辆）": 185.4140915 },
        { 起点: "温州市", 终点: "宁波市", "数量（辆）": 173.053152 },
        { 起点: "舟山市", 终点: "宁波市", "数量（辆）": 37.08281829 }
        // { 起点: "宁波市", 终点: "滁州市", "数量（辆）": 12.36093943 },
        // { 起点: "宁波市", 终点: "芜湖市", "数量（辆）": 12.36093943 },
        // { 起点: "宁波市", 终点: "宿州市", "数量（辆）": 12.36093943 },
        // { 起点: "宁波市", 终点: "南京市", "数量（辆）": 123.6093943 },
        // { 起点: "宁波市", 终点: "南通市", "数量（辆）": 49.44375773 },
        // { 起点: "宁波市", 终点: "苏州市", "数量（辆）": 173.053152 },
        // { 起点: "宁波市", 终点: "泰州市", "数量（辆）": 135.9703337 },
        // { 起点: "宁波市", 终点: "无锡市", "数量（辆）": 37.08281829 },
        // { 起点: "宁波市", 终点: "扬州市", "数量（辆）": 12.36093943 },
        // { 起点: "宁波市", 终点: "镇江市", "数量（辆）": 61.80469716 },
        // { 起点: "宁波市", 终点: "上海市", "数量（辆）": 383.1891224 },
        // { 起点: "宁波市", 终点: "杭州市", "数量（辆）": 432.6328801 },
        // { 起点: "宁波市", 终点: "湖州市", "数量（辆）": 123.6093943 },
        // { 起点: "宁波市", 终点: "嘉兴市", "数量（辆）": 679.8516687 },
        // { 起点: "宁波市", 终点: "金华市", "数量（辆）": 247.2187886 },
        // { 起点: "宁波市", 终点: "丽水市", "数量（辆）": 12.36093943 },
        // { 起点: "宁波市", 终点: "衢州市", "数量（辆）": 98.88751545 },
        // { 起点: "宁波市", 终点: "绍兴市", "数量（辆）": 716.934487 },
        // { 起点: "宁波市", 终点: "台州市", "数量（辆）": 185.4140915 },
        // { 起点: "宁波市", 终点: "温州市", "数量（辆）": 173.053152 },
        // { 起点: "宁波市", 终点: "舟山市", "数量（辆）": 37.08281829 }
      ]
    };
  },
  components: {
    Left,
    Right
  },
  computed: {
    allcitys() {
      return this.$store.getters.get_allcity;
    }
  },
  watch: {},
  created() {
    this.options = this.$store.state.options;
    this.$store.commit("setLeftActive", "5-3");
    setTimeout(() => {
      this.$em.$emit("changeTop", "2");
    }, 0);
  },
  mounted() {
    this.ech1();
    this.rightEch();
  },
  methods: {
    ech1() {
      myChart = this.$echarts.init(document.getElementById("ech"));
      let citys = [],
        moveLines = [],
        top10 = [];
      // 货物
      moveLines = this.totalData.map((v, id) => {
        let fromobj = this.allcitys.find(res => res.市名称 == v.起点);
        let toobj = this.allcitys.find(res => res.市名称 == v.终点);
        let fromname = v.起点;
        let toname = v.终点;
        let coord = [fromobj["经度"], fromobj["纬度"]];
        let value = parseInt(v["数量（辆）"]);
        let lineStyle = {
          width: value / 90 + 1,
          opacity: 0.9,
          curveness: 0.2
        };
        let obj = { coord, value, fromname, toname, lineStyle };
        let obj2 = { coord: [toobj["经度"], toobj["纬度"]] };
        // let coord = []
        top10.push({ name: fromname, toname, value });
        let obj3 = {
          name: fromname,
          toname: toname,
          value: [fromobj["经度"], fromobj["纬度"], value]
        };
        if (id == 0) {
          citys.push({
            name: toname,
            value: [toobj["经度"], toobj["纬度"], value]
          });
        }
        citys.push(obj3);
        //货物
        return [obj, obj2];
      });
      this.top10 = top10
        .sort((a, b) => {
          return b.value - a.value;
        })
        .slice(0, 10);
      var allData = {
        citys,
        moveLines
      };
      let target = this.setEch(allData);
      target.setZoom(6);
    },
    setEch(allData) {
      var option = {
        backgroundColor: "#013954",
        title: {
          text: "两客一危数据分析",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            console.log(params);
            var value = "";
            let fromname = "";
            let toname = "";
            if (params.componentSubType == "effectScatter") {
              value = params.value[2];
              fromname = params.data.name;
              toname = params.data.toname;
              return fromname;
            } else {
              value = params.data.value;
              fromname = params.data.fromname;
              toname = params.data.toname;
            }
            return (
              fromname + "---->" + toname + "<br/>" + "数量（辆）:" + value
            );
          }
        },
        visualMap: [
          {
            min: 0,
            max: 1000,
            left: "right",
            top: "bottom",
            splitNumber: 5,
            text: ["数量（辆）"], // 文本，默认为数值文本
            calculable: true,
            color: this.$setEch.getColor(),
            // inRange: {
            //   color: ["green", "yellow", "red"]
            // },
            textStyle: {
              color: "#ffffff"
            }
          }
        ],
        legend: this.$setEch.getLegend(["地点", "线路"]),
        // legend: {
        //   show: true,
        //   orient: "vertical",
        //   top: "bottom",
        //   left: "left",
        //   itemWidth: 100,
        //   itemHeight: 40,
        //   data: ["地点", "线路"],
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 18
        //   }
        // },
        geo: this.$setEch.getGeo(40,[120.55027, 30.67386]),
        // geo: {
        //   map: "china",
        //   zoom: 40,
        //   center: [120.55027, 30.67386],
        //   label: {
        //     emphasis: {
        //       show: false
        //     }
        //   },
        //   roam: true,
        //   itemStyle: {
        //     normal: {
        //       color: "rgba(51, 69, 89, .5)", //地图背景色
        //       borderColor: "#516a89", //省市边界线00fcff 516a89
        //       borderWidth: 1
        //     },
        //     emphasis: {
        //       color: "rgba(37, 43, 61, .5)" //悬浮背景
        //     }
        //   }
        // },
        series: [
          {
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
                opsition: "right",
                offset: [0, -15],
                formatter: params => {
                  return params.data.name;
                },
                fontSize: 13,
                color:'#fff'
              },
              emphasis: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: 10,
            showEffectOn: "render",
            itemStyle: {
              normal: {
                // color: "#46bee9"
              }
            },
            data: allData.citys
          },
          this.$setEch.getCenter(),
          {
            name: "线路",
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 1,
            large: true,
            effect: {
              show: true,
              constantSpeed: 50,
              symbol: "pin",
              symbolSize: 8,
              trailLength: 0
            },
            // lineStyle: {
            //   // color:'white',
            //   width: 1.3,
            //   opacity: 0.9,
            //   curveness: 0.1
            // },
            data: allData.moveLines
          }
        ]
      };
      window.onresize = function() {
        myChart.resize();
      };
      function setZoom(v) {
        option.geo.zoom = v;
        myChart.setOption(option);
      }
      myChart.setOption(option);
      return {
        setZoom
      };
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
        title: {
          text: "两客一危货车数量排行前10城市",
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
              fontSize: 12
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
          name: "货车数量(自然量/日)",
          //   max: 10000,
          //   min: 0,
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
            color: ["rgb(0, 255, 255,.5)"],
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