import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";

export const resolvers: ResolverMap = {
  Query: {
    selectPostList: async (
      _,
      { type, tag }: GQL.ISelectPostListOnQueryArguments
    ) => {
      console.log(tag);

      const posts = await Post.find({
        where: `
          ${type ? "type='" + type + "'" : ""}
          ${tag ? "and Post_tags.content='" + tag + "'" : ""}`,
      });

      return posts;
    },

    selectPost: async (_,{id}:GQL.ISelectPostOnQueryArguments) => {
      const post = await Post.findOne({ where: {id} });

      return post
    }
  },
};
