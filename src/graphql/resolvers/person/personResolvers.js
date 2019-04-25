const { forwardTo } = require("prisma-binding");
const personService = require("./../../../services/personService");

module.exports = {
  Mutation: {
    createPerson: (parent, args, context, info) => {
      console.log("--== createPerson ", args);
      return personService.createPerson(args, context);
    }
  },
  Query: {
    persons: forwardTo("db")
  }
};
