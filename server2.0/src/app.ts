import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { userRouter } from './users/infra/http/routes';
import { middleware, errorHandler } from 'supertokens-node/framework/express';

supertokens.init({
  framework: 'express',
  supertokens: {
    // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
    connectionURI:
      'https://2d8b2ca1cdf511ec964f014fe604f8e7-eu-west-1.aws.supertokens.io:3568',
    // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
    apiKey: 'MQWVdONmPFLNUbgUIkZycv=qSgbcX-',
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: 'MinasPhone',
    apiDomain: 'http://localhost:8080',
    websiteDomain: 'http://localhost:3000',
    apiBasePath: '/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    EmailPassword.init(), // initializes signin / sign up features
    Session.init(), // initializes session features
  ],
});

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
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

app.use('/user', userRouter);
// app.post('/refresh', supertokens.middleware(), (req, res) => {
//   res.send('');
// });

// Add this AFTER all your routes
app.use(errorHandler());

// my own error handler
// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => { /* ... */ });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
