
const db = require('../modules/db');
let dbHandlers = {
  "DBIntent": function () {
    let field = this.event.request.intent.slots.field.value;
    let fieldValue = this.event.request.intent.slots.fieldValue.value.toLowerCase();
    let query = `SELECT ${field} from apps_dev where ${field} = '${fieldValue}'`;
    console.log('Querying database..');
    db.any(query)
            .then(function (data) {
              console.log('Checking results...');
              if (data.length == 0) {
                this.response.speak(this.event.request.intent.slots.employeeName.value + ' is not around.');
                this.emit(':responseReady');
              } else {
                this.response.speak(data[0].name + ' is around.');
                this.emit(':responseReady');
              }
              console.log('Done!')
              this.context.done(null);
            }.bind(this))
            .catch(function(e) {
              console.error(e.stack);
              this.response.speak('I cannot access that specific employee information');
              this.emit(':responseReady');
              this.context.done(null);
            }.bind(this))
  }
};

module.exports = dbHandlers;
