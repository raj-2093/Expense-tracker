import React, { useEffect, useState } from "react";
import { getAllExpenses } from "../../apis/expense/expense.api";
import DatePicker from "../../components/datepicker/DatePicker";

export default function ExpenseLog() {
  const [expenses, setExpenses] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fetchMore, setFetchMore] = useState(true);
  const [isExpenseListAsc, setIsExpenseListAsc] = useState(null);
  const [appendToTheCurrent, setAppendToTheCurrent] = useState(false);

  useEffect(() => {
    console.log(`rj_ useEffect(()=>{ - ran`);
    console.log(`rj_ fetchmore -- ${fetchMore}`);
    setFetchMore(true);
    console.log(`rj_ value of expenses.length -- ${expenses.length}`);
    fetchSome(fromDate, toDate, appendToTheCurrent);
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchSome(fromDate, toDate, appendToTheCurrent);
  }, [fetchMore, appendToTheCurrent]);

  const fetchSome = (fromDate, toDate, appendToTheCurrent) => {
    let isAsc = null;
    let inputObj = {
      fetch: 20,
      toDate: toDate,
    };

    if (!fetchMore) return;

    if(fromDate != null && fromDate?.toString().trim() != "") {
      let fromDateConvert = new Date(fromDate)
      console.log(`rj_ fromDateConvert -- ${fromDateConvert}`)
      console.log(`rj_ fromDate -- ${fromDate}`)
      fromDate = fromDateConvert.getMonth() + 1
      fromDate = fromDate + "-" + fromDateConvert.getDate()
      fromDate = fromDate + "-" + fromDateConvert.getFullYear()
    }

    if(toDate != null && toDate?.toString().trim() != "") {
      let toDateConvert = new Date(toDate)
      console.log(`rj_ toDateConvert -- ${toDateConvert}`)
      console.log(`rj_ toDate -- ${toDate}`)
      toDate = toDateConvert.getMonth() + 1
      toDate = toDate + "-" + toDateConvert.getDate()
      toDate = toDate + "-" + toDateConvert.getFullYear()
    }

    if (
      [toDate, fromDate].every(
        (val) => val != null && val?.toString().trim() != ""
      )
    ) {
      inputObj = {
        fetch: 20,
        toDate,
        fromDate,
      };
      setIsExpenseListAsc(true);
    } else if (toDate != null && toDate?.toString().trim() != "") {
      inputObj = {
        fetch: 20,
        toDate,
      };

      setIsExpenseListAsc(false);
    } else if (fromDate != null && fromDate?.toString().trim() != "") {
      console.log(`rj_ fromdate - fromDate - ${fromDate}`);
      inputObj = {
        fetch: 20,
        fromDate: fromDate,
      };

      setIsExpenseListAsc(true);
    } else {
      inputObj = {
        fetch: 20,
      };

      setIsExpenseListAsc(false);
    }

    console.log(
      `rj_ Expense log > fetchSome - inputobject= ${JSON.stringify(inputObj)}`
    );

    getAllExpenses(inputObj)
      .then((exp) => {
        if (exp.status == 204) {
          setFetchMore(false);
          return;
        }
        if(appendToTheCurrent) setExpenses((val) => [...val, ...exp]);
        else setExpenses(exp);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] page-sections-wrapper">
      <section className="heading">
        <h1 className="text-5xl text-center">Expense Log</h1>
      </section>

      <section className="date-range-pickers">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="date-pickers">
            <DatePicker label={"From Date"} pickerId={"fromDate"} />
            <DatePicker label={"To Date"} pickerId={"toDate"} />
          </div>
          <button
            onClick={() => {
              const fromDateValue =
                document.querySelector("input#fromDate").value;
              const toDateValue = document.querySelector("input#toDate").value;
              console.log(
                `rj_ filter -- fromDateValue - ${fromDateValue} toDateValue - ${toDateValue}`
              );

              setFromDate(fromDateValue);
              setToDate(toDateValue);
              setAppendToTheCurrent(false);
            }}
          >
            Filter
          </button>
        </div>
      </section>

      <section className="expense-log max-w-[85vw] ml-auto mr-auto">
        <div className="logs-wrapper overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Expense</th>
                <th>Config</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, i) => {
                return (
                  <tr className="expense">
                    <th>{i + 1}</th>
                    <td className="min-w-[120px]">{exp.title}</td>
                    <td className="min-w-[120px]">{exp.category.title}</td>
                    <td className="min-w-[120px]">
                      {new Date(exp.date).toDateString()}
                    </td>
                    <td className="min-w-[120px]">
                      {exp.expense.currency == "rupee"
                        ? "₹"
                        : exp.expense.currency}{" "}
                      {exp.expense.amount}
                    </td>
                    <td>
                      <div className="flex gap-2 items-start">
                        <button className="hover:cursor-pointer" title="edit">
                          📝
                        </button>
                        <button className="hover:cursor-pointer" title="delete">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>
                  <button
                    onClick={() => {
                      if (expenses.length != 0) {
                        if (isExpenseListAsc) {
                          let fromDate = new Date(
                            expenses[expenses.length - 1].date
                          );
                          fromDate.setDate(fromDate.getDate() + 1);
                          setFromDate(fromDate.toISOString())
                          setToDate("")
                        } else {
                          let toDate = new Date(expenses[expenses.length - 1].date);
                          toDate.setDate(toDate.getDate() - 1);
                          setToDate(toDate.toISOString())
                          setFromDate("")
                        }
                        setAppendToTheCurrent(true)
                      }
                    }}
                  >
                    Fetch Some
                  </button>
                </th>
              </tr>
              {/* <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Expense</th>
                <th>Config</th>
              </tr> */}
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
