/**
 * SchedulingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async (req, res) => {
    const user = req.User;

    const payload = {
      ...req.body,
      owner: user.id
    };

    const newScheduling = await sails.models.scheduling.create(payload).fetch();
    res.json(newScheduling);
  },

  find: async (req, res) => {
    const user = req.User;
    const schedules = await sails.models.scheduling.find({owner: user.id}).populate('recipe');

    res.json(schedules);
  }

};

