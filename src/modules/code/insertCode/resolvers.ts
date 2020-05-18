import { ResolverMap } from "../../../types/graphql-utils";
import { Code } from "../../../entity/Code";

export const resolvers: ResolverMap = {
  Mutation: {
    insertCode: async (_, { refName, desc }) => {
      const code = Code.create({
        refName,
        desc,
      });

      await code.save();
      return true;
    },
  },
};
