<template>
  <div id="app">
    <el-container>
      <el-header>任务清单列表</el-header>
      <el-main>
        <span>添加任务</span>
        <div>
          <el-input
            v-model="input"
            @focus="focus"
            @blur="blur"
            placeholder="请输入内容"
          ></el-input>
        </div>

        <div>
          <span class="ad"><a>0</a>个未完成</span>
          <el-row>
            <el-button @click="getAll" type="primary">所有任务</el-button>
            <el-button @click="getAlready" type="success">已完成任务</el-button>
            <el-button @click="getNo" type="danger">未完成任务</el-button>
          </el-row>
        </div>
        <div class="renwu">
          <h1>任务列表:</h1>
          <table>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td
                  :class="{ already: item.ischecked }"
                  @click="checkFn(item);"
                >
                  <input
                    type="checkbox"
                    v-model="item.ischecked"
                    name=""
                    id=""
                  />
                  <div class="wrap">
                    {{ item.name }}
                    <div v-show="item.ischecked" class="line"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-main>
    </el-container>
    <div></div>
  </div>
</template>

 <script>
export default {
  data() {
    return {
      input: "", //tian添加任务输入框的值
      list: [
        {
          id: 1,
          name: "今天要去火",
          ischecked: false,
        },
        {
          id: 2,
          name: "今天要去火",
          ischecked: false,
        },
        {
          id: 3,
          name: "今天要去火",
          ischecked: false,
        },
        {
          name: "今天要去火",
          ischecked: false,
        },
      ],
      alllist: [], //存放所有的数据
      isfocus: false, //是否处于焦点状态
    };
  },
  created() {
    //初始化
    //存储list的数据
    this.alllist = [...this.list];
    document.addEventListener("keydown", (e) => {
      if (e.key == "Enter" && this.isfocus) {
        this.add();
      }
    });
  },
  watch: {},
  computed: {
    //计算属性
  },
  methods: {
    focus() {
      this.isfocus = true;
    },
    blur() {
      this.isfocus = false;
    },
    // 添加数据
    add() {
      let obj = {
        name: this.input,
        ischecked: false,
      };
      this.list.push(obj);
      this.alllist.push(obj);
      this.input = "";
    },
    //点击td也能控制check状态
    checkFn(item) {
      item.ischecked = !item.ischecked;
    },
    //获取所有
    getAll() {
      this.list = this.alllist;
    },
    // 已完成
    getAlready() {
      this.list = this.alllist.filter((v) => v.ischecked == true);
    },
    //未完成
    getNo() {
      this.list = this.alllist.filter((v) => v.ischecked != true);
    },
  },
};
</script>
<style scoped>
table {
  width: 100%;

  border: 1px grey solid;
}
.has-gutter {
  display: none;
}
.renwu {
  margin-top: 50px;
}
.ad {
  margin-top: 20px;
  float: left;
  color: red;
}
#app {
  margin: auto;
  width: 1000px;
  height: 800px;
  background: white;
}
.el-header,
.el-footer {
  background-color: rgb(52, 122, 182);
  color: white;

  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;

  height: 400px;
}
span {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.el-row {
  float: right;
  margin-top: 20px;
  padding: 10px 0;
}
.el-input {
  margin-top: 10px;
}

td {
  display: flex;
  height: 30px;
  align-items: center;
  border-bottom: 1px solid black;
  cursor: pointer;
}

.wrap {
  position: relative;
}
.line {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 1px;
  background: black;
}
.already {
  background: rgba(142, 131, 131, 0.2);
}
</style>