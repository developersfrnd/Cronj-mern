import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";


function App() {
  const [listOfTasks, setListOfTasks] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState(0);
  
  useEffect(() => {
    Axios.get("http://localhost:3001/getTasks").then((response) => {
      setListOfTasks(response.data);
    });
  }, []);

  const createTask = () => {
    Axios.post("http://localhost:3001/createTask", {
      name,
      date
    }).then((response) => {
      setListOfTasks([
        ...listOfTasks,
        {
          name,
          date,
        },
      ]);
    });
  };

  const deleteTask = (taskId) => {
    Axios.delete(`http://localhost:3001/deleteTask/${taskId}`).then((response) => {
      let tasks = listOfTasks.filter((task) => {
        return task._id !== taskId
      })
      setListOfTasks(tasks);
    });
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Title..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="date"
          placeholder="Date"
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        
        <button onClick={createTask}> Create Task </button>
      </div>
          <hr />
      <div className="usersDisplay">
        <table width="100%" align="center" border="1px;">
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
        {listOfTasks.map((task) => {
          return (
            <tr>
              <td>{task.name}</td>
              <td>{task.date}</td>
              <td><button onClick={() => deleteTask(task._id)}>Delete</button></td>
            </tr>
          );
        })}
        </table>
      </div>
    </div>
  );
}

export default App;
