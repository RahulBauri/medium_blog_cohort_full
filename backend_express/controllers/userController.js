const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const { signupInput } = require('@rahulbauri/medium-common');
const { signinInput } = require('@rahulbauri/medium-common');

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const { success } = signupInput.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: 'Inputs not correct' });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: 'error while signing up' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { success } = signinInput.safeParse(req.body);
  if (!success) {
    return res.status(411).json({ msg: 'Inputs not correct' });
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(403).json({ msg: 'User not found!' });
  }

  if (password !== user.password) {
    return res.status(403).json({ msg: 'Wrong password!' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return res.json({ token });
};

module.exports = {
  signupUser,
  loginUser,
};
