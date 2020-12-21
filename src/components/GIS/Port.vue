<template>
  <div class="cityinformation">
    <iframe
      :src="this.ifurl + 'Port'"
      frameborder="0"
      border="0"
      width="100%"
      height="100%"
    ></iframe>
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
.cityinformation {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.cityinformation iframe {
  width: 100%;
  height: 100%;
}
</style>