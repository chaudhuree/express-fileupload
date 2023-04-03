require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');

const express = require('express');
const app = express();
app.use(cors())
app.use(helmet({crossOriginResourcePolicy: false}))

// file upload middleware
const fileUpload = require('express-fileupload');

// database
const connectDB = require('./db/connect');

// product router
const productRouter = require('./routes/productRoutes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// static files
app.use(express.static('./public'));

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get('/', (req, res) => {
  res.send('<h1>File Upload root</h1>');
});

app.use('/api/v1/products', productRouter);
// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
