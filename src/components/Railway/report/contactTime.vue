<template>
  <div class="js_pro">
    <left>
      <div class="zhen">
        <i class="iconfont icon-zhibeizhen3"></i>
        <div id="ech" ref="ech"></div>
      </div>
    </left>
    <right>
      <js-table
        :tableData="table"
        :thead="thead"
        title="江苏省机场出港旅客量分布表(单位:万人次)"
      />
      <div id="rightEch"></div>
    </right>
  </div>
</template>
<script>
import "echarts/map/js/province/anhui";
export default {
  data() {
    return {
      table: [
        {
          year: "2018年",
          centersouth: "643.2",
          westsouth: "643.0",
          eastnorth: "262.2",
          huaeast: "260.5",
          huanorth: "216.8",
          westnorth: "155.0",
          xinjiang: "31.9",
        },
        {
          year: "2015年",
          centersouth: "441.2",
          westsouth: "270.6",
          eastnorth: "139.9",
          huaeast: "163.0",
          huanorth: "141.1",
          westnorth: "80.7",
          xinjiang: "16.3",
        },
        {
          year: "增量",
          centersouth: "202.0",
          westsouth: "192.4",
          eastnorth: "122.3",
          huaeast: "97.4",
          huanorth: "75.6",
          westnorth: "74.3",
          xinjiang: "15.6",
        },
      ],
      thead: [
        { name: "年份", value: "year" },
        { name: "中南", value: "centersouth" },
        { name: "西南", value: "westsouth" },
        { name: "东北", value: "eastnorth" },
        { name: "华东", value: "huaeast" },
        { name: "华北", value: "huanorth" },
        { name: "西北", value: "westnorth" },
        { name: "新疆", value: "xinjiang" },
      ],
    };
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    setTimeout(() => {
      this.$em.$emit("changeTop", "3");
    }, 0);
    this.$store.commit("setLeftActive", "6-1");
  },
  mounted() {
    this.init_ech();
    // this.rightEch();
  },
  methods: {
    init_ech() {
      const ech = this.$refs.ech;
      var myChart = this.$echarts.init(ech);
      var typeIndex = 1;
      var option = null;
      let dataList = [{ name: "南京市", value: 18 }];
      option = {
        backgroundColor: "#ffffff",
        title: {
          text: "长三角城市铁路联系时间",
          textStyle: {
            color: "#fff",
          },
          left: "center",
        },
        tooltip: {
          show: true,
          formatter: function (e, t, n) {
            console.log(e);
            return ".5" == e.value
              ? e.name + "：有疑似病例"
              : e.seriesName + "<br />" + e.name + "：" + e.value;
          },
        },
        visualMap: {
          min: 0,
          max: 100000,
          left: 26,
          bottom: 40,
          showLabel: !0,
          text: ["高", "低"],
          pieces: [
            {
              gt: 10000,
              label: "> 10000人",
              color: "#7f1100",
            },
            {
              gte: 1000,
              lte: 10000,
              label: "1000 - 10000人",
              color: "#ff5428",
            },
            {
              gte: 100,
              lt: 1000,
              label: "100 - 1000人",
              color: "#ff8c71",
            },
            {
              gt: 10,
              lt: 100,
              label: "10 - 100人",
              color: "#ffd768",
            },
            {
              gt: 1,
              lt: 10,
              label: "1 - 10人",
              color: "#ffffff",
            },
          ],
          show: !0,
        },
        geo: {
          show: false,
          map: "china",
          //   roam: !1,
          scaleLimit: {
            min: 1,
            max: 2,
          },
          zoom: 1.23,
          top: 120,
          label: {
            normal: {
              show: !0,
              fontSize: "14",
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: {
            normal: {
              //shadowBlur: 50,
              //shadowColor: 'rgba(0, 0, 0, 0.2)',
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: {
              areaColor: "#f2d5ad",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            name: "123",
            type: "map",
            mapType: "江苏",
            zoom: 1.23,
            data: dataList,
          },
        ],
      };
      myChart.setOption(option);
    },
    rightEch() {
      var myChart = this.$echarts.init(document.getElementById("rightEch"));
      const dataYear = (year) => {
        let obj = this.table.find((v) => v.year == year + "年");
        let value = [];
        for (let key in obj) {
          key != "year" ? value.push(obj[key]) : "";
        }
        return value;
      };
      const xdata = ["中南", "西南", "东北", "华东", "华北", "西北", "新疆"];
      var series = [
        {
          name: "2015",
          type: "bar",
          label: {
            show: true,
            formatter: "{c}",
            position: "inside",
            textStyle: {
              color: "white",
              fontSize: 14,
            },
          },
          data: dataYear(2015),
        },
        {
          name: "2018",
          type: "bar",
          label: {
            show: true,
            formatter: "{c}",
            position: "inside",
            textStyle: {
              color: "white",
              fontSize: 14,
            },
          },
          data: dataYear(2018),
        },
      ];

      var option = {
        title: {
          text: "江苏省机场出港旅客量分布图(单位:万人次)",
          left: "center",
          textStyle: {
            color: "white",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{a}: {c}万人次<br />{a1}: {c1}万人次",
        },
        legend: {
          data: ["2015", "2018"],
          textStyle: {
            color: "#fff",
          },
          top: "10%",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
            magicType: { type: ["line", "bar"] },
            dataView: {
              //数据可视化
              readOnly: false,
            },
          },
          iconStyle: {
            // color:'white'
            borderColor: "#fff",
          },
        },
        grid: {
          bottom: "10%",
        },
        xAxis: {
          data: xdata,
          name: "地区",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        yAxis: {
          name: "万人次",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        series,
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style scoped lang='less'>
.js_pro {
  width: 100%;
  height: 100%;
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
  bottom: 10%;
}
</style>