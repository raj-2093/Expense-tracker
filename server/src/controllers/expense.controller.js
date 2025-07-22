import mongoose from "mongoose";
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Category } from "../models/category.model.js";

const createExpenseHandler = asyncHandler(async (req, res) => {
  const { title, subTitle, expense, category } = req.body;

  if (
    [title, subTitle, expense, category].some(
      (val) => (val?.toString().trim() === "") || (val == null)
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (title.length < 5 || title.length > 100) {
    throw new ApiError(400, "Title must be between 5 and 100 characters long");
  }

  // if (!category.every(cat => cat.length>4 && cat.length<100)) {
  // if (category.length<4 || category.length>100) {
  //   throw new ApiError(400, "Category must be between 3 and 100 characters long");
  // }

  if(!category || category?.toString().trim() === "") throw new ApiError(400, "Category ID required");

  if (subTitle.length < 10 || subTitle.length > 500) {
    throw new ApiError(
      400,
      "Subtitle must be between 10 and 500 characters long"
    );
  }

  if (!(expense.currency || expense.amount || expense.amount?.toString().trim() === "" || expense.currency?.toString().trim() === "")) {
    throw new ApiError(400, "Expense is required");
  }

  if(expense.currency != "rupee") {
    throw new ApiError(400, "Expense currency is expected to be rupee");
  }

//   Check if the incoming amount is a valid number
// Check if the incoming date is valid

  const user = await User.findById(req.user._id)

  const categoryUnit = await Category.findById(category);

  if(!categoryUnit) throw new ApiError(400, "Please provide valid category ID");

  let expenseUnit = await Expense.create({
    title,
    subTitle,
    expense: {
        currency: expense.currency,
        amount: expense.amount
    },
    category: categoryUnit._id,
    author: user._id
  })

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        expenseUnit,
        "You have successfully created a new expense."
      )
    );
});

