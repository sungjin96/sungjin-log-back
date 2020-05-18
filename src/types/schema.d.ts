import { Tag } from '../entity/Tag';
// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IMutation {
    __typename: "Mutation";
    deleteCode: boolean;
    insertCode: boolean;
    insertPost: boolean;
    register: boolean;
  }

  interface IDeleteCodeOnMutationArguments {
    id: number;
  }

  interface IInsertCodeOnMutationArguments {
    refName: string;
    desc?: string;
  }

  interface IInsertPostOnMutationArguments {
    title: string;
    content: string;
    write: string;
    type: string;
    imgUrl?: string;
    tags?: Array<Tag>;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
    name?: string;
    age?: number;
    introduce?: string;
    imgUrl?: string;
  }

  interface IPost {
    __typename: "Post";
    id: string;
    title: string;
    content: string;
    type: string;
    imgUrl: string;
    authLevel: string;
    useYn: string;
    tags: Array<ITag>;
  }

  interface ITag {
    __typename: "Tag";
    id: string;
    post: IPost;
    authLevel: string;
    content: string;
    useYn: string;
  }

  interface IQuery {
    __typename: "Query";
    hello: string;
  }

  interface IHelloOnQueryArguments {
    name?: string;
  }
}

// tslint:enable
