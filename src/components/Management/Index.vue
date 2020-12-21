<template>
  <div class="wrap">
    <iframe :src="this.ifurl + 'DownLoad'" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: ""
    };
  },
  components: {},
  computed: {
    time() {
      return this.base.GetTime();
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.options = this.$store.state.options;
      this.$store.commit("setLeftActive", "1");
      setTimeout(() => {
        this.$em.$emit("changeTop", "7");
      }, 0);
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.wrap iframe {
  width: 100%;
  height: 100%;
}
</style>