const express = require('express');
const router = express .Router();
const { body,validationResult } = require('express-validator');
const usermodel= require('../models/usermodels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




router.get('/',(req,res)=>{
    res.render('register');
})
router.post('/',
 body('email').trim().isEmail().isLength({min:5}),
body('password').trim().isLength({min:8}),
body('username').trim().isLength({min:3}),
async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.arrays(),
            message:'inavlid data'
        })
    }
    const { email,password,username}=req.body;

        const newuser = await usermodel.create({
            username,
            email,
            password:bcrypt.hashSync(password,10)
            
            
        })
        await newuser.save();
        res.redirect('login');
    
  })





  router.get('/login',(req,res)=>{
    res.render('login');
  })
         

  router.post('/login',
  body('email').trim().isEmail().isLength({min:5}),
  body('password').trim().isLength({min:8}),
  body('username').trim().isLength({min:3}),
  async (req, res) => {

    const { username,password} =  req.body;
    const user = await usermodel.findOne({username});
    if(!user){
        return res.status(400).json({
            message:'invalid username or password'
        })
    }else{
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:'invalid username or password'
            })
        }else{
            res.redirect('home')
        }
    }
    var token = jwt.sign({ user:user.username,userID:user._id}, 'shhhhh');
    console.log(token)
    
   

  })
    




    




module.exports = router;