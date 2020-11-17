import express from "express"
//import path from "path"

//const express = require('express');
const app = express();
const staticMiddleware = express.static("dist");
const port = 3000;

app.use(staticMiddleware);

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server runs at port ${port}`);
});
