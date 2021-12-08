const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

exports.translateText = (req, res, next) => {
    var subscriptionKey = "xxxx";
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    // Add your location, also known as region. The default is global.
    // This is required if using a Cognitive Services resource.
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
            'from': 'en',
            'to': ['de', 'it']
        },
        data: [{
            'text': 'Hello World!'
        }],
        responseType: 'json'
    }).then(response => {
        var sendData = JSON.stringify(response.data[0].translations[0].text, null, 4);
        next(sendData);

    })
};