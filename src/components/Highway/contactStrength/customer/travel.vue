<template>
  <div class="cus_travel">
    <Left>
      <js-echarts :option="option" />
      <el-radio v-model="dataKey" label="data1"
        >2017年江苏省旅游包车省内发送情况</el-radio
      >
      <el-radio v-model="dataKey" label="data2"
        >2017年江苏省旅游包车省外发送情况</el-radio
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
      option: {
        title: {
          text: "2017年全省旅游包车省内发送情况",
          left: "center",
          textStyle: {
            color: "#fff",
          },
          top: 20,
        },
        backgroundColor: "#020933",
      },
      data1: [
        { 行政区域: "南京市", "旅游包车客运发送量（万人次）": 115 },
        { 行政区域: "无锡市", "旅游包车客运发送量（万人次）": 121 },
        { 行政区域: "徐州市", "旅游包车客运发送量（万人次）": 33 },
        { 行政区域: "常州市", "旅游包车客运发送量（万人次）": 83 },
        { 行政区域: "苏州市", "旅游包车客运发送量（万人次）": 135 },
        { 行政区域: "南通市", "旅游包车客运发送量（万人次）": 49 },
        { 行政区域: "连云港市", "旅游包车客运发送量（万人次）": 22 },
        { 行政区域: "淮安市", "旅游包车客运发送量（万人次）": 35 },
        { 行政区域: "盐城市", "旅游包车客运发送量（万人次）": 42 },
        { 行政区域: "扬州市", "旅游包车客运发送量（万人次）": 41 },
        { 行政区域: "镇江市", "旅游包车客运发送量（万人次）": 48 },
        { 行政区域: "泰州市", "旅游包车客运发送量（万人次）": 41 },
        { 行政区域: "宿迁市", "旅游包车客运发送量（万人次）": 18 },
      ],
      data2: [
        { 行政区域: "上海", "旅游包车客运发送量（万人次）": 321 },
        { 行政区域: "安徽", "旅游包车客运发送量（万人次）": 185 },
        { 行政区域: "浙江", "旅游包车客运发送量（万人次）": 248 },
      ],
      dataKey: "data1",
      thead: [
        { name: "行政区域", value: "行政区域" },
        {
          name: "旅游包车客运发送量（万人次）",
          value: "旅游包车客运发送量（万人次）",
        },
      ],
      option2: {
        title: {
          text: "2017年全省旅游包车省内发送情况柱状图",
          left: "center",
          textStyle: {
            color: "#fff",
          },
          top: 20,
        },
      },
    };
  },
  components: {},
  computed: {
    title() {
      return this.dataKey == "data1"
        ? "2017年江苏省旅游包车省内发送情况"
        : "2017年江苏省旅游包车省外发送情况";
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
    this.$store.commit("setLeftActive", "2-1-4");
    this.init_ech();
    this.right_ech();
  },
  methods: {
    init_ech() {
      const { toolbox, geo } = Map;
      var mapgeoObj, max, pieces;
      if (this.dataKey == "data1") {
        max = 100;
        mapgeoObj = { map: "江苏", center: [119.15027, 32.67386] };
        pieces = [
          {
            gt: 100,
            label: "> 100 次",
            color: "#7f1100",
          },
          {
            gte: 50,
            lte: 100,
            label: "50 - 100 次",
            color: "#ff5428",
          },
          {
            gte: 25,
            lt: 50,
            label: "25 - 50 次",
            color: "#ff8c71",
          },
          {
            gt: 0,
            lt: 25,
            label: "0-25 次",
            color: "#ffd768",
          },
          {
            value: 0,
            color: "#ffffff",
          },
        ];
      } else {
        mapgeoObj = { map: "china", center: [118.55027, 30.67386], zoom: 5 };
        max = 300;
        pieces = [
          {
            gt: 300,
            label: "300以上",
            color: "#7f1100",
          },
          {
            gte: 200,
            lte: 300,
            label: "200 - 300 次",
            color: "#ff5428",
          },
          {
            gte: 80,
            lt: 200,
            label: "80 - 200",
            color: "#ff8c71",
          },
          {
            gt: 0,
            lt: 80,
            label: "80以下",
            color: "#ffd768",
          },
        ];
      }
      let data = this[this.dataKey].map((v) => {
        return {
          name: v.行政区域,
          value: v["旅游包车客运发送量（万人次）"],
        };
      });
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
      const xdata = this[this.dataKey].map((v) => v.行政区域);
      const value = this[this.dataKey].map(
        (v) => v["旅游包车客运发送量（万人次）"]
      );
      this.option.title.text = this.title;
      this.option2 = {
        ...this.option2,
        toolbox: Map.toolbox(),
        xAxis: Map.xAxis("行政区域", xdata),
        yAxis: Map.yAxis("旅游包车客运发送量（万人次）"),
        series: [
          {
            name: "2017年全省旅游包车省内发送情况",
            type: "bar",
            //   stack: "总量",
            data: value,
            label: {
              show: true,
              position: "inside",
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
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
.el-radio {
  color: #409eff;
}
</style>