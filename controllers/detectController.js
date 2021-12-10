const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

var subscriptionKey = "xxx";

exports.detectLanguage = (req, res) => {
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    var translateText = req.body.text;
    var languageFrom = req.body.from;
    var languageTo = req.body.to;
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
            'from': req.body.from,
            'to': req.body.to
        },
        data: [{
            'text': req.body.text
        }],
        responseType: 'json'
    }).then(function(response){
        var sendData = JSON.stringify(response.data, null, 4);
        res.status = 200;
        return res.send(sendData);
    })
};