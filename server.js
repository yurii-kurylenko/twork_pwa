const express = require('express');
const path = require('path')

const port = process.env.PORT || 8080

const app = express();

app.use(express.static('dist'));

app.get('*/*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
  console.log('We are live on ' + port);
});
