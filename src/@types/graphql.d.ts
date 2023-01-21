type IEdgeType<T> = {
  cursor: string;
  node: T;
};

declare interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  nodes: T[];
  totalCount: number;
  hasNextPage: boolean;
}

declare type GQLContext = {
  req: {
    headers: {
      [key: string]: string;
    };
  };
};

declare enum AUTHORIZED {
  AUTHORIZED_ONG_ID = 'x-authorized-ongid',
}
