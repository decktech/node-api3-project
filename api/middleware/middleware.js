const User = require('../users/users-model.js');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log('logger middleware:', req.method, req.url);
  next();
}

function validateUserId(req, res, next) {
  User.getById(req.params.id)
    .then(result => {
      if (result == null) {
        next({ status: 404, message: "user not found"});
        // res.status(404).json({ message: "user not found"})
        return;
      }

      req.existingUser = result;
      next();
    })
    .catch(err => next(err))
}

function validateUser(req, res, next) {
  if (typeof req.body.name !== 'string') {
    next({ status: 400, message: 'missing required name field' });
    // res.status(400).json({ message: 'missing required name field' })
  } else if (req.body.name.trim() === '') {
    next({ status: 400, message: 'missing required name field'})
    // res.status(400).json({ message: 'missing required name field' })
  } else {
    req.newUser = { name: req.body.name.trim() };
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
