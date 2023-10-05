export type TokenPayload = {
  email: string;
};

export type TokenType = 'access' | 'refresh';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type Token = {
  accessToken: string;
};

export type ReturnUserType = {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};
