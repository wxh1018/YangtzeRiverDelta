<template>
  <div class="wrap">
    <!-- 左侧 -->
    <left>
      <div class="zhen">
        <i class="iconfont icon-zhibeizhen3"></i>
        <!-- 左侧echarts -->
        <div id="map"></div>
      </div>
      <div class="search">
        <!-- <el-select v-model="area_val" filterable clearable placeholder="入口区县">
          <el-option
            v-for="item in area_option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="area_val2" filterable clearable placeholder="出口区县">
          <el-option
            v-for="item in area_option2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>-->
        <el-radio v-model="radio" label="out">外部联系</el-radio>
        <el-radio v-model="radio" label="in">内部联系</el-radio>
      </div>
      <div class="basebtn" @click="down">下载</div>
    </left>
    <!-- 右侧 -->
    <Right>
      <table class="basetable">
        <thead>
          <th colspan="2">江苏省收费站联系度前十强</th>
        </thead>
        <tbody>
          <tr>
            <td>城市</td>
            <td>数量(VEH/D)</td>
          </tr>
          <tr v-for="(item, id) in total10" :key="id">
            <td>{{ item.入口县区 }}----->{{ item.出口县区 }}</td>
            <td>{{ item.车流量 }}</td>
          </tr>
        </tbody>
      </table>
      <div class="block">
        <span class="demonstration">空间维度选择:</span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </div>
      <div class="basebtn" @click="downTable">下载</div>
    </Right>
    <table style="display:none" id="table1">
      <tr>
        <td>收费站区排名</td>
        <td>数量(个)</td>
      </tr>
      <tbody>
        <tr v-for="(item, id) in totalName" :key="id">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
