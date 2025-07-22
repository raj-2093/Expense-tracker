import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import { getAllExpenses, getAllExpensesBetweenDates } from "../../apis/expense/expense.api";
import { getRandomColor } from "../../utils/generalUtils";
import { getAllCategories } from "../../apis/category/category.api";

export default function ExpenseCategoryWiseChart() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // getAllExpensesBetweenDates("06-01-2025", "06-30-2025")
    getAllExpenses({
      fromDate: "06-01-2025",
      toDate: "06-30-2025"
    })
      .then((val) => {
        console.log(`rj_ useEffect > getAllExpensesBetweenDates - val = ${JSON.stringify(val)}`)

        let expenseDataMonth = [];
        
        getAllCategories().then((categories)=>{
          categories.map((category)=>{
            
            let expenseSum = 0;
            
            
            val.filter(exp => exp.category.id == category._id).map(exp => expenseSum += exp.expense.amount)
            console.log(`rj_ expenseSum - ${expenseSum}`)

            // return {
            //   category,
            //   expenseSum
            // }
            expenseDataMonth.push({
              categoryTitle: category.title,
              expenseSum
            })
          })
          
          console.log(`rj_ expenseDataMonth - ${expenseDataMonth}`)
          setExpenses(expenseDataMonth);
        })

      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-[500px] h-[500px] bg-white">
      <Bar
        data={{
          labels: expenses.map((exp) => exp.categoryTitle),
          datasets: [
            {
              label: "Expenses",
              data: expenses.map((exp) => exp.expenseSum),
            },
          ],
        }}
        options={{
          backgroundColor: expenses.map((val) => getRandomColor()),
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Expenses",
            },
            legend: {
              labels: ["Hello"],
            },
          },
        }}
      />
    </div>
  );
}
