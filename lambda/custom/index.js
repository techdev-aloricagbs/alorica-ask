"use strict";

var Alexa = require("alexa-sdk");

const data = {
  "capacity": {
    "count": {
      "cyber gate": 400,
      "fort": 300,
      "centris": 1000,
      "sentris": 1000,
    }
  },
  "employees": {
    "count": {
      "cyber gate": 16,
      "fort": 61,
      "centris": 19,
      "sentris": 19
    }
  }
};

var handlers = {
  "HelloIntent": function () {
    this.response.speak("Hello, Alorica");
    this.emit(':responseReady');
  },
  "LaunchRequest": function () {
    this.response.speak("Welcome to Alorica");
    this.emit(':responseReady');
  },
  "CountIntent": function() {
    let siteName = this.event.request.intent.slots.siteName.value.toLowerCase();
    let metaData = this.event.request.intent.slots.companyMetadata.value.toLowerCase();

    var suffix = '';
    if (metaData == 'capacity') {
      suffix = '  seating capacity';
    } else if (metaData == 'employees') {
      suffix = ' employees';
    }

    this.response.speak(siteName + " site has " + data[metaData]['count'][siteName] + suffix);
    this.emit(':responseReady');
  },
};

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
