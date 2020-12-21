<template>
  <div class="toll">
    <Left>
      <!-- <div id="ech"></div> -->
      <js-echarts :option="option1" />
      <el-radio v-model="dataKey" label="data1"
        >2019年流量最大的前15入口收费站（单位：辆）</el-radio
      >
      <el-radio v-model="dataKey" label="data2"
        >2019年流量最大的前15出口收费站（单位：辆）</el-radio
      >
    </Left>
    <Right>
      <js-table :tableData="this[this.dataKey]" :thead="thead" :title="title" />
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
      dataKey: "data1",
      data1: [
        {
          序号: 1,
          入口站: "花桥",
          经度: 121.145485,
          纬度: 31.284572,
          日均入口流量: 71456,
        },
        {
          序号: 2,
          入口站: "苏浙省界",
          经度: 119.855689,
          纬度: 31.302467,
          日均入口流量: 57791,
        },
        {
          序号: 3,
          入口站: "太仓主线",
          经度: 121.145361,
          纬度: 31.618107,
          日均入口流量: 53376,
        },
        {
          序号: 4,
          入口站: "盛泽主线",
          经度: 120.682167,
          纬度: 30.913179,
          日均入口流量: 37485,
        },
        {
          序号: 5,
          入口站: "无锡互通",
          经度: 120.477624,
          纬度: 31.515877,
          日均入口流量: 31764,
        },
        {
          序号: 6,
          入口站: "南京",
          经度: 118.911489,
          纬度: 32.063061,
          日均入口流量: 30097,
        },
        {
          序号: 7,
          入口站: "苏沪主线",
          经度: 121.314655,
          纬度: 31.074963,
          日均入口流量: 28767,
        },
        {
          序号: 8,
          入口站: "六合南",
          经度: 118.731754,
          纬度: 32.26361,
          日均入口流量: 26598,
        },
        {
          序号: 9,
          入口站: "宁杭南京",
          经度: 118.872664,
          纬度: 31.965278,
          日均入口流量: 23255,
        },
        {
          序号: 10,
          入口站: "无锡东",
          经度: 120.382462,
          纬度: 31.575132,
          日均入口流量: 21227,
        },
        {
          序号: 11,
          入口站: "崇启大桥主线",
          经度: 121.682331,
          纬度: 31.748724,
          日均入口流量: 20513,
        },
        {
          序号: 12,
          入口站: "淀山湖",
          经度: 120.965279,
          纬度: 31.214013,
          日均入口流量: 19374,
        },
        {
          序号: 13,
          入口站: "苏州",
          经度: 120.636583,
          纬度: 31.350897,
          日均入口流量: 19133,
        },
        {
          序号: 14,
          入口站: "薛家",
          经度: 119.933761,
          纬度: 31.86398,
          日均入口流量: 18657,
        },
        {
          序号: 15,
          入口站: "陆家",
          经度: 121.059884,
          纬度: 31.329917,
          日均入口流量: 18433,
        },
      ],
      option1: {},
      data2: [
        {
          序号: 1,
          出口站: "南京",
          经度: 118.911398,
          纬度: 32.063607,
          日均出口流量: 54051,
        },
        {
          序号: 2,
          出口站: "南京三桥",
          经度: 118.60449,
          纬度: 31.98679,
          日均出口流量: 53150,
        },
        {
          序号: 3,
          出口站: "溧马高速苏皖省界",
          经度: 117.033422,
          纬度: 34.137173,
          日均出口流量: 52946,
        },
        {
          序号: 4,
          出口站: "花桥",
          经度: 121.145485,
          纬度: 31.284572,
          日均出口流量: 43476,
        },
        {
          序号: 5,
          出口站: "苏浙主线",
          经度: 119.855689,
          纬度: 31.302467,
          日均出口流量: 39756,
        },
        {
          序号: 6,
          出口站: "苏皖省界",
          经度: 118.933835,
          纬度: 31.382723,
          日均出口流量: 38332,
        },
        {
          序号: 7,
          出口站: "宁杭南京",
          经度: 118.872664,
          纬度: 31.965278,
          日均出口流量: 35583,
        },
        {
          序号: 8,
          出口站: "盛泽主线",
          经度: 120.682112,
          纬度: 30.91336,
          日均出口流量: 35311,
        },
        {
          序号: 9,
          出口站: "宿扬苏皖省界",
          经度: 119.20531,
          纬度: 32.505038,
          日均出口流量: 32310,
        },
        {
          序号: 10,
          出口站: "太仓主线",
          经度: 121.145361,
          纬度: 31.618107,
          日均出口流量: 24733,
        },
        {
          序号: 11,
          出口站: "南京南",
          经度: 118.89011,
          纬度: 31.762529,
          日均出口流量: 20479,
        },
        {
          序号: 12,
          出口站: "无锡互通",
          经度: 120.477624,
          纬度: 31.515877,
          日均出口流量: 18676,
        },
        {
          序号: 13,
          出口站: "小海",
          经度: 120.990971,
          纬度: 31.95724,
          日均出口流量: 17595,
        },
        {
          序号: 14,
          出口站: "六合南",
          经度: 118.732297,
          纬度: 32.263488,
          日均出口流量: 16814,
        },
        {
          序号: 15,
          出口站: "苏浙省界",
          经度: 119.855689,
          纬度: 31.302467,
          日均出口流量: 16487,
        },
      ],
      option2: {},
      echartsConfig: {
        title: "2019年流量最大的前15入口收费站（单位：辆）",
        valueKey1: "日均入口流量",
        valueKey2: "日均出口流量",
        nameKey1: "入口站",
        nameKey2: "出口站",
        legend1: ["入口站"],
        legend2: ["出口站"],
      },
    };
  },
  components: {},
  computed: {
    title() {
      return this.dataKey == "data1"
        ? "2019年流量最大的前15入口收费站（单位：辆）"
        : "2019年流量最大的前15出口收费站（单位：辆）";
    },
    thead() {
      return this.base.getThead(this[this.dataKey]);
    },
  },
  watch: {
    dataKey() {
      this.init_ech();
      this.rightEch();
    },
  },
  created() {
    this.data1 = this.base.sort("入口站", this.data1);
    this.$store.commit("setLeftActive", "3-7");
    setTimeout(() => {
      this.$em.$emit("changeTop", "2");
    }, 0);
  },
  mounted() {
    this.rightEch();
    this.init_ech();
  },
  methods: {
    init_ech() {
      let nameKey = "",
        valueKey = "";
      if (this.dataKey == "data1") {
        nameKey = "入口站";
        valueKey = "日均入口流量";
      } else {
        nameKey = "出口站";
        valueKey = "日均出口流量";
      }

      const data = this[this.dataKey].map((v) => {
        return [v.经度, v.纬度, v[valueKey], v[nameKey]];
      });
      this.option1 = {
        ...this.option1,
        title: Map.title(this.title),
        geo: Map.geo({ map: "csjmap", zoom: 2 }),
        toolbox: Map.toolbox("map"),
        tooltip: {
          formatter(params) {
            const { value, name } = params;
            return value[3] + ":" + value[2];
          },
        },
        visualMap: {
          min: 0,
          max: 100000,
          left: "3%",
          bottom: "5%",
          seriesIndex: [0],
          dimension: 2,
          text: ["高", "底"],
          calculable: true,
          //   inverse: true,
          //   inRange: {
          color: ["#7f1100", "#ff5428", "#ffd768"],
          //   },
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "data",
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize(params) {
              return parseInt(params[2] / 3000) + 10;
            },
            label: {
              normal: {
                formatter(v) {
                  return v.value[3];
                },
                color: "aqua",
                position: "right",
                show: true,
              },
            },
            data,
          },
        ],
      };
    },
    rightEch() {
      const {
        nameKey1,
        nameKey2,
        legend1,
        legend2,
        valueKey1,
        valueKey2,
      } = this.echartsConfig;
      let data = this[this.dataKey];
      var nameKey = "",
        legend = [],
        valueKey = "";
      if (this.dataKey == "data1") {
        nameKey = nameKey1;
        legend = legend1;
        valueKey = valueKey1;
      } else {
        nameKey = nameKey2;
        legend = legend2;
        valueKey = valueKey2;
      }
      const xdata = data.map((v) => v[nameKey]);
      var series = legend.map((v) => {
        const data = this[this.dataKey].map((r) => r[valueKey]);
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
        title: Map.title(this.title),
        toolbox: Map.toolbox(),
        xAxis: Map.xAxis(nameKey, xdata),
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
  },
};
</script>
<style scoped lang='less'>
.toll {
  width: 100%;
  height: 100%;
  .df();
}
</style>