const express=require("express");
const app=express();
const cors=require("cors");

require("dotenv").config();
const PORT=process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const auth=require('./Routes/Routess');
app.use("/api/v1",auth);

const dbconnect=require("./config/dbconnect");
dbconnect();


app.listen(22288,(req,res)=>{
    console.log(`App running on PORT ${PORT}`)
});

app.get("/",(req,res)=>{
    console.log("welcome guys in our web");
})
