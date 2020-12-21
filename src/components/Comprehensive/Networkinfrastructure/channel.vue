<template>
  <div class="channel">
    <iframe :src="this.ifurl + 'Channel'" frameborder="0"></iframe>
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
.channel {
  width: 100%;
  height: 100%;
}
.channel iframe {
  width: 100%;
  height: 100%;
}
</style>