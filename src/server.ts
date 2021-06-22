import 'dotenv/config';
import { typeDefs, resolvers } from './schema';
import client from './client';
import * as http from 'http';
import * as passport from 'passport';
import * as express from 'express';
import * as logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { getUser } from './users/user.utils';

const PORT: string = process.env.PORT;
const apollo: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
});

const app = express();

app.use(logger('tiny'));
app.use(passport.initialize());
app.use(passport.session());

apollo.applyMiddleware({ app });

const httpServer: http.Server = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
});
