import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [task, setTask] = useState<any>([])

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL as string)
    .then((response) => setTask(response.data))
  },[])

  return (
    <div className="App">
      {task.map( (each: { task: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
        return (
          <div>{each.task} </div>
        )
      })}
    </div>
  );
}

export default App;
