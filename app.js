const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const translateRoute = require('./routes/translateRoute');

const expressJSDocSwagger = require('express-jsdoc-swagger');
const swaggerUi = require('swagger-ui-express');

//Initialize Swagger options
const options = {
    info: {
      version: '1.0.0',
      title: 'Translate API'
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './routes/translateRoute.js',
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


//Route/URL not found
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

app.listen(port, () => {
    console.log(`Translate API listening at http://${host}:${port}`);
});