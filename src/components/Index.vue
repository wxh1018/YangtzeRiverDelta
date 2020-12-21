<template>
  <div class="wrap">
    <h1>
      <strong>{{title}}</strong>
    </h1>
    <div class="center">
      <ul>
        <li v-for="(item,id) in ul1" :key="id" @click="to(item.router,item.gis,item.key)">
          <i :class="item.img"></i>
          <p class="name">{{item.name}}</p>
        </li>
      </ul>
      <ul>
        <li v-for="(item,id) in ul2" :key="id" @click="to(item.router,item.gis,item.key)">
          <i :class="item.img"></i>
          <p class="name">{{item.name}}</p>
        </li>
      </ul>
    </div>
    <!-- <div class="last" @click="to(other.router,other.key)">
      <p class="name">{{other.name}}</p>
    </div>-->
    <Foot />
  </div>
</template>
<script>
import Foot from "../components/base/Footer";
export default {
  data() {
    return {
      ul1: [
        {
          name: "综合交通分析模块",
          router: "/ArcGis",
          gis: "New_Administrative_Node",
          icon: "",
          key: 1,
          img: "iconfont icon-jiaotong"
        },
        {
          name: "公路分析模块",
          router: "/ArcGis",
          gis: "New_Highway_Overview",
          icon: "",
          key: 2,
          img: "iconfont icon-gonglu"
        },
        {
          name: "铁路分析模块",
          router: "/ArcGis",
          gis: "New_Railway_Overview",
          icon: "",
          key: 3,
          img: "iconfont icon-tielu"
        }
      ],
      ul2: [
        {
          name: "水运分析模块",
          router: "/ArcGis",
          gis: "New_WaterTransport_Overview",
          icon: "",
          key: 4,
          img: "iconfont icon-shuiyun"
        },
        {
          name: "航空分析模块",
          router: "/ArcGis",
          gis: "New_Aviation_Overview",
          icon: "",
          key: 5,
          img: "iconfont icon-hangkongqi"
        },
        {
          name: "数据管理模块",
          router: "management",
          icon: "",
          key: 7,
          img: "iconfont icon-shujuguanli"
        }
      ],
      other: {
        img: "iconfont icon-qita",
        name: "城市客运分析模块",
        router: "other_home",
        key: 7
      }
    };
  },
  components: {
    Foot
  },
  computed: {
    title() {
      return this.$store.state.title;
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    to(router, gis, key) {
      // if (router == "") {
      //   this.base.warn(this, "该模块暂未开放");
      //   return;
      // }
      // this.$router.push({ name: name, params: { key } });
      this.$router.push({ path: router, query: { name: gis, key } });
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: url("../assets/img/a.png") no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
h1 {
  color: white;
  text-align: center;
  font-weight: 900;
  font-weight: bold;
  position: relative;
  font-size: 46px;
  top: 8%;
}
.center {
  width: 56%;
  height: 50%;
  margin: 0 auto;
  margin-top: 10%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  /* box-shadow: 0 0 0 50vmax rgba(0,0,0,0.7); */
}
.center ul {
  width: 100%;
  height: 49%;
  display: flex;
  justify-content: space-between;
}
.center ul li {
  width: 32.6%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  background: rgba(6, 20, 54, 0.4);
}
.center ul li:hover .iconfont {
  color: skyblue;
}
.center ul li:hover p {
  color: skyblue;
}
.last:hover p,
.last:hover i {
  color: skyblue;
}
.iconfont {
  position: relative;
  top: 10px;
  font-size: 80px;
  color: white;
}
.name {
  color: white;
  font-size: 28px;
}
.last {
  width: 56%;
  margin: 0 auto;
  margin-top: 10px;
  height: 150px;
  background: rgba(6, 20, 54, 0.4);
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
}
.last .iconfont {
  font-size: 50px;
  position: relative;
  top: 0;
}
</style>