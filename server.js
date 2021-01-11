const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: 'YourKey',
    }),
    serviceUrl: 'YourURL',
});

var phrases = [
    {
        id: 1,
        text: 'O Rato roeu a rica roupa do rei de Roma',
    },
]

var PORT = 3000 || process.env.PORT;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/phrases', (req, res) => {
    res.json(phrases);
});

app.post('/phrases', (req, res) => {
    var phrase = req.body.text;

    phrases.push({
        id: phrases.length + 1,
        text: phrase
    });
    res.send('Successfully created');
});

app.post('/audio', (req, res) => {
    var id = req.body.id;
    var text = req.body.text;

    var synthesizeParams = {
        text: text,
        accept: 'audio/wav',
        voice: 'pt-BR_IsabelaV3Voice',
    };

    textToSpeech.synthesize(synthesizeParams)
    .then(response => {
        return textToSpeech.repairWavHeaderStream(response.result);
    })
    .then(buffer => {
        fs.writeFileSync('audio/audio' + id + '.wav', buffer);
        res.send('/audio/audio' + id + '.wav');
    })
    .catch(err => {
        console.log('error:', err);
    });

});

app.listen(PORT, () => {
    console.log('Server running');
});
