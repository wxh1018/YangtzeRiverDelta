<template>
  <div class="wrap">
    <div class="header">
      <div class="bg">
        <img :src="require('../assets/img/new/header_top.png')" alt="" />
      </div>
      <div class="center">
        <img :src="require('../assets/img/new/logo.png')" alt="" />
        <img :src="require('../assets/img/new/title.png')" alt="" />
      </div>
      <ul class="list">
        <li
          v-for="(item, id) in listTitle"
          :key="id"
          :class="{ activeBg: item.id == activeIndex }"
          @click="to(item.router, item.gis, item.id, item.name)"
        >
          <span :class="{ activeCo: item.id == activeIndex }">{{
            item.name
          }}</span>
        </li>
      </ul>
      <ul class="list2">
        <li
          v-for="(item, id) in listTitle2"
          :key="id"
          :class="{ activeBg: item.id == activeIndex }"
          @click="to(item.router, item.gis, item.id, item.name)"
        >
          <span :class="{ activeCo: item.id == activeIndex }">{{
            item.name
          }}</span>
          <img
            @click="dropOut"
            v-if="id == listTitle2.length - 1"
            :src="require('../assets/img/new/close.png')"
            alt=""
          />
        </li>
      </ul>
    </div>
    <div class="left clip">
      <div class="left_top"></div>
      <div class="right_bottom"></div>
      <!-- <div class="left_wrap"></div> -->
      <div class="lefttitle">{{ activeName }}>></div>
      <el-col :span="24">
        <el-menu
          :default-active="leftActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#042085"
          text-color="#fff"
          active-text-color="rgb(0, 255, 255)"
          unique-opened
        >
          <div v-for="(item, id) in filterList" :key="id">
            <!-- 多级菜单展开-->
            <el-submenu
              :index="id + 1 + ''"
              v-if="item.list"
              @click.native="jump(item.router, item.gis)"
            >
              <template slot="title">
                <i :class="'iconfont ' + item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++ -->
              <!-- 多二级菜单展开 -->

              <el-submenu
                :index="id + 1 + '' + '-' + j + 1 + ''"
                v-if="item.list[j].list2"
                v-for="(item2, j) in item.list"
                :key="j"
                @click.native="jump1(item2.list2[0].router, item2.list2[0].gis)"
              >
                <template slot="title">
                  <i :class="'iconfont ' + item2.icon"></i>
                  <span>{{ item2.name }}</span>
                </template>
                <el-menu-item
                  v-for="(obj2, k) in item2.list2"
                  :key="k"
                  :index="id + 1 + '' + '-' + (j + 1 + '') + '-' + (k + 1 + '')"
                  @click.native="to(obj2.router, obj2.gis)"
                  :disabled="obj2.router == ''"
                >
                  <i :class="'iconfont ' + item2.icon"></i>
                  <span slot="title" class="Secondary">{{ obj2.name }}</span>
                </el-menu-item>
              </el-submenu>
              <!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
              <!-- 单二级菜单可点击 -->
              <el-menu-item
                v-if="!obj.list2"
                v-for="(obj, i) in item.list"
                :key="i"
                :index="id + 1 + '' + '-' + (i + 1 + '')"
                @click="to(obj.router, obj.gis)"
                :disabled="obj.router == ''"
              >
                <i :class="'iconfont ' + obj.icon"></i>
                <span slot="title" class="Secondary">{{ obj.name }}</span>
              </el-menu-item>
            </el-submenu>

            <!-- 一级 -->
            <el-menu-item
              :index="id + 1 + ''"
              v-if="!item.list"
              @click="to(item.router, item.gis)"
              :disabled="item.router == ''"
            >
              <i :class="'iconfont ' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </div>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import LJ from "../utils/login";
