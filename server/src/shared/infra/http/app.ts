import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import multer from 'multer';
import listEndpoints from 'express-list-endpoints';
import supertokens from 'supertokens-node';
import { middleware, errorHandler } from 'supertokens-node/framework/express';
import { supertokensInit } from '../../../modules/users/super-tokens';
import { userRouter } from '../../../modules/users/infra/http/routes';
import { v1Router } from './api/v1';

supertokensInit();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }),
);
/**
 *  This middleware adds a few APIs
 * POST /auth/signup: For signing up a user with email & password
 * POST /auth/signin: For signing in a user with email & password
 */

app.use(middleware());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', v1Router);
// app.post('/refresh', supertokens.middleware(), (req, res) => {
//   res.send('');
// });

// Add this AFTER all your routes
app.use(errorHandler());

// my own error handler
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => { /* ... */ });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.table(listEndpoints(app));
});
