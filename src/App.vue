<template>
  <div id="app">
    <img class="bg" :src="bg" alt="" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      bg: require("@/assets/img/bg.png")
    };
  },
  mounted() {
    this.base.SetTitle(this.$store.state.title);
  },
  methods: {}
};
</script>

<style>
@import url("./assets/css/base.css");
iframe {
  width: 100%;
  height: 100%;
}
#app {
  /* background: url("./assets/img/bg.png") no-repeat;
  background-size: contain; */
  /* background-size: 100%; */
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
html,
body {
  /* background: #1d7682; */
}
.cp {
  cursor: pointer;
}
/* 初始化CSS */
html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
}
fieldset,
img {
  border: none;
}
img {
  display: block;
}
address,
caption,
cite,
code,
dfn,
th,
var {
  font-style: normal;
  font-weight: normal;
}
ul,
ol {
  list-style: none;
}
input {
  padding-top: 0;
  padding-bottom: 0;
  font-family: "SimSun", "宋体";
}
input::-moz-focus-inner {
  border: none;
  padding: 0;
}
select,
input {
  vertical-align: middle;
}
select,
input,
textarea {
  font-size: 12px;
  margin: 0;
}
input[type="text"],
input[type="password"],
textarea {
  outline-style: none;
  -webkit-appearance: none;
}
table {
  border-collapse: collapse;
}
body {
  color: #333;
  padding: 5px 0;
  font: 12px/20px "SimSun", "宋体", "Arial Narrow", HELVETICA;
  background: #fff; /* overflow-y:scroll;*/
}
a {
  color: #666;
  text-decoration: none;
}
a:visited {
  color: #666;
}
a:hover,
a:active,
a:focus {
  color: #ff8400;
  text-decoration: underline;
}
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.markerContent {
  width: 50px;
  display: flex;
  flex-flow: column;
  border-radius: 5px;
  align-items: center;
  background: rgb(204, 204, 204, 0.1);
  border: 1px solid rgb(204, 204, 204, 0.3);
  padding: 2px;
}
.markerContent1 {
  width: 40px;
  display: flex;
  flex-flow: column;
  border-radius: 5px;
  align-items: center;
  background: rgb(204, 204, 204, 0.1);
  border: 1px solid rgb(204, 204, 204, 0.3);
  padding: 2px;
}
.markerContent1 img {
  width: 36px;
}
.markerContent img {
  width: 30px;
}
.markerContent span,
.markerContent1 span {
  color: #cccccc;
  font-size: 10px;
  display: block;
  width: 50px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.demonstration {
  color: white;
  font-size: 18px;
}
.block {
  position: absolute;
  left: 30%;
  bottom: 25px;
}

.zhen {
  width: 100%;
  height: 100%;
  position: relative;
}
.zhen .iconfont {
  position: absolute;
  right: 50px;
  top: 50px;
  color: white;
  z-index: 99999;
  font-size: 30px;
}
.el-submenu__title i {
  color: white;
}
.el-menu {
  border: none;
}
.el-submenu .el-menu-item {
  min-width: 100px;
}
.el-menu-item.is-active {
  background-color: #050c54 !important;
}

.left_top {
  position: absolute;
  left: -8px;
  top: -8px;
  width: 75px;
  height: 48px;
  background-image: url("./assets/img/new/left_top.png");
}
.right_bottom {
  position: absolute;
  right: -8px;
  bottom: -8px;
  width: 75px;
  height: 48px;
  background-image: url("./assets/img/new/right_bottom.png");
}
.left_wrap {
  position: absolute;
  left: -2px;
  top: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  border: 2px #263299;

  z-index: 1;
}
.clip {
  /* clip-path: polygon(
    6px 0,
    100% 0,
    100% calc(100% - 6px),
    calc(100% - 6px) 100%,
    0 100%,
    0 6px
  ); */
  background: linear-gradient(-45deg, transparent 15px, #58a 0) bottom right,
    linear-gradient(45deg, transparent 15px, #58a 0) bottom left,
    linear-gradient(135deg, transparent 15px, #58a 0) top left,
    linear-gradient(-135deg, transparent 15px, #58a 0) top right;
  background-size: 50% 51%;
  background-repeat: no-repeat;
}
</style>
