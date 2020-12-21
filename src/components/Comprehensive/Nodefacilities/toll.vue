<template>
  <div class="toll">
      <iframe :src="this.ifurl + 'Toll'" frameborder="0"></iframe>
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
.toll{
    width: 100%;
    height: 100%;
}
.toll iframe{
  width: 100%;
  height: 100%;
}
</style>