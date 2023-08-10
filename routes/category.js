import { AuthMiddleware, IsAdmin } from "../middlewares/authorization.js";
import {CategoryController, CreateCategory, DeleteController, SingleController, UpdateCategory} from "../controllers/createCategory.js";

import express from "express";

const router = express.Router()

router.post('/create-category', AuthMiddleware, IsAdmin, CreateCategory )
router.put('/update-category/:id', AuthMiddleware, IsAdmin, UpdateCategory)
router.get('/get-category', CategoryController)
router.get('/single-category/:slug', SingleController)
router.delete('/delete-category/:id', AuthMiddleware, IsAdmin, DeleteController)
export default router;