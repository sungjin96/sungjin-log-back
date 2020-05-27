import { GraphQLServer } from "graphql-yoga";

import { createTypeormConn } from "./utils/createTypeormConn";
import { genSchema } from "./utils/genSchema";

export const startServer = async () => {
  const server = new GraphQLServer({ schema: genSchema() as any });
  await createTypeormConn();
  server.express.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log("Server is running on port is 4000");

  return app;
};
