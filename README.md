# **transl8 API**

[Swagger Documentation & Playground](http://localhost:3000/api-docs)

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [API Functions](#api-functions)
- [Error Codes](#error-codes)

## **Introduction**
transl8 is an open-source translation API that leverages [Microsoft Azure's Translator Cognitive Service](https://azure.microsoft.com/en-us/services/cognitive-services/translator), *but made easy*.

### **Why use transl8?**
- You won't need to sign up for an Azure subscription to consume it.
  - **No cost to you**.
- Less verbose HTTP requests.
- Easily implemented in many programming languages.
- Interactive Swagger playground and documentation.

## **Getting Started**
**IMPORTANT**: The languages you use must be in the abbreviated format. The following is the list of abbreviated languages with their full-name counterparts:

| Abbreviation (USE THIS)  | Full Name |
| ------------- | ------------- |
| af  | Afrikaans  |
| am  | Amharic  |
| ar  | Arabic  |
| as  | Assamese  |
| az  | Azerbaijani  |
| ba  | Bashkir  |
| bg  | Bulgarian  |
| bn  | Bangla  |
| bo  | Tibetan  |
| bs  | Bosnian  |
| ca  | Catalan  |
| cs  | Czech  |
| cy  | Welsh  |
| da  | Danish  |
| de  | German  |
| dv  | Divehi  |
| el  | Greek  |
| en  | English  |
| es  | Spanish  |
| et  | Estonian  |
| fa  | Persian  |
| fi  | Finnish  |
| fil  | Filipino  |
| fj  | Fijian  |
| fr  | French  |
| fr-CA  | French (Canada)  |
| ga  | Irish  |
| gu  | Gujarati  |
| he  | Hebrew  |
| hi  | Hindi  |
| hr  | Croatian  |
| ht  | Haitan Creole  |
| hu  | Hungarian  |
| hy  | Armenian  |
| id  | Indonesian  |
| is  | Icelandic  |
| it  | Italian  |
| iu  | Inuktitut  |
| ja  | Japanese  |
| ka  | Georgian  |
| kk  | Kazakh  |
| km  | Khmer  |
| kmr  | Kurdish (Northern)  |
| kn  | Kannada  |
| ko  | Korean  |
| ku  | Kurdish (Central)  |
| ky  | Kyrgyz  |
| lo  | Lao  |
| lt  | Lithuanian  |
| lv  | Latvian  |
| lzh  | Chinese (Literary)  |
| mg  | Malagasy  |
| mi  | Māori  |
| mk  | Macedonian  |
| ml  | Malayalam  |
| mn-Cyrl  | Mongolian (Cyrillic)  |
| mn-Mong  | Mongolian (Traditional)  |
| mr  | Marathi  |
| ms  | Malay  |
| mt  | Maltese  |
| mww  | Hmong Daw  |
| my  | Myanmar (Burmese)  |
| nb  | Norwegian  |
| ne  | Nepali  |
| nl  | Dutch  |
| or  | Odia  |
| otq  | Querétaro Otomi  |
| pa  | Punjabi  |
| pl  | Polish  |
| prs  | Dari  |
| ps  | Pashto  |
| pt  | Portuguese (Brazil)  |
| pt-PT  | Portugese (Portugal)  |
| ro  | Romanian  |
| ru  | Russian  |
| sk  | Slovak  |
| sl  | Slovenian  |
| sm  | Samoan  |
| sq  | Albanian  |
| sr-Cyrl  | Serbian (Cyrillic)  |
| sr-Latn  | Serbian (Latin)  |
| sv  | Swedish  |
| sw  | Swahili  |
| ta  | Tamil  |
| te  | Telugu  |
| th  | Thai  |
| ti  | Tigrinya  |
| tk  | Turkmen  |
| tlh-Latin  | Klingon (Latin)  |
| tlh-Piqd  | Klingon (pIqaD)  |
| to  | Tongan  |
| tr  | Turkish  |
| tt  | Tatar  |
| ty  | Tahitian  |
| ug  | Uyghur  |
| uk  | Ukrainian  |
| ur  | Urdu  |
| uz  | Uzbek (Latin)  |
| vi  | Vietnamese  |
| yua  | Yucatec Maya  |
| yue  | Cantonese (Traditional)  |
| zh-Hans  | Chinese Simplified  |
| zh-Hant  | Chinese Traditional  |

## **API Functions**
### **Translate**
- Endpoint: http://localhost:3000/translate  
- Method: POST
  
Translates text to the target language.

Body request:
- **text**: Text to translate. (**Required**)
- **to**: Language to translate to. (**Required**)
- **from**: Language to translate from. (*Optional*)
  - If language to translate from is not listed, it will automatically detect the language of the original text.

Schema (application/json):  
```
{
    "text": "Hello",
    "to": "es",
    "from": "en"
}
```

Response (application/json):
```
{
  "text": "Hola",
  "to": "es"
}
```

### **Translate (with parameters)**
- Endpoint 1: http://localhost:3000/translate/to/{languageTo}/{text}
- Endpoint 2: http://localhost:3000/translate/from/{languageFrom}/to/{languageTo}/{text}
- Method: GET

Translating made even easier - instead of sending a response body, utilize the parameters to get a quick and hassle-free response. Test it right in your browser!

Example:
```
http://localhost:3000/translate/to/es/Hello World!
```

Response (application/json):
```
{
    "text":"¡Hola mundo!",
    "to":"es"
}
```

### **Translatable Languages**
- Endpoint: http://localhost:3000/translate/languages
- Method: GET

Returns all available languages that can be translated to and from.  

***NOTE:*** The list of languages is *long*. The acceptable use of languages for input/output are the names of each object (ex: af, am, ar, es, fr, it, etc...). If you list the language (for example) as "English", you will receive an invalid language error.

Example:
```
GET http://localhost:3000/translate/languages
```

Response: 
```
{
    "af": {
        "name": "Afrikaans",
        "nativeName": "Afrikaans",
        "dir": "ltr"
    },
    "am": {
        "name": "Amharic",
        "nativeName": "አማርኛ",
        "dir": "ltr"
    },
    "ar": {
        "name": "Arabic",
        "nativeName": "العربية",
        "dir": "rtl"
    },
    "as": {
        "name": "Assamese",
        "nativeName": "অসমীয়া",
        "dir": "ltr"
    },
    ...
}
```

### **Dictionary**
- Endpoint: http://localhost:3000/dictionary/lookup
- Method: POST

Returns a list of possible translations for the requested word.  Includes possible meanings of the "from" language, and the part of speech the word is in that language.

Body request:
- **text**: Text to translate. (**Required**)
- **to**: Language to translate to. (**Required**)
- **from**: Language to translate from. (*Optional*)
  - If language to translate from is not listed, it will automatically detect the language of the original text.

Schema (application/json):
```
{
    "text": "Hello"
    "to": "fr"
    "from": "en"
}
```

Response (application/json):
```
{
  "Dictionary_Lookup": [
    {
      "Translation": "bonjour",
      "Parts_of_Speech": "NOUN",
      "Meanings": [
        "hello",
        "hi",
        "morning",
        "hey",
        "greetings"
      ]
    },
    {
      "Translation": "allô",
      "Parts_of_Speech": "NOUN",
      "Meanings": [
        "hello",
        "hallo"
      ]
    },
    {
      "Translation": "bonsoir",
      "Parts_of_Speech": "NOUN",
      "Meanings": [
        "hello",
        "hi",
        "evening",
        "goodnight",
        "hiya"
      ]
    },
    {
      "Translation": "salut",
      "Parts_of_Speech": "NOUN",
      "Meanings": [
        "hi",
        "salvation",
        "hey",
        "hello",
        "bye",
        "greeting",
        "hiya"
      ]
    }
  ]
}
```

### **Dictionary Examples**
- Endpoint: http://localhost:3000/dictionary/examples
- Method: POST

Looks up examples of the use of the original and translated word in context.

Body request:
- **text**: Text to translate. (**Required**)
- **translation**: Translation of the text. (**Required**)
- **textLanguage**: Language of the text. (**Required**)
- **translationLanguage**: Language of the translation. (**Required**)
  

Schema:
```
{
  "text": "Incredible",
  "translation": "Incredibile",
  "textLanguage": "en",
  "translationLanguage": "it"
}
```

Response (application/json): 
```
[
  {
    "normalizedSource": "incredible",
    "normalizedTarget": "Incredibile",
    "examples": [
      {
        "sourcePrefix": "An almost ",
        "sourceTerm": "incredible",
        "sourceSuffix": " tale of triumph and tragedy.",
        "targetPrefix": "Un racconto quasi ",
        "targetTerm": "incredibile",
        "targetSuffix": " di Trionfo e tragedia."
      }
    ]
  }
]
```

### **Detect**
- Endpoint: http://localhost:3000/detect
- Method: POST

Analyzes the word sent and returns the language it is from, along with a confidence float value from 0 (unsure) to 1 (sure). Also sends if the language is able to be translated to and from.

Body request:
- **text**: Text to be detected. (**Required**)

Schema (application/json):
```
{
  "text": "Bonjour"
}
```

Response (application/json)
```
[
    {
        "language": "fr",
        "score": 1,
        "isTranslationSupported": true,
        "isTransliterationSupported": false
    }
]
```
## Error Codes
- 400035 - The source language is not valid.
  - The "to" language entered must be within the list of supported langauges.
- 400036 - Target language is not valid.
  - The "from" language entered must be within the list of supported languages.