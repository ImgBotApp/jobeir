import User from '../models/User';

/**
 * passportFindOrCreate() is used for all OAuth verification
 * methods. The function will check if a User exists with the current
 * email methods and if the User does exist it'll pass the user
 * to the OAuth callback that sets an authenticated JWT token cookie.
 * Otherwise, we create a new user and pass that to the callback
 */
export function passportFindOrCreate(accessToken, refreshToken, profile, done) {
  User.findOne({
    email: profile.emails[0].value,
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      const newUser = new User();

      newUser.firstName = profile.name.givenName;
      newUser.lastName = profile.name.familyName;
      newUser.email = profile.emails[0].value;
      newUser.provider = profile.provider;
      newUser.id = profile.id;

      newUser.save(err => {
        if (err) {
          throw err;
        }

        return done(null, newUser);
      });
    } else {
      return done(err, user);
    }
  });
}