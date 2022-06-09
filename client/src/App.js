import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
