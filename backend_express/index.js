const express = require('express');
const app = express();

app.use(express.json());

const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/blogRouter');
const authMiddleware = require('./middlewares/authMiddleware');

app.get('/test', (req, res) => {
  res.send('You are good!');
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', authMiddleware, blogRouter);

app.listen(3000, (req, res) => {
  console.log('server is listening on port 3000...');
});
