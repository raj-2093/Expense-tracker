import { axiosInstance } from "..";
import { getAllCategories } from "../category/category.api";

/**
 * Get Expense by ID - API call
 * @param {string} id
 */
const getExpenseById = async (id) => {
  let res = "";
  try {
    res = await axiosInstance.get(`expense/get?expenseId=${id}`);
  } catch (err) {
    console.log(`rj_ getExpenseById - err - ${err}`);
  }

  return res.data.data;
};

/**
 * Get all expenses - API call
 */
const getAllExpenses = async ({
    fromDate,
    toDate,
    fetch
}) => {
  let res = "";

  let url = `expense/get/all`;

  if([fromDate, toDate, fetch].every( val => ((val!=null) && (val?.toString().trim() != "")) )) {
    url = `expense/get/all?fromDate=${fromDate}&toDate=${toDate}&fetch=${fetch}`;
  } else if ([fromDate, toDate].every( val => ((val) && (val?.toString().trim() != "")) )) {
    url = `expense/get/all?fromDate=${fromDate}&toDate=${toDate}`;
  } else if (fetch && fetch?.toString().trim() != "") {
    url = `expense/get/all?fetch=${fetch}`;
  }

  const isFromDate = (fromDate?.toString().trim() != "") && (fromDate!=null)
  const isToDate = (toDate?.toString().trim() != "") && (toDate!=null)
  const isFetchAvailable = (fetch?.toString().trim() != "") && (fetch!=null)

  if(isFetchAvailable) {
    if(Number.isNaN(Number(fetch))) throw new Error("Please provide valid number in fetch param")
  }

  url = `expense/get/all?fromDate=${isFromDate?fromDate:""}&toDate=${isToDate?toDate:""}&fetch=${isFetchAvailable?fetch:""}`;

  try {
    res = await axiosInstance.get(url);

    let categories = await getAllCategories();

    if(res.status == 204) return res;

    categories.map((category) => {
      res.data.data.map((exp, i) => {
        if (exp.category == category._id) {
          res.data.data[i].category = {
            id: category._id,
            title: category.title,
            description: category.description ? category.description : "",
          };
        }
      });
    });
  } catch (err) {
    console.log(`rj_ getExpenseById - err - ${err}`);
    throw new Error("Some error occured in while getting expenses");
  }

  return res?.data?.data;
};

/**
 * Get all expenses between dates
 * @param {Date} fromDate
 * @param {Date} toDate
 * @returns
 */
const getAllExpensesBetweenDates = async (fromDate, toDate) => {
  let res = "";
  try {
    res = await axiosInstance.get(
      `expense/get/all?fromDate=${fromDate}&toDate=${toDate}`
    );
    console.log(`rj_ res.data.data - ${res.data.data}`);

    let categories = await getAllCategories();

    console.log(
      `rj_ getAllCategories categories - ${JSON.stringify(categories)}`
    );

    categories.map((category) => {
      res.data.data.map((exp, i) => {
        if (exp.category == category._id) {
          console.log(
            `rj_ exp.category == category._id exp.date - ${exp.date} category.title - ${category.title} index - ${i}`
          );
          res.data.data[i].category = {
            // exp.category = {
            id: category._id,
            title: category.title,
            description: category.description ? category.description : "",
          };
        }
      });
    });

    
} catch (err) {
    console.log(`rj_ getExpenseById - err - ${err}`);
    throw new Error("Error");
}

return res.data.data;
};

/**
 *
 * @param {string} title
 * @param {string} subTitle
 * @param {{ currency: string, amount: number }} expense
 * @param {string} category
 */
const createExpense = async (title, subTitle, expense, category) => {
  // title, subTitle, expense, category
  let res = "";
  try {
    res = await axiosInstance.post(`expense/create`, {
      title,
      subTitle,
      expense,
      category,
    });
  } catch (err) {
    console.log(`rj_ getExpenseById - err - ${err}`);
  }

  return res;
};

const updateExpense = async (expenseId, title, subTitle, expense, category) => {
  // title, subTitle, expense, category
  let res = "";
  try {
    res = await axiosInstance.patch(`expense/update`, {
      expenseId,
      title,
      subTitle,
      expense,
      category,
    });
  } catch (err) {
    console.log(`rj_ getExpenseById - err - ${err}`);
  }

  return res;
};

export {
  getExpenseById,
  getAllExpenses,
  getAllExpensesBetweenDates,
  createExpense,
};
