const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { createBlogInput } = require('@rahulbauri/medium-common');
const { updateBlogInput } = require('@rahulbauri/medium-common');

const postBlog = async (req, res) => {
  const { title, content } = req.body;
  const { success } = createBlogInput.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: 'Inputs not correct' });
  }
  const authorId = req.userId;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return res.json({ id: post.id });
  } catch (error) {
    return res.status(400).json({ error: 'invalid data' });
  }
};

const editBlog = async (req, res) => {
  const { success } = updateBlogInput.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: 'Inputs not correct' });
  }
  const post = await prisma.post.update({
    where: { id: req.body.id, authorId: req.userId },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });

  return res.json({ msg: 'post updated successfully' });
};

const getBlog = async (req, res) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!post) {
    return res.json({ msg: `No post with id : ${req.params.id} found!` });
  }
  return res.json(post);
};

const getAllBlogs = async (req, res) => {
  const posts = await prisma.post.findMany({});

  return res.json(posts);
};

const getAllBlogsOfAnUser = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: req.userId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
    },
  });

  return res.json(posts);
};

module.exports = {
  postBlog,
  editBlog,
  getBlog,
  getAllBlogs,
  getAllBlogsOfAnUser,
};
