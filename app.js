//Node Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const swaggerUi = require('swagger-ui-express');

//Routes for API calls
const translateRoute = require('./routes/translateRoute');
const dictionaryRoute = require('./routes/dictionaryRoute');


//Initialize Swagger options
const options = {
    info: {
      version: '1.0.0',
      title: 'Translate API',
      description: 'Front-end API for Microsoft Azure\'s Translation Cognitive Service: ' + "https://azure.microsoft.com/en-us/services/cognitive-services/translator/"
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './routes/**.js',
    swaggerUIPath: '/api-docs'
  };

//Create application
const app = express();

//Initialitze JS-Doc
expressJSDocSwagger(app)(options);


//Configure application
let port = 3000;
let host = 'localhost';


//Mount middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


//Router for /translate
app.use('/translate', translateRoute);

//Router for /dictionary
app.use('/dictionary', dictionaryRoute);


//Route/URL not found
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

app.listen(port, () => {
    console.log(`Translate API listening at http://${host}:${port}`);
});