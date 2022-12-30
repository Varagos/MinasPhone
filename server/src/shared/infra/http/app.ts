import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import listEndpoints from 'express-list-endpoints';
import supertokens from 'supertokens-node';
import {
  middleware,
  errorHandler,
} from 'supertokens-node/framework/express/index.js';
import { supertokensInit } from '../../../modules/auth/services/super-tokens/super-tokens-init.js';
import { v1Router } from './api/v1.js';

supertokensInit();

const allowedOrigins = [
	'http://localhost:3000', 
	'http://localhost:3001',
	'http://admin.minasphone.gr',
	'http://www.admin.minasphone.gr',
	'http://minasphone.gr',
	'http://www.minasphone.gr',
	'https://admin.minasphone.gr',
	'https://www.admin.minasphone.gr',
	'https://minasphone.gr',
	'https://www.minasphone.gr'
]


const app = express();
const port = process.env.PORT || 8080;
app.use(
  cors({
    origin: allowedOrigins,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('images'));

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
