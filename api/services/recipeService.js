/**
 * recipeService
 *
 * @description :: Data Access Object for recipe data
 */

module.exports = {

  find: async () => {

    let result = [];

    const recipes = await sails.models.recipe
      .find()
      .populate('ingredients');

    recipes.forEach(async recipe => {

      recipe.ingredients.forEach(async ingredient => {

        const unitData = await sails.models.unit.find().where({ id: ingredient.unit });

        console.log(ingredient);

        result.push(ingredient);
      });

    });

    return result;
  },

  create: async (user, membershipTier) => {

    if (!membershipTier) {
      membershipTier = await sails.models.membershiptier.findOne({ name: 'basic' });
    }

    const newMembership = {
      // expiresAt: new Date(),
      tier: membershipTier.id,
      owner: user.id
    };

    return await sails.models.membership.create(newMembership).fetch();

  },

  getCurrent: async (userId) => {

    return await sails.models.membership.findOne({
      hasExpired: false,
      owner: userId
    });

  },

};
