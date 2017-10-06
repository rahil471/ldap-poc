var express      = require('express'),
    passport     = require('passport'),
    bodyParser   = require('body-parser'),
    LdapStrategy = require('passport-ldapauth');
	var basicAuth = require('basic-auth');
 
// var OPTS = {
  // server: {
    // url: 'ldap://ldap.forumsys.com',
    // bindDN: 'cn=read-only-admin,dc=example,dc=com',
    // bindCredentials: 'password',
    // searchBase: 'dc=example,dc=com',
    // searchFilter: '(uid={{username}})',
    // searchAttributes: ['ou']
  // }
// };

 var OPTS = {
   server: { 
		 url: 'ldap://127.0.0.1:389',
		 bindDN: 'cn=manager,dc=maxcrc,dc=com',
		 bindCredentials: 'secret',
		 searchBase: 'dc=maxcrc,dc=com',
		 searchFilter: '(uid={{username}})',
		 searchAttributes: []
	 }
 };



// var OPTS = {
  // server: {
    // url: 'ldap://www.zflexldap.com:389',
    // bindDN: 'cn=ro_admin,ou=sysadmins,dc=zflexsoftware,dc=com',
    // bindCredentials: 'zflexpass',
    // searchBase: 'dc=zflexsoftware,dc=com',
    // searchFilter: '(uid={{username}})',
    // searchAttributes: ['creatorsName', 'ou', 'mail', 'carLicense', 'homePhone', 'description', 'entryUUID']
  // },
  // usernameField: "username"
// };
 
var app = express();

app.use(function(req, res, next){
	passport.use(new LdapStrategy(OPTS, (user, done)=>{
	  console.log(user);
	  done(null, user);
	}));
	next();
})

 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
 
app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  console.log(req.user);
  res.json({
    status: "ok",
    user: req.user
  });
});
 
app.listen(8080);
