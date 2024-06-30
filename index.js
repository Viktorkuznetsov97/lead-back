const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const routers = require('./routes');
require('./database/database');

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.DOMAIN_URL,
  }),
);

app.use('/api', routers);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
