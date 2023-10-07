export type Params = Filter & {
  sort?: string;
};

export type Filter = {
  project?: string;
  status?: string;
  date?: string;
};
