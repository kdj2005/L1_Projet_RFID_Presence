const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const connectDB = require("./connexion");
const userRoute = require("./route/userRoute");
connectDB();




app.use(express.json());
app.use("/api/user", userRoute);
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/inscription.html");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});