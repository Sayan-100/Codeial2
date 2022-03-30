const Post = require('../model/post');
const User = require('../model/user');

// module.exports.home = function(req, res) {

// Post.find({}, function(err, posts) {
//     return res.render('home', {
//         title: "Home",
//         posts: posts
//     });
// });
// console.log(req.cookies);
// res.cookie('user_id', 9.8);
// Post.find({}).populate('user').exec(function(err, posts) {
//     return res.render('home', {
//         title: "Home",
//         posts: posts
//     });
// });

// Post.find({}).populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     }).exec(function(err, posts) {
//         return res.render('home', {
//             title: "Codeial | Home",
//             posts: posts
//         })
//     });

//     Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         })
//         .exec(function(err, posts) {
//             User.find({}, function(err, users) {
//                 return res.render('home', {
//                     title: "Codeial | Home",
//                     posts: posts,
//                     all_users: users
//                 });
//             });
//         });

// }

module.exports.home = async function(req, res) {
    try {
        //populate the user of each post
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },

            //     populate: {
            //         path: 'likes'
            //     }
            // }).populate('comments')
            // .populate('likes');
            })

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log('Error in', err);
    }
}

//module.exports.actionName = function(req, res) {}