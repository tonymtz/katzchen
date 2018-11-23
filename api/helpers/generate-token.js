const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Generate token',

  description: '',

  inputs: {
    payload: {
      type: {},
      required: true
    }
  },

  exits: {
    success: {},
  },

  fn: async function (inputs, exits) {
    const token = jwt.sign(inputs.payload, sails.config.session.secret);
    return await exits.success(token);
  }

};
