<template>
  <div class="wrap">
    <!-- 退出登录 -->
    <i class="iconfont icon-tuichudenglu" @click="dropOut"></i>

    <!-- 顶部 -->
    <el-row style="height:60px">
      <el-col :span="3" class="logo" @click.native="to('/')">
        <el-tooltip content="回到首页" placement="bottom" effect="light">
          <img src="../assets/img/jslogo1.png" alt />
        </el-tooltip>
      </el-col>
      <el-col :span="21">
        <div class="title cp" @click="to('/')">
          长三角区域交通一体化大数据平台
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#182043"
          text-color="#fff"
          active-text-color="rgb(0, 255, 255)"
        >
          <el-menu-item
            v-for="(item, id) in listTitle"
            :key="id"
            :index="id + 1 + ''"
            @click="to(item.router, item.gis)"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </el-col>
    </el-row>

    <!-- 左侧 -->
    <div class="left">
      <el-col :span="24">
        <el-menu
          :default-active="leftActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#182043"
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
                v-if="item.list[0].list2"
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
import LJ from "../until/login";
export default {
  data() {
    return {
      activeIndex: "1",
      listTitle: [
        {
          name: "综合交通分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_Administrative_Node"
        },
        {
          name: "公路分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_Highway_Overview"
        },
        {
          name: "铁路分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_Railway_Overview"
        },
        {
          name: "水运分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_WaterTransport_Overview"
        },
        {
          name: "航空分析模块",
          router: "/ArcGis",
          icon: "",
          gis: "New_Aviation_Overview"
        },
        {
          name: "经济社会联系强度",
          router: "/contactStrength",
          icon: ""
        },
        {
          name: "数据管理模块",
          router: "/management",
          icon: ""
        }
      ],
      filterList: [] //左侧展示的列表
    };
  },
  components: {},
  computed: {
    leftActive() {
      return this.$store.state.LeftList.leftActive;
    }
  },
  watch: {
    activeIndex(v) {
      this.changeLeft();
    }
  },
  created() {
    console.log(this.$store);
    if (this.$route.params.key) {
      this.activeIndex = this.$route.params.key + "";
    }
    this.changeLeft();
  },
  mounted() {
    console.log(this);
    this.$em.$on("changeTop", v => {
      this.activeIndex = v;
      this.changeLeft();
    });
  },
  methods: {
    //   左侧菜单切换
    changeLeft() {
      this.filterList = this.$store.state.LeftList.list1.filter(
        v => v.key == this.activeIndex
      )[0].list;
    },
    // 顶部点击
    handleSelect(key, keyPath) {
      this.activeIndex = key;
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
    to(v, gis) {
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
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.logo {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(24, 32, 67);
  cursor: pointer;
}
.logo img {
  width: 200px;
  position: absolute;
  top: 20px;
}
.tac {
  height: 90%;
}
.el-menu-vertical-demo {
  height: 100%;
  background: #367f94;
}
.left {
  width: 12.5%;
  height: calc(100% - 60px);
  background: #182043;
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
  background: #243a55;
  /* background: black; */
  top: 120px;
  left: 12.5%;
  width: 87.5%;
  height: calc(100% - 120px);
}
.Secondary {
  font-size: 12px;
}
</style>
