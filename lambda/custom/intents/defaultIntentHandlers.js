let defaultIntentHandlers = {
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
  }
};

module.exports = defaultIntentHandlers;
