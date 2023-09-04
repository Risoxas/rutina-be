import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import { User } from '../models/User';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET 
};

export const passportSetup = (passport: PassportStatic) => {
  passport.use(
    new Strategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
