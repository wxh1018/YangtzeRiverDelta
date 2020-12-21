<template>
  <div class="highspeed">
    <iframe :src="this.ifurl + 'HignSpeed'" frameborder="0"></iframe>
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
.highspeed {
  width: 100%;
  height: 100%;
}
.highspeed iframe {
  width: 100%;
  height: 100%;
}
</style>