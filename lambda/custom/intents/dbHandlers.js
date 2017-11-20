"use strict";

const db = require('../modules/db');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

let dbHandlers = {
  "DBIntent": async(function () {
    let tableName = this.event.request.intent.slots.table;
    let field = this.event.request.intent.slots.field;
    let fieldValue = this.event.request.intent.slots.fieldValue;

    if (typeof tableName === 'undefined'
      && typeof field === 'undefined' && typeof fieldValue === 'undefined') {
      this.response.speak('I am sorry. I cannot process your query.');
      this.emit(':responseReady');
      return;
    }

    if (typeof tableName !== 'undefined' && typeof tableName.value !== 'undefined') {
      tableName = tableName.value.toLowerCase();
      if (await(checkTableIfExists(tableName))) {
        this.response.speak(tableName + ' exists in our main database.');
        this.emit(':responseReady');
      } else {
        this.response.speak(tableName + ' does not exist in our main database.');
        this.emit(':responseReady');
      }
    } else {
      if (typeof fieldValue === 'undefined') {
        this.response.speak('I cannot access that specific employee information');
        this.emit(':responseReady');
        return;
      }

      fieldValue = fieldValue.value.toLowerCase();
      let query = `SELECT ${field.value} from apps_dev where ${field.value} = '${fieldValue}'`;
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
    }
  }),
};

module.exports = dbHandlers;

const checkTableIfExists = async(function (tableName) {
  try {
    const SLOT_TO_TABLE_MAP = {
      'apps dev': 'apps_dev'
    };

    if (typeof SLOT_TO_TABLE_MAP[tableName]  === 'undefined') {
      return false;
    }

    tableName = SLOT_TO_TABLE_MAP[tableName];
    let query = `select exists(select 1 from information_schema.tables where table_name = '${tableName}')`;
    let data = await(db.any(query));
    return data[0].exists;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
});