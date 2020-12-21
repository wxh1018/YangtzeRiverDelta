<template>
  <div class="passengerstation">
      <iframe :src="this.ifurl + 'PassengerStation'" frameborder="0"></iframe>
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
.passengerstation{
    width: 100%;
    height: 100%;
}
.passengerstation iframe{
  width: 100%;
  height: 100%;
}
</style>