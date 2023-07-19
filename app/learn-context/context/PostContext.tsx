"use client";

import React, { useState, createContext } from "react";

export type PostType = {
  id: number;
  title: string;
  description: string;
};

type PostContextType = {
  posts: PostType[];
  addPost: (value: PostType) => void;
  deletePost: (id: number) => void;
  editPost: (id: number, data: PostType) => void;
};

export const PostContext = createContext<PostContextType | null>(null);

const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const addPost = (data: PostType) => {
    setPosts((prev) => prev.concat([data]));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const editPost = (id: number, updatedPost: PostType) => {
    setPosts((prevPost) => {
      return prevPost.map((post) => {
        if (id === post.id) {
          return { ...post, ...updatedPost };
        }
        return post;
      });
    });
  };

  const value: PostContextType = {
    posts,
    addPost: addPost,
    deletePost,
    editPost,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostProvider;
