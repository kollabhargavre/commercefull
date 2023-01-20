import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
