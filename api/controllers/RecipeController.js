/**
 * RecipeController
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

    const newRecipe = await sails.models.recipe.create(payload).fetch();
    res.json(newRecipe);
  },

  findOne: async (req, res) => {
    const recipeId = req.param('id');
    const recipe = await sails.services.recipeservice.findOne(recipeId);

    res.json(recipe);
  },

  find: async (req, res) => {
    const recipes = await sails.services.recipeservice.find();

    res.json(recipes);
  }

};

