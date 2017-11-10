"use strict";

var Alexa = require("alexa-sdk");

const data = {
  "seat": {
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

    // List this down as an array of synonyms
    if (metaData == 'seats' || metaData == 'seating') {
      metaData = 'seat';
    } else if (metaData == 'headcount' || metaData == 'employee' || metaData == 'head' || metaData == 'heads') {
      metaData = 'employees';
    }
    
    let value = data[metaData]['count'][siteName];

    if (typeof value ==  'undefined') {
      this.response.speak('I do not have any record of that information about  ' + siteName + ' in the database');
      this.emit(':responseReady');
      return;
    }

    var suffix = '';
    if (metaData == 'seat') {
      suffix = '  seating capacity';
    } else if (metaData == 'employees') {
      suffix = ' employees';
    }

    this.response.speak(siteName + " site has " + value + suffix);
    this.emit(':responseReady');
  },
};

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
