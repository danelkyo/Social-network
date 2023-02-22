import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const initialState = {
  posts: [],
  post: {}
}

const endpoint = 'http://localhost:3001/';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async () => {
    const res = await fetch(endpoint + 'posts').then(
    (data) => data.json()
  )
  return res
})

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (data) => {
    fetch(endpoint + 'posts', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return data;
  }
)

export const getPostById = createAsyncThunk(
  'posts/getPostsBYId',
  async (id) => {
    const res = await fetch(endpoint + 'posts/' + id).then(
    (data) => data.json()
  )
  return res
})

export const deletePostById = createAsyncThunk(
  'posts/deletePostById',
  async (id) => {
   fetch(endpoint + 'posts/' + id, {
      method: 'DELETE',
    })
})

export const editPostById = createAsyncThunk(
  'posts/editPostById',
  async (data) => {
    const res = await fetch(endpoint + 'posts/' + data.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    return res;
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload
    },
    [getPostById.fulfilled]: (state, { payload }) => {
      state.post = payload
    },
    [deletePostById.fulfilled]: (state, { payload }) => {
      state.post = null
      state.posts = state.posts.filter(p => Number(p.id) === Number(state.post.id))
      return useNavigate("/feed");
    },
    [editPostById.fulfilled]: (state, { payload }) => {
      state.post = payload
    },
    [addPost.fulfilled]: (state, { payload }) => {
      state.posts.push(payload);
    },
  }
})

//export const {} = postsSlice.actions

export default postsSlice.reducer