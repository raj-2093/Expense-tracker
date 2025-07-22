import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import ExpenseLog from '../pages/expenseLog/ExpenseLog'

export default function WebRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/expense-log' element={<ExpenseLog/>}></Route>
    </Routes>
  )
}
