<template>
  <section>
    <div class="text-section">
      <h1>RSVP</h1>
      <span class="mt-4 lg:max-w-lg mb-4"
        >Ready for an unforgettable day?
      </span>
      <div class="flex flex-col lg:flex-row items-center justify-center">
        <FormRSVP
          class="h-full"
          ref="rsvpPrimary"
          @formDataChanged="primaryData$.next($event)"
        />
        <FormRSVP
          ref="rsvpPlusOne"
          v-if="plusOneAdded"
          @formDataChanged="plusOneData$.next($event)"
          class="mt-6 lg:mt-0 lg:ml-6 h-full"
        />
      </div>
      <div class="flex justify-center">
        <button @click="togglePlusOne()" class="mt-4 w-32">
          {{ plusOneAdded ? "Remove" : "Add" }} +1
        </button>
        <button
          :disabled="!canSubmit"
          @click="submit()"
          class="mt-4 ml-2 w-32 primary"
        >
          Submit
        </button>
      </div>
    </div>
    <div class="img-block mt-8 lg:my-0">
      <div class="img-container">
        <div class="img section-img"></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FormRSVP, { RSVPFormData, isValidForm } from "../FormRSVP.vue";
import { toRaw } from "vue";
import { Subject, combineLatest } from "rxjs";
import { startWith } from "rxjs/operators";
import axios from "axios";
import { toast } from "vue3-toastify";

const apiUrl = process.env.VUE_APP_RSVP_API_ENDPOINT;

@Options({
  components: {
    FormRSVP,
  },
})
export default class RSVP extends Vue {
  canSubmit = false;
  plusOneAdded = false;
  primaryData$: Subject<RSVPFormData | undefined> = new Subject();
  plusOneData$: Subject<RSVPFormData | undefined> = new Subject();

  created() {
    combineLatest([
      this.primaryData$.pipe(startWith(undefined)),
      this.plusOneData$.pipe(startWith(undefined)),
    ]).subscribe(([primary, plusOne]) => {
      this.canSubmit = this.checkCanSubmit(primary, plusOne);
    });
  }

  togglePlusOne() {
    this.plusOneAdded = !this.plusOneAdded;
    this.plusOneData$.next(undefined);
  }

  async submit() {
    const rsvpData = {
      primary: this.getFormData(this.$refs.rsvpPrimary),
      plusOne: this.getFormData(this.$refs.rsvpPlusOne),
    };
    const loadingToastId = toast.loading("Submitting RSVP... 🤔");
    try {
      await axios.post(`${apiUrl}/rsvp`, rsvpData);
      const names = [rsvpData.primary, rsvpData.plusOne]
        .map((person) => person?.name?.split(" ")[0])
        .filter((x) => !!x);
      toast(
        `RSVP accepted! We look forward to see you, ${names.join(" & ")} 🥰`,
        {
          autoClose: false,
        }
      );
    } catch (error: any) {
      toast.error(
        `There was an error! 😭 ${
          error?.response?.data ?? ""
        } Contact AJ if necessary: +31621423645`,
        {
          autoClose: false,
          closeOnClick: false,
        }
      );
    } finally {
      toast.remove(loadingToastId);
    }
  }

  checkCanSubmit(primary?: RSVPFormData, plusOne?: RSVPFormData): boolean {
    // vue does not seem to offer a clean way of getting
    // the validations of the nested forms so we need
    // to pull out the data and manually validate it again
    const primaryValid = isValidForm(primary);
    const plusOneValid = this.plusOneAdded ? isValidForm(plusOne) : true;
    return primaryValid && plusOneValid;
  }

  private getFormData(refTarget?: unknown): RSVPFormData | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return toRaw((refTarget as any)?.formData);
  }
}
</script>

<style scoped lang="scss">
.img {
  background-image: url("../../assets/rsvp.jpg");
}
</style>
