
const db = require('../modules/db');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

let dbHandlers = {
  "DBIntent": async(function () {
    let field = this.event.request.intent.slots.field.value;
    let fieldValue = this.event.request.intent.slots.fieldValue.value.toLowerCase();
    let query = `SELECT ${field} from apps_dev where ${field} = '${fieldValue}'`;
    console.log('Querying database..');
    try {
      let data = await(db.any(query));
      if (data.length === 0) {
        this.response.speak(this.event.request.intent.slots.employeeName.value + ' is not around.');
        this.emit(':responseReady');
      } else {
        this.response.speak(data[0].name + ' is around.');
        this.emit(':responseReady');
      }
      console.log('Done!');
    } catch (error) {
      console.error(error.stack);
      this.response.speak('I cannot access that specific employee information');
      this.emit(':responseReady');
    }
  }),
};

module.exports = dbHandlers;
