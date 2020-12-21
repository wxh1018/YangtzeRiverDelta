<template>
  <div class="bridge">
    <Left>
      <div class="zhen">
        <js-echarts :option="option" />
      </div>
    </Left>
    <Right>
      <js-table
        :tableData="table"
        :thead="thead"
        title="2018年长三角毗邻地区公交线路开行情况"
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
          text: "2018年长三角毗邻地区公交线路开行情况",
          left: "center",
          textStyle: {
            color: "#fff",
          },
          top: 20,
        },
        backgroundColor: "#020933",
      },
      MapData: [
        {
          编号: 1,
          起点: "上海市",
          终点: "嘉兴市",
          公交延伸日班次: 93,
          班车公交化日班次: 30,
          合计: 123,
        },
        {
          编号: 2,
          起点: "上海市",
          终点: "南通市",
          公交延伸日班次: 46,
          班车公交化日班次: 0,
          合计: 46,
        },
        {
          编号: 3,
          起点: "上海市",
          终点: "苏州市",
          公交延伸日班次: 28,
          班车公交化日班次: 92,
          合计: 120,
        },
      ],
      bridgeImg: require("@/assets/img/bridge.png"),
      table: [
        {
          编号: 1,
          毗邻区域: "上海市-嘉兴市",
          公交延伸日班次: 93,
          班车公交化日班次: 30,
          合计: 123,
        },
        {
          编号: 2,
          毗邻区域: "上海市-南通市",
          公交延伸日班次: 46,
          班车公交化日班次: 0,
          合计: 46,
        },
        {
          编号: 3,
          毗邻区域: "上海市-苏州市",
          公交延伸日班次: 28,
          班车公交化日班次: 92,
          合计: 120,
        },
      ],
      thead: [
        { name: "编号", value: "编号" },
        { name: "毗邻区域", value: "毗邻区域" },
        { name: "公交延伸日班次", value: "公交延伸日班次" },
        { name: "班车公交化日班次", value: "班车公交化日班次" },
        { name: "合计", value: "合计" },
      ],
      //bar
      option2: {
        title: {
          text: "2018年长三角毗邻地区公交线路开行情况",
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
      this.$store.commit("setLeftActive", "3-6");
    }, 0);
    this.init_ech();
    this.right_ech();
  },
  methods: {
    init_ech() {
      let total = this.$setEch.getData2({
        data: this.MapData,
        startCity: "起点",
        endCity: "终点",
        valueName: "合计",
        data: this.MapData,
        lineStyleConfig: {
          curveness: 0,
          color: "yellow",
        },
      });
      const data = total.moveLines;
      console.log(total);
      let mapdata = total.top10;
      var option = {
        ...this.option,
        tooltip: {
          formatter(params) {
            const { componentSubType, value } = params;
            if (componentSubType == "lines") {
              const { fromname, toname } = params.data;
              return fromname + "到" + toname + "<br/>" + value;
            }
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
        visualMap: {
          min: 0,
          max: 100,
          left: "3%",
          bottom: "5%",
          // calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ["#24CFF4", "#2E98CA", "#1E62AC"],
          },
          pieces: [
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
          ],
          show: !0,
          textStyle: {
            color: "#24CFF4",
          },
        },
        geo: {
          // type: "map",
          map: "csjmap",
          roam: true,
          label: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
            formatter(params) {
              let { name } = params;
              let exclude = [
                "金山区",
                "松江区",
                "青浦区",
                "奉贤区",
                "浦东新区",
                "杨浦区",
                "宝山区",
                "嘉定区",
                "普陀区",
                "虹口区",
                "静安区",
                "黄浦区",
                "长宁区",
                "徐汇区",
              ];
              if (exclude.includes(name)) {
                return "";
              }
              if (name == "闵行区") {
                return "上海市";
              }
              return name;
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
        series: [
          {
            type: "lines",
            coordinateSystem: "geo",
            // symbol: "image://" + this.bridgeImg,
            symbolSize: 50,
            backgroundColor: "",
            label: {
              normal: {
                show: true,
                position: "bottom",
                formatter(params) {
                  return `123`;
                },
              },
            },
            data: data,
          },
          {
            name: "data",
            type: "map",
            geoIndex: 0,
            data: mapdata,
          },
        ],
      };
      this.option = option;
    },
    right_ech() {
      const legend = ["公交延伸日班次", "班车公交化日班次"];
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
      const xdata = this.table.map((v) => v.毗邻区域);
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