import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCategoryHandler = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || title?.toString().trim() === "")
    throw new ApiError("400", "Category title is required");

  let category = {};

  if (!description || description?.toString().trim() === "") {
    category = await Category.create({
      title,
      author: req.user._id,
    });
  } else {
    category = await Category.create({
      title,
      description: description.toString(),
      author: req.user._id,
    });
  }

  res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

const getAllCategories = asyncHandler(async (req, res)=>{
    const categories = await Category.find({ author: req.user._id })

    res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories found and sent successfully"))
})

const updateCategoryHandler = asyncHandler(async (req, res) => {
    const {
        categoryId,
        title,
        description
    } = req.body;

    // Check if title is present and not "" string
    // if description is present and not "" update description
    // Check categoryId present and category exist for it

    if (!categoryId || categoryId?.toString().trim() === "") throw new ApiError("400", "Category Id is required");

    if (!title || title?.toString().trim() === "")
    throw new ApiError("400", "Category title is required");

    let category = await Category.findById(categoryId);

    if(!category) throw new ApiError("400", "Category not found for the provided ID");

    if(!category.author._id.equals(req.user._id)) throw new ApiError("400", "Category not found");

    category.title = title;
    if (description && description?.toString().trim() != "") {
        category.description = description;
    }

    await category.save()

    res
    .status(201)
    .json(new ApiResponse(201, category, "Category updated successfully"))
}) 

const deleteCategoryHandler = asyncHandler(async (req, res)=>{
    const {
        categoryId
    } = req.query;

    if (!categoryId || categoryId?.toString().trim() === "") throw new ApiError("400", "Category Id is required");

    let category = await Category.findById(categoryId);

    if(!category) throw new ApiError("400", "Category not found for the provided ID");

    if(!category.author._id.equals(req.user._id)) throw new ApiError("400", "Category not found");

    await Category.deleteOne({ _id: category._id })

    res
    .status(204)
    .json(new ApiResponse(204, category, "Category deleted successfully"))
})

export {
    createCategoryHandler,
    getAllCategories,
    updateCategoryHandler,
    deleteCategoryHandler
}