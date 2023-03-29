import { Model, Optional } from "sequelize";
import { Dietary } from "../models/dietary";
import { Rsvp } from "../models/rvsp";

export interface RsvpEntityAttributes extends Rsvp {
  partner?: string;
}

interface RsvpCreationAttributes extends Optional<RsvpEntityAttributes, 'allergies' | 'partner'> {}

export class RsvpEntity extends Model<RsvpEntityAttributes, RsvpCreationAttributes> implements RsvpEntityAttributes {
  public name!: string;
  public email!: string;
  public dietary!: Dietary;
  public coming!: boolean;
  public allergies?: string;
  public partner?: string;
}