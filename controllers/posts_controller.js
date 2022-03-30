const Post = require('../model/post');
const Comment = require('../model/comment');
const Like = require('../model/like');

// module.exports.create = function(req, res) {
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post) {
//         if (err) {
//             console.log('error in creating a post');
//             return;
//         }

//         return res.redirect('back');
//     });
// }

module.exports.create = async function(req, res) {
        try {
            let post = await Post.create({
                content: req.body.content,
                user: req.user._id
            });


            if (req.xhr) {
                post = await post.populate('user', 'name email');
                return res.status(200).json({
                    data: {
                        post: post
                    },
                    message: "post created"
                })
            }


            req.flash('success', 'Post published');

            return res.redirect('back');
        } catch (err) {
            req.flash('error', err);
            console.log('Error', err);
            return res.redirect('back');
        }
    }
    // module.exports.destroy = function(req, res) {
    //     Post.findById(req.params.id, function(err, post) {
    //         //id means converting the us object id to string
    //         if (post.user == req.user.id) {
    //             post.remove();
    //             Comment.deleteMany({ post: req.params.id }, function(err) {
    //                 return res.redirect('back');
    //             });
    //         } else {
    //             return res.redirect('back');
    //         }
    //     });
    // }

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {

            await Like.deleteMany({ likable: post, onModel: 'Post' });
            await Like.deleteMany({ likeable: { $in: post.comments } });



            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                })
            }


            req.flash('success', 'Post and associated comments deleted');
            return res.redirect('back');
        } else {
            req.flash('error', "You cannot delete this post");
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');

    }
}