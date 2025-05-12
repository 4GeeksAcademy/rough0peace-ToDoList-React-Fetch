//=====================
//      4Geeks
//      Objectives
//=====================

// Your app needs to look like this.
// The tasks are added when the user presses enter on the keyboard, or you can have your own button.
// The delete icon shows only when the task is hovered.
// The user can add as many tasks as they want.
// When there are no tasks the list should say "No tasks, add a task"
// There is no way to update a task, the user will have to delete and create again.

import React, { useState, useEffect } from "react";

function ToDoList() {
  const [newTask, setNewTask] = useState("");
  const [list, setList] = useState(["make the bed", "wash dishes"]);

  function handleUserKeyPress(event) {
    if (event.key === "Enter") {
      console.log("add task");
      event.stopPropagation();
      event.preventDefault();
      setList([...list, newTask]);
      setNewTask("");
    }
  }

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
      "https://playground.4geeks.com/todo/users/rough0peace"
    );
    const data = await response.json();
    setList(data.todos);
    return data.todos;
  };

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <div className="list-body">
      <input
        type="text"
        value={newTask}
        onKeyDown={handleUserKeyPress}
        onChange={(event) => setNewTask(event.target.value)}
      ></input>
      <ul className="list-group list-group-flush">
        {list.map((task, index) => {
          return (
            //event listener li onclick delete
            //onClick={(event) => {

            //filter list using the index of task
            //}}
            //filter list using the index of task
            //onClick={(event) => {
            //const filteredArray = list.filter((task, i) => index !== i);
            // setList(filteredArray);
            //}}
            <li
              className="list-group-item d-flex justify-content-between"
              key={index}
            >
              {task.label}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
