import express from "express";
import { getAllBlogs, getBlogDetail , getBlogsHome } from '../controllers/blogController.js';
import { getAllBlogsSchema } from "../validators/blogValidator.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

 

// Lấy danh sách blog với pagination (page + pageSize trong body)
router.get("/getallblog", validate(getAllBlogsSchema), getAllBlogs);
router.get('/:slug', getBlogDetail);
router.get("/", getBlogsHome);

export default router;
