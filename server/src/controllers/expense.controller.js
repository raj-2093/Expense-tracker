import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

  if (category.length < 3 || category.length > 100) {
    throw new ApiError(400, "Category must be between 5 and 100 characters long");
  }

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

  let expenseUnit = await Expense.create({
    title,
    subTitle,
    expense: {
        currency: expense.currency,
        amount: expense.amount
    },
    category,
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

  if (category.length < 5 || category.length > 100) {
    throw new ApiError(400, "Category must be between 5 and 100 characters long");
  }

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


    if(!expenseUnit) throw new ApiError(404, "Expense not found.");

    expenseUnit.title = title
    expenseUnit.subTitle = subTitle
    expenseUnit.expense = {
      currency: expense.currency,
      amount: expense.amount
    }
    expenseUnit.category = category
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
  const userId = req.user._id;

  const expenses = await Expense.find({author: userId})

  res
    .status(200)
    .json(
        new ApiResponse(200, expenses, "Expense Unit found and sent successfully")
    )
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
