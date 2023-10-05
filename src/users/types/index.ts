export type TokenPayload = {
  email: string;
};

export type TokenType = 'access' | 'refresh';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
