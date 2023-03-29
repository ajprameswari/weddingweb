<template>
  <Home />

  <GenericSection title="You are invited" imgName="park13.jpg">
    After being in each other's lives for 3 years now, we have decided to tie
    the knot. We would be delighted to have you join us as we enter the journey
    of marriage. We will exchange wedding vows on
    <strong>Saturday 11th of November, 2023</strong> at 15.00 in
    <strong>Park 13, Aarhus, Denmark</strong>
  </GenericSection>

  <GenericSection title="Gifts" imgName="gifts.jpg">
    Your presence is already a present to us. If you want, you can donate to...
  </GenericSection>

  <GenericSection title="Accomodation" imgName="accomodation.jpg">
    Zleep Hotel
  </GenericSection>

  <GenericSection title="Location" imgName="aarhus.jpg">
    Park13 is located slightly north of the second largest city in Denmark,
    <strong>Aarhus</strong>, which is known as "the world's smallest
    metropolis". There are many things to enjoy here, especially if you are into
    parks, museums or you're just a foodie that likes to have the world at their
    fingertips.
  </GenericSection>

  <RSVP />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Home from "./components/sections/Home.vue";
import RSVP from "./components/sections/RSVP.vue";
import GenericSection from "./components/sections/GenericSection.vue";

@Options({
  components: {
    Home,
    RSVP,
    GenericSection,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  @apply text-beaver;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  @apply bg-merino;
}
</style>
