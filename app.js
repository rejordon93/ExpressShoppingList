const express = require('express');
const items = require('./fakeDb');
const routers = require('./routers')

const app = express();

app.use(express.json());

app.use('/items', routers)
app.use('/addItems', routers)
app.use('/items/name', routers)
app.use('/items/name', routers)



app.use(function (req,res) {
  return new ExpressError('Not Found', 404)
})


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
  });
});




app.listen(3000, () => {
  console.log('Server starting on port 3000');
});
