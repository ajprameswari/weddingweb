<template>
  <div class="image-with-text h-screen">
    <div class="img-block">
      <div class="img-container main-img">
        <div class="img"></div>
      </div>
    </div>
    <div class="text-section">
      <h1>AJ & Mathias</h1>
      <h2>are getting married</h2>
      <h3>Saturday 11th of November, 2023</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.main-img {
  height: 400px;
  width: 320px;
}
.img {
  @apply rounded-t-full;
  background-image: url("../../assets/bele.png");
}
</style>
