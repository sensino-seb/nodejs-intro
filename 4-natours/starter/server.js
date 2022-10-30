const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/config.env` });
const app = require('./app');

// 3) START SERVER
const port = process.env.PORT || 3000;
app.listen(process.env.port, (req, res) => {
  console.log(`Express server is listening on port: ${port}`);
});
