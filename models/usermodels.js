const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minlength:[3,'username must be at least more than 3 character'],


  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minlength:[5,'Email must be at least 5 characterlong']
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:[8,'password must be at least 8 character long']
  }


})

const usermodel =  mongoose.model('userdata',userSchema);
module.exports = usermodel