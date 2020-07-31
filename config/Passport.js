const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../app/User')
const {APP_SECRET} = process.env

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = APP_SECRET;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (payload, done) => {
            User.findOne({where:{id:payload.id}})
            .then(user => {
                if (user) return done(null, user);
                return done(null, false);
            }).catch(err => console.log(err));
        })
    );
};