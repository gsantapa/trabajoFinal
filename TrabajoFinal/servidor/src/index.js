const express = require('express');
const path = require('path');
const port = 3000;
const cookieParser = require('cookie-parser');

const routes = require('./routes/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const cors = require('cors')


const app = express();

app.use(cors())

app.use(cookieParser());


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());




routes(app);

app.use((err,req,res,next)=>{
 
  console.log("errors: ", err);
  res.status(err.status);
});
app.use(( err,req,res,next)=>{
  res.status(404);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
