const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./enviroment');


let transporter = nodemailer.createTransport(
    //{
    //     service: 'gmail',
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,

    //     auth: {
    //         user: 'ssayan.student@gmail.com',
    //         pass: ''
    //     }
    // }

    env.smtp
);


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,

        function(err, template) {
            if (err) {
                console.log('error in rendering template', err);
                return;
            }

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}