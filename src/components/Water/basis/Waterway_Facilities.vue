<template>
  <div class="airport">
    <iframe :src="this.ifurl + 'Waterway_Facilities'" frameborder="0"></iframe>
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
.airport {
  width: 100%;
  height: 100%;
}
.airport iframe {
  width: 100%;
  height: 100%;
}
</style>