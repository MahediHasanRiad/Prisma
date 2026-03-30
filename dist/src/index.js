import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import cookieParser from 'cookie-parser';
import { CreateController } from './controller/create.controller.js';
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/create', CreateController);
app.listen(3000, () => {
    console.log('server is on..');
});
//# sourceMappingURL=index.js.map