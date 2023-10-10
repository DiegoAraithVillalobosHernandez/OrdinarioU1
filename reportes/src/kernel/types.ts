export type Entity<ID extends number | string> = {
  id: ID;
};

export type TPagination = {
  filter: string;
  page?: number;
  offset?: number;
  limit?: number;
  sortBy?: string;
  totalPages?: number;
  sort?: string; //asc desc
  total?: number;
};

export enum Errors {
  NO_DATA_FOUND = "NoDataFound",
  INTERNAL_SERVER_ERROR = "InternalServerError",
  UNAUTHORIZED = "UnAuthorized",
  MISSING_FIELDS = "MissingFields",
  RECORD_NOT_REGISTERED = "RecordNotRegistered",
}

export type TStatus = Entity<number> & {
  description: string;
};

export type TJson = {
  [x: string]: any;
};

export type TJsonArray = TJson[];
