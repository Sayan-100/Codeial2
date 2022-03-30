const User = require('../../../model/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/enviroment');

module.exports.createSession = async function(req, res) {
    // return res.redirect('/users/profile');
    // let user = User.findOne({ email: req.body.email });

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: "invalid username or password"
            })
        }

        return res.json(200, {
            message: "Sign in successful, here is your token please keep it safe",
            data: {
                // token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: "100000" })
                token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: '100000' })
            }
        })

    } catch (err) {
        console.log('*********', err);

        return res.json(500, {
            message: "internal server Error"
        });
    }
};