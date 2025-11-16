import express from "express";
import connectDB from './configs/database.js'
import User from './models/user.js'
const app = express();
const PORT = 7777;

app.use(express.json());


app.post("/signup" ,async(req,res)=>{
  const user = new User(req.body);
  try{
    await user.save();
    res.send("Signup Successfull!")
  }
  catch(err){
    res.status(400).send("Signup Failed due to: " + err.message)
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


