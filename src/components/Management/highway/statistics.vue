<template>
  <div class="wrap"></div>
</template>
<script>
import Table from "../table/js_table";
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.commit("setLeftActive", "2");
    this.$em.$emit("changeTop", "7");
  },
  methods: {},
};
</script>
<style scoped lang='less'>
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid white;
}
</style>