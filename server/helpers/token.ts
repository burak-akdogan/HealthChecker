import jwt from 'jsonwebtoken';

export const issueToken = (user, expiresIn = '7d') =>  //*7 days expire and req. login/*
  jwt.sign({ id: user }, process.env.JWT_SECRET, { expiresIn });
