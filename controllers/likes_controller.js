const Like = require('../model/like');
const Post = require('../model/post');
const Comment = require('../model/comment');


// module.exports.toggleLike = async function(req, res) {
//     try {

//         //like/toggle/?id=abcdef&type=Post
//         let likeable;
//         let deleted = false;

//         if (req.query.type == 'Post') {
//             likeable = await Post.findById(req.query.id).populate('likes');
//         } else {
//             likeable = await Comment.findById(req.query.id).populate('likes');
//         }


//         //check if a like already exists
//         let existingLike = await Like.findOne({
//             likeable: req.query.id,
//             onModel: req.query.type,
//             user: req.user._id

//         })

//         //if a like already exists then delete it
//         if (existingLike) {
//             likeable.likes.pull(existingLike._id);
//             likeable.save();

//             existingLike.remove();
//             deleted = true;



//         } else {
//             //else make a new like
//             let newLike = await Like.create({
//                 user: req.user._id,
//                 likeable: req.query.id,
//                 onModel: req.query.type
//             });

//             likeable.likes.push(newLike._id);
//             likeable.save();

//         }


//         return res.json(200, {
//                 message: 'Request successful!',
//                 data: {
//                     deleted: deleted
//                 }
//             })
//             // return res.redirect('back');



//     } catch (err) {
//         console.log(err);
//         return res.json(500, {
//             message: 'Internal Server Error'
//         });
//     }
// }


module.exports.toggleLike = async function(req, res) {
    try {

        //likes/toggle/?id=heffh&type=Post

        let likeable;
        let deleted = false;
        if (req.query.type == "Post") {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if a like already exsits
        let existingLike = await Like.findOne({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            })
            //if a like alredy exists then delete it
        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        } else {
            //else make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike);
            likeable.save();
        }
        return res.status(200).json({
            message: "yuy!! your like are succsessfully posted!!",
            data: {
                deleted: deleted
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}