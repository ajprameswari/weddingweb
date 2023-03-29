<template>
  <section>
    <div class="text-section">
      <h1>{{ title }}</h1>
      <span class="mt-4 lg:max-w-lg"><slot></slot> </span>
    </div>
    <div class="img-block mt-8 lg:my-0">
      <div class="img-container">
        <div
          class="section-img img"
          :style="{
            'background-image':
              'url(' + require('../../assets/' + imgName) + ')',
          }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GenericSection",
  props: {
    title: String,
    imgName: String,
  },
});
</script>
