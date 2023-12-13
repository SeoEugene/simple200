const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 5050;
const config = require("./config/key.js");  // 환경변수 설정

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express.router
app.use("/api/post", require("./router/Post.js"));
app.use("/api/user", require("./router/user.js"));

app.listen(port, () => {
    mongoose.connect(config.mongoURI)
        .then(() => {
            console.log("listening  --> " + port);
            console.log("mongoose --> connecting");
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});