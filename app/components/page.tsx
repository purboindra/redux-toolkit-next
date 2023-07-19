"use client";

import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost } from "@/app/redux/slices/postSlice";
import { ButtonHTMLAttributes, MouseEventHandler, useState } from "react";

const Posts = () => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts);

  const handleRemovePost = (postId: any) => {
    dispatch(deletePost(postId));
  };

  const handleAddPost: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!title && !description) return;

    const newPost = {
      id: Date.now(),
      title,
      description,
    };

    dispatch(addPost(newPost));

    setTitle("");
    setdescription("");
  };

  return (
    <div>
      <form className="flex flex-col gap-3 w-96">
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
          onChange={(e) => setdescription(e.target.value)}
        />
      </form>
      <button
        className="bg-blue-600 rounded-md py-3 w-96 text-lg font-semibold text-white mt-4"
        onClick={handleAddPost}
      >
        Add New Post
      </button>
      <div className="flex flex-col mt-5">
        <h1 className="text-xl font-semibold text-white">Posts</h1>
      </div>
      {posts ? (
        posts.map((post: any) => (
          <div key={post.id} className="flex flex-col gap-3">
            <p>{post.title}</p>
            <button
              className="mt-1 bg-red-600 rounded-md py-2 w-40 text-md font-medium text-white hover:bg-red-700"
              onClick={() => handleRemovePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No Post Yet</p>
      )}
    </div>
  );
};

export default Posts;
