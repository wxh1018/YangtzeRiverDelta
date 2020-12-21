<template>
  <div :id="el" :ref="el"></div>
</template>
<script>
export default {
  props: {
    el: {
      type: String,
      default: "echartId",
    },
    option: {
      type: Object,
      default: () => {
        return {
          title: {
            text: "标题",
            left: "center",
            textStyle: {
              color: "black",
            },
          },
          backgroundColor: "white",
        };
      },
      require: true,
    },
  },
  name: "js-echarts",
  data() {
    return {
      MyChart: null,
    };
  },
  components: {},
  computed: {},
  watch: {
    option() {
      this.init();
    },
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  mounted() {
    window.onresize = this.base.debounce(this.resize, 500);
  },
  methods: {
    init() {
      this.MyChart = this.$echarts.init(this.$refs[this.el]);
      this.MyChart.setOption(this.option);
    },
    resize() {
      this.MyChart.resize();
    },
  },
};
</script>
<style scoped lang='less'>
#echartId {
  width: 100%;
  height: 100%;
}
</style>