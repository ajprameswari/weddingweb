import { IsBoolean, IsDefined, IsEmail, IsEnum, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Rsvp } from "../models/rvsp";
import { Dietary } from '../models/dietary';

export class RsvpBody {
  @IsDefined()
  @ValidateNested()
  @Type(() => RsvpGuest)
  primary!: RsvpGuest;

  @ValidateNested()
  @Type(() => RsvpGuest)
  plusOne?: RsvpGuest;
}

export class RsvpGuest implements Rsvp {
  @IsDefined()
  @IsString()
  name!: string;

  @IsDefined()
  @IsEmail()
  email!: string;

  @IsDefined()
  @ValidateIf((object, value) => object.coming === true)
  @IsEnum(Dietary)
  dietary?: Dietary;

  @IsDefined()
  @IsBoolean()
  coming!: boolean;

  @IsString()
  @ValidateIf((_object, value) => value !== undefined)
  allergies?: string;

}