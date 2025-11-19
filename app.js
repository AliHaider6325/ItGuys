import express from "express";
import connectDB from './configs/database.js'
import User from './models/user.js'
import ValidateSignup from './utils/validation.js'
import ValidateLogin from './utils/validation.js'
import bcrypt from 'bcrypt'

const app = express();
const PORT = 7777;

app.use(express.json());

app.post("/signup",async(req,res)=>{
  try{

    //Step 01 Validations
    ValidateSignup(req);
    const {firstName,lastName,emailId,password} = req.body;
    const existingUser = await User.findOne({emailId:emailId})
    if(existingUser){
      throw new Error("User already exist!")
    }
    // Step 02 Encryption 
    const hashedpassword = await bcrypt.hash(password, 10)
    // Step 03 Inserting in DB
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:hashedpassword
    });
    await user.save();
    res.send("Signup Successfull!")
  }
  catch(err){
    res.status(400).send("Signup Failed due to: " + err.message)
  }

})

app.post("/login",async(req,res)=>{
  //Step 01 Validating
  try{
  ValidateLogin(req);
  const {emailId,password} = req.body;
  const user = await User.findOne({emailId:emailId})
  if(!user){
    throw new Error("Invalid credentials")
  }
  //Step 02 Comparing passwords
  const realpassword = user.password;
  const isMatch = await bcrypt.compare(password, realpassword)
  if(isMatch){
  res.send("LogIn Successfull")
  }
  else{
    throw new Error("Invalid credentials")
  }
}
catch(err){
   res.status(400).send("Login Failed due to: " + err.message)
}
})



app.delete("/user", async (req,res)=>{
  try{
    const user = await User.findByIdAndDelete(req.body._id)
    if(user){
    res.send(user + "User Deleted")
    }
    else{
      res.send("User Not Found")
    }

  }
  catch(err){
    res.send("Something went wrong!")
  }
})

app.post("/user", async (req, res) => {
  try {
    const userEmail = await req.body.emailId;

    const user = await User.findOne({ emailId: userEmail });

    if (user) {
      res.send(user);
    } else {
      res.send("User not found!");
    }
  } catch (err) {
    res.status(400).send("Something went wrong!!");
  }
});


app.get("/feed",async (req,res) => {
  const users = await User.find({});
  try{
  if(users){
    res.send(users)
  }
  else{
    res.send("No Users Found!")
  }
  }
  catch(err){
    res.status(400).send("Something went wrong!")
  }
})

app.post("/userById", async (req,res)=>{
  // const id = req.body._id;
  try{
    const user = await User.findById(req.body._id);
    if(user.length!==0){
      res.send(user);
    }
    else{
      res.send("User not found!");
    }
  }
  catch(err){
    res.status(400).send("Something went wrong!")
  }
})

app.patch("/user",async (req,res)=>{
  try{
    const user = await User.updateOne(req.body)
    if(user){
      res.send("Updated!")
    }
    else{
      res.send("User not found!");
    }
  }
  catch(err){
    res.status(400).send("Something went wrong!")
  }
})

connectDB().then(()=>{
    console.log("Connected to the database!")
    app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
})
.catch((err)=>{
    console.log("Error while connecting!" , err)
})


