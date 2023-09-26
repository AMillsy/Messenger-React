const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./schemas");
const path = require("path");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const db = require("./config/connection.js");
const { authMiddleware } = require("./utils/auth");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  /**Add context middleware */
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const startApolloServer = async () => {
  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();
