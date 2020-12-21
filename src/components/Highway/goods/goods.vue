<template>
  <div class="wrap">
    <Left>
      <!-- <div id="ech"></div> -->
      <js-echarts :option="option" />
    </Left>
    <Right>
      <js-table
        :tableData="this[this.dataKey]"
        :thead="thead"
        :title="echartsConfig.title"
      />
      <div id="rightEch">
        <js-echarts :option="option2" />
      </div>
    </Right>
  </div>
</template>
<script>
import Map from "@/utils/map";
export default {
  data() {
    return {
      option: {},
      data: [
        {
          name: "",
          num: "",
        },
      ],
      top10: [],
      totalData: [
        { O: "杭州市", D: "宁波市", "危化品货车（自然量/日）": 4748 },
        { O: "湖州市", D: "宁波市", "危化品货车（自然量/日）": 460 },
        { O: "嘉兴市", D: "宁波市", "危化品货车（自然量/日）": 2581 },
        { O: "金华市", D: "宁波市", "危化品货车（自然量/日）": 3905 },
        { O: "丽水市", D: "宁波市", "危化品货车（自然量/日）": 390 },
        { O: "宁波市", D: "宁波市", "危化品货车（自然量/日）": 54891 },
        { O: "衢州市", D: "宁波市", "危化品货车（自然量/日）": 3061 },
        { O: "绍兴市", D: "宁波市", "危化品货车（自然量/日）": 7522 },
        { O: "台州市", D: "宁波市", "危化品货车（自然量/日）": 4454 },
        { O: "温州市", D: "宁波市", "危化品货车（自然量/日）": 4075 },
        { O: "舟山市", D: "宁波市", "危化品货车（自然量/日）": 1221 },
      ],
      option2: {},
      dataKey: "totalData",
      echartsConfig: {
        title: "宁波与其他城市之间的危化品车辆流量OD",
        valueKey: "危化品货车（自然量/日）",
        nameKey: "O",
        legend: ["危化品货车（自然量/日）"],
      },
    };
  },
  components: {},
  computed: {
    thead() {
      return this.base.getThead(this[this.dataKey])
    },
    allcitys() {
      return this.$store.getters.get_allcity;
    },
  },
  watch: {},
  created() {
    this[this.dataKey] = this.sort(
      "危化品货车（自然量/日）",
      this[this.dataKey]
    );
    this.$store.commit("setLeftActive", "2-2-3");
    setTimeout(() => {
      this.$em.$emit("changeTop", "2");
    }, 0);
  },
  mounted() {
    this.init_ech();
    // this.ech1();
    // this.rightEch();
    this.right_ech();
  },
  methods: {
    init_ech() {
      const { title, valueKey } = this.echartsConfig;
      let total = this.$setEch.getData2({
        startCity: "O",
        endCity: "D",
        valueName: valueKey,
        data: this.totalData,
        width: 500,
        max: 20000,
        scatterValueKey: "O",
      });
      let option = this.$setEch.setEch({
        allData: total,
        title: title,
        max: 5000,
        effect: {},
        type: "get",
        tooltipText: "车辆流量",
      });
      option.geo = Map.geo({ zoom: 3, center: [120.6, 29.5] });
      option.toolbox = Map.toolbox("map");
      console.log(option);
      this.option = option;
    },
    ech1() {
      myChart = this.$echarts.init(document.getElementById("ech"));
      let citys = [],
        moveLines = [],
        top10 = [];
      // 货物
      moveLines = this.totalData.map((v, id) => {
        let fromobj = this.allcitys.find((res) => res.市名称 == v.O);
        let toobj = this.allcitys.find((res) => res.市名称 == v.D);
        let fromname = v.O;
        let toname = v.D;
        let coord = [fromobj["经度"], fromobj["纬度"]];
        let value = parseInt(v["货物（吨/日）"]);
        let lineStyle = {
          width: value / 1000 + 1,
          opacity: 0.9,
          curveness: 0.2,
        };
        let obj = { coord, value, fromname, toname, lineStyle };
        let obj2 = { coord: [toobj["经度"], toobj["纬度"]] };
        // let coord = []
        top10.push({ name: fromname, toname, value });
        let obj3 = {
          name: fromname,
          toname: toname,
          value: [fromobj["经度"], fromobj["纬度"], value],
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
        moveLines,
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
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
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
                fromname + "---->" + toname + "<br/>" + "货物（吨/日）:" + value
              );
            }
          },
        },
        visualMap: [
          {
            min: 0,
            max: 10000,
            left: "right",
            top: "bottom",
            splitNumber: 5,
            text: ["货物（吨/日）"], // 文本，默认为数值文本
            calculable: true,
            color: this.$setEch.getColor(),
            // inRange: {
            //   color: ["green", "yellow", "red"]
            // },
            textStyle: {
              color: "#ffffff",
            },
          },
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
            fontSize: 18,
          },
        },
        geo: {
          map: "china",
          zoom: 8,
          center: [120.55027, 29.67386],
          label: {
            normal: {
              show: true,
              color: "#fff",
            },
            emphasis: {
              show: false,
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              color: "rgba(51, 69, 89, .5)", //地图背景色
              borderColor: "#516a89", //省市边界线00fcff 516a89
              borderWidth: 1,
            },
            emphasis: {
              color: "rgba(37, 43, 61, .5)", //悬浮背景
            },
          },
        },
        series: [
          {
            name: "地点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 100,
            rippleEffect: {
              brushType: "stroke",
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
              },
              emphasis: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: function (val) {
              return 15 + val[2] / 20000;
            },
            showEffectOn: "render",
            itemStyle: {
              normal: {
                // color: "#46bee9"
              },
            },
            data: allData.citys,
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
              trailLength: 0,
            },
            // lineStyle: {
            //   // color:'white',
            //   width: 1.3,
            //   opacity: 0.9,
            //   curveness: 0.1
            // },
            data: allData.moveLines,
          },
        ],
      };
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
    clickLegend() {
      myChart.on("legendselectchanged", function (params) {
        var name = params.name;
        console.log(name);
      });
    },
    rightEch1() {
      var myChart = this.$echarts.init(document.getElementById("rightEch"));
      let Xdata = [];
      let Data = [];
      this.top10.forEach((v) => {
        Xdata.push(v.name);
        Data.push(v.value);
      });
      console.log(Xdata);
      var option = {
        title: {
          text: "宁波市与其他城市货运重量前10城市",
          // subtext: "货邮数（吨）",
          left: "center",
          textStyle: {
            color: "aqua",
          },
        },
        grid: {
          bottom: "15%",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["分配比例"],
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: {
          type: "category",
          data: Xdata,
          name: "城市名称",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
            formatter: function (param) {
              if (param.length > 10) {
                param.slice(0, 10) + "...";
              }
              return param.split("").join("\n");
            },
          },
          //线颜色
          axisLine: {
            lineStyle: {
              color: "#fff",
              type: "solid",
              width: "1",
            },
          },
        },
        yAxis: {
          type: "value",
          name: "货物（吨/日）",
          //   max: 10000,
          //   min: 0,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 14,
            },
          },
          //线颜色
          axisLine: {
            lineStyle: {
              color: "#fff",
              type: "solid",
              width: "1",
            },
          },
          // 线样式
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(255,255,255)",
              width: 1,
            },
          },
        },
        series: [
          {
            data: Data,
            type: "bar",
            color: ["rgb(0, 255, 255,.5)"],
            //高亮时的设置
            emphasis: {
              itemStyle: {
                color: "skyblue",
              },
              //文字显示
              label: {
                show: true,
                color: "white",
                // formatter:'123'
              },
            },
            label: {
              show: true,
              formatter: "{c}",
              position: "inside",
              // verticalAlign: "middle",
              textStyle: {
                color: "white",
                fontSize: 10,
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    sort(key, data) {
      return data.sort((a, b) => {
        return b[key] - a[key];
      });
    },
    right_ech() {
      const { valueKey, nameKey, legend, title } = this.echartsConfig;
      const xdata = this[this.dataKey].map(
        (v) => v[this.echartsConfig.nameKey]
      );

      this.option.title.text = title;
      var series = legend.map((v) => {
        const data = this[this.dataKey].map((r) => r[v]);
        return {
          name: v,
          type: "bar",
          //   stack: "总量",
          data,
          label: {
            show: true,
            position: "inside",
            textStyle: {
              color: "#fff",
            },
          },
        };
      });
      this.option2 = {
        ...this.option2,
        title: Map.title(title),
        toolbox: Map.toolbox(),
        xAxis: Map.xAxis("城市", xdata),
        yAxis: Map.yAxis(valueKey),
        legend: {
          top: 50,
          data: legend,
          textStyle: {
            color: "#96A4F4",
          },
        },
        grid: {
          top: "30%",
          bottom: 50,
        },
        series,
      };
    },
    handleChange(value) {
      console.log(value);
    },
  },
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
  height: 50%;
  border: 1px solid rgb(0, 255, 255, 0.7);
  position: absolute !important;
  bottom: 0;
}
</style>