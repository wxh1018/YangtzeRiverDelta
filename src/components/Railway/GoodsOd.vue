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
          <th colspan="3">宁波市货重数据表</th>
        </thead>
        <tbody>
          <tr>
            <td>发往城市</td>
            <td>货运量（万吨/年）</td>
            <td>占比(km)</td>
          </tr>
          <tr v-for="(item,id) in top10" :key="id">
            <td>{{item.fromname}}->{{item.name}}</td>
            <td>{{item.value}}</td>
            <td>{{totalData[id]['占比']}}</td>
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
        <td>货运量（万吨/年）</td>
        <td>运距(km)</td>
      </tr>
      <tbody>
        <tr v-for="(item,id) in top10" :key="id">
          <td>{{item.name}}->{{item.toname}}</td>
          <td>{{item.value}}</td>
          <td>{{totalData[id]['运距（km）']}}</td>
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
        {
          O: "宁波市",
          D: "金华市",
          "货运量（万吨/年）": 1726.08,
          占比: "64.00%"
        },
        {
          O: "宁波市",
          D: "杭州市",
          "货运量（万吨/年）": 647.28,
          占比: "24.00%"
        },
        {
          O: "宁波市",
          D: "温州市",
          "货运量（万吨/年）": 161.82,
          占比: "6.00%"
        },
        {
          O: "宁波市",
          D: "嘉兴市",
          "货运量（万吨/年）": 121.37,
          占比: "4.50%"
        },
        { O: "宁波市", D: "上海市", "货运量（万吨/年）": 40.46, 占比: "1.50%" }
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
    this.$store.commit("setLeftActive", "3-1");
    setTimeout(() => {
      this.$em.$emit("changeTop", "3");
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
        let fromobj = this.allcitys.find(res => res.市名称 == v.O);
        let toobj = this.allcitys.find(res => res.市名称 == v.D);
        let fromname = v.O;
        let toname = v.D;
        let coord = [fromobj["经度"], fromobj["纬度"]];
        let value = parseInt(v["货运量（万吨/年）"]);
        let lineStyle = {
          width: value / 100 + 1,
          opacity: 0.9,
          curveness: 0.2
        };
        let obj = { coord, value, fromname, toname, lineStyle };
        let obj2 = { coord: [toobj["经度"], toobj["纬度"]] };
        // let coord = []
        top10.push({ name: toname, fromname, value });
        let obj3 = {
          name: toname,
          toname: fromname,
          value: [toobj["经度"], toobj["纬度"], value]
        };
        citys.push(obj3);
        //货物
        return [obj, obj2];
      });
      console.log(moveLines);
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
          text: "宁波市货重OD",
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
                fromname +
                "---->" +
                toname +
                "<br/>" +
                "货运量（万吨/年）:" +
                value
              );
            }
          }
        },
        visualMap: [
          {
            min: 0,
            max: 500,
            left: "right",
            top: "bottom",
            splitNumber: 5,
            text: ["货运量（万吨/年）"], // 文本，默认为数值文本
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
        legend: {
          show: true,
          orient: "vertical",
          top: "bottom",
          left: "left",
          itemWidth: 70,
          itemHeight: 30,
          data: ["地点", "线路"],
          textStyle: {
            color: "#fff",
            fontSize: 18
          }
        },
        geo: {
          map: "china",
          zoom: 8,
          center: [120.55027, 29.67386],
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
              color: "rgba(51, 69, 89, .5)", //地图背景色
              borderColor: "#516a89", //省市边界线00fcff 516a89
              borderWidth: 1
            },
            emphasis: {
              color: "rgba(37, 43, 61, .5)" //悬浮背景
            }
          }
        },
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
                position: "right", //显示位置
                offset: [5, 0], //偏移设置
                formatter: function(params) {
                  //圆环显示文字
                  return params.data.name;
                },
                fontSize: 13
              },
              emphasis: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: function(val) {
              return 15 + val[2] / 20000;
            },
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
    clickLegend() {
      myChart.on("legendselectchanged", function(params) {
        var name = params.name;
        console.log(name);
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
      console.log(Xdata);
      var option = {
        title: {
          text: "宁波市与其他城市货运量统计",
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
          name: "货运量（万吨/年）",
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
                fontSize: 10
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