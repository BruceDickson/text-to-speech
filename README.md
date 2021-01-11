# Text to Speech Synthesizer

### This aplication synthesize a text message to audio using [Watson Text to Speech](https://www.ibm.com/cloud/watson-text-to-speech).

# How to run
```bash
npm install
```

### Configure the [IBM Watson](https://www.ibm.com/cloud/watson-text-to-speech) service credentials
1. Create an instance of the Watson Text To Speech service
2. Create an access token using the service credentials to get a KEY and URL
3. Copy the Key and URL to server.js

```js
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'YourKey',
  }),
  serviceUrl: 'YourURL',
});
```

# Run the application
```bash
npm start
```