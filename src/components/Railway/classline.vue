<template>
  <div id="classline">
    <!-- 左侧echarts地图 -->
    <div class="leftecharts">
      <!-- echarts地图 -->
      <div class="echartsmap">
        <div id="echarts"></div>
      </div>
      <!-- 下载按钮 -->
      <div class="echartsbutton">
        <el-button @click="echartsdown()">下载</el-button>
      </div>
    </div>
    <!-- 右侧表格 -->
    <div class="righttable">
      <!-- 表格 -->
      <table border="1" id="table">
        <tr>
          <th colspan="2">长三角铁路运输联系度前十强</th>
        </tr>
        <tr>
          <td>城市</td>
          <td>班次/日</td>
        </tr>
        <!-- <tr v-for="(item, index) in tabledate" :key="index">
          <td>{{ item.city }}</td>
          <td>{{ item.count }}</td>
        </tr> -->
        <tr v-for="(item, id) in top10" :key="id">
          <td>{{ item.fromname }}-----{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
      <!-- 表格按钮 -->
      <div class="tablebutton">
        <el-button @click="tabledown()">下载</el-button>
        <!-- 选择器 -->
        <div>
          <span>空间维度选择：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
import msgData from "./filedata/shift";
export default {
  data() {
    return {
      value: "江苏省",
      top10: [],
      options: [
        {
          value: "长三角",
        },
        {
          value: "江苏省",
        },
        {
          value: "安徽省",
        },
        {
          value: "浙江省",
        },
        {
          value: "上海市",
        },
      ],
      tabledate: [
        { city: "上海市", count: 251 },
        { city: "苏州市", count: 214 },
        { city: "无锡市", count: 202 },
        { city: "常州市", count: 186 },
        { city: "徐州市", count: 140 },
        { city: "杭州市", count: 132 },
        { city: "镇江市", count: 130 },
        { city: "蚌埠市", count: 106 },
        { city: "合肥市", count: 89 },
        { city: "湖州市", count: 77 },
      ],
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.echarts();
    this.$store.commit("setLeftActive", "5");
    setTimeout(() => {
      this.$em.$emit("changeTop", "3");
    }, 0);
  },
  methods: {
    //   echarts下载
    echartsdown() {
      const domObj = document.getElementById("echarts");
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
    //   表格下载
    tabledown() {
      let et = XLSX.utils.table_to_book(document.getElementById("table")); //此处传入table的DOM节点
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
    //   echarts
    echarts() {
      var myChart = this.$echarts.init(document.getElementById("echarts"));
      let a = this.$setEch.getData({
        startCity: "起点",
        endCity: "终点",
        startLng: "X",
        startLat: "Y",
        endLng: "X2",
        endLat: "Y2",
        valueName: "班次",
        data: msgData,
        islnglat: true,
        width: 50,
      });
      this.top10 = a.top10;
      let fn = this.$setEch.setEch({
        allData: a,
        title: "长三角铁路出行联系强度",
        max: 350,
        myChart,
      });
      fn.setZoom(6);
    },
  },
};
</script>

<style scoped>
#classline {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* 左侧模块 */
.leftecharts {
  width: 60%;
  height: 94%;
}
/* echarts地图 */
.echartsmap {
  width: 100%;
  height: 90%;
  border: 1px solid #0bc4cc;
}
#echarts {
  width: 100%;
  height: 100%;
}
/* 下载按钮 */
.echartsbutton {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
}
.el-button {
  width: 120px;
  height: 40px;
  border: 1px solid #409eff;
  background: #202e63;
  color: white;
  margin-left: 40px;
}
/* 右侧表格 */
.righttable {
  width: 38%;
  height: 94%;
  position: relative;
}
/* 表格 */
.righttable table {
  width: 100%;
  border: 1px solid #0bc4cc;
}
.righttable table tr th {
  border: 1px solid rgb(0, 255, 255, 0.7);
  color: rgb(0, 255, 255);
  font-size: 24px;
  height: 45px;
}
.righttable table tr td {
  border: 1px solid rgb(0, 255, 255, 0.7);
  color: white;
  height: 30px;
  text-align: center;
  font-size: 16px;
}
/* 表格按钮 */
.tablebutton {
  width: 100%;
  height: 10%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tablebutton span {
  margin-left: 30px;
  font-size: 20px;
  color: white;
}
</style>