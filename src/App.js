import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 } from 'uuid';

const LOCAL_STORAGE_KEY = "todoApp.todos"


function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  
  useEffect( () => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if( storedTodos ) setTodos(storedTodos)
  }, [])

  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
      const name = todoNameRef.current.value;
      if(name === '') return
      setTodos(prevTodos => {
        return [...prevTodos, {id: v4(), name: name, complete: false}]
      })
      todoNameRef.current.value = null;
  }

  function toggleTodo(id){
      const newTodos = [...todos];
      const todo = newTodos.find(todo => todo.id === id);
      todo.complete = !todo.complete;
      setTodos(newTodos);
  }

  function clearTodo(){
      const newTodos = todos.filter(todo => !todo.complete);
      setTodos(newTodos);
  }

  return (
    <>
    <h1>Benny's Todo React App</h1>
    <div class = "todoLeft"> {todos.filter(todo => !todo.complete).length} Left</div>

    <div class = "todoBox">
    <TodoList todos = {todos} toggleTodo={toggleTodo}/>
    </div>

    <div class= "inputBox">
      <label>
        Task: <input ref={todoNameRef}type="text"/>
      </label>
    </div>

    <div class="buttons">
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={clearTodo}>Clear</button>
    </div>

    <small>Clear is for removing finished tasks.</small>

    </>
  );
}

export default App;
