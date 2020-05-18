import { ResolverMap } from "../../../types/graphql-utils";
import { Post } from "../../../entity/Post";
import { GQL } from "../../../types/schema";
import { Tag } from '../../../entity/Tag';

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
      // const param = {
      //   title,
      //   content,
      //   write,
      //   type,
      //   imgUrl,
      //   tags,
      // };
      const post = new Post();
      post.title = title;
      post.content = content;
      post.write = write;
      post.type = type;
      post.imgUrl = imgUrl;
      post.tags = tags;

      await Post.save(post);
      let posts = await Post.find()
      let lastId = posts[posts.length-1].id;

      const tag = new Tag();
      if(tags) {
        tags.forEach(data => {
          const post = new Post();
          post.id = lastId
          tag.post = post;
          tag.content = data.content
          tag.save();
        });
      }

      console.log();
      //await post.save();
      return true;
    },
  },
};
