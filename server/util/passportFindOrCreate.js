import Users from '../models/Users';

/**
 * passportFindOrCreate() is used for all OAuth verification
 * methods. The function will check if a User exists with the current
 * email methods and if the User does exist it'll pass the user
 * to the OAuth callback that sets an authenticated JWT token cookie.
 * Otherwise, we create a new user and pass that to the callback
 */
export function passportFindOrCreate(accessToken, refreshToken, profile, done) {
  Users.findOne(
    {
      email: profile.emails[0].value
    },
    (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        // Logic needed to handle non-standardized auth info :\
        const fullName =
          (profile.displayName && profile.displayName.split[' ']) || [];
        const firstName = fullName[0] || profile.name.givenName;
        const lastName = fullName[1] || profile.name.familyName;

        const newUser = new Users({
          email: profile.emails[0].value,
          firstName,
          lastName,
          provider: profile.provider,
          id: profile.id
        });

        if (profile.provider === 'facebook')
          newUser.avatar = `https://graph.facebook.com/${profile.id}/picture`;

        if (profile.provider === 'google')
          newUser.avatar = profile.photos[0].value;

        if (profile.provider === 'github')
          newUser.avatar = profile._json.avatar_url;

        newUser.save(err => {
          if (err) {
            throw err;
          }

          return done(null, newUser);
        });
      } else {
        return done(err, user);
      }
    }
  );
}
