/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {

  login: function (req, res) {
    passport.authenticate('local', (err, user, info) => {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
      }

      req.logIn(user, async (err) => {
        if (err) {
          res.send(err);
        }

        await sails.models.user
          .update({ id: user.id })
          .set({ lastLoginAt: new Date() });

        let token = await sails.helpers.generateToken({ userId: user.id });

        return res.send({
          message: info.message,
          user,
          token
        });
      });
    })(req, res);
  },

  logout: function (req, res) {
    req.logout();
    res.ok();
  }

};
