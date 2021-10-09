import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {
  return useMemo(() => sort ? [...posts].sort((a, b) => a[sort].localeCompare(b[sort])) : posts, [sort, posts]);
}

export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
  return useMemo(() => sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase())), [query, sortedPosts]);
}