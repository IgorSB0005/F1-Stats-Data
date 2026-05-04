export type AuthUser = {
  id: string;
  username: string;
  favorite_team?: string | null;
};

export type AuthToken = {
  access_token: string;
  token_type: string;
};
