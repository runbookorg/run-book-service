const { forwardTo } = require("prisma-binding");

module.exports = {
  Mutation: {
    updatePerson:  forwardTo("db"),
    deleteManyPersons: forwardTo("db"),
    deletePerson: forwardTo("db"),
  },
  Query: {
    persons: forwardTo("db"),
    person: forwardTo("db")
  }
};
