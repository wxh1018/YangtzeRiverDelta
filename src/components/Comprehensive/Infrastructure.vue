<template>
  <div class="wrap">
    <Left>
      <iframe id="ifram1" :src="this.ifurl + 'Index1'" frameborder="0"></iframe>
    </Left>

    <div class="basebtn" @click="down">下载</div>
    <!-- <div class="right"> -->
    <Right>
      <table class="basetable">
        <thead>
          <th>指标名称</th>
          <th>数值</th>
        </thead>
        <tbody>
          <tr v-for="(item, id) in top10" :key="id">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
      <div class="basebtn" @click="downTable">下载</div>
      <Sel />
    </Right>
    <!-- </div> -->
    <table class="dn" id="table1">
      <tr>
        <td>指标名称</td>
        <td>数值</td>
      </tr>
      <tbody>
        <tr v-for="(item, id) in top10" :key="id">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Left from "../base/Left";
import Right from "../base/Right";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import Sel from "../base/Select";
export default {
  data() {
    return {
      top10: [
        { name: "公路总里程", value: "1425(km)" },
        { name: "铁路总里程", value: "350(km)" },
        { name: "航道总里程", value: "972(km)" },
        { name: "公路客运站总数", value: "12(个)" },
        { name: "火车站总数", value: "8(个)" },
      ],
    };
  },
  components: {
    Left,
    Right,
    Sel,
  },
  computed: {},
  watch: {},
  created() {
    this.$store.commit("setLeftActive", "1");
    setTimeout(() => {
      this.$em.$emit("changeTop", "1");
    }, 0);
  },
  mounted() {},
  methods: {
    down() {
      const domObj = document.getElementById("ifram1");
      console.log(domObj);
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
#map {
  width: 100%;
  height: 90%;
  border: 1px solid rgb(0, 255, 255, 0.7);
  overflow: hidden;
}
iframe {
  width: 100%;
  height: 70%;
  /* transform: scale(0.6, 0.7); */
  /* transform-origin: left top;
  border: 1px solid rgb(0, 255, 255, 0.7); */
  /* margin-top: 2.5%;
  margin-left: 1%; */
}
.basebtn {
  position: absolute;
  bottom: 20px;
  left: 10px;
}
.right {
  position: absolute;
  right: 1%;
  top: 2.5%;
  height: 95%;
  width: 38%;
}
</style>