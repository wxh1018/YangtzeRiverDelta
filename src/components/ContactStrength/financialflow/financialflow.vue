<template>
  <div class="wrap">
    <left>
      <div class="zhen">
        <i class="iconfont icon-zhibeizhen3"></i>
        <div id="ech"></div>
      </div>
      <!-- <div class="search">
        <el-select v-model="optionValue" filterable placeholder="请选择">
          <el-option v-for="(item,id) in options2" :key="id" :value="item"></el-option>
        </el-select>
      </div>-->
      <div class="basebtn" @click="down">下载</div>
    </left>
    <Right>
      <table class="basetable">
        <thead>
          <th colspan="2">长三角与各市间金融流联系强度</th>
        </thead>
        <tbody>
          <tr>
            <td>城市间</td>
            <td>联系强度</td>
          </tr>
          <tr v-for="(item, id) in top10" :key="id">
            <td>{{ item.fromname }}-----{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
      <div id="rightEch"></div>
      <!-- <div class="block">
        <span class="demonstration">空间维度选择:</span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </div>-->
      <div class="basebtn" @click="downTable">下载</div>
    </Right>
    <table style="display: none" id="table1">
      <tr>
        <td>发往城市</td>
        <td>货物(t)</td>
      </tr>
      <tbody>
        <tr v-for="(item, id) in top10" :key="id">
          <td>{{ item.fromme }}->{{ item.name }}</td>
          <td>{{ item.value }}</td>
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
import { msgData2 } from "./data";
import store from "@/store";
let citys = store.getters.get_allcity;
let msgData = msgData2.map((v) => {
  let lnglat1 = citys.find((res) => res.市名称 == v.城市1);
  let lnglat2 = citys.find((res) => res.市名称 == v.城市2);
  let X1 = lnglat1["经度"];
  let Y1 = lnglat1["纬度"];
  let X2 = lnglat2["经度"];
  let Y2 = lnglat2["纬度"];
  return { ...v, X1, Y1, X2, Y2, 个数: v.金融流联系度 };
});

var myChart = null;
export default {
  data() {
    return {
      value: ["浙江", "宁波市"],
      options: [],
      title: "长三角各市间金融流联系强度",
      optionValue: "长三角",
      options2: [
        "长三角",
        "南京市",
        "苏州市",
        "无锡市",
        "连云港市",
        "淮安市",
        "扬州市",
        "泰州市",
        "盐城市",
        "徐州市",
        "常州市",
        "南通市",
        "镇江市",
        "宿迁市",
      ],
      data: [
        {
          name: "",
          num: "",
        },
      ],
      top10: [],
      center: [],
    };
  },
  components: {
    Left,
    Right,
  },
  computed: {
    allcitys() {
      return this.$store.getters.get_allcity;
    },
  },
  watch: {
    optionValue(v) {
      let arr = msgData.filter((res) => res.城市1 == v || res.城市2 == v);
      v == "长三角" ? this.ech1(msgData) : this.ech1(arr);
    },
  },
  created() {
    this.options = this.$store.state.options;
    this.$store.commit("setLeftActive", "3");
    setTimeout(() => {
      this.$em.$emit("changeTop", "6");
    }, 0);
    this.options2 = this.allcitys.map((v) => v.市名称);
    this.options2.unshift("长三角");
  },
  mounted() {
    this.ech1(msgData);
    this.rightEch();
  },
  methods: {
    ech1(data) {
      myChart = this.$echarts.init(document.getElementById("ech"));
      let a = this.$setEch.getData({
        startCity: "城市1",
        endCity: "城市2",
        valueName: "个数",
        data: msgData,
        islnglat: true,
      });
      this.top10 = a.top10;
      this.options2 = a.cityOptions;
      let target = this.$setEch.setEch({
        allData: a,
        title: "长三角各市间金融流联系强度",
        myChart,
      });
      target.setZoom(6);
    },
    rightEch() {
      var myChart = this.$echarts.init(document.getElementById("rightEch"));
      let Xdata = [];
      let Data = [];
      this.top10.forEach((v) => {
        Xdata.push(v.name);
        Data.push(v.value);
      });
      var option = {
        title: {
          text: "长三角与各市间金融流联系强度前10",
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
          name: "联系强度",
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
    down() {
      const domObj = document.getElementById("ech");
      html2canvas(domObj, {
        onrendered: function (canvas) {
          let a = document.createElement("a");
          var body = document.querySelector("body");
          a.href = canvas.toDataURL();
          a.download = "pic.png";
          a.style.display = "none";
          body.append(a);
          a.click();
        },
      });
    },
    downTable() {
      let et = XLSX.utils.table_to_book(document.getElementById("table1")); //此处传入table的DOM节点
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
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
            type: "application/octet-stream",
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
  height: 37%;
  border: 1px solid rgb(0, 255, 255, 0.7);
  position: absolute !important;
  bottom: 10%;
}
.search {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
</style>