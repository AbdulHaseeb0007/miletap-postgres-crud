const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./src/routes');
const errorMiddleware = require('./src/middlewares/error.middleware');

const app = express();
const port = process.env.PORT | 8000;

const corsMiddleware = cors({ origin: '*' });

app.use(express.json())
    .use(corsMiddleware)
    .use(helmet({ crossOriginResourcePolicy: false }))
    .use(router)
    .use(errorMiddleware)
    .listen(port, () => console.log(`server is running on port ${port}`));