const updateExpenseHandler = asyncHandler(async (req, res)=> {
    const { expenseId, title, subTitle, expense, category, date } = req.body;

  if (
    [expenseId, title, subTitle, expense, category, date].some(
      (val) => (val?.toString().trim() === "") || (val == null)
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (title.length < 5 || title.length > 100) {
    throw new ApiError(400, "Title must be between 5 and 100 characters long");
  }

  // if (category.length < 5 || category.length > 100) {
  //   throw new ApiError(400, "Category must be between 5 and 100 characters long");
  // }

  if(!category || category?.toString().trim() === "") throw new ApiError(400, "Category ID required");

  if (subTitle.length < 10 || subTitle.length > 500) {
    throw new ApiError(
      400,
      "Subtitle must be between 10 and 500 characters long"
    );
  }

  if (!(expense.currency || expense.amount || expense.amount?.toString().trim() === "" || expense.currency?.toString().trim() === "")) {
    throw new ApiError(400, "Expense is required");
  }

  if(expense.currency != "rupee") {
    throw new ApiError(400, "Expense currency is expected to be rupee");
  }

//   Check if the incoming amount is a valid number
// Check if the incoming date is valid

    let expenseUnit = await Expense.findById(expenseId);

    const categoryUnit = await Category.findById(category);

  if(!categoryUnit) throw new ApiError(400, "Please provide valid category ID");


    if(!expenseUnit) throw new ApiError(404, "Expense not found.");

    expenseUnit.title = title
    expenseUnit.subTitle = subTitle
    expenseUnit.expense = {
      currency: expense.currency,
      amount: expense.amount
    }
    expenseUnit.category = categoryUnit._id
    expenseUnit.date = date

    await expenseUnit.save()

    return res
    .status(200)
    .json(
      new ApiResponse(200, expenseUnit, "Ticket status is updated successfully")
    );
})

const getExpenseHandler = asyncHandler(async (req, res)=>{
    let {
        expenseId
    } = req.query;

    if((!expenseId) || (expenseId?.toString() === "")) throw new ApiError(400, "Please provide Expense Id");

    expenseId = expenseId.toString();
    
    const expenseUnit = await Expense.findById(expenseId.toString())
    if (!expenseUnit.author.equals(req.user._id)) throw new ApiError(400, "Expense not found for the provided user");
    
    if(!expenseUnit) throw new ApiError(400, "Expense not found with the provided ID");

    res
    .status(200)
    .json(
        new ApiResponse(200, expenseUnit, "Expense Unit found and sent successfully")
    )
})

const getAllExpenseHandler = asyncHandler(async (req, res)=>{
  const {
    fromDate, toDate, fetch
  } = req.query;

  let expenses;

  const userId = req.user._id;

  // only fromDate is available
  // only toDate is available
  // both fromDate and toDate are available
  // fromDate and toDate not available
  // fromDate and fetch available
  // toDate and fetch available
  // 

  const isFromDate = (fromDate?.toString().trim() != "") && (fromDate!=null)
  const isToDate = (toDate?.toString().trim() != "") && (toDate!=null)
  const isFetchAvailable = (fetch?.toString().trim() != "") && (fetch!=null)

  if(isFetchAvailable) {
    if(Number.isNaN(Number(fetch))) throw new ApiError(400, "Please provide valid number in fetch param")
  }


  console.log(`rj_ isToDate - ${isToDate} toDate - ${toDate}`)

  if([isFromDate, isToDate, isFetchAvailable].every(val => val)) {
    expenses = await Expense.find({author: userId,  date: {$gte: new Date(fromDate), $lte: new Date(toDate)} }).sort('-date').limit(Number(fetch))
  } else if([isFromDate, isToDate].every(val => val)) {
    expenses = await Expense.find({author: userId,  date: {$gte: new Date(fromDate), $lte: new Date(toDate)} }).sort('date')
  } else if([isFromDate, isFetchAvailable].every(val => val)) {
    expenses = await Expense.find({author: userId,  date: {$gte: new Date(fromDate)} }).sort('date').limit(Number(fetch))
  } else if([isToDate, isFetchAvailable].every(val => val)) {
    expenses = await Expense.find({author: userId,  date: {$lte: new Date(toDate)} }).sort('-date').limit(Number(fetch))
  } else if(isFromDate) {
    expenses = await Expense.find({author: userId,  date: {$gte: new Date(fromDate)} }).sort('date')
  } else if(isToDate) {
    expenses = await Expense.find({author: userId,  date: {$lte: new Date(toDate)} }).sort('-date')
  } else if(isFetchAvailable) {
    expenses = await Expense.find({ author: userId }).sort('-date').limit(Number(fetch))
  } else {
    expenses = await Expense.find({ author: userId }).sort('-date')
  }

  if(expenses.length!=0) {
    res
      .status(200)
      .json(
          new ApiResponse(200, expenses, "Expenses found and sent successfully")
      )
  } else {
    res
      .status(204)
      .json(
          new ApiResponse(204, expenses, "No expenses found for the given range")
      )
  }
})

const deleteExpenseHandler = asyncHandler(async (req, res)=>{
  let {
    expenseId
  } = req.query;

  if((!expenseId) || (expenseId?.toString() === "")) throw new ApiError(400, "Please provide Expense Id");

  expenseId = expenseId.toString();
  
  const expenseUnit = await Expense.findById(expenseId);

  if(!expenseUnit) throw new ApiError(400, "Expense not found");

  const cloneExpenseUnit = expenseUnit.$clone()
  

  // if (expenseUnit.author != req.user._id) throw new ApiError(400, "Expense not found for the provided user");
  if (!expenseUnit.author.equals(req.user._id)) throw new ApiError(400, "Expense not found for the provided user");
  
  await Expense.deleteOne({ _id: expenseId });

  res
  .sendStatus(204)
})

export {
    createExpenseHandler,
    updateExpenseHandler,
    getExpenseHandler,
    getAllExpenseHandler,
    deleteExpenseHandler
}
