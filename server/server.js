const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./schemas");
const path = require("path");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const db = require("./config/connection.js");
const { authMiddleware } = require("./utils/auth");
const { createServer } = require("http");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();

const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
  schema,
  context: authMiddleware,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
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
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
      console.log(
        `Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();
