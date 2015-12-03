var User = require('../models/User');

exports.getUserById = function(req, res) {

    //get all users based on id
    User.findById(req.params.id, function(err, user) {
        if (err)
            res.json({
                "Error": err
            });
        else
            res.json(user);
    });
};


exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if(err) {
      res.json({'ERROR': err});
    } else {
      res.json(users);
    }
  });
};

//create a new user
exports.postUser = function(req, res) {

    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    user.save(function(err) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            res.json({
                'success': user
            });
    });
};

//update the user
exports.putUserById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err)
            res.json({
                "Error": err
            });
        else
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;

        user.save(function(err) {
            if (err)
                res.json({
                    'ERROR': err
                });
            else
                res.json({
                    'success': user
                });
        });
    });
};

// Delete the user

exports.deleteUser = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err)
            res.json({
                'ERROR': err
            });
        else
            user.remove(function(err) {
                if (err)
                    res.json({'ERROR': err});
                else
                    res.json({'success': user});
            });
    });
};