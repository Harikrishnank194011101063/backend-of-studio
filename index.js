const express=require("express");
const cors=require("cors")
const app=express();
const mongoose=require("mongoose");
const authRoutes = require("./Routes/authRoutes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")

dotenv.config()

app.listen(4101,()=>{console.log("works at 4101")});
//console.log("I got here");
mongoose.connect(process.env.MONGO_URI,
{
useNewUrlParser:true,
useUnifiedTopology:true,
})

.then(()=>{
console.log("db connected successfully");

})
.catch((err)=>{
console.log(err);


});





app.use(
cors({
origin:["http://localhost:3000"],
methods:["GET","POST"],
credentials:true,




}



));
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);
























