const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt  = require('passport-jwt').ExtractJwt
const path        = require('path')
const fs          = require('fs')
const logger      = require('../utils/logger')
const User        = require('../models/index').User

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
}

const authenticate = async (payload, done) => {  
    try{
        const user = await User.scope('withPassword').findOne({where: {id: payload.sub}})
        // When the user not found
        if(!user){
            return done(null, false)
        }
        return done(null, user)
    } catch (err){
        logger.error(err, {errObj: err})
        throw err
    }    
}

const initPassport = (passport) => {
    passport.use(new JwtStrategy(
        opts, authenticate
    ))
}

module.exports = initPassport