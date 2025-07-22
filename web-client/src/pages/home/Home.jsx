import React from 'react'
import { createExpense, getAllExpenses, getExpenseById } from '../../apis/expense/expense.api'
import { login } from '../../apis/auth/auth.api'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center page-sections-wrapper'>
      <h1 className='text-5xl'>Home</h1>

      <button className='btn' onClick={()=>{
        // login("abc@xyz.com", "123456").then(res => console.log(res)).catch(err=>console.log(err))
        login("lunagariyarajy2093@gmail.com", "123456").then(res => console.log(res)).catch(err=>console.log(err))
      }}>Login with test user</button>

      <button className='btn' onClick={()=>{
        getExpenseById("68791d1ec59bd69f4139ac83").then(res => console.log(res)).catch(err=>console.log(err))
      }}>Get Expense by ID</button>

      <button className='btn' onClick={()=>{
        getAllExpenses().then(res => console.log(res)).catch(err=>console.log(err))
      }}>Get all Expenses</button>


      <button className='btn' onClick={()=>{
        createExpense("Creating from react", "This is a test subtitle", {
          currency: "rupee",
          amount: 1000
        }, "FHUNNDYY").then(res => console.log(res)).catch(err=>console.log(err))
      }}>Create Expense</button>

      
    </div>
  )
}
