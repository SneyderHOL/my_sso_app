const fs = require("fs");
const passport = require("passport");
const path =require("path");
const SamlStrategy = require("passport-saml").Strategy;
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

const privateKeyPath = process.env.PRIVATE_KEY_NAME;
const certPath = process.env.CERT_NAME;
const keyPass = '';
const entityId = '';
const logingCallback = '/api/v1/ad/sso/callback/postResponse';
const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
const authnContext = [
  'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/password',
];
const signatureAlgorithm = 'sha256';
const audience = 'https://adfs-stg.vationventures.com/federationmetadata/2007-06/federationmetadata.xml'

const fileString = fs.readFileSync(certPath);

pem.readPkcs12(fileString, { p12Password: keyPass }, (err, prv) => {
  passport.use(
    'saml',
    new SamlStrategy({
      entryPoint: process.env.AD_ENTRYPOINT,
      issuer: entityId,
      callbackUrl: logingCallback,
      privateKey: privateKey,
      cert: prv.cert,
      authnContext: authnContext,
      identifierFormat: null,
      signatureAlgorithm: signatureAlgorithm,
      racComparison: "exact",
      audience: audience,
    },
      (profile, done) => {
        try {
          console.log({ profile })
          return done(null, { email: profile.email })
        }
        catch (error) {
          console.log({ error })
          throw error
        }
      }
    )
  )
})

module.exports = passport;