export default {
  data() {
    return {
      activeIndex: "1",
      activeName: "综合交通分析模块",
      listTitle: [
        {
          id: 1,
          name: "综合交通分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_Administrative_Node",
        },
        {
          id: 2,
          name: "公路分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_Highway_Overview",
        },
        {
          id: 3,
          name: "铁路分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_Railway_Overview",
        },
        {
          id: 4,
          name: "水运分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_WaterTransport_Overview",
        },
      ],
      listTitle2: [
        {
          id: 5,
          name: "航空分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_Aviation_Overview",
        },
        {
          id: 6,
          name: "经济社会联系强度",
          router: "/contactStrength",
          icon: "",
        },
        {
          id: 7,
          name: "数据管理模块",
          router: "/management",
          icon: "",
        },
        {
          id: 8,
          name: "欢迎admin |",
          router: "/login",
        },
      ],
      filterList: [], //左侧展示的列表
    };
  },
  components: {},
  computed: {
    leftActive() {
      return this.$store.state.LeftList.leftActive;
    },
  },
  watch: {
    activeIndex:function(v){
      if(v){
        this.changeLeft();
      }
    },
  },
  created() {
    console.log(this.$store);
    if (this.$route.params.key) {
      this.activeIndex = this.$route.params.key + "";
    }
    this.changeLeft();
  },
  mounted() {
    this.$em.$on("changeTop", (v) => {
      console.log(v);
      this.activeIndex = v;
      this.changeLeft();
    });
  },
  methods: {
    //   左侧菜单切换
    changeLeft() {
      this.filterList = this.$store.state.LeftList.list1.filter(
        (v) => v.key == this.activeIndex
      )[0].list;
    },
    //左侧点击
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击左侧多级菜单
    jump(router, gis) {
      if (router) {
        this.$router.push({ path: router, query: { name: gis } });
      }
    },
    //退出登录
    dropOut() {
      LJ.ClearToken();
      this.$router.push("/login");
    },
    //路由跳转
    to(v, gis, id, name) {
      if (id != 8) {
        this.activeIndex = id;
      }
      if (name) {
        this.activeName = name;
      }
      if (v == "") {
        this.base.warn(this, "该模块暂未开放");
        return;
      }
      this.$store.commit("setLeftActive", "1");
      setTimeout(() => {
        this.$router.push({ path: v, query: { name: gis } });
      }, 20);
    },
    //二级多选菜单
    jump1(v, gis) {
      setTimeout(() => {
        this.$router.push({ path: v, query: { name: gis } });
      }, 0);
    },
    stopdothis() {
      console.log("阻止");
    },
  },
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tac {
  height: 90%;
}
.el-menu-vertical-demo {
  height: 100%;
  background: #367f94;
}
.left {
  position: absolute;
  left: 15px;
  width: 210px;
  top: 110px;
  height: calc(100% - 130px);
  background: rgb(0, 19, 93, 0.7);
  box-sizing: border-box;
  border: 2px solid #263299;
  padding: 0 6px;
  z-index: 2;
}
.lefttitle {
  color: #3eccd8;
  font-size: 14px;
  height: 42px;
  display: flex;
  align-items: center;
  padding-left: 25px;
}
.title {
  text-align: center;
  font-size: 32px;
  color: white;
  background: rgba(24, 32, 67);
  height: 60px;
  line-height: 60px;
  font-weight: 900;
}
.el-menu-demo {
  border-top: 1px solid white;
  display: flex;
  justify-content: space-around;
}
.icon-tuichudenglu {
  position: absolute;
  z-index: 99;
  top: 80px;
  right: 20px;
  color: white;
  font-size: 36px;
  cursor: pointer;
}
main {
  position: absolute;
  /* background: #243a55; */
  /* background: black; */
  top: 110px;
  left: 235px;
  width: calc(100% - 235px);
  height: calc(100% - 130px);
  padding-right: 25px;
  box-sizing: border-box;
}
.Secondary {
  font-size: 12px;
}
.header {
  width: 100%;
  height: 76px;
  position: absolute;
  overflow: hidden;
}
.header .bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.header .bg img {
  width: 100%;
  height: 100%;
}
.header .center {
  width: 30%;
  height: 100%;
  /* border: 1px solid red; */
  margin: 0 auto;
  position: relative;
  left: 10px;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
  box-sizing: border-box;
}
.header .center img {
  height: 24px;
  margin: 0 10px;
  /* width: 10vw; */
}

/* 头部 */

.list {
  height: 40px;
  width: 36%;
  position: absolute;
  top: 25px;
  left: -30px;
  display: flex;
}
.list2 {
  height: 40px;
  width: 35%;
  position: absolute;
  top: 25px;
  right: -30px;
  display: flex;
}
.list li:nth-child(1) {
  flex: 2;
}
.list2 li:nth-last-child(1) {
  flex: 1.5;
}
.list li,
.list2 li {
  flex: 1;
  border: 2px solid #2f43b5;
  background: rgb(4 9 54 / 60%);
  margin: 0 5px;
  transform: skewX(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s linear;
}
.list2 li {
  transform: skewX(-45deg);
}
.list li span {
  color: #0dd8e3;
  font-size: 14px;
  transform: skewX(-45deg);
  font-weight: 600;
  white-space: nowrap;
}
.list2 li span {
  color: #0dd8e3;
  font-size: 14px;
  transform: skewX(45deg);
  font-weight: 600;
  white-space: nowrap;
}
.list2 li:nth-last-child(1) {
  box-sizing: border-box;
  padding-right: 20px;
  justify-content: center;
}
.list2 li:nth-last-child(1) img {
  transform: skewX(45deg);
}
.activeBg {
  background: #31bad0 !important;
  border: #318ed066 !important;
}
.activeCo {
  color: white !important;
}
</style>
