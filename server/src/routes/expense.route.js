import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createExpenseHandler, deleteExpenseHandler, getAllExpenseHandler, getExpenseHandler, updateExpenseHandler } from "../controllers/expense.controller.js";

const router = Router()

router.route("/create").post(verifyJWT, createExpenseHandler)
router.route("/delete").delete(verifyJWT, deleteExpenseHandler)
router.route("/update").patch(verifyJWT, updateExpenseHandler)

router.route("/get").get(verifyJWT, getExpenseHandler)
router.route("/get/all").get(verifyJWT, getAllExpenseHandler)

export default router;