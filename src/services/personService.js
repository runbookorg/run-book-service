module.exports = {
  createPerson: (args, context) => {
    console.log("--- I am a personService createPerson ---", args);
    return context.db.mutation.createPerson(args, "{ id }");
  }
};
