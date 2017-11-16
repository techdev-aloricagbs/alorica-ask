var pg = require("pg");
var client = new pg.Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  port: 5432
})
client.connect();

let dbHandlers = {
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
  }
};

module.exports = dbHandlers;
