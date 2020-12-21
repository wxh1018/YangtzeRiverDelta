<template>
  <div class="cityinformation">
    <iframe
      :src="this.ifurl + name"
      frameborder="0"
      border="0"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>

<script>
export default {
  // props:[-],
  data() {
    return {};
  },
  computed: {
    name() {
      return this.$route.query.name;
    },
    key() {
      return this.$route.query.key;
    },
  },
  watch: {
    name() {
      this.init();
    },
    key() {
      this.getkey();
    },
  },
  created() {},
  mounted() {
    this.init();
    this.getkey();
  },
  methods: {
    init() {},
    getkey() {
      if (this.key) {
        setTimeout(() => {
          this.$em.$emit("changeTop", this.key.toString());
        }, 10);
      }
    },
    changeTop() {},
  },
};
</script>

<style>
.cityinformation {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.cityinformation iframe {
  width: 100%;
  height: 100%;
}
</style>