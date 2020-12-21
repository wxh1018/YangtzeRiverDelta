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
          <th colspan="2">宁波市客车满载率数据表</th>
        </thead>
        <tbody>
          <tr>
            <td>发往城市</td>
            <td>满载率(%)</td>
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
      <thead>
        <th colspan="2">宁波市客车满载率数据表</th>
      </thead>
      <tbody>
        <tr>
          <td>发往城市</td>
          <td>满载率(%)</td>
        </tr>
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
        { O: "宁波市", D: "昆山市", "满载率(%)": 64.11 },
        { O: "宁波市", D: "舟山市", "满载率(%)": 61.52 },
        { O: "宁波市", D: "南通市", "满载率(%)": 55.94 },
        { O: "宁波市", D: "台州市", "满载率(%)": 50.81 },
        { O: "宁波市", D: "衢州市", "满载率(%)": 49.0 },
        { O: "宁波市", D: "太仓市", "满载率(%)": 48.4 },
        { O: "宁波市", D: "湖州市", "满载率(%)": 48.35 },
        { O: "宁波市", D: "启东市", "满载率(%)": 47.4 },
        { O: "宁波市", D: "苏州市", "满载率(%)": 46.55 },
        { O: "宁波市", D: "金华市", "满载率(%)": 46.02 }
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
    this.$store.commit("setLeftActive", "5-2");
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
        top10 = [],
        // 货物
        personLines = [];
      moveLines = this.totalData.map((v, id) => {
        let fromobj = this.allcitys.find(res => res.市名称 == v.O);
        let toobj = this.allcitys.find(res => res.市名称 == v.D);
        let fromname = v.O;
        let toname = v.D;
        let coord = [fromobj["经度"], fromobj["纬度"]];
        let value = v["满载率(%)"];
        let width = value >64 ? 6 : value / 50 + 1;
        let value2 = parseInt(v["货物（吨）"]);
        let lineStyle = {
          width: width,
          opacity: 0.9,
          curveness: 0.2
        };
        let obj = { coord, value, fromname, toname, lineStyle, value2 };
        let obj2 = { coord: [toobj["经度"], toobj["纬度"]] };
        // let coord = []
        top10.push({ name: toname, toname: fromname, value });
        let obj3 = {
          name: toname,
          toname: toname,
          value: [toobj["经度"], toobj["纬度"], value]
        };
        if (id == 0) {
          citys.push({
            name: fromname,
            toname: fromname,
            value: [fromobj["经度"], fromobj["纬度"], value]
          });
        }
        citys.push(obj3);
        //货物
        personLines.push({}, {});
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
      console.log(allData.citys);
      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
      var option = {
        backgroundColor: "#013954",
        title: {
          text: "宁波市客车满载率OD",
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
                fromname + "---->" + toname + "<br/>" + "满载率(%):" + value
              );
            }
          }
        },
        visualMap: [
          {
            min: 0,
            max: 100,
            left: "right",
            top: "bottom",
            splitNumber: 5,
            text: ["满载率(%)"], // 文本，默认为数值文本
            calculable: true,
            color: this.$setEch.getColor(),
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
          itemWidth: 90,
          itemHeight: 30,
          data: ["地点", "线路"],
          textStyle: {
            color: "#fff",
            fontSize: 18
          }
        },
        geo: this.$setEch.getGeo(40, [118.55027, 31.67386]),
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
                offset: [0, -15],
                position: "top",
                fontSize: 13,
                formatter: p => {
                  return p.data.name;
                },
                color: "#fff"
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
                color: "#fff"
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
              // symbol: planePath,
              symbolSize: 6,
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
          name: "满载率(%)",
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
                fontSize: 12
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