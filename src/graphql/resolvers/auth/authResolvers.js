const googleApisAuthService = require("./../../../services/googleApisAuthService");

module.exports = {
  Query: {
    googleApisUrl: () => {
      return {
        url: googleApisAuthService.getGoogleApisUrl()
      };
    },
    googleAccountFromCode: (parent, args, context, info) => {
      console.log("--== googleAccountFromCode ", args);
      return googleApisAuthService.getGoogleAccountFromCode(args.code, context);
    }
  }
};
