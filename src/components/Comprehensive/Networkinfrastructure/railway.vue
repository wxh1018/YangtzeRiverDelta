<template>
  <div class="railway">
      <iframe :src="this.ifurl + 'Railway'" frameborder="0"></iframe>
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
.railway{
    width: 100%;
    height: 100%;
}
.railway iframe{
  width: 100%;
  height: 100%;
}
</style>