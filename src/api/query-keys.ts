export const QueryKey = {
  allPosts: 'posts',
} as const;

export type QueryKey = typeof QueryKey[keyof typeof QueryKey];
