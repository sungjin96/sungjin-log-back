import { ResolverMap } from "../../../types/graphql-utils";
import { Tag } from "../../../entity/Tag";

export const resolvers: ResolverMap = {
  Query: {
    selectTagList: async (_) => {
      const tags = await Tag.query(`
        select
          content,
          count(content)
        from
          (
            select
              *
            from
              tags
          ) t
          group by content
          
      `);

      return tags;
    },
  },
};
