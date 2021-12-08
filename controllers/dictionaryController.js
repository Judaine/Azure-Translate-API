const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

var subscriptionKey = "xxxx";
var endpoint = "https://api.cognitive.microsofttranslator.com"
var apiVersion = "?api-version=3.0"

exports.dictionaryLookup = (req, res) => {

    var endpoint = "https://api.cognitive.microsofttranslator.com";

    var translateText = req.body.text;
    var languageFrom = req.body.from;
    var languageTo = req.body.to;
    var location = "eastus2";

    axios({
        baseURL: endpoint,
        url: '/dictionary/lookup',
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
        let returnedData = response.data[0].translations
        var jsonObject = {}
        var dataHeader = 'Dictionary Lookup';
        jsonObject[dataHeader] = [];

        returnedData.forEach(normalizedTarget => {
            var meaningArray = [];
            //var normText = [normalizedTarget.backTranslations];
            normalizedTarget.backTranslations.forEach(element => meaningArray.push(element.normalizedText));
            jsonObject[dataHeader].push(
                {
                    'Translation' : normalizedTarget.normalizedTarget,
                    'Parts of Speech' : normalizedTarget.posTag,
                    'Meanings' : meaningArray
                }
            )
        })

        //var sendData = JSON.stringify(response.data, null, 4);
        res.status = 200;
        return res.send(jsonObject)
        
    })
};