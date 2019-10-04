# Election

Empowering the people to choose their own host. 🇺🇸👨‍👨‍👧‍👦👨‍👩‍👦‍👦🇺🇸

In this activity, you'll work on adding subscription support to the Election GraphQL API.

## Project Setup

1. Run `npm install` at the root of the project which will install all dependencies for the `api` and the `client`.
2. Run `npm start` which will start the API project.
3. Open `localhost:4000` to find the Playground.
4. Open `localhost:4000/results` to see the Client project running.
5. With the Playground, send a test mutation to the API to vote for one of the hosts:

```graphql
mutation {
  vote(host: ALEX)
}
```

6. Refresh `localhost:4000/results` to see the vote registered in the graph.

**Q: Can we live in a world where this app needs to be refreshed every time there is a change?**

A: No, we cannot. We need to enable GraphQL Subscriptions for the server.

## Instructions

The Client is already set up for subscriptions. All changes should be made to the API.

1. Add a Subscription to the schema that will watch for a change in the `Results` type.
2. Set up the server to handle subscriptions.
3. Adjust the resolvers to handle that subscription.
