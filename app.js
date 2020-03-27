const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var socket = require('socket.io');

var server = app.listen(3002, function() {
    console.log('listening to requests on port 3002');
});

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const itemRoutes = require('./api/routes/items');

app.use(express.static('public'));

mongoose.connect('mongodb+srv://Heimot:'+ process.env.MONGOPW +'@node-rest-api-8ybrw.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser :true,
        useUnifiedTopology: true
    }
);
mongoose.Promise = global.Promise;

///////////////////////////

var io = socket(server);

io.on('connection', function(socket) {
    console.log("Connection made", socket.id);

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });
});

/////////////////////////

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/items', itemRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;