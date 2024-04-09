const express = require("express");
const env = require("dotenv").config();
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require('cors')
const port = process.env.PORT || 4000;
const errorHandler = require("./middlewares/errorMiddleware")

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(
  {
    origin:["https://mern-stack-frontend-five.vercel.app"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
  }
))

app.get("",(req,res)=>{
  res.send("Working successfully")
})
app.use("", routes);

// if(process.env.NODE_ENV==="production"){
//   app.use(express.static("/frontend/build"))
// }

//mongodb://localhost:27017/react-crud
app.use(errorHandler)
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("Database sucessfully connected");

  app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`);
  });
});
