const express = require("express");
const dotenv = require("dotenv");
const users = require('./routes/users');
const account = require("./routes/account")


dotenv.config();

/***************    DATABASE CONNECTION ***************** */
const connectDB = require("./configs/db");
connectDB();
/********************************************************** */


const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));


// test route
app.get('/', (req, res)=> {
    res.send('Hello World')
})



// api routes
app.use('/api', users);
app.use('/api', account)


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));