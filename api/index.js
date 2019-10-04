const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { ApolloServer, gql } = require("apollo-server-express");
const { createServer } = require("http");
const path = require("path");

let eve = 0,
  alex = 0;

const typeDefs = gql`
  enum Host {
    ALEX
    EVE
  }

  type Results {
    alex: Int!
    eve: Int!
  }

  type Query {
    results: Results!
    totalVotes: Int!
  }

  type Mutation {
    vote(host: Host!): String!
  }
`;

const resolvers = {
  Query: {
    results: () => ({ alex, eve }),
    totalVotes: () => alex + eve
  },
  Mutation: {
    vote: (parent, { host }, { superdelegate }) => {
      const inc = superdelegate ? 10 : 1;

      if (host === "EVE") eve += inc;
      else alex += inc;

      return "Thank you for voting!";
    }
  }
};

const start = async port => {
  const context = ({ req }) =>
    req && req.headers.superdelegate
      ? { superdelegate: req.headers.superdelegate === "true" }
      : null;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  const app = express();

  app.use(
    "/results",
    express.static(path.join(__dirname, "..", "client", "build"))
  );

  app.get("/reset", (req, res) => {
    alex = 0;
    eve = 0;
    res.redirect("/results");
  });

  server.applyMiddleware({ app });

  app.get(
    "/",
    expressPlayground({
      endpoint: "/graphql"
    })
  );

  const httpServer = createServer(app);

  httpServer.listen({ port }, () => {
    console.log(`GraphQL API running on port ${port}`);
  });
};

start(process.env.PORT || 4000);
