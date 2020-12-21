<template>
  <div class="cus_travel">
    <Left>
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
      option: {
        title: {
          text: "长三角公路货运总量",
          left: "center",
          textStyle: {
            color: "#fff",
          },
          top: 20,
        },
        backgroundColor: "#020933",
      },
      data1: [
        {
          行政区划: "长三角",
          "2018年货运量（亿吨）": 62.94,
          "2019年货运量（亿吨）": 66.12,
        },
        {
          行政区划: "上海",
          "2018年货运量（亿吨）": 3.96,
          "2019年货运量（亿吨）": 3.88,
        },
        {
          行政区划: "江苏",
          "2018年货运量（亿吨）": 13.93,
          "2019年货运量（亿吨）": 14.71,
        },
        {
          行政区划: "浙江",
          "2018年货运量（亿吨）": 16.65,
          "2019年货运量（亿吨）": 24.03,
        },
        {
          行政区划: "安徽",
          "2018年货运量（亿吨）": 28.4,
          "2019年货运量（亿吨）": 23.5,
        },
      ],
      dataKey: "data1",
      thead: [
        { name: "行政区划", value: "行政区划" },
        {
          name: "2018年货运量（亿吨）",
          value: "2018年货运量（亿吨）",
        },
        {
          name: "2019年货运量（亿吨）",
          value: "2019年货运量（亿吨）",
        },
      ],
      option2: {
        title: {
          text: "长三角公路客运总量",
          left: "center",
          textStyle: {
            color: "#fff",
          },
          top: 20,
        },
      },
      echartsConfig: {
        title: "长三角公路货运总量",
        nameKey: "行政区划",
        valueKey: "2018年货运量（亿吨）",
        valueKey2: "2019年货运量（亿吨）",
        legend: ["2018年货运量（亿吨）", "2019年货运量（亿吨）"],
      },
    };
  },
  components: {},
  computed: {},
  watch: {
    dataKey() {
      this.init_ech();
      this.right_ech();
    },
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.$em.$emit("changeTop", "2");
    }, 0);
    this.$store.commit("setLeftActive", "2-2-1");
    this.init_ech();
    this.right_ech();
  },
  methods: {
    init_ech() {
      const { toolbox, geo } = Map;
      const { title, nameKey, valueKey } = this.echartsConfig;
      var mapgeoObj, max, pieces;
      max = 100;
      mapgeoObj = { map: "china", center: [119.15027, 32.67386], zoom: 5 };
      pieces = [
        {
          gt: 60,
          label: ">60 亿吨",
          color: "#7f1100",
        },
        {
          gt: 40,
          lt: 60,
          label: "40 - 60 亿吨",
          color: "#ff5428",
        },
        {
          gt: 20,
          lt: 40,
          label: "20 - 40 亿吨",
          color: "#ff8c71",
        },
        {
          gt: 0,
          lt: 20,
          label: "0 -20 亿吨",
          color: "#ffd768",
        },
        {
          value: 0,
          color: "#ffffff",
        },
      ];

      let data = this[this.dataKey].map((v) => {
        return {
          name: v[nameKey],
          value: v[valueKey],
        };
      });
      this.option.title.text = title;
      let option = {
        ...this.option,
        toolbox: toolbox("map"),
        geo: geo(mapgeoObj),
        tooltip: {
          formatter(params) {
            const { value, name } = params;
            return name + ":" + value;
          },
        },
        visualMap: {
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
        },
        series: [
          {
            name: "data",
            type: "map",
            geoIndex: 0,
            data,
          },
        ],
      };
      this.option = option;
    },
    right_ech() {
      const { valueKey, nameKey, legend, title } = this.echartsConfig;
      const xdata = this[this.dataKey].map((v) => v[nameKey]);
      this.option.title.text = title;
      var series = legend.map((v) => {
        return {
          name: v,
          type: "bar",
          //   stack: "总量",
          data: this[this.dataKey].map((r) => r[v]),
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
        toolbox: Map.toolbox(),
        xAxis: Map.xAxis("货运运量（亿吨）", xdata),
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
.cus_travel {
  width: 100%;
  height: 100%;
  border: 1px solid white;
  position: relative;
  display: flex;
  justify-content: space-around;
}
#ech {
  width: 100%;
  height: 90%;
}
#rightEch {
  width: 100%;
  height: 50%;
  border: 1px solid rgb(0, 255, 255, 0.7);
  position: absolute !important;
  bottom: 0;
}
.cus_travel
  /deep/
  .el-pagination.is-background
  .el-pager
  li:not(.disabled).active {
  background-color: #09cccc;
}
</style>