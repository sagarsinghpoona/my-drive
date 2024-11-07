const express = require('express');
const app = express();
const userrouter = require('./routes/user.routes');
const indexrouter = require('./routes/index.routes');
require('dotenv').config();


const { configDotenv } = require('dotenv');
configDotenv

const connecttodb = require('./config/db');
const user = require('./models/usermodels');
const cookieParser = require('cookie-parser');

const { createClient } = require('@supabase/supabase-js');



const port = process.env.Port || 3000;

app.set("view engine", "ejs")
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




app.use('/',userrouter)
app.use('/',indexrouter)




























app.listen(port ,()=>{
   console.log('server is running at',port)
})