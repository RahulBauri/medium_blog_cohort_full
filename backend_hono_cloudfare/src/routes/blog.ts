import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@rahulbauri/medium-common';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// middleware
blogRouter.use('/*', async (c, next) => {
  const jwt = c.req.header('Authorization');

  if (!jwt || typeof jwt !== 'string' || !jwt.startsWith('Bearer ')) {
    c.status(401);
    return c.json({ error: 'unauthorized - please login' });
  }

  const token = jwt.split(' ')[1];

  if (
    token === 'null' ||
    token === '' ||
    token === undefined ||
    token === null
  ) {
    c.status(401);
    return c.json({ msg: 'unauthorized - invalid or missing token' });
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload) {
      c.status(401);
      return c.json({ msg: 'unauthorized - invalid token' });
    }

    c.set('userId', String(payload.id));
    await next();
  } catch (error) {
    console.log(error);
    c.json({ msg: 'error while auth' });
  }
});

blogRouter.post('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: 'Inputs not correct' });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (error) {
    console.log(error);
    return c.json({ msg: 'error while creating the blog' });
  }
});

blogRouter.put('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: 'Inputs not correct' });
  }

  const post = await prisma.post.update({
    where: { id: body.id, authorId: userId },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ msg: 'post updated successfully' });
});

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({ posts });
  } catch (error) {
    console.log(error);
    return c.json({ msg: 'error while getting all the blogs' });
  }
});

blogRouter.get('/bulkUser', async (c) => {
  const userId = c.get('userId');

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
      },
    });
    return c.json(posts);
  } catch (error) {
    console.log(error);
    return c.status(404);
  }
});

blogRouter.get('/user', async (c) => {
  const userId = c.get('userId');

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  c.status(201);
  return c.json({ user });
});

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ post });
});

blogRouter.get('/user', async (c) => {
  const userId = c.get('userId');

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  c.status(201);
  return c.json({ user });
});
