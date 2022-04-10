const express = require("express");
const app = express();
const upload = require("express-fileupload");
const data = require("./routes/data");

// middleware

app.use(express.static("./public"));
app.use(express.json());
app.use(upload());

// routes

app.use("/", data);

const port = 3000;

app.listen(port, () => console.log(`server is running on ${port}`));
