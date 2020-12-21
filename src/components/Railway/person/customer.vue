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
          <th colspan="2">宁波市客流数据表</th>
        </thead>
        <tbody>
          <tr>
            <td>发往城市</td>
            <td>人次/日</td>
          </tr>
          <tr v-for="(item,id) in top10" :key="id">
            <td>{{item.toname}}->{{item.name}}</td>
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
        <td>发往城市</td>
        <td>货物(t)</td>
      </tr>
      <tbody>
        <tr v-for="(item,id) in top10" :key="id">
          <td>{{item.toname}}->{{item.name}}</td>
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
        { O: "绍兴市", D: "宁波市", "人次/日": 4890 },
        { O: "杭州市", D: "宁波市", "人次/日": 16321.66667 },
        { O: "台州市", D: "宁波市", "人次/日": 8145.714286 },
        { O: "舟山市", D: "宁波市", "人次/日": 0 },
        { O: "上海市", D: "宁波市", "人次/日": 7253 },
        { O: "嘉兴市", D: "宁波市", "人次/日": 2107.857143 },
        { O: "金华市", D: "宁波市", "人次/日": 2093.333333 },
        { O: "温州市", D: "宁波市", "人次/日": 5455.238095 },
        { O: "苏州市", D: "宁波市", "人次/日": 897.3809524 },
        { O: "湖州市", D: "宁波市", "人次/日": 1526.904762 },
        { O: "无锡市", D: "宁波市", "人次/日": 569.5238095 },
        { O: "南京市", D: "宁波市", "人次/日": 1932 },
        { O: "宁波市", D: "绍兴市", "人次/日": 4438 },
        { O: "宁波市", D: "杭州市", "人次/日": 17579.52381 },
        { O: "宁波市", D: "台州市", "人次/日": 6807.142857 },
        { O: "宁波市", D: "舟山市", "人次/日": 0 },
        { O: "宁波市", D: "嘉兴市", "人次/日": 2449.761905 },
        { O: "宁波市", D: "上海市", "人次/日": 7195 },
        { O: "宁波市", D: "金华市", "人次/日": 2314.761905 },
        { O: "宁波市", D: "温州市", "人次/日": 4966.666667 },
        { O: "宁波市", D: "湖州市", "人次/日": 1737.380952 },
        { O: "宁波市", D: "苏州市", "人次/日": 462.6190476 },
        { O: "宁波市", D: "无锡市", "人次/日": 600.7142857 },
        { O: "宁波市", D: "南京市", "人次/日": 2173 }
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
    this.$store.commit("setLeftActive", "2-1");
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
        let value = parseInt(v["人次/日"]);
        let lineStyle = {
          width: value / 4000 + 1,
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
          text: "宁波市客流OD",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
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
              return fromname + "---->" + toname + "<br/>" + "人次/日:" + value;
            }
          }
        },
        visualMap: [
          {
            min: 0,
            max: 10000,
            left: "right",
            top: "bottom",
            splitNumber: 5,
            text: ["人次/日"], // 文本，默认为数值文本
            calculable: true,
            // inRange: {
            color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
            // },
            textStyle: {
              color: "#ffffff"
            }
          }
        ],
        legend: this.$setEch.getLegend(),
        geo: this.$setEch.getGeo(100, [120.55027, 29.67386]),
        series: [
          {
            name: "地点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 100,
            rippleEffect: {
              period: 4, //动画时间，值越小速度越快
              brushType: "stroke", //波纹绘制方式 stroke, fill
              scale: 4 //波纹圆环最大限制，值越大波纹越大
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
                fontSize: 13,
                color: "#fff"
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
          },
          this.$setEch.getCenter()
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
          text: "客车班次排名前十的城市",
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
          name: "人次/日",
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