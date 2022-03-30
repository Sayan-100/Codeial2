const Post = require('../../../model/post');
const Comment = require('../../../model/comment');

module.exports.index = async function(req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of Posts",
        // posts: []
        posts: posts

    })
}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            // if (req.xhr) {
            //     return res.status(200).json({
            //         data: {
            //             post_id: req.params.id
            //         },
            //         message: "Post deleted"
            //     })
            // }


            return res.json(200, {
                message: "Post and associated comments deleted"
            });
            return res.redirect('back');
        } else {
            return res.json(401, {
                message: "You cannot delete this post",
            })
        }
    } catch (err) {
        // req.flash('error', err);
        // return res.redirect('back');

        console.log('*********', err);

        return res.json(500, {
            message: "internal server Error"
        });

    }
}