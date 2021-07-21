export const QueryKey = {
  posts: 'posts',
} as const;

export type QueryKey = typeof QueryKey[keyof typeof QueryKey];
