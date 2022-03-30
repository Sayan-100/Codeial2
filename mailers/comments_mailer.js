const nodemailer = require('../config/nodemailer');
// const nodeMailer = require('../config/nodemailer');

//module.exports = newComment

exports.newComment = (comment) => {
    console.log('inside new comment mailer', comment);
    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from: 'bsayan289@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        // html: '<h1>Yup, your comment is now made! </h1>'
        html: htmlString


    }, (err, info) => {
        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    })
}