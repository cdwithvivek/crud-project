const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','html','index.html'));
})

app.get('/tailwindcss', (req, res) => {
    res.render('home');
})

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});