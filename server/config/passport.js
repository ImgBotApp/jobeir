import JwtStrategy from 'passport-jwt/lib/strategy';
import ExtractJwt from 'passport-jwt/lib/extract_jwt';
import Users from '../models/Users';
import serverConfig from '../config/config';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import GitHubStrategy from 'passport-github2';
import { passportFindOrCreate } from '../util/passportFindOrCreate';

const passportInit = passport => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
  opts.secretOrKey = process.env.JWT;

  // Local, regular signup
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      Users.findOne({ _id: jwt_payload._doc._id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );

  // Google
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: serverConfig.googleAuth.clientID,
        clientSecret: serverConfig.googleAuth.clientSecret,
        callbackURL: serverConfig.googleAuth.callbackURL
      },
      passportFindOrCreate
    )
  );

  // Facebook
  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: serverConfig.facebookAuth.clientID,
        clientSecret: serverConfig.facebookAuth.clientSecret,
        callbackURL: serverConfig.facebookAuth.callbackURL,
        profileFields: ['id', 'email', 'gender', 'locale', 'name', 'timezone']
      },
      passportFindOrCreate
    )
  );

  // Github
  passport.use(
    new GitHubStrategy.Strategy(
      {
        clientID: serverConfig.githubAuth.clientID,
        clientSecret: serverConfig.githubAuth.clientSecret,
        callbackURL: serverConfig.githubAuth.callbackURL,
        scope: ['user']
      },
      passportFindOrCreate
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

export default passportInit;
