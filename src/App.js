import React,{ useState,useEffect } from 'react';
import './App.css';
import axios from "axios";
import Form from "./components/Form";
import TodoList from './components/TodoList';

const API_URL = "http://localhost:3000/api/v1/todo_lists/";

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data)
}

function setAPIData(todo) {
  return axios.post(API_URL, { todo_list: { todo_item: todo, completed: false, } }).then((response) => response.data);
}

function updateAPIData(updatedText,todo) {
  return axios.patch(API_URL + todo.id, { todo_list: { todo_item: updatedText, completed: todo.completed, } }).then((response) => response.data);
}

function deleteTodo(todo) {
  return axios.delete(API_URL + todo.id, { todo_list: { id: todo.id } }).then((response) => response.data);
}

function completeTodo(todo) {
  return axios.patch(API_URL + todo.id, { todo_list: { completed: !todo.completed } }).then((response) => response.data);
}

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let mounted = true
    getAPIData().then((items) => {
      if (mounted) {
        setTodos(items);
      }
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);
  
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true ));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false ));
        break;
      default:
        setFilteredTodos(todos);
        break; 
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Sowndar's Todo List</h1>         
      </header> 
      
      <Form inputText = {inputText} 
            setInputText = {setInputText} 
            todos = {todos} 
            setTodos = {setTodos} 
            setStatus = {setStatus}
            setAPIData={setAPIData}
      />
      <TodoList  filteredTodos = {filteredTodos}
                 setTodos={setTodos} 
                 todos={todos}
                 deleteTodo={deleteTodo} 
                 completeTodo={completeTodo} 
                 setAPIData={setAPIData} 
                 updateAPIData={updateAPIData}  
      />
    </div>
  );
}

export default App;
