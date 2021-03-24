const emails = [
  {
    from: 'example@mail.com',
    to: 'john@doe.com',
    body:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed turpis magna, varius in odio vitae, condimentum lacinia est. In est eros, volutpat at diam ac, lobortis convallis magna. Maecenas ac tincidunt elit. Curabitur porttitor ante ante, vel rutrum erat tempus nec. In rutrum ante malesuada, placerat neque porta, fermentum nisi. Nulla facilisi. Proin sollicitudin ut diam nec scelerisque. Donec mattis facilisis odio non dapibus. Duis pretium, est id aliquet dignissim, leo ligula lacinia lectus, quis sollicitudin neque magna vel arcu. ',
  },
  {
    from: 'elonmusk@realmail.com',
    to: 'you@dev.com',
    body: 'Do you want to work at SpaceX?',
  },
  {
    from: 'notsuspicious@mail.com',
    to: 'hydenz@mail.com',
    body: 'You won $1,000,000! Click here to claim it!',
  },
];

exports.seed = async function (knex) {
  await knex('emails').del();
  await knex.raw('ALTER TABLE ' + 'emails' + ' AUTO_INCREMENT = 1');
  return knex('emails').insert(emails);
};
