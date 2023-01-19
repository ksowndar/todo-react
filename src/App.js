import { useState,useEffect } from 'react';
import './App.css';

//Importing Components
import Form from "./components/Form";
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
        const todos = JSON.parse(todosString);
        setTodos([ 
          ...todos, {text: inputText, completed: false, id:Math.random() * 1000 },
        ]);
    }

    function storageEventHandler(event) {
        if (event.key === "todos") {
            const todos = JSON.parse(event.newValue);
            setTodos([ 
              ...todos, {text: inputText, completed: false, id:Math.random() * 1000 },
            ]);
        }
    }
  
    window.addEventListener("storage", storageEventHandler);
    return () => {
        window.removeEventListener("storage", storageEventHandler);
    };
}, []);
  
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
            todos = {todos} 
            setTodos = {setTodos} 
            setInputText = {setInputText} 
            setStatus = {setStatus}
      />
      <TodoList  filteredTodos = {filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
