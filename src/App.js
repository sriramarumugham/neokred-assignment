import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Auth/>} />
        <Route path={'/home'} element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App