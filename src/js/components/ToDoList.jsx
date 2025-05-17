//=====================
//      4Geeks
//      Objectives
//=====================

// The tasks are added when the user presses enter on the keyboard, or you can have your own button. 
// The delete icon shows only when the task is hovered.
// The user can add as many tasks as they want.
// When there are no tasks the list should say "No tasks, add a task"
// There is no way to update a task, the user will have to delete and create again.

import React, { useState, useEffect } from "react";

function ToDoList() {
  const [newTask, setNewTask] = useState("");     
  const [list, setList] = useState([]);

  const handleUserKeyPress = async (event) => {
    if (event.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();
      callAddToDo();
    }
  };
  const callAddToDo = async () => {
    await handleAddingToDo();
    setNewTask("");
    await getToDos();
  };
  const handleDelete = async (id) => {
    await deleteToDo(id);
    await getToDos();
  };
  
  async function handleAddingToDo() {
    const task = {
      label: newTask,
      is_done: false,
    };
    const response = await fetch(
      "https://playground.4geeks.com/todo/todos/rough0peace",
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json(); 
    console.log(data);
  }

  const getToDos = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/todo/users/rough0peace",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) {
      console.log("Error fetching todos");
      await fetch("https://playground.4geeks.com/todo/users/rough0peace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return getToDos();
    }

    const data = await response.json();
    setList(data.todos);
    console.log("Here's the get todos", data.todos);
    return data;
  };

  const deleteToDo = async (id) => {
    const response = await fetch(
      `https://playground.4geeks.com/todo/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <div className="list-body">
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          placeholder="No tasks, add a task!"
          onKeyDown={handleUserKeyPress}
          onChange={(event) => setNewTask(event.target.value)}
        ></input>
        <button onClick={() => callAddToDo()} className="btn btn-success">
          add
        </button>
      </div>
      <ul>
        {list?.map((task, index) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between"
              key={index}
            >
              {task.label}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => handleDelete(task.id)}
              ></button>
            </li>
          );
        })}
      </ul>
      <div className="number-of-tasks d-flex justify-content-start">
        {list.length} tasks 
      </div>
    </div>
  );
}

export default ToDoList;
