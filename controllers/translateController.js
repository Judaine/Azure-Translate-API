const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const subKey = require('../subKey/key');

var subscriptionKey = subKey;

exports.translateText = (req, res, next) => {
    //Endpoint given by Azure Translate Cognitive service
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    var translateText = req.body.text;
    var languageFrom = req.body.from;
    var languageTo = req.body.to;
    //Location of where Azure Translate Cognitive service is hosted. If changed in Azure, needs to change in variable.
    var location = "eastus2";

    //Axios HTTP request
    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            //Headers required to send to Azure API for authentication/authorization
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            //API-version may change in the future
            'api-version': '3.0',
            'from': languageFrom,
            'to': languageTo
        },
        data: [{
            'text': translateText
        }],
        responseType: 'json'
    }).then(response => {
        //Locate payload within the JSON object
        var sendData = response.data[0].translations[0]
        res.status = 200;
        return res.send(sendData)
        
    })
    .catch(err => {
            res.send(err.response.data);
    });
};

exports.languages = (req, res, next) => {
    //Endpoint given by Azure Translate Cognitive service
    var endpoint = "https://api.cognitive.microsofttranslator.com";
    //Location of where Azure Translate Cognitive service is hosted. If changed in Azure, needs to change in variable.
    var location = "eastus2";

    //Axios HTTP request
    axios({
        baseURL: endpoint,
        url: '/languages',
        method: 'get',
        headers: {
            //Headers required to send to Azure API for authentication/authorization
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            //API-version may change in the future
            'api-version': '3.0',
        },
        responseType: 'json'
    }).then(response => {
        //Locate payload within the JSON object
        var sendData = JSON.stringify(response.data.translation, null, 4);
        res.status = 200;
        return res.send(sendData);
    })
    .catch(err => {
        res.send(err.response.data);
    });
};


exports.translateToFromParams = (req, res, next) => {
    //Endpoint given by Azure Translate Cognitive service
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    var translateText = req.params.text;
    var languageFrom = req.params.languageFrom;
    var languageTo = req.params.languageTo;
    //Location of where Azure Translate Cognitive service is hosted. If changed in Azure, needs to change in variable.
    var location = "eastus2";

    //Axios HTTP request
    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            //Headers required to send to Azure API for authentication/authorization
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            //API-version may change in the future
            'api-version': '3.0',
            'from': languageFrom,
            'to': languageTo
        },
        data: [{
            'text': translateText
        }],
        responseType: 'json'
    }).then(response => {
        //Locate payload within the JSON object
        var sendData = response.data[0].translations[0]
        res.status = 200;
        return res.send(sendData)
        
    })
    .catch(err => next(err));
};

exports.translateToParam = (req, res, next) => {
    //Endpoint given by Azure Translate Cognitive service
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    var translateText = req.params.text;
    var languageTo = req.params.languageTo;
    //Location of where Azure Translate Cognitive service is hosted. If changed in Azure, needs to change in variable.
    var location = "eastus2";

    //Axios HTTP request
    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            //Headers required to send to Azure API for authentication/authorization
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            //API-version may change in the future
            'api-version': '3.0',
            'to': languageTo
        },
        data: [{
            'text': translateText
        }],
        responseType: 'json'
    }).then(response => {
        //Locate payload within the JSON object
        var sendData = response.data[0].translations[0]
        res.status = 200;
        return res.send(sendData)  
    })
    .catch(err => {
        res.send(err.response.data);
    });
};