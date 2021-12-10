const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const {subKey} = require('../subKey/key');

exports.dictionaryLookup = (req, res, next) => {
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
        url: '/dictionary/lookup',
        method: 'post',
        headers: {
            //Headers required to send to Azure API for authentication/authorization
            'Ocp-Apim-Subscription-Key': subKey,
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
        var dataHeader = 'Dictionary_Lookup';
        //Array for JSON response
        jsonObject[dataHeader] = [];

        //Iterate through array and push potential translation meanings to new jsonObject array.
        returnedData.forEach(normalizedTarget => {
            var meaningArray = [];
            normalizedTarget.backTranslations.forEach(element => meaningArray.push(element.normalizedText));
            jsonObject[dataHeader].push(
                {
                    'Translation' : normalizedTarget.normalizedTarget,
                    'Parts_of_Speech' : normalizedTarget.posTag,
                    'Meanings' : meaningArray
                }
            )
        })
        res.status = 200;
        return res.send(jsonObject)
    })
};

exports.dictionaryExamples = (req, res, next) => {
    //Endpoint given by Azure Translate Cognitive service
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    var originalText = req.body.text;
    var translatedText = req.body.translation;
    var languageTo = req.body.translationLanguage;
    var languageFrom = req.body.textLanguage;
    //Location of where Azure Translate Cognitive service is hosted. If changed in Azure, needs to change in variable.
    var location = "eastus2";

    //Axios HTTP request
    axios({
        baseURL: endpoint,
        url: '/dictionary/examples',
        method: 'post',
        headers: {
            //Headers required to send to Azure API for authentication/authorization
            'Ocp-Apim-Subscription-Key': subKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            //API-version may change in the future
            'api-version': '3.0',
            'to': languageTo,
            'from': languageFrom
        },
        data: [{
            'text': originalText,
            'translation': translatedText
        }],
        responseType: 'json'
    }).then(response => {
        //Locate payload within the JSON object
        var sendData = response.data
        res.status = 200;
        return res.send(sendData)
        
    })
    .catch(err => {
            res.send(err.response.data);
    });
};