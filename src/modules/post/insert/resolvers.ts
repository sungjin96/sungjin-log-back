import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
  Mutation: {
    insertPost: async (
      _,
      {
        title,
        content,
        write,
        type,
        imgUrl,
        tags,
      }: GQL.IInsertPostOnMutationArguments
    ) => {
      const post = Post.create({
        title,
        content,
        write,
        type,
        imgUrl,
        tags,
      });
      await Post.save(post);

      return true;
    },
  },
};
