exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.increments('id');
    table.string('name', 128).notNullable().unique();
    table.string('gtin13', 13).notNullable().unique();
    table.string('description', 1024).notNullable();
    table.string('images', 1024).notNullable();
    // Preço em centavos
    table.integer('price').notNullable();
    table.integer('quantity').notNullable();
    table
      .enum('status', ['AVAILABLE', 'UNAVAILABLE'])
      .defaultTo('AVAILABLE')
      .notNullable();
    table.datetime('createdAt').notNullable().defaultTo(knex.fn.now());
    table.datetime('updatedAt');
    table.datetime('deletedAt');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
