const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  sails.models.user.findOne({ id }, (err, user) => {
    next(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passportField: 'password'
    },
    ((email, password, cb) => {
      sails.models.user.findOne({ email: email }, (err, user) => {

        if (err && !_.isEmpty(err)) {
          return cb(err);
        }

        if (!user) {
          return cb(null, false, { message: 'Email not found' }); // email not found, masked error
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (err && !_.isEmpty(err)) {
            return cb(err);
          }

          if (!res) {
            return cb(null, false, { message: 'Password incorrect' }); // password incorrect, masked error
          }

          let userDetails = {
            email: user.email,
            lastLoginAt: user.lastLoginAt,
            id: user.id
          };
          return cb(null, userDetails, { message: 'Login Successful' });
        });

      });
    })
  ));