var map = null;
var overlayGroups = null;
import Left from "../base/Left";
import Right from "../base/Right";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import JS_data from "./Toll2";
var myChart = null;
var fil_data = JS_data;
export default {
  data() {
    return {
      cityAll: "", //内外城市
      moveLines: "",
      radio: "out",
      area_val: "",
      area_val2: "",
      area_option: [{ value: "选项1" }],
      area_option2: [{ value: "选项1" }],
      value: ["江苏省"],
      options: [],
      data: [
        {
          name: "",
          num: ""
        }
      ],
      totalNum: "",
      Coverage: "100%",
      center: [121.549792, 29.868388],
      filterName: [],
      totalName: [], //各个区的总收费站数
      total10: [] //江苏省收费站联系度前十强
    };
  },
  components: {
    Left,
    Right
  },
  computed: {},
  watch: {
    area_val(v) {
      this.search_by_in();
    },
    area_val2(v) {
      this.search_by_in2();
    },
    radio(v) {
      v == "out" ? this.animate() : this.in();
    }
  },
  created() {
    this.options = this.$store.state.options;
    this.$store.commit("setLeftActive", "2-1");
    setTimeout(() => {
      this.$em.$emit("changeTop", "2");
    }, 0);
  },
  mounted() {
    this.animate();
    this.Top10();
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    search_by_in() {
      if (this.area_val == "") {
        this.animate();
        return;
      }
      var data = fil_data.filter(v => v.入口县区 == this.area_val);
      var city1 = data.map((v, id) => {
        return {
          name: v.入口县区,
          toname: v.出口县区,
          value: [v.X2, v.Y2, v.车流量]
        };
      });
      var city2 = data.map((v, id) => {
        return {
          name: v.出口县区,
          value: [v.X2, v.Y2X2, v.车流量]
        };
      });
      // var citys = city1.concat(city2);
      var citys = city1;
      var moveLines = data.map((v, id) => {
        let obj = {
          coord: [v.X1, v.Y1],
          value: v.车流量,
          fromname: v.入口县区,
          toname: v.出口县区
        };
        let obj2 = { coord: [v.X2, v.Y2] };
        var arr = [obj, obj2];
        return arr;
      });
      var allData = {
        citys,
        moveLines
      };
      console.log(allData);
      this.setEch(allData);
    },
    search_by_in2() {
      if (this.area_val2 == "") {
        this.animate();
        return;
      }

      var data = fil_data.filter(v => v.出口县区 == this.area_val2);
      var city1 = data.map((v, id) => {
        return {
          name: v.入口县区,
          toname: v.出口县区,
          value: [v.X1, v.Y1, v.车流量]
        };
      });
      var city2 = data.map((v, id) => {
        return {
          name: v.出口县区,
          value: [v.X2, v.Y2X2, v.车流量]
        };
      });
      // var citys = city1.concat(city2);
      var citys = city1;
      var moveLines = data.map((v, id) => {
        let obj = {
          coord: [v.X1, v.Y1],
          value: v.车流量,
          fromname: v.入口县区,
          toname: v.出口县区
        };
        let obj2 = { coord: [v.X2, v.Y2] };
        var arr = [obj, obj2];
        return arr;
      });
      var allData = {
        citys,
        moveLines
      };
      console.log(allData);
      this.setEch(allData);
    },
    Top10() {
      let a = [].concat(fil_data);
      this.total10 = a
        .sort((a, b) => {
          return b.车流量 - a.车流量;
        })
        .splice(0, 10);
    },
    animate() {
      myChart = this.$echarts.init(document.getElementById("map"));
      var data = fil_data.slice(0, 500);
      // var data = JS_data
      //入口
      var cityAll = function(data) {
        let arrout = [];
        let arrin = [];
        data.forEach(v => {
          let obj = {
            name: v.入口县区,
            toname: v.出口县区,
            value: [v.X1, v.Y1, v.车流量]
          };
          if (v.入口县区 != v.出口县区) {
            arrout.push(obj);
          } else {
            arrin.push(obj);
          }
        });
        return {
          getCityOut: arrout,
          getCityIn: arrin
        };
      };
      let city1 = cityAll(data).getCityOut;
      this.cityAll = cityAll(data);

      var arr1 = city1.map(v => v.name);
      arr1 = [...new Set(arr1)];
      this.area_option = arr1.map(v => {
        return { value: v };
      });
      // 出口
      var city2 = data.map((v, id) => {
        return {
          name: v.出口县区,
          value: [v.X2, v.Y2X2, v.车流量]
        };
      });
      var arr2 = city2.map(v => v.name);
      arr2 = [...new Set(arr2)];
      this.area_option2 = arr2.map(v => {
        return { value: v };
      });
      // var citys = city1.concat(city2);
      var citys = city1;

      function Lines(data) {
        let arrout = []; //外部
        let arrin = []; //内部
        data.forEach(v => {
          if (v.入口县区 != v.出口县区) {
            let obj = {
              coord: [v.X1, v.Y1],
              value: v.车流量,
              fromname: v.入口县区,
              toname: v.出口县区,
              lineStyle: {
                // color:'white',
                width: v.车流量 / 100 + 1,
                opacity: 0.9,
                curveness: 0.1
              }
            };
            let obj2 = { coord: [v.X2, v.Y2] };
            let arr1 = [obj, obj2];
            arrout.push(arr1);
          } else {
            let obj = {
              coord: [v.X1, v.Y1],
              value: v.车流量,
              fromname: v.入口县区,
              toname: v.出口县区,
              lineStyle: {
                // color:'white',
                width: v.车流量 / 100 + 1,
                opacity: 0.9,
                curveness: 0.1
              }
            };
            let obj2 = { coord: [v.X2, v.Y2] };
            let arr1 = [obj, obj2];
            arrin.push(arr1);
          }
        });
        return {
          getOut: arrout,
          getIn: arrin
        };
      }
      this.moveLines = Lines(data);
      var moveLines = Lines(data).getOut;
      var allData = {
        citys,
        moveLines
      };
      console.log(allData);
      this.setEch(allData);
    },
    in() {
      let allData = {
        citys: this.cityAll.getCityIn,
        moveLines: this.moveLines.getIn
      };
      this.setEch(allData);
    },
    setEch(allData) {
      var option = {
        backgroundColor: "#013954",
        title: {
          text: "江苏省各区(县)收费站OD",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            console.log(params);
            var value = "";
            let fromname = "";
            let toname = "";
            if (params.componentSubType == "scatter") {
              value = params.value[2];
              fromname = params.data.name;
              toname = params.data.toname;
              return fromname + value;
            } else {
              value = params.data.value;
              fromname = params.data.fromname;
              toname = params.data.toname;
            }
            return fromname + "---->" + toname + "<br/>" + "车流量:" + value;
          }
        },
        visualMap: [
          {
            min: 0,
            max: 1000,
            left: "right",
            top: "bottom",
            splitNumber: 5,
            text: ["车流量"], // 文本，默认为数值文本
            calculable: true,
            color: this.$setEch.getColor(),
            textStyle: {
              color: "#ffffff"
            }
          }
        ],
        legend: {
          show: true,
          orient: "vertical",
          top: "bottom",
          itemWidth: 70,
          itemHeight: 30,
          left: "left",
          data: ["地点", "线路"],
          textStyle: {
            color: "#fff"
          }
        },
        geo: this.$setEch.getGeo(8, [118.55027, 32.67386]),
        series: [
          {
            name: "地点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 100,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              normal: {
                show: true,
                formatter: p => p.data.name,
                color: "#fff"
              },
              emphasis: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            // symbolSize: function(val) {
            //   return 3 + val[2] / 100;
            // },
            symbolSize: 10,
            showEffectOn: "render",
            itemStyle: {
              normal: {
                // color: "#46bee9"
              }
            },
            data: allData.citys
          },
          {
            name: "线路",
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 1,
            large: true,
            effect: {
              show: true,
              constantSpeed: 30,
              symbol: "pin",
              symbolSize: 5,
              trailLength: 0
            },
            data: allData.moveLines
          }
        ]
      };
      window.onresize = function() {
        myChart.resize();
      };
      myChart.setOption(option);
    },

    createMap() {
      map = new AMap.Map("map", {
        zoom: 9, //级别
        zooms: [3, 13],
        zoomEnable: true,
        doubleClickZoom: true,
        center: this.center, //中心点坐标
        mapStyle: "amap://styles/d13369b65d8f8a5b0efbc515527e1cd9"
      });
    },
    down() {
      const domObj = document.getElementById("map");
      html2canvas(domObj, {
        onrendered: function(canvas) {
          let a = document.createElement("a");
          var body = document.querySelector("body");
          a.href = canvas.toDataURL();
          a.download = "pic.png";
          a.style.display = "none";
          body.append(a);
          a.click();
        }
      });
    },
    downTable() {
      let et = XLSX.utils.table_to_book(document.getElementById("table1")); //此处传入table的DOM节点
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
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
            type: "application/octet-stream"
          }),
          "total.xlsx"
        ); //trade-publish.xlsx 为导出的文件名
        // }
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    }
  }
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

.showname {
  position: absolute;
  bottom: 0;
  width: 80%;
  height: 80px;
  left: 200px;
  display: flex;
  justify-content: space-between;
}
.showname li {
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid rgba(50, 92, 92);
  margin: 10px;
  cursor: pointer;
}
.showname li img {
  width: 70%;
}
.showname li span {
  color: white;
  display: block;
  width: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

#map {
  width: 100%;
  height: 90%;
  border: 1px solid rgb(0, 255, 255, 0.7);
}
.basetable {
  width: 100%;
  border: 1px solid white;
}
.basetable thead th {
  border: 1px solid rgb(0, 255, 255, 0.7);
  color: rgb(0, 255, 255);
  font-size: 24px;
  height: 45px;
}
.basetable tbody td {
  border: 1px solid rgb(0, 255, 255, 0.7);
  color: white;
  height: 30px;
  text-align: center;
  font-size: 16px;
}
.basebtn {
  position: absolute;
  bottom: 20px;
  left: 10px;
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
.el-radio {
  color: white;
}
</style>
