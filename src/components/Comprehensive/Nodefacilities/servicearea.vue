<template>
  <div class="servicearea">
      <iframe :src="this.ifurl + 'ServiceArea'" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style>
.servicearea{
    width: 100%;
    height: 100%;
}
.servicearea iframe{
  width: 100%;
  height: 100%;
}
</style>