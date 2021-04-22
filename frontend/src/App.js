import Navbar from './components/Navbar'
import Table from './components/Table'
// import {useState} from 'react'

function App() {
  // const [task, setTask] = useState()

  // const fetchTask = async (taskid) => {
  //   const res = await fetch(`http://localhost:8000/api/task-detail/${taskid}/`)
  //   const data = await res.json()

  //   return data
  // }
  
  // sadfadf


  return (
    <div className="container">
      <Navbar/>
      <Table/>
    </div>
  );
}

export default App;
