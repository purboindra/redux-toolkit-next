"use client";

import React, { MouseEventHandler, useContext, useState } from "react";
import { PostContext, PostType } from "./context/PostContext";

export default function Post() {
  const [postId, setPostId] = useState<number | null>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const postContext = useContext(PostContext);

  const handleIsEdit = (post: PostType) => {
    setIsEdit(true);
    setTitle(post.title);
    setPostId(post.id);
    setDescription(post.description);
  };

  const handleRemovePost = (id: number) => {
    postContext?.deletePost(id);
  };

  const handleEditPost = (id: number) => {
    const data: PostType = {
      id: Date.now(),
      title,
      description,
    };
    postContext?.editPost(id, data);

    setTitle("");
    setDescription("");
    setIsEdit(false);
  };

  const handleAddPost: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!title || !description) return;
    const value = {
      id: Date.now(),
      title: title,
      description: description,
    };
    postContext?.addPost(value);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center py-5">
      <form className="flex flex-col gap-3 w-96 items-center">
        <input
          className="px-4 py-2 rounded-md border-neutral-500 text-black"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="px-4 py-2 rounded-md border-neutral-500  text-black"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <button
        className="bg-blue-600 rounded-md py-3 px-12 text-lg font-semibold text-white mt-4"
        onClick={isEdit ? () => handleEditPost(postId!) : handleAddPost}
      >
        {isEdit ? "Edit Post" : "Add New Post"}
      </button>
      <div className="flex flex-col mt-5">
        <h1 className="text-xl font-semibold text-white">Posts</h1>
      </div>
      <div className="flex flex-col gap-3">
        {postContext?.posts.length !== 0 ? (
          postContext?.posts.map((post) => (
            <div key={post.id} className="flex flex-col">
              <p className="text-lg font-semibold text-white">{post.title}</p>
              <p className="mt-1 text-base font-medium text-neutral-200">
                {post.description}
              </p>
              <div className="flex flex-row gap-3 mt-2">
                <button
                  className="mt-1 bg-white rounded-md py-2 w-40 text-md font-medium text-black hover:bg-gray-500"
                  onClick={() => handleIsEdit(post)}
                >
                  Edit
                </button>
                <button
                  className="mt-1 bg-red-600 rounded-md py-2 w-40 text-md font-medium text-white hover:bg-red-700"
                  onClick={() => handleRemovePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Post Yet</p>
        )}
      </div>
    </div>
  );
}
