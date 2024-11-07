const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sagar:sagar@atlascluster.tnx2t.mongodb.net/drive').then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});