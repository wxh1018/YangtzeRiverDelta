<template>
  <div class="watertransport">
    <iframe :src="this.ifurl + 'HighwayOverall'" frameborder="0"></iframe>
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
.watertransport {
  width: 100%;
  height: 100%;
}
.watertransport iframe {
  width: 100%;
  height: 100%;
}
</style>