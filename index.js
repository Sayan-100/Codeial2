const express = require('express');
const env = require('./config/enviroment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();


require('./config/view-helper')(app);

const port = 8000;

const path = require('path');

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const Cors = require('cors');


//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');

const customMWare = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


if (env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true, //for production mode false
        outputStyle: 'extended',
        prefix: '/css',

    }));
}


// app.use(Cors());
// var corsOptions = {
//     origin: 'http://localhost:5000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }






// const path = require('path');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path));
//makes the uploads path avaliable to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store used to store the session cookie in the db
app.use(session({ //using the session cookie here
    name: 'codeial',
    //To do 
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) //6000000 ms

    },

    //connect-mongo to store the session information such that when the server restarts users who were logged in not log out 
    store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disabled'
        },

        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )


}));

app.use(passport.initialize());
app.use(passport.session());

//authenticated user is set
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMWare.setFlash);

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if (err) {
        //console.log('Error : ', err)
        console.log(`Error in running server: ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});