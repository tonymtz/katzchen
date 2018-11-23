/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  findOne: async (req, res) => {
    const recipeId = req.param('id');
    const recipe = await sails.services.recipeservice.findOne(recipeId);

    res.json(recipe);
  }

};

