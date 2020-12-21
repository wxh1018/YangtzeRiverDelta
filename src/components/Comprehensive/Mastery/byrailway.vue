<template>
  <div class="byrailway">
    <iframe
      :src="this.ifurl + 'IsochronousCircleByRailway'"
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
  mounted() {},
  methods: {},
};
</script>

<style>
.byrailway {
  width: 100%;
  height: 100%;
}
.byrailway iframe {
  width: 100%;
  height: 100%;
}
</style>