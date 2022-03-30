const User = require('../model/user');
const fs = require('fs');
const path = require('path');


// module.exports.profile = function(req, res) {
//     return res.render('user_profile', {
//         title: "User profile",
//     });
// }

module.exports.profile = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        return res.render('user_profile', {
            title: 'user profile',
            profile_user: user
        });
    });
}



// module.exports.post = function(req, res) {
//     res.end('<h1>User Post</h1>')
// }
// module.exports.update = function(req, res) {
//     if (req.user.id == req.params.id) {
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
//             return res.redirect('back');
//         });
//     } else {
//         return res.status(401).send('Unauthorized');
//     }
// }

module.exports.update = async function(req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err) {
                if (err) {
                    console.log('****Multer Error', err);
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    //this is saving the path of the uploaded file into the avatar filed in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }

                user.save();
                return res.redirect('back');

            });

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send("Unauthorized");
    }
}





//sign in page
module.exports.signIn = function(req, res) {

    // if (req.isAuthenticated()) {
    //     return res.redirect('/users/profile');
    // }
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

//sign up page
module.exports.signUp = function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    // if (req.isAuthenticated()) {
    //     return res.redirect('/');
    // }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};

//get the sign up data
module.exports.create = function(req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }


    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            req.flash('error', err);
            console.log('error in finding user in signing up');
            return;
        }

        if (!user) {
            User.create(req.body, function(err, user) {
                if (err) {
                    req.flash('error', err);
                    console.log('error in creating user while signing up');
                    return;
                }

                return res.redirect('/users/sign-in');
            })
        } else {
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }


    });


};

//sign in and create a session for user_sign_up
module.exports.createSession = function(req, res) {
    // return res.redirect('/users/profile');
    req.flash('success', 'logged in successfully');
    return res.redirect('/');
};

module.exports.destroySession = function(req, res) {

    req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect('/');
};