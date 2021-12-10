const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

var subscriptionKey = "xxx";
var endpoint = "https://api.cognitive.microsofttranslator.com"
var apiVersion = "?api-version=3.0"

exports.dictionaryLookup = (req, res) => {
    //Endpoint given by Azure Translate Cognitive service
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    var translateText = req.body.text;
    var languageFrom = req.body.languageFrom;
    var languageTo = req.body.languageTo;
    //Location of where Azure Translate Cognitive service is hosted. If changed in Azure, needs to change in variable.
    var location = "eastus2";

    //Axios HTTP request
    axios({
        baseURL: endpoint,
        url: '/dictionary/lookup',
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
        //Locate translation JSON objects
        let returnedData = response.data[0].translations
        //Creating new JSON object to populate response
        var jsonObject = {}
        var dataHeader = 'Dictionary Lookup';
        //Array for JSON response
        jsonObject[dataHeader] = [];

        //Iterate through array and push potential translation meanings to new jsonObject array.
        returnedData.forEach(normalizedTarget => {
            var meaningArray = [];
            normalizedTarget.backTranslations.forEach(element => meaningArray.push(element.normalizedText));
            jsonObject[dataHeader].push(
                {
                    'Translation' : normalizedTarget.normalizedTarget,
                    'Parts of Speech' : normalizedTarget.posTag,
                    'Meanings' : meaningArray
                }
            )
        })
        res.status = 200;
        return res.send(jsonObject)
    })
};