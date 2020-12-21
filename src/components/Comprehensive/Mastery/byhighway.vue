<template>
  <div class="byhighway">
    <iframe
      :src="this.ifurl + 'IsochronousCircleByHighway'"
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
.byhighway {
  width: 100%;
  height: 100%;
}
.byhighway iframe {
  width: 100%;
  height: 100%;
}
</style>