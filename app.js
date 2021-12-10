//Node Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expressJSDocSwagger = require('express-jsdoc-swagger');

//Routes for API calls
const translateRoute = require('./routes/translateRoute');
const dictionaryRoute = require('./routes/dictionaryRoute');
const detectRoute = require('./routes/detectRoute');


//Initialize Swagger options
const options = {
    info: {
      version: '1.0.0',
      title: 'transl8 API',
      description: 'Front-end API for Microsoft Azure\'s Translation Cognitive Service: ' + "https://azure.microsoft.com/en-us/services/cognitive-services/translator/",
      contact: {
        name: 'David Jordan',
        url: 'http://github.com/Judaine',
        email: 'djorda38@uncc.edu',
      },
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

//Router for /detect
app.use('/detect', detectRoute);


//Route/URL not found
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

//Error handling
app.use((err, req, res, next)=>{
  if(!err.status) {
      let reqErr = new Error(err.response.data.message)
      reqErr.status = 400
  }
  res.send(reqErr);
});

//Start API
app.listen(port, () => {
    console.log(`Translate API listening at http://${host}:${port}`);
});