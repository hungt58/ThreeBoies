import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import blogRouter from './src/routes/blogRoutes.js';
import errorHandler from './src/middlewares/errorHandler.js';

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/blogs', blogRouter);

// Middleware handle lỗi
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
