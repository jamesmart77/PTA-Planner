var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    var token = (req.headers['Authorization']);

    if (token) {
        try {
          var decoded = jwt.verify(token, "secret_token_key");
      
          // handle token here
      
        } catch (err) {
          return next();
        }
      } else {
        next();
      }
};