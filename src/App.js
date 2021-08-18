import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Table from './components/Table'
import Schedule from './components/Schedule';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {

  return (
    <div className="container">
      <Navbar/>
      <Table/>
    </div>
  );
}

export default App;
