<template>
  <div class="js_table">
    <i
      class="el-icon-download"
      @click="
        base.download('table1', '江苏省机场出港旅客量分布表(单位:万人次)')
      "
    ></i>
    <table class="basetable" id="table1">
      <thead>
        <th colspan="8">{{ title }}</th>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="(item, id) in thead"
            :key="id + item"
            v-if="hidden(item.name)"
          >
            {{ item.name | change }}
          </td>
        </tr>
        <tr v-for="(item, id) in showData" :key="id">
          <td v-for="(item2, id) in thead" :key="id + item2" v-if="hidden(item2.name)">
            {{ item[item2.value] }}
          </td>
        </tr>
      </tbody>
    </table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "js-table",
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: {
      type: String,
      default: "",
    },
    thead: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pageSizeOut: {
      type: Number,
      default: 8,
    },
  },
  data() {
    return {
      pageSize: 8,
      currentPage: 1,
    };
  },
  filters: {
    change(c) {
      if (c.toLowerCase() == "o") {
        return "起点";
      }
      if (c.toLowerCase() == "d") {
        return "终点";
      }
      return c;
    },
  },
  components: {},
  computed: {
    valuename() {
      return this.thead.map((v) => v.value);
    },
    showData() {
      return this.ChangePage(this.pageSize, this.currentPage, this.tableData);
    },
  },
  watch: {},
  created() {
    this.pageSize = this.pageSizeOut;
  },
  mounted() {},
  methods: {
    sizeChange() {},
    currentChange() {
      console.log(this.currentPage);
    },
    ChangePage(page_size, current_page, data) {
      page_size = page_size || 10;
      let start = page_size * (current_page - 1);
      let end = page_size * (current_page - 1) + page_size;
      return data.slice(start, end);
    },
    hidden(val) {
      if (val == "经度" || val == "纬度") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
<style scoped lang='less'>
.js_table {
  position: relative;
  height: 50%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-end;
}
i {
  color: #ffffff;
  font-size: 22px;
  position: absolute;
  right: 20px;
  top: 15px;
  cursor: pointer;
  &:hover {
    color: aqua;
  }
}
</style>