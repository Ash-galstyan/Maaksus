const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.profileRead = (req, res) => {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            message: 'UnauthorizedError: private profile'
        });
    } else {
        // Otherwise continue
        // TODO add case if user is not found, possibly other error handling cases may be required
        User.findById(req.payload._id).exec(function(err, user) {
            res.status(200).json(user);
        });
    }
};
