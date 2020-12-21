<template>
  <div class="passenger">
    <Left>
      <!-- <div id="ech"></div> -->
      <js-echarts :option="option1" />
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
export default {
  data() {
    return {
      data: [
        {
          客运站: "南京客运南站",
          "年旅客发送量（万人次）": "478.1 ",
          "年发送班次（次）": 234579,
          经度: 118.795405,
          纬度: 31.969191,
        },
        {
          客运站: "泰州南站",
          "年旅客发送量（万人次）": "279.0 ",
          "年发送班次（次）": 161117,
          经度: 119.910194,
          纬度: 32.444523,
        },
        {
          客运站: "无锡客运站",
          "年旅客发送量（万人次）": "802.6 ",
          "年发送班次（次）": 402370,
          经度: 120.308463,
          纬度: 31.593166,
        },
        {
          客运站: "盐城汽车站",
          "年旅客发送量（万人次）": "342.5 ",
          "年发送班次（次）": 248925,
          经度: 120.173566,
          纬度: 33.37703,
        },
        {
          客运站: "镇江汽车站",
          "年旅客发送量（万人次）": "240.8 ",
          "年发送班次（次）": 157721,
          经度: 119.435468,
          纬度: 32.197144,
        },
        {
          客运站: "南通汽车站",
          "年旅客发送量（万人次）": "369.4 ",
          "年发送班次（次）": 208349,
          经度: 120.921095,
          纬度: 32.002687,
        },
        {
          客运站: "扬州西站",
          "年旅客发送量（万人次）": "301.5 ",
          "年发送班次（次）": 150526,
          经度: 119.347237,
          纬度: 32.385712,
        },
        {
          客运站: "苏州南站",
          "年旅客发送量（万人次）": "465.3 ",
          "年发送班次（次）": 200231,
          经度: 120.803801,
          纬度: 31.060853,
        },
        {
          客运站: "宿迁汽车站",
          "年旅客发送量（万人次）": "221.3 ",
          "年发送班次（次）": 140796,
          经度: 118.270485,
          纬度: 33.945427,
        },
        {
          客运站: "常州汽车站",
          "年旅客发送量（万人次）": "449.6 ",
          "年发送班次（次）": 254063,
          经度: 119.972579,
          纬度: 31.787681,
        },
        {
          客运站: "徐州总站",
          "年旅客发送量（万人次）": "369.1 ",
          "年发送班次（次）": 141788,
          经度: 117.306049,
          纬度: 34.267895,
        },
        {
          客运站: "淮安总站",
          "年旅客发送量（万人次）": "203.7 ",
          "年发送班次（次）": 94781,
          经度: 119.023167,
          纬度: 33.605082,
        },
        {
          客运站: "新铺汽车总站",
          "年旅客发送量（万人次）": "73.7 ",
          "年发送班次（次）": 73843,
          经度: 107.065192,
          纬度: 27.709608,
        },
      ],
      title:'2016年江苏省13个典型客运站发送量',
      dataKey: "data",
      option1: {},
      option2: {},
      echartsConfig: {
        title: "2019年流量最大的前15入口收费站（单位：辆）",
        valueKey1: "年旅客发送量（万人次）",
        valueKey2: "年发送班次（次）",
        nameKey: "客运站",
        legend1: ["年旅客发送量（万人次）", "年发送班次（次）"],
      },
    };
  },
  components: {},
  computed: {
    thead() {
      return this.base.getThead(this.data);
    },
  },
  watch: {},
  created() {
    this.$store.commit("setLeftActive", "3-8");
    this.$em.$emit("changeTop", "2");
  },
  mounted() {
    //   this.rightEch()
  },
  methods: {
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
.passenger {
  width: 100%;
  height: 100%;
  .df();
}
</style>