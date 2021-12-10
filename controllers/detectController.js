const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
const {subKey} = require('../subKey/key');

exports.detectLanguage = (req, res, next) => {
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    var translateText = req.body.text;

    // This is required if using a Cognitive Services resource.
    var location = "eastus2";

    axios({
        baseURL: endpoint,
        url: '/detect',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0'
        },
        data: [{
            'text': translateText
        }],
        responseType: 'json'
    }).then(function(response){
        var sendData = JSON.stringify(response.data, null, 4);
        res.status = 200;
        return res.send(sendData);
    })
    .catch(err => {
        res.send(err.response.data);
    });
};