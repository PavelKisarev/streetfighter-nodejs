import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const { id, health, ...restOfRequest } = req.body;

  //check required fields in req
  const requiredFields = Object.keys(FIGHTER).filter(field => (field !=='id' && field !== 'health'));
  for (const field of requiredFields) {
    if (!(field in restOfRequest)) {
      return res.status(400).json({error: true, message: `Field '${field}' is required.` });
    }
  }

  // Check for extra fields
  const allowedFields = Object.keys(FIGHTER);
  for (const field in restOfRequest) {
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: true, message: `Field '${field}' is not allowed.` });
    }
  }

  // check power
  if (restOfRequest.power && (isNaN(restOfRequest.power) || restOfRequest.power < 1 || restOfRequest.power > 100)) {
    return res.status(400).json({ error: true, message: 'Power must be a number between 1 and 100.' });
  }

  //check defense
  if (restOfRequest.defense && (isNaN(restOfRequest.defense) || restOfRequest.defense < 1 || restOfRequest.defense > 10)) {
    return res.status(400).json({error: true, message: 'Defense must be a number between 1 and 10.' });
  }

  //check health
  if (restOfRequest.health && (isNaN(restOfRequest.health) || restOfRequest.health < 80 || restOfRequest.health > 120)) {
    return res.status(400).json({ error: true, message: 'Health must be a number between 80 and 120.' });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const fighter = req.body

  // Check for at least one field in the update
  if (Object.keys(fighter).length === 0) {
    return res.status(400).json({ error: true, message: 'At least one field must be present for update.' });
  }

  // Check for extra fields
  const allowedFields = Object.keys(FIGHTER);
  for (const field in fighter) {
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: true, message: `Field '${field}' is not allowed.` });
    }
  }

  // check power
  if (fighter.power && (isNaN(fighter.power) || fighter.power < 1 || fighter.power > 100)) {
    return res.status(400).json({ error: true, message: 'Power must be a number between 1 and 100.' });
  }

  //check defense
  if (fighter.defense && (isNaN(fighter.defense) || fighter.defense < 1 || fighter.defense > 10)) {
    return res.status(400).json({ error: true, message: 'Defense must be a number between 1 and 10.' });
  }

  //check health
  if (fighter.health && (isNaN(fighter.health) || fighter.health < 80 || fighter.health > 120)) {
    return res.status(400).json({error: true, message: 'Health must be a number between 80 and 120.' });
  }

  next();
};

export { createFighterValid, updateFighterValid };
