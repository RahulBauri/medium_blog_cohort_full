import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { signupInput } from '@rahulbauri/medium-common';
import { signinInput } from '@rahulbauri/medium-common';
import { hashPassowrd, isPasswordCorrect } from '../utils/utils';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: 'Inputs not correct' });
  }

  const hashedPassword = await hashPassowrd(body.password);

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    const jwt = await sign({ id: user.id }, c.env?.JWT_SECRET);

    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ msg: 'error while signing up' });
  }
});

userRouter.post('/login', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: 'Inputs not correct' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ msg: 'Incorrect email or password' });
    }

    const passwordCorrect = await isPasswordCorrect(
      body.password,
      user.password
    );

    if (!passwordCorrect) {
      c.status(403);
      return c.json({ msg: 'Incorrect email or password' });
    }

    const jwt = await sign({ id: user.id }, c.env?.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(411);
    return c.json({ msg: 'Invalid' });
  }
});
