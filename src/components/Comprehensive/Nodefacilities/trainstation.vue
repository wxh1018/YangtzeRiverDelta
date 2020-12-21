<template>
  <div class="trainstation">
      <iframe :src="this.ifurl + 'TrainStation'" frameborder="0"></iframe>
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
.trainstation{
    width: 100%;
    height: 100%;
}
.trainstation iframe{
  width: 100%;
  height: 100%;
}
</style>