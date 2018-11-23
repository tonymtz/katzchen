module.exports = async function isAuthenticated(req, res, next) {

  // adopt the User from the socket
  if (req.isSocket && req.socket.User) {
    req.User = req.socket.User;
    return next();
  }

  function send401() {
    res.status(401).send({ err: 'E_LOGIN_REQUIRED', message: 'Login required' });
  }

  const bearerString = 'Bearer ';

  // get token from header an validate it
  const bearer = req.headers[ 'authorization' ];

  if (!bearer || bearer.indexOf(bearerString) === -1) {
    return send401();
  }

  const token = bearer.replace(bearerString, '');

  // validate we have all params
  if (!token) {
    return send401();
  }

  const decoded = await sails.helpers.verifyToken(token)
    .intercept('error', () => {
      return send401();
    });

  // todo - async this
  sails.models.user.findOne({ id: decoded.userId }, (err, User) => {
    if (err) {
      console.log(err);
      send401();
    }

    req.User = User;
    next();
  });
};
