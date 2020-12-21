<template>
  <iframe :src="this.ifurl + 'Aviation'" frameborder="0"></iframe>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    time() {
      return this.base.GetTime();
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
</style>