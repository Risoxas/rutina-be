import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IUser } from '../models/User';

export const authenticateJWT = passport.authenticate('jwt', { session: false });

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = req.user as unknown as IUser;
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Admins only.' });
  }
};
