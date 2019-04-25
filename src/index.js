require("dotenv").config({ path: "variables.env" });
const { GraphQLServer } = require("graphql-yoga");

const typeDefs = require("./graphql/types/index");
const resolvers = require("./graphql/resolvers/index");
const db = require("./graphql/db");

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({ ...req, db })
});

const options = {
  port: 4000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground"
};
server.start(options, ({ port }) =>
  console.log(`Server is running on localhost:${port}`)
);
