const jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Verify token',

  description: '',

  inputs: {
    token: {
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {}
  },

  fn: function (inputs, exits) {
    jwt.verify(inputs.token, sails.config.session.secret, (err, decoded) => {
      if (err) {
        exits.error(err);
      }
      exits.success(decoded);
    });
  }

};
