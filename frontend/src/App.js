import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Table from './components/Table'
import Schedule from './components/Schedule';
// import {useState} from 'react'

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar/>
      <Route path='/' exact component={Table} />
      <Route path='/schedule' component={Schedule} />
      {/* <Table/> */}
    </div>
    </Router>
  );
}

export default App;
