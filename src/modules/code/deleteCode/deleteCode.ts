import { ResolverMap } from "../../../types/graphql-utils";
import { Code } from "../../../entity/Code";

export const resolvers: ResolverMap = {
  Mutation: {
    deleteCode: async (_, { id }) => {
      await Code.delete(id);
      return true;
    },
  },
};
