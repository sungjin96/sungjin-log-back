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
    url?: string;
    tags?: Array<IInputTag>;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
    name?: string;
    age?: number;
    introduce?: string;
    imgUrl?: string;
  }

  interface IQuery {
    __typename: "Query";
    selectPostList: Array<IPost>;
    selectPost: IPost;
    hello: string;
  }

  interface ISelectPostListOnQueryArguments {
    tag?: string;
    type?: string;
  }

  interface ISelectPostOnQueryArguments {
    id?: string;
  }

  interface IHelloOnQueryArguments {
    name?: string;
  }

  interface IPost {
    __typename: "Post";
    id: string;
    title: string;
    content: string;
    write: string;
    type: string;
    imgUrl: string;
    url: string;
    authLevel: string;
    useYn: string;
    tags: Array<ITag>;
    createdAt: string;
    updatedAt: string;
  }

  interface ITag {
    __typename: "Tag";
    id: string;
    post: IInputPost;
    content: string;
    authLevel: string;
    useYn: string;
    createAt: string;
    updateAt: string;
  }

  interface IInputTag {
    content: string;
  }

  interface IInputPost {
    title: string;
    content: string;
    write: string;
    type: string;
    imgUrl: string;
    url: string;
    tags: Array<IInputTag>;
  }
}

// tslint:enable
