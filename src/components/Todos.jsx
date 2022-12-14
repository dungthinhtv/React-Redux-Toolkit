import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  todosSelector,
  markComplete,
  deleteTodo,
  getTodos,
} from '../store/reducers/todosSlice';

// import {
//   todosSelector,
//   markComplete,
//   deleteTodo,
//   getTodos,
// } from "../store/reducers/todosSlice";
import TodoForm from './TodoForm';

const Todos = () => {
  //   useEffect(() => {
  //     const todos = localStorage.getItem("todos");
  //     dispatch(getTodos(JSON.parse(todos)));
  //   }, []);

  const todos = useSelector(todosSelector);

  const dispatch = useDispatch();

  const toggleTodoCompleted = (todoId) => {
    // console.log(todoId)
    dispatch(markComplete(todoId));
  };

  const deleteSingleTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  useEffect(() => {
    // send request to jsonplaceholder
    dispatch(getTodos());
  }, [dispatch]);

  //   useEffect(() => {
  //     // send request to jsonplaceholder
  //     localStorage.setItem("todos", JSON.stringify(todos));
  //   }, [todos]);

  return (
    <div className="todo-list">
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={toggleTodoCompleted.bind(this, todo.id)}
            />
            <button onClick={deleteSingleTodo.bind(this, todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
