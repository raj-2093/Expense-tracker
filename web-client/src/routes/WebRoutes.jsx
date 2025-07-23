import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import ExpenseLog from '../pages/expenseLog/ExpenseLog'
import { useAuth } from '../context/auth/AuthProvider'
import Loader from '../components/loader/Loader'
import Signup from '../pages/signup/Signup'
import UserSettings from '../pages/settings/UserSettings'

export default function WebRoutes() {
  const {
    isUserLoggedIn
  } = useAuth()

  return (
    <Routes>
      {/* Protected Routes */}
        <Route path='/' element={<Loader><Home/></Loader>}></Route>
        <Route path='/expense-log' element={<Loader><ExpenseLog/></Loader>}></Route>
        <Route path='/account' element={<Loader><UserSettings/></Loader>}></Route>

      {/* Public Routes */}
        <Route path='/login' element={<Loader><Login/></Loader>}></Route>
        <Route path='/signup' element={<Loader><Signup/></Loader>}></Route>
    </Routes>
  )
}
