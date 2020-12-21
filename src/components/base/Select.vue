<template>
  <div class="block">
    <span class="demonstration">空间维度选择:</span>
    <el-cascader
      v-model="value"
      :options="options"
      :props="{ expandTrigger: 'hover' }"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>
<script>
export default {
  name: "Select",
  data() {
    return {
      value: ["浙江", "宁波市"],
      options: [],
    };
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.options = this.$store.state.options;
  },
  mounted() {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>
<style scoped>
.block {
  position: absolute;
  bottom: 20px;
  left: 30%;
}
</style>