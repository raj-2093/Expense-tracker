import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCategoryHandler, deleteCategoryHandler, getAllCategories, updateCategoryHandler } from "../controllers/category.controller.js";

const router = Router()

router.route("/create").post(verifyJWT, createCategoryHandler)
router.route("/delete").delete(verifyJWT, deleteCategoryHandler)
router.route("/update").patch(verifyJWT, updateCategoryHandler)

// router.route("/get").get(verifyJWT, getExpenseHandler)
router.route("/get/all").get(verifyJWT, getAllCategories)

export default router;