/**
 * recipeService
 *
 * @description :: Data Access Object for recipe data
 */

module.exports = {

  findOne: async (id) => {

    const recipe = await sails.models.recipe.findOne({ id });

    const recipeIngredientMeasures = await sails.models.recipeingredientmeasure.find({ recipe: id })
      .populate('measure')
      .populate('ingredient');

    recipe.ingredients = recipeIngredientMeasures.map(recipeIngredientMeasure => ({
      ingredient: recipeIngredientMeasure.ingredient,
      measure: recipeIngredientMeasure.measure,
      amount: recipeIngredientMeasure.amount
    }));

    return recipe;

  },

  find: async () => {

    const recipes = await sails.models.recipe.find();

    // recipes.map(async recipe => {
    //   const recipeIngredientMeasures = await sails.models.recipeingredientmeasure.find({ recipe: recipe.id })
    //     .populate('measure')
    //     .populate('ingredient');
    //
    //   recipe.ingredients = recipeIngredientMeasures.map(recipeIngredientMeasure => ({
    //     ingredient: recipeIngredientMeasure.ingredient,
    //     measure: recipeIngredientMeasure.measure,
    //     amount: recipeIngredientMeasure.amount
    //   }));
    //
    //   return recipe;
    // });

    return await Promise.all(recipes);

  }

};
