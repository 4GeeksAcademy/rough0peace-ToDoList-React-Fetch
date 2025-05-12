import React from "react";

//include images into your bundle
import ToDoList from "../../js/components/ToDoList.jsx";

//create your first component
const Home = () => {
  return (
    <div className="page-body d-flex justify-content-center">
      <div className="title">
        <div className="list-body d-flex-column text-center">
          <h1>todos</h1>
        </div>
        <ToDoList />
      </div>
    </div>
  );

};

export default Home;
