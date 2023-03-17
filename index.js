require('dotenv').config();

const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const userRouter = require('./routes/user.route');
const movierouter = require('./routes/movie.route');
const connectDB = require('./config/connectDB')

const app = express();

app.use(express.json());

app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(cors());

app.use('/users', userRouter);
app.use('/movies', movierouter);

app.get('/', (req, res)=>{
    res.send('welcome to VidStream');
})

connectDB().then(()=>{
    app.listen(port = 8080, () => console.log('Server listening on http://localhost:'+port));
});