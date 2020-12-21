<template>
  <div class="cus_travel">
    <Left>
      <js-echarts :option="option" />
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
      option: {
        title: {
          text: "长三角公路客运总量",
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
          "2018年客运量（万人次）": 222959,
          "2019年客运量（万人次）": 279780,
        },
        {
          行政区划: "上海",
          "2018年客运量（万人次）": 3151,
          "2019年客运量（万人次）": 3167,
        },
        {
          行政区划: "江苏",
          "2018年客运量（万人次）": 97025,
          "2019年客运量（万人次）": 94475,
        },
        {
          行政区划: "浙江",
          "2018年客运量（万人次）": 72013,
          "2019年客运量（万人次）": 136138,
        },
        {
          行政区划: "安徽",
          "2018年客运量（万人次）": 50770,
          "2019年客运量（万人次）": 46000,
        },
      ],
      dataKey: "data1",
      thead: [
        { name: "行政区划", value: "行政区划" },
        {
          name: "2018年客运量（万人次）",
          value: "2018年客运量（万人次）",
        },
        {
          name: "2019年客运量（万人次）",
          value: "2019年客运量（万人次）",
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
        titel: "长三角公路客运总量",
        nameKey: "行政区划",
        valueKey: "2018年客运量（万人次）",
        valueKey2: "2019年客运量（万人次）",
        legend: ["2018年客运量（万人次）", "2019年客运量（万人次）"],
      },
    };
  },
  components: {},
  computed: {
    title() {
      return this.dataKey == "data1" ? "长三角公路客运总量" : "";
    },
  },
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
    this.$store.commit("setLeftActive", "2-1-1");
    this.init_ech();
    this.right_ech();
  },
  methods: {
    init_ech() {
      const { toolbox, geo } = Map;
      const nameKey = "行政区划";
      const valueKey = "2018年客运量（万人次）";
      var mapgeoObj, max, pieces;
      max = 300000;
      mapgeoObj = { map: "china", center: [119.15027, 32.67386], zoom: 5 };
      pieces = [
        {
          gt: 200000,
          label: ">20万",
          color: "#7f1100",
        },
        {
          gte: 150000,
          lte: 200000,
          label: "15 - 20 万",
          color: "#ff5428",
        },
        {
          gte: 100000,
          lt: 150000,
          label: "10 - 15 万",
          color: "#ff8c71",
        },
        {
          gt: 50000,
          lt: 100000,
          label: "5 -10 万",
          color: "#ffd768",
        },
        {
          gt: 0,
          lt: 50000,
          color: "#ffffff",
        },
      ];

      let data = this[this.dataKey].map((v) => {
        return {
          name: v[nameKey],
          value: v[valueKey],
        };
      });
      console.log(data);
      this.option.title.text = this.title;
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
      const { valueKey, nameKey, legend } = this.echartsConfig;
      const xdata = this[this.dataKey].map((v) => v[nameKey]);
      //   const value = this[this.dataKey].map((v) => v[valueKey]);
      this.option.title.text = this.title;
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
        xAxis: Map.xAxis("行政区域", xdata),
        yAxis: Map.yAxis("旅游包车客运发送量（万人次）"),
        legend: {
          top: 50,
          data: legend,
          textStyle: {
            color: "#96A4F4",
          },
        },
        grid:{
            top:'30%',
            bottom:50
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