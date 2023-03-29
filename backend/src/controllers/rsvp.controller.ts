import { Request, Response } from 'express';
import { RsvpEntity } from "../entities/rsvp";
import { RsvpBody, RsvpGuest } from "../dto/rsvp";
import { sequelize } from "../database";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Transaction } from 'sequelize';

async function addGuestToDatabase(guest: RsvpGuest, partnerEmail: string | undefined, t: Transaction): Promise<RsvpEntity> {
  return await RsvpEntity.create(
    {
      name: guest.name,
      email: guest.email,
      dietary: guest.dietary,
      allergies: guest.allergies,
      coming: guest.coming,
      partner: partnerEmail,
    },
    { transaction: t }
  );
}

async function findExistingGuest(email: string): Promise<RsvpEntity | null> {
  return await RsvpEntity.findOne({
    where: {
      email
    },
  });
}

export const handleRsvp = async (req: Request, res: Response) => {
  const rsvpBody = plainToClass(RsvpBody, req.body);

  const errors = await validate(rsvpBody);
  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  let primaryRsvp = await findExistingGuest(rsvpBody.primary.email);
  let plusOneRsvp = rsvpBody.plusOne ? await findExistingGuest(rsvpBody.plusOne.email) : null;

  if (primaryRsvp && plusOneRsvp) {
    return res.status(400).send('Both guests have already RSVPd');
  }

  if (primaryRsvp || plusOneRsvp) {
    return res.status(400).send('One of the guests has already RSVPd');
  }

  const t = await sequelize.transaction();
  try {
    await addGuestToDatabase(rsvpBody.primary, rsvpBody.plusOne?.email, t);
    if(rsvpBody.plusOne) {
      await addGuestToDatabase(rsvpBody.plusOne, rsvpBody.primary.email, t);
    }
    await t.commit();
    return res.status(201).send('RSVP saved successfully');
  } catch (e: any) {
    await t.rollback();
    return res.status(400).send(e);
  }
}