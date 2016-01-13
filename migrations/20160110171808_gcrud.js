
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table){
  table.increments();
  table.string('name');
  table.string('city');
  table.string('state');
  table.string('cuisine');
  table.string('rating')
  table.string('image')
  table.text('bio')
})
};

exports.down = function(knex, Promise) {

};
