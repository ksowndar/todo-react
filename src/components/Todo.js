import React,{ useState } from 'react'

const Todo = ({ text, todo, todos, setTodos, deleteTodo, completeTodo, setAPIData, updateAPIData }) => {
    const [inputText, setInputText] = useState("");

    const deleteHandler = () => {
      setTodos(todos.filter((el) => el.id !== todo.id));
      deleteTodo(todo)
    };

    const completeHandler = () => {
      setTodos(todos.map((item) => {
        if(item.id === todo.id){
          completeTodo(todo)
          return {
            ...item, completed: !item.completed
          };
        }
        return item;
      }));
    };

    const inputTextHandler = (e) => {
      setInputText(e.target.value);
    };
    
    const editTodohandler = () => {
      setTodos(todos.map((item) => {
        if(item.id === todo.id) {
          updateAPIData(inputText, todo)
          return {
            ...item, completed: !item.completed
          }
        }
        return item
      }))
    }
    
    return(
      <div className='todo'>
        <form>
          <input onChange={inputTextHandler} type='text' className={`todo-item ${todo.completed ? "completed" : ""}`} defaultValue={text}></input>
          <button onClick={editTodohandler} className='edit-btn' type='submit'>
            <i className='fas fa-pen'></i>
          </button>
        </form>
        <button onClick={completeHandler} className='complete-btn'>
          <i className='fas fa-check'></i>
        </button>
        <button onClick={deleteHandler} className='trash-btn'>
          <i className='fas fa-trash'></i>
        </button>
      </div>
    );
};

export default Todo;