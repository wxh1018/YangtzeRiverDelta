<template>
  <div class="watertransport">
    <iframe
      :src="this.ifurl + 'IsochronousCircle_WaterTransport'"
      frameborder="0"
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
  mounted() {
    this.$store.commit("setLeftActive", "3");
  },
  methods: {},
};
</script>

<style>
.watertransport {
  width: 100%;
  height: 100%;
}
.watertransport iframe {
  width: 100%;
  height: 100%;
}
</style>