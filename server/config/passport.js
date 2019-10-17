// var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sha256 = require('sha256');

const Users = require('../db/models/users/userSchema');
const indexS = require('../db/models/indexs/indexsSchema');
const Tokens = require('../db/models/tokens/tokensSchema');

const name_collection = "token";

const config = require("./app")
const { googleAuth } = require("./auth")
const tool_insert_index_collection = require('../routes/controllers/functions/insert_index_collection');

module.exports = function(passport) {

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

    passport.use(new GoogleStrategy({
	    clientID: googleAuth.clientID,
	    clientSecret: googleAuth.clientSecret,
	    callbackURL: googleAuth.callbackURL
	  },
	  async (accessToken, refreshToken, profile, done) => {
	    	process.nextTick(async () => {
               
                var timestamp = parseInt(new Date()/1000)
                var token = sha256(config.key + profile.emails[0].value + timestamp)
                var index = 0;
                const result = await indexS.findOne({'nameCollection': name_collection});
                if(result == null){ tool_insert_index_collection.insert_index_collection(name_collection, 1); index = 1; }
                else { index = result.index; }
                
                var tokenUser = new Tokens()
                tokenUser.id_number = index,
                tokenUser.token  = token,
                
                await Users.findOne({'email': profile.emails[0].value}, async(err, user) => {
                    
	    			if(err) return done(err);
                    
                    if(user){
                        tokenUser.user_id = user.id_number
                        await tokenUser.save();
                        await tool_insert_index_collection.update_index_collection(name_collection, index);
                        return done(null, tokenUser);
                    }

	    			if(!user) {
                        let index_2 = 0;
                        const result = await indexS.findOne({'nameCollection': "users"});
                        if(result == null){ tool_insert_index_collection.insert_index_collection("users", 1); index_2 = 1; }
                        else { index_2 = result.index; }

                        var newUser = new Users(); 
                        newUser.id_number = index_2
                        newUser.fullname = profile.displayName;
                        newUser.email = profile.emails[0].value; // pull the first email
                        newUser.username = newUser.email.split("@")[0];
                        
                        tokenUser.user_id = index_2
                        await tokenUser.save();
                        await tool_insert_index_collection.update_index_collection(name_collection, index);

	    				await newUser.save(async err => {
                            if(err) throw err;
                            await tool_insert_index_collection.update_index_collection("users", index_2);
	    					return done(null, tokenUser);
	    				})
	    			}
	    		});
	    	});
	    }
	));
};