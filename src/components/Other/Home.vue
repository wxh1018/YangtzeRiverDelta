<template>
  <div class="wrap">
    <header>
      <img src="../../assets/img/jslogo1.png" @click="to('/')" alt />
      <div class="title cp" @click="to('/')">长三角区域交通一体化大数据平台</div>
    </header>

    <iframe src="http://120.27.227.253:1130/" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.$store.commit("setLeftActive", "1");
    setTimeout(() => {
      this.$em.$emit("changeTop", "7");
    }, 0);
  },
  mounted() {},
  methods: {
    to(v) {
      this.$router.push(v);
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  /* border:1px solid white; */
}
header {
  background: rgba(24, 32, 67);
  height: 60px;
  line-height: 60px;
  font-weight: 900;
  position: relative;
}
.title {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 32px;
  color: white;
}
header img {
  height: 100%;
}
iframe {
  flex: 1;
}
</style>