<template>
  <form
    class="flex flex-col items-center p-6 border-cashmere border-opacity-50 border rounded-md max-w-lg"
  >
    <div class="input-section">
      <label>Attending <span class="text-error">*</span></label>
      <input type="checkbox" v-model="v$.formData.coming.$model" />
    </div>

    <div class="input-section" style="margin-top: 0">
      <label>Name <span class="text-error">*</span></label>
      <input
        :class="{ invalid: v$.formData.name.$errors.length }"
        v-model="v$.formData.name.$model"
      />
    </div>

    <div class="input-section">
      <label>E-mail <span class="text-error">*</span></label>
      <input
        :class="{ invalid: v$.formData.email.$errors.length }"
        v-model="v$.formData.email.$model"
      />
    </div>

    <div class="input-section" v-if="v$.formData.coming.$model">
      <label>Dietary preferences <span class="text-error">*</span></label>
      <select
        v-model="v$.formData.dietary.$model"
        :class="{ invalid: v$.formData.dietary.$errors.length }"
      >
        <option value="VEGETARIAN">Vegetarian</option>
        <option value="FISH_ONLY">Fish</option>
        <option value="EATS_EVERYTHING">Anything edible</option>
      </select>
    </div>

    <div class="input-section" v-if="v$.formData.coming.$model">
      <label>Allergies</label>
      <input
        v-model="v$.formData.allergies.$model"
        placeholder="Nuts, gluten, kiwi"
      />
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import { required, minLength, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export type RSVPFormData = {
  name?: string;
  coming: boolean;
  email?: string;
  dietary?: string;
  allergies?: string;
};

export default defineComponent({
  name: "FormRSVP",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        coming: true,
        dietary: "",
        allergies: "",
      },
    };
  },
  validations() {
    return {
      formData: {
        name: { required, minLength: minLength(1) },
        email: { required, email },
        coming: { required },
        dietary: { required },
        allergies: {},
      },
    };
  },
  watch: {
    formData: {
      handler(newValue) {
        this.$emit("formDataChanged", toRaw(newValue));
      },
      deep: true,
    },
  },
});

export function isValidForm(formData: RSVPFormData | undefined): boolean {
  if (!formData) {
    return false;
  }

  if (!formData.name) {
    return false;
  }

  var emailRe = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!formData.email || !emailRe.test(formData.email)) {
    return false;
  }

  if (formData.coming && !formData.dietary) {
    return false;
  }
  return true;
}
</script>

<style scoped lang="scss"></style>
