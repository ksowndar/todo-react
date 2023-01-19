import React from 'react';
import Todo from "./Todo"

const TodoList = ({ todos, setTodos, filteredTodos, deleteTodo, completeTodo, setAPIData, updateAPIData }) => {
    return (
        <div className="todo-container">
          <ul className="todo-list">
             { filteredTodos.map((todo) => (
              <Todo 
                setTodos={setTodos} 
                todos={todos}
                key={todo.id}
                todo={todo} 
                text={todo.todo_item} 
                deleteTodo={deleteTodo} 
                completeTodo={completeTodo} 
                setAPIData={setAPIData} 
                updateAPIData={updateAPIData} 
              />
             ))}
          </ul>
        </div>
    );
};

export default TodoList;