const app = require('./app');

const port = 5000;

// 3) START SERVER
app.listen(port, (req, res) => {
  console.log(`Express server is listening on port: ${port}`);
});
