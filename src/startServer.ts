import { GraphQLServer } from "graphql-yoga";

import { createTypeormConn } from "./utils/createTypeormConn";
import { genSchema } from "./utils/genSchema";

export const startServer = async () => {
  const server = new GraphQLServer({ schema: genSchema() as any });
  await createTypeormConn();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000,
  });
  console.log("Server is running on port is 4000");

  return app;
};
