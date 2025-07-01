import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors({origin: '*'}));

app.use(express.json());
app.use(cookieParser());
app.use(routes);

export default app;