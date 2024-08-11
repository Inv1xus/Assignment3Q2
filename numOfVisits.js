const express=require('express');
const port=process.env.PORT ||3000;
const cookieParser=require('cookie-parser');

const app=express();
app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies.visits) {
        const date= new Date();
        let visits = parseInt(req.cookies.visits);
        res.cookie('visits', visits + 1);
        res.send(`Hello, this is the ${visits + 1} time that you are visiting my webpage. Last time you visited my webpage on: ${date}`);
    } else {
        res.cookie('visits', 1 );
        res.send("Welcome to my webpage! It is your first time that you are here.");
    }
});

// Route to reset visit count
app.get('/reset', (req, res) => {
    res.cookie('visits', 0, { maxAge: 0 }); // Expire the cookie immediately
    res.send("Visit count has been reset.");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
