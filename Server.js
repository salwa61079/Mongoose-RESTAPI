const express = require('express')
const app = express()
//router
const router = express.Router();
//get the functions
const {
    findAllUsers,
    createAndSavePerson,
    editById,
    removeUserById,
} = require("./models/User");

router.get("/allUser", findAllUsers);
router.post("/addUser", createAndSavePerson);
router.put("/updateUserById/:id", editById);
router.delete("/removeUser/:id", removeUserById);

module.exports = router;


require("dotenv").config({path: "./config/.env"})
const mongoose = require ("mongoose")

//connect 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));  



//utiliser les routes
app.use("/api/user", router);

app.listen(4000, (err)=>{
    err 
       ? console.log(err)
       :console.log('the server is running on port : '+ 4000)
})