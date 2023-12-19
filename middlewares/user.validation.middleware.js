import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { id, ...reqWithoutId } = req.body;

  //check required fields in req
  const requiredFields = Object.keys(USER).filter(field => field !== 'id');
  for (const field of requiredFields) {
    if (!(field in reqWithoutId)) {
      return res.status(400).json({ error: true, message: `Field '${field}' is required.` });
    }
  }

  // Check for extra fields
  const allowedFields = Object.keys(USER);
  for (const field in reqWithoutId) {
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: true, message: `Field '${field}' is not allowed.` });
    }
  }

  //check email
  if (reqWithoutId.email && !reqWithoutId.email.endsWith('@gmail.com')) {
    return res.status(400).json({ error: true, message: 'Email must be from @gmail domain.' });
  }

  //check phoneNumber
  if (reqWithoutId.phoneNumber && !reqWithoutId.phoneNumber.match(/^\+380\d{9}$/)) {
    return res.status(400).json({ error: true, message: 'Invalid phone number format. It should be +380xxxxxxxxx' });
  }

  //check password
  if (reqWithoutId.password && reqWithoutId.password.length < 3) {
    return res.status(400).json({ error: true, message: 'Password is too short, it should be more than 3 characters' });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const user = req.body

  // Check for at least one field in the update
  if (Object.keys(user).length === 0) {
    return res.status(400).json({ error: true, message: 'At least one field must be present for update.' });
  }

  // Check for extra fields
  const allowedFields = Object.keys(USER);
  for (const field in user) {
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: true, message: `Field '${field}' is not allowed.` });
    }
  }

  //check email
  if (user.email && !user.email.endsWith('@gmail.com')) {
    return res.status(400).json({ error: true, message: 'Email must be from @gmail domain.' });
  }

  //check phoneNumber
  if (user.phoneNumber && !user.phoneNumber.match(/^\+380\d{9}$/)) {
    return res.status(400).json({ error: true, message: 'Invalid phone number format.' });
  }

  //check password
  if (user.password && user.password.length < 3) {
    return res.status(400).json({ error: true, message: 'Password is too short, it should be more than 3 characters' });
  }

  next();
};

export { createUserValid, updateUserValid };
