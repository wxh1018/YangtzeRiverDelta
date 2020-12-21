<template>
  <div class="bridge">
    <Left>
      <div class="zhen">
        <i class="iconfont icon-zhibeizhen3"></i>
        <js-echarts :option="option" />
      </div>
    </Left>
    <Right>
      <js-table
        :tableData="table"
        :thead="thead"
        title="2016年过江通道交通量"
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
      //map
      option: {
        title: {
          text: "2016年过江通道交通量",
          left: "center",
          textStyle: {
            color: "#fff",
          },
          top: 20,
        },
        backgroundColor: "#020933",
      },
      bridgeData: [
        {
          name: "泰州大桥",
          lnglat: [119.881946, 32.244588],
          val: 15059,
        },
        {
          name: "润扬大桥",
          lnglat: [119.369424, 32.20424],
          val: 32384,
        },
        {
          name: "南京长江四桥",
          lnglat: [118.945154, 32.174547],
          val: 18377,
        },
        // {
        //   name: "扬子江隧道",
        //   lnglat: [118.695651, 32.092695],
        //   val: 64175,
        // },
        // {
        //   name: "长江隧道",
        //   lnglat: [118.668579, 32.057344],
        //   val: 76948,
        // },
        {
          name: "南京长江三桥",
          lnglat: [118.607758, 31.986052],
          val: 25889,
        },
        {
          name: "江阴大桥",
          lnglat: [120.275319, 31.941414],
          val: 86137,
        },
        {
          name: "苏通大桥",
          lnglat: [120.993809, 31.867791],
          val: 78613,
        },
        {
          name: "崇启大桥",
          lnglat: [121.669209, 31.710092],
          val: 13449,
        },
      ],
      bridgeImg: require("@/assets/img/bridge.png"),
      table: [
        {
          桥名: "崇启大桥",
          "客车（辆）": 11632,
          "货车（辆）": 1817,
          "当量（pcu）": 15095,
          饱和度: 0.14,
          "平均速度（km/h）": 68.1,
        },
        {
          桥名: "苏通大桥",
          "客车（辆）": 55402,
          "货车（辆）": 23211,
          "当量（pcu）": 107736,
          饱和度: 1.03,
          "平均速度（km/h）": 80,
        },
        {
          桥名: "江阴大桥",
          "客车（辆）": 64809,
          "货车（辆）": 21327,
          "当量（pcu）": 114831,
          饱和度: 1.1,
          "平均速度（km/h）": 71.5,
        },
        {
          桥名: "泰州大桥",
          "客车（辆）": 11015,
          "货车（辆）": 4045,
          "当量（pcu）": 19824,
          饱和度: 0.19,
          "平均速度（km/h）": 75.8,
        },
        {
          桥名: "润扬大桥",
          "客车（辆）": 23199,
          "货车（辆）": 9184,
          "当量（pcu）": 48325,
          饱和度: 0.46,
          "平均速度（km/h）": 69.7,
        },
        {
          桥名: "南京四桥",
          "客车（辆）": 11356,
          "货车（辆）": 7021,
          "当量（pcu）": 31772,
          饱和度: 0.3,
          "平均速度（km/h）": 81.7,
        },
        {
          桥名: "南京三桥",
          "客车（辆）": 21783,
          "货车（辆）": 4105,
          "当量（pcu）": 32233,
          饱和度: 0.312,
          "平均速度（km/h）": 95.5,
        },
      ],
      thead: [
        { name: "桥名", value: "桥名" },
        { name: "客车（辆）", value: "客车（辆）" },
        { name: "货车（辆）", value: "货车（辆）" },
        { name: "当量（pcu）", value: "当量（pcu）" },
        { name: "饱和度", value: "饱和度" },
        { name: "平均速度（km/h）", value: "平均速度（km/h）" },
      ],
      //bar
      option2: {
        title: {
          text: "2016年过江通道交通量示意图",
          left: "center",
          textStyle: {
            color: "white",
          },
        },
        color: ["#f00", "#f3f700"],
      },
    };
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.table = this.table.sort((a, b) => {
      return (
        b["客车（辆）"] + b["货车（辆）"] - (a["客车（辆）"] + a["货车（辆）"])
      );
    });
  },
  mounted() {
    setTimeout(() => {
      this.$em.$emit("changeTop", "2");
    }, 0);
    this.$store.commit("setLeftActive", "7-1");
    this.init_ech();
    this.right_ech();
  },
  methods: {
    init_ech() {
      const data = this.bridgeData.map((v) => {
        return {
          ...v,
          value: v.lnglat,
        };
      });
      var option = {
        ...this.option,
        geo: {
          type: "map",
          map: "江苏",
          roam: true,
          label: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
          itemStyle: {
            normal: {
              borderColor: "#2ab8ff",
              borderWidth: 1.5,
              areaColor: "#12235c",
            },
            emphasis: {
              areaColor: "#2AB8FF",
              borderWidth: 0,
              color: "green",
            },
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
            restore: {},
          },
          iconStyle: {
            borderColor: "#fff",
          },
          top: 10,
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "image://" + this.bridgeImg,
            symbolSize: 50,
            backgroundColor: "",
            label: {
              normal: {
                show: true,
                position: "bottom",
                formatter(params) {
                  const { name, val } = params.data;
                  return `{con|${name}\n${val}}`;
                },
                rich: {
                  con: {
                    backgroundColor: "rgba(15,130,136,.8)",
                    width: 70,
                    height: 20,
                    color: "#fff",
                    align: "center",
                    borderColor: "#0dd8e3",
                    borderWidth: 1,
                  },
                  pic: {
                    backgroundColor: {
                      image: this.bridgeImg,
                    },
                    width: 40,
                    height: 40,
                  },
                },
              },
            },
            data: data,
          },
        ],
      };
      this.option = option;
    },
    right_ech() {
      const legend = ["客车（辆）", "货车（辆）"];
      const series = legend.map((v) => {
        return {
          name: v,
          type: "bar",
          stack: "总量",
          data: this.table.map((v2) => v2[v]),
          label: {
            show: true,
            position: "inside",
            textStyle: {
              color: "#000",
            },
          },
        };
      });
      const xdata = this.table.map((v) => v.桥名);
      this.option2 = {
        ...this.option2,
        tooltip: {
          trigger: "axis",
          formatter(params) {
            let name = params[0].axisValue;
            let val1 = params[0];
            let val2 = params[1];
            return `${name}<br/>${val1.seriesName}:${val1.value}<br/>${val2.seriesName}:${val2.value}`;
          },
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
            restore: {},
            dataView: {},
            magicType: {
              type: ["line", "bar"],
            },
          },
          iconStyle: {
            borderColor: "#fff",
          },
        },
        legend: {
          top: 30,
          data: legend,
          textStyle: {
            color: "#96A4F4",
          },
        },
        xAxis: {
          name: "桥名",
          type: "category",
          data: xdata,
          rotate: 40,
          axisLabel: {
            color: "#fff",
            interval: 0,
            margin: 10,
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
          name: "日均车流量",
          axisLabel: {
            color: "#fff",
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(150, 164, 244, 1)",
              type: "dashed",
            },
          },
        },
        series,
      };
    },
  },
};
</script>
<style scoped lang='less'>
.bridge {
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
</style>