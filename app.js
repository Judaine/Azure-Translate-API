const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const translateRoute = require('./routes/translate');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Initialize Swagger options
const options = {
    swaggerDefinition: {
        info: {
            title: 'Translate API',
            version: '1.0.0',
            description: 'Front-end API for Azure Translate Cognitive Service'
        },
        host: 'localhost:3000',
        basePath: '/',
    },
    apis: ['./test.js']
};

const specs = swaggerJsdoc(options);

//Create application
const app = express();

//Configure application
let port = 3000;
let host = 'localhost';


//Mount middleware
app.use(morgan('tiny'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

//Router for /translate
app.use('/translate', translateRoute);

//Route/URL not found
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

app.listen(port, () => {
    console.log(`Translate API listening at http://${host}:${port}`);
});