
const mongoose=require('mongoose');
require("dotenv").config();

const dbconnect = ()=>{
    console.log("mongourl",process.env.MONGODB_URL);
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
     })
    .then(()=>{
        console.log("DB Connnected Successfully")})
    .catch((err)=>{
    console.error(err);
    console.log("Issue in DB connection");
    process.exit(1);
})
}
module.exports=dbconnect;

