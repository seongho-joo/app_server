import 'dotenv/config';
import { typeDefs, resolvers } from './schema';
import client from './client';
import * as http from 'http';
import * as express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { getUser } from './users/user.utils';

const PORT: string | undefined = process.env.PORT;
const apollo: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  playground: true,
  introspection: true,
  context: async ({ req, connection }) => {
    if (req) {
      const { token } = req.headers;
      return {
        loggedInUser: await getUser(token),
        client,
      };
    } else {
      const { loggedInUser } = connection?.context;
      return {
        ...(loggedInUser && { loggedInUser }),
        client,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ token }: { token?: string }) => {
      if (!token) {
        throw new Error(`You can't listening`);
      }
      const loggedInUser = await getUser(token);
      return { loggedInUser };
    },
  },
});

const app = express.default();

app.use(logger('tiny'));
app.use(graphqlUploadExpress());

apollo.applyMiddleware({ app });

const httpServer: http.Server = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  process.send('ready');
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});

process.on('SIGINT', () => {
  httpServer.close(() => {
    console.log('server closed');
    process.exit(0);
  });
});
