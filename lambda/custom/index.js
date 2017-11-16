"use strict";

require('dotenv').config();

const Alexa = require("alexa-sdk");
const defaultIntentHandlers = require("./intents/defaultIntentHandlers");
const countIntentHandler = require("./intents/countIntentHandler");
const dbHandlers = require("./intents/dbHandlers");

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(defaultIntentHandlers, countIntentHandler, dbHandlers);
  alexa.execute();
};
