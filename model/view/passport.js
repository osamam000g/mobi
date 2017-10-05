var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./user');

var session = require('express-session');

module.exports = function(app , passport){
    

  app.use(passport.initialize());
    
  app.use(passport.session());
    
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    }));



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new FacebookStrategy({
    clientID: '123140501644591',
    clientSecret: 'a84270ed70e5d954b2af74dc142fe6c2',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile._json.email);
//    User.findOrCreate(..., function(err, user) {
//      if (err) { return done(err); }
//    });
      done(null, profile);
  }
));
    
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'email' })
);
  
    
return passport ;    
    
}