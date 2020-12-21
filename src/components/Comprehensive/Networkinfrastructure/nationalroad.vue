<template>
  <div class="nationalroad">
    <iframe :src="this.ifurl + 'NationalRoad'" frameborder="0"></iframe>
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
.nationalroad {
  width: 100%;
  height: 100%;
}
.nationalroad iframe {
  width: 100%;
  height: 100%;
}
</style>