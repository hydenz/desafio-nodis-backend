exports.up = function (knex) {
  return knex.schema.createTable('emails', function (table) {
    table.increments('id');
    table.string('from', 64).notNullable();
    table.string('to', 64).notNullable();
    // Utilizado tipo text pois comporta grandes comprimentos de caracteres
    table.text('body').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('emails');
};
