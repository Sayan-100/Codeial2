const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const acessLogStream = rfs('acess.log', {
    interval: '1d', //1 day
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assests',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,

        auth: {
            user: 'ssayan.student@gmail.com',
            pass: '123456#sBin'
        }
    },
    google_client_id: "36815387300-ui0j8e4ln3057q52scv2an8i5asu1k13.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',

    morgan: {
        mode: 'development',
        options: { stream: acessLogStream }

    }

}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,

        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    // google_client_id: "36815387300-ui0j8e4ln3057q52scv2an8i5asu1k13.apps.googleusercontent.com",
    // google_client_secret: "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",
    // google_call_back_url: "http://codeial.com/users/auth/google/callback",
    // jwt_secret: process.env.CODEIAL_JWT_SECRET,,

    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALLBACK_RURL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,

    morgan: {
        mode: 'combined',
        options: { stream: acessLogStream }
    }
}




// module.exports = development;
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);