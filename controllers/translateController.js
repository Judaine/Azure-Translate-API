const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

var subscriptionKey = "xxxx";

exports.translateText = (req, res) => {
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
};

exports.languages = (req, res) => {
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
};


exports.translateToFromParams = (req, res) => {
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
};

exports.translateToParam = (req, res) => {
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
};