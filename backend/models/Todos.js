const {orm} = require("../services/DbService")();

module.exports = () => orm.schema.hasTable('todo').then(function(exists) {
    if (!exists) {
      return orm.schema.createTable('todo', function(t) {
        t.increments('id').primary();
        t.string('content', 255);
        t.boolean("done");
        t.timestamp('created_at').defaultTo(orm.fn.now());
        t.timestamp('updated_at').defaultTo(orm.fn.now());
      });
    }
  });