const express = require('express');
const {
  postBlog,
  editBlog,
  getBlog,
  getAllBlogs,
  getAllBlogsOfAnUser,
} = require('../controllers/blogController');
const router = express.Router();

router.route('/').post(postBlog).put(editBlog);
router.get('/bulk', getAllBlogs);
router.get('/bulkUser', getAllBlogsOfAnUser);
router.get('/:id', getBlog);

module.exports = router;
