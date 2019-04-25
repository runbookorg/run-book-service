const { google } = require("googleapis");
const personService = require("./personService");

/*******************/
/** CONFIGURATION **/
/*******************/

const googleConfig = {
  clientId:
    "393822512743-4soa52k7h8put1jqcr9n7qiobgukrpqi.apps.googleusercontent.com",
  clientSecret: "pqIfa5e2PbfAqRIqGKJ-UMDZ",
  redirect: "http://localhost:3000/home"
};

const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email"
];

/*************/
/** HELPERS **/
/*************/

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope
  });
}

function getGooglePlusApi(auth) {
  return google.plus({ version: "v1", auth });
}

/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
const getGoogleApisUrl = function() {
  console.log("--- Generating urlGoogle ---");
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};

/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
const getGoogleAccountFromCode = async function(code, context) {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  auth.setCredentials(tokens);
  const plus = getGooglePlusApi(auth);
  const me = await plus.people.get({ userId: "me" });
  const userGoogleId = me.data.id;
  const userGoogleEmail =
    me.data.emails && me.data.emails.length && me.data.emails[0].value;
  console.log('-- Google Account ', me.data)
  const person = await personService.createPerson(
    {
      data: {
        id: userGoogleId,
        email: userGoogleEmail,
        name: me.data.name
      }
    },
    context
  );
  console.log("--- GoogleAccount ", person);
  return {
    id: userGoogleId,
    email: userGoogleEmail,
    tokens: tokens
  };
};

module.exports = { getGoogleAccountFromCode, getGoogleApisUrl };
