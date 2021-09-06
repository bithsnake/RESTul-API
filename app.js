import express from 'express';
var app = express();

app.get('/', (req, res) => {
    res.send("Hello world")
    console.table(`status from res: ${res}`);
});




app.listen(3000);