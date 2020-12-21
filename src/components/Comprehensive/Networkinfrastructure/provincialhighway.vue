<template>
  <div class="provincialhighway">
    <iframe :src="this.ifurl + 'ProvincialHighway'" frameborder="0"></iframe>
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
.provincialhighway {
  width: 100%;
  height: 100%;
}
.provincialhighway iframe {
  width: 100%;
  height: 100%;
}
</style>