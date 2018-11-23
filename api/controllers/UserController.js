/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  me: async (req, res) => {
    const user = req.User;

    const currentUser = await sails.models.user.findOne({ id: user.id });

    res.json(currentUser);
  }

};

