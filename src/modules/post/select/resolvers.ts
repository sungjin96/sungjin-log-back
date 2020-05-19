import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
  Query: {
    selectPostList: async (
      _,
      { type, tag }: GQL.ISelectPostListOnQueryArguments
    ) => {
      console.log(tag);

      const post = await Post.find({
        where: `
          ${type ? "type='" + type + "'" : ""}`,
      });

      return post;
    },
  },
};
