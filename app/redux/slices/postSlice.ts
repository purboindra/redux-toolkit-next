import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [
  {
    id: 1,
    title: "Post 1",
    description: "Description 1",
  },
];

// THESE REDUX TOOLKIT AS STATE MANAGEMENT RECOMMEND FOR PARSING DATA WITHOUT PASSING BY PROPS
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<any>) => {
      state.push(...action.payload);
    },
    // NOT RECOMMENDED TO USE THIS WHEN YOU GOT DATA FROM API OR DATABASE
    updatePost: (state, action: PayloadAction<any>) => {
      const { id, title, description } = action.payload;
      const postIndex = state.findIndex((post: any) => post.id === id);
      if (postIndex !== -1) {
        state[postIndex].title = title;
        state[postIndex].description = description;
      }
    },
    addPost: (state, action: PayloadAction<any>) => {
      const { id, title, description } = action.payload;
      state.push({ id, title, description });
    },
    // NOT RECOMMENDED TO USE THIS WHEN YOU GOT DATA FROM API OR DATABASE
    deletePost: (state, action: PayloadAction<any>) => {
      const id = action.payload;
      return state.filter((post: any) => post.id !== id);
    },
  },
});

export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
