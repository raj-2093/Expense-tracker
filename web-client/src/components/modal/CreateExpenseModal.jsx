import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../apis/category/category.api";
import { createExpense } from "../../apis/expense/expense.api";

export default function CreateExpenseModal({ modalId }) {
  const [expenseDetails, setExpenseDetails] = useState({
    title: "",
    subTitle: "",
    expense: {
      currency: "rupee",
      amount: "",
    },
    category: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        console.log(`rj_ getAllCategories - ${JSON.stringify(res)}`)
        setCategories(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(`rj_ onSubmit > expenseDetails - ${JSON.stringify(expenseDetails)}`)
    createExpense(expenseDetails.title, expenseDetails.subTitle, expenseDetails.expense, expenseDetails.category).then(res => console.log(res)).catch(err => console.log(err))
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create Expense</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog" onSubmit={onSubmit}>
            {/* if there is a button in form, it will close the modal */}

            <div>
              <label className="label">Enter expense title</label>
              <input
                type="text"
                className="input"
                placeholder="Expense Title"
                value={expenseDetails.title}
                onChange={(e) => {
                  setExpenseDetails((expDets) => ({
                    ...expDets,
                    title: e.target.value,
                  }));
                }}
              />
              {/* <p className="label">Optional</p> */}
            </div>

            <div>
              <label className="label">Enter additional description</label>
              <input
                type="text"
                className="input"
                placeholder="description"
                value={expenseDetails.subTitle}
                onChange={(e) => {
                  setExpenseDetails((expDets) => ({
                    ...expDets,
                    subTitle: e.target.value,
                  }));
                }}
              />
            </div>

            <div>
              <label className="label">Enter expense amount</label>
              <input
                type="text"
                className="input"
                placeholder="amount"
                value={expenseDetails.expense.amount}
                onChange={(e) => {
                  setExpenseDetails((expDets) => ({
                    ...expDets,
                    expense: {
                      currency: "rupee",
                      amount: e.target.value,
                    },
                  }));
                }}
              />
            </div>

            <div>
              <label className="label">Select Category</label>
              <select name="Category" id="category" onChange={(e)=>{
                setExpenseDetails((expDets) => ({...expDets, category: e.target.value}))
              }}
              value={expenseDetails.category}
              >
                <option value="none">None</option>
                {categories?.map((cat) => {
                  return (
                    <>
                      <option value={cat._id}>{cat.title}</option>
                    </>
                  );
                })}
              </select>
            </div>

            <input type="submit" value="Submit" className="btn" />

            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
