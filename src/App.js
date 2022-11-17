import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 } from "uuid";

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {

  const [ todos, setTodos ] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id == id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if(name === '') return;
    setTodos(previousTodos => {
      return [...previousTodos, {id: v4(), name, completed: false }]
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodo() {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList toggleTodo={toggleTodo} todos={todos}/>
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo} >Add Todo</button>
      <button onClick={handleClearTodo}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.completed).length} left to do</div>
    </>
  );
}

export default App;
