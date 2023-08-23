const express = require('express');
const mongodb = require('./data/database');
const { mongo } = require('mongoose');
//const apidoc = require('./routes/app');
const app = express();
const routes = require('./routes/index')
//const countries = require('./routes/countries')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 500;
const bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret:'secret',
    resave :false,
    saveUninitialized: true,
}));
//this is the basic express session
app.use(passport.initialize());
//init passport on every route call
app.use(passport.session());
//allow passpor to use express-session

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin,X-Requested-With,Content-Type,Accept,Z-Key,Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'POST,GET,PUT,PATCH,OPTIONS,DELETE'
    );
    next();
  
  });
app.use(cors({methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']})) ; 
app.use(cors({origin:'*'})) ;


app.use('/', routes);
//app.use('/',countries);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

passport.use(new GitHubStrategy({
    clientID:process.env.GITHUB_CLIENT_ID,
    clientSecret:process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},

function(accesToken,refreshToken,profile,done){
    return done(null,profile)
})
);


passport.serializeUser((user,done)=>{
     done(null,user)
});
passport.deserializeUser((user,done)=>{
     done(null,user)
});


app.get('/', (req, res)=>{res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "Logged out")});
// app.get('/', (req, res)=>{res.send(req.session.user !== undefined ? `logged in as ${req.session.user.displayName}`: "logged out")});

app.get('/github/callbacks',passport.authenticate('github',{
    failureRedirect:'/api-docs',session:false}),
    (req,res) =>{
        req.session.user = req.user,
        res.redirect('/');
    });


mongodb.initDb((err) =>{
    if (err) {
        console.log(err)    
    }
    else{
        app.listen(port, ()=>{console.log(`Database is listening and node Runing on a ${port}`)});
    }
    }
);


module.exports = app;





