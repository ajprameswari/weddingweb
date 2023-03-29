import { Dietary } from "./dietary";

export interface Rsvp {
  name: string;
  email: string;
  dietary?: Dietary;
  allergies?: string;
  coming: boolean;
}