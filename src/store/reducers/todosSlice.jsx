import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

//Reducer Thunk

export const getTodos = createAsyncThunk('todos/todoFetched', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/todos?_limit=5'
  );

  return response.data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    allTodos: [
      //   {
      //     id: 1,
      //     title: "Viec 1",
      //     completed: false,
      //   },
      //   {
      //     id: 2,
      //     title: "Viec 2",
      //     completed: true,
      //   },
      //   {
      //     id: 3,
      //     title: "Viec 3",
      //     completed: false,
      //   },
    ],
  },
  reducers: {
    addTodo(state, action) {
      state.allTodos.unshift({
        id: nanoid(),
        title: action.payload,
        completed: false,
      });
    },
    markComplete(state, action) {
      const todoId = action.payload;
      state.allTodos = state.allTodos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      });
    },
    deleteTodo(state, action) {
      const todoId = action.payload;
      state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    },
    // todoFetched(state, action) {
    //   state.allTodos = action.payload;
    // },

    // addTodo: {
    //   reducer(state, action) {
    //     // state.allTodos.unshift({
    //     //   id: nanoid(),
    //     //   title: action.payload,
    //     //   completed: false,
    //     // });
    //     state.allTodos.unshift(action.payload);
    //   },
    //   prepare(title) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         completed: false,
    //       },
    //     };
    //   },
    // },
    // markComplete: {
    //   reducer(state, action) {
    //     const todoId = action.payload;
    //     state.allTodos = state.allTodos.map((todo) => {
    //       if (todo.id === todoId) todo.completed = !todo.completed;
    //       return todo;
    //     });
    //   },
    // },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      console.log('fetching todos from backend ...');
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log('Done');
      state.allTodos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      console.log('Get failed !!!');
    },
  },
});

// Async action creator
// export const getTodos = () => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/todos?_limit=5"
//     );

//     dispatch(todoFetched(response.data));
//   } catch (error) {}
// };

// Reducer
const todosReducer = todosSlice.reducer;

// Selector
export const todosSelector = (state) => state.todosReducer.allTodos;

// Action export
export const { addTodo, markComplete, deleteTodo, todoFetched } =
  todosSlice.actions;
// export const {} = todosSlice.actions;

export default todosReducer;
