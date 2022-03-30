const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
    },

    //The object on which like is placed the IDs
    //This defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,

        //we are going to place the path into some other field which is there
        //the field will decide on which type of object the like has been placed it decides which other property that is the type of the object
        refPath: 'onModel'
    },

    //a property on likes and the type

    //this is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment'] //it will restrict to post and comment
            //values can be put
    }

}, {
    timestamps: true
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;