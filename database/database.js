const mongoose = require('mongoose');

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));
