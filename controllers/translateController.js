const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

var subscriptionKey = "xxxxx";

exports.translateText = (req, res) => {
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    var translateText = req.body.data;
    var languageFrom = req.body.from;
    var languageTo = req.body.to;
    var location = "eastus2";

    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': languageFrom,
            'to': languageTo
        },
        data: [{
            'text': translateText
        }],
        responseType: 'json'
    }).then(response => {
        var sendData = JSON.stringify(response.data[0].translations[0].text, null, 4);
        res.status = 200;
        return res.send(sendData)
        
    })
};

exports.languages = (req, res) => {
    var endpoint = "https://api.cognitive.microsofttranslator.com";
    var location = "eastus2";

    axios({
        baseURL: endpoint,
        url: '/languages',
        method: 'get',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
        },
        responseType: 'json'
    }).then(response => {
        var sendData = JSON.stringify(response.data.translation, null, 4);
        res.status = 200;
        return res.send(sendData);
    })
};