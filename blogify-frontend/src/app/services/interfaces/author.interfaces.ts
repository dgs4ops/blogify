export interface AuthorMeDataResponse {
  id: string;

  displayName: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface AuthorMeResponse {
  meta: undefined;

  data: AuthorMeDataResponse;
}
