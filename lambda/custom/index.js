"use strict";

var Alexa = require("alexa-sdk");

var pg = require("pg");
var client = new pg.Client({
  host: 'your-host',
  user: 'your-user',
  password: 'your-password',
  database: 'your-db-name',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  port: 5432
})
client.connect();

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
  "AMAZON.CancelIntent": function () {
    this.response.speak("Goodbye!");
    this.emit(':responseReady');
  },
  "AMAZON.HelpIntent": function() {
    this.response.speak("Hello, what can I help you wtih?");
    this.emit(':responseReady');
  },
  "AMAZON.StopIntent": function() {
    this.response.speak("Goodbye!");
    this.emit(':responseReady');
  },
  "HelloIntent": function () {
    this.response.speak("Hello, Alorica");
    this.emit(':responseReady');
  },
  "LaunchRequest": function () {
    this.response.speak("Welcome to Alorica");
    this.emit(':responseReady');
  },
  "DBIntent": function () {
    let field = this.event.request.intent.slots.field.value;
    let fieldValue = this.event.request.intent.slots.fieldValue.value.toLowerCase();
    let query = `SELECT ${field} from apps_dev where ${field} = '${fieldValue}'`;
    console.log(query);
    client.query(query)
            .then(function (result) {
              console.log(result);
              if (result.rowCount == 0) {
                this.response.speak(this.event.request.intent.slots.employeeName.value + ' is not around.');
                this.emit(':responseReady');
              } else {
                this.response.speak(result.rows[0].name + ' is around.');
                this.emit(':responseReady');
              }
              this.context.done(null);
            }.bind(this))
            .catch(function(e) {
              this.response.speak('I cannot access that specific employee information');
              this.emit(':responseReady');
              this.context.done(null);
            }.bind(this))
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
