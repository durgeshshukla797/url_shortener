const express =require('express');
const { connectToMongoDb} =require('./connect')
const urlRoute =require('./Routes/url.route')
const URL =require('./Models/url.model')
const cors =require('cors');

const app=express();
const PORT=8001;

app.use(cors());
app.use(express.json());

// sending mongodb url to connect 
connectToMongoDb('mongodb://localhost:27017/short-url')// database ka naam short-url diya hai
.then(()=>console.log("Mongodb Connected"));



app.use('/url',urlRoute); // agr koi bhi link /url se start hota hai to uske liye urlRoute use kar sakte hai

// jabhi dynamic variable ho route me toh : ke baad hi likhenge
app.get('/:shortId',async (req,res)=>{
  // 1. db se shortId se fetch karna hai ,usko increment karna and then redirect karna hai

      const shortId=req.params.shortId;
      const entry= await URL.findOneAndUpdate(
        {
        shortId
        },
      {
        $push:{
          visitHistory:{timestamp:Date.now()},
         },
      });

      res.redirect(entry.redirectUrl);
    });

app.listen(PORT,()=>console.log(`Server is running at ${PORT}`));