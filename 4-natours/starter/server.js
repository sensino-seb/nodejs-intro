const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<DB_PASSWORD>',
  process.env.DB_PASSWORD
).replace('<DB_USER>', process.env.DB_USER);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection established!'));

// 3) START SERVER
const port = process.env.PORT || 3000;
app.listen(process.env.port, (req, res) => {
  console.log(`Express server is listening on port: ${port}`);
});
