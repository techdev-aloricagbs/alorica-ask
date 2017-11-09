"use strict";

var Alexa = require("alexa-sdk");

const data = {
  "employees": {
    "count": {
      "alo": 429,
      "egs": 550,
      "cyber gate": 16,
      "fort bonifacio": 61
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
    this.response.speak(sitename + " site has " + data.employees.count[siteName] + " employees.")
    this.emit(':responseReady');
  },
};

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
